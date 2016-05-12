<?php

namespace Earls\LionBiBundle\Form\Model;

use Earls\LionBiBundle\Model\GetterSetterBase;

/**
 * Earls\LionBiBundle\Form\Model\ReportTable
 */
class ReportTable extends GetterSetterBase
{
    public $id;
    public $displayId;
    public $reportConfig;
    public $headers = array();
    public $categories = array();
}

/**
 * Earls\LionBiBundle\Form\Model\Header
 */
class Header extends GetterSetterBase
{
    public $displayId;
    public $label;
}

/**
 * Earls\LionBiBundle\Form\Model\Category.
 */
class Category extends GetterSetterBase
{
    public $id;
    public $groupBy;
    public $columns = array();
    public $row;
}

/**
 * Earls\LionBiBundle\Form\Model\Row.
 */
class Row extends GetterSetterBase
{
    public $columns = array();
}

/**
 * Earls\LionBiBundle\Form\Model\Column.
 */
class Column extends GetterSetterBase
{
    public $dataId;
    public $displayId;
    public $groupAction;
    public $actions = array();
}

/**
 * Earls\LionBiBundle\Form\Model\Action.
 */
class Action extends GetterSetterBase
{
    public $name;
    public $options = array();
}
