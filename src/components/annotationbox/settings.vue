<template>
<div id="settings" class="content">
    <div v-for="setting in settingfields" v-bind:key="setting" class="setting">
        <div v-if="settings[setting]['type'] == 'boolean'">
        <input class="settings" type="checkbox" v-model="settings[setting]['value']" v-bind:id="setting" v-on:change="updateSettings(setting)"/>
        <label v-bind:for="setting"> {{settings[setting]['label']}}</label>
        <i class="fas fa-info-circle settingsinfo"
            v-on:click="settings[setting]['descshown'] = !settings[setting]['descshown']"
            v-on:mouseover="settings[setting]['descshown'] = true"
            v-on:mouseleave="settings[setting]['descshown'] = false">
            <span class="settingsabout" v-if="settings[setting]['descshown']">{{settings[setting]['description']}}</span>
        </i>
        </div>
        <div v-else-if="settings[setting]['type'] == 'text'">
        <label v-bind:for="setting">{{settings[setting]['label']}}</label>
        <i class="fas fa-info-circle settingsinfo"
            v-on:click="settings[setting]['descshown'] = !settings[setting]['descshown']"
            v-on:mouseover="settings[setting]['descshown'] = true"
            v-on:mouseleave="settings[setting]['descshown'] = false">
            <span class="settingsabout" v-if="settings[setting]['descshown']">{{settings[setting]['description']}}</span>
        </i>
        <input class="settings" v-model="settings[setting]['value']" v-bind:id="setting" v-on:change="updateSettings(setting)"/>
        </div>
        <div v-else-if="settings[setting]['type'] == 'color'">
            <label v-bind:for="setting">{{settings[setting]['label']}}</label>
            <i class="fas fa-info-circle settingsinfo"
            v-on:click="settings[setting]['descshown'] = !settings[setting]['descshown']"
            v-on:mouseover="settings[setting]['descshown'] = true"
            v-on:mouseleave="settings[setting]['descshown'] = false">
            <span class="settingsabout" v-if="settings[setting]['descshown']">{{settings[setting]['description']}}</span>
            </i>
            <input type="color" v-model="settings[setting]['value']" v-bind:id="setting" v-on:change="updateSettings(setting)">
        </div>
        <div v-else-if="settings[setting]['type'] == 'taglist' && Object.keys(settings[setting]['value']).length > 0">
            <h1 style="font-size: 1em;">Change color for tags
            <i class="fas fa-info-circle settingsinfo"
            v-on:click="settings[setting]['descshown'] = !settings[setting]['descshown']"
            v-on:mouseover="settings[setting]['descshown'] = true"
            v-on:mouseleave="settings[setting]['descshown'] = false">
            <span class="settingsabout" v-if="settings[setting]['descshown']">{{settings[setting]['description']}}</span>
            </i></h1>
            <div v-for="value, key in settings[setting]['value']" v-bind:key="key">
                <label v-bind:for="key">{{key}}: </label>
                <input type="color" v-model="settings[setting]['value'][key]" v-bind:id="key" v-on:change="updateSettings(setting)">
            </div>
        </div>
        <div v-else-if="settings[setting]['type'] == 'choice'">
            <label v-bind:for="setting">{{settings[setting]['label']}}</label>
            <i class="fas fa-info-circle settingsinfo"
            v-on:click="settings[setting]['descshown'] = !settings[setting]['descshown']"
            v-on:mouseover="settings[setting]['descshown'] = true"
            v-on:mouseleave="settings[setting]['descshown'] = false">
            <span class="settingsabout" v-if="settings[setting]['descshown']">{{settings[setting]['description']}}</span>
            </i>
            <select v-bind:name="setting" class="settings" v-bind:id="setting" v-model="settings[setting]['value']" v-on:change="updateSettings(setting)">
                <option v-for="settingvalue in settings[setting]['choices']" v-bind:key="settingvalue['value'] ? settingvalue['value'] : settingvalue" v-bind:value="settingvalue['value'] ? settingvalue['value'] : settingvalue">{{settingvalue['label'] ? settingvalue['label'] : settingvalue}} </option>
            </select>
        </div>
    </div>
</div>
</template>
<script>
import constants from '../constants';
export default {
    props: ['parent'],
    data: function() {
        return {
            forceupdate: ['toolbarposition', 'fontsize', 'annoview', 'textposition', 'tagscolor'],
            settings: {
            'overlaynext': {'type': 'boolean', 'value': false, 'label': 'Overlay Next',
                'description': 'When overlays are toggled off, the overlay will appear for the current annotation.',
                'descshown': false
                },
            'matchclick': {'type': 'boolean', 'value': false, 'label': 'Match Click',
                'description': 'When clicking on overlays, on the other boards it will go to the corresponding annotation. By default it goes to the corresponding location on the image, not the corresponding annotation.',
                'descshown': false
                },
            'tts': {'type': 'choice', 'value': 'none', 'choices': [{'label': 'Disabled', 'value': 'none'}, {'label': 'Autodetect', 'value': true}],  'label': 'Text to Speech',
                'description': 'Enabled Text to Speech on the board. You can choose a langague or choose autodetect which will choose the language set in the annotation.',
                'descshown': false
                },
            'fit': {'type': 'choice', 'value': 'vertical', 'choices': ['horizontal', 'fill', 'vertical'] , 'label': 'Image Fit',
                'description': 'When hitting the home button, which edge the image fits to the viewer on. Fill will fill the viewer window.',
                'descshown': false
            },
            'panorzoom': {'type': 'choice', 'value': 'zoom', 'choices': ['pan', 'zoom'] , 'label': 'Pan or Zoom',
                'description': 'When navigating to an annotation zoom to constraints of annotation, or use current zoom to pan to annotation.',
                'descshown': false
            },
            'fontsize': {'type': 'text', 'value': '20', 'label': 'Font size',
                'description': 'Font size of text in annotation box (what you are currently interacting with to change settings).',
                'descshown': false
            },
            'autorun_interval': {'type': 'text', 'value': '3', 'label': 'Autorun Interval',
                'description': 'When using the auto run button (magic wand) the time it takes between going to the next annotation.',
                'descshown': false
            },
            'overlaycolor': {'type': 'color', 'value': '#ADD8E6', 'label': 'Overlay Color',
                'description': 'Change the color of the overlays shown when the overlay layer is toggled.',
                'descshown': false
            },
            'activecolor': {'type': 'color', 'value': '#FFFF00', 'label': 'Active Color',
                'description': 'Change the color that highlights the current annotation selected.',
                'descshown': false
            },
            'toolbarposition':{'type': 'choice', 'value': 'top', 'choices': ['top', 'bottom'] , 'label': 'Toolbar position',
                'description': 'Position of the toolbar',
                'descshown': false
            },
            'textposition': {'type': 'choice', 'value': 'none', 'choices': ['none', 'top', 'bottom', 'left', 'right'] , 'label': 'Info related to image',
                'description': 'Change the position of the annotation box. By default it is in upper right hand corner. This choice will place the annotation to the top, bottom, left, right of the annotated area.',
                'descshown': false
            },
            'annoview': {'type': 'choice', 'value': 'default', 'choices': ['default', 'sidebyside', 'collapse', 'scrollview'],
            'label': 'Sidebar View', 'descshown': false,
            'description': 'Types of sidebar views avaliable outide of the default.'
            },
            'startenddisplay': {'type': 'choice', 'value': 'none', 'choices': ["none", "tags","info","transcription","keyboard", "settings"], 'label': 'Start/End display',
                'description': 'When annotations are not visible set a default annotation view.',
                'descshown': false
            },
            'tagscolor': {'value': {}, 'type': 'taglist',
                'description': 'Your annotations have tags, these tags have a randomly generated color. These colors can be changed with this section.',
                'descshown': false},
            },
            settingfields: []
        }
    },
    created() {
        const choices = Object.keys(constants.languages()).map(elem => JSON.parse(`{"value": "${elem}", "label": "${constants.getLangLabel(elem)}"}`));
        this.settings['tts']['choices'] = this.settings['tts']['choices'].concat(choices);
        if (this.parent.basecompontent.$options.name !== 'multistoryboard'){
            delete this.settings['matchclick']
        }
        for (var i in this.settings){
            if (Object.keys(this.parent.settings).indexOf(i) > -1){
                if (i.indexOf('color') > -1 && i != 'tagscolor' && this.parent.settings[i].indexOf('rgb') == -1 && this.parent.settings[i].indexOf('#') == -1 ){
                    this.parent.settings[i] = this.colorToHex(this.parent.settings[i]);
                }
                this.settings[i]['value'] = this.parent.settings[i];
            }
        }
        const tags = this.parent.$parent.tagslist ? this.parent.$parent.tagslist : this.parent.tagslist;
        if (tags){
            for (var key in tags){
                this.settings['tagscolor']['value'][key] = this.colorToHex(tags[key]['color']);
            }
            if (Object.keys(tags).length > 0){
                this.parent.settings['tagscolor'] = this.settings['tagscolor']['value'];
            }
        }
        this.settingfields = Object.keys(this.settings)
    },
    methods: {
        colorToHex: function(color) {
            const colours = constants.hexDict();
            return colours[color] ? colours[color] : color;
        },
        deleteAnnoOverlay: function(board) {
            const item = document.getElementById(`${board.seadragonid}_annotation`);
            board.viewer.removeOverlay(`${board.seadragonid}_annotation`);
            board.textposition = 'corner';
            document.getElementById(`${board.seadragonid}`).appendChild(item);
            if (board.boardnumber == 0){
                item.style.maxWidth = '';
                item.style.maxHeight = '';
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
                        this.parent.settings['activecolor'] = this.settings['activecolor']['value'];
                        this.$parent.updated['activecolor'] = true;
                    }
                }
                this.$parent.$forceUpdate();
            }
            window.annonasettings = this.parent.settings;
        }
    }
}
</script>