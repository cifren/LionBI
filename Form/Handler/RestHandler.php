<?php

namespace Earls\LionBiBundle\Form\Handler;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;

/**
 * Description of RestHandler.
 *
 * @author cifren
 */
class RestHandler
{
    protected $router;
    protected $formFactory;
    protected $request;
    protected $doctrine;
    protected $formClass;
    protected $restGetRoute;
    protected $method;

    public function __construct($router, $formFactory, $request, $doctrine, $formClass, $restGetRoute, $method = null)
    {
        $this->router = $router;
        $this->formFactory = $formFactory;
        $this->request = $request;
        $this->doctrine = $doctrine;
        $this->formClass = $formClass;
        $this->restGetRoute = $restGetRoute;
        $this->method = $method;
    }

    /**
     * @return Response | View
     */
    public function processForm($entity)
    {
        $form = $this->createForm($this->formClass, $entity, $this->method ? array('method' => $this->method) : array());
        $form->handleRequest($this->request);

        $statusCode = $entity->getId() ? 204 : 201;

        if ($form->isValid()) {
            $em = $this->doctrine->getManager();
            $em->persist($entity);
            $em->flush();
            $view = new View();

            if (201 === $statusCode) {
                $view->setData(array('id' => $entity->getId()));
                $view->setLocation(
                    $this->generateUrl(
                        $this->restGetRoute, array('id' => $entity->getId()),
                        true // absolute
                    ));
            }
            $view->setStatusCode($statusCode);

            return $view;
        }

        return View::create($form, 400);
    }

    /**
     * Creates and returns a Form instance from the type of the form.
     *
     * @param string $type    The fully qualified class name of the form type
     * @param mixed  $data    The initial data for the form
     * @param array  $options Options for the form
     *
     * @return Form
     */
    protected function createForm($type, $data = null, array $options = array())
    {
        return $this->formFactory->create($type, $data, $options);
    }

    protected function generateUrl($route, $parameters = array(), $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH)
    {
        return $this->router->generate($route, $parameters, $referenceType);
    }
}
