Installation
============

Add the bunde to your `composer.json` file:
```javascript
require: {
    // ...
    "earls/lion-bi-bundle": "dev-master",
    "friendsofsymfony/rest-bundle": "dev-master",
    "jms/serializer-bundle": "dev-master"
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
    //REST application
    new FOS\RestBundle\FOSRestBundle(),
    new JMS\SerializerBundle\JMSSerializerBundle(),
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
        inputs: '@EarlsLionBiBundle/Resources/public/bower_components/font-awesome/fonts/FontAwesome.otf'
        output: 'fonts/FontAwesome.otf'
      font-awesome-eot:
        inputs: '@EarlsLionBiBundle/Resources/public/bower_components/font-awesome/fonts/fontawesome-webfont.eot'
        output: 'fonts/fontawesome-webfont.eot'
      font-awesome-svg:
        inputs: '@EarlsLionBiBundle/Resources/public/bower_components/font-awesome/fonts/fontawesome-webfont.svg'
        output: 'fonts/fontawesome-webfont.svg'
      font-awesome-ttf:
        inputs: '@EarlsLionBiBundle/Resources/public/bower_components/font-awesome/fonts/fontawesome-webfont.ttf'
        output: 'fonts/fontawesome-webfont.ttf'
      font-awesome-woff:
        inputs: '@EarlsLionBiBundle/Resources/public/bower_components/font-awesome/fonts/fontawesome-webfont.woff'
        output: 'fonts/fontawesome-webfont.woff'

orm:
    auto_generate_proxy_classes: "%kernel.debug%"
    entity_managers:
        default:
            mappings:
                EarlsLionBiBundle: ~   
                
fos_rest:
    param_fetcher_listener: true
    body_listener: true
    format_listener: true
    view:
        view_response_listener: 'force'
        formats:
            xml: true
            json : true
        templating_formats:
            html: true
        force_redirects:
            html: true
        failed_validation: HTTP_BAD_REQUEST
        default_engine: twig
    routing_loader:
        default_format: json
```

app/config/routing.yml
```yaml
lion_bi_routing:
    resource: "@EarlsLionBiBundle/Resources/config/routing.yml"
```