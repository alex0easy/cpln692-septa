// Set up map
var map = L.map('map', {
  center: [40.012663, -75.407016],
  zoom: 10.2
});

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(map);

// This function builds the page
var main = function() {

  $('#plotrail').click(function() {
    railselection();
  });


};

// Actual page building
$(document).ready(function() {
  $('#sidebarcontent').hide();
  $.ajax(url[0]).done(function(d) {
    MFL_Station = JSON.parse(d);
    $.ajax(url[1]).done(function(d) {
      MFL_Line = JSON.parse(d);
      $.ajax(url[2]).done(function(d) {
        BSL_Station = JSON.parse(d);
        $.ajax(url[3]).done(function(d) {
          BSL_Line = JSON.parse(d);
          $.ajax(url[4]).done(function(d) {
            NHSL_Station = JSON.parse(d);
            $.ajax(url[5]).done(function(d) {
              NHSL_Line = JSON.parse(d);
              $.ajax(url[6]).done(function(d) {
                RR_Station = JSON.parse(d);
                $.ajax(url[7]).done(function(d) {
                  RR_Line = JSON.parse(d);
                  $.ajax(url[8]).done(function(d) {
                    Trolley_Stop = JSON.parse(d);
                    $.ajax(url[9]).done(function(d) {
                      Trolley_Route = JSON.parse(d);
                      $.ajax(url[10]).done(function(d) {
                        Bus_Stop = JSON.parse(d);
                        $.ajax(url[11]).done(function(d) {
                          Bus_Route = JSON.parse(d);
                          $('#loading').hide();
                          $('#sidebarcontent').show();
                          main(); //Load the main function here
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

});
