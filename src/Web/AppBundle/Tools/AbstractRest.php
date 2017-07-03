<?php

namespace Web\AppBundle\Tools;

use Bazinga\Bundle\JsTranslationBundle\Controller\Controller;
use GuzzleHttp\Client;
use Web\AppBundle\Inc\Parameter;


abstract class AbstractRest
{
    /**
     * @var Client
     */
    protected $client;

    protected $statusCode;

    protected $content;

    protected $response;

    public  $option = ['http://www.funglobe.com/api/v1/','127.0.0.1:8000/v1/','127.0.0.1:8000/api/v1/'];

    /**
     * @var string
     */
    protected $baseUrl;   //='127.0.0.1:8000/v1/';

    public  function  __construct(){
        //modifier l'option suivant  la spécification
        $this->setBaseUrl(Parameter::$baseUrl);
        //$this->setBaseUrl($this->option[1]);
        //$this->baseUrl = $this->container->getParameter('baseUrl');;
    }

    /**
     * @return Client
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * @param Client $client
     * @return AbstractRest
     */
    public function setClient($client)
    {
        $this->client = $client;

        return $this;
    }

    /**
     * @return string
     */
    public function getBaseUrl()
    {
        return $this->baseUrl;
    }

    /**
     * @param mixed $baseUrl
     * @return AbstractRest
     */
    public function setBaseUrl($baseUrl)
    {
        $this->baseUrl = $baseUrl;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * @param mixed $response
     */
    public function setResponse($response)
    {
        $this->response = $response;
    }

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param mixed $statusCode
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }


}
