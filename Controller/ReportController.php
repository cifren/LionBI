<?php

namespace Earls\LionBiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Earls\LionBiBundle\Entity\LnbReportConfig;
use Earls\LionBiBundle\Entity\LnbReportData;
use Earls\RhinoReportBundle\Report\Definition\ReportConfiguration;

/**
 * Description of DashboardController.
 *
 * @author cifren
 */
class ReportController extends Controller
{
    public function defaultAction(Request $request, $id)
    {
        $rptConfig = $this->getDoctrine()->getRepository(LnbReportConfig::class)
            ->find($id);
        $reportObject = $this->getReportObject($request, $rptConfig);

        $remoteUrl = $this->generateUrl('lionbi_report_remote', array('id' => $id));
        $exportUrl = $this->generateUrl('lionbi_report_export', array('id' => $id));
        $exportManager = $this->get('report.template.generator.manager');
        $templating = $exportManager->getTemplating($reportObject, $remoteUrl, $exportUrl);

        return $this->render('EarlsLionBiBundle:Frontend:report.html.twig', array(
            'template' => $templating,
        ));
    }

    public function remoteDataAction(Request $request, $id)
    {
        $rptConfig = $this->getDoctrine()->getRepository(LnbReportConfig::class)
            ->find($id);
        $reportObject = $this->getReportObject($request, $rptConfig);

        $exportManager = $this->get('report.template.generator.manager');
        $reportData = $exportManager->getData($reportObject);

        return new JsonResponse($reportData);
    }

    public function exportAction($id)
    {
        $reportObject = $this->getReportObject();

        $exportManager = $this->get('report.template.generator.manager');
        $reponse = $exportManager->getResponse($reportObject, $format, $id);

        return $reponse;
    }

    protected function getReportObject(Request $request, $rptConfigEntity)
    {
        $rptConfig = new ReportConfiguration();
        $data = $this->getData($rptConfigEntity->getLnbReportData());
        $rptConfig
            ->setConfigReportDefinition($rptConfigEntity->getRhnReportDefinition())
            ->setArrayData($data);

        $rptBuilder = $this->get('report.builder');
        $rptBuilder->setRequest($request);
        $rptBuilder->setConfiguration($rptConfig);
        $rptBuilder->build();

        return $rptBuilder->getReport();
    }

    protected function getData(LnbReportData $dataSource)
    {
        $reportDataManager = $this->get('report_data_manager');

        return $reportDataManager->fetchAll($dataSource);
    }
}
