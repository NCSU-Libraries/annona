<template>
<div id="shortcuts" class="content">
    <p>There are multiple possible keyboard shortcuts for each button. 
    They are separated by an 'or'. 
    On Macs 'alt' is the 'option' key.
    </p>
    <table v-if="!parent.booleanitems.isexcerpt">
    <tr>
    <th>Icon</th>
    <th>Keyboard shortcuts</th>
    </tr>
    <tr v-for="(value, key) in shortcuts" v-bind:id="key + '_tags'" v-bind:key="key" class="keyboard">
    <td>
        <span class="shortcuticon" v-html="value.icon + ' (' + value.label + ')'"></span>
    </td>
    <td><span v-for="(shortcut, index) in value.shortcut" v-bind:key="shortcut"><code>{{shortcut}}</code><span v-if="index != value.shortcut.length - 1"> or </span></span></td>
    </tr>
    </table>
</div>
</template>
<script>

export default {
    props: ['parent'],
    name: 'shortcuts',
    data: function() {
        return {
            shortcuts: []
        }
    },
    created() {
        this.shortcuts = this.parent.$parent.multi ? this.parent.$parent.shortcuts : this.parent.shortcuts;
    }
}
</script>