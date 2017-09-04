<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Controller\TokenAuthenticatedController;

/**
 * @Route("/footer")
 */
class FooterController extends Controller implements TokenAuthenticatedController
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
        //return $this->render('MainBundle:Footer:phone.html.twig');
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

    /**
     * @Route("/city", name="main_footer_city"))
     */
    public function cityAction()
    {
        return $this->render('MainBundle:Footer:city.html.twig');
    }

    /**
     * @Route("/confid", name="main_footer_confid"))
     */
    public function confidAction()
    {
        return $this->render('MainBundle:Footer:confid.html.twig');
    }
    /**
     * @Route("/job", name="main_footer_job"))
     */
    public function jobAction()
    {
        return $this->render('MainBundle:Footer:job.html.twig');
    }
    /**
     * @Route("/safety", name="main_footer_safety"))
     */
    public function safetyAction()
    {
        return $this->render('MainBundle:Footer:safety.html.twig');
    }





}
