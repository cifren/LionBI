<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Description of CommonController.
 *
 * @author cifren
 */
class AdminController extends Controller
{
    public function defaultAction()
    {
        return $this->render('EarlsLionBiBundle:Admin:default.html.twig');
    }
}
