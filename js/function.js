$('#mfl_select').click(function() {
  if ($(this).is(':checked')) {
    MFL_Line_Layer.addTo(map);
  } else {
    map.removeLayer(MFL_Line_Layer);
  }
});

$('#bsl_select').click(function() {
  if ($(this).is(':checked')) {
    BSL_Line_Layer.addTo(map);
  } else {
    map.removeLayer(BSL_Line_Layer);
  }
});

$('#nhsl_select').click(function() {
  if ($(this).is(':checked')) {
    NHSL_Line_Layer.addTo(map);
  } else {
    map.removeLayer(NHSL_Line_Layer);
  }
});

$('#rr_select').click(function() {
  if ($(this).is(':checked')) {
    RR_Line_Layer.addTo(map);
  } else {
    map.removeLayer(RR_Line_Layer);
  }
});
