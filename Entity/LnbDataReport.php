<?php

namespace Earls\LionBiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Earls\LionBiBundle\Entity\LnbDataReport
 *
 * @ORM\Table(name="lnb_data_report")
 * @ORM\Entity
 */
class LnbDataReport
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
     * @ORM\Column(name="diaplay_name", type="integer")
     */
    protected $displayName;

    /**
     * @var string $sql
     *
     * @ORM\Column(name="sql", type="text")
     */
    protected $sql;

    /**
     * @var string $entityName
     *
     * @ORM\Column(name="entity_name", type="text", nullable=true)
     */
    protected $entityName;

    /**
     * @var int $entityId
     *
     * @ORM\Column(name="entity_id", type="integer", nullable=true)
     */
    protected $entityId;

    /**
     * @var LnbDataReportType $lnbDataReportType
     *
     * @ORM\ManyToOne(targetEntity="LnbDataReportType")
     * @ORM\JoinColumn(name="lnb_data_report_id", referencedColumnName="id")
     */
    protected $lnbDataReportType;

    public function getId()
    {
        return $this->id;
    }

    public function getDisplayName()
    {
        return $this->displayName;
    }

    public function getSql()
    {
        return $this->sql;
    }

    public function getEntityName()
    {
        return $this->entityName;
    }

    public function getEntityId()
    {
        return $this->entityId;
    }

    public function getLnbDataReportType()
    {
        return $this->lnbDataReportType;
    }

    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;
        return $this;
    }

    public function setSql($sql)
    {
        $this->sql = $sql;
        return $this;
    }

    public function setEntityName($entityName)
    {
        $this->entityName = $entityName;
        return $this;
    }

    public function setEntityId($entityId)
    {
        $this->entityId = $entityId;
        return $this;
    }

    public function setLnbDataReportType(LnbDataReportType $lnbDataReportType)
    {
        $this->lnbDataReportType = $lnbDataReportType;
        return $this;
    }

}
