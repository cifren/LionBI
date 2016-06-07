<?php

namespace Earls\LionBiBundle\Form\Transformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\Common\Collections\ArrayCollection;
use Earls\LionBiBundle\Entity\LnbReportConfig;
use Earls\RhinoReportBundle\Entity\RhnTblMainDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblHeadDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblGroupDefinition;
use Earls\RhinoReportBundle\Entity\RhnTblColumnDefinition;
use Earls\LionBiBundle\Form\Model\ReportTable;
use Earls\LionBiBundle\Form\Model\Header;
use Earls\LionBiBundle\Form\Model\Category;
use Earls\LionBiBundle\Form\Model\Row;
use Earls\LionBiBundle\Form\Model\Column;
use Earls\LionBiBundle\Form\Model\Action;

/**
 * Earls\LionBiBundle\Form\Transformer\ReportTableTransformer.
 *
 * From Entity/ReportTable to Model/ReportTable.
 */
class ReportTableTransformer implements DataTransformerInterface
{
    protected $tableEntity;

    public function __construct(Registry $manager)
    {
        $this->manager = $manager;
    }

    /**
     * Transforms an Entity/ReportTable to a Model/ReportTable.
     *
     * @param RhnTblGroupDefinition|null $issue
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
            ->setReportConfig($this->getReportConfig($tableEntity))
            ->setDisplayId($tableEntity->getDisplayId())
            ->setPosition($tableEntity->getPosition())
            ->setHeaders($this->getHeadColumns($tableEntity->getHeadDefinition()));
        if ($group) {
            $tableModel->setCategories($this->getCategories($group));
        }

        return $tableModel;
    }

    protected function getReportConfig(RhnTblMainDefinition $tableEntity)
    {
        return $this->manager->getRepository(LnbReportConfig::class)
            ->findOneBy(array('rhnReportDefinition' => $tableEntity->getParent()));
    }

    protected function getHeadColumns(RhnTblHeadDefinition $headDef)
    {
        $columns = array();
        $defColumns = $headDef->getColumns();
        if ($defColumns) {
            foreach ($defColumns as $id => $column) {
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
     * Recursive.
     */
    protected function getCategories(RhnTblGroupDefinition $groupDefinition, $categories = array())
    {
        $category = new Category();
        $category
          ->setGroupBy($groupDefinition->getGroupBy());

        $rows = $groupDefinition->getRows();
        $row = array_shift($rows);
        // if rows exist
        if (isset($row)) {

            // when row unique, merge row with category
            if ($row->getOption('unique')) {
                $category->setColumns($this->getColumns($row->getColumns()));
            } else {
                $category->setRow($this->getRow($row));
            }
        }
        // add up the cataegory to the list
        $categories[] = $category;
        // add the rest of the categories
        if (!empty($groupDefinition->getGroups())) {
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

        foreach ($columnDefinitions as $colDef) {
            $column = new Column();

            $column->setDisplayId($colDef->getDisplayId());
            $column->setDataId($colDef->getDataId());

            // group action
            $aryAction = $colDef->getGroupAction();
            if (isset($aryAction) && !empty($aryAction)) {
                $groupAction = new Action();
                $groupAction->setName($aryAction['name']);
                $groupAction->setOptions($aryAction['arg']);
                $column->setGroupAction($groupAction);
            }

            $actions = array();
            if ($colDef->getActions()) {
                foreach ($colDef->getActions() as $aryAction) {
                    $action = new Action();
                    $action->setName($aryAction['name']);
                    $action->setOptions($aryAction['arg']);
                    $actions[] = $action;
                }
                $column->setActions($actions);
            }

            $columns[] = $column;
        }

        return $columns;
    }

    /**
     * Transforms a Model/ReportTable to an Entity/ReportTable.
     *
     * @param Model/ReportTable $issueNumber
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
        if ($this->tableEntity) {
            $tableEntity = $this->tableEntity;
        } else {
            if ($tableModel->getId()) {
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
        $tableEntity
            ->setDisplayId($tableModel->getDisplayId())
            ->setPosition($tableModel->getPosition())
            ->setParent($tableModel->getReportConfig()->getRhnReportDefinition());
        if ($tableModel->getHeaders()) {
            $tableEntity->getHeadDefinition()->setColumns($this->formatColumns($tableModel->getHeaders()));
        }

        if ($tableModel->getCategories()) {
            $groupDefinition = $tableEntity->getBodyDefinition();

            foreach ($tableModel->getCategories() as $key => $category) {
                // get New created group (recursive), it will be use on next loop
                $groupDefinition = $this->addGroup($groupDefinition, $key, $category);
            }
        }

        return $tableEntity;
    }

    protected function formatColumns($headers = array())
    {
        $columns = array();
        foreach ($headers as $header) {
            $columns[$header->getDisplayId()] = $header->getLabel();
        }

        return $columns;
    }

    protected function addGroup($parentGroupDefinition, $key, $category)
    {
        $groups = $parentGroupDefinition->getGroups();
        $existingGroup = array_shift($groups);
        $groupDefinition = $existingGroup ? $existingGroup : $parentGroupDefinition->addGroup($key);
        $parentGroupDefinition->removeGroupNotFromList(new ArrayCollection(array($groupDefinition)));

        $groupDefinition
            ->setGroupBy($category->getGroupBy());

        if (count($category->getColumns()) > 0) {
            $this->addRow($groupDefinition, $category->getColumns(), true);
        }

        if ($category->getRow()) {
            $this->addRow($groupDefinition, $category->getRow()->getColumns(), false);
        }

        return $groupDefinition;
    }

    protected function addRow($groupDefinition, $columns, $unique = false)
    {
        $rows = $groupDefinition->getRows();
        $existingRow = array_shift($rows);
        $rowDefinition = $existingRow ? $existingRow : $groupDefinition
            ->addRow(array('unique' => $unique));
        $groupDefinition->removeRowNotFromList(new ArrayCollection(array($rowDefinition)));

        $columnList = [];
        foreach ($columns as $col) {
            $columnList[] = $this->addColumn($rowDefinition, $col);
        }
        //remove non-existing column from rows, by adding only existing ones
        $rowDefinition->setColumns($columnList);
    }

    protected function addColumn($rowDefinition, $column)
    {
        $existingColumnDef = $rowDefinition->getColumn($column->getDisplayId());
        if ($existingColumnDef) {
            $columnDef = $existingColumnDef;
            $columnDef->setDataId($column->getDataId());
        } else {
            // new columnDefinition
            $columnDef = $rowDefinition->createAndAddColumn(
                $column->getDisplayId(), RhnTblColumnDefinition::TYPE_DISPLAY, $column->getDataId()
            );
        }

        if ($action = $column->getGroupAction()) {
            if ($action->getName()) {
                $columnDef->setGroupAction($action->getName(), $action->getOptions());
            }
        }

        $columnDef->clearAction();
        foreach ($column->getActions() as $action) {
            if ($action->getName()) {
                $columnDef->addAction($action->getName(), $action->getOptions());
            }
        }

        return $columnDef;
    }
}
