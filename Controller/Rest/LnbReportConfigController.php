<?php

namespace Earls\LionBiBundle\Controller\Rest;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use Earls\LionBiBundle\Entity\LnbReportConfig;
use Earls\LionBiBundle\Form\Type\ReportConfigType;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @RouteResource("Report")
 */
class LnbReportConfigController extends RestController
{
  protected $className = LnbReportConfig::class;
  protected $getRoute ="api_v1_LnbReportConfig_get_report";
  protected $cGetRoute = "api_v1_LnbReportConfig_get_reports";
  protected $formClass = ReportConfigType::class;
    
  /**
   * @Route("/reports/submit/form", methods={"GET", "POST"})
   */ 
  public function submitformAction(Request $request)
  {
    return parent::submitformAction($request);
  }
}