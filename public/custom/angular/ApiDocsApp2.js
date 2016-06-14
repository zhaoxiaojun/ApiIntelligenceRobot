/**
 * Created by yuyilong on 16/05/16.
 */
var app = angular.module('ApiDocsApp2', []);
app.controller('ApiDocsContentController2', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/apiDoc/infos',
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.apiDocTitleVersions = response.data.resultData.data;

        // alert($scope.apiDocTitleVersions);

        // SwaggerParser.parse($scope.apiDoc.swagger)
        //     .then(function(api) {
        //         console.log("API name: %s, Version: %s", api.info.title, api.info.version,api.tags,api.paths);
        //     });

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });


    $http({
        method: 'GET',
        url: '/apiDoc',
    }).then(function successCallback(response) {

        $scope.apiDoc = response.data;

        if (!(JSON.stringify(response.data).length == 2)) {

            SwaggerParser.dereference($scope.apiDoc, {
                $refs: {
                    internal: true
                }
            }, function (err, api) {
                if (err) {
                    console.error(err);
                }
                else {
                    $scope.apiDoc = api;
                }
            });
        }
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.selectApiDocByTitleAndVersion = function (title,version) {
        $http({
            method: 'GET',
            url: "/apiDoc/"+title+"/"+version,
        }).then(function successCallback(response) {

            $scope.apiDoc = response.data;

            if (!(JSON.stringify(response.data).length == 2)) {

                SwaggerParser.dereference($scope.apiDoc, {
                    $refs: {
                        internal: true
                    }
                }, function (err, api) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        $scope.apiDoc = api;
                    }
                });
            }
            // this callback will be called asynchronously
            // when the response is available

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
});