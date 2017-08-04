<?php

namespace Web\MainBundle\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;
use Web\AppBundle\Entity\User;
use Web\AppBundle\Tools\FunglobeUserProvider;
use Web\AppBundle\Tools\FunglobeUtils;
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
     * @Route("/profile/photo/request", name="main_photo_request", options={"expose"=true})
     */
    public function photoRequestAction()
    {
        $array = [];
        return $this->render('MainBundle:Default:photo-request.html.twig', $array);
    }


    /**
     * @Route("/profile/email/request", name="main_email_request", options={"expose"=true})
     */
    public function emailRequestAction(Request $request)
    {
        /** @var User $user */
        $user =  $this->getUser();

        $array = [];

        $data = ['email' => $user->getEmail()];

        $client = new RestClient(RestClient::$PUT_METHOD, 'auth/verify/email',$user->getToken(), $data);

       // var_dump($client->getContent());
       // die();
        if($client->getStatusCode() == 200)
        {
            $contents = \GuzzleHttp\json_decode($client->getContent());
            $message= $this->get('translator')->trans('success.requestMail',["email_resp"=>$user->getEmail()],'alert');
            $array['successMessage'] = $message;
             //var_dump($array['successMessage']);
            // die();
            return $this->redirectToRoute("main_profile",$array);
        }

        $error =\GuzzleHttp\json_decode($client->getContent());
        $message =$this->get('translator')->trans('error.requestMail',[],'alert');
        $array['successMessage'] = $message;
        return $this->redirectToRoute("main_profile",$array);;
    }


    /**
     * @Route("/confirm/email", name="main_confirm", options={"expose"=true})
     */
    public function confirmAction(Request $request)
    {
        $email = $request->get("email");
        $password = $request->get("password");
        $lastkey = $request->get("pkeyfs");
        $key = ($password.$email);

        if($key!=$lastkey)
        {
            return $this->redirect($this->generateUrl("main_confirm_cancel"));
        }

        $data = ['email' => $email];

        $client = new RestClient(RestClient::$PUT_METHOD, 'confirm/email', [], $data);

        if($client->getStatusCode() == 200)
        {
            $contents = \GuzzleHttp\json_decode($client->getContent());

            $array['valid'] = 2;
            $array['message'] = \GuzzleHttp\json_decode($client->getContent());
            return $this->render('MainBundle:Default:success.html.twig',$array);
        }

        $array['valid'] = 0;
        $array['message'] =\GuzzleHttp\json_decode($client->getContent());
        return $this->render('MainBundle:Default:cancel.html.twig',$array);
    }


    /**
     * @Route("/confirm/cancel", name="main_confirm_cancel", options={"expose"=true})
     */
    public function confirmCancelAction(Request $request)
    {
        $array = ["message"=>"Bad request "];
        return $this->render('MainBundle:Default:cancel.html.twig',$array);
    }

    /**
     * @Route("/register", name="main_register", options={"expose"=true})
     */
    public function registerAction(Request $request)
    {
        $days =[];
        $months =[];
        $years =[];

        for($i=1; $i<32;$i++){
            $days[] = $i<10? "0".$i:$i;
        }
        for($i=1; $i<13;$i++){
            $months[] = $i<10? "0".$i:$i;
        }
        $year = (int)date("Y");
        $year = $year -5;
        for($i=$year; $i>1960;$i--){
            $years[] = $i;
        }
        $array = ["days"=>$days,"months"=>$months, "years"=>$years];
        return $this->render('MainBundle:Default:register.html.twig',$array);
    }



    /**
     * @Route("/check-auth", name="main_checkauth",options={"expose"=true})
     */
    public function check_authAction(Request $request)
    {

        $email = $request->get('email');
        $token = $request->get('token');
        $password = $request->get('password');

        //si  l'email ou  le token ou le password  n'existe pas il  faut  qu'il  se connecte via main_login
        if(!isset($email) || !isset($token)){
            return $this->redirect($this->generateUrl("main_login"));
        }

        $data = ['email' => $email, 'password' => $password];

        $client = new RestClient(RestClient::$POST_METHOD, 'auth/login', $token, $data);

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
        return $this->redirect($this->generateUrl("main_profile"));
    }

    /**
     * @Route("/login", name="main_login", options={"expose"=true})
     */
    public function loginAction(Request $request)
    {
        $datas = ['error' => '', 'username' => '', "login"=>"ok"];

        /** @var AuthenticationException $error */
        $error = $request->getSession()->get(Security::AUTHENTICATION_ERROR);

        if(!is_null($error)){
            $datas['error'] = $error->getMessage();
            $datas['username'] = $request->getSession()->get(Security::LAST_USERNAME);

            $request->getSession()->remove(Security::AUTHENTICATION_ERROR);
            $request->getSession()->remove(Security::LAST_USERNAME);
        }

        return $this->render('MainBundle:Default:login.html.twig', $datas);
    }

    /**
     * @Route("/logout", name="main_logout")
     */
    public function logoutAction(Request $request)
    {
        $this->get('security.context')->setToken(null);
    }

    /**
     * @Route("/forgot-password", name="main_forgot_password", options={"expose"=true})
     */
    public function forgotAction(Request $request)
    {
        $array = [];
        return $this->render('MainBundle:Default:forgot-password.html.twig', $array);
    }

    /**
     * @Route("/reset-password", name="main_reset_password", options={"expose"=true})
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

    /**
     * @Route("/user-locked", name="main_user_locked")
     */
    public function userLockedAction(Request $request)
    {
        $datas = [];

        //$this->get('security.context')->setToken(null);

        return $this->render('MainBundle:Default:user-locked.html.twig', $datas);
    }
}
