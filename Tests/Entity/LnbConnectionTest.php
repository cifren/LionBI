<?php

namespace Earls\LionBiBundle\Tests\Entity;

use Earls\LionBiBundle\Entity\LnbConnectionApi;
use Earls\LionBiBundle\Entity\LnbConnectionDb;
use Earls\LionBiBundle\Entity\LnbConnectionExcel;

class LnbConnectionTest extends \PHPUnit_Framework_TestCase
{
    public function testCreateApi()
    {
        $entity = new LnbConnectionApi();
        $entity->setDisplayName('lol');
        $this->assertEquals('lol', $entity->getDisplayName());
    }
    
    public function testCreateDb()
    {
        $entity = new LnbConnectionDb();
        $entity->setDisplayName('lol');
        $this->assertEquals('lol', $entity->getDisplayName());
    }
    
    public function testCreateExcel()
    {
        $entity = new LnbConnectionExcel();
        $entity->setDisplayName('lol');
        $this->assertEquals('lol', $entity->getDisplayName());
    }
}
