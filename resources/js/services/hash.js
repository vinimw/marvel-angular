var app = angular.module('services.hash', []);

app.service('HashService', function (API, md5) {

	var self = {

        'getHash': function () {
            return md5.createHash(API.TS+API.PRIVATEKEY+API.APIKEY);
        }
    };

    return self;
});
