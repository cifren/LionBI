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
     * @ORM\Column(name="diaplay_name", type="integer")
     */
    protected $displayName;

    /**
     * @var array $conceptName
     *
     * @ORM\Column(name="json_config", type="array")
     */
    protected $jsonConfig;

    function getId()
    {
        return $this->id;
    }

    function setId($id)
    {
        $this->id = $id;
    }

    function getJsonConfig()
    {
        return $this->jsonConfig;
    }

    function setJsonConfig(array $jsonConfig)
    {
        $this->jsonConfig = $jsonConfig;
    }

    function getDisplayName()
    {
        return $this->displayName;
    }

    function setDisplayName($displayName)
    {
        $this->displayName = $displayName;
    }

}
