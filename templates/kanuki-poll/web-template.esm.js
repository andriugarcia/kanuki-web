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

var script = {
    name: 'web-template',

    data: function data() {
        return {
            text: "",
            total: 0,
            selected: -1
        }
    },

    props: {
        content: Object, 
        user: Object, 
        card: Object,
        isMiniature: Boolean,
        edit: Boolean
    },

    methods: {
        addAnswer: function addAnswer() {
            if (!this.content.poll) {
                this.content.poll = [];
            }
            this.content.poll.push({
                text: this.text,
                value: 0
            });

            this.text = "";
        },

        vote: function vote(index) {
            if (this.selected != -1) { return } 
            this.content.poll[index].value++;
            this.total += 1;
            this.selected = index;
            this.$emit("save");
        }
    },

    mounted: function mounted() {
        if (!this.content.poll) {
            this.total = 0;
        }
        else {
            for(var i = 0; i < this.content.poll.length; i++)
            {
                this.total += this.content.poll[i].value;
            }
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

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"pa-6",attrs:{"id":"webtemplate","tile":"","color":"blue","dark":"","flat":""}},[(!_vm.edit)?_c('div',{staticClass:"text-center"},[_c('strong',{staticStyle:{"margin-bottom":"12px"}},[_vm._v(_vm._s(_vm.content.question))]),_vm._v(" "),_vm._l((_vm.content.poll),function(answer,i){return _c('v-card',{key:i,staticClass:"d-flex mt-2 mb-2 pa-2",class:{'white--text': _vm.selected != -1 && (answer.value/_vm.total) > 0.3},style:(("background: linear-gradient(90deg, rgba(32,150,243,1) 0%, rgba(32,150,243,1) " + (Math.floor((answer.value/_vm.total)*100)) + "%, rgba(255,255,255,1) " + (Math.floor((answer.value/_vm.total)*100) || 0) + "%, rgba(255,255,255,1) 100%);")),attrs:{"flat":_vm.selected != -1,"disabled":_vm.selected != -1,"rounded":"","light":""},on:{"click":function($event){return _vm.vote(i)}}},[(_vm.selected != -1)?_c('div',{staticStyle:{"font-weight":"bold","font-stretch":"ultra-condensed","border-right":"1px solid #E0E0E0","padding-right":"8px"}},[_vm._v(_vm._s(Math.floor((answer.value/_vm.total)*100))+"%")]):_c('div',{staticStyle:{"font-weight":"bold","font-stretch":"ultra-condensed","border-right":"1px solid #E0E0E0","padding-right":"8px"}},[_vm._v(_vm._s(i + 1))]),_vm._v(" "),_c('div',{staticStyle:{"padding-left":"8px"}},[_vm._v(_vm._s(answer.text))])])})],2):_c('div',{staticClass:"center"},[_c('v-text-field',{staticStyle:{"width":"50%"},attrs:{"rounded":"","solo":"","light":"","type":"text","placeholder":"Escribe la pregunta"},model:{value:(_vm.content.question),callback:function ($$v) {_vm.$set(_vm.content, "question", $$v);},expression:"content.question"}}),_vm._v(" "),_vm._l((_vm.content.poll),function(answer,i){return _c('v-card',{key:i,staticClass:"d-flex pa-2 mb-2",attrs:{"hover":"","light":""}},[_c('div',{staticStyle:{"font-weight":"bold","font-stretch":"ultra-condensed","border-right":"1px solid #E0E0E0","padding-right":"8px"}},[_vm._v(_vm._s(i + 1))]),_vm._v(" "),_c('div',{staticStyle:{"padding-left":"8px"}},[_vm._v(_vm._s(answer.text))]),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('i',{staticStyle:{}},[_vm._v("Votado "+_vm._s(answer.value)+" veces - "),_c('b',[_vm._v(_vm._s(Math.floor((answer.value/_vm.total)*100))+"%")])])],1)}),_vm._v(" "),_c('div',{staticClass:"mt-2",staticStyle:{"padding":"0"}},[_c('v-text-field',{attrs:{"solo":"","light":"","type":"text","placeholder":"Respuesta"},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.addAnswer($event)}},model:{value:(_vm.text),callback:function ($$v) {_vm.text=$$v;},expression:"text"}},[_c('v-btn',{attrs:{"slot":"append","small":"","color":"blue","dark":"","rounded":""},on:{"click":_vm.addAnswer},slot:"append"},[_c('v-icon',[_vm._v("mdi-plus")]),_vm._v("\n                    Añadir\n                ")],1)],1)],1)],2)])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
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
