import moment from 'moment';

//
var script = {
    name: 'web-template',

    data: function data() {
        return {
            setted: false,
        }
    },

    props: {
        content: Object, 
        user: Object, 
        card: Object,
        isMiniature: Boolean,
        edit: Boolean
    },

    filters: {
        toDate: function toDate(value) {
            var locale = window.navigator.userLanguage || window.navigator.language;
            moment.locale(locale);
            return moment(value).format('ll')
        }
    },

    methods: {
        goToUser: function goToUser() {
            this.$router.push({path: ("/u/" + (this.content.userInfo.name))});
        }
    },

    mounted: function mounted() {
        if (this.content.date == null) {
            this.content.date = new Date();
        }

        if (typeof this.content.userInfo != 'undefined') {
            this.setted = true;
        }

        else {
            this.content.userInfo = {};
            this.content.userInfo.name = this.user.name;
            this.content.userInfo.avatar = this.user.avatar;
            this.setted = true;
        }

    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"webtemplate"}},[(_vm.setted)?_c('div',{staticClass:"horizontal",staticStyle:{"justify-content":"space-between"}},[_c('div',{staticClass:"horizontal"},[_c('img',{staticStyle:{"width":"48px","height":"48px","border-radius":"50%"},attrs:{"src":_vm.content.userInfo.avatar,"alt":_vm.content.userInfo.name}}),_vm._v(" "),_c('div',{staticStyle:{"margin-left":"8px"}},[_c('div',{staticClass:"underline",staticStyle:{"font-size":".9em"},on:{"click":_vm.goToUser}},[_vm._v(_vm._s(_vm.content.userInfo.name))]),_vm._v(" "),_c('div',{staticStyle:{"color":"#828282","font-size":".8em"}},[_vm._v(_vm._s(_vm._f("toDate")(_vm.content.date)))])])]),_vm._v(" "),_c('button',{staticClass:"button",staticStyle:{"align-self":"center"},on:{"click":_vm.goToUser}},[_vm._v("Ver Perfil")])]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-fdb5498a_0", { source: ".horizontal{display:flex;flex-direction:row;padding:4px 8px 4px 8px;align-items:center;background-color:#f0f0f0}.underline:hover{text-decoration:underline;cursor:pointer}.button{background-color:#4383e9;border-radius:24px;padding:8px 16px 8px 16px;color:#fff;border:0;font-weight:700;font-family:Nunito;cursor:pointer}.button:hover{background-color:#4888f4}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// ./src/entry.js

function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component("WebTemplate", __vue_component__);
}

var plugin = {
  install: install
};

var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

__vue_component__.install = install;

export default __vue_component__;
