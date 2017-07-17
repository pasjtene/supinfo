<?php

namespace AppBundle\Repository;

use AppBundle\Entity\User;
use Web\AppBundle\Tools\FunglobeUtils;
use Doctrine\ORM\Mapping;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\NoResultException;
use Psr\Container\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Web\AppBundle\Tools\RestClient;

/**
 * GeolocationRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class GeolocationRepository extends \Doctrine\ORM\EntityRepository
{

}