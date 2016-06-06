<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Description of FrontendController.
 *
 * @author cifren
 */
class FrontendController extends Controller
{
    public function defaultAction()
    {
        return $this->render('EarlsLionBiBundle:Frontend:default.html.twig');
    }
}
