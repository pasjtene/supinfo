<?php

namespace Web\MainBundle\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;
use Web\AppBundle\Controller\TokenAuthenticatedController;
use Web\AppBundle\Entity\User;
use Web\AppBundle\Tools\FunglobeUserProvider;
use Web\AppBundle\Tools\FunglobeUtils;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Tools\RestClient;

/**
 * @Route("/friends")
 */
class FriendsController extends Controller implements TokenAuthenticatedController
{
    /**
     * @Route("/accept", name="main_friends_accept", options={"expose"=true})
     */
    public function acceptAction(Request $request)
    {
        /** @var User $user */
        $user = $this->getUser();
        $array = [];

        $data = ["to"=>$request->get("to"), "from"=>$request->get("from"), "name"=>$request->get("name")];

        $client = new RestClient(RestClient::$PUT_METHOD, 'friends/accept',[], $data);

       // var_dump($client->getContent());
       // die();
        if($client->getStatusCode() == 200)
        {
            $contents = \GuzzleHttp\json_decode($client->getContent());
            $message= $this->get('translator')->trans('accept.success',["name"=>$request->get("name")],'alert');
            $array['successMessage'] = $message;
             //var_dump($array['successMessage']);
            // die();
            if($user!=null)
            {
                return $this->redirectToRoute("main_profile",$array);
            }
            else{

            }

        }

        $error =\GuzzleHttp\json_decode($client->getContent());
        $message =$this->get('translator')->trans('accept.error',[],'alert');
        $array['successMessage'] = $message;
        if($user!=null)
        {
            return $this->redirectToRoute("main_profile",$array);
        }
        else{

        }
    }


    /**
     * @Route("/decline", name="main_friends_decline", options={"expose"=true})
     */
    public function declineAction(Request $request)
    {
        /** @var User $user */
        $user = $this->getUser();
        $array = [];

        $data = ["to"=>$request->get("to"), "from"=>$request->get("from"), "name"=>$request->get("name")];

        $client = new RestClient(RestClient::$PUT_METHOD, 'friends/accept',[], $data);

        // var_dump($client->getContent());
        // die();
        if($client->getStatusCode() == 200)
        {
            $contents = \GuzzleHttp\json_decode($client->getContent());
            $message= $this->get('translator')->trans('accept.success',["name"=>$request->get("name")],'alert');
            $array['successMessage'] = $message;
            //var_dump($array['successMessage']);
            // die();
            if($user!=null)
            {
                return $this->redirectToRoute("main_profile",$array);
            }
            else{

            }

        }

        $error =\GuzzleHttp\json_decode($client->getContent());
        $message =$this->get('translator')->trans('accept.error',[],'alert');
        $array['successMessage'] = $message;
        if($user!=null)
        {
            return $this->redirectToRoute("main_profile",$array);
        }
        else{

        }
    }

}
