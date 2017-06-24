<?php

namespace Web\AppBundle\Tools;


interface RestInterface
{
    public function getBaseUrl();

    public function getResponse();

    public function getStatusCode();

    public function getContent();
}