// This file stores global variables
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

// Storage for shapefiles
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

// Storage for queries
var railcheck = {};
