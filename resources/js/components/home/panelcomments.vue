<template>
    <div v-if="visible">
        <homecomment v-if="comment" v-for="comment in comments" :key="comment.id" :comment="comment.comment" :id="comment.id" :date="comment.created_at">
            <slot></slot>
        </homecomment>

        <button class="btn btn-primary btn-block" @click="loadPosts" v-if="showBtn">Load comments</button>

        <p v-if="noPosts" class="text-dark"> You have no comments yet!</p>

        <p v-if="hadPosts">No more comments left!</p>
    </div>
</template>

<script>
    import homecomment from './comment';

    export default {
        name: "homepanelcomments",

        components: {
            homecomment
        },

        data() {
            return {
                visible: false,
                hadPosts: false,
                noPosts: false,
                comments: [],
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

                axios.get('/home/ownercomments?page=' + this.page)
                    .then(response => {
                        $.each(response.data.data, function (key, value) {
                            handler.comments.push(value);
                        });

                        if(response.data.last_page <= this.page) {
                            handler.endOfPosts();
                        } else {
                            this.page++;
                        }
                    });
            },

            endOfPosts() {
                if (!this.comments.length) {
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
                        console.log('loading comments!')
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
            this.loadPosts();
            Event.$on('panelcomments', this.showPanel)
            Event.$on('panelshide', this.hidePanel);
        },
    }
</script>
