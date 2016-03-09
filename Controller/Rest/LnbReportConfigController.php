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

use Earls\LionBiBundle\Entity\LnbReportConfig;

/**
 * @RouteResource("Report")
 */
class LnbReportConfigController extends FOSRestController
{
    /**
     * Get a collection LnbReportConfig
     * 
     * @return View contains the collection
     **/
    public function cgetAction()
    {
        $reports = $this->getDoctrine()->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->findAll();
        $view = new View($reports);
        return $view;
    }
  
    /**
     * Get a single of LnbReportCongig
     * 
     * @param $id   item id
     * 
     * @return View Contains the record
     * 
     **/ 
    public function getAction($id)
    {
        $report = $this->getDoctrine()->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->find($id);
        if(!is_object($report)){
          throw $this->createNotFoundException();
        }
        $view = new View($report);
        return $view;
    }
    
    /**
     * Presents the form to use to create a new LnbReportConfig.
     * 
     * @return FormTypeInterface
     */
    public function newAction()
    {
        return $this->getForm();
    }
    
    /**
     * Create a new LnbReportCongig
     * 
     * @param $request   contains the form data
     * 
     * @return View Contains the record
     * 
     **/ 
    public function postAction(Request $request)
    {
        $entity = new LnbReportConfig();
        $form = $this->getForm($entity);
        $form->handleRequest($request);
        
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
            
            return $this->routeRedirectView('api_get_report', array('id' => $entity->getId()));
        }
        
        return array(
            'form' => $form,
        );
    }
    
    /**
     * Edit a LnbReportCongig
     * 
     * @param   $request    contains the form data
     * @param   $id         LnbReportCongig id
     * 
     * @return View Contains the record
     * 
     **/ 
    public function putAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity = $em->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->find($id);
        
        if(!is_object($entity)){
          throw $this->createNotFoundException();
        }
        $form = $this->getForm($entity, array('method' => 'PUT'));
        $form->handleRequest($request);
        
        if ($form->isValid()) {
            $em->persist($entity);
            $em->flush();
    
            return $this->routeRedirectView('api_get_report', array('id' => $entity->getId()));
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
        
        $entity = $em->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->find($id);
        
        if(!is_object($entity)){
          throw $this->createNotFoundException();
        }
        $em->remove($entity);
        $em->flush();
        
        // There is a debate if this should be a 404 or a 204
        // see http://leedavis81.github.io/is-a-http-delete-requests-idempotent/
        return $this->routeRedirectView('api_get_reports', array(), Response::HTTP_NO_CONTENT);
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
    protected function getForm($entity = null, $options = array(), $type = 'Earls\LionBiBundle\Form\DataReport\Type\ReportConfigType')
    {
        return $this->createForm($type, $entity, $options);
    }
}