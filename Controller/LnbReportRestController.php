<?php

namespace Earls\LionBiBundle\Controller;

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
class LnbReportRestController extends FOSRestController
{
    public function cgetAction(){
        $reports = $this->getDoctrine()->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->findAll();
        $view = new View($reports);
        return $view;
    }
  
    public function getAction($id){
        $report = $this->getDoctrine()->getRepository('Earls\LionBiBundle\Entity\LnbReportConfig')->find($id);
        if(!is_object($report)){
          throw $this->createNotFoundException();
        }
        $view = new View($report);
        return $view;
    }
    
    public function getTypeAction($id)
    {
        $report = $this->getDoctrine()->getRepository('Earls\LionBiBundle\Entity\LnbDataReport')->find($id);
        if(!is_object($report)){
          throw $this->createNotFoundException();
        }
        $type = $report->getLnbDataReportType();
        
        return $type;
    }
    
    /**
     * Presents the form to use to create a new note.
     * 
     * @return FormTypeInterface
     */
    public function newAction()
    {
        return $this->getForm();
    }
    
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
     * Removes a note.
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
    
    protected function getForm($entity = null, $options = array(), $type = 'Earls\LionBiBundle\Form\DataReport\Type\ReportType'){
        return $this->createForm($type, $entity, $options);
    }
}