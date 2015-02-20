<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Description of DashboardController
 *
 * @author cifren
 */
class ReportController extends Controller
{

    public function ListAction()
    {
        $list = $this->getEntityManager()->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->findAll();

        return $this->render('EarlsLionBiBundle:Admin/Report:list.html.twig', array(
                    'reportList' => $list
        ));
    }
    
    public function EditorAction()
    {

        return $this->render('EarlsLionBiBundle:Admin/Report:editor.html.twig', array(
        ));
    }

    protected function getEntityManager()
    {
        $emName = $this->container->getParameter('lion_bi_entity_manager_name');
        if ($emName) {
            $em = $this->getDoctrine()->getEntityManager($emName);
        } else {
            $em = $this->getDoctrine()->getEntityManager();
        }

        return $em;
    }

}
