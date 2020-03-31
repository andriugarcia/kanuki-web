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

var script = {
    name: 'web-template',

    data: function data() {
        return {
            files: [],
            rerender: 0
        }
    },

    props: {
        content: Object, 
        user: Object, 
        card: Object,
        isMiniature: Boolean,
        edit: Boolean
    },
    
    created: function created() {
        if (typeof this.content.title == 'undefined') {
            this.content.title = "Titulo del Post";
        }
    },

    methods: {
        changecover: async function changecover(ev) {
            this.content.img = await this.toBase64(ev.target.files[0]);
            this.rerender++;
            this.$emit('save');
        },

        toBase64: function (file) { return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        }); }
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"webtemplate"}},[_c('div',{staticStyle:{"position":"relative","min-height":"200px"}},[_c('img',{key:_vm.rerender,staticStyle:{"width":"100%","height":"360px","object-fit":"cover"},attrs:{"src":_vm.content.img,"alt":""}}),_vm._v(" "),(_vm.edit)?_c('div',{class:{'center': true, 'empty': !_vm.content.img},staticStyle:{"background-color":"#000000A0","top":"0","left":"0","right":"0","bottom":"0","position":"absolute"}},[_c('div',{staticStyle:{"color":"white"}},[_vm._v("Pulsa para cambiar imagen")])]):_vm._e(),_vm._v(" "),(_vm.edit)?_c('input',{staticStyle:{"position":"absolute","top":"0","left":"0","right":"0","bottom":"0","width":"100%","opacity":"0"},attrs:{"type":"file"},on:{"change":_vm.changecover}}):_vm._e()]),_vm._v(" "),(_vm.edit)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.content.title),expression:"content.title"}],staticClass:"input",staticStyle:{"color":"black","margin-top":"12px","font-family":"'Roboto Slab'"},attrs:{"type":"text"},domProps:{"value":(_vm.content.title)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.content, "title", $event.target.value);}}}):_c('h1',{staticStyle:{"color":"black","margin-top":"12px","margin-left":"12px","margin-bottom":"12px","font-family":"'Roboto Slab'"}},[_vm._v(_vm._s(_vm.content.title))])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-7a4c7ed2_0", { source: "@import url(https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap);.center{display:flex;flex-direction:column;width:100%;height:100%;justify-content:center;align-items:center}.empty{min-height:200px}.input{width:100%;padding:8px;font-size:1.2em;border:0;font-weight:lighter;border-radius:24px 0 0 24px}", map: undefined, media: undefined });

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
