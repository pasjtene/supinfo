<?php

namespace App\Rest;

/**
 * Interface RestInterface.
 *
 *  @author Eric Cabrel TIOGO <tericcabrel@yahoo.com>
 */
interface RestInterface
{
    public function getBaseUrl();

    public function getResponse();

    public function getStatusCode();

    public function getContent();
}