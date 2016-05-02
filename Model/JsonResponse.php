<?php

namespace Earls\LionBiBundle\Model;

/**
 * Earls\LionBiBundle\Model\JsonResponse
 * Description of JsonResponse.
 */
class JsonResponse
{
    const VALID = 'valid';
    const ERROR = 'error';

    protected $status;
    protected $errorCode;
    protected $errorMessage;
    protected $data;

    public function getStatus()
    {
        return $this->status;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    public function setData(array $data)
    {
        $this->data = $data;

        return $this;
    }

    public function getErrorCode()
    {
        return $this->errorCode;
    }

    public function setErrorCode($errorCode)
    {
        $this->errorCode = $errorCode;

        return $this;
    }

    public function getErrorMessage()
    {
        return $this->errorMessage;
    }

    public function setErrorMessage($errorMessage)
    {
        $this->errorMessage = $errorMessage;

        return $this;
    }

    public function getArray()
    {
        return array(
            'status' => $this->getStatus(),
            'error' => array(
                'code' => $this->getErrorCode(),
                'message' => $this->getErrorMessage(),
                ),
            'data' => $this->getData(),
        );
    }
}
