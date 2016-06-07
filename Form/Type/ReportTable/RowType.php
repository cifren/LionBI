<?php

namespace Earls\LionBiBundle\Form\Type\ReportTable;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Earls\LionBiBundle\Form\Model\Row;

class RowType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('columns', CollectionType::class, array(
                'allow_add' => true,
                'allow_delete' => true,
                'entry_type' => ColumnType::class,
                'required' => true,
                ))
        ;
    }

    public function getBlockPrefix()
    {
        return 'reportTableRow';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Row::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
