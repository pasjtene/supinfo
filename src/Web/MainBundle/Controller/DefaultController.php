<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="main_homepage")
     */
    public function indexAction()
    {
        return $this->render('MainBundle:Default:index.html.twig');
    }

    /**
     * @Route("/register", name="main_register")
     */
    public function registerAction(Request $request)
    {
        $array = [];
        return $this->render('MainBundle:Default:register.html.twig',$array);
    }


    /**
     * @Route("/login", name="main_login")
     */
    public function loginAction(Request $request)
    {
        $array = [];
        return $this->render('MainBundle:Default:login.html.twig',$array);
    }

    /**
     * @Route("/forgot-password", name="main_forgot_password")
     */
    public function forgotAction(Request $request)
    {
        $array = [];
        return $this->render('MainBundle:Default:forgot-password.html.twig', $array);
    }

    /**
     * @Route("/reset-password", name="main_reset_password")
     */
    public function resetAction(Request $request)
    {
        $array = ['valid' => 1];

        $email = $request->get('email');
        $token = $request->get('confirmationtoken');

        ///TODO Envoyer un requete pour vérifier la validité

        return $this->render('MainBundle:Default:reset-password.html.twig', $array);
    }
}
