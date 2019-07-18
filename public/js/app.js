(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/create-panel.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/create-panel.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "createpanel",
  data: function data() {
    return {
      title: '',
      image: [],
      url: null,
      submitted: false,
      id: null,
      errors: []
    };
  },
  methods: {
    previewImage: function previewImage(event) {
      this.errors.image = '';
      this.image = event.target.files[0];
      this.url = URL.createObjectURL(this.image);
    },
    onSubmit: function onSubmit() {
      var _this = this;

      this.submitted = true;
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.title);
      axios.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        return _this.onSuccess(response);
      })["catch"](function (errors) {
        return _this.onFail(errors);
      });
    },
    onSuccess: function onSuccess(response) {
      this.reset();
      this.id = response.data;
    },
    onFail: function onFail(errors) {
      this.submitted = false;
      this.id = null;
      this.errors = errors.response.data.errors;
    },
    reset: function reset() {
      this.title = '';
      this.image = [];
      this.url = null;
      this.submitted = false;
      this.errors = '';
      this.$refs['file'].value = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-panel.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home-panel.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-post */ "./resources/js/components/home-post.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "homepanel",
  components: {
    homepost: _home_post__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      hadPosts: false,
      noPosts: false,
      posts: [],
      page: 1
    };
  },
  computed: {
    showBtn: function showBtn() {
      return this.hadPosts === this.noPosts;
    }
  },
  methods: {
    infiniteHandler: function infiniteHandler() {
      var _this = this;

      var handler = this;
      axios.get('/home/ownerposts?count=5&page=' + this.page).then(function (response) {
        $.each(response.data.data, function (key, value) {
          handler.posts.push(value);
        });

        if (response.data.last_page <= _this.page) {
          handler.endOfPosts();
        } else {
          _this.page++;
        }
      });
    },
    endOfPosts: function endOfPosts() {
      if (this.posts[0] === false) {
        this.noPosts = true;
      } else {
        this.hadPosts = true;
      }
    },
    loadPosts: function loadPosts() {
      if (this.hadPosts === false && this.noPosts === false) {
        this.infiniteHandler();
      }
    },
    onScroll: function onScroll() {
      var _this2 = this;

      window.onscroll = function () {
        if (window.scrollY + window.innerHeight > document.body.scrollHeight - 1) {
          _this2.loadPosts();
        }
      };
    }
  },
  mounted: function mounted() {
    this.onScroll();
    this.loadPosts();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-post.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home-post.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "homepost",
  props: {
    path: String,
    title: String,
    id: Number,
    date: String
  },
  data: function data() {
    return {
      visible: true,
      submitted: false,
      errors: ''
    };
  },
  methods: {
    onSubmit: function onSubmit(url) {
      var _this = this;

      if (confirm("Are you sure you want to delete this image? This cannot be undone.")) {
        this.submitted = true;
        axios["delete"](url).then(this.onSuccess())["catch"](function (error) {
          return _this.onFail(error);
        });
      }
    },
    onSuccess: function onSuccess() {
      this.visible = false;
      Event.$emit('deletedPost');
    },
    onFail: function onFail(error) {
      this.submitted = false;
      this.errors = error.response.data;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/create-panel.vue?vue&type=template&id=2b91103e&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/create-panel.vue?vue&type=template&id=2b91103e& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "form",
      {
        attrs: {
          method: "post",
          action: "/images",
          enctype: "multipart/form-data"
        },
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.onSubmit($event)
          }
        }
      },
      [
        _vm._t("default"),
        _vm._v(" "),
        _vm.id
          ? _c("div", { staticClass: "mb-4" }, [
              _c("h2", { staticClass: "text-success text-center" }, [
                _vm._v("Successfully uploaded image!")
              ]),
              _vm._v(" "),
              _c("a", { attrs: { href: "/images/" + _vm.id } }, [
                _c("h4", { staticClass: "text-center" }, [
                  _vm._v("Click here to go to image")
                ])
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-group mb-4" },
          [
            _c("label", { attrs: { for: "title-form" } }, [
              _vm._v("Enter image title")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.title,
                  expression: "title"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "text",
                name: "title",
                id: "title-form",
                placeholder: "Image title",
                minlength: "3",
                maxlength: "255",
                required: ""
              },
              domProps: { value: _vm.title },
              on: {
                keypress: function($event) {
                  _vm.errors.title = ""
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.title = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.errors.title, function(error) {
              return _c("p", { staticClass: "text-danger" }, [
                _vm._v(_vm._s(error))
              ])
            })
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-group mb-4" },
          [
            _c("label", { attrs: { for: "file" } }, [
              _vm._v("Select image to upload")
            ]),
            _vm._v(" "),
            _c("input", {
              ref: "file",
              staticClass: "form-control-file",
              attrs: {
                type: "file",
                name: "image",
                accept: "image/*",
                id: "file",
                required: ""
              },
              on: { change: _vm.previewImage }
            }),
            _vm._v(" "),
            _vm.url
              ? _c("img", {
                  staticClass: "createpanel-image mt-3",
                  attrs: { src: _vm.url, alt: "preview image" }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.errors.image, function(error) {
              return _c("p", { staticClass: "text-danger" }, [
                _vm._v(_vm._s(error))
              ])
            })
          ],
          2
        ),
        _vm._v(" "),
        _c("div", [
          _c(
            "button",
            {
              staticClass: "btn btn-dark btn-block",
              attrs: { name: "submit", disabled: _vm.submitted }
            },
            [_vm._v("Create post")]
          )
        ])
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-panel.vue?vue&type=template&id=dca255be&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home-panel.vue?vue&type=template&id=dca255be& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm._l(_vm.posts, function(post) {
        return post
          ? _c(
              "homepost",
              {
                key: post.id,
                attrs: {
                  path: post.path,
                  title: post.title,
                  id: post.id,
                  date: post.created_at
                }
              },
              [_vm._t("default")],
              2
            )
          : _vm._e()
      }),
      _vm._v(" "),
      _vm.showBtn
        ? _c(
            "button",
            {
              staticClass: "btn btn-primary btn-block",
              on: { click: _vm.loadPosts }
            },
            [_vm._v("Load posts")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.noPosts
        ? _c("p", { staticClass: "text-dark" }, [
            _vm._v(" You have no posts yet,\n        "),
            _c("a", { attrs: { href: "/images/create" } }, [
              _vm._v("upload an image!")
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.hadPosts
        ? _c("p", [_vm._v("You have no more posts left!")])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-post.vue?vue&type=template&id=3cdd5c13&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home-post.vue?vue&type=template&id=3cdd5c13& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.visible
      ? _c("div", { staticClass: "border mb-3 p-2" }, [
          _c(
            "a",
            {
              staticClass: "m-1 float-left homepost-imagediv",
              attrs: { href: "/images/" + _vm.id }
            },
            [
              _c("img", {
                staticClass: "homepost-image",
                attrs: { src: _vm.path, alt: _vm.title }
              })
            ]
          ),
          _vm._v(" "),
          _c("p", { staticClass: "text-dark" }, [_vm._v(_vm._s(_vm.title))]),
          _vm._v(" "),
          _c("p", { staticClass: "text-muted" }, [
            _vm._v("Uploaded on: " + _vm._s(_vm.date))
          ]),
          _vm._v(" "),
          _c(
            "form",
            {
              attrs: { method: "post" },
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.onSubmit("/images/" + _vm.id)
                }
              }
            },
            [
              _vm._t("default"),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-danger btn-block",
                  attrs: { name: "submit", disabled: _vm.submitted }
                },
                [_vm._v("Delete post")]
              )
            ],
            2
          ),
          _vm._v(" "),
          _vm.errors
            ? _c("p", { staticClass: "text-danger" }, [
                _vm._v(_vm._s(_vm.errors.message))
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "clearfix" })
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_home_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/home-panel */ "./resources/js/components/home-panel.vue");
/* harmony import */ var _components_create_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/create-panel */ "./resources/js/components/create-panel.vue");
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.Event = new Vue();


new Vue({
  el: '#root',
  components: {
    homepanel: _components_home_panel__WEBPACK_IMPORTED_MODULE_0__["default"],
    createpanel: _components_create_panel__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"];
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

  __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
} catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

/***/ }),

/***/ "./resources/js/components/create-panel.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/create-panel.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_panel_vue_vue_type_template_id_2b91103e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-panel.vue?vue&type=template&id=2b91103e& */ "./resources/js/components/create-panel.vue?vue&type=template&id=2b91103e&");
/* harmony import */ var _create_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-panel.vue?vue&type=script&lang=js& */ "./resources/js/components/create-panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _create_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_panel_vue_vue_type_template_id_2b91103e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _create_panel_vue_vue_type_template_id_2b91103e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/create-panel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/create-panel.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/create-panel.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./create-panel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/create-panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/create-panel.vue?vue&type=template&id=2b91103e&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/create-panel.vue?vue&type=template&id=2b91103e& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_panel_vue_vue_type_template_id_2b91103e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./create-panel.vue?vue&type=template&id=2b91103e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/create-panel.vue?vue&type=template&id=2b91103e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_panel_vue_vue_type_template_id_2b91103e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_panel_vue_vue_type_template_id_2b91103e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/home-panel.vue":
/*!************************************************!*\
  !*** ./resources/js/components/home-panel.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_panel_vue_vue_type_template_id_dca255be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-panel.vue?vue&type=template&id=dca255be& */ "./resources/js/components/home-panel.vue?vue&type=template&id=dca255be&");
/* harmony import */ var _home_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-panel.vue?vue&type=script&lang=js& */ "./resources/js/components/home-panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _home_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _home_panel_vue_vue_type_template_id_dca255be___WEBPACK_IMPORTED_MODULE_0__["render"],
  _home_panel_vue_vue_type_template_id_dca255be___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/home-panel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/home-panel.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/home-panel.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./home-panel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/home-panel.vue?vue&type=template&id=dca255be&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/home-panel.vue?vue&type=template&id=dca255be& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_panel_vue_vue_type_template_id_dca255be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./home-panel.vue?vue&type=template&id=dca255be& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-panel.vue?vue&type=template&id=dca255be&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_panel_vue_vue_type_template_id_dca255be___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_panel_vue_vue_type_template_id_dca255be___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/home-post.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/home-post.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_post_vue_vue_type_template_id_3cdd5c13___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-post.vue?vue&type=template&id=3cdd5c13& */ "./resources/js/components/home-post.vue?vue&type=template&id=3cdd5c13&");
/* harmony import */ var _home_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-post.vue?vue&type=script&lang=js& */ "./resources/js/components/home-post.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _home_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _home_post_vue_vue_type_template_id_3cdd5c13___WEBPACK_IMPORTED_MODULE_0__["render"],
  _home_post_vue_vue_type_template_id_3cdd5c13___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/home-post.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/home-post.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/home-post.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./home-post.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-post.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/home-post.vue?vue&type=template&id=3cdd5c13&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/home-post.vue?vue&type=template&id=3cdd5c13& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_post_vue_vue_type_template_id_3cdd5c13___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./home-post.vue?vue&type=template&id=3cdd5c13& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home-post.vue?vue&type=template&id=3cdd5c13&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_post_vue_vue_type_template_id_3cdd5c13___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_post_vue_vue_type_template_id_3cdd5c13___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Programs\laragon\www\ImageGallery\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! D:\Programs\laragon\www\ImageGallery\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);