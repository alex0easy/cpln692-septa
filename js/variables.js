// This file stores global variables
// User's search criteria
var searchcriteria = {
  function: 0,
  radius: 0
};

// Search area related
var searcharealayer;
var trolleystopswithin;
var busstopswithin;
var trolleyrouteswithin;
var busrouteswithin;

var trolleyrouteswithin_gj = [];
var trolleystopswithin_layer=[];
var busstopswithin_layer=[];
var busrouteswithin_gj = [];
var trolleyrouteswithin_layer=[];
var busrouteswithin_layer=[];

var routetobehighlighted;
var highlighted_layer;
var highlighted_layer_gj=[];
//json file addresses. Station first, then lines.
var url = [];
// MFL
url[0] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/MFL_Station.json";
url[1] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/MFL_Line.json";
// BSL
url[2] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/BSL_Station.json";
url[3] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/BSL_Line.json";
// NHSL
url[4] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/NHSL_Station.json";
url[5] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/NHSL_Line.json";
// Regional Rail
url[6] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/RR_Station.json";
url[7] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/RR_Routes.json";
// Trolleys
url[8] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/Trolley_Stops.json";
url[9] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/Trolley_Routes.json";
// Buses
url[10] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/Bus_Stops.json";
url[11] = "https://raw.githubusercontent.com/alex0easy/cpln692-septa/master/json/Bus_Routes.json";

// Storage for geoJSON files
var MFL_Station;
var MFL_Line;
var BSL_Station;
var BSL_Line;
var NHSL_Station;
var NHSL_Line;
var RR_Station;
var RR_Line;
var Trolley_Stop;
var Trolley_Route;
var Bus_Stop;
var Bus_Route;

// Storage for layers
var MFL_Line_Layer;
var BSL_Line_Layer;
var NHSL_Line_Layer;
var RR_Line_Layer;

var MFL_Station_List = [];
var MFL_Station_Layer = [];

var BSL_Station_List = [];
var BSL_Station_Layer = [];

var NHSL_Station_List = [];
var NHSL_Station_Layer = [];

var RR_Station_List = [];
var RR_Station_Layer = [];

// Storage for rail station icons
var MFL_Station_Icon = new L.Icon({
  iconUrl: 'markers/mfl.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [0, -33]
});

var BSL_Station_Icon = new L.Icon({
  iconUrl: 'markers/bsl.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [0, -33]
});

var NHSL_Station_Icon = new L.Icon({
  iconUrl: 'markers/nhsl.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [0, -33]
});

var RR_Station_Icon = new L.Icon({
  iconUrl: 'markers/rr.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [0, -33]
});

// Storage for rail line styles
var MFLColor = "#007dc3";
var BSLColor = "#ff8f1c";
var NHSLColor = "#781d7e";
var RRColor = "#45647b";

var MFLLStyle = {
  "color": MFLColor,
  "weight": 5,
};

var BSLLStyle = {
  "color": BSLColor,
  "weight": 5,
};
var NHSLLStyle = {
  "color": NHSLColor,
  "weight": 5,
};
var RRLStyle = {
  "color": RRColor,
  "weight": 5,
};

// Storage for trolley and bus styles
var TrolleyColor = "#5d9731";
var BusColor = "#222021";

var TrolleySStyle = {
  radius: 3,
  fillColor: TrolleyColor,
  color: TrolleyColor
};

var BusSStyle = {
  radius: 3,
  fillColor: BusColor,
  color: BusColor
};

var TrolleyRStyle = {
  "color": TrolleyColor,
  "weight": 2,
  "opacity": 0.8
};

var BusRStyle = {
  "color": BusColor,
  "weight": 2,
  "opacity": 1
};

var HighlightStyle = {
  "color": '#ff0000',
  "weight": 3
};
