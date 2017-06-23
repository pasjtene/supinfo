<?php

namespace Web\AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Tools\FunglobeUtils;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->redirect($this->generateUrl("main_homepage"));
    }

    /**
     * @Route("/login")
     */
    public function loginAction(Request $request)
    {
        $param = json_decode($request->getContent(), true);

        $em = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $em->getRepository('ApiBundle:User')->loadUserByUsername($param['email']);

        if($user != null)
        {
            $password = FunglobeUtils::encodePassword($this->container, new User(), $request->get('password'), $user->getSalt());

            if($user->getPassword() === $password)
            {
                //$session_id = $em->getRepository('TootreeApiBundle:TootreeSession')->createSession($user->getId());
                //$session = $em->getRepository('TootreeApiBundle:TootreeSession')->find($session_id);
                return $this->redirect($this->generateUrl("main_profile"));
            }
        }

        return null;
    }
}
