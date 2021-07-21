<template>
    <div v-bind:id="this.mapid" style="height: 180px"></div>
</template>
<script>
export default {
  name: 'leaflet',
  data: function() {
    return {
        'mapid': '',
        'jsonLayer': '',
        'watcher': '',
        'leafletloaded': false
    }
  },
  props: [
    'position',
    'annotation',
    'parent'
  ],
  watch: {
    'parent.leaflet': function(newval) {
      this.leafletloaded = newval;
    },
    'leafletloaded': function(newval) {
      if(newval == true){
        this.$nextTick(() => {
          this.addGeometry()
        });
      }
    }
  },
  mounted() {
    const parentid = this.parent.seadragonid ? this.parent.seadragonid : this.parent.annotationid;
    this.mapid = `${parentid}-map-${this.position}`
    this.leafletloaded = this.parent.leaflet;
    if(!this.parent.leafletadded){
      this.addLeafletLibrary();
    }
  },
  methods:  {
    addLeafletLibrary: function(){
      var vue = this;
      var head = document.getElementsByTagName('head')[0];
      const leafletsrc = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
      const leafletloaded = Array.from(head.children).some(elem => elem.src && elem.src.indexOf('leaflet'));
      if (!leafletloaded) { 
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        head.append(link);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = leafletsrc;
        if(script.readyState) {  // only required for IE <9
          script.onreadystatechange = function() {
          if ( script.readyState === "loaded" || script.readyState === "complete" ) {
            script.onreadystatechange = null;
            vue.parent.leaflet = true;
            }
          };
        } else {  //Others
          script.onload = function() {
          vue.parent.leaflet = true;
          };
        }
        head.appendChild(script);
      }
    },
    addGeometry: function() {
    const maplayers = this.parent.settings.maplayer && this.parent.settings.mapattribution ? {'layer': this.parent.settings.maplayer, 'attribution': this.parent.settings.mapattribution} : '';
    const mapdiv = document.getElementById(this.mapid);
    if (mapdiv && mapdiv.classList.length == 0){
      var geojsonFeature = {
        "type": "Feature",
        "geometry": this.annotation['geometry']
      };
      var mymap = L.map(this.mapid);
      const maplayer = maplayers ? maplayers['layer'] : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const attribution = maplayers ? maplayers['attribution'] : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      L.tileLayer(maplayer, {
        attribution: attribution,
      }).addTo(mymap);
      const jsonLayer = L.geoJSON(geojsonFeature);
      this.jsonLayer = jsonLayer;
      mymap.addLayer(jsonLayer);
      const bounds = jsonLayer.getBounds();
      mymap.fitBounds(bounds);
      const zoom = mymap.getZoom();
      if (zoom == 0){
        this.watcher = this.$watch('parent.position', function(newValue) {
          if (this.position == newValue){
            var vue = this;
            setTimeout(function(){ 
                jsonLayer.fire('click');
                vue.watcher(); 
            }, 9);
          }
        });
      }
      
      jsonLayer.on('click', function(){
        mymap.fitBounds(jsonLayer.getBounds());
      });
      
      //jsonLayer.bindPopup(this.rendered, {autoClose:false}).openPopup();
      const resizeObserver = new ResizeObserver(() => {
        mymap.invalidateSize();
      });
      resizeObserver.observe(mapdiv);
      
      //jsonLayer.openPopup();
    }
    }
  }
}
</script>