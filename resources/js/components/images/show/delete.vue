<template>
    <form method="post" @submit.prevent="onSubmit('/images/' + id)">
        <slot></slot>
        <button name="submit" class="btn btn-danger" :disabled="submitted">Delete post</button>

        <p class="text-danger" v-for="error in errors">{{ error }}</p>
    </form>
</template>

<script>
    export default {
        name: 'showdelete',

        props: {
            id: Number,
        },

        data() {
            return {
                submitted: false,
                errors: []
            }
        },

        methods: {
            onSubmit(url) {
                if(confirm("Are you sure you want to delete this image? This cannot be undone.")) {
                    this.submitted = true;
                    this.errors = [];

                    axios.delete(url)
                        .then(this.onSuccess())
                        .catch(error => this.onFail(error))
                }
            },

            onSuccess() {
                window.location.href = '/home';
            },

            onFail() {
                this.submitted = false;
                this.errors = error.response.data;
            }
        }
    }
</script>
