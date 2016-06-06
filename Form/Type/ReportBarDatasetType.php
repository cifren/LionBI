<?php

namespace Earls\LionBiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Earls\RhinoReportBundle\Entity\RhnBarDatasetDefinition;

class ReportBarDatasetType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('labelColumn', TextType::class)
            ->add('dataColumn', TextType::class)
            ->add('options', CollectionType::class)
        ;
    }

    public function getBlockPrefix()
    {
        return null;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => RhnBarDatasetDefinition::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
