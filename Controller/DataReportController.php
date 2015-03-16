<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Earls\LionBiBundle\Form\DataReport\Type\DataReportType;
use Earls\LionBiBundle\Entity\LnbDataReport;
use Symfony\Component\HttpFoundation\Request;
use Earls\LionBiBundle\Model\CustomJsonResponse;

/**
 * 
 * @author cifren
 */
class DataReportController extends Controller
{

    public function listAction()
    {
        $list = $this->getEntityManager()->getRepository('Earls\LionBiBundle\Entity\LnbDataReport')->findAll();

        return $this->render('EarlsLionBiBundle:Admin/DataReport:list.html.twig', array(
                    'items' => $list
        ));
    }

    public function editorAction()
    {
        return $this->render('EarlsLionBiBundle:Admin/DataReport:editor.html.twig');
    }

    public function sqlEditorAction()
    {
        $entity = new LnbDataReport();
        $form = $this->createForm(new DataReportType(), $entity);

        return $this->render('EarlsLionBiBundle:Admin/DataReport:sqlEditor.html.twig', array(
                    'form' => $form->createView()
        ));
    }

    public function saveDataReportAction(Request $request)
    {
        $em = $this->getEntityManager();

        $requestDataReport = $request->get('dataReport');
        if (isset($requestDataReport['id'])) {
            $id = $requestDataReport['id'];
            unset($requestDataReport['id']);
        } else {
            $id = null;
        }
        if ($id) {
            $entity = $em->getRepository('Earls\LionBiBundle\Entity\LnbDataReport')->find($id);
        } else {
            $entity = new LnbDataReport();
        }

        $form = $this->createForm(new DataReportType(), $entity);
        $form->bind($requestDataReport);

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

    public function getJsonDataReportAction($id)
    {
        $entity = $this->getEntityManager()->getRepository('Earls\LionBiBundle\Entity\LnbDataReport')->find($id);
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
