<?php

namespace Earls\LionBiBundle\Form\Model;

use Earls\LionBiBundle\Model\GetterSetterBase;

/**
 * Earls\LionBiBundle\Form\Model\ReportTable.
 */
class ReportTable extends GetterSetterBase
{
    protected $id;
    protected $displayId;
    protected $headers = array();
    protected $categories = array();
}

/**
 * Earls\LionBiBundle\Form\Model\Category.
 */
class Category extends GetterSetterBase
{
    protected $id;
    protected $groupBy;
    protected $columns = array();
    protected $row;
}

/**
 * Earls\LionBiBundle\Form\Model\Row.
 */
class Row extends GetterSetterBase
{
    protected $columns = array();
}

/**
 * Earls\LionBiBundle\Form\Model\Column.
 */
class Column extends GetterSetterBase
{
    protected $dataId;
    protected $groupActions = array();
    protected $actions = array();
}

/**
 * Earls\LionBiBundle\Form\Model\Action.
 */
class Action extends GetterSetterBase
{
    protected $name;
    protected $options = array();
}
