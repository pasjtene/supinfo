<?php
/**
 * Created by PhpStorm.
 * User: Danick Takam
 * Date: 02/07/2017
 * Time: 13:29
 */

namespace Web\AppBundle\Inc;

//Configurez le base url correspondant a l'installation de l'API ici.
//La valeure depend de votre installation locale.
//Ce fichier doit etre inclus dans .gitigore pour ne pas modifier la configuration des autre.

class Parameters
{

    //voici  les valeurs possibles actuellement que nous utilisons
    public  $option = ['http://www.funglobe.com/api/v1/','127.0.0.1:8000/v1/','api/v1/'];
    /**
     * @var string
     */
    public static  $baseUrl = '127.0.0.1:8000/v1/';
}