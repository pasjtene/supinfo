<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 8/19/17
 * Time: 3:42 PM
 */

namespace Web\AppBundle\Tools;


use Web\AppBundle\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;

class GenericUserTask
{
    /**
     * Get the generic user.
     *
     * @return UserInterface|null
     */
    public static function run($data)
    {
        if (! is_null($data))
        {
            $obj = new User();

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