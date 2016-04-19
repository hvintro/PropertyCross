angular.module('request.service',['request.service'])
    .factory('requestSrc',['$http','ApiEndpoint','$cordovaOauth','$q','$rootScope', function($http,ApiEndpoint,$cordovaOauth,$q,$rootScope){


    //TODO: save data on a rootScope
    $rootScope.request = {};
    $rootScope.request.fbtoken = "";
    $rootScope.request.email = "";

    //console.log('ApiEndpoint', ApiEndpoint);

    //TODO: make this working
    var getApiData = function(success,error) {
        $http({  url: ApiEndpoint.url + '/register/signup',
                method: 'POST',
                //"http://localhost:8100/api/register/signup",
                /* headers: {
                 'Content-Type': undefined
                 },*/
                data: { username : "hola",
                    pwd : "hols",
                    client_id : "android",
                    client_secret : "SomeRandomCharsAndNumbers" }})
            .then(function(data,status, headers, config) {
                console.log(data + status + headers + config);
                success(data);
            })
            .then(function(err) {
                alert('error_success');
                error(err);
            });

         };

        //these are the params to include in $http post facebooklogin

       /* {url: ApiEndpoint.url + '/oauth/token',
            method:'POST',
            data: {
                //username : $scope.request.email,
                username : "$scope.request.email",
                grant_type : "password",
                client_id : "android",
                client_secret : "SomeRandomCharsAndNumbers",
                password : "cdabhkslugfalbdjlcabdhsjl89"
            }
        };*/
        //Example post request pointing to other api
        var fbapi = function (success,error) {

            $http({url:'http://jsonplaceholder.typicode.com/posts',
                method: 'POST',
                data: {
                    title: 'foo',
                    body: 'bar',
                    userId: 1
                }
            }).then(function(result){

            //alert("$http " + result);
           // alert("token1" + $rootScope.fbtoken);
            alert("token2 " + JSON.stringify(result.data.id));
            success(result);

        });};

        //some curl examples

        //https://push.opentrends.net:8100/mdpa/api/
        //curl -X POST http://localhost:1337/api/oauth/token grant_type=password client_id=android

        //curl -X POST https://push.opentrends.net:8100/mdpa/api/oauth/token
        //curl -X POST http://jsonplaceholder.typicode.com/posts?title=foo&body=bar&userId=1
        //curl --data "title=foo&body=bar&userId=1" http://jsonplaceholder.typicode.com/posts
        //curl --data "grant_type=password&client_id=android&client_secret=SomeRandomCharsAndNumbers&username=hola@caracola&password=aquí-va-el-password-en-plano" https://push.opentrends.net:8100/mdpa/api/oauth/token
        //curl -H 'X-Response-Control: minified' -X GET http://api.football-data.org/v1/soccerseasons/?season=2015

        //Returning to the controller
            return {

            parseJSon: getApiData,

            callfbapi : fbapi,
            
            login: function(success,error) {

               var url = "https://graph.facebook.com/v2.5/me?fields=id,name,friends,email,picture&access_token=";
               // {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}

                $cordovaOauth.facebook("226674751009221", ["email"]).then(function(result) {

                    $rootScope.request.fbtoken = result.access_token;
                    $http.get(url + result.access_token).then(

                        function (response) {

                            /*return {
                                title: response.data.name,
                                cost: response.data.email
                            }*/

                            $rootScope.request.mail = response.data.email;
                            success(response.data);

                        })}, function(err) {
                         //alert("Error in $cordovaOauth-> " + err);
                            error(err);
                });

            }

            };
        }
    ]);