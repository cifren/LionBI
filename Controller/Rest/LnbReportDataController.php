<?php

namespace Earls\LionBiBundle\Controller\Rest;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Earls\LionBiBundle\Entity\LnbReportData;
use Earls\LionBiBundle\Form\Type\ReportDataType;

/**
 * @RouteResource("ReportData")
 */
class LnbReportDataController extends RestController
{
    protected $className = LnbReportData::class;
    protected $getRoute ="api_v1_LnbReportData_get_reportdata";
    protected $cGetRoute = "api_v1_LnbReportData_get_reportdatas";
    protected $formClass = ReportDataType::class;
    
  /**
   * @Route("/reportdatas/submit/form", methods={"GET", "POST"})
   */ 
  public function submitformAction(Request $request)
  {
    return parent::submitformAction($request);
  }
}