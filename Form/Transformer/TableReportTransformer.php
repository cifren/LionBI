<?php

namespace Earls\LionBiBundle\Form\Transformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Earls\RhinoReportBundle\Entity\RhnTblMainDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblGroupDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblColumnDefinition;
use Earls\LionBiBundle\Form\Model\ReportTable;
use Earls\LionBiBundle\Form\Model\Header;
use Earls\LionBiBundle\Form\Model\Category;
use Earls\LionBiBundle\Form\Model\Row;
use Earls\LionBiBundle\Form\Model\Column;
use Earls\LionBiBundle\Form\Model\Action;

/**
 * Earls\LionBiBundle\Form\Transformer\TableReportTransformer
 * 
 * From Entity/ReportTable to Model/ReportTable.
 */
class TableReportTransformer implements DataTransformerInterface
{
    protected $tableEntity;
    
    public function __construct(Registry $manager)
    {
        $this->manager = $manager;
    }
    
    /**
    * Transforms an Entity/ReportTable to a Model/ReportTable.
    *
    * @param  RhnTblGroupDefinition|null $issue
    *
    * @return Model/ReportTable
    */
    public function transform($tableEntity)
    {
        if (null === $tableEntity) {
            return;
        }
        // keep this entity
        $this->tableEntity = $tableEntity;
        
        $tableModel = new ReportTable();
        $groups = $tableEntity->getBodyDefinition()->getGroups();
        $group = array_shift($groups);
        $tableModel
            ->setId($tableEntity->getId())
            ->setDisplayId($tableEntity->getDisplayId())
            ->setHeaders($this->getHeadColumns($tableEntity->getHeadDefinition()->getColumns()));
        if($group){
            $tableModel->setCategories($this->getCategories($group));
        }
            
        return $tableModel;
    }
  
    protected function getHeadColumns($headColumns)
    { 
        $columns = array();
        if($headColumns){
            foreach ($headColumns as $id => $column){
                $header = new Header();
                $header
                    ->setDisplayId($id)
                    ->setLabel($column['label']);
                $columns[] = $header;
            }
        }
        
        return $columns;
    }
  
    /**
     * Recursive
     */ 
    protected function getCategories(RhnTblGroupDefinition $groupDefinition, $categories = array()) 
    { 
        $category = new Category();
        $category
          ->setGroupBy($groupDefinition->getGroupBy());
          
        $rows = $groupDefinition->getRows();
        $row = array_shift($rows);
        // if rows exist
        if(isset($row)){
            
            // when row unique, merge row with category
            if($row->getOption('unique')){
                $category->setColumns($this->getColumns($row->getColumns()));
            } else {
                $category->setRow($this->getRow($row));
            }
        }
        // add up the cataegory to the list
        $categories[] = $category;
        // add the rest of the categories
        if(!empty($groupDefinition->getGroups())){
            $categories = $this->getCategories($groupDefinition->getGroups()[0], $categories);
        }
        
        return $categories;
    }

    protected function getRow($rowDefinition)
    {
        $row = new Row();
        $row->setColumns($this->getColumns($rowDefinition->getColumns()));
        
        return $row;
    }
    
    protected function getColumns($columnDefinitions = array())
    {
        $columns = array();
        
        foreach($columnDefinitions as $colDef){
            $column = new Column();
            
            $column->setDisplayId($colDef->getDisplayId());
            $column->setDataId($colDef->getDataId());
            
            // group action
            $aryAction = $colDef->getGroupAction();
            if(isset($aryAction) && !empty($aryAction)){
                $groupAction = new Action();
                $groupAction->setName($aryAction['name']);
                $groupAction->setOptions($aryAction['arg']);
                $column->setGroupAction($groupAction);
            }
            
            $actions = array();
            foreach($colDef->getActions() as $aryAction){
                $action = new Action();
                $action->setName($aryAction['name']);
                $action->setOptions($aryAction['arg']);
                $actions[] = $action;
            }
            $column->setActions($actions);
            
            $columns[] = $column;
        }
        
        return $columns;
    }
  
    /**
    * Transforms a Model/ReportTable to an Entity/ReportTable.
    *
    * @param  Model/ReportTable $issueNumber
    *
    * @return Entity/ReportTable|null
    *
    * @throws TransformationFailedException if Entity/ReportTable is not found.
    */
    public function reverseTransform($tableModel)
    {
        // no issue number? It's optional, so that's ok
        if (!$tableModel) {
            return;
        }
        
        // in case the form is filled with an object, keep this object
        if($this->tableEntity){
            $tableEntity = $this->tableEntity;
        } else {
            if($tableModel->getId()){
            
                $tableEntity = $this->manager
                    ->getRepository(RhnTblMainDefinition::class)
                    // query for the issue with this id
                    ->find($tableModel->getId())
                ;
                
                if (null === $tableEntity) {
                    // causes a validation error
                    // this message is not shown to the user
                    // see the invalid_message option
                    throw new TransformationFailedException(sprintf(
                        'A table with id "%s" does not exist!',
                        $tableModel->getId()
                    ));
                }
            } else {
                $tableEntity = new RhnTblMainDefinition();
            }
        }
        $tableEntity->setDisplayId($tableModel->getDisplayId());
        
        if($tableModel->getHeaders()){
            $tableEntity->getHeadDefinition()->setColumns($this->formatColumns($tableModel->getHeaders()));
        }
        
        if($tableModel->getCategories()){
            $groupDefinition = $tableEntity->getBodyDefinition();
            foreach($tableModel->getCategories() as $key => $category){
                // get New created group (recursive), it will be use on next loop
                $groupDefinition = $this->addGroup($groupDefinition, $key, $category);
            }
        }
        
        return $tableEntity;
    }
    
    protected function formatColumns($headers = array())
    {
        $columns = array();
        foreach($headers as $header){
            $columns[$header->getDisplayId()] = $header->getLabel();
        }
        return $columns;
    }
    
    protected function addGroup($groupDefinition, $key, $category) 
    {
        $newGroupDefinition = $groupDefinition
            ->addGroup($key)
            ->setGroupBy($category->getGroupBy());
            
        if(count($category->getColumns()) > 0){
            $this->addRow($newGroupDefinition, $category->getColumns(), true);
        }
        
        if($category->getRow()) {
            $this->addRow($newGroupDefinition, $category->getRow()->getColumns(), false);
        }
        
        return $newGroupDefinition;
    }
    
    protected function addRow($newGroupDefinition, $columns, $unique = false)
    {
        $row = $newGroupDefinition
            ->addRow(array('unique' => $unique));
            
        foreach($columns as $col){
            $this->addColumn($row, $col);
        }
    }
    
    protected function addColumn($rowDefinition, $column) 
    {
        $columnDef = $rowDefinition->createAndAddColumn(
            $column->getDisplayId(), RhnTblColumnDefinition::TYPE_DISPLAY, $column->getDataId()
        );
            
        if($action = $column->getGroupAction()){
            $columnDef->setGroupAction($action->getName(), $action->getOptions());
        }
            
        foreach($column->getActions() as $action){
            $columnDef->addAction($action->getName(), $action->getOptions());
        }
    }
}
