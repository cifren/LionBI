<?php

namespace Earls\LionBiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Earls\RhinoReportBundle\Entity\RhnReportDefinition;

/**
 * Earls\LionBiBundle\Entity\LnbReportConfig
 *
 * @ORM\Table(name="lnb_report_config")
 * @ORM\Entity
 */
class LnbReportConfig
{
    /**
     * @var int
     *
     * @ORM\Column(type="integer", options={"unsigned":true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="display_name", type="text")
     */
    protected $displayName;

    /**
     * @var LnbReportData
     *
     * @ORM\ManyToOne(targetEntity="LnbReportData")
     * @ORM\JoinColumn(name="lnb_report_data_id", referencedColumnName="id")
     */
    protected $lnbReportData;

    /**
     * var RhnReportDefinition
     *
     * @ORM\OneToOne(targetEntity="Earls\RhinoReportBundle\Entity\RhnReportDefinition", cascade={"all"})
     * @ORM\JoinColumn(name="rhn_report_definition_id", referencedColumnName="id")
     */
    protected $rhnReportDefinition;

    public function __construct()
    {
        $this->rhnReportDefinition = new RhnReportDefinition();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getJsonConfig()
    {
        return $this->jsonConfig;
    }

    public function setJsonConfig(array $jsonConfig)
    {
        $this->jsonConfig = $jsonConfig;
    }

    public function getDisplayName()
    {
        return $this->displayName;
    }

    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;
    }

    public function getLnbReportData()
    {
        return $this->lnbReportData;
    }

    public function setLnbReportData($lnbReportData)
    {
        $this->lnbReportData = $lnbReportData;

        return $this;
    }

    public function getRhnReportDefinition()
    {
        return $this->rhnReportDefinition;
    }

    public function setRhnReportDefinition($rhnReportDefinition)
    {
        $this->rhnReportDefinition = $rhnReportDefinition;

        return $this;
    }
}
