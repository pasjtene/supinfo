<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 6/22/17
 * Time: 7:19 AM
 */

namespace Web\AppBundle\Tools;


use Symfony\Component\DependencyInjection\ContainerInterface;

class FunglobeUtils
{
    /**
     * Encoder le mot de passe de l'utilisateur
     *
     * @param ContainerInterface $container
     * @param object $object
     * @param string $password
     * @param string $salt
     * @return string
     */
    public static function encodePassword($container, $object, $password, $salt)
    {
        $factory = $container->get('security.encoder_factory');
        $encoder = $factory->getEncoder($object);
        $password = $encoder->encodePassword($password, $salt);

        return $password;
    }

    /**
     * Afficher le contenu d'une variable et arrête l'exécution
     *
     * @param $data
     */
    public static function dump($data)
    {
        var_dump($data);
        die();
    }

    /**
     * Retourne tous les rôles défini dans l'application
     *
     * @return array
     */
    public static function getAppRoles($role)
    {
        $roles = [
            'ROLE_ADMIN' => [
                ["name_en" => "Member", "name_fr" => "Membre", "value" => 'ROLE_MEMBER'],
                ["name_en" => "Moderator", "name_fr" => "Modérateur", "value" => 'ROLE_MODERATOR'],
                ["name_en" => "Administrator", "name_fr" => "Administrateur", "value" => 'ROLE_ADMIN']
            ],
            'ROLE_MODERATOR' => [
                ["name_en" => "Member", "name_fr" => "Membre", "value" => 'ROLE_MEMBER'],
                ["name_en" => "Moderator", "name_fr" => "Modérateur", "value" => 'ROLE_MODERATOR']
            ]
        ];

        return $roles[$role];
    }
















}