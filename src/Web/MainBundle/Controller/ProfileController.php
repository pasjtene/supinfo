<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Controller\TokenAuthenticatedController;
use Web\AppBundle\Tools\FunglobeUtils;

/**
 * @Route("/profile")
 */
class ProfileController extends Controller implements TokenAuthenticatedController
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
    public function photosAction(Request $request)
    {
        $array['subPage'] = "photos";

        $active = $request->get("active")==null? 1 : $request->get("active");
        $array['active'] = $active;
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }


    /**
     * @Route("/messages", name="main_profile_messages", options={"expose"=true})
     */
    public function messagesAction()
    {
        $array['subPage'] = "messages";
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }

    /**
     * @Route("/messages/current/{key}", name="main_profile_messages_detail", options={"expose"=true})
     */
    public function messagesDetailAction($key)
    {
        $array['subPage'] = "messages";
        $array['key'] = $key;
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }


    /**
     * @Route("/vips", name="main_profile_vips", options={"expose"=true})
     */
    public function vipsAction()
    {
        $array['subPage'] = "vips";
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }


    /**
     * @Route("/compte", name="main_profile_compte", options={"expose"=true})
     */
    public function compteAction()
    {
        $array['subPage'] = "compte";


        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }


    /**
     * @Route("/parameter", name="main_profile_parameter", options={"expose"=true})
     */
    public function parameterAction()
    {
        $array['subPage'] = "parameter";
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }


    /**
     * @Route("/friends", name="main_profile_friends", options={"expose"=true})
     */
    public function friendsAction()
    {
        $array['subPage'] = "friends";
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }


    /**
     * @Route("/detail/profile/{key}", name="main_profile_detailProfile", options={"expose"=true})
     */
    public function detailProfileAction($key)
    {
        $array['subPage'] = "detail-profile";
        $array['key'] = $key;
        return $this->render('MainBundle:Profile:index.html.twig',$array);
    }

}
