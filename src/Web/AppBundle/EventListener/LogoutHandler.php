<?php
/**
 * Created by PhpStorm.
 * User: TERICCABREL
 * Date: 22/06/2017
 * Time: 19:41
 */

namespace Web\AppBundle\EventListener;

use Symfony\Component\Security\Http\Logout\LogoutHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManager;
use Web\AppBundle\Tools\FunglobeUtils;

class LogoutHandler  implements LogoutHandlerInterface
{
    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * Constructor
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * Do post logout stuff
     */
    public function logout(Request $request, Response $response, TokenInterface $authToken)
    {
        $user = $authToken->getUser();

        $authToken->setAuthenticated(false);
        $request->getSession()->invalidate();
        $response->headers->clearCookie('appfgewebckus');

        return $response;
    }
}