# check-porch-integration-env

Simple script to detect which Porch integration services are down

## Installation

    git clone https://github.com/austinking/check-porch-integration-env.git
    cd check-porch-integration-env
    npm install

## Usage

    > ./check-integration-env ~/src/porch-all/porch-pro/service.yaml
    > [FAIL] foobar service: http://foobar.example.com:9252/healthcheck
    > Good Services:etl, logdaemon, ugc, mastery, identity, image, mobile, manageddata, search, analytics, backporch, solr, ecom, mega

You can debug with `--debug=true`

    > ./check-integration-env ~/src/porch-all/porch-pro/service.yaml --debug=true

## yaml config

yaml config like service.yaml can be generated via the following program arguments:

    validateconfig env:dev