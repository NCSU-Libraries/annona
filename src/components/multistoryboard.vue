<template>
<div id="multistoryboard" class="annonaview" v-bind:class="[!settings.fullpage && !fullscreen ? 'multistoryboard' : 'multifullpage', settings.toolbarposition ? settings.toolbarposition + '_menu_container' : 'top_menu_container']">
  <toolbar></toolbar>
  <span class="storyboard_containers">
    <div v-for="(anno, index) in anno_data" v-bind:key="anno" v-bind:style="{'width': widthvar}" style="position: relative; display: inline-block">
      <storyboard v-if="$props.annotationurls" v-bind:annotationurl="anno" v-bind:styling="stylingstring + 'index: ' + indexNumber(index)" v-bind:ws="isws" v-bind:layers="customlayers" v-bind:manifesturl="manifesturl"></storyboard>
    </div>
    <div v-for="image in allimages" v-bind:key="image.id" v-bind:style="{'width': widthvar}" style="position: relative; display: inline-block; height: 600px">
      <div v-bind:id="image.id" class="seadragonbox"></div>
    </div>
  </span>
</div>
</template>
<script>
import storyboard from './storyboard';
import shared from './shared';
import openseadragon from 'openseadragon';
import toolbar from './toolbar';

export default {
    components: {
        storyboard,
        toolbar
    },
    name: 'multistoryboard',
    props: {
      'manifesturl':String,
      'annotationurls': String,
      'annotationlists': String,
      'styling': String,
      'ws': String,
      'layers': String,
      'images': String
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        customlayers: '[]',
        isws: '',
        prev_inactive: true,
        next_inactive: false,
        anno_data: [],
        buttons: JSON.parse(JSON.stringify(shared.buttons)),
        settings: {},
        stylingstring: "",
        widthvar: "",
        multi: true,
        allimages: [],
        viewers: [],
        fullscreen: false,
        shortcuts: {},
        boardchildren: {},
        leaflet: false,
        boardnumber: 0,
        boardchildrenwithannos: []
      }
    },
    mounted(){
      this.createViewers();
      this.boardchildren = this.$children.filter(child => child.$options.name == 'storyboard');
      if (this.$parent.range){
        for (var ch=0; ch<this.boardchildren.length; ch++){
          this.boardchildren[ch].basecompontent = this.$parent;
        }
      }
    },
    created(){
      // get annotation urls
      if(this.$parent.range) {
        this.fullscreen = this.$parent.isfullscreen;
        this.$parent.updateFullScreen(this.fullscreen);
      }
      this.$props.annotationurls = this.$props.annotationurls ? this.$props.annotationurls : this.$props.annotationlists;
      var annotations = this.$props.annotationurls.split(";");
      this.anno_data = annotations.filter(function (el) {
        return el != null && el != '';
      });
      this.isreverse = this.$parent && this.$parent.viewingDirection == 'rtl' ? true : false;
      if (this.isreverse){
        this.anno_data = this.anno_data.reverse();
      }
      // Get settings and create styling string
      this.settings = shared.getsettings(this);
      this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
      this.$props.ws ? this.ws = this.$props.ws : '';
      this.$props.layers ? this.customlayers = this.$props.layers : '';
      for (var key in this.settings){
        if (key != 'fullpage'){
          this.stylingstring += `${key}:${this.settings[key]};`
        }
      }
      // Get custom images
      if (this.$props.images){
        var images = this.$props.images.split(";").filter(function (el) {
          return el != null && el != '';
        });
        for (var img =0; img<images.length; img++){
          this.allimages.push({'id': images[img].split("/").slice(-2)[0], 'tile': images[img]})
        }
      }
      // get width calculated by number of annotations and images
      this.widthvar = `${parseFloat((100/(this.anno_data.length + this.allimages.length)))}%`;
    },
    methods: {
      // move annotations and image viewers based on bounds
      moveArea (bounds, ignore) {
        if (!this.settings.continousboard) {
          for (var i=0; i<this.boardchildren.length; i++){
            var viewer =this.boardchildren[i].viewer;
            if (!this.settings.matchclick) {
              var conversion = viewer.world.getItemAt(0).imageToViewportRectangle(bounds.x, bounds.y, bounds.width, bounds.height);
              viewer.viewport.fitBoundsWithConstraints(conversion).ensureVisible();
            }
          }
        }
        for (var j=0; j<this.viewers.length; j++){
          if (j != ignore){
            var imageviewer =this.viewers[j];
            var imageconversion = viewer.world.getItemAt(0).imageToViewportRectangle(bounds.x, bounds.y, bounds.width, bounds.height);
            imageviewer.viewport.fitBoundsWithConstraints(imageconversion).ensureVisible();
          }
        }
      },
      indexNumber:function(index){
        return this.isreverse ? this.anno_data.length-index-1 : index
      },
      // set fullscreen. See vue-fullscreen for more info
      fullscreenChange (fullscreen) {
        this.fullscreen = fullscreen;
        if(this.$parent.range) {
          this.$parent.updateFullScreen(fullscreen);
        }
      },
      toggle_fullscreen (){
        var element = this.$parent.range ? this.$parent.$el : this.$el;
        this.$fullscreen.toggle(element, {
          wrap: false,
          callback: this.fullscreenChange
        });
      },
      // Create OpenSeadragon viewers for custom images
      createViewers: function(){
        var fit = this.settings.fit == 'fill' ? true : false;
        for(var g=0; g<this.allimages.length; g++){
          var image = this.allimages[g];
          var tiles = shared.getTileFormat(image.tile);
          var osdsettings = {
                id: `${image.id}`,
                type: "image",
                nextButton: 'next',
                previousButton: 'previous',
                homeFillsViewer: fit,
                tileSources: `${tiles}`,
                showNavigator:  false,
                showNavigationControl: false,
                constrainDuringPan: true,
                visibilityRatio: 1
          };
          var viewer = openseadragon(osdsettings);
          this.viewers.push(viewer);
          var vue = this;
          viewer.addHandler('open', function(){
            // Set view fit
            for (var v=0; v<vue.viewers.length; v++){
              if (vue.settings.fit == 'horizontal') {
                vue.viewers[v].viewport.fitHorizontally();
              } else if(!fit) {
                vue.viewers[v].viewport.fitVertically();
              }
            }
          });
          var elements = this.allimages.map(element => element.id);
          //listeners for when viewer clicked, scrolled or dragged
          viewer.addHandler('canvas-click', function(event){
            var id = event.eventSource.id;
            var ignore = elements.indexOf(id);
            var bounds = event.eventSource.world.getItemAt(0).viewportToImageRectangle(event.eventSource.viewport.getConstrainedBounds());
            vue.moveArea(bounds, ignore);
          });
          viewer.addHandler('canvas-scroll', function(event){
            var id = event.eventSource.id;
            var ignore = elements.indexOf(id);
            var bounds = event.eventSource.world.getItemAt(0).viewportToImageRectangle(event.eventSource.viewport.getConstrainedBounds());
            vue.moveArea(bounds, ignore);
          });
          viewer.addHandler('canvas-drag', function(event){
            var id = event.eventSource.id;
            var ignore = elements.indexOf(id);
            var bounds = event.eventSource.world.getItemAt(0).viewportToImageRectangle(event.eventSource.viewport.getConstrainedBounds());
            vue.moveArea(bounds, ignore);
          });
        }
      },
      autoRunImages: function() {
        for (var k=0; k<this.viewers.length; k++){
          this.viewers[k].viewport.fitBounds(this.boardchildren[0].viewer.viewport.getConstrainedBounds())
        }
        this.updateData();
      },
      sendMessageSeperate(e) {
        const boardslength = this.boardchildrenwithannos.length-1;
        if (e['args'] == 'next' || e['args'] == 'prev'){
          this.boardchildrenwithannos[this.boardnumber].sendMessage(e);
          if(boardslength >= 0 && this.boardchildrenwithannos[this.boardnumber].next_inactive && boardslength != this.boardnumber){
            this.boardnumber += 1
          } else if(boardslength >= 0 && this.boardchildrenwithannos[this.boardnumber].prev_inactive && 0 != this.boardnumber){
            this.boardnumber -= 1
          }
        } else if(e['function']=='autoRun'){
          const boardcheck = this.boardchildrenwithannos[this.boardnumber].annotations.length == this.boardchildrenwithannos[this.boardnumber].position
          if(this.boardnumber == boardslength && boardcheck){
            this.boardchildrenwithannos[this.boardnumber].sendMessage(e);
          } else if (boardcheck) {
            this.boardnumber += 1;
          }
          this.boardchildrenwithannos[this.boardnumber].sendMessage(e);
        }
      },
      updateData: function(){
        if (this.boardchildrenwithannos.length > 0){
          var data;
          if (this.settings.continousboard){
            data = this.boardchildrenwithannos[this.boardnumber]._data;
            const lastboard = this.boardchildrenwithannos[this.boardchildrenwithannos.length-1];
            this.buttons = data.buttons;
            this.prev_inactive = this.boardchildren[0].position == -1 && this.boardnumber == 0;
            this.next_inactive = lastboard.position == lastboard.annotations.length && this.boardnumber == this.boardchildrenwithannos.length - 1;
          } else{
            data = this.boardchildrenwithannos[0]._data;
            this.buttons = data.buttons;
            this.prev_inactive = data.prev_inactive;
            this.next_inactive = data.next_inactive;
          }
        }
      },
      //Sends message to each storyboard viewer and each image viewer
      sendMessage(e) {
        console.log(e)
        this.boardchildrenwithannos = this.boardchildrenwithannos.length > 0 ? this.boardchildrenwithannos : this.boardchildren.filter(board => board.annotations.length > 0);
        const seperateFunctions = ["next", "autoRun"]
        if (this.settings.continousboard && seperateFunctions.indexOf(e['function']) > -1){
          this.sendMessageSeperate(e);
        } else {
          for (var i=0; i<this.boardchildren.length; i++){
            this.boardchildren[i].sendMessage(e);
          }
        }
        for (var k=0; k<this.viewers.length; k++){
          this.viewers[k].viewport.fitBounds(this.boardchildren[0].viewer.viewport.getConstrainedBounds())
        }
        this.updateData();
      }
    }
}
</script>
