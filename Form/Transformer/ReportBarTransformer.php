<?php

namespace Earls\LionBiBundle\Form\Transformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\Common\Collections\ArrayCollection;
use Earls\LionBiBundle\Entity\LnbReportConfig;
use Earls\RhinoReportBundle\Entity\RhnBarDefinition;
use Earls\LionBiBundle\Form\Model\ReportBar;

/**
 * Earls\LionBiBundle\Form\Transformer\ReportBarTransformer
 * 
 * From Entity/ReportBar to Model/ReportBar.
 */
class ReportBarTransformer implements DataTransformerInterface
{
    protected $barEntity;
    
    public function __construct(Registry $manager)
    {
        $this->manager = $manager;
    }
    
    /**
    * Transforms an Entity/ReportBar to a Model/ReportBar.
    *
    * @param  RhnTblGroupDefinition|null $issue
    *
    * @return Model/ReportBar
    */
    public function transform($barEntity)
    {
        if (null === $barEntity) {
            return;
        }
        // keep this entity
        $this->barEntity = $barEntity;
        
        $barModel = new ReportBar();
        
        $barModel
            ->setId($barEntity->getId())
            ->setReportConfig($this->getReportConfig($barEntity))
            ->setDisplayId($barEntity->getDisplayId())
            ->setPosition($barEntity->getPosition())
            ->setLabelColumn($barEntity->getLabelColumn())
            ->setOptions($barEntity->getOptions())
            ->setDatasets($barEntity->getDatasets())
            ;
            
        return $barModel;
    }
    
    protected function getReportConfig(RhnBarDefinition $barEntity)
    {
        return $this->manager->getRepository(LnbReportConfig::class)
            ->findOneBy(array('rhnReportDefinition' => $barEntity->getParent()));
    }
  
    /**
    * Transforms a Model/ReportBar to an Entity/ReportBar.
    *
    * @param  Model/ReportBar $barModel
    *
    * @return Entity/ReportBar|null
    *
    * @throws TransformationFailedException if Entity/ReportBar is not found.
    */
    public function reverseTransform($barModel)
    {
        // no issue number? It's optional, so that's ok
        if (!$barModel) {
            return;
        }
        
        // in case the form is filled with an object, keep this object
        if($this->barEntity){
            $barEntity = $this->barEntity;
        } else {
            if($barModel->getId()){
                $barEntity = $this->manager
                    ->getRepository(RhnBarDefinition::class)
                    // query for the issue with this id
                    ->find($barModel->getId())
                ;
                
                if (null === $barEntity) {
                    // causes a validation error
                    // this message is not shown to the user
                    // see the invalid_message option
                    throw new TransformationFailedException(sprintf(
                        'A bar report with id "%s" does not exist!',
                        $barModel->getId()
                    ));
                }
            } else {
                $barEntity = new RhnBarDefinition();
            }
        }
        
        $barEntity
            ->setParent($barModel->getReportConfig()->getRhnReportDefinition())
            ->setDisplayId($barModel->getDisplayId())
            ->setPosition($barModel->getPosition())
            ->setLabelColumn($barModel->getLabelColumn())
            ->setOptions($barModel->getOptions())
            ->setDatasets($barModel->getDatasets())
            ;
        
        return $barEntity;
    }
}
