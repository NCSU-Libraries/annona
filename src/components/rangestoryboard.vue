<template>
<div v-bind:id="rangeid" class="rangestoryboard annonaview" v-bind:class="[!settings.fullpage && !isfullscreen ? 'rangestoryboardview' : 'rangefullpage']">
  <span v-if="listtype == 'storyboardlist'" v-bind:key="position" style="width: 100vw">
    <span v-if="rangelist[position]['tag'] == 'iiif-storyboard'">
      <storyboard v-bind:key="compkey" :annotationurl="annotationurl.annotationurl" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:manifesturl="annotationurl.manifesturl" v-bind:styling="stylingstring" v-bind:ws="annotationurl.ws" v-bind:layers="annotationurl.layers"></storyboard>
    </span>
    <span v-else-if="rangelist[position]['tag'] == 'iiif-multistoryboard'">
      <multistoryboard v-bind:key="compkey" :annotationurls="annotationurl.annotationurls" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:manifesturl="annotationurl.manifesturl" v-bind:styling="stylingstring" v-bind:ws="annotationurl.ws" v-bind:layers="annotationurl.layers" v-bind:images="annotationurl.images"></multistoryboard>
    </span>
    <span v-else-if="rangelist[position]['tag'] == 'iiif-annotation'">
      <iiifannotation v-bind:key="compkey" :annotationurl="annotationurl.annotationurl" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:manifesturl="annotationurl.manifesturl" v-bind:styling="stylingstring" ></iiifannotation>
    </span>
  </span>
  <span v-else-if="settings.perpage" style="width: 100vw">
    <multistoryboard v-bind:key="compkey" v-if="ready" :annotationurls="annotationurl.annotationurls" v-bind:styling="stylingstring" :manifesturl="annotationurl.allmanifests" :jsonannotation="annotationurl.alljsons"></multistoryboard>
  </span>
  <span v-else style="width: 100vw">
    <storyboard v-bind:key="compkey" v-if="ready" v-bind:jsonannotation="annotationurl.jsonanno" v-bind:annotationurl="annotationurl.anno" v-bind:manifesturl="annotationurl.manifest" v-bind:styling="stylingstring" v-bind:ws="isws" v-bind:layers="customlayers"></storyboard>
  </span>
  <button v-if="ready" id="previousPageButton" v-on:click="nextItemRange('prev')" class="pageButton toolbarButton" v-bind:class="[{ 'pageinactive' : prevPageInactive}, { 'imageview' : rangelist[position] && rangelist[position]['tag'] == 'iiif-annotation'}, viewingDirection == 'rtl' ? 'floatleft' : 'floatright' ]">
    <span v-html="buttons.rangeprev"></span>
    <span class="toolbartext">Previous page</span>
  </button>
  <button v-if="ready" id="nextPageButton" v-on:click="nextItemRange('next')" class="pageButton toolbarButton" v-bind:class="[{ 'pageinactive' : nextPageInactive},{ 'imageview' : rangelist[position] && rangelist[position]['tag'] == 'iiif-annotation'}, viewingDirection == 'ltr' ? 'floatleft' : 'floatright']">
    <span v-html="buttons.rangenext"></span>
    <span class="toolbartext">Next Page</span>
  </button>
</div>
</template>
<script>
import storyboard from './storyboard';
import iiifannotation from './iiifannotation';
import shared from './shared';
import axios from 'axios';
import multistoryboard from './multistoryboard.vue';

export default {
    components: {
        storyboard,
        multistoryboard,
        iiifannotation
    },
    props: {
      'rangeurl':String,
      'styling': String,
      'ws': String,
      'layers': String
    },
    data: function() {
      return {
        tags: false,
        layerslist: false,
        isws: '',
        range: true,
        toctitle: 'Range Pages',
        buttons: shared.objectToNewObject(shared.buttons),
        settings: {},
        stylingstring: "",
        annotationurl: '',
        rangelist: [],
        position: 0,
        prevPageInactive: true,
        nextPageInactive: false,
        rangeid: '',
        compkey: 0,
        customlayers: '',
        isfullscreen: false,
        manifestcontents: '',
        toc: [],
        viewingDirection: 'ltr',
        rangetitle: '',
        ready: false,
        listtype: '',
        startCanvas: '',
        textoverlay: shared.objectToNewObject(shared.textoverlay),
        booleanitems: shared.objectToNewObject(shared.booleanitems),
        leaflet: false,
        rangecontents: '',
        collection: '',
        collectionkey: 0
      }
    },
    watch: {
      'fullscreen': function(newval) {
        this.buttons.fullscreen = newval ? shared.buttons['fullscreenoff'] : shared.buttons['fullscreen'];
      },
      'position': function() {
        this.checkNextRange();
      }
    },
    created(){
      // get annotation urls in list
      this.rangeid = "rangestoryboard_" + this.$props.rangeurl.split("/").slice(-1)[0];
      this.settings = shared.getsettings(this);
      var isURL = shared.isURL(this.$props.rangeurl, this.settings);
      if (isURL['isURL']){
        axios.get(this.$props.rangeurl).then(response => {
          this.rangecontents = response.data;
          this.manifestOrRange(response.data);
        })
      } else {
        this.rangecontents = isURL['json'];
        this.manifestOrRange(isURL['json']);
      }
      if (this.settings.perpage){
        this.settings.continousboard = true;
      }
    },
    methods: {
      manifestOrRange: function(contents) {
        var listtype = contents['@type'] ? contents['@type'] : contents['type'];
        this.listtype = listtype;
        if (listtype.toLowerCase().indexOf('manifest') > -1){
          this.getManifestData(contents);
        } else if (listtype == 'storyboardlist') {
          for (var rl =0; rl<contents['items'].length; rl++){
            const content = contents['items'][rl];
            var el = document.createElement( 'div' );
            el.innerHTML = content['board'];
            const dict = {'tag': el.children[0].localName}
            const attributes = el.children[0].attributes;
            for (var att=0;att<attributes.length; att++){
              dict[attributes[att].name] = attributes[att].nodeValue;
            }
            if (content['annotation']){
              dict['jsonanno'] = content['annotation'];
              dict['annotationurl'] = '';
            }
            var toclabel = content['title'] ? content['title'] : `Page ${rl + 1}`;
            toclabel = shared.parseMetaFields(toclabel);
            dict['title'] = toclabel;
            this.rangelist.push(dict)
            this.toc.push({ 'position': rl, 'label': toclabel, 'thumbnail': content['thumbnail'], 'description': content['description']});
          }
          this.setDefaults(contents);
        } else if (listtype.toLowerCase().indexOf('collection') > -1) {
          this.collection = this.getCollectionList(contents);
          this.updateCollectionManifest(this.collection['manifests'][0], true);
        } else {
          this.getRangeData(contents);
        }
      },
      getCollectionList: function(contents) {
        var collection = {'label': shared.parseMetaFields(this.getLabel(contents)), 'manifests': [], 'metadata': shared.getHTMLMeta(contents, this.$props.rangeurl, 'Collection', this.settings)['text']}
        var manifestfolder = contents['manifests'] ? contents['manifests'] : contents['members'] ? contents['members'] : contents['items'] ? contents['items'] : contents['collections'];
        var ids = []
        for (var i=0; i<manifestfolder.length; i++){
          var manifest = manifestfolder[i];
          const manifesturl = shared.getId(manifest);
          if (ids.indexOf(manifesturl) == -1){
            var thumbnail = Array.isArray(manifest['thumbnail']) ? manifest['thumbnail'][0] : manifest['thumbnail'];
            thumbnail = thumbnail ? shared.getId(thumbnail) : '';
            var type = shared.getField(manifest, 'type');
            type = type && type.toLowerCase().indexOf('collection') > -1 ? 'collection' : type;
            var items = {'id': manifesturl,
              'thumbnail': thumbnail,
              'label': shared.parseMetaFields(this.getLabel(manifest)),
              'type': type
              }
            ids.push(manifesturl)
            collection['manifests'].push(items)
          }
        }
        return collection;
      },
      updateCollectionManifest: function(manifest, init=false, menu=false){
        var manifestid = shared.getId(manifest);
        var spinner = document.getElementById('spinner');
        if (spinner && manifest['type'] != 'collection') {
          spinner.style.display = 'block';
        }
        axios.get(manifestid).then(response => {
          if (manifest['type'] == 'collection'){
            var collectiondata = this.getCollectionList(response.data)['manifests'];
            manifest['manifests'] = collectiondata;
            if (init){
              manifest = manifest['manifests'][0];
              this.updateCollectionManifest(manifest, init)
            }
            if (menu){
              menu.nodedata['manifests'] = manifest['manifests'];
              menu.nodesdata = collectiondata;
              var menuitem = menu;
              if (menuitem.depth != 1){
                while (menuitem.depth != 1) {
                  menuitem = menuitem.$parent;
                }
              }
              this.collection['manifests'][menuitem.index] = manifest;
            }
            
          } else {
            this.rangelist = [];
            this.toc = [];
            this.position = 0;
            this.rangecontents = response.data;
            this.manifestOrRange(response.data);
            this.compkey = `reload${manifestid}`;
          }
        });
      },
      checkNextRange: function() {
        this.prevPageInactive = false;
        this.nextPageInactive = false;
        if (this.position <= 0){
          this.prevPageInactive = true;
        }
        const onpage = this.settings.perpage && this.settings.perpage != 1 ? this.position + this.settings.perpage : this.position;
        if (onpage >= this.rangelist.length-1){
          this.nextPageInactive = true;
        }
      },
      getManifestData: function(manifest) {
        var otherContent = [];
        if (manifest['sequences'] || manifest['items']){
          const startCanvas = manifest['items'] ? manifest['items']['start'] : manifest['sequences'][0]['startCanvas'];
          this.startCanvas = startCanvas ? shared.getId(startCanvas) : startCanvas;
          var canvases = shared.getAllCanvases(manifest);
          for (var cv=0; cv<canvases.length; cv++){
            var canvas = canvases[cv];
            var annotationfield = shared.getManifestAnnotations(canvas);
            if (annotationfield){
              otherContent.push({'oc': annotationfield, 'canvas': canvas});
            } else {
              otherContent.push({'oc': `https://noannotation/${Math.random()}`, 'canvas': canvas});
            }
          }
        }
        if (otherContent.length > 1){
          this.settings.perpage = this.settings.perpage ? this.settings.perpage : 1;
          this.settings.continousboard = this.settings.continousboard ? this.settings.continousboard : true;
        }
        var manifesturl = this.collection != '' ? shared.getId(manifest) : this.$props.rangeurl;
        for (var an=0; an<otherContent.length; an++){
          var anno = otherContent[an]['oc'];
          if (anno.constructor.name == 'Array') { 
            if (this.settings.listnumber) {
              const listnumb = this.settings.listnumber - 1;
              const list = anno[listnumb] ? anno[listnumb] : "https://nolist.com";
              this.addToLists(list, manifesturl, otherContent[an]['canvas'], anno);
            } else {
              for (var h=0; h<anno.length; h++){
                this.addToLists(anno[h], manifesturl, otherContent[an]['canvas']);
              }
            }
          } else{
            this.addToLists(anno, manifesturl, otherContent[an]['canvas']);
          }  
        }
        this.setDefaults(manifest);
        this.manifestcontents = manifest;
      },
      addToLists: function(anno, manifesturl, canvas, otherContent=false) {
        var thumbnail;
        if(anno.resources || anno.items || anno.body){
          var jsonanno = anno; 
        }
        var annourl = shared.getId(anno);
        if (canvas){
          var canvasid = shared.getId(canvas);
          if (canvasid.constructor.name === 'String' && canvasid.indexOf('#xywh') > -1){
            var xywh = canvasid.split("#xywh=").length > 1 ? canvasid.split("#xywh=").slice(-1)[0] : '';
          } 
          var firstcanvas = canvas.images ? canvas.images[0] : canvas.items ? canvas.items[0].items[0] : undefined;
          if (canvas['thumbnail']){
            const thumbDict = Array.isArray(canvas['thumbnail']) ? canvas['thumbnail'][0] : canvas['thumbnail'];
            thumbnail = shared.getId(thumbDict)
          } else if(firstcanvas) {
            var version = shared.getVersion(this.rangecontents);
            thumbnail = shared.getImages(shared.getCanvasTile(firstcanvas)['canvas_tile'], 'full', '30,', version)['imageurl'];
          }
        }
        const position = this.rangelist.length;
        if (canvasid == this.startCanvas){
            this.position = position;
            this.compkey = position;
        }
        const annolabel = this.getLabel(anno);
        var toclabel = annolabel ? annolabel : canvas && canvas['label'] ? canvas['label'] : `Page ${position + 1}`;
        toclabel = shared.parseMetaFields(toclabel);
        var description = anno['description'] ?  anno['description'] : '';
        this.toc.push({ 'position' :position, 'label' : toclabel, 'thumbnail': thumbnail, 'description': description});
        this.rangelist.push({'canvas': canvasid, 'images': firstcanvas ? canvas : '', 'anno': annourl, 'jsonanno': jsonanno, 'manifest': manifesturl, 'section': xywh, 'title': toclabel, 'otherLists': otherContent});
        if (this.settings.perpage){
          const startpage = parseInt(position/this.settings.perpage)*this.settings.perpage;
          const endpage = startpage + this.settings.perpage;
          for (var sp=startpage; sp<endpage; sp++){
            if (this.rangelist[sp]){
              this.rangelist[sp].annotationurls = this.rangelist.slice(startpage, endpage).map(elem => elem.anno).join(";");
              this.rangelist[sp].alljsons = this.rangelist.slice(startpage, endpage).map(elem => elem.jsonanno);
              this.rangelist[sp].allmanifests = this.rangelist.slice(startpage, endpage).map(elem => elem.manifest).join(";");
            }
          }
        }
      },
      getLabel: function(item) {
        return item['label'] ? item['label'] : item['@label'] ? item['@label'] : '';
      },
      setDefaults: function(data) {
        var viewingDirection = data.viewingDirection;
        if(viewingDirection === 'right-to-left'){
          this.viewingDirection = 'rtl';
          this.buttons.rangeprev = shared.buttons['rangenext'];
          this.buttons.rangenext = shared.buttons['rangeprev'];
        }
        this.annotationurl = this.rangelist[this.position];
        this.rangetitle = shared.parseMetaFields(data.label);
        this.settings.autorun_interval ? '' : this.settings.autorun_interval = 3;
        this.updateFullScreen(this.isfullscreen);
        this.getTitle();
        this.$props.ws ? this.isws = this.$props.ws : '';
        this.customlayers = this.$props.layers ? this.$props.layers : this.annotationurl.layers ? this.annotationurl.layers : '';
        this.annotationurl.section ? this.settings.imagecrop = this.annotationurl.section : '';
        this.getStylingString();
        this.ready = true;
        this.checkNextRange();
      },
      getRangeData: function(rangelist) {
        var annos = rangelist.contentLayer ? rangelist.contentLayer.otherContent: rangelist.items;
        var canvases = rangelist.canvases ? rangelist.canvases : [];
        for (var ca=0; ca<annos.length; ca++){
          var canvas = canvases[ca];
          var anno = annos[ca];
          var manifest = canvas ? canvas['within'] : '';
          manifest = shared.getId(manifest);
          this.addToLists(anno, manifest, canvas);
        }
        this.setDefaults(rangelist);
      },
      nextItemRange: function(prevornext){
        const addition = this.settings.perpage ? this.settings.perpage : 1;
        if (prevornext == 'prev') {
          this.position -= addition;
        } else if (prevornext == 'next') {
          this.position += addition;
        } else {
          if (this.settings.perpage){
            prevornext = parseInt(prevornext/this.settings.perpage)*this.settings.perpage;
          }
          this.position = prevornext;
        }
        this.compkey = this.position;
        this.annotationurl = this.rangelist[this.position];
        this.annotationurl.section ? this.settings.imagecrop = this.annotationurl.section : '';
        this.getTitle();
        this.getStylingString();
      },
      getStylingString: function(){
        this.stylingstring = '';
        for (var key in this.settings){
          this.stylingstring += `${key}:${this.settings[key]};`;
        }
        if (this.annotationurl.styling) {
          this.stylingstring += this.annotationurl.styling;
        }
      },
      getTitle: function() {
        var title = this.rangetitle ? this.rangetitle : '';
        var check = true;
        if ((this.rangelist.length > 1 || this.annotationurl.title.substring(0, 4) != 'Page') && (!this.settings.perpage || this.settings.perpage < 2)) {
          if (this.rangetitle && this.annotationurl.title && this.rangetitle.indexOf(this.annotationurl.title) > -1){
            check = false;
          }
          this.rangetitle && this.annotationurl.title && check ? title += ': ' : '';
          title += this.annotationurl.title && check ? this.annotationurl.title : '';
        }
        this.settings.title = title;
      },
      updateFullScreen: function(fullscreen) {
        this.isfullscreen = fullscreen;
        for (var fs=0; fs<this.$children.length; fs++){
          if (this.$children[fs].$options.name.indexOf('storyboard') > -1){
            this.$children[fs].fullscreen = fullscreen;
          }
        }
      }
    }
}
</script>
