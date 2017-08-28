<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Web\AppBundle\Controller\TokenAuthenticatedController;
use Web\AppBundle\Tools\FunglobeUtils;

/**
 * @Route("/mail")
 */
class MailController extends Controller implements TokenAuthenticatedController
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
        $confirm =$this->generateUrl("main_confirm",["email"=>$email, "name"=>$name, "key"=>md5($email.$name)],UrlGeneratorInterface::ABSOLUTE_URL);
        $logo = str_replace("/en/","/",$logo);
        $logo = str_replace("/fr/","/",$logo);
        $url = $this->generateUrl("main_emailConfirm",["email"=>$email,"name"=>$name,"password"=>$password,"key"=>md5($password.$email)],UrlGeneratorInterface::ABSOLUTE_URL);
        $urlPassword = $this->generateUrl("main_forgot_password",[],UrlGeneratorInterface::ABSOLUTE_URL);
        $logo .="logo.ico";

        $array = ["confirm"=>$confirm, "email"=>$email, "name"=>$name, "password"=>$password,"urlPassword"=>$urlPassword, "url"=>$url,"logo"=>$logo, "key"=>md5($password.$email)];
        return $this->render('MainBundle:Mail:emailConfirm.html.twig',$array);
    }


    /**
     * @Route("/invitation/{from}/{to}/{id}/{name}/{gender}/{nameTo}/{message}", name="main_email_invitation", options={"expose"=true})
     */
    public function invitationAction($from, $to,$id, $name,$gender,$nameTo,$message)
    {
        $logo =$this->generateUrl("main_homepage",[],UrlGeneratorInterface::ABSOLUTE_URL);
        $logo = str_replace("/en/","/",$logo);
        $logo = str_replace("/fr/","/",$logo);
        $photo = str_replace("/fr/","/",$logo);
        $url = $this->generateUrl("main_forgot_password",[],UrlGeneratorInterface::ABSOLUTE_URL);
        $logo .="logo.ico";
        $moreLink =$this->generateUrl("main_profile_friends",[],UrlGeneratorInterface::ABSOLUTE_URL);
        $acceptLink =$this->generateUrl("main_friends_accept",["to"=>15, "from"=>20,"name"=>"name"],UrlGeneratorInterface::ABSOLUTE_URL);
        $declineLink =$this->generateUrl("main_friends_decline",["to"=>15, "from"=>20,"name"=>"name"],UrlGeneratorInterface::ABSOLUTE_URL);

        $array = ["moreLink"=>$moreLink, "acceptLink"=>$acceptLink, "declineLink"=>$declineLink,"to"=>$to, "gender"=>$gender,"from"=>$from, "name"=>$name, "photo"=>$photo,"url"=>$url,"logo"=>$logo,"id"=>$id,"nameTo"=>$nameTo,"message"=>$message];
        return $this->render('MainBundle:Mail:invitation.html.twig',$array);
    }


}
