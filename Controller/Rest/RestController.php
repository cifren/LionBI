<?php

namespace Earls\LionBiBundle\Controller\Rest;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Util\Codes;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Earls\LionBiBundle\Form\Handler\RestHandler;
use FOS\RestBundle\Controller\Annotations\Route;

/**
 * 
 **/ 
class RestController extends FOSRestController
{
  protected $className;
  protected $cGetRoute;
  protected $getRoute;
  protected $formClass;
  
  public function getCGetRoute()
  {
    if(!$this->cGetRoute){
      throw new \Exception('Missing "cGetRoute"');
    }
    return $this->cGetRoute;  
  }
  
  public function setCGetRoute($cGetRoute)
  {
    $this->cGetRoute = $cGetRoute;
    return $this;
  }
  
  public function getGetRoute()
  {
    if(!$this->getRoute){
      throw new \Exception('Missing "getRoute"');
    }
    return $this->getRoute;  
  }
  
  public function setGetRoute($getRoute)
  {
    $this->getRoute = $getRoute;
    return $this;
  }
  
  public function getClassName()
  {
    if(!$this->className){
      throw new \Exception('Missing "className"');
    }
    return $this->className;  
  }
  
  public function setClassName($className)
  {
    $this->className = $className;
    return $this;
  }
  
  public function getFormClass()
  {
    if(!$this->formClass){
      throw new \Exception('Missing "formClass"');
    }
    return $this->formClass;  
  }
  
  public function setFormClass($formClass)
  {
    $this->formClass = $formClass;
    return $this;
  }
  
  // suppose to be working, but issue with the routing, needs to be copy into the main controller
  // with:
  /** 
   * use FOS\RestBundle\Controller\Annotations\Route;
   * use Symfony\Component\HttpFoundation\Request;
   * '@'Route('/restresource/submit/form', methods={"GET", "POST"})
   * 
    public function submitformAction(Request $request)
    {
      return parent::submitformAction($request);
    }
  */
  public function submitformAction(Request $request)
  {
    var_dump($request->request->all());
    $entity = new $this->className;
    $form = $this->container->get('form.factory')->create($this->formClass, $entity);
    $form->add('save', SubmitType::class, array('label' => 'Submit'));
    $form->handleRequest($request);
    
    if($form->isSubmitted() && $form->isValid()){
      var_dump('submited and valid');
    }
    
    return $this->render('EarlsLionBiBundle:Rest:form.html.twig', array('form' => $form->createView()));
  }
  
  /**
   * Get a collection LnbReportConfig
   * 
   * @return View contains the collection
   **/
  public function cgetAction()
  {
      $reports = $this->getDoctrine()->getRepository($this->getClassName())->findAll();
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
      $report = $this->getDoctrine()->getRepository($this->getClassName())->find($id);
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
    $className = $this->getClassName();
    $handler = $this->getHandler($request);
    return $handler->processForm(new $className());
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
      
      $entity = $em->getRepository($this->getClassName())->find($id);
      
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
      
      $entity = $em->getRepository($this->getClassName())->find($id);
      
      if(!is_object($entity)){
        throw $this->createNotFoundException();
      }
      $em->remove($entity);
      $em->flush();
      
      // There is a debate if this should be a 404 or a 204
      // see http://leedavis81.github.io/is-a-http-delete-requests-idempotent/
      return $this->routeRedirectView($this->getCGetRoute(), array(), Response::HTTP_NO_CONTENT);
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
          $this->getFormClass(),
          $this->getGetRoute()
          );
          
      return $handler;
  }
  
}