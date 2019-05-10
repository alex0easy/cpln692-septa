// This page deals with the interactive buttons

// Plotting rail stations and add trigger for search on click
var plotstations = function(list) {
  for (let i = 0; i < list.length; i++) {
    list[i].addTo(map).on('click', function(e) {
      searchandplot(this);
    });
    // Generates a new search area every time a station is clicked on
  };
};

// Plotting and removing bus stops and routes without adding click functions
var plotdots = function(list) {
  _.each(list, function(o) {
    o.addTo(map);
  });
};

var removedots = function(list) {
  _.each(list, function(o) {
    map.removeLayer(o);
  });
};

var plotroutes = function(list_gj, list_layer, style) {
  _.each(list_gj, function(o) {
    list_layer.push(L.geoJSON(o, style));
  });
  plotdots(list_layer);
};

// Listener for search critera
var setsearchcriteria = function() {
  searchcriteria.function = $('#mode').val();
  if (searchcriteria.function == 'dis') {
    searchcriteria.radius = 100 * $('#range').val();
    $('#searchdisplay').text(searchcriteria.radius + " feet around a station.");
  } else {
    searchcriteria.radius = $('#range').val();
    $('#searchdisplay').text(searchcriteria.radius + " minutes of " + searchcriteria.function+" distance from a station.");
  }
};

// Get search area and replace the old one with a new one
var checkandremove = function(layer) {
  if (layer != undefined) {
    map.removeLayer(layer);
  };
};

// Searches for and plots stops and routes within a given search area,
// and display the results to the sidebar.
var findwithin = function(area) {

  // Finding and plotting stops
  var trolleystopslist = turf.pointsWithinPolygon(Trolley_Stop, area);
  var busstopslist = turf.pointsWithinPolygon(Bus_Stop, area);

  trolleystopswithin = trolleystopslist.features;
  busstopswithin = busstopslist.features;

  // Filter stops by days of service; Drop them if they have no service.
  if ($('#weekday_select').is(':checked') == true) {
    for (var i = 0; i < trolleystopswithin.length; i++) {
      if (trolleystopswithin[i].properties.Weekday_To == 0) {
        trolleystopswithin.splice(i, 1);
        i--;
      };
    };
    for (var i = 0; i < busstopswithin.length; i++) {
      if (busstopswithin[i].properties.Weekday_To == 0) {
        busstopswithin.splice(i, 1);
        i--;
      };
    };
  };

  if ($('#saturday_select').is(':checked') == true) {
    for (var i = 0; i < trolleystopswithin.length; i++) {
      if (trolleystopswithin[i].properties.Saturday_T == 0) {
        trolleystopswithin.splice(i, 1);
        i--;
      };
    };
    for (var i = 0; i < busstopswithin.length; i++) {
      if (busstopswithin[i].properties.Saturday_T == 0) {
        busstopswithin.splice(i, 1);
        i--;
      };
    };
  };

  if ($('#sunday_select').is(':checked') == true) {
    for (var i = 0; i < trolleystopswithin.length; i++) {
      if (trolleystopswithin[i].properties.Sunday_Tot == 0) {
        trolleystopswithin.splice(i, 1);
        i--;
      };
    };
    for (var i = 0; i < busstopswithin.length; i++) {
      if (busstopswithin[i].properties.Sunday_Tot == 0) {
        busstopswithin.splice(i, 1);
        i--;
      };
    };
  };

  removedots(trolleystopswithin_layer);
  trolleystopswithin_layer = [];

  removedots(busstopswithin_layer);
  busstopswithin_layer = [];

  if (trolleystopswithin.length > 0) {
    _.each(trolleystopswithin, function(stop) {
      var marker = L.circleMarker([stop.properties.Latitude, stop.properties.Longitude], TrolleySStyle);
      trolleystopswithin_layer.push(marker);
    });
  };

  if (busstopswithin.length > 0) {
    _.each(busstopswithin, function(stop) {
      var marker = L.circleMarker([stop.properties.Latitude, stop.properties.Longitude], BusSStyle);
      busstopswithin_layer.push(marker);
    });
  };

  if (map.getZoom() >= 14){
    plotdots(trolleystopswithin_layer);
    plotdots(busstopswithin_layer);
  };

  // Finding and plotting routes
  var dirtytrolleylist = [];
  var dirtybuslist = [];
  _.each(trolleystopswithin, function(stop) {
    dirtytrolleylist.push(stop.properties.Route);
  });
  _.each(busstopswithin, function(stop) {
    if (stop.properties.Route != " ") {
      dirtybuslist.push(stop.properties.Route);
    };
  });

  trolleyrouteswithin = [...new Set(dirtytrolleylist)];
  busrouteswithin = [...new Set(dirtybuslist)];

  removedots(trolleyrouteswithin_layer);
  trolleyrouteswithin_gj = [];
  trolleyrouteswithin_layer = [];

  removedots(busrouteswithin_layer);
  busrouteswithin_gj = [];
  busrouteswithin_layer = [];

  _.each(Trolley_Route.features, function(route) {
    if (trolleyrouteswithin.includes(route.properties.Route) == true) {
      trolleyrouteswithin_gj.push(route);
    };
  });

  _.each(Bus_Route.features, function(route) {
    if (busrouteswithin.includes(route.properties.Route) == true) {
      busrouteswithin_gj.push(route);
    };
  });

  plotroutes(busrouteswithin_gj, busrouteswithin_layer, BusRStyle);
  plotroutes(trolleyrouteswithin_gj, trolleyrouteswithin_layer, TrolleyRStyle);

  // Changes text in the tally box
  changeresult();
  // Generates the boxes
  generatebox('#trolleyboxes', trolleyrouteswithin_gj, "trolleybox");
  generatebox('#busboxes', busrouteswithin_gj, 'busbox');
};

// Changes text in result box.
var changeresult = function() {
  $('#notrolley').text(trolleyrouteswithin.length + " trolley");
  $('#nobus').text(busrouteswithin.length + " bus");
  $('#searchresulttally').show();
  $('#defaultresult').hide();
};

// Generates the result boxes we see.
var generatebox = function(where, list, style) {
  $(where).empty();
  _.each(list, function(route) {
    var boxcontent;
    var settextstyle = function(style) {
      if (style == "trolleybox") {
        return "trolleywords";
      } else {
        return "buswords";
      };
    };

    var textstyle = settextstyle(style);
    boxcontent = '<div class=' + style + '><p class=' + textstyle + '><a href="#" data-id=' + route.properties.Route + ' id="R' + route.properties.Route + '">' + route.properties.Route + '</a><br></p><p class=' + textstyle + 'notbold>' + route.properties.Route_Name + '</p></div>';

    $(where).append(boxcontent);
  });

  _.each(list, function(route) {
    var id = '#R' + route.properties.Route
    $(id).on('click', function() {
      routetobehighlighted = $(this).data('id');
      highlightroute(routetobehighlighted);
    });
  });
};

// Highlights selected route on click.
var highlightroute = function(rnumber) {
  checkandremove(highlighted_layer);
  highlighted_layer_gj = [];

  _.each(trolleyrouteswithin_gj, function(route) {
    if (route.properties.Route == rnumber) {
      highlighted_layer_gj.push(route);
    };
  });

  _.each(busrouteswithin_gj, function(route) {
    if (route.properties.Route == rnumber) {
      highlighted_layer_gj.push(route);
    };
  });

  highlighted_layer = L.geoJSON(highlighted_layer_gj, HighlightStyle);
  highlighted_layer.addTo(map);
};

// This function calculates the search area and
// calls the function above
var searchandplot = function(station) {
  var token = '&access_token=pk.eyJ1IjoiYWxleDBlYXN5IiwiYSI6ImNqdmZwMmk0NDByYjg0M2t3Zm9rZW42ZHQifQ.1wZxIuUdeVjmV0dslAfdow';
  var mapboxadd = 'https://api.mapbox.com/isochrone/v1/mapbox/';
  var thisstyle = station.sstyle;

  if (searchcriteria.function != 'dis') {
    var address = mapboxadd + searchcriteria.function+"/" + station._latlng.lng + "," + station._latlng.lat + "?contours_minutes=" + searchcriteria.radius + '&polygons=true' + token;
    $.ajax(address).done(function(o) {
      checkandremove(highlighted_layer);
      checkandremove(searcharealayer);
      searcharealayer = L.geoJSON(o, thisstyle);
      searcharealayer.addTo(map);
      findwithin(o);
    });
  } else {
    checkandremove(highlighted_layer);
    checkandremove(searcharealayer);
    var searcharea = turf.circle([station._latlng.lng, station._latlng.lat], 0.0003048 * searchcriteria.radius, {
      units: 'kilometers'
    });
    searcharealayer = L.geoJSON(searcharea, thisstyle);
    searcharealayer.addTo(map);
    findwithin(searcharea);
  };
};


// Rail Line selectors
$('#mfl_select').click(function() {
  if ($(this).is(':checked')) {
    MFL_Line_Layer.addTo(map);
    plotstations(MFL_Station_Layer);
  } else {
    map.removeLayer(MFL_Line_Layer);
    removedots(MFL_Station_Layer);
  }
});

$('#bsl_select').click(function() {
  if ($(this).is(':checked')) {
    BSL_Line_Layer.addTo(map);
    plotstations(BSL_Station_Layer);
  } else {
    map.removeLayer(BSL_Line_Layer);
    removedots(BSL_Station_Layer);
  }
});

$('#nhsl_select').click(function() {
  if ($(this).is(':checked')) {
    NHSL_Line_Layer.addTo(map);
    plotstations(NHSL_Station_Layer);
  } else {
    map.removeLayer(NHSL_Line_Layer);
    removedots(NHSL_Station_Layer);
  }
});

$('#rr_select').click(function() {
  if ($(this).is(':checked')) {
    RR_Line_Layer.addTo(map);
    plotstations(RR_Station_Layer);
  } else {
    map.removeLayer(RR_Line_Layer);
    removedots(RR_Station_Layer);
  }
});

// Listener for search criteria changes
$('#range').click(function() {
  setsearchcriteria();
});

$('#mode').click(function() {
  setsearchcriteria();
});

// Station dots(markers) generator
var stationpopupgenerator = function(list, feature) {
  var content = "";
  if (list == RR_Station_List) {
    if (feature.Line_Name == "Joint") {
      content = "THIS IS :" + "<br>" + feature.Station_Na + "<br>" + "Glenside Combined (SEPTA Main Line)";
    } else {
      content = "THIS IS :" + "<br>" + feature.Station_Na + "<br>" + feature.Line_Name;
    };
  } else {
    content = "THIS IS :" + "<br>" + feature.Station + "<br>" + feature.Route;
  };
  return content;
};

var stationlayergenerator = function(list, icon) {
  var layer = [];
  for (let k = 0; k < list.length; k++) {
    var marker = L.marker([list[k].Latitude, list[k].Longitude], {
      icon: icon
    });
    marker.sstyle = list[k].sstyle;
    var popupcontent = stationpopupgenerator(list, list[k]);
    marker.bindPopup(popupcontent).openPopup();
    layer.push(marker);
  };
  return layer;
};

//Reset button
$('#resetbutton').click(function() {
  checkandremove(highlighted_layer);
  checkandremove(searcharealayer);
  removedots(trolleystopswithin_layer);
  trolleystopswithin_layer = [];
  removedots(busstopswithin_layer);
  busstopswithin_layer = [];
  removedots(trolleyrouteswithin_layer);
  removedots(busrouteswithin_layer);
  $('#trolleyboxes').empty();
  $('#busboxes').empty();
  $('#searchresulttally').hide();
  $('#defaultresult').show();
});
