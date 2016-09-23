// Ionic Starter App
var domain = "https://hope.arth.tech/";
//var domain = "http://stage.doctrs.in/";
angular.module('underscore', [])
        .factory('_', function () {
            return window._; // assumes underscore has already been loaded on the page
        });

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
    'ionic',
    'angularMoment',
    'your_app_name.controllers',
    'your_app_name.directives',
    'your_app_name.filters',
    'your_app_name.services',
    'your_app_name.factories',
    'your_app_name.config',
    'underscore',
    'ngMap',
    'ngResource',
    'ngCordova',
    'slugifier',
    'ionic.contrib.ui.tinderCards',
    'jett.ionic.filter.bar',
    'youtube-embed'
])
        .run(function ($ionicPlatform, $state, $http, $rootScope, $ionicConfig, $timeout, $ionicLoading) {
            $ionicPlatform.on("deviceready", function () {

//                var notificationOpenedCallback = function (jsonData) {
//                    alert('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
//                    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
//
//                    // $state.go("app.content-library-setting");
//                    try
//                    {
//                        if (jsonData.additionalData) {
//                            alert("Inside additionalData");
//                            if (jsonData.additionalData.yourUrlKey) {
//                                 alert("Inside additionalData yourUrlKey");
//                                location.href = jsonData.additionalData.yourUrlKey;
//                            }
//                            if (jsonData.additionalData.actionSelected && jsonData.additionalData.actionSelected.id == "id1")
//                                alert("Button id1 pressed!");
//                        }
//                       // alert("befre state go");
//                       // $state.go("app.content-library-setting");
//                       //  alert("after state go");
//                        // window.location.href = '/content-library-setting';
//                    } catch (err)
//                    {
//                        alert('No redirection '+err);
//                    }
//
//
//                };

                var notificationOpenedCallback = function (jsonData) {
                    // alert('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
                    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));

                    // $state.go("app.content-library-setting");
                    try
                    {
                        if (jsonData.additionalData) {
                            // alert("Inside additionalData");
                            //  alert("id " + jsonData.additionalData.actionSelected);

                            $http({
                                method: 'GET',
                                url: domain + 'trigger/action-trigger',
                                params: {action: jsonData.additionalData, status: 1}
                            }).then(function successCallback(response) {
                                console.log(response.data);
                                try {
                                    if (response.data) {
                                        location.href = response.data;
                                    } else if (jsonData.additionalData.defaultUrl) {
                                        location.href = jsonData.additionalData.defaultUrl;
                                    }
                                } catch (err) {
                                    location.href = jsonData.additionalData.defaultUrl;
                                }

                            }, function errorCallback(e) {
                                console.log(e);
                            });

//                            if (jsonData.additionalData.actionSelected == "id1")
//                            {
//
//                               // alert("Button id1 pressed!");
//                                $http({
//                                    method: 'GET',
//                                    url: domain + 'tracker/captured',
//                                    params: {actionid: jsonData.additionalData.actionButtons[0].icon, status: 1}
//                                }).then(function successCallback(response) {
//
//                                    if (jsonData.additionalData.yourUrlKey) {
//                                        location.href = jsonData.additionalData.yourUrlKey;
//                                    }
//
//                                }, function errorCallback(e) {
//                                    console.log(e);
//                                });
//                            }
//                            if (jsonData.additionalData.actionSelected == "id2")
//                            {
//                               /// alert("Button id2 pressed!");
//
//                                $http({
//                                    method: 'GET',
//                                    url: domain + 'tracker/captured',
//                                    params: {actionid: jsonData.additionalData.actionButtons[1].icon, status: 2}
//                                }).then(function successCallback(response) {
//
//                                    if (jsonData.additionalData.yourUrlKey) {
//                                        location.href = jsonData.additionalData.yourUrlKey;
//                                    }
//                                }, function errorCallback(e) {
//                                    console.log(e);
//                                });
//                            }
//                            if (jsonData.additionalData.actionSelected == "id3")
//                            {
//                               // alert("Button id3 pressed!");
//
//                                $http({
//                                    method: 'GET',
//                                    url: domain + 'tracker/captured',
//                                    params: {actionid: jsonData.additionalData.actionButtons[2].icon, status: 3}
//                                }).then(function successCallback(response) {
//                                    if (jsonData.additionalData.yourUrlKey) {
//                                        location.href = jsonData.additionalData.yourUrlKey;
//                                    }
//                                }, function errorCallback(e) {
//                                    console.log(e);
//                                });
//                            }
                        }

                    } catch (err)
                    {
                        // alert('No redirection ' + err);
                    }


                };

                window.plugins.OneSignal.init("eaa13ee8-5f59-4fe7-a532-aa47d00cbba0",
                        {googleProjectNumber: "769295732267"}, // jainam account GCM id
                        notificationOpenedCallback);
                try
                {
                    window.plugins.OneSignal.getIds(function (ids) {
                        console.log('getIds: ' + JSON.stringify(ids));
                        if (window.localStorage.getItem('id')) {
                            var userId = window.localStorage.getItem('id');
                        } else {
                            var userId = '';
                        }

                        $http({
                            method: 'GET',
                            url: domain + 'notification/insertPlayerId',
                            params: {userId: userId, playerId: ids.userId, pushToken: ids.pushToken}
                        }).then(function successCallback(response) {
                            if (response.data == 1) {
                                //  alert('Notification setting updated');
                            }
                        }, function errorCallback(e) {
                            console.log(e);
                        });
                    });
                } catch (err)
                {
                    console.log('No redirection ' + err);
                }

                window.plugins.OneSignal.enableInAppAlertNotification(true);

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                //PushNotificationsService.register();
            });
//            $rootScope.$on('loading:show', function () {
//                $ionicLoading.show({template: 'Loading'})
//            })
//
//            $rootScope.$on('loading:hide', function () {
//                $ionicLoading.hide()
//            })
            // This fixes transitions for transparent background views
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                if (toState.name.indexOf('auth.walkthrough') > -1)
                {
                    // set transitions to android to avoid weird visual effect in the walkthrough transitions
                    $timeout(function () {
                        $ionicConfig.views.transition('android');
                        $ionicConfig.views.swipeBackEnabled(false);
                        console.log("setting transition to android and disabling swipe back");
                    }, 0);
                }
                try {
                    if (toState.name == "app.doctor-join" || toState.name == "app.chat")
                    {
                        console.log("false state");
                        window.plugins.OneSignal.enableInAppAlertNotification(false);
                    } else {
                        console.log("true state");
                        window.plugins.OneSignal.enableInAppAlertNotification(true);
                    }
                } catch (err) {

                }
            });
            $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
                if (toState.name.indexOf('app.feeds-categories') > -1)
                {
                    // Restore platform default transition. We are just hardcoding android transitions to auth views.
                    $ionicConfig.views.transition('platform');
                    // If it's ios, then enable swipe back again
                    if (ionic.Platform.isIOS())
                    {
                        $ionicConfig.views.swipeBackEnabled(true);
                    }
                    console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
                }
            });

            $ionicPlatform.on("resume", function () {
                // PushNotificationsService.register();
            });
        })

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
            $httpProvider.interceptors.push(function ($rootScope) {
                return {
                    request: function (config) {
                        $rootScope.$broadcast('loading:show')
                        return config
                    },
                    response: function (response) {
                        $rootScope.$broadcast('loading:hide')
                        return response
                    }
                }
            })

            $stateProvider
                    //INTRO
                    .state('auth', {
                        url: "/auth",
                        templateUrl: "views/auth/auth.html",
                        abstract: true,
                        controller: 'AuthCtrl'
                    })

                    .state('auth.walkthrough', {
                        url: '/walkthrough',
                        templateUrl: "views/auth/walkthrough.html"
                    })

                    .state('auth.login', {
                        url: '/login',
                        templateUrl: "views/auth/login.html",
                        controller: 'LoginCtrl'
                    })

                    .state('auth.signup', {
                        url: '/signup',
                        templateUrl: "views/auth/signup.html",
                        controller: 'SignupCtrl'
                    })

                    .state('auth.forgot-password', {
                        url: "/forgot-password",
                        templateUrl: "views/auth/forgot-password.html",
                        controller: 'ForgotPasswordCtrl'
                    })

                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "views/app/side-menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('app.doctor-settings', {
                        cache: false,
                        url: "/doctor-settings",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-settings.html",
                                controller: 'DoctorSettingsCtrl'
                            }
                        }
                    })

                    .state('app.doctor-settings-new', {
                        cache: false,
                        url: "/doctor-settings-new",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-settings-new.html",
                                controller: 'DoctorSettingsNewCtrl'
                            }
                        }
                    })

                    .state('app.update-doctor-setting', {
                        cache: false,
                        url: "/update-doctor-setting/{data:string}/{permission:string}/{uid:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/update-doctor-setting.html",
                                controller: 'UpdateDoctorSettingsCtrl'
                            }
                        }
                    })

                    /* doctor join */
                    .state('dpatient', {
                        url: "/dpatient",
                        templateUrl: "views/app/doctrjoin/dpatient.html",
                        controller: 'PatientHistoryCtrl'
                    })

                    .state('dfamily-history', {
                        url: "/dfamily-history",
                        templateUrl: "views/app/doctrjoin/dfamily-history.html",
                        controller: 'ConsultationsNoteCtrl'
                    })

                    .state('dmeasurement', {
                        url: "/dmeasurement/{mid:string}",
                        templateUrl: "views/app/doctrjoin/dmeasurement.html",
                        controller: 'MeasurementCtrl'
                    })

                    .state('dtestresult', {
                        url: "/dtestresult",
                        templateUrl: "views/app/doctrjoin/dtestresult.html",
                        controller: 'TestResultCtrl'
                    })

                    .state('dobservation', {
                        url: "/dobservation/{objid:string}",
                        templateUrl: "views/app/doctrjoin/dobservation.html",
                        controller: 'ObservationCtrl'
                    })

                    .state('dsnomed', {
                        url: "/dsnomed",
                        templateUrl: "views/app/doctrjoin/dsnomed.html",
                        controller: 'ConsultationsNoteCtrl'
                    })

                    .state('dicd', {
                        url: "/dsnomed",
                        templateUrl: "views/app/doctrjoin/dicd.html",
                        controller: 'ConsultationsNoteCtrl'
                    })


                    .state('dtext', {
                        url: "/dtext/{diaid:string}",
                        templateUrl: "views/app/doctrjoin/dtext.html",
                        controller: 'DiagnosisTextCtrl'
                    })

                    .state('dinvestigations', {
                        url: "/dinvestigations",
                        templateUrl: "views/app/doctrjoin/dinvestigations.html",
                        controller: 'ConsultationsNoteCtrl'
                    })

                    .state('dmedication', {
                        url: "/dmedication",
                        templateUrl: "views/app/doctrjoin/dmedication.html",
                        controller: 'ConsultationsNoteCtrl'
                    })

                    .state('dprocedure', {
                        url: "/dprocedure",
                        templateUrl: "views/app/doctrjoin/dprocedure.html",
                        controller: 'ConsultationsNoteCtrl'
                    })

                    .state('dlifestyle', {
                        url: "/dlifestyle",
                        templateUrl: "views/app/doctrjoin/dlifestyle.html",
                        controller: 'ConsultationsNoteCtrl'
                    })

                    .state('dreferral', {
                        url: "/dreferral",
                        templateUrl: "views/app/doctrjoin/dreferral.html",
                        controller: 'ConsultationsNoteCtrl'
                    })


                    .state('ddietplan', {
                        url: "/ddietplan",
                        templateUrl: "views/app/doctrjoin/ddietplan.html",
                        controller: 'DietplanCtrl'
                    })

                    .state('ddietplan-list', {
                        url: "/ddietplan-list",
                        templateUrl: "views/app/doctrjoin/ddietplan-list.html",
                        controller: 'DietplanListCtrl'
                    })


                    /* doctor join */
                    .state('app.doctor-consultations', {
                        cache: false,
                        url: "/doctor-consultations",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-consultations.html",
                                controller: 'DoctorConsultationsActiveCtrl'
                            }
                        }
                    })

                    .state('app.consultation-past', {
                        url: "/consultations/past",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultations-past.html",
                                controller: 'DoctorConsultationsPastCtrl'
                            }
                        }
                    })
                    .state('app.patient-app-list', {
                        cache: false,
                        url: "/patient-app-list/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patients/patient-app-list.html",
                                controller: 'PatientAppointmentListCtrl'
                            }
                        }
                    })
                    .state('app.patient-past-app-list', {
                        cache: false,
                        url: "/patient-past-app-list/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patients/patient-past-app-list.html",
                                controller: 'PatientAppointmentListCtrl'
                            }
                        }
                    })


                    .state('app.chat', {
                        cache: false,
                        url: "/chat/{id:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/chat.html",
                                controller: 'ChatCtrl'
                            }
                        }
                    })
                     .state('app.view-chat-video', {
                        cache: false,
                        url: "/view-chat-video/{id:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/view-chat-video.html",
                                controller: 'ViewVideoChatCtrl'
                            }
                        }
                    })
                    .state('app.video-chat', {
                        cache: false,
                        url: "/video-chat",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/video-chat.html",
                                controller: 'VideoChatCtrl'
                            }
                        }
                    })
                    .state('app.chat-video-share', {
                        cache: false,
                        url: "/chat-video-share",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/chat-video-share.html",
                                controller: 'VideoChatShareCtrl'
                            }
                        }
                    })
                    .state('app.past-chat', {
                        cache: false,
                        url: "/past-chat/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/pastchat.html",
                                controller: 'PastChatCtrl'
                            }
                        }
                    })

                    .state('app.chatlist', {
                        cache: false,
                        url: "/chatlist",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/chatlist.html",
                                controller: 'ChatListCtrl'
                            }
                        }
                    })

                    .state('app.past-chatlist', {
                        cache: false,
                        url: "/past-chatlist",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/past-chatlist.html",
                                controller: 'PastChatListCtrl'
                            }
                        }
                    })

                    .state('app.assistantChatList', {
                        url: "/assistantChatList",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/assistant-chatlist.html",
                                controller: 'AssistantChatListCtrl'
                            }
                        }
                    })

                    .state('app.assistantChat', {
                        url: "/assistantchat/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/chat.html",
                                controller: 'AssistantChatCtrl'
                            }
                        }
                    })

                    .state('app.peers', {
                        url: "/peers",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/peers.html",
                                controller: 'PeersCtrl'
                            }
                        }
                    })

                    .state('app.peers-detail', {
                        url: "/peers-detail",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/peers-detail.html",
                                controller: 'PeersDetailCtrl'
                            }
                        }
                    })

                    .state('app.chat-appointments', {
                        cache: false,
                        url: "/chat-appointments",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/chat-appointments.html",
                                controller: 'DoctorChatAppsCtrl'
                            }
                        }
                    })
                    .state('app.preview-note', {
                        url: "/preview-note/{id:int}/{appId:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/preview/view-note/cnote-view.html",
                                controller: 'PreviewConsultationsNoteCtrl'
                            }
                        }
                    })

                    .state('app.view-note', {
                        url: "/view-note/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/view-consultations-note.html",
                                controller: 'ViewConsultationsNoteCtrl'
                            }
                        }
                    })
                    .state('app.view-measure-details', {
                        url: "/view-measure-details/{id:int}/{type:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/measure-details.html",
                                controller: 'MeasureDetailsCtrl'
                            }
                        }
                    })

                    .state('app.view-cn-details', {
                        url: "/view-cn-details/{id:int}/{type:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/cn-details.html",
                                controller: 'OtherDetailsCtrl'
                            }
                        }
                    })

                    .state('app.view-patient-history', {
                        cache: false,
                        url: "/consultation-note/view-patient-history/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/view-patient-history.html",
                                controller: 'ViewPatientHistoryCtrl'
                            }
                        }
                    })

                    .state('app.view-medicine', {
                        cache: false,
                        url: "/view-medicine/{id:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/view-medicine.html",
                                controller: 'ViewMedicineCtrl'
                            }
                        }
                    })

                    .state('app.consultations-note', {
                        url: "/consultations-note/{appId:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultations-note.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })

                    .state('app.notetype', {
                        //cache: false,
                        url: "/notetype",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/notetype.html",
                                controller: 'NotetypeCtrl'
                            }
                        }
                    })

                    /* inventory */
                    .state('app.inventory', {
                        cache: false,
                        url: "/inventory",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/inventory/inventory.html",
                                controller: 'InventoryCtrl'
                            }
                        }
                    })
                    .state('app.searchinventory', {
                        cache: false,
                        url: "/inventory/search/{key:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/inventory/search.html",
                                controller: 'InventorySearchCtrl'
                            }
                        }
                    })

                    .state('app.search-location', {
                        cache: false,
                        url: "/inventory/search-location/{key:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/inventory/search-location.html",
                                controller: 'InventorySearchCtrl'
                            }
                        }
                    })

                    .state('inventory-location', {
                        url: "/inventory-location/{key:string}",
                        templateUrl: "views/app/doctrjoin/inventory-location.html",
                        controller: 'InveLocationCtrl'
                    })

                    .state('inventory-search', {
                        url: "/inventory-search/{key:string}",
                        templateUrl: "views/app/doctrjoin/inventory-search.html",
                        controller: 'InveSearchCtrl'
                    })

                    .state('app.about', {
                        url: "/consultation-note/about",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/about.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })

                    .state('app.patient-history', {
                        url: "/consultation-note/patient-history",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/patient-history.html",
                                controller: 'PatientHistoryCtrl'
                            }
                        }
                    })

                    .state('app.family-history', {
                        url: "/consultation-note/family-history",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/family-history.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })

                    .state('app.measurement', {
                        url: "/consultation-note/measurement/{mid:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/measurement.html",
                                controller: 'MeasurementCtrl'
                            }
                        }
                    })
                    .state('app.observation', {
                        url: "/consultation-note/observation/{objid:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/observation.html",
                                controller: 'ObservationCtrl'
                            }
                        }
                    })
                    .state('app.diagnosis', {
                        url: "/consultation-note/diagnosis/{diaid:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/diagnosis.html",
                                controller: 'DiagnosisTextCtrl'
                            }
                        }
                    })

                    .state('app.testresult', {
                        url: "/consultation-note/testresult/{testid:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/testresult.html",
                                controller: 'TestResultCtrl'
                            }
                        }
                    })
                    .state('app.investigations', {
                        url: "/consultation-note/investigations",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/investigations.html",
                                controller: 'InvestigationsCtrl'
                            }
                        }
                    })



                    .state('app.medication', {
                        url: "/consultation-note/medication",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/medication.html",
                                controller: 'MedicationsCtrl'
                            }
                        }
                    })

                    .state('app.procedure', {
                        url: "/consultation-note/procedure",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/procedure.html",
                                controller: 'ProceduresCtrl'
                            }
                        }
                    })

                    .state('app.lifestyle', {
                        url: "/consultation-note/lifestyle",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/lifestyle.html",
                                controller: 'LifeStyleCtrl'
                            }
                        }
                    })

                    .state('app.referral', {
                        url: "/consultation-note/referral",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/referral.html",
                                controller: 'ReferralCtrl'
                            }
                        }
                    })

                    .state('app.evaluation', {
                        url: "/evaluation",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/evaluation.html",
                                controller: 'EvaluationCtrl'
                            }
                        }
                    })

                    .state('app.treatment-plan', {
                        url: "/treatmentplan",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/treatment-plan.html",
                                controller: 'TreatmentPlanCtrl'
                            }
                        }
                    })

                    .state('app.createdbyu', {
                        url: "/createdbyu/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/createdbyu.html",
                                controller: 'CreatedbyuCtrl'
                            }
                        }
                    })

                    .state('app.records-view', {
                        cache: false,
                        url: "/records-view/{id:string}/{patientId:string}/{shared:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/records/records-view.html",
                                controller: 'RecordsViewCtrl'
                            }
                        }
                    })

                    .state('app.record-details', {
                        cache: false,
                        url: "/record-details/{id:string}/{patientId:string}/{catId:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/records/record-details.html",
                                controller: 'RecordDetailsCtrl'
                            }
                        }
                    })

                    .state('app.sharedwithu', {
                        cache: false,
                        url: "/sharedwithu/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/sharedwithu.html",
                                controller: 'SharedwithuCtrl'
                            }
                        }
                    })


                    .state('app.treatment-plan-list', {
                        url: "/treatmentplan-list",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/treatment-plan-list.html",
                                controller: 'TreatmentPlanListCtrl'
                            }
                        }
                    })

                    .state('app.doctor-current-tab', {
                        url: "/doctor-current-tab/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-current-tab.html",
                                controller: 'DoctorCurrentTabCtrl'
                            }
                        }
                    })

                    .state('app.doctor-join', {
                        cache: false,
                        url: "/doctor-join/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-join.html",
                                controller: 'DoctorJoinCtrl'
                            }
                        }
                    })
                    .state('app.current-chat', {
                        cache: false,
                        url: "/current-chat/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/current-chat.html",
                                controller: 'CurrentChatCtrl'
                            }
                        }
                    })
                    .state('app.join-chat', {
                        url: "/join-chat/{id:int}/{mode:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/join-chat.html",
                                controller: 'JoinChatCtrl'
                            }
                        }
                    })

                    .state('app.patient-chat', {
                        url: "/patient-chat",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-chat.html",
                                controller: 'PatientChatCtrl'
                            }
                        }
                    })


                    .state('app.homepage', {
                        cache: false,
                        url: "/homepage",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/homepage.html",
                                controller: 'HomepageCtrl'
                            }
                        }
                    })

                    .state('app.patient-list', {
                        url: "/patient-list",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-list.html",
                                controller: 'PatientListCtrl'
                            }
                        }
                    })

                    .state('app.patient', {
                         cache: false,
                        url: "/patient/{id:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient.html",
                                controller: 'PatientCtrl'
                            }
                        }
                    })

                    .state('app.doctr-services', {
                        //  cache: false,
                        url: "/doctr-services/{id:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctr-services.html",
                                controller: 'ConsultationProfileCtrl'
                            }
                        }
                    })

                    .state('app.checkavailable', {
                        cache: false,
                        url: "/checkavailable/{data:int}/{uid:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/checkavailable.html",
                                controller: 'CheckavailableCtrl'
                            }
                        }
                    })

                    .state('app.payment', {
                        //  cache: false,
                        url: "/payment/{id:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/appointment-preview.html",
                                controller: 'AppPreviewCtrl'
                            }
                        }
                    })

                    .state('app.thankyou', {
                        cache: false,
                        url: "/thankyou/{data:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/thankyou.html",
                                controller: 'ThankyouCtrl'
                            }
                        }
                    })

                    .state('app.newarticle', {
                        cache: false,
                        url: "/newarticle",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/newarticle.html",
                                controller: 'NewarticleCtrl'
                            }
                        }
                    })


                    .state('app.new-video-article', {
                        cache: false,
                        url: "/new-video-article",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/content-library/new-video-article.html",
                                controller: 'NewVideoArticleCtrl'
                            }
                        }
                    })

                    .state('app.content-library', {
                        cache: false,
                        url: "/content-library",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/content-library/content-library.html",
                                controller: 'ContentLibraryCtrl'
                            }
                        }
                    })

                    .state('app.doctor-record-video', {
                        //  cache: false,
                        url: "/doctor-record-video",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/content-library/doctor-record-video.html",
                                controller: 'DoctorRecordVideoCtrl'
                            }
                        }
                    })

                    .state('app.view-content-value', {
                        //  cache: false,
                        url: "/view-content-value/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/content-library/view-content-value.html",
                                controller: 'ViewContentCtrl'
                            }
                        }
                    })

                    .state('app.content-library-list', {
                        //  cache: false,
                        url: "/content-library-list",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/content-library/content-library-list.html",
                                controller: 'ContentLibraryListCtrl'
                            }
                        }
                    })

                    .state('app.content-library-details', {
                        //  cache: false,
                        url: "/content-library-details",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/content-library/content-library-details.html",
                                controller: 'ContentLibraryDetailsCtrl'
                            }
                        }
                    })

                    .state('app.dietplan', {
                        //  cache: false,
                        url: "/dietplan",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/dietplan.html",
                                controller: 'DietplanCtrl'
                            }
                        }
                    })

                    .state('app.dietplan-list', {
                        //  cache: false,
                        url: "/dietplan-list",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/dietplan-list.html",
                                controller: 'DietplanListCtrl'
                            }
                        }
                    })


                    .state('app.patient-record', {
                        url: "/patient-record",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-record.html",
                                controller: 'PatientRecordCtrl'
                            }
                        }
                    })

                    .state('app.patient-consult', {
                        url: "/patient-consult",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-consult.html",
                                controller: 'PatientConsultCtrl'
                            }
                        }
                    })

//                    .state('app.supervise', {
//                        url: "/supervise",
//                        views: {
//                            'menuContent': {
//                                templateUrl: "views/app/supervise.html",
//                                controller: 'SuperviseCtrl'
//                            }
//                        }
//                    })

                    /* new consultation note */
                    .state('app.cnote', {
                        url: "/cnote/{appId:string}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/note/cnote.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })

                    .state('app.p-history', {
                        url: "/p-history",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/note/p-history",
                                controller: 'PatientHistoryCtrl'
                            }
                        }
                    })
                    /* end  new consultation note */
                    .state('app.logout', {
                        url: "/logout",
                        views: {
                            'menuContent': {
                                //templateUrl: "views/app/bookmarks.html",
                                controller: 'AppCtrl'
                            }
                        }
                    })

                    .state('app.add-category', {
                        cache: false,
                        url: "/add-category/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/add-record.html",
                                controller: 'AddRecordCtrl'
                            }
                        }
                    })
                     .state('app.video-broadcast', {
                        cache: false,
                        url: "/video-broadcast",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/video-broadcast.html",
                                controller: 'VideoBroadcastCtrl'
                            }
                        }
                    })
                     .state('app.video-broadcast-stream', {
                        cache: false,
                        url: "/video-broadcast-sream/{session_id:string}/{token:string}/{publish:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/video-broadcast-stream.html",
                                controller: 'VideoBroadcastStreamCtrl'
                            }
                        }
                    })
                    ;
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/auth/walkthrough');
        });
