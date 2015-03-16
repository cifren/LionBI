<?php

namespace Earls\LionBiBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Parser;
use Earls\OxPeckerDataBundle\Command\AdvancedCommand;

class LoadDatabaseCommand extends AdvancedCommand
{

    /**
     *
     * @var \Doctrine\ORM\EntityManager 
     */
    protected $em;

    protected function configure()
    {
        $this
                ->setName('lnb:load:database')
                ->setDescription('Inittialize the database')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->setStartTime();
        $this->em = $this->getContainer()->get('doctrine')->getManager();

        $this->loadLnbDataReportType();
        $this->setEndTime();
        $this->noticeTime();
    }

    protected function loadLnbDataReportType()
    {
        $yaml = new Parser();
        $entitiesAry = $yaml->parse(file_get_contents(__DIR__ . '/../Resources/dump/initDataReportType.yml'));

        foreach ($entitiesAry['DataReportType'] as $row) {
            $entityName = 'Earls\LionBiBundle\Entity\LnbDataReportType';
            $entity = $this->em->getRepository($entityName)->findOneBy(array('nameId' => $row['nameId']));

            if (!$entity) {
                $entity = new $entityName;
            }
            $entity->setNameId($row['nameId']);
            $entity->setDisplayName($row['displayName']);

            $this->em->persist($entity);
        }
        $this->em->flush();
        $this->getLogger()->notice('DataReportType inserted');
    }

}
