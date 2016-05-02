<?php

namespace Earls\LionBiBundle\Controller\Rest;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Earls\RhinoReportBundle\Entity\RhnReportDefinition;
use Earls\LionBiBundle\Form\Type\ReportDefinitionType;

/**
 * @RouteResource("ReportDefinition")
 */
class LnbReportDefinitionController extends RestController
{
    protected $className = RhnReportDefinition::class;
    protected $getRoute = 'api_v1_LnbReportDefinition_get_reportdefinition';
    protected $cGetRoute = 'api_v1_LnbReportDefinition_get_reportdefinitions';
    protected $formClass = ReportDefinitionType::class;

  /**
   * @Route("/reports/submit/form", methods={"GET", "POST"})
   */
  public function submitformAction(Request $request)
  {
      return parent::submitformAction($request);
  }
}
