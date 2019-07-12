<template>
    <transition name="fade">
        <div v-if="visible" class="border mb-3 p-2">
            <div class="float-left">
                <img :src="path" class="m-1" width="152" :alt="title">
            </div>

            <p class="text-dark">{{ title }}</p>

            <form method="post" @submit.prevent="onSubmit('/images/' + id)">
                <slot></slot>

                <button name="submit" class="btn btn-danger btn-block" :disabled="submitted">Delete post</button>
            </form>

            <p v-if="errors" class="text-danger">{{ errors.message }}</p>
            <div class="clearfix"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "userposts",

        props: {
            path: String,
            title: String,
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
                this.submitted = true;

                axios.delete(url)
                    .then(this.onSuccess())
                    .catch(error => this.onFail(error))
            },

            onSuccess() {
                this.visible = false;
                Event.$emit('deletedPost');
            },

            onFail(error) {
                this.submitted = false;
                this.errors = error.response.data;
            }
        }
    }
</script>
