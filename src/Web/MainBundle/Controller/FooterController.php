<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/footer")
 */
class FooterController extends Controller
{
    /**
     * @Route("/", name="main_footer"))
     */
    public function indexAction()
    {
        return $this->render('MainBundle:Footer:index.html.twig');
    }

    /**
     * @Route("/privacy", name="main_footer_privacy"))
     */
    public function privacyAction()
    {
        return $this->render('MainBundle:Footer:privacy.html.twig');
    }
    /**
     * @Route("/phone", name="main_footer_phone"))
     */
    public function phoneAction()
    {
        return $this->render('MainBundle:Footer:phone.html.twig');
    }
    /**
     * @Route("/about", name="main_footer_about"))
     */
    public function aboutAction()
    {
        return $this->render('MainBundle:Footer:about.html.twig');
    }

    /**
     * @Route("/test2", name="main_footer_test2"))
     */
    public function test2Action()
    {
        return $this->render('MainBundle:Footer:test2.html.twig');
    }

    /**
     * @Route("/presse", name="main_footer_presse"))
     */
    public function presseAction()
    {
        return $this->render('MainBundle:Footer:presse.html.twig');
    }

    /**
     * @Route("/help", name="main_footer_help"))
     */
    public function helpAction()
    {
        return $this->render('MainBundle:Footer:help.html.twig');
    }



}
