<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Posted by: {{ name }}</h5>
            <p class="card-text">{{ body }}</p>
            <p class="card-text text-muted">posted on: {{ date }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment",

        props: {
            name: String,
            body: String,
            date: String,
        }
    }
</script>
