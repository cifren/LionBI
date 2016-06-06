<?php

namespace Earls\LionBiBundle\Controller\Rest;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Earls\RhinoReportBundle\Entity\RhnTblMainDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblColumnDefinition;
use Earls\LionBiBundle\Form\Type\ReportTableType;
use Earls\LionBiBundle\Form\Transformer\ReportTableTransformer;

/**
 * @RouteResource("ReportTable")
 */
class LnbReportTableController extends RestController
{
    protected $className = RhnTblMainDefinition::class;
    protected $getRoute = 'api_v1_LnbReportTable_get_reporttable';
    protected $cGetRoute = 'api_v1_LnbReportTable_get_reporttables';
    protected $formClass = ReportTableType::class;
    
    protected function getTransformer()
    {
        return new ReportTableTransformer($this->getDoctrine());
    }
    
    /**
    * @Route("/reporttables/submit/form", methods={"GET", "POST"})
    */
    public function submitformAction(Request $request)
    {
        return parent::submitformAction($request);
    }
    
    protected function getEntity()
    {
        $tableDef = new RhnTblMainDefinition();
        $tableDef //table def
            ->setDisplayId('tableIng')
            ->setPosition('position-2')
            ->setAttributes(array('class' => array('table-bordered', 'table-condensed')))
            ->getHeadDefinition() //head def
                ->setColumns(array(
                    'description' => 'Description',
                    'stock' => 'Stock',
                    'sales' => 'Sales'
                ))
                ->getParent()   //table def
            ->getBodyDefinition() 
                ->addGroup('subcategory')   //group def
                    ->setGroupby('subcategory')
                    ->addRow(array('unique' => true))   //row def
                        ->createAndAddColumn('description', RhnTblColumnDefinition::TYPE_DISPLAY, 'subcategory')    //column def
                        ->getParent()   //row def
                        ->setColSpan('description', 1)
                        ->createAndAddColumn('sales', RhnTblColumnDefinition::TYPE_DISPLAY) //column def
                            ->setGroupAction('sum', array('column' => '\tableIng\body\category\subcategory\items.sales'))
                            ->addAction('indent', array('space'=>2))
                        ->getParent()   //row def
                    ->getParent()   //group def
                    ->addGroup('items')   //group def
                        ->addRow(array())  //row def
                            ->createAndAddColumn('description', RhnTblColumnDefinition::TYPE_DISPLAY, 'item')->getParent() //row def
                            ->createAndAddColumn('stock', RhnTblColumnDefinition::TYPE_DISPLAY, 'stock')->getParent() //row def
                            ->createAndAddColumn('sales', RhnTblColumnDefinition::TYPE_DISPLAY, 'sales')->getParent() //row def
            ;
            
        return $tableDef;
    }
}
