<?php

namespace Earls\LionBiBundle\Model;

/**
 * Earls\LionBiBundle\Model\GetterSetterBase.
 */
abstract class GetterSetterBase
{
    public function __call($methodName, $args)
    {
        if (preg_match('~^(set|get)([A-Z])(.*)$~', $methodName, $matches)) {
            $property = strtolower($matches[2]).$matches[3];
            if (!property_exists($this, $property)) {
                throw new \Exception(sprintf('Property "%s" not exists on class "%s"', $property, get_class($this)));
            }
            switch ($matches[1]) {
              case 'set':
                  $this->checkArguments($args, 1, 1, $methodName);

                  return $this->set($property, $args[0]);
              case 'get':
                  $this->checkArguments($args, 0, 0, $methodName);

                  return $this->get($property);
              case 'default':
                  throw new \Exception(sprintf('Method "%s" not exists on class "%s"', $methodName, get_class($this)));
          }
        } else {
            return call_user_func_array($methodName, $args);
        }
    }

    public function get($property)
    {
        return $this->$property;
    }

    public function set($property, $value)
    {
        $this->$property = $value;

        return $this;
    }

    protected function checkArguments(array $args, $min, $max, $methodName)
    {
        $argc = count($args);
        if ($argc < $min || $argc > $max) {
            throw new \Exception('Method '.$methodName.' needs minimaly '.$min.' and maximaly '.$max.' arguments. '.$argc.' arguments given.');
        }
    }
}
