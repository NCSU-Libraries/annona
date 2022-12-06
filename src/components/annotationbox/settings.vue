<template>
<div id="settings" class="content">
    <div v-for="setting in settingfields" v-bind:key="setting">
        <span v-if="settings[setting]['type'] == 'boolean'">
        <input class="settings" type="checkbox" v-model="settings[setting]['value']" v-bind:id="setting" v-on:change="updateSettings(setting)"/>
        <label v-bind:for="setting"> {{settings[setting]['label']}}</label>
        </span>
        <span v-else-if="settings[setting]['type'] == 'text'">
        <label v-bind:for="setting"> {{settings[setting]['label']}}: </label>
        <input class="settings" v-model="settings[setting]['value']" v-bind:id="setting" v-on:change="updateSettings(setting)"/>
        </span>
        <span v-else-if="settings[setting]['type'] == 'color'">
            <label v-bind:for="setting">{{settings[setting]['label']}}: </label>
            <input type="color" v-model="settings[setting]['value']" v-bind:id="setting" v-on:change="updateSettings(setting)">
        </span>
        <span v-else-if="settings[setting]['type'] == 'taglist'">
            <h1 style="font-size: 1em;">Change color for tags</h1>
            <div v-for="value, key in settings[setting]['value']" v-bind:key="key">
                <label v-bind:for="key">{{key}}: </label>
                <input type="color" v-model="settings[setting]['value'][key]" v-bind:id="key" v-on:change="updateSettings(setting)">
            </div>
        </span>
        <span v-else-if="settings[setting]['type'] == 'choice'">
            <label v-bind:for="setting">{{settings[setting]['label']}}: </label>
            <select v-bind:name="setting" class="settings" v-bind:id="setting" v-model="settings[setting]['value']" v-on:change="updateSettings(setting)">
                <option v-for="settingvalue in settings[setting]['choices']" v-bind:key="settingvalue['value'] ? settingvalue['value'] : settingvalue" v-bind:value="settingvalue['value'] ? settingvalue['value'] : settingvalue">{{settingvalue['label'] ? settingvalue['label'] : settingvalue}} </option>
            </select>
        </span>
    </div>
</div>
</template>
<script>
import {by639_1} from 'iso-language-codes';
export default {
    props: ['parent'],
    data: function() {
        return {
            forceupdate: ['toolbarposition', 'fontsize', 'annoview', 'textposition', 'tagscolor'],
            settings: {
            'overlaynext': {'type': 'boolean', 'value': false, 'label': 'Overlay Next'},
            'matchclick': {'type': 'boolean', 'value': false, 'label': 'Match Click'},
            'tts': {'type': 'choice', 'value': 'none', 'choices': [{'label': 'Disabled', 'value': 'none'}],  'label': 'Text to Speech'},
            'fit': {'type': 'choice', 'value': 'vertical', 'choices': ['horizontal', 'fill', 'vertical'] , 'label': 'Image Fit'},
            'panorzoom': {'type': 'choice', 'value': 'zoom', 'choices': ['pan', 'zoom'] , 'label': 'Pan or Zoom'},
            'fontsize': {'type': 'text', 'value': '', 'label': 'Font size'},
            'autorun_interval': {'type': 'text', 'value': '3', 'label': 'Autorun Interval'},
            'overlaycolor': {'type': 'color', 'value': '#ADD8E6', 'label': 'Overlay Color'},
            'activecolor': {'type': 'color', 'value': '#FFFF00', 'label': 'Active Color'},
            'textposition': {'type': 'choice', 'value': 'none', 'choices': ['none', 'top', 'bottom', 'left', 'right'] , 'label': 'Box position'},
            'toolbarposition':{'type': 'choice', 'value': 'top', 'choices': ['top', 'bottom'] , 'label': 'Toolbar position'},
            'annoview': {'type': 'choice', 'value': 'default', 'choices': ['default', 'sidebyside', 'collapse', 'scrollview'], 'label': 'Annotation View'},
            'startenddisplay': {'type': 'choice', 'value': 'none', 'choices': ["none", "tags","info","transcription","keyboard", "settings"], 'label': 'start end display'},
            'tagscolor': {'value': {}, 'type': 'taglist'},
            },
            settingfields: []
        }
    },
    created() {
        const choices = Object.keys(by639_1).map(elem => JSON.parse(`{"value": "${elem}", "label": "${by639_1[elem]['nativeName']}"}`));
        this.settings['tts']['choices'] = this.settings['tts']['choices'].concat(choices);
        if (this.parent.basecompontent.$options.name !== 'multistoryboard'){
            delete this.settings['matchclick']
        }
        for (var i in this.settings){
            if (Object.keys(this.parent.settings).indexOf(i) > -1){
                this.settings[i]['value'] = this.parent.settings[i];
            }
        }
        const tags = this.parent.$parent.tagslist ? this.parent.$parent.tagslist : this.parent.tagslist;
        if (tags){
            for (var key in tags){
                if (Object.keys(this.settings['tagscolor']['value']).indexOf(key) == -1) {
                    this.settings['tagscolor']['value'][key] = tags[key]['color'];
                }
            }
            if (Object.keys(tags).length > 0){
                this.parent.settings['tagscolor'] = this.settings['tagscolor']['value'];
            }
        }
        this.settingfields = Object.keys(this.settings)
    },
    methods: {
        deleteAnnoOverlay: function(board) {
            const item = document.getElementById(`${board.seadragonid}_annotation`);
            board.viewer.removeOverlay(`${board.seadragonid}_annotation`);
            board.textposition = 'corner';
            document.getElementById(`${board.seadragonid}`).appendChild(item);
            if (board.boardnumber == 0){
                item.style.display = '';
            }
        },
        updateSettings: function(field) {
            const board = this.parent.basecompontent && this.parent.basecompontent ? this.parent.basecompontent : this.parent;
            var deletetp = false;
            if (this.settings[field]['value'] == 'none' || this.settings[field]['value'] == 'default'){
                delete this.parent.settings[field];
                if (field == 'textposition') {
                    deletetp = true;
                }
            } else {
                this.parent.settings[field] = this.settings[field]['value'];
            }
            board.settings = this.parent.settings;
            var boardchildren = false;
            if (this.parent.basecompontent){
                this.parent.basecompontent.settings = this.parent.settings;
                if (this.parent.$parent.boardchildren){
                    boardchildren = this.parent.$parent.boardchildren;
                    if (deletetp) {
                        this.deleteAnnoOverlay(this.parent.$parent.boardchildren[0])
                    }
                    for (var bc=1; bc<boardchildren.length; bc++){
                        this.parent.$parent.boardchildren[bc].settings = this.parent.settings;
                        if (deletetp){
                            this.deleteAnnoOverlay(this.parent.$parent.boardchildren[bc])
                        }
                    }
                } else if(deletetp){
                    this.deleteAnnoOverlay(this.parent)
                }
            }
            if (this.settings[field]['type'] == 'color' || this.forceupdate.indexOf(field) > -1) {
                board.$forceUpdate();
                if (boardchildren) {
                    for (var j=0; j<boardchildren.length; j++){
                        boardchildren[j].$forceUpdate();
                    }
                }
                if (Object.keys(this.$parent.updated).indexOf(field) > -1){
                    this.$parent.updated[field] = true;
                    if (field == 'overlaycolor'){
                        this.$parent.updated['tagscolor'] = true;
                    }
                }
                this.$parent.$forceUpdate();
            }
            window.annonasettings = this.parent.settings;
        }
    }
}
</script>