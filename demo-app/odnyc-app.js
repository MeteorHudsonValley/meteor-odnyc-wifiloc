//===============
// Common Code
//===============

//===============
// Client Side
//===============
if (Meteor.isClient) {

  // Initializations on startup
  // TODO: Add dynamic query elements to screen
  //  and update the session state on event, 
  //  or bind directly to template helper vars
  Meteor.startup(function () {
    Session.set("odnyc.wifiloc.query", 
      {"Location_T": "Library"}
    );
  });

  // Handle to map object
  var _map = {},
      _markers = [];

  // Created function called once (on first creation)
  Template.map.created = function(){

    // Initialize static Map properties (not tied to view)
    L.Icon.Default.imagePath = 'packages/mrt_leaflet-0.6.4/images';
    console.log("[odnyc-app] Map created");
  };

  // Initialize view (div) related map properties
  Template.map.rendered = function(){
 
    // Resize the 'map' div to suit window
    $(window).resize(function() {
      $('#map').css('height', window.innerHeight - 82 - 45);
    });
    $(window).resize(); 
    console.log("[odnyc-app] Map resized");

    // Initialize Map's navigation properties
     _map = L.map('map', {
      scrollWheelZoom : false,
      doubleClickZoom : false,
      boxZoom         : false,
      touchZoom       : false
    });

    // Initialize Map's central focus (latlong and zoom)
    _map.setView([40.752998, -73.977056], 12);
    console.log("[odnyc-app] Map rendered");

    // Add Tile Layer
    var _layer = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
    var _attribution = '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';  
    L.tileLayer(_layer, { attribution: _attribution })
     .addTo(_map);
    console.log("[odnyc-app] Map rendered");

    // Register
  };

  // Dynamically bind markers to locations
  Template.map.helpers({
    locations : function(){
      var query = Session.get("odnyc.wifiloc.query");
      var locs = WifiLocs.find(query);
      console.log("[odnyc-app] Found "+locs.count()+" locations");
      return locs;
    }
  });

  // Initialize view (div) related map properties
  Template.marker.rendered = function(){

    // TODO: Change query to return only these fields
    var myData = {
      "City"  : this.data.City, 
      "Boro"  : this.data.Boro,
      "Lat"   : +this.data.Lat,
      "Long_" : +this.data.Long_,
      "Name"  : this.data.Name,
      "Provider"  : this.data.Provider,
      "SSID"  : this.data.SSID,
      "Remarks" : this.data.Remarks || "",
      "Location_T" : this.data.Location_T
    };

    if(myData.Remarks.trim().length === 0)
      myData.Remarks = "None";
    
    var popup = 
      "<b>"+myData.Name+"</b>" + 
      "<br> <i>Boro, City</i> : "+
        myData.Boro+", "+myData.City +
      "<br> <i>SSID</i> : "+myData.SSID +
      "<br> <i>Type</i> : "+myData.Location_T +
      "<br> <i>Provider</i> : "+myData.Provider +
      "<br> <i>Remarks</i> : "+ myData.Remarks ;

    var marker = L.marker([+this.data.Lat, +this.data.Long_ ])
     .addTo(_map);
     marker._id = this.data._id;
     marker.bindPopup(popup);
     _markers.push(marker);
  };

}

//===============
// Server Side
//===============
if (Meteor.isServer) {

  // Initialize server-side
  Meteor.startup(function () {
  });

}
