/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.Event = new Vue();

import userposts from './components/user-posts';

/*class Post {
    constructor(data) {
        this.originalData = data;

        for(let post in data) {
            this[post] = data[post];
            console.log(this[post]);
        }
    }
}*/

new Vue({
    el: '#user-panel',

    components: {
        userposts
    },

    data: {
        hadPosts: false,
        noPosts: false,
        posts: [],
        page: 1
    },

    computed: {
        hasPosts() {
            return this.noPosts === this.hadPosts;
        }
    },

    methods: {
        infiniteHandler() {
            let handler = this;

            axios.get('/home/posts?page=' + this.page)
                .then(response => {
                    if (response.data.data.length === 0) {
                        handler.endOfPosts();
                    } else {
                        $.each(response.data.data, function (key, value) {
                            handler.posts.push(value);
                        });

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
});
