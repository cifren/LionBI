<?php

namespace Earls\LionBiBundle\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Parser;
use Earls\OxPeckerDataBundle\Command\AdvancedCommand;

class LoadDatabaseCommand extends AdvancedCommand
{
    /**
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

        $this->loadLnbReportDataType();
        $this->setEndTime();
        $this->noticeTime();
    }

    protected function loadLnbReportDataType()
    {
        $yaml = new Parser();
        $entitiesAry = $yaml->parse(file_get_contents(__DIR__.'/../Resources/dump/initReportDataType.yml'));

        foreach ($entitiesAry['ReportDataType'] as $row) {
            $entityName = 'Earls\LionBiBundle\Entity\LnbReportDataType';
            $entity = $this->em->getRepository($entityName)->findOneBy(array('nameId' => $row['nameId']));

            if (!$entity) {
                $entity = new $entityName();
            }
            $entity->setNameId($row['nameId']);
            $entity->setDisplayName($row['displayName']);

            $this->em->persist($entity);
        }
        $this->em->flush();
        $this->getLogger()->notice('ReportDataType inserted');
    }
}
