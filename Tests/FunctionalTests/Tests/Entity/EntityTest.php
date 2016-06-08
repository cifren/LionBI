<?php

namespace Earls\LionBiBundle\Tests\FunctionalTests\Tests\Database\Table\Definition;

use Doctrine\Common\Collections\Collection;
use Earls\LionBiBundle\Tests\FunctionalTests\Model\FixtureAwareTestCase;
use Earls\LionBiBundle\Entity\LnbConnectionApi;

/**
 * Entity Tests
 */
class EntityTest extends FixtureAwareTestCase
{
  public function setup() 
  {
    $doctrine = $this->getContainer()->get('doctrine');
    $entityManager = $doctrine->getManager();

    $this->initTestDatabase();
  }
  
  public function testBuild()
  {
    $doctrine = $this->getContainer()->get('doctrine');
    $entityManager = $doctrine->getManager();
    $entity = new LnbConnectionApi();
    $entity->setDisplayName('testDisplay name');
    
    $entityManager->persist($entity);
    $entityManager->flush();
    
  }
}