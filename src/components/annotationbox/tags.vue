<template>
<div id="tags" class="content">
    <div v-for="(groupval, groupkey) in parent.groupTagDict" v-bind:key="groupkey" class="tagslist">
    <div class="taggroup tags" v-if="groupkey" v-bind:id="groupkey + '_tags'">
        <input type="checkbox" class="tagscheck" v-on:click="parent.sendMessage({'function': 'checksubgrouptags', 'args': groupkey });" v-model="groupval.checked">
        <div class="countkey">
        {{groupkey}}
        <span v-bind:style="'background: ' + groupval.color" class="tagscount">
            <span v-if="!parent.settings.hide_tagcount">
            {{groupval.count}}
            </span>
        </span>
        </div>
    </div>
    <div v-bind:class="{ 'subtags' : groupkey }" class="tags" v-for="tagdict in groupval.tags" v-bind:id="tagdict.key + '_tags'" v-bind:key="tagdict.key" >
        <input type="checkbox" class="tagscheck" v-on:click="parent.sendMessage({'function': 'hideshowalltags', 'args': tagdict.key });" v-model="tagdict.checked">
        <div class="countkey">
        {{tagdict.label}}
        <span v-bind:style="'background: ' + tagdict.color" class="tagscount">
            <span v-if="!parent.settings.hide_tagcount">
            {{tagdict.count}}
            </span>
        </span>
        </div>
    </div>
    </div>
</div>
</template>
<script>

export default {
    props: ['parent']
}
</script>