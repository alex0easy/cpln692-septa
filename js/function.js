var railselection = function(){
  railcheck = {
    MFL:$('#mfl_select').prop('checked'),
    BSL:$('#bsl_select').prop('checked'),
    NHSL:$('#nhsl_select').prop('checked'),
    RR:$('#rr_select').prop('checked')
  };

  if (railcheck.MFL== true){
    L.geoJSON(MFL_Station).addTo(map);
  };

};
