Installation
============

Add the bunde to your `composer.json` file:
```javascript
require: {
    // ...
    "earls/lion-bi-bundle": "dev-master",
    // ...
},
"repositories": [
    {
        "type": "vcs",
        "url": "https://github.com/cifren/LionBusinessIntelligence.git"
    }
]
```

Then run a `composer update`:
```shell
composer.phar update
# OR
composer.phar update earls/lion-bi-bundle # to only update the bundle
```

Register the bundle with your `kernel`:
```php
// in AppKernel::registerBundles()
$bundles = array(
    //Access all routes from javascript
    new FOS\JsRoutingBundle\FOSJsRoutingBundle(),
    // ...
    new Earls\LionBiBundle\EarlsLionBiBundle(),
    // ...
);
```

app/config/config.yml
```yaml
assetic:
    #comments bundle
    #bundles:        [ ]
    #add font-awesome fonts to assetic
    assets:
      font-awesome-otf:
        inputs: '@EarlsLionBiBundle/Resources/public/components/font-awesome/fonts/FontAwesome.otf'
        output: 'fonts/FontAwesome.otf'
      font-awesome-eot:
        inputs: '@EarlsLionBiBundle/Resources/public/components/font-awesome/fonts/fontawesome-webfont.eot'
        output: 'fonts/fontawesome-webfont.eot'
      font-awesome-svg:
        inputs: '@EarlsLionBiBundle/Resources/public/components/font-awesome/fonts/fontawesome-webfont.svg'
        output: 'fonts/fontawesome-webfont.svg'
      font-awesome-ttf:
        inputs: '@EarlsLionBiBundle/Resources/public/components/font-awesome/fonts/fontawesome-webfont.ttf'
        output: 'fonts/fontawesome-webfont.ttf'
      font-awesome-woff:
        inputs: '@EarlsLionBiBundle/Resources/public/components/font-awesome/fonts/fontawesome-webfont.woff'
        output: 'fonts/fontawesome-webfont.woff'

orm:
    auto_generate_proxy_classes: "%kernel.debug%"
    entity_managers:
        default:
            mappings:
                EarlsLionBiBundle: ~
```

app/config/routing.yml
```yaml
fos_js_routing:
    resource: "@FOSJsRoutingBundle/Resources/config/routing/routing.xml"

lion_bi_routing:
    resource: "@EarlsLionBiBundle/Resources/config/routing.yml"
```