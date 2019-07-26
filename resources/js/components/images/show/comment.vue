<template>
    <div class="card" v-if="visible">
        <div class="card-body">
            <h5 class="card-title">Posted by: {{ name }}</h5>
            <p class="card-text">{{ body }}</p>
            <p class="card-text text-muted">posted on: {{ date }}</p>

            <form v-if="isOwner" method="post" @submit.prevent="onSubmit('/comments/' + id)">
                <slot></slot>

                <button class="btn btn-danger" type="submit" :disabled="submitted">Delete comment</button>

                <p v-if="errors" class="text-danger">{{ errors.message }}</p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "showcomment",

        props: {
            name: String,
            body: String,
            date: String,
            userid: Number,
            ownerid: Number,
            id: Number,
        },

        data() {
            return {
                visible: true,
                submitted: false,
                errors: '',
            }
        },

        computed: {
            isOwner() {
                return this.userid === this.ownerid;
            }
        },

        methods: {
            onSubmit(url) {
                if(confirm("Are you sure you want to delete this image? This cannot be undone.")) {
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
                this.submitted = false;
                this.errors = error.response.data;
            }
        }
    }
</script>
