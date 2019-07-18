<template>
    <div>
        <homepost v-if="post" v-for="post in posts" :key="post.id" :path="post.path" :title="post.title" :id="post.id" :date="post.created_at">
            <slot></slot>
        </homepost>

        <button class="btn btn-primary btn-block" @click="loadPosts" v-if="showBtn">Load posts</button>

        <p v-if="noPosts" class="text-dark"> You have no posts yet,
            <a href="/images/create">upload an image!</a>
        </p>

        <p v-if="hadPosts">You have no more posts left!</p>
    </div>
</template>

<script>
    import homepost from './home-post';

    export default {
        name: "homepanel",

        components: {
            homepost
        },

        data() {
            return {
                hadPosts: false,
                noPosts: false,
                posts: [],
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

                axios.get('/home/ownerposts?count=5&page=' + this.page)
                    .then(response => {
                        $.each(response.data.data, function (key, value) {
                            handler.posts.push(value);
                        });

                        if(response.data.last_page <= this.page) {
                            handler.endOfPosts();
                        } else {
                            this.page++;
                        }
                    });
            },

            endOfPosts() {
                if (this.posts[0] === false) {
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
                    if (window.scrollY + window.innerHeight > document.body.scrollHeight - 1) {
                        this.loadPosts();
                    }
                }
            },
        },

        mounted() {
            this.onScroll();
            this.loadPosts();
        },
    }
</script>
