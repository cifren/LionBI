<?php

namespace Fuller\UserBundle\Tests\Form\Transformer;

use Doctrine\Bundle\DoctrineBundle\Registry;
use Earls\LionBiBundle\Form\Transformer\TableReportTransformer;
use Earls\RhinoReportBundle\Entity\RhnTblMainDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblGroupDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblRowDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblColumnDefinition;
use Earls\LionBiBundle\Form\Model\ReportTable;
use Earls\LionBiBundle\Form\Model\Header;
use Earls\LionBiBundle\Form\Model\Category;
use Earls\LionBiBundle\Form\Model\Row;
use Earls\LionBiBundle\Form\Model\Column;
use Earls\LionBiBundle\Form\Model\Action;

class TableReportTransformerTest extends \PHPUnit_Framework_TestCase
{
    public function testTransform()
    {
        $tranformer = $this->getTransformer();
        
        // transform from ReportTableEntity to ReportTable
        $tableModel = $tranformer->transform($this->getTableEntity());
        $this->assertInstanceOf(ReportTable::class, $tableModel);
        
        // Check if entity didn't change after passing by tranformer
        $this->compareEntityAndReportModel($this->getTableEntity(), $tableModel);
        
        // reverse from ReportTable to ReportTableEntity
        $tableEntity = $tranformer->reverseTransform($tableModel);
        $this->assertInstanceOf(RhnTblMainDefinition::class, $tableEntity);
        
        // Check if entity didn't change after passing by tranformer
        $this->compareEntity($this->getTableEntity(), $tableEntity);
        
        // transform from ReportTableEntity to ReportTable
        $tableModel2 = $tranformer->transform($tableEntity);
        $this->assertInstanceOf(ReportTable::class, $tableModel2);
        
        // Check if model didn't change after passing by tranformer
        $this->compareReportTable($tableModel, $tableModel2);
    }
    
    // on transform function
    protected function compareEntityAndReportModel(RhnTblMainDefinition $entity, ReportTable $reportTable)
    {
        $this->assertEquals($entity->getId(), $reportTable->getId());
        $this->assertEquals($entity->getDisplayId(), $reportTable->getDisplayId());
        $this->assertCount(count($entity->getHeadDefinition()->getColumns()), $reportTable->getHeaders());
        
        $this->assertEquals(
            $this->getGroupDepth($entity->getBodyDefinition()), 
            count($reportTable->getCategories())
        );
    }
    
    protected function getGroupDepth(RhnTblGroupDefinition$group, $count = 0)
    {
        // this table definition suppose to be linear, it should have only 
        //one group into a group
        $group = array_shift($group->getGroups());
        if(isset($group)){
            return $this->getGroupDepth($group, ++$count);
        } else {
            return $count;
        }
    }
    
    // on reveseTransform function
    protected function compareReportTable(ReportTable $reportTable, ReportTable $reportTable2)
    {
        $this->assertEquals($reportTable->getId(), $reportTable2->getId());
        $this->assertEquals($reportTable->getDisplayId(), $reportTable2->getDisplayId());
        $this->assertCount(count($reportTable->getHeaders()), $reportTable2->getHeaders());
        foreach($reportTable->getHeaders() as $key => $item){
            $this->assertEquals($item->getDisplayId(), $reportTable2->getHeaders()[$key]->getDisplayId());
            $this->assertEquals($item->getLabel(), $reportTable2->getHeaders()[$key]->getLabel());
        }
        
        $this->assertCount(count($reportTable->getCategories()), $reportTable2->getCategories());
        foreach($reportTable->getCategories() as $key => $item){
            $this->compareReportTableCategories($item, $reportTable2->getCategories()[$key]);
        }
    }
    
    protected function compareReportTableCategories(Category $category, Category $category2)
    {
        $this->assertEquals($category->getGroupBy(), $category2->getGroupBy());
        $this->assertEquals($category->getId(), $category2->getId());
        $this->assertCount(count($category->getColumns()), $category2->getColumns());
        foreach($category->getColumns() as $key => $item){
            $this->compareReportTableColumns($item, $category2->getColumns()[$key]);
        }
        $row = $category->getRow();
        $row2 = $category2->getRow();
        if(isset($row) && isset($row2)) {
            $this->assertCount(count($row->getColumns()), $row2->getColumns());
            foreach($row->getColumns() as $key => $item){
                $this->compareReportTableColumns($item, $row2->getColumns()[$key]);
            }
        }
    }
    
    protected function compareReportTableColumns(Column $column, Column $column2)
    {
        $this->assertEquals($column->getDataId(), $column2->getDataId());
        $this->assertEquals($column->getDisplayId(), $column2->getDisplayId());
        
        if($column->getGroupAction() ==! null && $column2->getGroupAction() ==! null){
            $this->compareReportTableActions($column->getGroupAction(), $column2->getGroupAction());
        }
        
        foreach($column->getActions() as $key => $item){
            if(isset($item) && $column2->getActions()[$key] ==! null){
                $this->compareReportTableActions($item, $column2->getActions()[$key]);
            }
        }
    }
    
    protected function compareReportTableActions(Action $action, Action $action2)
    {
        if(isset($action) && isset($action2)){
            $this->assertEquals($action->getName(), $action2->getName());
            $this->assertEquals($action->getOptions(), $action2->getOptions());
        }
    }
    
    // on transform function
    protected function compareEntity(RhnTblMainDefinition $entity, RhnTblMainDefinition $entity2)
    {
        $this->assertEquals($entity->getId(), $entity2->getId());
        $this->assertEquals($entity->getDisplayId(), $entity2->getDisplayId());
        
        $this->assertCount(
            count($entity->getHeadDefinition()->getColumns()), 
            $entity2->getHeadDefinition()->getColumns()
        );
        
        $bodyDef = $entity->getBodyDefinition();
        $bodyDef2 = $entity2->getBodyDefinition();
        $this->assertEquals($this->getGroupDepth($bodyDef), $this->getGroupDepth($bodyDef2));
        
        $this->compareEntityGroups($bodyDef, $bodyDef2);
    }
    
    protected function compareEntityGroups(RhnTblGroupDefinition $group, RhnTblGroupDefinition $group2)
    {
        $this->assertCount(count($group->getGroups()), $group2->getGroups());
        foreach($group->getGroups() as $key => $item){
            $this->compareEntityGroups($item, $group2->getGroups()[$key]);
        }
        $this->assertCount(count($group->getRows()), $group2->getRows());
        foreach($group->getRows() as $key => $row){
            $this->compareEntityRows($row, $group2->getRows()[$key]);
        }
    }
    
    protected function compareEntityRows(RhnTblRowDefinition $row, RhnTblRowDefinition $row2)
    {
        $this->assertEquals($row->getOptions(), $row2->getOptions());
        foreach($row->getColumns() as $key => $item){
            $this->compareEntityColumns($item, $row2->getColumns()[$key]);
        }
    }
    
    protected function compareEntityColumns(RhnTblColumnDefinition $column, RhnTblColumnDefinition $column2)
    {
        $this->assertEquals($column->getDataId(), $column2->getDataId());
        $this->assertEquals($column->getDisplayId(), $column2->getDisplayId());
        if($column->getGroupAction() ==! null && $column2->getGroupAction() ==! null){
            $this->compareEntityActions($column->getGroupAction(), $column2->getGroupAction());
        }
        
        foreach($column->getActions() as $key => $item){
            $this->compareEntityActions($item, $column2->getActions()[$key]);
        }
    }
    
    protected function compareEntityActions(array $action, array $action2)
    {
        $this->assertEquals($action['name'], $action2['name']);
        $this->assertEquals($action['arg'], $action2['arg']);
    }
    
    protected function getTransformer() 
    {
        return new TableReportTransformer($this->getManager());
    }
    
    protected function getManager()
    {
        return $this->getMockBuilder(Registry::class)
            ->disableOriginalConstructor()
            ->getMock();
    }
    
    protected function getTableEntity(){
        $tableDef = new RhnTblMainDefinition();
        return $tableDef //table def
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
            ->getBodyDefinition() //group def
                ->addGroup('category')
                    ->setGroupBy('category')
                    ->addRow(array('unique' => true))   //row def
                        ->createAndAddColumn('description', RhnTblColumnDefinition::TYPE_DISPLAY, 'category')   //column def
                        ->getParent()   //row def
                        ->setColSpan('description', 1)
                        ->createAndAddColumn('sales', RhnTblColumnDefinition::TYPE_DISPLAY) //column def
                            ->setGroupAction('sum', array('column' => '\tableIng\body\category\subcategory\items.sales'))
                        ->getParent()   //row def
                    ->getParent()   //group def
                ->addGroup('subcategory')   //group def
                    ->setGroupby('subcategory')
                    ->addRow(array('unique' => true))   //row def
                        ->createAndAddColumn('description', RhnTblColumnDefinition::TYPE_DISPLAY, 'subcategory')    //column def
                        ->getParent()   //row def
                        ->setColSpan('description', 1)
                        ->createAndAddColumn('sales', RhnTblColumnDefinition::TYPE_DISPLAY) //column def
                            ->setGroupAction('sum', array('column' => '\tableIng\body\category\subcategory\items.sales'))
                            ->addAction('currency', array())
                        ->getParent()   //row def
                    ->getParent()   //group def
                    ->addGroup('items')   //group def
                        ->addRow(array())  //row def
                            ->createAndAddColumn('description', RhnTblColumnDefinition::TYPE_DISPLAY, 'item')
                                ->addAction('indent', array('space'=>2))
                            ->getParent() //row def
                            ->createAndAddColumn('stock', RhnTblColumnDefinition::TYPE_DISPLAY, 'stock')->getParent() //row def
                            ->createAndAddColumn('sales', RhnTblColumnDefinition::TYPE_DISPLAY, 'sales')->getParent() //row def
                        ->getParent() // group def
                    ->getParent() //group def
                ->getParent() // group def
            ->getParent() // group def
        ->getParent() //table def
                            ;
    }
}