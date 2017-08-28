<?php

namespace Web\AdminBundle\Controller;

use Carbon\CarbonInterval;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Web\AppBundle\Security\FormAuthenticator;
use Web\AppBundle\Tools\FunglobeUtils;
use Web\AppBundle\Tools\RestClient;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="admin_home", options={"expose"=true})
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
        $datas = ['menuindex' => 0, 'member' => null, 'roles' => []];

        $cookie = $request->cookies->get(FormAuthenticator::USER_COOKIE_NAME);

        if($cookie != null)
        {
            $tab = explode('|', $cookie);

            $client = new RestClient(RestClient::$GET_METHOD, 'auth/members/'.$id, $tab[1], null);

            if($client->getStatusCode() == 200)
            {
                $contents = \GuzzleHttp\json_decode($client->getContent());

                //FunglobeUtils::dump($contents);

                $datas['member'] = $contents->user;
                $datas['profile'] = $contents->profile;
                $datas['roles']  = FunglobeUtils::getAppRoles($this->getUser()->getRoles()[0]);
            }
        }

        //FunglobeUtils::dump($datas);

        $joinDate = new \DateTime($datas['member']->joinDate);
        $dateInterval = $joinDate->diff(new \DateTime());

        CarbonInterval::setLocale($request->getLocale());

        $lastLogin = is_null($datas['member']->lastLogin) ? "" : \Carbon\Carbon::createFromTimeStamp(strtotime($datas['member']->lastLogin))->diffForHumans();

        $jDate = CarbonInterval::years($dateInterval->y)->months($dateInterval->m)->days($dateInterval->days)->hours($dateInterval->h)->forHumans();

        $datas['lastLogin'] = $lastLogin;
        $datas['joinDate'] = $jDate;

        return $this->render('AdminBundle:Admin:member.html.twig', $datas);
    }

    /**
     * @Route("/members/{id}/pictures", name="admin_view_member_picture", requirements={"id": "\d+"})
     */
    public function memberPicturesAction(Request $request, $id)
    {
        $datas = ['menuindex' => 0, 'member' => null];

        $cookie = $request->cookies->get(FormAuthenticator::USER_COOKIE_NAME);

        if($cookie != null)
        {
            $tab = explode('|', $cookie);

            $client = new RestClient(RestClient::$GET_METHOD, 'auth/members/'.$id, $tab[1], null);

            if($client->getStatusCode() == 200)
            {
                $contents = \GuzzleHttp\json_decode($client->getContent());

                //FunglobeUtils::dump($contents);

                $datas['member'] = $contents->user;
            }
        }

        return $this->render('AdminBundle:Admin:member-pictures.html.twig', $datas);
    }

    /**
     * @Route("/home", name="admin_statistics", options={"expose"=true})
     */
    public function statisticsAction()
    {
        $datas = ['menuindex' => 4];

        //return $this->render('AdminBundle:Admin:statistics.html.twig', $datas);
        return $this->render('AdminBundle::p-admin-layout.html.twig', $datas);
    }

    /**
     * @Route("/members", name="admin_members", options={"expose"=true})
     */
    public function membersAction()
    {
        $datas = ['menuindex' => 0];

        return $this->render('AdminBundle:Admin:members.html.twig', $datas);
    }

    /**
     * @Route("/pictures", name="admin_pictures", options={"expose"=true})
     */
    public function picturesAction()
    {
        $datas = ['menuindex' => 1];

        return $this->render('AdminBundle:Admin:pictures.html.twig', $datas);
    }

    /**
     * @Route("/settings", name="admin_settings", options={"expose"=true})
     */
    public function settingsAction()
    {
        $datas = ['menuindex' => 4];

        return $this->render('AdminBundle:Admin:settings.html.twig', $datas);
    }

}


























