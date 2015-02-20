<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Description of CommonController
 *
 * @author cifren
 */
class CommonController extends Controller
{

    public function templateAction($templateName)
    {
        $decodedName = urldecode($templateName);
        return $this->render($decodedName);
    }

}
