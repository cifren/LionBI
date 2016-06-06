<?php

namespace Earls\LionBiBundle\Model;

use Earls\LionBiBundle\Entity\LnbReportData;
use PDO;

/**
 * Earls\LionBiBundle\Model\ReportDataManager.
 *
 * @author cifren
 */
class ReportDataManager
{
    protected $doctrine;
    public function __construct($doctrine)
    {
        $this->setDoctrine($doctrine);
    }

    public function checkValidity(LnbReportData $reportData)
    {
        $sql = $reportData->getSqlStatement();
        $stmt = $this->getPrepareStatement($sql);

        $response = new JsonResponse();
        try {
            $stmt->execute();
        } catch (\Exception $e) {
            $response = new JsonResponse();
            $response
                ->setErrorMessage($e->getMessage())
                ->setErrorCode($e->getCode())
                ->setStatus(JsonResponse::ERROR);

            return $response;
        }

        return $response->setStatus(JsonResponse::VALID);
    }

    public function getCountRows()
    {
    }

    /**
     * Get column names.
     *
     * @return JsonResponse
     */
    public function getColumns(LnbReportData $reportData)
    {
        // check if sql is valid
      $jsonResponse = $this->checkValidity($reportData);
        if ($jsonResponse->getStatus() == JsonResponse::VALID) {
            // get sql statement from reportData
        $sql = $reportData->getSqlStatement();
        // add limit in order to optimize
        $sql .= ' LIMIT 1';
  
            $stmt = $this->getPrepareStatement($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_CLASS);
  
        // in case data exist in query
        if (isset($data[0])) {
            // there is at least one row - we can grab columns from it
          $columns = array_keys((array) $data[0]);
        } else { // no data in query
           // there are no results - no need to use PDO functions
            $nr = $stmt->columnCount();
            for ($i = 0; $i < $nr; ++$i) {
                // getWrappedStatement call PDOStatement
             $columns[] = $stmt->getWrappedStatement()->getColumnMeta($i)['name'];
            }
        }
  
        // return column names
        return $jsonResponse->setData($columns);
        } else {
            // on error
        return $jsonResponse;
        }
    }

    public function fetchAll(LnbReportData $reportData)
    {
        $sql = $reportData->getSqlStatement();
        $stmt = $this->getPrepareStatement($sql);
        
        $stmt->execute();
        return $data = $stmt->fetchAll();
    }

    protected function getPrepareStatement($sql)
    {
        return $this->getDoctrine()->getManager()->getConnection()->prepare($sql);
    }

    protected function getDoctrine()
    {
        return $this->doctrine;
    }

    protected function setDoctrine($doctrine)
    {
        $this->doctrine = $doctrine;

        return $this;
    }
}
