<?php

namespace Earls\LionBiBundle\Controller\Rest;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Earls\RhinoReportBundle\Entity\RhnReportFilter;
use Earls\LionBiBundle\Form\Type\ReportFilterType;

/**
 * @RouteResource("ReportFilter")
 */
class LnbReportFilterController extends RestController
{
    protected $className = RhnReportFilter::class;
    protected $getRoute = 'api_v1_LnbReportFilter_get_reportfilter';
    protected $cGetRoute = 'api_v1_LnbReportFilter_get_reportfilters';
    protected $formClass = ReportFilterType::class;

  /**
   * @Route("/reports/submit/form", methods={"GET", "POST"})
   */
  public function submitformAction(Request $request)
  {
      return parent::submitformAction($request);
  }
}
