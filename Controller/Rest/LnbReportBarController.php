<?php

namespace Earls\LionBiBundle\Controller\Rest;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Earls\RhinoReportBundle\Entity\RhnBarDefinition;
use Earls\LionBiBundle\Form\Type\ReportBarType;
use Earls\LionBiBundle\Form\Transformer\ReportBarTransformer;

/**
 * @RouteResource("ReportBar")
 */
class LnbReportBarController extends RestController
{
    protected $className = RhnBarDefinition::class;
    protected $getRoute = 'api_v1_LnbReportBar_get_reportbar';
    protected $cGetRoute = 'api_v1_LnbReportBar_get_reportbars';
    protected $formClass = ReportBarType::class;
    
    protected function getTransformer()
    {
        return new ReportBarTransformer($this->getDoctrine());
    }
    
    /**
    * @Route("/reportbars/submit/form", methods={"GET", "POST"})
    */
    public function submitformAction(Request $request)
    {
        return parent::submitformAction($request);
    }
}
