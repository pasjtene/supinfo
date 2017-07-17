<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Tools\FunglobeUtils;

/**
 * @Route("/profile")
 */
class ProfileController extends Controller
{
    /**
     * @Route("/", name="main_profile", options={"expose"=true})
     */
    public function indexAction()
    {
        $array['subPage'] = "matches";
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }


    /**
     * @Route("/photos", name="main_profile_photos", options={"expose"=true})
     */
    public function photosAction()
    {
        $array['subPage'] = "photos";
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }

}
