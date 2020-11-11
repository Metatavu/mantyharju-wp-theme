<?php
namespace Metatavu\LinkedEvents\Rest;

defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

if (!class_exists( '\Metatavu\LinkedEvents\Rest\RestHandler' ) ) {

  class RestHandler {
  
    function __construct() {}

    public function registerRoutes() {
      register_rest_route('wp/v2', '/linkedeventsEndPoint', array(
        array(
            'methods'  => 'POST',
            'callback' => array($this, 'createEventHandler'),
          ),
      ));
    }

    public function createEventHandler($request) {

      /*
       * Set all events public by default
       */
      $defaultPublication = "public";

      $result = \Metatavu\LinkedEvents\Configuration::getDefaultConfiguration();
      $result->setHost(\Metatavu\LinkedEvents\Wordpress\Settings\Settings::getValue("api-url"));
      $result->addDefaultHeader('apikey', \Metatavu\LinkedEvents\Wordpress\Settings\Settings::getValue("api-key"));
      $client = new \Metatavu\LinkedEvents\ApiClient($result);

      $apiurl = \Metatavu\LinkedEvents\Wordpress\Settings\Settings::getValue("api-url");
      $apikey = \Metatavu\LinkedEvents\Wordpress\Settings\Settings::getValue("api-key");

      $body = json_decode($request->get_body());

      if($body->{'submit'} == 'event') {
        $event = $this->getNewEvent($body);
        $this->updateEventName($event, $body);
        $this->updateEventDescription($event, $body);
        $this->updateEventShortDescription($event, $body);
        $this->updateEventPublicationStatus($event, $defaultPublication);
        $this->updateEventKeywords($event, $body);
        $this->updateEventImage($event, $body, $client);
        $this->updateEventLocation($event, $body);
        $this->updateEventStartTime($event, $body);
        $this->updateEventEndTime($event, $body);
        $this->updateCustomData($event, $body);

        $api_instance = new \Metatavu\LinkedEvents\Client\EventApi($client);

        try {
            $eventCreateResult = $api_instance->eventCreate($event);
            echo $eventCreateResult;
        } catch (\Metatavu\LinkedEvents\ApiException $e) {
            return new \WP_REST_Response("Error creating event", 400);
        }
      }

      if($body->{'submit'} == 'place') {

        $body->{'position-latitude'} = 61.4175925;
        $body->{'position-longitude'} = 26.8782263;

        $place = $this->getNewPlace($body);
        $this->updatePlaceName($place, $body);
        $this->updatePlaceAddress($place, $body);
        
        $api_instance = new \Metatavu\LinkedEvents\Client\FilterApi($client);

        try {
          $placeCreateResult = $api_instance->placeCreate($place);
          echo $placeCreateResult;
        } 
        catch (\Metatavu\LinkedEvents\ApiException $e) {
          $custom_msg = json_decode($e->get_body()){'responseBody'};
          return new \WP_REST_Response("Error creating place",$custom_msg, 400);
        }
      }
    }
    
    /**
     * Updates events customdata into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Event $event $body
     */
    protected function updateCustomData($event, $body) {
      $customDataFields = [
        'provider-fi',
        'provider-email',
        'provider-phone',
        'responsible-fi',
        'is_registration',
        'registration-fi',
        'registration_url',
        'responsible-email',
        'responsible-phone',
        'no-registration-fi',
      ];
      $customData = [];

      foreach ($customDataFields as $field) {
        if ($body->{$field} == 'is_registration') {
          $customData[$field] = $body->{$field} ? 'true':'false';
        }
        else {
        $customData[$field] = $body->{$field} ? $body->{$field}:"";
        }
      }

      $event->setCustomData($customData);
    }

    /**
     * Creates new prefilled event object 
     * 
     * @return \Metatavu\LinkedEvents\Model\Event created event object
     */
    protected function getNewEvent($body) {
      $event = new \Metatavu\LinkedEvents\Model\Event();
      $body = $body;
      $this->ensureEventRequiredFields($event, $body);
      return $event; 
    }

    protected function ensureEventRequiredFields($event, $body) {
      $body = $body;
      $this->ensureName($event);
      $this->ensureDescriptions($event);
      $this->ensureEventOffers($event, $body);
    }
    
    protected function ensureName($event) {
      $name = $event->getName();
      
      if (!isset($name)) {
        $name = new \Metatavu\LinkedEvents\Model\EventName();
        $event->setName($name);
      }
    }
    
    protected function ensureDescriptions($event) {
      $description = $event->getDescription();
      $shortDescription = $event->getShortDescription();
        
      if (!isset($description)) {
        $description = [];
        $event->setDescription($description);
      }
      
      if (!isset($shortDescription)) {
        $shortDescription = [];
        $event->setShortDescription($shortDescription);
      }
    }
    
    protected function ensureEventOffers($event, $body) {
      $price[fi] = $body->{'has-price'} == 'checked' ? $body->{'price-fi'} : $body->{'free-price-fi'};
      $price[sv] = $body->{'has-price'} == 'checked' ? $body->{'price-sv'} : $body->{'free-price-sv'};
      $price[en] = $body->{'has-price'} == 'checked' ? $body->{'price-en'} : $body->{'free-price-en'};
      
      $is_free = $body->{'has-price'} == 'checked' ? 'true' : 'false';
      $offers = [        
        is_free => $is_free,
        price => $price,
        info_url => null,
        description => null
      ];
      $event->setOffers([$offers]);
    }

    /**
     * Updates event name into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Event $event
     */
    protected function updateEventName($event, $body) {
      $name = $event->getName();
      $name->setFi($body->{'name-fi'});
      $event->setName($name);
    }

    /**
     * Updates event description into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Event $event
     */
    protected function updateEventDescription($event, $body) { 
      $description = $event->getDescription();     
      foreach (['fi', 'sv', 'en'] as $language) {
        $description[$language] = $body->{'description-'.$language};
      }
      $event->setDescription($description);
    }
    /**
     * Updates event short description into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Event $event
     */
    protected function updateEventShortDescription($event, $body) {
      $shortDescription = $event->getShortDescription();
      foreach (['fi', 'sv', 'en'] as $language) {
        $shortDescription[$language] = $body->{'description-'.$language};
      }
      $event->setShortDescription($shortDescription);
    }
    
    /**
     * Updates event image into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Event $event
     */
    protected function updateEventImage($event, $body, $client) {
      $imageUrl = $body->{'image-url'};
      $images = $event->getImages();
      $imageFound = false;
      $imageRefs = [];
      $api = new \Metatavu\LinkedEvents\Client\ImageApi($client);

      $image = $api->imageCreate(null, [
        url => $imageUrl
      ]);

      $event->setImages([$this->getImageRef($image->getId())]);
    }
      
    protected function updateEventKeywords($event, $body) {
      $keywordIds = explode(",", $body->{'keywords'});
      $keywordRefs = $this->getKeywordRefs($keywordIds);
      $event->setKeywords($keywordRefs);
    }

    /**
     * Updates publication status from the post
     * 
     * @param type $event
     */
    protected function updateEventPublicationStatus($event, $defaultPublication) {
      $event->setPublicationStatus($defaultPublication);
    }
    
    protected function updateEventLocation($event, $body) {
      $event->setLocation($this->getPlaceRef($body->{"location"}));
    }

    /**
     * Returns IdRef array for keyword ids
     * 
     * @param type $keywordIds keyword ids
     * @return \Metatavu\LinkedEvents\Model\IdRef[] keyword IdRefs
     */
    public static function getKeywordRefs($keywordIds) {
      $result = [];
      
      foreach ($keywordIds as $keywordId) {
        $result[] = self::getKeywordRef($keywordId);  
      }
      
      return $result;
    }
      
    /**
     * Returns reference into the keyword
     * 
     * @param string $keywordId keyword id
     * @return \Metatavu\LinkedEvents\Model\IdRef reference into the keyword
     */
    public static function getKeywordRef($keywordId) {
      return self::getIdRef(self::getApiUrl() . "/keyword/$keywordId/");
    }

    /**
     * Returns reference into the location
     * 
     * @param string $locationId location id
     * @return \Metatavu\LinkedEvents\Model\IdRef reference into the location
     */
    public static function getPlaceRef($locationId) {
      return self::getIdRef(self::getApiUrl() . "/place/$locationId/");
    }
    
    /**
     * Returns reference into the image
     * 
     * @param string $id image id
     * @return \Metatavu\LinkedEvents\Model\IdRef reference into the image
     */
    public static function getImageRef($id) {
      return self::getIdRef($id);
    }
    
    /**
     * Returns IdRef object for id
     * 
     * @param string $id id
     * @return \Metatavu\LinkedEvents\Model\IdRef IdRef
     */
    public static function getIdRef($id) {
      $idRef = new \Metatavu\LinkedEvents\Model\IdRef();
      $idRef->setId($id);
      return $idRef;
    }

    /**
     * Returns API URL
     * 
     * @return string API URL
     */
    private static function getApiUrl() {
      return rtrim(\Metatavu\LinkedEvents\Wordpress\Settings\Settings::getValue("api-url"), "/");
    }

    /**
     * Updates event start time from http request
     * 
     * @param \Metatavu\LinkedEvents\Model\Event $event
     */
    protected function updateEventStartTime($event, $body) {
      $event->setStartTime($body->{'start-time-string'});
      $event->setHasStartTime($body->{'has-start-time'} == 'true' ? 'true' : 'false');
    }

    /**
     * Updates event start time from http request
     * 
     * @param \Metatavu\LinkedEvents\Model\Event $event
     */
    protected function updateEventEndTime($event, $body) {
      $endTime = $body->{'end-time-string'};
      if (!$endTime) {
        $endTime = $body->{'start-time-string'};
      }
      
      $event->setEndTime($endTime);
      $event->setHasEndTime($body->{'has-end-time'} == 'true' ? 'true' : 'false');
    }

    /**
     * Creates new prefilled place object 
     * 
     * @return \Metatavu\LinkedEvents\Model\Place created event object
     */
    protected function getNewPlace($body) {
      $place = new \Metatavu\LinkedEvents\Model\Place();
      $place->setName(new \Metatavu\LinkedEvents\Model\PlaceName());
      $place->setDescription(new \Metatavu\LinkedEvents\Model\PlaceDescription());
      $place->setStreetAddress(new \Metatavu\LinkedEvents\Model\PlaceStreetAddress());
      $place->setAddressLocality(new \Metatavu\LinkedEvents\Model\PlaceAddressLocality());
      $place->setPosition(new \Metatavu\LinkedEvents\Model\PlacePosition());
      $place->setTelephone(new \Metatavu\LinkedEvents\Model\PlaceTelephone());
      $place->setInfoUrl(new \Metatavu\LinkedEvents\Model\PlaceInfoUrl());
      $place->setOriginId(uniqid());
      $place->setDeleted(false);
      
      $place->setDataSource(\Metatavu\LinkedEvents\Wordpress\Settings\Settings::getValue("datasource"));
      $place->setPublisher(\Metatavu\LinkedEvents\Wordpress\Settings\Settings::getValue("publisher"));
      
      return $place; 
    }

    /**
     * Updates place name into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Place $place
     */
    protected function updatePlaceName($place, $body) {
      $name = $place->getName();
      $name->setFi($body->{'name-fi'});
      $name->setSv($body->{'name-sv'});
      $name->setEn($body->{'name-en'});
      $place->setName($name);
    }
    
    /**
     * Updates place description into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Place $place
     */
    protected function updatePlaceDescription($place, $body) {
      if (!$place->getDescription()) {
        $place->setDescription(new \Metatavu\LinkedEvents\Model\PlaceDescription());
      }
      
      $place->getDescription()->setFi($this->getLocalizedRawPostString('description', 'fi'));
      $place->getDescription()->setSv($this->getLocalizedRawPostString('description', 'sv'));
      $place->getDescription()->setEn($this->getLocalizedRawPostString('description', 'en'));
    }
    
    /**
     * Updates place home page into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Place $place
     */
    protected function updatePlaceHomePage($place, $body) {
      $place->getInfoUrl()->setFi($this->getLocalizedPostString('homepage', 'fi'));
      $place->getInfoUrl()->setSv($this->getLocalizedPostString('homepage', 'sv'));
      $place->getInfoUrl()->setEn($this->getLocalizedPostString('homepage', 'en'));
    }
    
    /**
     * Updates place address page into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Place $place
     */
    protected function updatePlaceAddress($place, $body) {
      $latitude = $body->{'position-latitude'};
      $longitude = $body->{'position-longitude'};

      $place->setPosition(new \Metatavu\LinkedEvents\Model\PlacePosition());
      
      if ($latitude && $longitude) {
        $place->getPosition()->setCoordinates([$latitude, $longitude]);
        $place->getPosition()->setType("Point");
      } else {
        $place->setPosition(null);
      }
    }
    
    /**
     * Updates place email into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Place $place
     */
    protected function updatePlaceEmail($place, $body) {
      $place->setEmail($this->getPostString('email'));
    }
    
    /**
     * Updates place telephone into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Place $place
     */
    protected function updatePlaceTelephone($place, $body) {
      if (!$place->getTelephone()) {
        $place->setTelephone(new \Metatavu\LinkedEvents\Model\PlaceTelephone());
      }
      
      $place->getTelephone()->setFi($this->getLocalizedPostString('telephone', 'fi'));
      $place->getTelephone()->setSv($this->getLocalizedPostString('telephone', 'sv'));
      $place->getTelephone()->setEn($this->getLocalizedPostString('telephone', 'en'));
    }
    
    /**
     * Updates place contact type into model
     * 
     * @param \Metatavu\LinkedEvents\Model\Place $place
     */
    protected function updatePlaceContactType($place, $body) {
      $place->setContactType($this->getPostString('contact-type'));
    }
  }
}

add_action( 'rest_api_init', function () {
  $rest = new \Metatavu\LinkedEvents\Rest\RestHandler();
  $rest->registerRoutes();
});

?>