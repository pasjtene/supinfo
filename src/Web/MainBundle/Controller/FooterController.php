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

}
