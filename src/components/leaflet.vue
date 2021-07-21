<template>
    <div v-bind:id="this.mapid" style="height: 180px"></div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
export default {
  name: 'leaflet',
  data: function() {
    return {
        'mapid': '',
        'parentelem': '',
        'jsonLayer': '',
        'watcher': ''
    }
  },
  props: [
    'position',
    'annotation'
  ],
  mounted() {
    this.parentelem = this.$parent.$parent ? this.$parent.$parent : this.$parent;
    const parentid = this.parentelem.seadragonid ? this.parentelem.seadragonid : this.parentelem.annotationid;
    this.mapid = `${parentid}-map-${this.position}`
    this.$nextTick(() => {
      let DefaultIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow
      });

      L.Marker.prototype.options.icon = DefaultIcon;
      this.addGeometry(); 
    }) 
  },
  methods:  {
    addGeometry: function() {
    const maplayers = this.parentelem.settings.maplayer && this.parentelem.settings.mapattribution ? {'layer': this.parentelem.settings.maplayer, 'attribution': this.parentelem.settings.mapattribution} : '';
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
        this.watcher = this.$watch('parentelem.position', function(newValue) {
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