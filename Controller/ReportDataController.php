<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Earls\LionBiBundle\Form\ReportData\Type\ReportDataType;
use Earls\LionBiBundle\Entity\LnbReportData;
use Symfony\Component\HttpFoundation\Request;
use Earls\LionBiBundle\Model\CustomJsonResponse;

/**
 * 
 * @author cifren
 */
class ReportDataController extends Controller
{

    public function listAction()
    {
        $list = $this->getEntityManager()->getRepository('Earls\LionBiBundle\Entity\LnbReportData')->findAll();

        return $this->render('EarlsLionBiBundle:Admin/ReportData:list.html.twig', array(
                    'items' => $list
        ));
    }

    public function editorAction()
    {
        return $this->render('EarlsLionBiBundle:Admin/ReportData:editor.html.twig');
    }

    public function sqlEditorAction()
    {
        $entity = new LnbReportData();
        $form = $this->createForm(new ReportDataType(), $entity);

        return $this->render('EarlsLionBiBundle:Admin/ReportData:sqlEditor.html.twig', array(
                    'form' => $form->createView()
        ));
    }

    public function saveReportDataAction(Request $request)
    {
        $em = $this->getEntityManager();

        $requestReportData = $request->get('reportData');
        if (isset($requestReportData['id'])) {
            $id = $requestReportData['id'];
            unset($requestReportData['id']);
        } else {
            $id = null;
        }
        if ($id) {
            $entity = $em->getRepository('Earls\LionBiBundle\Entity\LnbReportData')->find($id);
        } else {
            $entity = new LnbReportData();
        }

        $form = $this->createForm(new ReportDataType(), $entity);
        $form->bind($requestReportData);

        $response = new CustomJsonResponse();
        if ($form->isValid()) {
            $em->persist($entity);
            $em->flush();
            $response->setStatus(CustomJsonResponse::VALID);
        } else {
            $response->setStatus(CustomJsonResponse::ERROR);
            $response->setFormErrors($form->getErrors(true));
            $strError = array();
            foreach ($form->getErrors() as $error) {
                $strError[] = $error->getMessage();
            }
            throw new \Exception(sprintf('The form is not valid, for those reasons : "%s"', implode('", "', $strError)));
        }

        $aryEntity = $entity->getArray();
        $response->setData($aryEntity);

        return new JsonResponse($response->getArray());
    }

    public function getJsonReportDataAction($id)
    {
        $entity = $this->getEntityManager()->getRepository('Earls\LionBiBundle\Entity\LnbReportData')->find($id);
        if (!$entity) {
            throw new \Exception(sprintf('The entity doesn\'t exist with id "%s"', $id));
        }

        $response = new CustomJsonResponse();
        $response->setStatus(CustomJsonResponse::VALID);
        $aryEntity = $entity->getArray();
        $response->setData($aryEntity);

        return new JsonResponse($response->getArray());
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
