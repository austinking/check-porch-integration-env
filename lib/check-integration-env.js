var fs   = require('fs');
var request = require('request');
var yaml = require('js-yaml');
var async = require('async');

var DEBUG = false;


function checkService(services, serviceName, cb) {
  	var service = services[serviceName];
  	
    if (!service.host) {
        cb(null, {});
  		return;
  	}
  	if (!service.adminPort && !service.servicePort) {
        cb(null, {});
  		return;
  	}
  	switch (serviceName) {
  		case 'address':
            cb(null, {});
  			return;
  		case 'solr':
  		    checkSolr(serviceName, service, cb);
  		    break;
  		default:
  			checkDropWizardService(serviceName, service, cb);
  		    break;
  	}
}

/**
 * checks the health of services
 *
 * @param serviceFile
 * @returns a "good" and "bad" array of services
 */
module.exports = function(serviceFile, cb) {
    var doc;

    try {
        doc = yaml.safeLoad(fs.readFileSync(serviceFile, 'utf8'));
    } catch (e) {
        cb(e,null);
        return;
    }

    var services = doc.services;

    var checkServiceWrapper = function(serviceName, cb) {
        var cbWrapper = function(err, result) {
            cb(err, result);
        }
        checkService(services, serviceName, cbWrapper);
    }

    async.map(Object.keys(services), checkServiceWrapper, function(err, results) {
        var goodServices = [];
        var badServices = [];

        results.forEach(function(result) {
            if (result.name) {
                if (result.status == 'good') {
                    goodServices.push(result);
                } else {
                    badServices.push(result);
                }
            }
        })

        cb(null, {
            good: goodServices,
            bad: badServices
        });
    });

}

/**
 * Checks the status of an individual drop bizservice. A service is described
 */
function checkDropWizardService(serviceName, service, cb) {
	var healthCheckUrl = 'http://' + service.host + ':' + service.adminPort + '/healthcheck';
    doRequest(healthCheckUrl, serviceName, service, cb);
}

function checkSolr(serviceName, service, cb) {
	var healthCheckUrl = 'http://' + service.host + ':' + service.servicePort + '/solr/#/';	
    doRequest(healthCheckUrl, serviceName, service, cb);
}

function doRequest(healthCheckUrl, serviceName, service, cb) {
    var options = {
        url: healthCheckUrl,
        timeout: 3000
    };

	request(options, function(err, res, body) {

        if (err != null) {
            body = err;
        }

        var r = {
            name: serviceName,
            url: healthCheckUrl,
            body: body
        }

    	if (! err && res.statusCode === 200) {
            r.status = 'good';
    		cb(null, r);
    	} else {
            r.status = 'bad';
		    cb(null, r);
    	}
    });
}


