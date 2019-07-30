<template>
    <div v-if="visible">
        <homeimage v-if="image" v-for="image in images" :key="image.id" :path="image.path" :title="image.title" :id="image.id" :date="image.created_at">
            <slot></slot>
        </homeimage>

        <button class="btn btn-primary btn-block" @click="loadPosts" v-if="showBtn">Load images</button>

        <p v-if="noPosts" class="text-dark"> You have no images yet,
            <a href="/images/create">upload an image!</a>
        </p>

        <p v-if="hadPosts">You have no more images left!</p>
    </div>
</template>

<script>
    import homeimage from './image';

    export default {
        name: "homepanelimages",

        components: {
            homeimage
        },

        data() {
            return {
                visible: true,
                hadPosts: false,
                noPosts: false,
                images: [],
                page: 1
            }
        },

        computed: {
            showBtn() {
                return this.hadPosts === this.noPosts;
            }
        },

        methods: {
            infiniteHandler() {
                let handler = this;

                axios.get('/home/ownerimages?page=' + this.page)
                    .then(response => {
                        $.each(response.data.data, function (key, value) {
                            handler.images.push(value);
                        });

                        if(response.data.last_page <= this.page) {
                            handler.endOfPosts();
                        } else {
                            this.page++;
                        }
                    });
            },

            endOfPosts() {
                if (!this.images.length) {
                    this.noPosts = true;
                } else {
                    this.hadPosts = true;
                }
            },

            loadPosts() {
                if (this.hadPosts === false && this.noPosts === false) {
                    this.infiniteHandler();
                }
            },

            onScroll() {
                window.onscroll = () => {
                    if (window.scrollY + window.innerHeight > document.body.scrollHeight - 1 && this.visible === true) {
                        this.loadPosts();
                        console.log('loading images!')
                    }
                }
            },

            showPanel() {
                this.onScroll();
                this.visible = true;
            },

            hidePanel() {
                this.visible = false;
            }
        },

        mounted() {
            this.onScroll();
            this.loadPosts();
            Event.$on('panelimages', this.showPanel);
            Event.$on('panelshide', this.hidePanel)
        },
    }
</script>
