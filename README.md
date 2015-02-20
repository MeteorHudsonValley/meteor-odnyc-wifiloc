# meteor-odnyc-wifilocations
Meteor package containing sample data set from NYC WiFi Hotspot Locations

### Attribution
The data set was obtained from the NYC Open Data portal, under the [NYC Wi-Fi Hotspot Locations page](https://nycopendata.socrata.com/Social-Services/NYC-Wi-Fi-Hotspot-Locations/a9we-mtpn).

### Dataset
Currently acquired as the CSV package from [this link](https://nycopendata.socrata.com/api/views/jd4g-ks2z/rows.csv?accessType=DOWNLOAD)

### Schema
The OpenData NYC dataset contains WiFi location data with the following schema. Note that 8 (of 23) attributes are of type 'meta_data' indicating they provide context for the creation of this record, and are not part of the location data itself. Meta-data attributes are easy to recognize as they start with lowercase letters.


| Name         | Type      | Description | Example data 
| ------------ | --------- | ----------- | ------------ 
| sid          | meta_data | source id   | 1 
| id           | meta_data | id | "geo_a9we-mtpn-1.1" |
| position     | meta_data | -- | null |
| created_at   | meta_data | -- | null |
| created_meta | meta_data | -- | null |
| updated_at   | meta_data | -- | null |
| updated_meta | meta_data | -- | null |
| meta         | meta_data | -- | |
| OBJECTID     | number    | id for location object | "1059" |
| Boro         | text      | borough | "BX" |
| Type         | text      |  Wifi Type | "Limited Free" |
| Provider     | text      | Wifi Provider | "Cablevision" |
| Name         | text      | Location Name | "BRONX PARK E" |
| Location     | text      | Location Address | "BRONX PARK E-BRONX PARK 3/P/N/O BURKE AV" |
| Lat          | number    | Latitude | "40.87304000000000314685166813433170318603515625" |
| Long_        | number    | Longitude | "-73.8712760005000035334887797944247722625732421875" |
| X | number | | "1019850.040660000056959688663482666015625" |
| Y | number | | "257375.90950999999768100678920745849609375" |
| Location_T | text | Location Type | "Outdoor" |
| Remarks | text | About Wifi | "3 free 10 min sessions" |
| City | text | | "Bronx" |
| SSID | text | | "GuestWiFi"|
| SourceID | text | | "" |

