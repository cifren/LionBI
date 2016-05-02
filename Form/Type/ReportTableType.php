<?php

namespace Earls\LionBiBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Earls\LionBiBundle\Form\Type\ReportTable\Header;
use Earls\LionBiBundle\Form\Type\ReportTable\Group;
use Earls\LionBiBundle\Form\Type\ReportTable\Row;
use Earls\LionBiBundle\Form\Model\ReportTable;

class ReportTableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $transformer = new IssueToNumberTransformer($this->manager);
        $builder->addModelTransformer($transformer);
        $builder
            ->add('displayId', TextType::class)
            ->add('headers', CollectionType::class, array(
                'entry_type' => Header::class,
                ))
            ->add('groups', CollectionType::class, array(
                'entry_type' => Group::class,
                ))
            ->add('rows', CollectionType::class, array(
                'entry_type' => Row::class,
                ))
        ;
    }

    public function getBlockPrefix()
    {
        return 'reportTable';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'class' => ReportTable::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ));
    }
}
