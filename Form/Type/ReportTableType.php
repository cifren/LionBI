<?php

namespace Earls\LionBiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Earls\LionBiBundle\Form\Type\ReportTable\HeaderType;
use Earls\LionBiBundle\Form\Type\ReportTable\CategoryType;
use Earls\LionBiBundle\Form\Model\ReportTable;
use Earls\LionBiBundle\Form\Transformer\TableReportTransformer;
use Earls\LionBiBundle\Entity\LnbReportConfig;

/**
 *   Earls\LionBiBundle\Form\Type\ReportTableType
 */
class ReportTableType extends AbstractType
{
    public function __construct(Registry $manager)
    {
        $this->manager = $manager;
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $transformer = new TableReportTransformer($this->manager);
        $builder->addModelTransformer($transformer);
        $builder
            ->add('displayId', TextType::class)
            ->add('headers', CollectionType::class, array(
                'allow_add' => true,
                'entry_type' => HeaderType::class,
                ))
            ->add('categories', CollectionType::class, array(
                'allow_add' => true,
                'entry_type' => CategoryType::class,
                ))
            ->add('reportConfig', EntityType::class, array(
                'class' => LnbReportConfig::class,
                'required' => true,
                'choice_label' => 'id',
            ))
        ;
    }

    public function getBlockPrefix()
    {
        return null;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            "data_class" => ReportTable::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
