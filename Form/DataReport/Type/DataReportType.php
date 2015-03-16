<?php

namespace Earls\LionBiBundle\Form\DataReport\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class DataReportType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
                ->add('displayName', 'text', array(
                    'label' => 'Name'
                ))
                ->add('sqlStatement', 'textarea', array(
                    'label' => 'Add a sql statement'
                ))
                ->add('lnbDataReportType', 'entity', array(
                    'property' => 'displayName',
                    'class' => 'Earls\LionBiBundle\Entity\LnbDataReportType',
                    'label' => 'Choose your type of data'
                ))
        ;
    }

    public function getName()
    {
        return 'dataReport';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'csrf_protection' => false,
        ));
    }

}
