'use strict';

angular.module('myApp.view1', ['ngRoute','ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$compile','uiCalendarConfig', '$q','$http', function($scope,$compile,uiCalendarConfig,$q,$http) {
	
 var $element = $('#calendar').fullCalendar({
      //height: 335,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: new Date(),
      selectable: true,
      selectHelper: true,
      select: function (start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $element.fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $element.fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2016-03-01',
          color: 'red'
        },
        {
          title: 'Long Event',
          start: '2016-03-07',
          end: '2016-03-10',
          color: 'red'
        },
        {
          title: 'Dinner',
          start: '2016-03-14T20:00:00',
          color: 'red'
        },
        {
          title: 'Birthday Party',
          start: '2016-04-01T07:00:00',
          color: 'red'
        }
      ]
    });
}]);