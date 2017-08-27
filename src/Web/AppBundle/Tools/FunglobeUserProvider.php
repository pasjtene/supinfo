<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 6/25/17
 * Time: 5:36 AM
 */

namespace Web\AppBundle\Tools;

use Web\AppBundle\Entity\User;
use Doctrine\ORM\NoResultException;
use Psr\Container\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Web\AppBundle\Tools\RestClient;

class FunglobeUserProvider implements UserProviderInterface
{
    /** @var RequestStack */
    private $request;

    /** @var UserInterface */
    protected $user;

    /**
     * FunglobeUserProvider constructor.
     *
     */
    public function __construct(ContainerInterface $container)
    {
        $this->request = $container->get('request_stack')->getMasterRequest();
        $this->user = null;
    }

    /**
     * @param ContainerInterface $container
     */
    /*public function setRequest(ContainerInterface $container ) {

        $this->request = $container->get('request_stack');
    }*/

    /**
     * @param $email
     * @param $password
     *
     * @return UserInterface User
     */
    public function getLogin($email, $password, $baseToken)
    {
        $user = null;

        $data = ['_username' => $email, '_password' => $password];

        $client = new RestClient(RestClient::$POST_METHOD, 'auth/login', $baseToken, $data);

        if($client->getStatusCode() == 200)
        {
            $contents = \GuzzleHttp\json_decode($client->getContent());

            $user = $this->getGenericUser($contents);

            $this->user = $user;
        }
        else {
            //FunglobeUtils::dump($client->getContent());
            throw new UsernameNotFoundException();
        }

        return $user;
    }

    /**
     * Loads the user for the given username.
     *
     * This method must throw UsernameNotFoundException if the user is not
     * found.
     *
     * @param string $username The username
     *
     * @return UserInterface
     *
     * @throws UsernameNotFoundException if the user is not found
     */
    public function loadUserByUsername($username)
    {
        try
        {
            $param = [
                'password' => $this->request->request->get('password'),
                'btoken' => $this->request->request->get('basetoken')
            ];

            $user = $this->getLogin($username, $param['password'], $param['btoken']);

            if(is_null($user)){
                throw new UsernameNotFoundException("Bad credentials !");
            }

            $this->user = $user;
        } catch (NoResultException $e) {
            $user = null;
        }

        return $user;
    }

    /**
     * Refreshes the user for the account interface.
     *
     * It is up to the implementation to decide if the user data should be
     * totally reloaded (e.g. from the database), or if the UserInterface
     * object can just be merged into some internal array of users / identity
     * map.
     *
     * @param UserInterface $user
     *
     * @return UserInterface
     *
     * @throws UnsupportedUserException if the account is not supported
     */
    public function refreshUser(UserInterface $user)
    {
        $class = get_class($user);

        if (!$this->supportsClass($class)) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $class));
        }

        return $user;
    }

    /**
     * Whether this provider supports the given user class.
     *
     * @param string $class
     *
     * @return bool
     */
    public function supportsClass($class)
    {
        return $class === 'Web\AppBundle\Entity\User';
    }

    /**
     * Get the generic user.
     *
     * @return UserInterface|null
     */
    protected function getGenericUser($data)
    {
        if (! is_null($data))
        {

            $obj = new User();

            $obj->setToken($data->value);
            $obj->setId($data->user->id);
            $obj->setFirstName($data->user->firstName);
            $obj->setLastName($data->user->lastName);
            $obj->setIsOnline($data->user->isOnline);
            $obj->setBirthDate(new \DateTime($data->user->birthDate));
            $obj->setProfession($data->user->profession);
            $obj->setType($data->user->type);
            $obj->setJoinReason($data->user->joinReason);
            $obj->setIsEmailVerified($data->user->isEmailVerified);
            $obj->setIsVip($data->user->isVip);
            $obj->setGender($data->user->gender);
            $obj->setPhones($data->user->phones);
            $obj->setProfileVisibility($data->user->profileVisibility);
            $obj->setJoinDate($data->user->joinDate);
            $obj->setConfirmPassword($data->user->confirmPassword);
            $obj->setCity($data->user->city);
            $obj->setCountry($data->user->country);
            $obj->setUsername($data->user->username);
            $obj->setUsernameCanonical($data->user->usernameCanonical);
            $obj->setSalt($data->user->salt);
            $obj->setEmail($data->user->email);
            $obj->setEmailCanonical($data->user->emailCanonical);
            $obj->setPassword($data->user->password);
            $obj->setPlainPassword($data->user->plainPassword);
            $obj->setLastLogin(new \DateTime($data->user->lastLogin));
            $obj->setConfirmationToken($data->user->confirmationToken);
            $obj->setRoles($data->user->roles);
            $obj->setEnabled($data->user->enabled);
            $obj->setPasswordRequestedAt($data->user->passwordRequestedAt);

            return $obj;
        }

        return null;
    }
}
