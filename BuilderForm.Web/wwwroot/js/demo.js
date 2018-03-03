(function () {
    var baseUrl = 'http://localhost:51468/';
    var baseApiUrl = 'http://localhost:50730';
    angular
        .module("app", ["ngRoute", "builder", "builder.components", "validator.rules"])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/:id',
                {
                    controller: 'FormController',
                    templateUrl: 'Forms/Index'
                })
                .when('/create',
                {
                    controller: 'CrateFormController',
                    templateUrl: 'Forms/Create'
                })
                .when('/answers/:id',
                {
                    controller: 'CrateFormController',
                    templateUrl: 'Forms/Create'
                })
                .otherwise({
                    redirectTo: '/create'
                });
        }])
        .run()
        .controller("FormController", ['$scope', '$builder', '$validator', function ($scope, $builder, $validator) {

            return ($scope.submit = function () {
                return $validator
                    .validate($scope, "default")
                    .success(function () {
                        return console.log("success");
                    })
                    .error(function () {
                        return console.log("error");
                    });
            });
        }])
        .controller("CreateFormController", [
            "$scope",
            "$builder",
            "$validator",
            '$http',
            function ($scope, $builder, $validator, $http) {
                $scope.form = $builder.forms["default"];
                $scope.input = [];
                $scope.defaultValue = {};
                $scope.formUrl = 'https://facebook.com';
                $scope.isSuccess = true;

                $scope.createForm = function () {
                    $http.post(baseApiUrl + '/api/forms/create', $scope.form).success(function (response) {
                        console.log(response);
                        $scope.isSuccess = true;
                        $scope.formUrl = '#/';
                    });
                };

                $scope.addComponent = function (type) {
                    switch (type) {
                        case "input":
                            $builder.addFormObject("default", {
                                component: "textInput",
                                editable: true,
                                id: "textInput",
                                label: "Text Input",
                                description: "description",
                                placeholder: "placeholder",
                                options: [],
                                required: false,
                                validation: "/.*/"
                            });
                            break;
                        case "textarea":
                            $builder.addFormObject("default", {
                                id: "textarea",
                                component: "textArea",
                                label: "Name",
                                description: "Your name",
                                placeholder: "Your name",
                                required: true,
                                editable: false
                            });
                            break;
                        case "checkbox":
                            $builder.addFormObject("default", {
                                id: "checkbox",
                                component: "checkbox",
                                label: "Pets",
                                description: "Do you have any pets?",
                                options: ["Dog", "Cat"]
                            });
                            break;
                        case "radio":
                            $builder.addFormObject("default", {
                                id: "radio",
                                component: "radio",
                                label: "Pets",
                                description: "Do you have any pets?",
                                options: ["Dog", "Cat"]
                            });
                            break;
                        case "select":
                            $builder.addFormObject("default", {
                                id: "select",
                                component: "select",
                                label: "Pets",
                                description: "Do you have any pets?",
                                options: ["Dog", "Cat"]
                            });
                            break;
                        default:
                            $builder.addFormObject("default", {
                                id: "textbox",
                                component: "textInput",
                                label: "Name",
                                description: "Your name",
                                placeholder: "Your name",
                                required: true,
                                editable: false
                            });
                            break;
                    }
                };

            }
        ]);
}.call(this));