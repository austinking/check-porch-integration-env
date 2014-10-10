# check-porch-integration-env

Simple script to detect which Porch integration services are down

## Installation

    git clone https://github.com/austinking/check-porch-integration-env.git
    cd check-porch-integration-env
    npm install

## Usage

##### Command Line

    > ./check ~/src/porch-all/porch-pro/service.yaml
    > Good Services:etl, logdaemon, ugc, mastery, identity, image, mobile, manageddata, search, analytics, backporch, solr, ecom, mega

##### Library

     var check = require('check-porch-integration');
     
     check('service.yaml', function(err, result) {
          // assuming no err, result will look like this:
          // {
          //    good: ['etl', 'mega' ...]
          //    bad: ['identity']
          // }
     });

## yaml config

yaml config like service.yaml can be generated via the following program arguments:

    validateconfig env:dev
