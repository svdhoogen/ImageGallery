<template>
    <div class="mt-4">
        <comment class="mb-1" v-for="comment in comments" :key="comment.id" :name="comment.owner.name" :body="comment.comment" :date="comment.created_at"></comment>

        <button class="btn btn-primary" v-if="moreComments" @click="loadPosts">Load comments</button>
    </div>
</template>

<script>
    import comment from './comment';

    export default {
        name: 'showdelete',

        components: {
            comment
        },

        props: {
            imageid: Number,
        },

        data() {
            return {
                comments: [],
                page: 1,
                moreComments: true,
            }
        },

        methods: {
            infiniteHandler() {
                let handler = this;

                axios.get('/comments/' + this.imageid + '?page=' + this.page)
                    .then(response => {
                        $.each(response.data.data, function (key, value) {
                            handler.comments.push(value);
                        });

                        if(response.data.last_page <= this.page) {
                            this.moreComments = false;
                        } else {
                            this.page++;
                        }
                    });
            },

            loadPosts() {
                if (this.moreComments === true) {
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
            this.loadPosts();
            setTimeout(() => this.onScroll(), 100);
        },
    }
</script>
