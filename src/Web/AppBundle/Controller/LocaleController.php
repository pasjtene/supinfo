<?php



namespace Web\AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/locale")
 */
class LocaleController extends Controller
{

    /**
     * Change language
     *
     * @return array
     *
     * @Route("/", name="app_locale")
     */
    public function changeLocaleAction(Request $request)
    {
        /** @var Session $session */
        $session = $this->get('session');


        // recuperer la locale courante de l'utilisateur
        $lastlanguage =$session->get('_locale')==null? $request->getLocale():$this->get('session')->get('_locale');
        // recuperer l'adresse courant de l'utilisateur
        $url = $request->headers->get('referer');
        //recuperer la lcale sans les espaces
        $language = trim($lastlanguage)=='fr'? 'en': 'fr';
        // modifier la session par la locale courante
        if($language != null)
        {
            $session->set('_locale',$language);
           // $this->getRequest()->setLocale($language);
        }

        // tester l'existance de l'url
        if(empty($url))
        {
            //je renvoi vers la première page au cas ou l'url est null ou vide
            $url = $this->container->get('router')->generate('main_homepage');
        }

        //je remplace dans l'adresse courante le parametre de langue par la langue actuelle
       $newurl = str_replace('/'.$lastlanguage.'/', '/'.$language.'/', $url);
        //je renvoi  la vue a l'utilisateur
        return new RedirectResponse($newurl);
    }



    /**
     * Change language
     *
     * @return array
     *
     * @Route("/fr", name="app_locale_fr")
     */
    public function changeLocaleFrAction(Request $request)
    {
        /** @var Session $session */
        $session = $this->get('session');


        // recuperer la locale courante de l'utilisateur
        $lastlanguage =$session->get('_locale')==null? $request->getLocale():$this->get('session')->get('_locale');
        // recuperer l'adresse courant de l'utilisateur
        $url = $request->headers->get('referer');
        //recuperer la lcale sans les espaces
        $language =  'fr';
        // modifier la session par la locale courante
        if($language != null)
        {
            $session->set('_locale',$language);
            // $this->getRequest()->setLocale($language);
        }

        // tester l'existance de l'url
        if(empty($url))
        {
            //je renvoi vers la première page au cas ou l'url est null ou vide
            $url = $this->container->get('router')->generate('main_homepage');
        }

        //je remplace dans l'adresse courante le parametre de langue par la langue actuelle
        $newurl = str_replace('/'.$lastlanguage.'/', '/'.$language.'/', $url);
        //je renvoi  la vue a l'utilisateur
        return new RedirectResponse($newurl);
    }


    /**
     * Change language
     *
     * @return array
     *
     * @Route("/en", name="app_locale_en")
     */
    public function changeLocaleEnAction(Request $request)
    {
        /** @var Session $session */
        $session = $this->get('session');


        // recuperer la locale courante de l'utilisateur
        $lastlanguage =$session->get('_locale')==null? $request->getLocale():$this->get('session')->get('_locale');
        // recuperer l'adresse courant de l'utilisateur
        $url = $request->headers->get('referer');
        //recuperer la lcale sans les espaces
        $language =  'en';
        // modifier la session par la locale courante
        if($language != null)
        {
            $session->set('_locale',$language);
            // $this->getRequest()->setLocale($language);
        }

        // tester l'existance de l'url
        if(empty($url))
        {
            //je renvoi vers la première page au cas ou l'url est null ou vide
            $url = $this->container->get('router')->generate('main_homepage');
        }

        //je remplace dans l'adresse courante le parametre de langue par la langue actuelle
        $newurl = str_replace('/'.$lastlanguage.'/', '/'.$language.'/', $url);
        //je renvoi  la vue a l'utilisateur
        return new RedirectResponse($newurl);
    }
}