<template>
    <div class="mt-4">
        <comment class="mb-1" v-for="comment in comments" :key="comment.id" :userid="userid" :ownerid="comment.owner.id"
                 :name="comment.owner.name" :body="comment.comment" :date="comment.created_at" :id="comment.id">
            <slot></slot>
        </comment>

        <button class="btn btn-primary" v-if="moreComments" @click="loadPosts">Load comments</button>
    </div>
</template>

<script>
    import comment from './comment';

    export default {
        name: 'showcomments',

        components: {
            comment
        },

        props: {
            imageid: Number,
            userid: Number,
        },

        data() {
            return {
                comments: [],
                page: 1,
                commentId: -1,
                moreComments: true,
            }
        },

        methods: {
            infiniteHandler() {
                axios.get('/comments/' + this.imageid + '?page=' + this.page + '&commentId=' + this.commentId)
                    .then(response => this.onSuccess(response));
            },

            onSuccess(response) {
                let handler = this;

                $.each(response.data.data, function (key, value) {
                    handler.comments.push(value);
                });

                if (response.data.last_page <= this.page) {
                    this.moreComments = false;
                } else {
                    this.page++;

                    if (this.commentId === -1) {
                        this.commentId = handler.comments[0].id;
                    }
                }
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

            appendComment(data) {
                axios.get('/comments/single/' + data.data)
                    .then(response => {
                        let handler = this;

                        let oldComments = this.comments;

                        this.comments = [];

                        this.comments.push(response.data);

                        $.each(oldComments, function (key, value) {
                            handler.comments.push(value);
                        });
                    });
            },

            mountComponent() {
                this.loadPosts();
                setTimeout(() => this.onScroll(), 100);
                Event.$on('addComment', this.appendComment);
            }
        },

        mounted() {
            this.mountComponent();
        },
    }
</script>
