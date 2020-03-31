var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var linkPrevue_min = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){function t(r){if(n[r]){ return n[r].exports; }var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=2)}([function(e,t,n){function r(e){n(7);}var i=n(5)(n(1),n(6),r,"data-v-1b901162",null);e.exports=i.exports;},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"link-prevue",props:{url:{type:String,default:""},cardWidth:{type:String,default:"400px"},onButtonClick:{type:Function,default:void 0},showButton:{type:Boolean,default:!0},apiUrl:{type:String,default:"https://linkpreview-api.herokuapp.com/"}},watch:{url:function(e){this.response=null,this.getLinkPreview();}},created:function(){this.getLinkPreview();},data:function(){return {response:null,validUrl:!1}},methods:{viewMore:function(){if(void 0!==this.onButtonClick){ this.onButtonClick(this.response); }else{window.open(this.url,"_blank").focus();}},isValidUrl:function(e){var t=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;return this.validUrl=t.test(e),this.validUrl},getLinkPreview:function(){var e=this;this.isValidUrl(this.url)&&this.httpRequest(function(t){e.response=JSON.parse(t);},function(){e.response=null,e.validUrl=!1;});},httpRequest:function(e,t){var n=new XMLHttpRequest,r="url="+this.url;n.open("POST",this.apiUrl,!0),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){4===n.readyState&&200===n.status&&e(n.responseText),4===n.readyState&&500===n.status&&t();},n.send(r);}}};},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n.n(r);t.default=i.a;},function(e,t,n){t=e.exports=n(4)(void 0),t.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Hind+Siliguri:400,600);",""]),t.push([e.i,".wrapper[data-v-1b901162]{overflow:auto;border-radius:7px 7px 7px 7px;background-color:#fff;-webkit-box-shadow:0 14px 32px 0 rgba(0,0,0,.15);-moz-box-shadow:0 14px 32px 0 rgba(0,0,0,.15);box-shadow:0 14px 32px 0 rgba(0,0,0,.15)}.card-img[data-v-1b901162]{width:100%}.card-img img[data-v-1b901162]{width:100%;border-radius:7px 7px 0 0}img[data-v-1b901162]{vertical-align:middle;border-style:none}.card-info[data-v-1b901162]{border-radius:0 0 7px 7px;background-color:#fff}.card-text[data-v-1b901162]{width:80%;margin:0 auto;text-align:justify}.card-text h1[data-v-1b901162]{text-align:center;font-size:24px;color:#474747;margin:5px 0;font-family:Hind Siliguri,sans-serif}.card-text p[data-v-1b901162]{font-family:Hind Siliguri,sans-serif;color:#8d8d8d;font-size:15px;overflow:hidden;margin:0;text-align:center}.card-btn[data-v-1b901162]{margin:1em 0;position:relative;text-align:center}.card-btn a[data-v-1b901162]{border-radius:2em;font-family:Hind Siliguri,sans-serif;font-size:14px;letter-spacing:.1em;color:#fff;background-color:#ffa9be;padding:10px 20px;text-align:center;display:inline-block;text-decoration:none!important;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-ms-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.card-btn a[data-v-1b901162]:hover{background-color:#ff8fab}.spinner[data-v-1b901162]{margin-top:40%;margin-left:45%;height:28px;width:28px;animation:rotate-data-v-1b901162 .8s infinite linear;border:5px solid #868686;border-right-color:transparent;border-radius:50%}@keyframes rotate-data-v-1b901162{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}",""]);},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i){ return n; }if(t&&"function"==typeof btoa){var o=r(i);return [n].concat(i.sources.map(function(e){return "/*# sourceURL="+i.sourceRoot+e+" */"})).concat([o]).join("\n")}return [n].join("\n")}function r(e){return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0);}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a));}},t};},function(e,t){e.exports=function(e,t,n,r,i){var o,a=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(o=e,a=e.default);var d="function"==typeof a?a.options:a;t&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns),r&&(d._scopeId=r);var u;if(i?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i);},d._ssrRegister=u):n&&(u=n),u){var l=d.functional,c=l?d.render:d.beforeCreate;l?d.render=function(e,t){return u.call(t),c(e,t)}:d.beforeCreate=c?[].concat(c,u):[u];}return {esModule:o,exports:a,options:d}};},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[!e.response&&e.validUrl?n("div",{style:{width:e.cardWidth},attrs:{id:"loader-container"}},[e._t("loading",[n("div",{staticClass:"spinner"})])],2):e._e(),e._v(" "),e.response?n("div",[e._t("default",[n("div",{staticClass:"wrapper",style:{width:e.cardWidth}},[n("div",{staticClass:"card-img"},[n("img",{attrs:{src:e.response.images[0]}})]),e._v(" "),n("div",{staticClass:"card-info"},[n("div",{staticClass:"card-text"},[n("h1",[e._v(e._s(e.response.title))]),e._v(" "),n("p",[e._v(e._s(e.response.description))])]),e._v(" "),n("div",{staticClass:"card-btn"},[e.showButton?n("a",{attrs:{href:"javascript:;"},on:{click:e.viewMore}},[e._v("View More")]):e._e()])])])],{img:e.response.images[0],title:e.response.title,description:e.response.description,url:e.url})],2):e._e()])},staticRenderFns:[]};},function(e,t,n){var r=n(3);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(8)("f1f23ef6",r,!0);},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=l[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++){ r.parts[i](n.parts[i]); }for(;i<n.parts.length;i++){ r.parts.push(o(n.parts[i])); }r.parts.length>n.parts.length&&(r.parts.length=n.parts.length);}else{for(var a=[],i=0;i<n.parts.length;i++){ a.push(o(n.parts[i])); }l[n.id]={id:n.id,refs:1,parts:a};}}}function i(){var e=document.createElement("style");return e.type="text/css",c.appendChild(e),e}function o(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(v){ return h; }r.parentNode.removeChild(r);}if(g){var o=f++;r=p||(p=i()),t=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0);}else { r=i(),t=s.bind(null,r),n=function(){r.parentNode.removeChild(r);}; }return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap){ return; }t(e=r);}else { n(); }}}function a(e,t,n,r){var i=n?"":r.css;if(e.styleSheet){ e.styleSheet.cssText=m(t,i); }else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o);}}function s(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet){ e.styleSheet.cssText=n; }else{for(;e.firstChild;){ e.removeChild(e.firstChild); }e.appendChild(document.createTextNode(n));}}var d="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!d){ throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."); }var u=n(9),l={},c=d&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,v=!1,h=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){v=n;var i=u(e,t);return r(i),function(t){for(var n=[],o=0;o<i.length;o++){var a=i[o],s=l[a.id];s.refs--,n.push(s);}t?(i=u(e,t),r(i)):i=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var d=0;d<s.parts.length;d++){ s.parts[d](); }delete l[s.id];}}}};var m=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();},function(e,t){e.exports=function(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s=o[1],d=o[2],u=o[3],l={id:e+":"+i,css:s,media:d,sourceMap:u};r[a]?r[a].parts.push(l):n.push(r[a]={id:a,parts:[l]});}return n};}])});

});

var LinkPrevue = unwrapExports(linkPrevue_min);
var linkPrevue_min_1 = linkPrevue_min.LinkPrevue;

//

var script = {
    name: 'web-template',

    data: function data() {
        return {
            url: "",
            colors: ["white", "kred", "kblue", "kyellow", "red", "blue", "brown", "grey", "green", "orange", "purple", "black"]
        }
    },

    components: {
        LinkPrevue: LinkPrevue
    },

    props: {
        content: Object, 
        user: Object, 
        card: Object,
        isMiniature: Boolean,
        edit: Boolean
    },

    methods: {
        toLink: function toLink(link) {
            window.open(link);
        },

        changeColor: function changeColor(color) {
            this.content.color = color;
            this.$forceUpdate(); 
        },

        reduceText: function reduceText(text, amount) {
            if (text.length >= amount) {
                return text.substr(0, amount) + '...'
            }
            else {
                return text
            }
        }
    },

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"pa-4",attrs:{"tile":"","dark":typeof _vm.content.color != 'undefined' && _vm.content.color != 'white',"outlined":"","color":!_vm.content.color ? 'white' : _vm.content.color,"id":"webtemplate"}},[(_vm.edit)?_c('div',[_c('v-subheader',[_vm._v("Link Preview")]),_vm._v(" "),_c('v-text-field',{staticStyle:{"margin-bottom":"8px"},attrs:{"outlined":"","color":!_vm.content.color || _vm.content.color == 'white' ? 'kblue' : 'white',"type":"text","label":"Url","append-icon":"mdi-magnify","placeholder":"Escribe la url"},model:{value:(_vm.url),callback:function ($$v) {_vm.url=$$v;},expression:"url"}}),_vm._v(" "),_c('v-subheader',[_vm._v("Colores")]),_vm._v(" "),_c('v-layout',{staticClass:"mb-6"},_vm._l((_vm.colors),function(color){return _c('div',{key:color,staticClass:"mr-2",staticStyle:{"border-radius":"50%","border":"1px solid black","cursor":"pointer"}},[_c('v-avatar',{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{"size":32,"color":color},on:{"click":function($event){return _vm.changeColor(color)}}},[(color == _vm.content.color)?_c('v-icon',{attrs:{"light":""}},[_vm._v("mdi-check")]):_vm._e()],1)],1)}),0)],1):_vm._e(),_vm._v(" "),_c('link-prevue',{staticStyle:{"cursor":"pointer"},attrs:{"url":_vm.url},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_c('div',{on:{"click":function($event){return _vm.toLink(props.url)}}},[_c('v-layout',{attrs:{"align-center":"","justify-space-between":""}},[_c('v-flex',{attrs:{"xs3":""}},[_c('img',{staticStyle:{"width":"100%"},attrs:{"id":"icon","src":props.img,"alt":props.title}})]),_vm._v(" "),_c('v-flex',{attrs:{"xs9":""}},[_c('div',{staticClass:"card-block"},[_c('h2',{staticClass:"text-truncate"},[_vm._v(_vm._s(props.title))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(props.description))])])])],1)],1)]}}])})],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-7e8a9c99_0", { source: ".card[data-v-7e8a9c99]{width:100%;cursor:pointer;background-color:#fff;transition:all .3s cubic-bezier(.25,.8,.25,1)}.card-block[data-v-7e8a9c99]{margin:16px}.horizontal[data-v-7e8a9c99]{display:flex}.input[data-v-7e8a9c99]{width:100%;padding:8px;font-size:1.2em;border:0;font-weight:lighter}.input:hover .input[data-v-7e8a9c99]:focus{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}.button[data-v-7e8a9c99]{background-color:#4383e9;border-radius:24px;padding:8px 16px 8px 16px;color:#fff;width:100%;border:0;font-weight:700;font-family:Nunito;cursor:pointer}.button[data-v-7e8a9c99]:hover{background-color:#4888f4}input[data-v-7e8a9c99]:focus,textarea[data-v-7e8a9c99]:focus{outline:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-7e8a9c99";
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
