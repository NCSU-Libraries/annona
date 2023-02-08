<template>
<div>
    <label for="perpage">Images per page: </label>
    <select v-model="perpage" id="perpage" name="perpage" v-if="arraylist" v-on:change="updatePerPage()">
        <option :key="number" v-for="number in arraylist" :value="number + 1">{{number + 1}}</option>
    </select>
</div>
</template>

<script>
export default {
    props: ['parent'],
    name: 'perpage',
    data: function() {
        return {
            arraylist: false,
            perpage: 1
        }
    },
    created() {
        const max = this.parent.basecompontent.rangelist.length;
        var perpage = this.parent.basecompontent.settings.perpage;
        if (max < this.parent.basecompontent.settings.perpage){
            perpage = max;
        }
        this.perpage = perpage;
        this.arraylist = Array(max).keys();
    },
    methods: {
        updatePerPage: function() {
            window.annonasettings['perpage'] = this.perpage;
            const position = this.parent.basecompontent.position;
            this.parent.basecompontent.settings.perpage = this.perpage;
            this.parent.basecompontent.rangelist = [];
            this.parent.basecompontent.toc = [];
            this.parent.basecompontent.manifestOrRange(this.parent.basecompontent.rangecontents);
            this.parent.basecompontent.ready = false;
            var vue = this;
            this.parent.basecompontent.position = parseInt(position/this.perpage)*this.perpage;
            setTimeout(() => { vue.parent.basecompontent.ready = true;}, 1000);
        }
    }
}
</script>