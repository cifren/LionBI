<?php

namespace Earls\LionBiBundle\Tests\Entity;

use Earls\LionBiBundle\Entity\LnbConnectionApi;

class LnbConnectionTest extends \PHPUnit_Framework_TestCase
{
    public function testCreate()
    {
        $entity = new LnbConnectionApi();
        $entity->setDisplayName('lol');
        $this->assertEquals('lol', $entity->getDisplayName());
    }
}