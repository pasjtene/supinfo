<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Web\AppBundle\Tools\FunglobeUtils;

/**
 * @Route("/mail")
 */
class MailController extends Controller
{

    public  function  getAbsolutPath()
    {
        return __DIR__;
    }

    /**
     * @Route("/confirm/{email}/{name}/{password}", name="main_emailConfirm", options={"expose"=true})
     */
    public function indexAction($email, $name, $password)
    {
        $logo =$this->generateUrl("main_homepage",[],UrlGeneratorInterface::ABSOLUTE_URL);
        $logo = str_replace("/en/","/",$logo);
        $logo = str_replace("/fr/","/",$logo);
        $url = $this->generateUrl("main_emailConfirm",["email"=>$email,"name"=>$name,"password"=>$password,"key"=>md5($password.$email)],UrlGeneratorInterface::ABSOLUTE_URL);
        $urlPassword = $this->generateUrl("main_forgot_password",[],UrlGeneratorInterface::ABSOLUTE_URL);
        $logo .="logo.ico";

        $array = ["email"=>$email, "name"=>$name, "password"=>$password,"urlPassword"=>$urlPassword, "url"=>$url,"logo"=>$logo, "key"=>md5($password.$email)];
        return $this->render('MainBundle:Mail:emailConfirm.html.twig',$array);
    }


}
