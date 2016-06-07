<?php

namespace Earls\LionBiBundle\Form\Type\ReportTable;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Earls\LionBiBundle\Form\Model\Header;

class HeaderType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('displayId', TextType::class)
            ->add('label', TextType::class)
        ;
    }

    public function getBlockPrefix()
    {
        return 'reportTableHeader';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Header::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
