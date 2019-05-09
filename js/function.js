// This page deals with the interactive buttons
// General plotting functions
var plotstations = function(list){
  for (let i=0; i < list.length; i++){
    list[i].addTo(map).on('click', function(e) {getsearcharea(this)});
    // Generates a new search area every time a station is clicked on
  };
};

var removedots = function(list){
  for (let i=0; i < list.length; i++){
    map.removeLayer(list[i]);
  };
};

// Find stations within search area



// Query functions
var setsearchcriteria = function(){
  searchcriteria.function = $('#mode').val();
  if (searchcriteria.function == 'dis'){
    searchcriteria.radius = 100*$('#range').val();
    $('#searchdisplay').text(searchcriteria.radius + " feet around a station.");
  } else {
    searchcriteria.radius = $('#range').val();
    $('#searchdisplay').text(searchcriteria.radius + " minutes of " + searchcriteria.function + " distance around a station.");
  }
};

// Get search area and replace the old one with a new one
var checkandremove = function(){
  if (searcharealayer != undefined){
    map.removeLayer(searcharealayer);
  };
};
var ptsWithin;
var getsearcharea = function(station) {
  var token = '&access_token=pk.eyJ1IjoiYWxleDBlYXN5IiwiYSI6ImNqdmZwMmk0NDByYjg0M2t3Zm9rZW42ZHQifQ.1wZxIuUdeVjmV0dslAfdow';
  var mapboxadd = 'https://api.mapbox.com/isochrone/v1/mapbox/';

  if (searchcriteria.function=='walking') {
    var address = mapboxadd + "walking/" + station._latlng.lng + "," + station._latlng.lat + "?contours_minutes=" + searchcriteria.radius + '&polygons=true'+ token;
    $.ajax(address).done(function(o) {
      checkandremove();
      searcharealayer = L.geoJSON(o);
      searcharealayer.addTo(map);
      ptsWithin = turf.pointsWithinPolygon(Trolley_Stop.features, o);
    });
  } else if (searchcriteria.function=='biking') {
    var address = mapboxadd + "cycling/" + station._latlng.lng + "," + station._latlng.lat + "?contours_minutes=" + searchcriteria.radius + '&polygons=true'+ token;
    $.ajax(address).done(function(o) {
      checkandremove();
      searcharealayer = L.geoJSON(o);
      searcharealayer.addTo(map);
      ptsWithin = turf.pointsWithinPolygon(Trolley_Stop.features, o);
    });
  } else {
    checkandremove();
    var searcharea = turf.circle([station._latlng.lng, station._latlng.lat], 0.0003048*searchcriteria.radius, {units: 'kilometers'});
    searcharealayer = L.geoJSON(searcharea);
    searcharealayer.addTo(map);
    ptsWithin = turf.pointsWithinPolygon(Trolley_Stop.features, searcharea);
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

// Range selector
$('#range').click(function(){
  setsearchcriteria();
});

$('#mode').click(function(){
  setsearchcriteria();
});

// Station dots(markers) generator
var stationpopupgenerator = function(list, feature){
  var content="";
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

var stationlayergenerator =  function(list, icon){
  var layer=[];
  for (let k = 0; k < list.length; k++) {
    var marker = L.marker([list[k].Latitude, list[k].Longitude], {
      icon: icon
    });
    var popupcontent = stationpopupgenerator(list, list[k]);
    marker.bindPopup(popupcontent).openPopup();
    layer.push(marker);
  };
  return layer;
};
