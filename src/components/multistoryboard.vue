<template>
<div id="multistoryboard" class="annonaview" v-bind:class="[!settings.fullpage && !fullscreen ? 'multistoryboard' : 'multifullpage', settings.toolbarposition ? settings.toolbarposition + '_menu_container' : 'top_menu_container']">
  <toolbar></toolbar>
  <span class="storyboard_containers" v-bind:id="storyboardcontainerid">
    <div v-for="(anno, index) in anno_data" v-bind:key="anno + index" v-bind:style="{'width': widthvar}" style="position: relative; display: inline-block">
      <storyboard v-if="annourls" v-bind:annotationurl="anno" v-bind:jsonannotation="annojson[index]" v-bind:styling="stylingstring + 'index: ' + indexNumber(index)" v-bind:ws="isws" v-bind:layers="customlayers" v-bind:manifesturl="manifests[index]"></storyboard>
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
      'images': String,
      'jsonannotation': Array
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        customlayers: '[]',
        isws: '',
        prev_inactive: true,
        next_inactive: false,
        manifests: [],
        anno_data: [],
        buttons: JSON.parse(JSON.stringify(shared.buttons)),
        settings: {},
        stylingstring: "",
        storyboardcontainerid: "",
        widthvar: "",
        multi: true,
        allimages: [],
        viewers: [],
        fullscreen: false,
        shortcuts: {},
        boardchildren: {},
        leaflet: false,
        boardnumber: 0,
        tagslist: {},
        boardchildrenwithannos: [],
        annourls: '',
        textoverlay: shared.objectToNewObject(shared.textoverlay),
        toolbardisabled: false,
        annojson: []
      }
    },
    watch: {
      'fullscreen': function(newval) {
        this.buttons.fullscreen = newval ? shared.buttons['fullscreenoff'] : shared.buttons['fullscreen'];
      },
      textoverlay: {
        deep: true,
        handler: function(){
          for (var i=0; i<this.boardchildrenwithannos.length; i++){
            var children =this.boardchildrenwithannos[i];
            children.textoverlay = shared.objectToNewObject(this.textoverlay);
          }
        }
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
      window.annonasettings = window.annonasettings ? window.annonasettings : {};
      if(this.$parent.range) {
        this.fullscreen = this.$parent.isfullscreen;
        this.$parent.updateFullScreen(this.fullscreen);
      }
      this.storyboardcontainerid = Math.random().toString(36).substring(2,7);
      this.annourls = this.annotationurls ? this.annotationurls : this.annotationlists;
      var annotations = this.annourls.split(";").map(elem => elem.replace('repwithsemicolon', ';'));
      this.manifests = this.manifesturl ? this.manifesturl.split(";") : [''];
      if (this.manifests.length < annotations.length){
        for (var i=1; i<annotations.length; i++){
          this.manifests.push(this.manifests[0])
        }
      }
      this.anno_data = annotations.filter(function (el) {
        return el != null && el != '';
      });
      this.annojson = this.jsonannotation ? this.jsonannotation : []
      this.isreverse = this.$parent && this.$parent.viewingDirection == 'rtl' ? true : false;
      if (this.isreverse){
        this.boardnumber = "updateme";
        this.anno_data = this.anno_data.reverse();
        this.annojson.reverse();
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
              const settingsfit = vue.settings.fit ? vue.settings.fit : shared.getLongEdge(vue.viewers[v]);
              if (settingsfit == 'horizontal') {
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
      updateData: function() {
        const lastboard = this.isreverse ? 0 : this.boardchildrenwithannos.length-1;
        const firstboard = this.isreverse ? this.boardchildrenwithannos.length-1 : 0;
        var data = this.boardchildrenwithannos[firstboard]._data;
        this.buttons = data.buttons;
        this.prev_inactive = data.prev_inactive;
        this.next_inactive = this.boardchildrenwithannos[lastboard].next_inactive;
      },
      addBoardNumber: function() {
        this.boardchildrenwithannos = this.boardchildren.filter(board => board.annotations.length > 0);
        for (var ba=0; ba<this.boardchildrenwithannos.length; ba++){
          this.boardchildrenwithannos[ba].boardnumber = ba;
        }
      },
      sendMessageSeperate(e) {
        if (e['args'] == 'next' || e['args'] == 'prev'){
          this.boardchildrenwithannos[this.boardnumber].sendMessage(e);
        }
        const addnumb = this.isreverse ? -1 : 1;
        const islast = this.isreverse ? this.boardnumber == 0 : this.boardchildrenwithannos.length-1 == this.boardnumber;
        const isfirst = this.isreverse ? this.boardchildrenwithannos.length-1 == this.boardnumber : this.boardnumber == 0;
        if(this.boardchildrenwithannos.length > 0 && this.boardchildrenwithannos[this.boardnumber].next_inactive && !islast){
          this.boardnumber += addnumb;
        } else if(this.boardchildrenwithannos.length > 0 && this.boardchildrenwithannos[this.boardnumber].prev_inactive && !isfirst){
          this.boardnumber -= addnumb;
        }
      },
      //Sends message to each storyboard viewer and each image viewer
      sendMessage(e) {
        if (this.boardchildrenwithannos.length < 1){
          this.addBoardNumber();
        }
        this.boardnumber == "updateme" ? this.boardnumber = this.boardchildrenwithannos.length - 1 : '';
        const seperateFunctions = ["next"]
        if (e['function'] == 'toggle_fullscreen'){
          this.toggle_fullscreen()
        } else if (this.settings.continousboard && seperateFunctions.indexOf(e['function']) > -1){
          this.sendMessageSeperate(e);
        } else {
          const isshown = this.boardchildren.some(elem => elem.shown == e['args']);
          for (var i=0; i<this.boardchildren.length; i++){
            if (e['function'] == 'clickButton' && !this.boardchildren[i].shortcuts[e["args"]]){
              //pass
              if (isshown){
                this.boardchildren[i].shown = e['args'];
              }
            }
            this.boardchildren[i].sendMessage(e);
          }
        }
        for (var k=0; k<this.viewers.length; k++){
          this.viewers[k].viewport.fitBounds(this.boardchildren[0].viewer.viewport.getConstrainedBounds())
        }
        if (this.boardchildrenwithannos.length > 0){
          this.updateData();
        }
      }
    }
}
</script>
