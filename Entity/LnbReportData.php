<?php

namespace Earls\LionBiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Earls\LionBiBundle\Entity\LnbReportData.
 *
 * @ORM\Table(name="lnb_report_data")
 * @ORM\Entity
 *
 * @ExclusionPolicy("all")
 */
class LnbReportData
{
    /**
     * @var int
     *
     * @ORM\Column(type="integer", options={"unsigned":true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @Expose
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="display_name", type="text", length=100)
     * @Expose
     */
    protected $displayName;

    /**
     * @var string
     *
     * @ORM\Column(name="sql_statement", type="text", nullable=true)
     * @Expose
     */
    protected $sqlStatement;

    /**
     * @var string
     *
     * @ORM\Column(name="entity_name", type="text", nullable=true)
     * @Expose
     */
    protected $entityName;

    /**
     * @var int
     *
     * @ORM\Column(name="entity_id", type="integer", nullable=true)
     * @Expose
     */
    protected $entityId;

    /**
     * @var LnbReportDataType
     *
     * @ORM\ManyToOne(targetEntity="LnbReportDataType", inversedBy="lnbReportData")
     * @ORM\JoinColumn(name="lnb_report_data_type_id", referencedColumnName="id")
     */
    protected $lnbReportDataType;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="LnbReportConfig", mappedBy="lnbReportData")
     */
    protected $lnbReportConfigs;

    public function getId()
    {
        return $this->id;
    }

    public function getDisplayName()
    {
        return $this->displayName;
    }

    public function getSqlStatement()
    {
        return $this->sqlStatement;
    }

    public function getEntityName()
    {
        return $this->entityName;
    }

    public function getEntityId()
    {
        return $this->entityId;
    }

    public function getLnbReportDataType()
    {
        return $this->lnbReportDataType;
    }

    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;

        return $this;
    }

    public function setSqlStatement($sqlStatement)
    {
        $this->sqlStatement = $sqlStatement;

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

    public function setLnbReportDataType(LnbReportDataType $lnbReportDataType)
    {
        $this->lnbReportDataType = $lnbReportDataType;

        return $this;
    }

    public function getArray()
    {
        return array(
            'id' => $this->getId(),
            'displayName' => $this->getDisplayName(),
            'sqlStatement' => $this->getSqlStatement(),
            'lnbReportDataType' => $this->getLnbReportDataType()->getId(),
        );
    }
}
