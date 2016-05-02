<?php

namespace Earls\LionBiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Earls\LionBiBundle\Entity\LnbReportDataType.
 *
 * @ORM\Table(name="lnb_report_data_type", indexes={@ORM\Index(name="name_id_idx", columns={"name_id"})})
 * @ORM\Entity
 */
class LnbReportDataType
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
     * @ORM\Column(name="name_id", type="string", length=10)
     */
    protected $nameId;

    /**
     * @var string
     *
     * @ORM\Column(name="display_name", type="string", length=100)
     */
    protected $displayName;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="LnbReportData", mappedBy="lnbReportDataType")
     */
    protected $lnbReportDatas;

    public function getId()
    {
        return $this->id;
    }

    public function getNameId()
    {
        return $this->nameId;
    }

    public function getDisplayName()
    {
        return $this->displayName;
    }

    public function setNameId($nameId)
    {
        $this->nameId = $nameId;

        return $this;
    }

    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;

        return $this;
    }
}
