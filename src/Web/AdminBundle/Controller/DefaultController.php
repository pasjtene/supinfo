<?php

namespace Web\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Security\FormAuthenticator;
use Web\AppBundle\Tools\FunglobeUtils;
use Web\AppBundle\Tools\RestClient;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="admin_home")
     */
    public function indexAction()
    {
        return $this->render('AdminBundle:Default:index.html.twig');
    }


    /**
     * @Route("/members/{id}", name="admin_view_member", options={"expose"=true}, requirements={"id": "\d+"})
     */
    public function memberAction(Request $request, $id)
    {
        $datas = ['member' => null, 'roles' => FunglobeUtils::getAppRoles()];

        $cookie = $request->cookies->get(FormAuthenticator::USER_COOKIE_NAME);

        if($cookie != null)
        {
            $tab = explode('|', $cookie);

            $client = new RestClient(RestClient::$GET_METHOD, 'auth/members/'.$id, $tab[1], null);

            if($client->getStatusCode() == 200)
            {
                $contents = \GuzzleHttp\json_decode($client->getContent());

                //FunglobeUtils::dump($contents);

                $datas['member'] = $contents;
            }
        }

        return $this->render('AdminBundle:Default:member.html.twig', $datas);
    }
}