<?php

namespace Earls\LionBiBundle\Controller\Rest;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\FOSRestController;
use Earls\LionBiBundle\Utils\Exception\InvalidFormException;
use Earls\LionBiBundle\Entity\LnbReportData;
use FOS\RestBundle\Util\Codes;

/**
 * @RouteResource("ReportData")
 */
class LnbReportDataController extends FOSRestController
{
    /**
     * Get a collection LnbReportData
     * 
     * @return View contains the collection
     **/
    public function cgetAction()
    {
        $items = $this->getDoctrine()->getRepository('Earls\LionBiBundle\Entity\LnbReportData')->findAll();
        $view = new View($items);
        return $view;
    }
  
    /**
     * Get a single of LnbReportData
     * 
     * @param $id   item id
     * 
     * @return View Contains the record
     * 
     **/ 
    public function getAction($id)
    {
        $item = $this->getDoctrine()->getRepository('Earls\LionBiBundle\Entity\LnbReportData')->find($id);
        if(!is_object($item)){
          throw $this->createNotFoundException();
        }
        $view = new View($item);
        return $view;
    }
    
    /**
     * Presents the form to use to create a new LnbReportData.
     * 
     * @return FormTypeInterface
     */
    public function newAction()
    {
        return $this->getForm();
    }
    
    /**
     * Create a new LnbReportData
     * 
     * @param $request   contains the form data
     * 
     * @return View Contains the record
     * 
     **/ 
    public function postAction(Request $request)
    {
        $entity = new LnbReportData();
        $form = $this->getForm($entity);
        $form->handleRequest($request);
        
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
            
            return $view = new View($entity);
        }
        
        return array(
            'form' => $form
        );
    }
    
    /**
     * Edit a LnbReportData
     * 
     * @param   $request    contains the form data
     * @param   $id         LnbReportData id
     * 
     * @return View Contains the record
     * 
     **/ 
    public function putAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity = $em->getRepository('Earls\LionBiBundle\Entity\LnbReportData')->find($id);
        
        if(!is_object($entity)){
          throw $this->createNotFoundException();
        }
        $form = $this->getForm($entity, array('method' => 'PUT'));
        $form->handleRequest($request);
        
        if ($form->isValid()) {
            $em->persist($entity);
            $em->flush();
    
            return $view = new View($entity);;
        }
        
        return array(
            'form' => $form,
        );
    }
    
    /**
     * Removes a LbnReportConfig.
     *
     * @param Request $request the request object
     * @param int     $id      the note id
     *
     * @return View
     */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity = $em->getRepository('Earls\LionBiBundle\Entity\LnbReportData')->find($id);
        
        if(!is_object($entity)){
          throw $this->createNotFoundException();
        }
        $em->remove($entity);
        $em->flush();
        
        // There is a debate if this should be a 404 or a 204
        // see http://leedavis81.github.io/is-a-http-delete-requests-idempotent/
        return $this->routeRedirectView('api_v1_LnbReportData_get_reportdatas', array(), Response::HTTP_NO_CONTENT);
    }
    
    /**
     * Create form
     * 
     * @param   object      $entity     object entity
     * @param   array       $options    form options
     * @param   string      $type       form type classname
     * 
     * @return object
     * 
     */ 
    protected function getForm($entity = null, $options = array(), $type = 'Earls\LionBiBundle\Form\ReportData\Type\ReportDataType')
    {
        return $this->createForm($type, $entity, $options);
    }
}