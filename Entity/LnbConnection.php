<?php

namespace Earls\LionBiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Earls\LionBiBundle\Model\Entity\LnbSubConnectionInterface;

/**
 * Earls\LionBiBundle\Entity\LnbConnection
 *
 * @ORM\Entity 
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ORM\DiscriminatorMap({"api" = "LnbConnectionApi", "excel" = "LnbConnectionExcel", "db" = "LnbConnectionDb"})
 */
abstract class LnbConnection
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

    public function getId()
    {
        return $this->id;
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
