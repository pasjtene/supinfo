<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Tools\FunglobeUtils;

/**
 * @Route("/mail")
 */
class MailController extends Controller
{
    /**
     * @Route("/confirm", name="main_emailConfirm", options={"expose"=true})
     */
    public function indexAction($email, $name, $password,$url,$logo)
    {
        $array = ["email"=>$email, "name"=>$name, "password"=>$password, "url"=>$url, "logo"=>$logo];
        return $this->render('MainBundle:Mail:emailConfirm.html.twig',$array);
    }


}
