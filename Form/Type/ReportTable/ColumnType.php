<?php

namespace Earls\LionBiBundle\Form\Type\ReportTable;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Earls\LionBiBundle\Form\Model\Column;

class ColumnType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('dataId', TextType::class, array('required' => false))
            ->add('displayId', TextType::class, array('required' => true))
            ->add('groupAction', ActionType::class, array('required' => false))
            ->add('actions', CollectionType::class, array(
                'allow_add' => true,
                'allow_delete' => true,
                'entry_type' => ActionType::class
                ))
        ;
    }

    public function getBlockPrefix()
    {
        return 'reportTableColumn';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            "data_class" => Column::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
