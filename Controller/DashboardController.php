<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Description of DashboardController.
 *
 * @author cifren
 */
class DashboardController extends Controller
{
    public function DefaultAction()
    {
        return $this->render('EarlsLionBiBundle:Admin:dashboard.html.twig', array());
    }
}
