<?php

namespace Web\AppBundle\Tools;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use JMS\Serializer\Tests\Fixtures\Log;


class RestClient extends AbstractRest implements RestInterface
{
    public static $POST_METHOD = 'POST';
    public static $PUT_METHOD = 'PUT';
    public static $GET_METHOD = 'GET';
    public static $DELETE_METHOD = 'DELETE';

    public static $TOKEN_COOKIE_NAME = "festiToken";

    /**
     * RestClient constructor.
     * @param $method
     * @param $endpoint
     * @param null $data
     * @param null $contentType
     * @param null $token
     */
    public function __construct($method, $endpoint, $token = null, $data = null, $contentType = null)
    {
        parent::__construct();
        $options = [];
        $headers = ['Accept' => is_null($contentType) ? 'application/json' : $contentType];

        if(is_null($contentType) AND is_array($data)){
            $options['json'] = $data;
        }

        if(!is_null($token)){

            $headers['X-Auth-Token'] = $token;
        }
        $options['headers'] = $headers;

        try
        {
            $this->client = new Client($options);

            $this->response = $this->client->request($method, $this->baseUrl . $endpoint);

            $this->setStatusCode($this->response->getStatusCode());

            $this->setContent($this->response->getBody()->getContents());
        }
        catch(ClientException $ex)
        {
            $response = $ex->getResponse();

            $this->setStatusCode(!is_null($response) ? $response->getStatusCode() : 500);
            $this->setContent(!is_null($response) ? $response->getBody()->getContents() : null);
        }

    }
}