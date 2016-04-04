<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

use Earls\LionBiBundle\Entity\LnbReportConfig;

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
    
    public function EditorAction(Request $request)
    {
        $entity = new LnbReportConfig();
        $form = $this->createForm('Earls\LionBiBundle\Form\ReportData\Type\ReportType', $entity, array('method' => 'PUT'));
        $form->add('save', SubmitType::class, array('label' => 'Create'));
        
        $form->handleRequest($request);
        
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
        }
        
        return $this->render('EarlsLionBiBundle:Admin/Report:editor.html.twig', array('form' => $form->createView()));
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
