<?php

namespace Earls\LionBiBundle\Form\Type;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Common\Persistence\ObjectManager;
use Earls\RhinoReportBundle\Entity\RhnTblGroupDefinition;
use Earls\LionBiBundle\Form\Model\ReportTable;

/**
 * From Entity/ReportTable to Model/ReportTable.
 */
class TableReportTransformer implements DataTransformerInterface
{
    public function __construct(ObjectManager $manager)
    {
        $this->manager = $manager;
    }

  /**
   * Transforms an Entity/ReportTable to a Model/ReportTable.
   *
   * @param  RhnTblGroupDefinition|null $issue
   *
   * @return Model/ReportTable
   */
  public function transform($tableEntity)
  {
      if (null === $tableEntity) {
          return;
      }

      $tableModel = new TableReport();
      $tableModel
      ->setId($tableEntity->getId())
      ->setHeaders($tableEntity->getHeadDefinition())
      ->setGroups($tableEntity->getBodyDefinition())
      ->setRows($tableEntity->getBodyDefinition());

      return $tableModel;
  }

  /**
   * Transforms a Model/ReportTable to an Entity/ReportTable.
   *
   * @param  Model/ReportTable $issueNumber
   *
   * @return Entity/ReportTable|null
   *
   * @throws TransformationFailedException if Entity/ReportTable is not found.
   */
  public function reverseTransform($tableModel)
  {
      // no issue number? It's optional, so that's ok
    if (!$tableModel) {
        return;
    }

      $tableEntity = $this->manager
      ->getRepository('AppBundle:Issue')
      // query for the issue with this id
      ->find($tableModel->getId())
    ;

      if (null === $tableEntity) {
          // causes a validation error
      // this message is not shown to the user
      // see the invalid_message option
      throw new TransformationFailedException(sprintf(
        'A table with if "%s" does not exist!',
        $tableModel->getId()
      ));
      }

      return $tableEntity;
  }
}
