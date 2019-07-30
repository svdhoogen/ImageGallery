<template>
    <a :href="'/images/' + id">
        <img :src="path" class="flex-item p-2 mb-2 border" :alt="title">
    </a>
</template>

<script>
    export default {
        name: 'indeximages',

        props: {
            id: Number,
            path: String,
            title: String,
        }
    }
</script>
