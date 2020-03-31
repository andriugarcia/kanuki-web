import Axios from 'axios';

//

var script = {
    name: 'web-template',

    data: function data() {
        return {
            gif: "",
            query: "",
            gifs: "",
            rerender: 0
        }
    },

    mounted: function mounted() {
        document.getElementById("gifs").addEventListener("click", function(evt){
            if (evt.target.tagName == 'IMG') {
                console.log(evt.src);
                this.gif = evt.src;
            }
        });
    },

    props: {
        content: Object, 
        user: Object, 
        card: Object,
        isMiniature: Boolean,
        edit: Boolean
    },

    methods: {
        searchGIF: function searchGIF() {
            var self = this;
            Axios.get('https://api.giphy.com/v1/gifs/search', {
                params: {
                    api_key: "cpRpkTx6N2eokRcWn7FiuUrlLPOiQ2g1",
                    q: this.query,
                    lang: "es",
                    fmt: "html"
                }
            })
            .then(function (response) {
                // handle success
                self.gifs = response.data;
                self.rerender++;
            });
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"webtemplate"}},[(!_vm.gifs)?_c('div',{staticClass:"horizontal"},[_c('div',{staticStyle:{"font-size":"2em","font-weight":"bold","color":"#505050","margin-right":"12px"}},[_vm._v("GIF")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.query),expression:"query"}],staticClass:"input",attrs:{"type":"text","placeholder":"Buscar en GIPHY"},domProps:{"value":(_vm.query)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.searchGIF($event)},"input":function($event){if($event.target.composing){ return; }_vm.query=$event.target.value;}}}),_vm._v(" "),_c('button',{staticClass:"button",on:{"click":_vm.searchGIF}},[_vm._v("Buscar")])]):_vm._e(),_vm._v(" "),_c('div',{key:_vm.rerender,attrs:{"id":"gifs"},domProps:{"innerHTML":_vm._s(_vm.gifs)}}),_vm._v(" "),_c('div',[_c('img',{attrs:{"src":_vm.gif,"alt":""}})])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-67dffd8e_0", { source: ".center{display:flex;flex-direction:column;width:100%;height:100%;justify-content:center;align-items:center}.horizontal{display:flex}.empty{min-height:200px}.button{background-color:#1c1c1c;border-radius:0 24px 24px 0;font-size:.6em;color:#fff;font-weight:700}.input{width:100%;padding:8px;font-size:1.2em;border:0;font-weight:lighter;border-radius:24px 0 0 24px;border:1px solid #000}input:focus,textarea:focus{outline:0}ul{column-count:3;column-gap:1em}li{display:inline-block;margin:0 0 1em;width:100%}img{width:100%}", map: undefined, media: undefined });

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
