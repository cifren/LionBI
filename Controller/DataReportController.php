<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Earls\LionBiBundle\Form\DataReport\Type\DataType;
use Earls\LionBiBundle\Form\DataReport\Handler\DataHandler;
use Earls\LionBiBundle\Entity\LnbDataReport;

/**
 * 
 * @author cifren
 */
class DataReportController extends Controller
{

    public function listAction()
    {
        $list = $this->getEntityManager()->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->findAll();

        return $this->render('EarlsLionBiBundle:Admin/DataReport:list.html.twig', array(
                    'reportList' => $list
        ));
    }

    public function editorAction()
    {


        return $this->render('EarlsLionBiBundle:Admin/DataReport:editor.html.twig', array(
        ));
    }

    public function saveDataReportAction($request)
    {
        $em = $this->getEntityManager();
        if ($request->get('id')) {
            $entity = $em->getRepository('Earls\LionBiBundle\Entity\LnbDataReport')->find($id);
        } else {
            $entity = new LnbDataReport();
        }
        $form = $this->createForm(new DataType(), $entity);
        $handler = new DataHandler();
        //$dataRequest = $handler->processRequest($form, $request);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em->persist();
            $em->flush();
        }

        $aryEntity = $entity->getArray();

        return new JsonResponse($aryEntity);
    }

    public function getJsonDataReportAction($id)
    {
        
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
