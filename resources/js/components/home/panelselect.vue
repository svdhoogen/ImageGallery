<template>
    <ul class="list-inline">
        <li class="list-inline-item" v-for="item in items" :class="{'list-inline-active': item.isActive, 'list-inline-nonactive': !item.isActive}"
            @click="selectPanel(item.id)">{{ item.name }}</li>
    </ul>
</template>

<script>
    export default {
        name: "homepanelselect",

        data() {
            return {
                items: [
                    { name: 'My images', isActive: true, eventName: 'panelimages', id: 0},
                    { name: 'My comments', isActive: false, eventName: 'panelcomments', id: 1},
                ]
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
        }
    }
</script>
