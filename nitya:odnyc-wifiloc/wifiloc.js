// Declare Collections
WifiLocs = new Meteor.Collection('WifiLocs');

// Customized debug
Debug = Debug || {};
Debug.odnyc = function(msg, data){
	console.log("[odnyc-wifiloc] "+msg, data || "" );
};

// Server code
if (Meteor.isServer){

	// All startup initialization here
	Meteor.startup(function(){
		if (WifiLocs.find().count()===0)
			loadAsset("assets/data.json")
	});

	// Load initial WifiLoc data from specified asset
	var loadAsset = function(file){
		var asset = Assets.getText(file);
		if (asset){
			var dataset= JSON.parse(asset);
			try { populateData(dataset); }
			catch (err) {
				Debug.odnyc("loadAsset Error: "+err);
			}
		}
	};

	// Extract metadata into usable form 
	// For now interested only in column name, data type
	// so ignoring all 'meta_data' attributes
	var getMetadata = function(meta){
		if (!meta || !meta.view || !meta.view.columns) 
			throw("Meta missing view:columns property.");

		var metadata = [];
		_.each(meta.view.columns, function(item, index){			
			metadata.push([
				item.name, item.dataTypeName
			]);
		});
		return metadata;
	};

	// Insert data given metadata and data objects
	var populateData = function(dataset){
		if (!dataset) throw("Empty dataset (Null JSON object)");
		if (!dataset.meta) throw("Dataset missing meta property.");
		if (!dataset.data) throw("Dataset missing data property.");

		var meta = getMetadata(dataset.meta);
		var data = dataset.data, locdata=null;
		_.each(data, function(item, index){
			locdata = { _id: item[1] };
			_.each(item, function(locitem, i){
				locdata[meta[i][0]] = locitem;
			})

			WifiLocs.insert(locdata);
			//Debug.odnyc("Inserted record:",locdata);
		});
		Debug.odnyc("Inserted "+ data.length+" WifiLocs records", null);
	};

}

// Allow client only reads on the data
if (Meteor.isClient){	
	WifiLocs.allow({
		insert: function() {
			return false;
		},
		update: function() {
			return false;
		},
		remove: function() {
			return false;
		}
	});
}










/*
Data URL:
https://data.cityofnewyork.us/Social-Services/NYC-Wi-Fi-Hotspot-Locations/a9we-mtpn

JSON Data:
	The JSON file contains a single object with 2 high level elements
	  - meta = containing meta data (columns) for collection
	  - data = containing values (rows) for that meta data

Meta Data:
	Generally, for dynamic API usage, grab "meta.view" then parse to extract 
	information about the collection itself
		"id" 				: "jd4g-ks2z",
		"name" 				: "NYC_Free_Public_WiFi_12052014",
		"averageRating" 	: 0,
      	"createdAt" 		: 1417816781,
      	"displayType" 		: "geoRows",
      	"downloadCount" 	: 47,
      	"indexUpdatedAt" 	: 1417816788,
      	"newBackend" 		: false,
      	"numberOfComments" 	: 0,
      	"oid" 				: 9547484,
      	"publicationAppendEnabled" : false,
      	"publicationDate" 	: 1417816782,
      	"publicationGroup" 	: 1716731,
      	"publicationStage" 	: "published",
      	"tableId" 			: 1940909,
      	"totalTimesRated" 	: 0,
      	"viewCount" 		: 2,
      	"viewLastModified" 	: 1417816782,
      	"viewType" 			: "tabular",
      	"columns" 			: []  --> this is an array of elements describing each columnn

    Each meta.view.column[] object has this format
    	"id" 			: -1,
        "name" 			: "meta",
        "dataTypeName" 	: "meta_data",
        "fieldName" 	: ":meta",
        "position" 		: 0,
        "renderTypeName": "meta_data",,
        "tableColumnId" : 21950430,
        "format" 		: { }
        "cachedContents": { }

        where cachedContents effectively gives a snapshot of the kind of values that
        exist for that column. 
        e.g., for a column object with dataTypeName="number" you can have 
	        	"non_null" 	: 1050,
	          	"smallest" 	: "16",
	          	"sum" 		: "1092681",
	          	"null" 		: 0,
	          	"average" 	: "1040.648571428571",
	          	"largest" 	: "1827",
	          	"top" 		: [ {"count" : 20, "item" : "1775"} ...  ]
	    which effectively gives you an idea of range (smallest, largest), average and sum
	      and also, in top, gives you the distribution (count) for each discrete value (item)

Data:
In our case, we have a static JSON file so we have pre-extracted 
metadata and focus only on data extraction. The data has this format
where each field is commented with its name/dataTypeName values
[ 

	1, 						// sid
	"geo_a9we-mtpn-1.1", 	// id
	null, 					// position
	null, 					// created_at
	null,					// created_meta
	null, 					// updated_at
	null, 					// updated_meta
	null, 					// meta

	"1059",	// id, 
	"BX", 	//
	"Limited Free", 
	"Cablevision", 
	"BRONX PARK E", 
	"BRONX PARK E-BRONX PARK 3/P/N/O BURKE AV", 
	"40.87304000000000314685166813433170318603515625", 
	"-73.8712760005000035334887797944247722625732421875", 
	"1019850.040660000056959688663482666015625", 
	"257375.90950999999768100678920745849609375", 
	"Outdoor", 
	"3 free 10 min sessions", 
	"Bronx", 
	"GuestWiFi", 
	"" 
]
Each data item has the following format:

1. OBJECTID  	// 1060
2. Boro			// BX
3. Type			// Limited Free
4. Provider		// Cablevision
5. Name			// GUN HILL PARK
6. Location 	// Gun Hill Playground/Park Cruger Av 1/P/S/O Magenta St
7. Lat,			// 40.874549999599999
8. Long_,		// -73.865540000500005
9. X,			// 1021435.548979999963194
10.Y,			// 257928.444495000003371
11.Location_T,	// Outdoor
12.Remarks,		// 3 free 10 min sessions
13.City,		// Bronx
14.SSID,		// GuestWiFi
15.SourceID		//
*/