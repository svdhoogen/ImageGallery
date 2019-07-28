<template>
    <transition name="fade">
        <div v-if="visible" class="border mb-3 p-2">
            <p class="text-dark">{{ comment }}</p>

            <p class="text-muted">Uploaded on: {{ date }}</p>

            <form method="post" @submit.prevent="onSubmit('/comments/' + id)">
                <slot></slot>

                <button name="submit" class="btn btn-danger btn-block" :disabled="submitted">Delete post</button>
            </form>

            <p v-if="errors" class="text-danger">{{ errors.message }}</p>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "homecomment",

        props: {
            comment: String,
            date: String,
            id: Number,
        },

        data() {
            return {
                visible: true,
                submitted: false,
                errors: '',
            }
        },

        methods: {
            onSubmit(url) {
                if(confirm("Are you sure you want to delete this comment? This cannot be undone.")) {
                    this.submitted = true;

                    axios.delete(url)
                        .then(this.onSuccess)
                        .catch(error => this.onFail(error))
                }
            },

            onSuccess() {
                this.visible = false;
            },

            onFail(error) {
                this.visible = true;
                this.submitted = false;
                this.errors = error.response.data;
            }
        }
    }
</script>
