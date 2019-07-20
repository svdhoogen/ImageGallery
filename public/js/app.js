(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/panel.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home/panel.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post */ "./resources/js/components/home/post.vue");
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
    homepost: _post__WEBPACK_IMPORTED_MODULE_0__["default"]
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
      axios.get('/home/ownerposts?page=' + this.page).then(function (response) {
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/post.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home/post.vue?vue&type=script&lang=js& ***!
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/create/panel.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/create/panel.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/add-comment.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/add-comment.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "showaddcomment",
  props: {
    imageid: Number
  },
  data: function data() {
    return {
      comment: '',
      submitted: false,
      errors: []
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      var _this = this;

      this.submitted = true;
      var formData = new FormData();
      formData.append("comment", this.comment);
      formData.append("image_id", this.imageid);
      axios.post('/comments', formData).then(this.onSuccess())["catch"](function (errors) {
        return _this.onFail(errors);
      });
    },
    onSuccess: function onSuccess() {
      this.submitted = false;
      this.comment = '';
      this.errors = [];
    },
    onFail: function onFail(errors) {
      this.submitted = false;
      this.errors = errors.response.data.errors;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comment.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/comment.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "comment",
  props: {
    name: String,
    body: String,
    date: String
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comments.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/comments.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment */ "./resources/js/components/images/show/comment.vue");
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'showdelete',
  components: {
    comment: _comment__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    imageid: Number
  },
  data: function data() {
    return {
      comments: [],
      page: 1,
      moreComments: true
    };
  },
  methods: {
    infiniteHandler: function infiniteHandler() {
      var _this = this;

      var handler = this;
      axios.get('/comments/' + this.imageid + '?page=' + this.page).then(function (response) {
        $.each(response.data.data, function (key, value) {
          handler.comments.push(value);
        });

        if (response.data.last_page <= _this.page) {
          _this.moreComments = false;
        } else {
          _this.page++;
        }
      });
    },
    loadPosts: function loadPosts() {
      if (this.moreComments === true) {
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
    var _this3 = this;

    this.loadPosts();
    setTimeout(function () {
      return _this3.onScroll();
    }, 100);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/delete.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/delete.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'showdelete',
  props: {
    id: Number
  },
  data: function data() {
    return {
      submitted: false,
      errors: []
    };
  },
  methods: {
    onSubmit: function onSubmit(url) {
      var _this = this;

      if (confirm("Are you sure you want to delete this image? This cannot be undone.")) {
        this.submitted = true;
        this.errors = [];
        axios["delete"](url).then(this.onSuccess())["catch"](function (error) {
          return _this.onFail(error);
        });
      }
    },
    onSuccess: function onSuccess() {
      window.location.href = '/home';
    },
    onFail: function onFail() {
      this.submitted = false;
      this.errors = error.response.data;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/panel.vue?vue&type=template&id=7a41b75f&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home/panel.vue?vue&type=template&id=7a41b75f& ***!
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/post.vue?vue&type=template&id=65663a15&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/home/post.vue?vue&type=template&id=65663a15& ***!
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/create/panel.vue?vue&type=template&id=0203c76d&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/create/panel.vue?vue&type=template&id=0203c76d& ***!
  \**********************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/add-comment.vue?vue&type=template&id=4638d146&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/add-comment.vue?vue&type=template&id=4638d146& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    "form",
    {
      attrs: { method: "post", action: /comments/ },
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
      _c(
        "div",
        { staticClass: "form-group mb-2" },
        [
          _c("h4", { attrs: { for: "comment-form" } }, [
            _vm._v("Post a comment!")
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.comment,
                expression: "comment"
              }
            ],
            staticClass: "form-control",
            attrs: {
              type: "text",
              name: "comment",
              id: "comment-form",
              placeholder: "Enter comment",
              minlength: "3",
              maxlength: "255",
              required: ""
            },
            domProps: { value: _vm.comment },
            on: {
              keypress: function($event) {
                _vm.errors.comment = ""
              },
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.comment = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _vm._l(_vm.errors.comment, function(error) {
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comment.vue?vue&type=template&id=15a24f89&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/comment.vue?vue&type=template&id=15a24f89& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card" }, [
    _c("div", { staticClass: "card-body" }, [
      _c("h5", { staticClass: "card-title" }, [
        _vm._v("Posted by: " + _vm._s(_vm.name))
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "card-text" }, [_vm._v(_vm._s(_vm.body))]),
      _vm._v(" "),
      _c("p", { staticClass: "card-text text-muted" }, [
        _vm._v("posted on: " + _vm._s(_vm.date))
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comments.vue?vue&type=template&id=bb597a8c&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/comments.vue?vue&type=template&id=bb597a8c& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    { staticClass: "mt-4" },
    [
      _vm._l(_vm.comments, function(comment) {
        return _c("comment", {
          key: comment.id,
          staticClass: "mb-1",
          attrs: {
            name: comment.owner.name,
            body: comment.comment,
            date: comment.created_at
          }
        })
      }),
      _vm._v(" "),
      _vm.moreComments
        ? _c(
            "button",
            { staticClass: "btn btn-primary", on: { click: _vm.loadPosts } },
            [_vm._v("Load comments")]
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/delete.vue?vue&type=template&id=7e8a6a71&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/images/show/delete.vue?vue&type=template&id=7e8a6a71& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
          staticClass: "btn btn-danger",
          attrs: { name: "submit", disabled: _vm.submitted }
        },
        [_vm._v("Delete post")]
      ),
      _vm._v(" "),
      _vm._l(_vm.errors, function(error) {
        return _c("p", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
      })
    ],
    2
  )
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
/* harmony import */ var _components_home_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/home/panel */ "./resources/js/components/home/panel.vue");
/* harmony import */ var _components_images_create_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/images/create/panel */ "./resources/js/components/images/create/panel.vue");
/* harmony import */ var _components_images_show_delete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/images/show/delete */ "./resources/js/components/images/show/delete.vue");
/* harmony import */ var _components_images_show_comments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/images/show/comments */ "./resources/js/components/images/show/comments.vue");
/* harmony import */ var _components_images_show_add_comment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/images/show/add-comment */ "./resources/js/components/images/show/add-comment.vue");
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
    createpanel: _components_images_create_panel__WEBPACK_IMPORTED_MODULE_1__["default"],
    showdelete: _components_images_show_delete__WEBPACK_IMPORTED_MODULE_2__["default"],
    showcomments: _components_images_show_comments__WEBPACK_IMPORTED_MODULE_3__["default"],
    showaddcomment: _components_images_show_add_comment__WEBPACK_IMPORTED_MODULE_5__["default"]
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

/***/ "./resources/js/components/home/panel.vue":
/*!************************************************!*\
  !*** ./resources/js/components/home/panel.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _panel_vue_vue_type_template_id_7a41b75f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panel.vue?vue&type=template&id=7a41b75f& */ "./resources/js/components/home/panel.vue?vue&type=template&id=7a41b75f&");
/* harmony import */ var _panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel.vue?vue&type=script&lang=js& */ "./resources/js/components/home/panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _panel_vue_vue_type_template_id_7a41b75f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _panel_vue_vue_type_template_id_7a41b75f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/home/panel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/home/panel.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/home/panel.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./panel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/home/panel.vue?vue&type=template&id=7a41b75f&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/home/panel.vue?vue&type=template&id=7a41b75f& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_template_id_7a41b75f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./panel.vue?vue&type=template&id=7a41b75f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/panel.vue?vue&type=template&id=7a41b75f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_template_id_7a41b75f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_template_id_7a41b75f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/home/post.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/home/post.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post_vue_vue_type_template_id_65663a15___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post.vue?vue&type=template&id=65663a15& */ "./resources/js/components/home/post.vue?vue&type=template&id=65663a15&");
/* harmony import */ var _post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post.vue?vue&type=script&lang=js& */ "./resources/js/components/home/post.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _post_vue_vue_type_template_id_65663a15___WEBPACK_IMPORTED_MODULE_0__["render"],
  _post_vue_vue_type_template_id_65663a15___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/home/post.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/home/post.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/home/post.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./post.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/post.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_post_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/home/post.vue?vue&type=template&id=65663a15&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/home/post.vue?vue&type=template&id=65663a15& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_post_vue_vue_type_template_id_65663a15___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./post.vue?vue&type=template&id=65663a15& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/home/post.vue?vue&type=template&id=65663a15&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_post_vue_vue_type_template_id_65663a15___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_post_vue_vue_type_template_id_65663a15___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/images/create/panel.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/images/create/panel.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _panel_vue_vue_type_template_id_0203c76d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panel.vue?vue&type=template&id=0203c76d& */ "./resources/js/components/images/create/panel.vue?vue&type=template&id=0203c76d&");
/* harmony import */ var _panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel.vue?vue&type=script&lang=js& */ "./resources/js/components/images/create/panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _panel_vue_vue_type_template_id_0203c76d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _panel_vue_vue_type_template_id_0203c76d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/images/create/panel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/images/create/panel.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/images/create/panel.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./panel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/create/panel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/images/create/panel.vue?vue&type=template&id=0203c76d&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/images/create/panel.vue?vue&type=template&id=0203c76d& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_template_id_0203c76d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./panel.vue?vue&type=template&id=0203c76d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/create/panel.vue?vue&type=template&id=0203c76d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_template_id_0203c76d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_template_id_0203c76d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/images/show/add-comment.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/images/show/add-comment.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_comment_vue_vue_type_template_id_4638d146___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-comment.vue?vue&type=template&id=4638d146& */ "./resources/js/components/images/show/add-comment.vue?vue&type=template&id=4638d146&");
/* harmony import */ var _add_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-comment.vue?vue&type=script&lang=js& */ "./resources/js/components/images/show/add-comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _add_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _add_comment_vue_vue_type_template_id_4638d146___WEBPACK_IMPORTED_MODULE_0__["render"],
  _add_comment_vue_vue_type_template_id_4638d146___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/images/show/add-comment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/images/show/add-comment.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/images/show/add-comment.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_add_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./add-comment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/add-comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_add_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/images/show/add-comment.vue?vue&type=template&id=4638d146&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/images/show/add-comment.vue?vue&type=template&id=4638d146& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_comment_vue_vue_type_template_id_4638d146___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./add-comment.vue?vue&type=template&id=4638d146& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/add-comment.vue?vue&type=template&id=4638d146&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_comment_vue_vue_type_template_id_4638d146___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_add_comment_vue_vue_type_template_id_4638d146___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/images/show/comment.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/images/show/comment.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comment_vue_vue_type_template_id_15a24f89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment.vue?vue&type=template&id=15a24f89& */ "./resources/js/components/images/show/comment.vue?vue&type=template&id=15a24f89&");
/* harmony import */ var _comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment.vue?vue&type=script&lang=js& */ "./resources/js/components/images/show/comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _comment_vue_vue_type_template_id_15a24f89___WEBPACK_IMPORTED_MODULE_0__["render"],
  _comment_vue_vue_type_template_id_15a24f89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/images/show/comment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/images/show/comment.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/images/show/comment.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./comment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/images/show/comment.vue?vue&type=template&id=15a24f89&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/images/show/comment.vue?vue&type=template&id=15a24f89& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_vue_vue_type_template_id_15a24f89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./comment.vue?vue&type=template&id=15a24f89& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comment.vue?vue&type=template&id=15a24f89&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_vue_vue_type_template_id_15a24f89___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_vue_vue_type_template_id_15a24f89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/images/show/comments.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/images/show/comments.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comments_vue_vue_type_template_id_bb597a8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments.vue?vue&type=template&id=bb597a8c& */ "./resources/js/components/images/show/comments.vue?vue&type=template&id=bb597a8c&");
/* harmony import */ var _comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments.vue?vue&type=script&lang=js& */ "./resources/js/components/images/show/comments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _comments_vue_vue_type_template_id_bb597a8c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _comments_vue_vue_type_template_id_bb597a8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/images/show/comments.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/images/show/comments.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/images/show/comments.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./comments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comments.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/images/show/comments.vue?vue&type=template&id=bb597a8c&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/images/show/comments.vue?vue&type=template&id=bb597a8c& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_vue_vue_type_template_id_bb597a8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./comments.vue?vue&type=template&id=bb597a8c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/comments.vue?vue&type=template&id=bb597a8c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_vue_vue_type_template_id_bb597a8c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_vue_vue_type_template_id_bb597a8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/images/show/delete.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/images/show/delete.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _delete_vue_vue_type_template_id_7e8a6a71___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delete.vue?vue&type=template&id=7e8a6a71& */ "./resources/js/components/images/show/delete.vue?vue&type=template&id=7e8a6a71&");
/* harmony import */ var _delete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delete.vue?vue&type=script&lang=js& */ "./resources/js/components/images/show/delete.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _delete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _delete_vue_vue_type_template_id_7e8a6a71___WEBPACK_IMPORTED_MODULE_0__["render"],
  _delete_vue_vue_type_template_id_7e8a6a71___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/images/show/delete.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/images/show/delete.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/images/show/delete.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_delete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./delete.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/delete.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_delete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/images/show/delete.vue?vue&type=template&id=7e8a6a71&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/images/show/delete.vue?vue&type=template&id=7e8a6a71& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_delete_vue_vue_type_template_id_7e8a6a71___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./delete.vue?vue&type=template&id=7e8a6a71& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/images/show/delete.vue?vue&type=template&id=7e8a6a71&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_delete_vue_vue_type_template_id_7e8a6a71___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_delete_vue_vue_type_template_id_7e8a6a71___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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