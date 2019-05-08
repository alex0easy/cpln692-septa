// Set up map
var map = L.map('map', {
  center: [39.953337, -75.177357],
  zoom: 12.65
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// This function builds the page and runs on page startup,
// and does not respond to the interactive buttons.
var main = function() {
  MFL_Line_Layer = L.geoJSON(MFL_Line, {
    style: MFLLStyle
  });
  BSL_Line_Layer = L.geoJSON(BSL_Line, {
    style: BSLLStyle
  });
  NHSL_Line_Layer = L.geoJSON(NHSL_Line, {
    style: NHSLLStyle
  });
  RR_Line_Layer = L.geoJSON(RR_Line, {
    style: RRLStyle
  });

  MFL_Line_Layer.addTo(map);
  BSL_Line_Layer.addTo(map);
  NHSL_Line_Layer.addTo(map);
  RR_Line_Layer.addTo(map);

  for (let i = 0; i < MFL_Station.features.length; i++) {
    MFL_Station_List.push(MFL_Station.features[i].attributes);
  };

  for (let i = 0; i < BSL_Station.features.length; i++) {
    BSL_Station_List.push(BSL_Station.features[i].attributes);
  };

  for (let i = 0; i < NHSL_Station.features.length; i++) {
    NHSL_Station_List.push(NHSL_Station.features[i].attributes);
  };

  for (let i = 0; i < RR_Station.features.length; i++) {
    RR_Station_List.push(RR_Station.features[i].attributes);
  };

  MFL_Station_Layer = stationlayergenerator(MFL_Station_List, MFL_Station_Icon);
  plotdots(MFL_Station_Layer);

  BSL_Station_Layer = stationlayergenerator(BSL_Station_List, BSL_Station_Icon);
  plotdots(BSL_Station_Layer);

  NHSL_Station_Layer = stationlayergenerator(NHSL_Station_List, NHSL_Station_Icon);
  plotdots(NHSL_Station_Layer);

  RR_Station_Layer = stationlayergenerator(RR_Station_List, RR_Station_Icon);
  plotdots(RR_Station_Layer);

  setsearchcriteria();

  
};


// Actual page building on load
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
                          main(); //Load the build page function here.
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
