<?php

namespace Earls\LionBiBundle\Controller\Rest;

use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\View\View;
use Earls\RhinoReportBundle\Entity\RhnTblMainDefinition;
use Earls\LionBiBundle\Entity\LnbReportConfig;
use Earls\LionBiBundle\Form\Type\ReportConfigType;
use Earls\LionBiBundle\Form\Transformer\TableReportTransformer;

/**
 * @RouteResource("Report")
 */
class LnbReportConfigController extends RestController
{
    protected $className = LnbReportConfig::class;
    protected $getRoute = 'api_v1_LnbReportConfig_get_report';
    protected $cGetRoute = 'api_v1_LnbReportConfig_get_reports';
    protected $formClass = ReportConfigType::class;
    protected $moduleTableTransformer;

    /**
    * @Route("/reports/submit/form", methods={"GET", "POST"})
    */
    public function submitformAction(Request $request)
    {
        return parent::submitformAction($request);
    }
    
    public function cgetModulesAction(Request $request, $reportConfigId)
    {
        $item = $this->getDoctrine()->getRepository($this->getClassName())
            ->find($reportConfigId);
            
        if (!is_object($item)) {
            throw $this->createNotFoundException();
        }
        $items = $item->getRhnReportDefinition()
            ->getItems();
        $transformedItems = array_map(function($item){
            if($item instanceof RhnTblMainDefinition){
                $reportTable = $this->getModuleTableTransformer()->transform($item);
                $item = array(
                    'id'=>$reportTable->getId(),
                    'type'=>'table',
                    'item'=>$reportTable
                );
            }
            return $item;
        }, $items->toArray());
        
        $view = new View($transformedItems);
        
        return $view;
    }
    
    protected function getModuleTableTransformer()
    {
        if(!$this->moduleTableTransformer){
            $this->moduleTableTransformer = new TableReportTransformer($this->getDoctrine());
        }
        return $this->moduleTableTransformer;
    }
}
