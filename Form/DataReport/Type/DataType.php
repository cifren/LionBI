<?php

namespace Earls\LionBiBundle\Form\DataReport\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class DataType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
                ->add('displayName')
                ->add('sql')
                ->add('lnbDataReportType')
            ;
    }

    public function getName()
    {
        return 'data';
    }

}
