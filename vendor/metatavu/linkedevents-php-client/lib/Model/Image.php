<?php
/**
 * Image
 *
 * PHP version 5
 *
 * @category Class
 * @package  Metatavu\LinkedEvents
 * @author   Swaagger Codegen team
 * @link     https://github.com/swagger-api/swagger-codegen
 */

/**
 * Linked Events information API
 *
 * Linked Events provides categorized data on events and places using JSON-LD format.  Events can be searched by date and location. Location can be exact address or larger area such as neighbourhood or borough  JSON-LD format is streamlined using include mechanism. API users can request that certain fields are included directly into the result, instead of being hyperlinks to objects.  Several fields are multilingual. These are implemented as object with each language variant as property. In this specification each multilingual field has (fi,sv,en) property triplet as example.
 *
 * OpenAPI spec version: v1
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 *
 */

/**
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */

namespace Metatavu\MantyharjuTheme\LinkedEvents\Model;

use \ArrayAccess;

/**
 * Image Class Doc Comment
 *
 * @category    Class
 * @description Images are used as pictures for events, places and organizers.
 * @package     Metatavu\LinkedEvents
 * @author      Swagger Codegen team
 * @link        https://github.com/swagger-api/swagger-codegen
 */
class Image implements ArrayAccess
{
    const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      * @var string
      */
    protected static $swaggerModelName = 'image';

    /**
      * Array of property to type mappings. Used for (de)serialization
      * @var string[]
      */
    protected static $swaggerTypes = [
        'id' => 'int',
        'name' => 'string',
        'publisher' => 'string',
        'createdTime' => '\DateTime',
        'lastModifiedTime' => '\DateTime',
        'createdBy' => 'string',
        'lastModifiedBy' => 'string',
        'url' => 'string',
        'cropping' => 'string',
        'license' => 'string',
        'id' => 'string'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      * @var string[]
      */
    protected static $swaggerFormats = [
        'id' => 'int64',
        'name' => null,
        'publisher' => null,
        'createdTime' => 'date-time',
        'lastModifiedTime' => 'date-time',
        'createdBy' => null,
        'lastModifiedBy' => null,
        'url' => null,
        'cropping' => null,
        'license' => null,
        'id' => null
    ];

    public static function swaggerTypes()
    {
        return self::$swaggerTypes;
    }

    public static function swaggerFormats()
    {
        return self::$swaggerFormats;
    }

    /**
     * Array of attributes where the key is the local name, and the value is the original name
     * @var string[]
     */
    protected static $attributeMap = [
        'id' => 'id',
        'name' => 'name',
        'publisher' => 'publisher',
        'createdTime' => 'created_time',
        'lastModifiedTime' => 'last_modified_time',
        'createdBy' => 'created_by',
        'lastModifiedBy' => 'last_modified_by',
        'url' => 'url',
        'cropping' => 'cropping',
        'license' => 'license',
        'id' => '@id'
    ];


    /**
     * Array of attributes to setter functions (for deserialization of responses)
     * @var string[]
     */
    protected static $setters = [
        'id' => 'setId',
        'name' => 'setName',
        'publisher' => 'setPublisher',
        'createdTime' => 'setCreatedTime',
        'lastModifiedTime' => 'setLastModifiedTime',
        'createdBy' => 'setCreatedBy',
        'lastModifiedBy' => 'setLastModifiedBy',
        'url' => 'setUrl',
        'cropping' => 'setCropping',
        'license' => 'setLicense',
        'id' => 'setId'
    ];


    /**
     * Array of attributes to getter functions (for serialization of requests)
     * @var string[]
     */
    protected static $getters = [
        'id' => 'getId',
        'name' => 'getName',
        'publisher' => 'getPublisher',
        'createdTime' => 'getCreatedTime',
        'lastModifiedTime' => 'getLastModifiedTime',
        'createdBy' => 'getCreatedBy',
        'lastModifiedBy' => 'getLastModifiedBy',
        'url' => 'getUrl',
        'cropping' => 'getCropping',
        'license' => 'getLicense',
        'id' => 'getId'
    ];

    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    public static function setters()
    {
        return self::$setters;
    }

    public static function getters()
    {
        return self::$getters;
    }

    

    

    /**
     * Associative array for storing property values
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     * @param mixed[] $data Associated array of property values initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->container['id'] = isset($data['id']) ? $data['id'] : null;
        $this->container['name'] = isset($data['name']) ? $data['name'] : null;
        $this->container['publisher'] = isset($data['publisher']) ? $data['publisher'] : null;
        $this->container['createdTime'] = isset($data['createdTime']) ? $data['createdTime'] : null;
        $this->container['lastModifiedTime'] = isset($data['lastModifiedTime']) ? $data['lastModifiedTime'] : null;
        $this->container['createdBy'] = isset($data['createdBy']) ? $data['createdBy'] : null;
        $this->container['lastModifiedBy'] = isset($data['lastModifiedBy']) ? $data['lastModifiedBy'] : null;
        $this->container['url'] = isset($data['url']) ? $data['url'] : null;
        $this->container['cropping'] = isset($data['cropping']) ? $data['cropping'] : null;
        $this->container['license'] = isset($data['license']) ? $data['license'] : null;
        $this->container['id'] = isset($data['id']) ? $data['id'] : null;
    }

    /**
     * show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalid_properties = [];

        if ($this->container['url'] === null) {
            $invalid_properties[] = "'url' can't be null";
        }
        return $invalid_properties;
    }

    /**
     * validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid()
    {

        if ($this->container['url'] === null) {
            return false;
        }
        return true;
    }


    /**
     * Gets id
     * @return int
     */
    public function getId()
    {
        return $this->container['id'];
    }

    /**
     * Sets id
     * @param int $id image id
     * @return $this
     */
    public function setId($id)
    {
        $this->container['id'] = $id;

        return $this;
    }

    /**
     * Gets name
     * @return string
     */
    public function getName()
    {
        return $this->container['name'];
    }

    /**
     * Sets name
     * @param string $name
     * @return $this
     */
    public function setName($name)
    {
        $this->container['name'] = $name;

        return $this;
    }

    /**
     * Gets publisher
     * @return string
     */
    public function getPublisher()
    {
        return $this->container['publisher'];
    }

    /**
     * Sets publisher
     * @param string $publisher The organization responsible for the image.
     * @return $this
     */
    public function setPublisher($publisher)
    {
        $this->container['publisher'] = $publisher;

        return $this;
    }

    /**
     * Gets createdTime
     * @return \DateTime
     */
    public function getCreatedTime()
    {
        return $this->container['createdTime'];
    }

    /**
     * Sets createdTime
     * @param \DateTime $createdTime Creation time for the image.
     * @return $this
     */
    public function setCreatedTime($createdTime)
    {
        $this->container['createdTime'] = $createdTime;

        return $this;
    }

    /**
     * Gets lastModifiedTime
     * @return \DateTime
     */
    public function getLastModifiedTime()
    {
        return $this->container['lastModifiedTime'];
    }

    /**
     * Sets lastModifiedTime
     * @param \DateTime $lastModifiedTime Time this image was modified in the datastore behind the API (not necessarily in the originating system)
     * @return $this
     */
    public function setLastModifiedTime($lastModifiedTime)
    {
        $this->container['lastModifiedTime'] = $lastModifiedTime;

        return $this;
    }

    /**
     * Gets createdBy
     * @return string
     */
    public function getCreatedBy()
    {
        return $this->container['createdBy'];
    }

    /**
     * Sets createdBy
     * @param string $createdBy URL reference to the user that created this record (user endpoint)
     * @return $this
     */
    public function setCreatedBy($createdBy)
    {
        $this->container['createdBy'] = $createdBy;

        return $this;
    }

    /**
     * Gets lastModifiedBy
     * @return string
     */
    public function getLastModifiedBy()
    {
        return $this->container['lastModifiedBy'];
    }

    /**
     * Sets lastModifiedBy
     * @param string $lastModifiedBy URL reference to the user that last modfied this record (user endpoint)
     * @return $this
     */
    public function setLastModifiedBy($lastModifiedBy)
    {
        $this->container['lastModifiedBy'] = $lastModifiedBy;

        return $this;
    }

    /**
     * Gets url
     * @return string
     */
    public function getUrl()
    {
        return $this->container['url'];
    }

    /**
     * Sets url
     * @param string $url The image file URL.
     * @return $this
     */
    public function setUrl($url)
    {
        $this->container['url'] = $url;

        return $this;
    }

    /**
     * Gets cropping
     * @return string
     */
    public function getCropping()
    {
        return $this->container['cropping'];
    }

    /**
     * Sets cropping
     * @param string $cropping Cropping data for the image.
     * @return $this
     */
    public function setCropping($cropping)
    {
        $this->container['cropping'] = $cropping;

        return $this;
    }

    /**
     * Gets license
     * @return string
     */
    public function getLicense()
    {
        return $this->container['license'];
    }

    /**
     * Sets license
     * @param string $license License data for the image. May be \"cc_by\" (default) or \"event_only\". The latter license restricts use of the image and is specified on the API front page.
     * @return $this
     */
    public function setLicense($license)
    {
        $this->container['license'] = $license;

        return $this;
    }

    /**
     * Returns true if offset exists. False otherwise.
     * @param  integer $offset Offset
     * @return boolean
     */
    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     * @param  integer $offset Offset
     * @return mixed
     */
    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }

    /**
     * Sets value based on offset.
     * @param  integer $offset Offset
     * @param  mixed   $value  Value to be set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     * @param  integer $offset Offset
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }

    /**
     * Gets the string presentation of the object
     * @return string
     */
    public function __toString()
    {
        if (defined('JSON_PRETTY_PRINT')) { // use JSON pretty print
            return json_encode(\Metatavu\MantyharjuTheme\LinkedEvents\ObjectSerializer::sanitizeForSerialization($this), JSON_PRETTY_PRINT);
        }

        return json_encode(\Metatavu\MantyharjuTheme\LinkedEvents\ObjectSerializer::sanitizeForSerialization($this));
    }
}


