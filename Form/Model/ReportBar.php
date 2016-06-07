<?php

namespace Earls\LionBiBundle\Form\Model;

use Earls\LionBiBundle\Model\GetterSetterBase;

/**
 * Earls\LionBiBundle\Form\Model\ReportBar.
 */
class ReportBar extends GetterSetterBase
{
    public $id;
    public $displayId;
    public $position;
    public $labelColumn;
    public $dataColumn;
    public $options = array();
    public $datasets = array();
    public $reportConfig;
}
