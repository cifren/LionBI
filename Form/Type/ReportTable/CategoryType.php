<?php

namespace Earls\LionBiBundle\Form\Type\ReportTable;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Earls\LionBiBundle\Form\Model\Category;

class CategoryType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('groupBy', TextType::class, array('required' => false))
            ->add('columns', CollectionType::class, array(
                'allow_add' => true,
                'entry_type' => ColumnType::class
                ))
            ->add('row', RowType::class, array('required' => false))
        ;
    }

    public function getBlockPrefix()
    {
        return 'reportTableCategory';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            "data_class" => Category::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
