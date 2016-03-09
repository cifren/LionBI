<?php

namespace Earls\LionBiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Earls\LionBiBundle\Entity\LnbReportConfig
 *
 * @ORM\Table(name="lnb_report_config")
 * @ORM\Entity
 */
class LnbReportConfig
{

    /**
     * @var integer $id
     *
     * @ORM\Column(type="integer", options={"unsigned":true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @var string $displayName
     *
     * @ORM\Column(name="display_name", type="text")
     */
    protected $displayName;

    /**
     * @var LnbDataReport $lnbDataReport
     *
     * @ORM\ManyToOne(targetEntity="LnbDataReport")
     * @ORM\JoinColumn(name="lnb_data_report_id", referencedColumnName="id")
     */
    protected $lnbDataReport;

    /**
     * @var RhnReportDefinition $rhnReportDefinition
     *
     * @ORM\OneToOne(targetEntity="Earls\RhinoReportBundle\Entity\RhnReportDefinition")
     * @ORM\JoinColumn(name="rhn_report_definition_id", referencedColumnName="id")
     */
    protected $rhnReportDefinition;

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

}
