<template>
    <div>
        <form method="post" action="/images" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <slot></slot>

            <div class="mb-4" v-if="id">
                <h2 class="text-success text-center">Successfully uploaded image!</h2>
                <a :href="'/images/' + id">
                    <h4 class="text-center">Click here to go to image</h4>
                </a>
            </div>

            <div class="form-group mb-4">
                <label for="title-form">Enter image title</label>
                <input type="text" name="title" v-model="title" @keypress="errors.title = ''" class="form-control" id="title-form" placeholder="Image title" minlength="3" maxlength="255" required>
                <p class="text-danger" v-for="error in errors.title">{{ error }}</p>
            </div>

            <div class="form-group mb-4">
                <label for="file">Select image to upload</label>
                <input type="file" name="image" @change="previewImage" accept="image/*" class="form-control-file" id="file" ref="file" required>
                <img v-if="url" :src="url" alt="preview image" class="createpanel-image mt-3">
                <p class="text-danger" v-for="error in errors.image">{{ error }}</p>
            </div>

            <div>
                <button name="submit" class="btn btn-dark btn-block" :disabled="submitted">Create post</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "createpanel",

        data() {
            return {
                title: '',
                image: [],
                url: null,
                submitted: false,
                id: null,
                errors: [],
            }
        },

        methods: {
            previewImage(event) {
                this.errors.image = '';
                this.image = event.target.files[0];
                this.url = URL.createObjectURL(this.image);
            },

            onSubmit() {
                this.submitted = true;
                var formData = new FormData();

                formData.append("image", this.image);
                formData.append("title", this.title);

                axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
                    .then(response => this.onSuccess(response))
                    .catch(errors => this.onFail(errors));
            },

            onSuccess(response) {
                this.reset();

                this.id = response.data;
            },

            onFail(errors) {
                this.submitted = false;
                this.id = null;
                this.errors = errors.response.data.errors;
            },

            reset() {
                this.title = '';
                this.image = [];
                this.url = null;
                this.submitted = false;
                this.errors = '';

                this.$refs['file'].value = null;
            },
        }
    }
</script>
