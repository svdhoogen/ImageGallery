<template>
    <div class="card-body">
        <div class="d-flex align-content-center flex-wrap justify-content-center">
            <indeximage v-for="image in images" :key="image.id" :id="image.id" :path="image.path"
                        :title="image.title"></indeximage>
        </div>

        <div class="row justify-content-center">
            <button class="btn btn-primary btn-block mw-35 text-center" v-if="more" @click="loadMore">Load more</button>
        </div>
    </div>
</template>

<script>
    import indeximage from './image';

    export default {
        name: 'indexpanelimages',

        components: {
            indeximage
        },

        data() {
            return {
                images: [],
                page: 1,
                keyId: -1,
                load: 'loadnew',
                more: true,
            }
        },

        methods: {
            infiniteHandler() {
                axios.get('/images/' + this.load + '?page=' + this.page + '&keyId=' + this.keyId)
                    .then(response => this.onSuccess(response));
            },

            onSuccess(response) {
                let handler = this;

                $.each(response.data.items.data, function (key, value) {
                    handler.images.push(value);
                });

                if (response.data.items.last_page <= this.page) {
                    this.more = false;
                } else {
                    this.page++;

                    if (this.keyId === -1) {
                        this.keyId = response.data.keyId;
                    }
                }
            },

            loadMore() {
                if (this.more === true) {
                    this.infiniteHandler();
                }
            },

            onScroll() {
                window.onscroll = () => {
                    if (window.scrollY + window.innerHeight > document.body.scrollHeight - 1) {
                        this.loadMore();
                    }
                }
            },

            reset() {
                this.images = [];
                this.page = 1;
                this.keyId = -1;
                this.more = true;
            },

            loadNew() {
                this.load = 'loadnew';
                this.loadMore();
            },

            loadRandom() {
                this.load = 'loadrandom';
                this.loadMore();
            },

            loadOldest() {
                this.load = 'loadoldest';
                this.loadMore();
            }
        },

        mounted() {
            this.loadMore();
            setTimeout(() => this.onScroll(), 100);
            Event.$on('panelshide', this.reset);
            Event.$on('loadnew', this.loadNew);
            Event.$on('loadrandom', this.loadRandom);
            Event.$on('loadoldest', this.loadOldest);
        }
    }
</script>
