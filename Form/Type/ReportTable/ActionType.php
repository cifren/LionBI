<?php

namespace Earls\LionBiBundle\Form\Type\ReportTable;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Earls\LionBiBundle\Form\Model\Action;

class ActionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class)
            ->add('options', CollectionType::class, array(
                'allow_add' => true,
                ))
        ;
    }

    public function getBlockPrefix()
    {
        return 'reportTableAction';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Action::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
