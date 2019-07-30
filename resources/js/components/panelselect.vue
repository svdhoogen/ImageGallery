<template>
    <ul class="list-inline">
        <slot></slot>
        <li class="list-inline-item" v-for="item in items" :class="{'list-inline-active': item.isActive, 'list-inline-nonactive': !item.isActive}"
            @click="selectPanel(item.id)"><h3>{{ item.name }}</h3></li>
    </ul>
</template>

<script>
    export default {
        name: "panelselect",

        props: {
            eachitem: Array,
        },

        data() {
            return {
                items: [],
            }
        },

        methods: {
            selectPanel(id) {
                this.items.forEach(function(item){
                    item.isActive = false;
                });

                this.items[id].isActive = true;

                Event.$emit('panelshide');
                Event.$emit(this.items[id].eventName);
            }
        },

        mounted() {
            this.items = this.eachitem;
        }
    }
</script>
