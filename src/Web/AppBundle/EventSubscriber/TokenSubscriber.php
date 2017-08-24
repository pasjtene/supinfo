<?php

namespace Web\AppBundle\EventSubscriber;

use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Csrf\TokenStorage\SessionTokenStorage;
use Web\AppBundle\Controller\TokenAuthenticatedController;
use Web\AppBundle\Entity\User;
use Web\AppBundle\Security\FormAuthenticator;
use Web\AppBundle\Tools\GenericUserTask;
use Web\AppBundle\Tools\RestClient;

class TokenSubscriber implements EventSubscriberInterface
{
    private $token;

    /** @var LoggerInterface  */
    private $logger;

    /** @var User */
    private $user;

    /** @var Session $session */
    private $session;

    /** @var  TokenStorage $tokenStorage */
    private $tokenStorage;

    public function __construct(LoggerInterface $logger, Session $session, TokenStorage $tokenStorage)
    {
        $this->logger = $logger;
        $this->session = $session;
        $this->tokenStorage = $tokenStorage;
    }

    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();

        /*
         * $controller passed can be either a class or a Closure.
         * This is not usual in Symfony but it may happen.
         * If it is a class, it comes in array format
         */
        if (!is_array($controller)) {
            return;
        }

        if ($controller[0] instanceof TokenAuthenticatedController)
        {
            $request = $event->getRequest();
            $url = $request->getSchemeAndHttpHost().$request->getRequestUri();

            $this->logger->info($url);

            /** @var User $userConnecte */
            $userConnecte  = $this->tokenStorage->getToken()->getUser();
            $userConnecte  = $userConnecte=="anon."? null: $userConnecte;
            //$user= $this->container->get('security.token_storage')->getToken()->getUser();

           // var_dump($userConnecte);
           // die();
            if(is_null($userConnecte))
            {
                $this->token = $request->cookies->get(FormAuthenticator::USER_COOKIE_NAME);

                //var_dump($this->token);
                //die();

                if(!is_null($this->token))
                {

                    $tab = explode('|', $this->token);

                    $this->user = $this->getUser($tab[0], $tab[1]);


                    if(!is_null($this->user))
                    {
                        $this->user->setToken($tab[1]);
                        $token = new UsernamePasswordToken($this->user, null, 'main', $this->user->getRoles());
                        $this->tokenStorage->setToken($token);
                        $this->session->set('_security_main',serialize($token));
                    }
                }
            }

        }
    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::CONTROLLER => 'onKernelController',
        );
    }

    public function getUser($id, $token)
    {
        $user = null;

        $client = new RestClient(RestClient::$GET_METHOD, 'auth/members/'.$id, $token);

        if($client->getStatusCode() == 200)
        {
            $contents = \GuzzleHttp\json_decode($client->getContent());

            $user = GenericUserTask::run($contents);
        }

        return $user;
    }
}