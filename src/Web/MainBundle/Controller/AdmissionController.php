<?php

namespace Web\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Controller\TokenAuthenticatedController;

/**
 * @Route("/admission")
 */
class AdmissionController extends Controller implements TokenAuthenticatedController
{
    /**
     * @Route("/admission", name="main_admission"))
     */
    public function admissionAction()
    {
        return $this->render('MainBundle:views:Admission.html.twig');
    }


}
