<template>
    <form method="post" :action="/comments/" @submit.prevent="onSubmit">
        <slot></slot>

        <div class="form-group mb-2">
            <h4 for="comment-form">Post a comment!</h4>
            <input type="text" name="comment" v-model="comment" @keypress="errors.comment = ''" class="form-control" id="comment-form" placeholder="Enter comment" minlength="3" maxlength="255" required>
            <p class="text-danger" v-for="error in errors.comment">{{ error }}</p>
        </div>

        <div>
            <button name="submit" class="btn btn-dark btn-block" :disabled="submitted">Create post</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "showaddcomment",

        props: {
            imageid: Number,
        },

        data() {
            return {
                comment: '',
                submitted: false,
                errors: [],
            }
        },

        methods: {
            onSubmit() {
                this.submitted = true;

                var formData = new FormData();
                formData.append("comment", this.comment);
                formData.append("image_id", this.imageid);

                axios.post('/comments', formData)
                    .then(this.onSuccess())
                    .catch(errors => this.onFail(errors));
            },

            onSuccess() {
                this.submitted = false;
                this.comment = '';
                this.errors = [];
            },

            onFail(errors) {
                this.submitted = false;
                this.errors = errors.response.data.errors;
            }
        }
    }
</script>
