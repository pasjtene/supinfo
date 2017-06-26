<?php

namespace Web\MainBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Tools\FunglobeUtils;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Tools\RestClient;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="main_homepage", options={"expose"=true})
     */
    public function indexAction()
    {
        return $this->redirect($this->generateUrl("main_register"));
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
        $array = ["login"=>"login"];

        if($request->isMethod("POST"))
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
        $array = ['valid' => 1, 'message' => ""];

        $email = $request->get('email');
        $token = $request->get('confirmationtoken');

        ///TODO Envoyer un requete pour vérifier la validité
        if(!isset($email) || !isset($token)){
            return $this->redirect($this->generateUrl("main_login"));
        }

        if($request->isMethod('POST'))
        {
            $password = $request->get('password');

            if(!isset($password)){
                return $this->redirect($this->generateUrl("main_login"));
            }
            else
            {
                $data = ['email' => $email, 'password' => $password];

                $client = new RestClient(RestClient::$PUT_METHOD, 'reset-password', null, $data);

                if($client->getStatusCode() == 200)
                {
                    $contents = \GuzzleHttp\json_decode($client->getContent());

                    $array['valid'] = 2;
                    $array['message'] = $client->getContent();
                }
                else{
                    $array['valid'] = 0;
                    $array['message'] = $client->getContent();
                }
            }
        }
        else
        {
            $data = ['email' => $email, 'token' => $token];

            $client = new RestClient(RestClient::$POST_METHOD, 'verify-reset-password', null, $data);

            if ($client->getStatusCode() == 200) {
                $contents = \GuzzleHttp\json_decode($client->getContent());
            } else {
                $array['valid'] = 0;
                $array['message'] = $client->getContent();
            }
        }

        return $this->render('MainBundle:Default:reset-password.html.twig', $array);
    }
}
