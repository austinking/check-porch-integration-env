# check-porch-integration-env

Simple script to detect which Porch integration services are down

## Usage

    > ./check-integration-env ~/src/porch-all/porch-pro/service.yaml
    > Good Services:etl, logdaemon, ugc, mastery, identity, image, mobile, manageddata, search, analytics, backporch, solr, ecom, mega

You can debug with `--debug=true`

    > ./check-integration-env ~/src/porch-all/porch-pro/service.yaml --debug=true