<?php

namespace Earls\LionBiBundle\Controller\Rest;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Earls\LionBiBundle\Form\Handler\RestHandler;
use FOS\RestBundle\Controller\Annotations\Route;

class RestController extends FOSRestController
{
    protected $className;
    protected $cGetRoute;
    protected $getRoute;
    protected $formClass;

    protected function getCGetRoute()
    {
        if (!$this->cGetRoute) {
            throw new \Exception('Missing "cGetRoute"');
        }

        return $this->cGetRoute;
    }

    protected function setCGetRoute($cGetRoute)
    {
        $this->cGetRoute = $cGetRoute;

        return $this;
    }

    protected function getGetRoute()
    {
        if (!$this->getRoute) {
            throw new \Exception('Missing "getRoute"');
        }

        return $this->getRoute;
    }

    protected function setGetRoute($getRoute)
    {
        $this->getRoute = $getRoute;

        return $this;
    }

    protected function getClassName()
    {
        if (!$this->className) {
            throw new \Exception('Missing "className"');
        }

        return $this->className;
    }

    protected function setClassName($className)
    {
        $this->className = $className;

        return $this;
    }

    protected function getFormClass()
    {
        if (!$this->formClass) {
            throw new \Exception('Missing "formClass"');
        }

        return $this->formClass;
    }

    protected function setFormClass($formClass)
    {
        $this->formClass = $formClass;

        return $this;
    }

  // suppose to be working, but issue with the routing, needs to be copy into the main controller
  // with:
  /**
   * use FOS\RestBundle\Controller\Annotations\Route;
   * use Symfony\Component\HttpFoundation\Request;
   * '@'Route('/restresource/submit/form', methods={"GET", "POST"}).
  */
  public function submitformAction(Request $request)
  {
      print_r('<b>Var_dump Request results:</b>');
      var_dump($request->request->all());
      echo "<b>Json array:</b>";
      echo "<br>".json_encode($request->request->all(), JSON_PRETTY_PRINT)."<br><br>";
      $className = $this->getClassName();
      $entity = $this->getSubmitEntity();
      
      $form = $this->container->get('form.factory')->create($this->getFormClass(), $entity);
      $form->add('save', SubmitType::class, array('label' => 'Submit'));
      $form->handleRequest($request);

      if ($form->isSubmitted() && $form->isValid()) {
          var_dump('submited and valid (no flush)');
      }

      return $this->render('EarlsLionBiBundle:Rest:form.html.twig', array('form' => $form->createView()));
  }
  
  protected function getSubmitEntity()
  {
    $className = $this->getClassName();
    return new $className();
  }

  /**
   * Get a collection of Object.
   *
   * @return View contains the collection
   **/
  public function cgetAction()
  {
      $items = $this->getDoctrine()->getRepository($this->getClassName())->findAll();
      $view = new View($items);

      return $view;
  }

  /**
   * Get a single of Object.
   *
   * @param $id   item id
   *
   * @return View Contains the record
   **/
  public function getAction($id)
  {
      $item = $this->getDoctrine()->getRepository($this->getClassName())->find($id);
      if (!is_object($item)) {
          throw $this->createNotFoundException();
      }

      $view = new View($item);

      return $view;
  }

  /**
   * Create a new object.
   *
   * @param $request
   *
   * @return View Contains the record
   **/
  public function postAction(Request $request)
  {
      $className = $this->getClassName();
      $handler = $this->getHandler($request);

      return $handler->processForm(new $className());
  }

  /**
   * Edit an Object.
   *
   * @param   $request    contains the form data
   * @param   $id         id
   *
   * @return View Contains the record
   **/
  public function putAction(Request $request, $id)
  {
      $em = $this->getDoctrine()->getManager();

      $entity = $em->getRepository($this->getClassName())->find($id);

      if (!is_object($entity)) {
          throw $this->createNotFoundException();
      }

      $handler = $this->getHandler($request, 'PUT');

      return $handler->processForm($entity);
  }

  /**
   * Edit an Object.
   *
   * @param   $request    contains the form data
   * @param   $id         id
   *
   * @return View Contains the record
   **/
  public function patchAction(Request $request, $id)
  {
      $em = $this->getDoctrine()->getManager();

      $entity = $em->getRepository($this->getClassName())->find($id);

      if (!is_object($entity)) {
          throw $this->createNotFoundException();
      }

      $handler = $this->getHandler($request, 'PATCH');

      return $handler->processForm($entity);
  }

  /**
   * Removes an Object.
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

      if (!is_object($entity)) {
          throw $this->createNotFoundException();
      }
      $em->remove($entity);
      $em->flush();

      // There is a debate if this should be a 404 or a 204
      // see http://leedavis81.github.io/is-a-http-delete-requests-idempotent/
      return $this->routeRedirectView($this->getCGetRoute(), array(), Response::HTTP_NO_CONTENT);
  }

  /**
   * Create form.
   *
   * @param   object      $entity     object entity
   * @param   array       $options    form options
   * @param   string      $type       form type classname
   *
   * @return object
   */
  protected function getHandler(Request $request, $method = null)
  {
      $handler = new RestHandler(
          $this->container->get('router'),
          $this->container->get('form.factory'),
          $request,
          $this->getDoctrine(),
          $this->getFormClass(),
          $this->getGetRoute(),
          $method
          );

      return $handler;
  }
}
