<?php

namespace Earls\LionBiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Earls\LionBiBundle\Form\Model\ReportBar;
use Earls\LionBiBundle\Form\Transformer\ReportBarTransformer;
use Earls\LionBiBundle\Entity\LnbReportConfig;

class ReportBarType extends AbstractType
{
    public function __construct(Registry $manager)
    {
        $this->manager = $manager;
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $transformer = new ReportBarTransformer($this->manager);
        $builder->addModelTransformer($transformer);
        $builder
            ->add('displayId', TextType::class)
            ->add('position', TextType::class)
            ->add('labelColumn', TextType::class)
            ->add('options', CollectionType::class)
            ->add('datasets', CollectionType::class, array(
                'allow_add' => true,
                'allow_delete' => true,
                'entry_type' => ReportBarDatasetType::class,
                'by_reference' => true
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
            'data_class' => ReportBar::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
