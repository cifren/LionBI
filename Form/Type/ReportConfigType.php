<?php

namespace Earls\LionBiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class ReportConfigType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('displayName', TextType::class)
            ->add('lnbReportData', EntityType::class, array(
                    'class' => 'Earls\LionBiBundle\Entity\LnbReportData',
                    'required' => true,
                    'choice_label' => 'displayName',
                ))
        ;
    }

    public function getBlockPrefix()
    {
        return 'reportConfig';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
