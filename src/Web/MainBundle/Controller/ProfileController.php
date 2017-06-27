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
        return $this->render('MainBundle:Profile:index.html.twig');
    }


}
