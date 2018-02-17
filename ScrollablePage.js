(function () {
    'use strict';
    angular.module('scrollable-page', [])
        .directive("pageable", function ($window) {
            return {
                scope: {
                    scrollDistance: "@",
                    next: "&",
                    size: "@",
                    spinner: "@?"
                },
                link: function ($scope, element, attr) {
                    $scope.scrollHeight = $scope.scrollDistance ? $scope.scrollDistance : 0;
                    element.append(appenderText());
                    $scope.reachedEnd = false;
                    $scope.scrollDisabled = false;
                    $scope.currentPage = 0;
                    $scope.nextPage = function () {
                        if ($scope.scrollDisabled || $scope.reachedEnd) {
                            return;
                        }
                        $scope.scrollDisabled = true;
                        $(element).find(".scroller-spinner").css('display', 'block');
                        $scope.next({
                            size: $scope.size, page: $scope.currentPage, callback: function (count) {
                                if (typeof count === 'undefined') {
                                    throw new Error("next function must return count of fetched data");
                                }
                                if (count > 0) {
                                    next();
                                } else {
                                    $scope.reachedEnd = true;
                                }
                                $(element).find(".scroller-spinner").css('display', 'none');
                                $scope.scrollDisabled = false;
                            }
                        });
                    };
                    $scope.nextPage();
                    angular.element($window).bind("scroll", function (event) {
                        if ($(window).scrollTop() + $(window).height() > $(document).height() - ($scope.scrollHeight * 1000)) {
                            $scope.nextPage();
                        }
                    });
                    $scope.$watch('reachedEnd', function (newValue) {
                        if (newValue) {
                            $(element).find(".end-scroller").css('display', 'block');
                        }
                    });

                    $(element).find('.scroller-refresh').bind('click', function (event) {
                        $scope.reachedEnd = false;
                        $(element).find(".end-scroller").css('display', 'none');
                        $scope.nextPage();
                    });
                    function next() {
                        $scope.currentPage = $scope.currentPage + 1;
                    }
                    function appenderText() {
                        return '<div class="scroller-spinner" style="text-align: center">' + ($scope.spinner ? '<img style="width: 50px !important; height: 50px !important;" src="' + $scope.spinner + '">' : '<p>Loading...</p>') + '</div>' +
                            '<div class="end-scroller" style="display:none; text-align: center"> No more data <button class="scroller-refresh"> Try refresh </button></div>';
                    }
                }
            }
        });
})();
