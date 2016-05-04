<?php

namespace Earls\LionBiBundle\Controller\Rest;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Earls\RhinoReportBundle\Entity\RhnTblMainDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblColumnDefinition;
use Earls\LionBiBundle\Form\Type\ReportTableType;

/**
 * @RouteResource("ReportTable")
 */
class LnbReportTableController extends RestController
{
    protected $className = RhnTblMainDefinition::class;
    protected $getRoute = 'api_v1_LnbReportTable_get_reporttable';
    protected $cGetRoute = 'api_v1_LnbReportTable_get_reporttables';
    protected $formClass = ReportTableType::class;

    /**
    * @Route("/tables/submit/form", methods={"GET", "POST"})
    */
    public function submitformAction(Request $request)
    {
        return parent::submitformAction($request);
    }
}
