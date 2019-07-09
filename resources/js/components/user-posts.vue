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
            <div class="clearfix"></div>s
        </div>
    </transition>
</template>

<script>
    export default {
        name: "userposts",

        props: {
            path: String,
            title: String,
            id: String,
        },

        data() {
            return {
                visible: true,
                submitted: false,
                errors: ''
            }
        },

        methods: {
            onSubmit(url) {
                this.submitted = true;

                axios.delete(url)
                    .then(response => {
                        this.visible = false;
                        console.log(response);
                        console.log('Deleted image at: ' + url);
                    })
                    .catch(errors => {
                        this.submitted = false;
                        this.errors = errors.response.data;
                        console.log(this.errors)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
