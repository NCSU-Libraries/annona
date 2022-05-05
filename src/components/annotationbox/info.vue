<template>
<div id="information" style="height: auto;" class="info content">
    <div class="imagetitle">
    <h1>{{parent.imagetitle}}</h1>
    </div>
    <span v-if="!parent.booleanitems.isexcerpt">
    <button class="infolink buttonlink" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'additionalinfoshown'});" v-if="parent.settings.additionalinfo">{{parent.settings.additionalinfotitle}}</button>
    <div v-if="parent.booleanitems.additionalinfoshown" v-html="parent.settings.additionalinfo" class="imageinfo"></div>
    <button class="infolink buttonlink" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'collectioninfoshown'});" v-if="parent.basecompontent.range && parent.basecompontent.collection.length > 1">
        Collection: {{parent.basecompontent.collection.label}}
    </button>
    <div class="collectioninfo" v-if="parent.booleanitems.collectioninfoshown">
        <div v-if="parent.basecompontent.collection.metadata" v-html="parent.basecompontent.collection.metadata"></div>
        <div v-for="(collect, index) in parent.basecompontent.collection['manifests']" :key="index" v-bind:id="'data_' + index">
        <div class="title">
            <button class="buttonlink" v-on:click="parent.basecompontent.updateCollectionManifest(index);">
            <img v-bind:src="collect.thumbnail" v-if="collect.thumbnail" style="max-width: 30px;">{{index+1}}. {{collect.label}}
            </button>
        </div>
        <div class="additionaltext" v-html="collect.description" v-if="collect.description"></div>
        </div>
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

    <button class="infolink buttonlink annoinfolink" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'annoinfoshown'});" v-if="parent.annoinfo.text">Annotation information</button>
    <div v-if="parent.booleanitems.annoinfoshown" class="annoinfo">
        <span v-html="parent.annoinfo.text"></span>
        <div class="annotationslist">
        <div v-for="annoinfo in parent.annoinfo.annodata" v-bind:key="annoinfo.position" v-bind:id="'data_' + annoinfo.position">
            <div class="title"><button class="buttonlink" v-on:click="parent.sendMessage({'function': 'next', 'args': annoinfo.position});">{{annoinfo.title}}</button></div>
            <div class="additionaltext" v-html="annoinfo.additionaltext"></div>
        </div>
        </div>
    </div>

    <button class="infolink buttonlink imageinfolink" v-if="parent.imageinfo.text" v-on:click="parent.sendMessage({'function':'switchShown', 'args': 'imageinfoshown'});">{{parent.imageinfo.label}}</button>
    <div v-if="parent.booleanitems.imageinfoshown" v-html="parent.imageinfo.text" class="imageinfo"></div>
    </span>
</div>
</template>
<script>

export default {
    props: ['parent']
}
</script>