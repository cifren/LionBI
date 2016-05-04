<?php
$finder = Symfony\CS\Finder\DefaultFinder::create()
    ->exclude('vendor')
    ->exclude('Resources')
    ->exclude('.git')
    ->in(__DIR__)
;

return Symfony\CS\Config\Config::create()
    ->finder($finder)
;