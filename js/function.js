// This page deals with the interactive buttons
// General plotting functions
var plotdots = function(list){
  for (let i=0; i < list.length; i++){
    list[i].addTo(map);
  };
};

var removedots = function(list){
  for (let i=0; i < list.length; i++){
    map.removeLayer(list[i]);
  };
};

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

// {profile}/{coordinates}?{contours_minutes}
var getmapbox = function(station){
  var address;
  if (searchcriteria.fuction=='walking') {
    address = mapboxadd + "walking/" + station._latlng.lng + "," + station._latlng.lat + "?contours_minutes=" + searchcriteria.radius + '&polygons=true'+ token;
  } else {
    address = mapboxadd + "cycling/" + station._latlng.lng + "," + station._latlng.lat + "?contours_minutes=" + searchcriteria.radius + '&polygons=true'+ token;
  }
  $.ajax(address).done(function(o) {
    searcharea = o;
  });
};


// Rail Line selectors
$('#mfl_select').click(function() {
  if ($(this).is(':checked')) {
    MFL_Line_Layer.addTo(map);
    plotdots(MFL_Station_Layer);
  } else {
    map.removeLayer(MFL_Line_Layer);
    removedots(MFL_Station_Layer);
  }
});

$('#bsl_select').click(function() {
  if ($(this).is(':checked')) {
    BSL_Line_Layer.addTo(map);
    plotdots(BSL_Station_Layer);
  } else {
    map.removeLayer(BSL_Line_Layer);
    removedots(BSL_Station_Layer);
  }
});

$('#nhsl_select').click(function() {
  if ($(this).is(':checked')) {
    NHSL_Line_Layer.addTo(map);
    plotdots(NHSL_Station_Layer);
  } else {
    map.removeLayer(NHSL_Line_Layer);
    removedots(NHSL_Station_Layer);
  }
});

$('#rr_select').click(function() {
  if ($(this).is(':checked')) {
    RR_Line_Layer.addTo(map);
    plotdots(RR_Station_Layer);
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
    content = feature.Station_Na + "; " + feature.Line_Name;
  } else {
  content = feature.Station + "; " + feature.Route;
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
