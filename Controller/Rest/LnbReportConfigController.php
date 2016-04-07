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
use FOS\RestBundle\Util\Codes;

use Earls\LionBiBundle\Entity\LnbReportConfig;
use Earls\LionBiBundle\Form\Handler\RestHandler;
use Earls\LionBiBundle\Form\Type\ReportConfigType;

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
     * Create a new LnbReportCongig
     * 
     * @param $request   contains the form data ex: {"report_config":{"displays_name": "lokqdiq"}}
     * 
     * @return View Contains the record
     * 
     **/ 
    public function postAction(Request $request)
    {   
        $handler = $this->getHandler($request);
        return $handler->processForm(new LnbReportConfig());
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
        
        $handler = $this->getHandler($request);
        
        return $handler->processForm($entity);
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
        return $this->routeRedirectView('api_v1_LnbReportConfig_get_reports', array(), Response::HTTP_NO_CONTENT);
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
    protected function getHandler(Request $request)
    {
        $handler = new RestHandler(
            $this->container->get('router'),
            $this->container->get('form.factory'),
            $request,
            $this->getDoctrine(),
            ReportConfigType::class,
            'api_v1_LnbReportConfig_get_report'
            );
            
        return $handler;
    }
}