<?php
/**
 * EventInfoUrl
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
 * EventInfoUrl Class Doc Comment
 *
 * @category    Class
 * @description Link (URL) to a page with more information about event
 * @package     Metatavu\LinkedEvents
 * @author      Swagger Codegen team
 * @link        https://github.com/swagger-api/swagger-codegen
 */
class EventInfoUrl implements ArrayAccess
{
    const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      * @var string
      */
    protected static $swaggerModelName = 'event_info_url';

    /**
      * Array of property to type mappings. Used for (de)serialization
      * @var string[]
      */
    protected static $swaggerTypes = [
        'fi' => 'string',
        'sv' => 'string',
        'en' => 'string'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      * @var string[]
      */
    protected static $swaggerFormats = [
        'fi' => 'url',
        'sv' => 'url',
        'en' => 'url'
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
        'fi' => 'fi',
        'sv' => 'sv',
        'en' => 'en'
    ];


    /**
     * Array of attributes to setter functions (for deserialization of responses)
     * @var string[]
     */
    protected static $setters = [
        'fi' => 'setFi',
        'sv' => 'setSv',
        'en' => 'setEn'
    ];


    /**
     * Array of attributes to getter functions (for serialization of requests)
     * @var string[]
     */
    protected static $getters = [
        'fi' => 'getFi',
        'sv' => 'getSv',
        'en' => 'getEn'
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
        $this->container['fi'] = isset($data['fi']) ? $data['fi'] : null;
        $this->container['sv'] = isset($data['sv']) ? $data['sv'] : null;
        $this->container['en'] = isset($data['en']) ? $data['en'] : null;
    }

    /**
     * show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalid_properties = [];

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

        return true;
    }


    /**
     * Gets fi
     * @return string
     */
    public function getFi()
    {
        return $this->container['fi'];
    }

    /**
     * Sets fi
     * @param string $fi Link to Finnish page
     * @return $this
     */
    public function setFi($fi)
    {
        $this->container['fi'] = $fi;

        return $this;
    }

    /**
     * Gets sv
     * @return string
     */
    public function getSv()
    {
        return $this->container['sv'];
    }

    /**
     * Sets sv
     * @param string $sv Link to Swedish page
     * @return $this
     */
    public function setSv($sv)
    {
        $this->container['sv'] = $sv;

        return $this;
    }

    /**
     * Gets en
     * @return string
     */
    public function getEn()
    {
        return $this->container['en'];
    }

    /**
     * Sets en
     * @param string $en Link to English page
     * @return $this
     */
    public function setEn($en)
    {
        $this->container['en'] = $en;

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


