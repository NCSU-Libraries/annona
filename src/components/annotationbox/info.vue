<template>
<div id="information" style="height: auto;" class="info content">
    <div class="imagetitle">
    <h1 v-html="title"></h1>
    </div>
    <span v-if="!parent.booleanitems.isexcerpt">
    <button class="infolink buttonlink" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'additionalinfoshown'});" v-if="parent.settings.additionalinfo">{{parent.settings.additionalinfotitle}}</button>
    <div v-if="parent.booleanitems.additionalinfoshown" v-html="parent.settings.additionalinfo" class="imageinfo"></div>
    <button class="infolink buttonlink" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'collectioninfoshown'});" v-if="parent.basecompontent.range && parent.basecompontent.collection && parent.basecompontent.collection['manifests'].length > 1">
        Collection: {{parent.basecompontent.collection.label}}
    </button>
    <div class="collectioninfo" v-if="parent.booleanitems.collectioninfoshown">
        <div v-if="parent.basecompontent.collection.metadata" v-html="parent.basecompontent.collection.metadata"></div>
        <collections
        :nodes="parent.basecompontent.collection['manifests']"
        :parents="parent.basecompontent"
        :depth="0"
      ></collections>
    </div>
    <button class="infolink buttonlink" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'tocshown'});" v-if="parent.basecompontent.range && parent.basecompontent.toc.length > 1">{{parent.basecompontent.toctitle}}</button>
    <div v-if="parent.booleanitems.tocshown" class="tocinfo">
        <div v-for="(toc, index) in parent.basecompontent.toc" :key="index" v-bind:id="'data_' + toc.position">
        <div class="title">
            <button class="buttonlink" v-on:click="parent.basecompontent.nextItemRange(toc.position);">
            <img v-bind:src="toc.thumbnail" v-if="toc.thumbnail" style="max-width: 30px;">{{index+1}}. {{toc.label}}
            </button>
        </div>
        <div class="additionaltext" v-html="toc.description" v-if="toc.description"></div>
        </div>
    </div>

    <button class="infolink buttonlink annoinfolink" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'annoinfoshown'});" v-if="annotations.length > 0">Annotation information</button>
    <div v-if="parent.booleanitems.annoinfoshown" class="annoinfo">
        <span v-for="(annotationinfo, index) in annotations" v-bind:key="index + '_' + annotationinfo.annodata.position">
        <h2 v-if="annotationinfo.text && annotations.length > 1" class="boardnumber">Board {{index+1}}</h2>
        <span v-html="annotationinfo.text"></span>
        <span v-if="index == annotations.length-1"><b>Number of Annotations:</b> {{annotationinfo.annodata.length}}</span>
        <div class="annotationslist">
            <div v-for="annoinfo in annotationinfo.annodata" v-bind:key="annoinfo.position" v-bind:id="'data_' + index + '_' + annoinfo.position">
                <div class="title"><button class="buttonlink" v-on:click="annotationinfo.parent.sendMessage({'function': 'next', 'args': annoinfo.position});">{{annoinfo.title}}</button></div>
                <div class="additionaltext" v-html="annoinfo.additionaltext"></div>
            </div>
        </div>
        </span>
    </div>

    <button class="infolink buttonlink imageinfolink" v-if="imageinfo.length > 0" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'imageinfoshown'});">{{parent.imageinfo.label}}</button>
    <div v-if="parent.booleanitems.imageinfoshown" v-for="(info, index) in imageinfo" v-bind:key="index">
        <h2 v-if="imageinfo.length > 1" class="boardnumber">Board {{index+1}}</h2>
        <div v-html="info.text" class="imageinfo"></div>
    </div>
    </span>
</div>
</template>
<script>
import collections from './collections.vue'

export default {
    props: ['parent'],
    components: {collections},
    data: function() {
        return {
            title: [],
            annotations: [],
            imageinfo: ''
        }
    },
    created() {
        this.title = [this.parent.imagetitle];
        var annoinfo = this.parent.annoinfo;
        if (annoinfo.text){
            annoinfo['parent'] = this.parent;
            this.annotations = [annoinfo];
        }
        this.imageinfo = [this.parent.imageinfo];
        if (this.parent.$parent.multi) {
            if (this.parent.basecompontent.range) {
                this.title = [this.parent.settings.title]
                const start = this.parent.basecompontent.position;
                const end = this.parent.basecompontent.position+this.parent.basecompontent.settings.perpage;
                if (start != end && this.parent.settings.perpage > 1){
                    this.title = this.title.concat(this.parent.basecompontent.toc.slice(start,end).map(elem => elem.label));
                }
            } else {
                this.title = []
            }
            var boardchildren = this.parent.$parent.boardchildren;
            this.imageinfo = []
            this.annotations = []
            for (var bct=0; bct<boardchildren.length; bct++){
                if (!this.parent.basecompontent.range){
                    var title = boardchildren[bct].imagetitle;
                    this.title.push(title)
                }
                const links = this.imageinfo.map(elem => elem.link);
                if (links.indexOf(boardchildren[bct].imageinfo.link) == -1){
                    this.imageinfo.push(boardchildren[bct].imageinfo)
                }
                if (boardchildren[bct].annoinfo) {
                    var boardinfo = boardchildren[bct].annoinfo;
                    if (boardinfo.text){
                        boardinfo['parent'] = boardchildren[bct];
                        this.annotations.push(boardinfo)
                    }
                }
            }
            if(this.parent.$parent.isreverse) {
                this.imageinfo = this.imageinfo.reverse()
                this.annotations = this.annotations.reverse()
            }
        }
        this.title = this.title.join("<br>")
    }
}
</script>