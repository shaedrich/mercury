(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("incremental-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["incremental-dom"], factory);
	else if(typeof exports === 'object')
		exports["skate"] = factory(require("incremental-dom"));
	else
		root["skate"] = factory(root["IncrementalDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return connected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return created; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ctorCreateInitProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ctorObservedAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ctorProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ctorPropsMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return renderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return rendering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return rendererDebounced; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return updated; });
var connected = '____skate_connected';
var created = '____skate_created';

// DEPRECATED
//
// This is the only "symbol" that must stay a string. This is because it is
// relied upon across several versions. We should remove it, but ensure that
// it's considered a breaking change that whatever version removes it cannot
// be passed to vdom functions as tag names.
var name = '____skate_name';

// Used on the Constructor
var ctorCreateInitProps = '____skate_ctor_createInitProps';
var ctorObservedAttributes = '____skate_ctor_observedAttributes';
var ctorProps = '____skate_ctor_props';
var ctorPropsMap = '____skate_ctor_propsMap';

// Used on the Element
var props = '____skate_props';
var ref = '____skate_ref';
var renderer = '____skate_renderer';
var rendering = '____skate_rendering';
var rendererDebounced = '____skate_rendererDebounced';
var updated = '____skate_updated';

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__is_type__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = getPropNamesAndSymbols;

/**
 * Returns array of owned property names and symbols for the given object
 */
function getPropNamesAndSymbols() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var listOfKeys = Object.getOwnPropertyNames(obj);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__is_type__["a" /* isFunction */])(Object.getOwnPropertySymbols) ? listOfKeys.concat(Object.getOwnPropertySymbols(obj)) : listOfKeys;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isUndefined; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isFunction = function isFunction(val) {
  return typeof val === 'function';
};
var isObject = function isObject(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null;
};
var isString = function isString(val) {
  return typeof val === 'string';
};
var isSymbol = function isSymbol(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'symbol';
};
var isUndefined = function isUndefined(val) {
  return typeof val === 'undefined';
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony default export */ __webpack_exports__["a"] = typeof window === 'undefined' ? global : window;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(37)))

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__get_prop_names_and_symbols__ = __webpack_require__(1);


// We are not using Object.assign if it is defined since it will cause problems when Symbol is polyfilled.
// Apparently Object.assign (or any polyfill for this method) does not copy non-native Symbols.
/* harmony default export */ __webpack_exports__["a"] = function (obj) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  args.forEach(function (arg) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__get_prop_names_and_symbols__["a" /* default */])(arg).forEach(function (nameOrSymbol) {
      return obj[nameOrSymbol] = arg[nameOrSymbol];
    });
  }); // eslint-disable-line no-return-assign
  return obj;
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (element) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var data = element.__SKATE_DATA || (element.__SKATE_DATA = {});
  return namespace && (data[namespace] || (data[namespace] = {})) || data; // eslint-disable-line no-mixed-operators
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (val) {
  return typeof val === 'undefined' || val === null;
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_symbols__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_assign__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_get_prop_names_and_symbols__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_get_props_map__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_is_type__ = __webpack_require__(2);






function get(elem) {
  var props = {};

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_get_prop_names_and_symbols__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_get_props_map__["a" /* default */])(elem.constructor)).forEach(function (nameOrSymbol) {
    props[nameOrSymbol] = elem[nameOrSymbol];
  });

  return props;
}

function set(elem, newProps) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_assign__["a" /* default */])(elem, newProps);
  if (elem[__WEBPACK_IMPORTED_MODULE_0__util_symbols__["d" /* renderer */]]) {
    elem[__WEBPACK_IMPORTED_MODULE_0__util_symbols__["d" /* renderer */]]();
  }
}

/* harmony default export */ __webpack_exports__["a"] = function (elem, newProps) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_is_type__["b" /* isUndefined */])(newProps) ? get(elem) : set(elem, newProps);
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_incremental_dom__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_incremental_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_symbols__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_assign__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_create_symbol__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_data__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_debounce__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_attributes_manager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_get_own_property_descriptors__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_get_prop_names_and_symbols__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_get_props_map__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__props__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lifecycle_props_init__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__util_is_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__polyfills_object_is__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__util_set_ctor_native_property__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__util_root__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


















var HTMLElement = __WEBPACK_IMPORTED_MODULE_15__util_root__["a" /* default */].HTMLElement || function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  return _class;
}();
var _prevName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_create_symbol__["a" /* default */])('prevName');
var _prevOldValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_create_symbol__["a" /* default */])('prevOldValue');
var _prevNewValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_create_symbol__["a" /* default */])('prevNewValue');

// TEMPORARY: Once deprecations in this file are removed, this can be removed.
function deprecated(elem, oldUsage, newUsage) {
  if (process.env.NODE_ENV !== 'production') {
    var ownerName = elem.localName ? elem.localName : String(elem);
    console.warn(ownerName + ' ' + oldUsage + ' is deprecated. Use ' + newUsage + '.');
  }
}

function preventDoubleCalling(elem, name, oldValue, newValue) {
  return name === elem[_prevName] && oldValue === elem[_prevOldValue] && newValue === elem[_prevNewValue];
}

// TODO remove when not catering to Safari < 10.
function createNativePropertyDescriptors(Ctor) {
  var propDefs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util_get_props_map__["a" /* default */])(Ctor);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util_get_prop_names_and_symbols__["a" /* default */])(propDefs).reduce(function (propDescriptors, nameOrSymbol) {
    propDescriptors[nameOrSymbol] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__lifecycle_props_init__["a" /* createNativePropertyDescriptor */])(propDefs[nameOrSymbol]);
    return propDescriptors;
  }, {});
}

// TODO refactor when not catering to Safari < 10.
//
// We should be able to simplify this where all we do is Object.defineProperty().
function createInitProps(Ctor) {
  var propDescriptors = createNativePropertyDescriptors(Ctor);

  return function (elem) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util_get_prop_names_and_symbols__["a" /* default */])(propDescriptors).forEach(function (nameOrSymbol) {
      var propDescriptor = propDescriptors[nameOrSymbol];
      propDescriptor.beforeDefineProperty(elem);

      // We check here before defining to see if the prop was specified prior
      // to upgrading.
      var hasPropBeforeUpgrading = nameOrSymbol in elem;

      // This is saved prior to defining so that we can set it after it it was
      // defined prior to upgrading. We don't want to invoke the getter if we
      // don't need to, so we only get the value if we need to re-sync.
      var valueBeforeUpgrading = hasPropBeforeUpgrading && elem[nameOrSymbol];

      // https://bugs.webkit.org/show_bug.cgi?id=49739
      //
      // When Webkit fixes that bug so that native property accessors can be
      // retrieved, we can move defining the property to the prototype and away
      // from having to do if for every instance as all other browsers support
      // this.
      Object.defineProperty(elem, nameOrSymbol, propDescriptor);

      // DEPRECATED
      //
      // We'll be removing get / set callbacks on properties. Use the
      // updatedCallback() instead.
      //
      // We re-set the prop if it was specified prior to upgrading because we
      // need to ensure set() is triggered both in polyfilled environments and
      // in native where the definition may be registerd after elements it
      // represents have already been created.
      if (hasPropBeforeUpgrading) {
        elem[nameOrSymbol] = valueBeforeUpgrading;
      }
    });
  };
}

var _class2 = function (_HTMLElement) {
  _inherits(_class2, _HTMLElement);

  _createClass(_class2, null, [{
    key: 'observedAttributes',


    /**
     * Returns unique attribute names configured with props and
     * those set on the Component constructor if any
     */
    get: function get() {
      var attrsOnCtor = this.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_1__util_symbols__["f" /* ctorObservedAttributes */]) ? this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["f" /* ctorObservedAttributes */]] : [];
      var propDefs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util_get_props_map__["a" /* default */])(this);

      // Use Object.keys to skips symbol props since they have no linked attributes
      var attrsFromLinkedProps = Object.keys(propDefs).map(function (propName) {
        return propDefs[propName].attrSource;
      }).filter(Boolean);

      var all = attrsFromLinkedProps.concat(attrsOnCtor).concat(_get(_class2.__proto__ || Object.getPrototypeOf(_class2), 'observedAttributes', this));
      return all.filter(function (item, index) {
        return all.indexOf(item) === index;
      });
    },
    set: function set(value) {
      value = Array.isArray(value) ? value : [];
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__util_set_ctor_native_property__["a" /* default */])(this, 'observedAttributes', value);
    }

    // Returns superclass props overwritten with this Component props

  }, {
    key: 'props',
    get: function get() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_assign__["a" /* default */])({}, _get(_class2.__proto__ || Object.getPrototypeOf(_class2), 'props', this), this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["g" /* ctorProps */]]);
    },
    set: function set(value) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__util_set_ctor_native_property__["a" /* default */])(this, __WEBPACK_IMPORTED_MODULE_1__util_symbols__["g" /* ctorProps */], value);
    }

    // Passing args is designed to work with document-register-element. It's not
    // necessary for the webcomponents/custom-element polyfill.

  }]);

  function _class2() {
    var _ref;

    _classCallCheck(this, _class2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args)));

    var constructor = _this.constructor;

    // Used for the ready() function so it knows when it can call its callback.

    _this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["c" /* created */]] = true;

    // TODO refactor to not cater to Safari < 10. This means we can depend on
    // built-in property descriptors.
    // Must be defined on constructor and not from a superclass
    if (!constructor.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_1__util_symbols__["h" /* ctorCreateInitProps */])) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__util_set_ctor_native_property__["a" /* default */])(constructor, __WEBPACK_IMPORTED_MODULE_1__util_symbols__["h" /* ctorCreateInitProps */], createInitProps(constructor));
    }

    // Set up a renderer that is debounced for property sets to call directly.
    _this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["i" /* rendererDebounced */]] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_debounce__["a" /* default */])(_this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["d" /* renderer */]].bind(_this));

    // Set up property lifecycle.
    var propDefsCount = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util_get_prop_names_and_symbols__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util_get_props_map__["a" /* default */])(constructor)).length;
    if (propDefsCount && constructor[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["h" /* ctorCreateInitProps */]]) {
      constructor[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["h" /* ctorCreateInitProps */]](_this);
    }

    // DEPRECATED
    //
    // static render()
    // Note that renderCallback is an optional method!
    if (!_this.renderCallback && constructor.render) {
      deprecated(_this, 'static render', 'renderCallback');
      _this.renderCallback = constructor.render.bind(constructor, _this);
    }

    // DEPRECATED
    //
    // static created()
    //
    // Props should be set up before calling this.
    var created = constructor.created;

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__util_is_type__["a" /* isFunction */])(created)) {
      deprecated(_this, 'static created', 'constructor');
      created(_this);
    }

    // DEPRECATED
    //
    // Feature has rarely been used.
    //
    // Created should be set before invoking the ready listeners.
    var elemData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_data__["a" /* default */])(_this);
    var readyCallbacks = elemData.readyCallbacks;
    if (readyCallbacks) {
      readyCallbacks.forEach(function (cb) {
        return cb(_this);
      });
      delete elemData.readyCallbacks;
    }
    return _this;
  }

  // Custom Elements v1


  _createClass(_class2, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      // Reflect attributes pending values
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_attributes_manager__["a" /* default */])(this).resumeAttributesUpdates();

      // Used to check whether or not the component can render.
      this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["j" /* connected */]] = true;

      // Render!
      this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["i" /* rendererDebounced */]]();

      // DEPRECATED
      //
      // static attached()
      var attached = this.constructor.attached;

      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__util_is_type__["a" /* isFunction */])(attached)) {
        deprecated(this, 'static attached', 'connectedCallback');
        attached(this);
      }

      // DEPRECATED
      //
      // We can remove this once all browsers support :defined.
      this.setAttribute('defined', '');
    }

    // Custom Elements v1

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      // Suspend updating attributes until re-connected
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_attributes_manager__["a" /* default */])(this).suspendAttributesUpdates();

      // Ensures the component can't be rendered while disconnected.
      this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["j" /* connected */]] = false;

      // DEPRECATED
      //
      // static detached()
      var detached = this.constructor.detached;

      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__util_is_type__["a" /* isFunction */])(detached)) {
        deprecated(this, 'static detached', 'disconnectedCallback');
        detached(this);
      }
    }

    // Custom Elements v1

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {
      // Polyfill calls this twice.
      if (preventDoubleCalling(this, name, oldValue, newValue)) {
        return;
      }

      // Set data so we can prevent double calling if the polyfill.
      this[_prevName] = name;
      this[_prevOldValue] = oldValue;
      this[_prevNewValue] = newValue;

      var propNameOrSymbol = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_data__["a" /* default */])(this, 'attrSourceLinks')[name];
      if (propNameOrSymbol) {
        var changedExternally = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_attributes_manager__["a" /* default */])(this).onAttributeChanged(name, newValue);
        if (changedExternally) {
          // Sync up the property.
          var propDef = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util_get_props_map__["a" /* default */])(this.constructor)[propNameOrSymbol];
          var newPropVal = newValue !== null && propDef.deserialize ? propDef.deserialize(newValue) : newValue;

          var propData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_data__["a" /* default */])(this, 'props')[propNameOrSymbol];
          propData.settingPropFromAttrSource = true;
          this[propNameOrSymbol] = newPropVal;
          propData.settingPropFromAttrSource = false;
        }
      }

      // DEPRECATED
      //
      // static attributeChanged()
      var attributeChanged = this.constructor.attributeChanged;

      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__util_is_type__["a" /* isFunction */])(attributeChanged)) {
        deprecated(this, 'static attributeChanged', 'attributeChangedCallback');
        attributeChanged(this, { name: name, newValue: newValue, oldValue: oldValue });
      }
    }

    // Skate

  }, {
    key: 'updatedCallback',
    value: function updatedCallback(prevProps) {
      if (this.constructor.hasOwnProperty('updated')) {
        deprecated(this, 'static updated', 'updatedCallback');
      }
      return this.constructor.updated(this, prevProps);
    }

    // Skate

  }, {
    key: 'renderedCallback',
    value: function renderedCallback() {
      if (this.constructor.hasOwnProperty('rendered')) {
        deprecated(this, 'static rendered', 'renderedCallback');
      }
      return this.constructor.rendered(this);
    }

    // Skate
    //
    // Maps to the static renderer() callback. That logic should be moved here
    // when that is finally removed.
    // TODO: finalize how to support different rendering strategies.

  }, {
    key: 'rendererCallback',
    value: function rendererCallback() {
      // TODO: cannot move code here because tests expects renderer function to still exist on constructor!
      return this.constructor.renderer(this);
    }

    // Skate
    // @internal
    // Invokes the complete render lifecycle.

  }, {
    key: __WEBPACK_IMPORTED_MODULE_1__util_symbols__["d" /* renderer */],
    value: function value() {
      if (this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["k" /* rendering */]] || !this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["j" /* connected */]]) {
        return;
      }

      // Flag as rendering. This prevents anything from trying to render - or
      // queueing a render - while there is a pending render.
      this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["k" /* rendering */]] = true;
      if (this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["l" /* updated */]]() && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__util_is_type__["a" /* isFunction */])(this.renderCallback)) {
        this.rendererCallback();
        this.renderedCallback();
      }

      this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["k" /* rendering */]] = false;
    }

    // Skate
    // @internal
    // Calls the updatedCallback() with previous props.

  }, {
    key: __WEBPACK_IMPORTED_MODULE_1__util_symbols__["l" /* updated */],
    value: function value() {
      var prevProps = this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["m" /* props */]];
      this[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["m" /* props */]] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__props__["a" /* default */])(this);
      return this.updatedCallback(prevProps);
    }

    // Skate

  }], [{
    key: 'extend',
    value: function extend() {
      var definition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var Base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      // Create class for the user.
      var Ctor = function (_Base) {
        _inherits(Ctor, _Base);

        function Ctor() {
          _classCallCheck(this, Ctor);

          return _possibleConstructorReturn(this, (Ctor.__proto__ || Object.getPrototypeOf(Ctor)).apply(this, arguments));
        }

        return Ctor;
      }(Base);

      // For inheriting from the object literal.


      var opts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util_get_own_property_descriptors__["a" /* default */])(definition);
      var prot = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util_get_own_property_descriptors__["a" /* default */])(definition.prototype);

      // Prototype is non configurable (but is writable).
      delete opts.prototype;

      // Pass on static and instance members from the definition.
      Object.defineProperties(Ctor, opts);
      Object.defineProperties(Ctor.prototype, prot);

      return Ctor;
    }

    // Skate
    //
    // DEPRECATED
    //
    // Stubbed in case any subclasses are calling it.

  }, {
    key: 'rendered',
    value: function rendered() {}

    // Skate
    //
    // DEPRECATED
    //
    // Move this to rendererCallback() before removing.

  }, {
    key: 'renderer',
    value: function renderer(elem) {
      if (!elem.shadowRoot) {
        elem.attachShadow({ mode: 'open' });
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["patchInner"])(elem.shadowRoot, function () {
        var possibleFn = elem.renderCallback(elem);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__util_is_type__["a" /* isFunction */])(possibleFn)) {
          possibleFn();
        } else if (Array.isArray(possibleFn)) {
          possibleFn.forEach(function (fn) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__util_is_type__["a" /* isFunction */])(fn)) {
              fn();
            }
          });
        }
      });
    }

    // Skate
    //
    // DEPRECATED
    //
    // Move this to updatedCallback() before removing.

  }, {
    key: 'updated',
    value: function updated(elem, previousProps) {
      // The 'previousProps' will be undefined if it is the initial render.
      if (!previousProps) {
        return true;
      }

      // The 'previousProps' will always contain all of the keys.
      //
      // Use classic loop because:
      // 'for ... in' skips symbols and 'for ... of' is not working yet with IE!?
      // for (let nameOrSymbol of getPropNamesAndSymbols(previousProps)) {
      var namesAndSymbols = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util_get_prop_names_and_symbols__["a" /* default */])(previousProps);
      for (var i = 0; i < namesAndSymbols.length; i++) {
        var nameOrSymbol = namesAndSymbols[i];

        // With Object.is NaN is equal to NaN
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__polyfills_object_is__["a" /* default */])(previousProps[nameOrSymbol], elem[nameOrSymbol])) {
          return true;
        }
      }

      return false;
    }
  }]);

  return _class2;
}(HTMLElement);

_class2.is = '';
/* harmony default export */ __webpack_exports__["a"] = _class2;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(13)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__to_null_or_string__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is_type__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = getAttrMgr;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




/**
 * @internal
 * Attributes Manager
 *
 * Postpones attributes updates until when connected.
 */

var AttributesManager = function () {
  function AttributesManager(elem) {
    _classCallCheck(this, AttributesManager);

    this.elem = elem;
    this.connected = false;
    this.pendingValues = {};
    this.lastSetValues = {};
  }

  /**
   * Called from disconnectedCallback
   */


  _createClass(AttributesManager, [{
    key: 'suspendAttributesUpdates',
    value: function suspendAttributesUpdates() {
      this.connected = false;
    }

    /**
     * Called from connectedCallback
     */

  }, {
    key: 'resumeAttributesUpdates',
    value: function resumeAttributesUpdates() {
      var _this = this;

      this.connected = true;
      var names = Object.keys(this.pendingValues);
      names.forEach(function (name) {
        var value = _this.pendingValues[name];
        // Skip if already cleared
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__is_type__["b" /* isUndefined */])(value)) {
          delete _this.pendingValues[name];
          _this._syncAttrValue(name, value);
        }
      });
    }

    /**
     * Returns true if the value is different from the one set internally
     * using setAttrValue()
     */

  }, {
    key: 'onAttributeChanged',
    value: function onAttributeChanged(name, value) {
      value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__to_null_or_string__["a" /* default */])(value);

      // A new attribute value voids the pending one
      this._clearPendingValue(name);

      var changed = this.lastSetValues[name] !== value;
      this.lastSetValues[name] = value;
      return changed;
    }

    /**
     * Updates or removes the attribute if value === null.
     *
     * When the component is not connected the value is saved and
     * the attribute is only updated when the component is re-connected.
     */

  }, {
    key: 'setAttrValue',
    value: function setAttrValue(name, value) {
      value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__to_null_or_string__["a" /* default */])(value);

      this.lastSetValues[name] = value;

      if (this.connected) {
        this._clearPendingValue(name);
        this._syncAttrValue(name, value);
      } else {
        this.pendingValues[name] = value;
      }
    }
  }, {
    key: '_syncAttrValue',
    value: function _syncAttrValue(name, value) {
      var currAttrValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__to_null_or_string__["a" /* default */])(this.elem.getAttribute(name));
      if (value !== currAttrValue) {
        if (value === null) {
          this.elem.removeAttribute(name);
        } else {
          this.elem.setAttribute(name, value);
        }
      }
    }
  }, {
    key: '_clearPendingValue',
    value: function _clearPendingValue(name) {
      if (name in this.pendingValues) {
        delete this.pendingValues[name];
      }
    }
  }]);

  return AttributesManager;
}();

// Only used by getAttrMgr


var $attributesMgr = '____skate_attributesMgr';

/**
 * @internal
 * Returns attribute manager instance for the given Component
 */
function getAttrMgr(elem) {
  var mgr = elem[$attributesMgr];
  if (!mgr) {
    mgr = new AttributesManager(elem);
    elem[$attributesMgr] = mgr;
  }
  return mgr;
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__symbols__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__get_prop_names_and_symbols__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prop_definition__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__set_ctor_native_property__ = __webpack_require__(11);
/* harmony export (immutable) */ __webpack_exports__["a"] = getPropsMap;





/**
 * Memoizes a map of PropDefinition for the given component class.
 * Keys in the map are the properties name which can a string or a symbol.
 *
 * The map is created from the result of: static get props
 */
function getPropsMap(Ctor) {
  // Must be defined on constructor and not from a superclass
  if (!Ctor.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_0__symbols__["e" /* ctorPropsMap */])) {
    (function () {
      var props = Ctor.props || {};

      var propsMap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__get_prop_names_and_symbols__["a" /* default */])(props).reduce(function (result, nameOrSymbol) {
        result[nameOrSymbol] = new __WEBPACK_IMPORTED_MODULE_2__prop_definition__["a" /* default */](nameOrSymbol, props[nameOrSymbol]);
        return result;
      }, {});
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__set_ctor_native_property__["a" /* default */])(Ctor, __WEBPACK_IMPORTED_MODULE_0__symbols__["e" /* ctorPropsMap */], propsMap);
    })();
  }

  return Ctor[__WEBPACK_IMPORTED_MODULE_0__symbols__["e" /* ctorPropsMap */]];
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setCtorNativeProperty;
/**
 * This is needed to avoid IE11 "stack size errors" when creating
 * a new property on the constructor of an HTMLElement
 */
function setCtorNativeProperty(Ctor, propName, value) {
  Object.defineProperty(Ctor, propName, { configurable: true, value: value });
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__empty__ = __webpack_require__(6);

/**
 * Attributes value can only be null or string;
 */
var toNullOrString = function toNullOrString(val) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__empty__["a" /* default */])(val) ? null : String(val);
};

/* harmony default export */ __webpack_exports__["a"] = toNullOrString;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_prop__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_symbols__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_vdom__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_component__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_define__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_emit__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_link__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_props__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_ready__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_3__api_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "define", function() { return __WEBPACK_IMPORTED_MODULE_4__api_define__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "emit", function() { return __WEBPACK_IMPORTED_MODULE_5__api_emit__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "link", function() { return __WEBPACK_IMPORTED_MODULE_6__api_link__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "prop", function() { return __WEBPACK_IMPORTED_MODULE_0__api_prop__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "props", function() { return __WEBPACK_IMPORTED_MODULE_7__api_props__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ready", function() { return __WEBPACK_IMPORTED_MODULE_8__api_ready__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "symbols", function() { return __WEBPACK_IMPORTED_MODULE_1__api_symbols__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vdom", function() { return __WEBPACK_IMPORTED_MODULE_2__api_vdom__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });










var h = __WEBPACK_IMPORTED_MODULE_2__api_vdom__["builder"]();



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_unique_id__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_root__ = __webpack_require__(3);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





/* harmony default export */ __webpack_exports__["a"] = function () {
  var customElements = __WEBPACK_IMPORTED_MODULE_2__util_root__["a" /* default */].customElements,
      HTMLElement = __WEBPACK_IMPORTED_MODULE_2__util_root__["a" /* default */].HTMLElement;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var name = args[0],
      Ctor = args[1];


  if (!customElements) {
    throw new Error('Skate requires native custom element support or a polyfill.');
  }

  // DEPRECATED remove when removing the "name" argument.
  if (process.env.NODE_ENV !== 'production' && args.length === 2) {
    console.warn('The "name" argument to define() is deprecated. Please define a `static is` property on the constructor instead.');
  }

  // DEPRECATED remove when removing the "name" argument.
  if (args.length === 1) {
    Ctor = name;
    name = null;
  }

  // DEPRECATED Object literals.
  if ((typeof Ctor === 'undefined' ? 'undefined' : _typeof(Ctor)) === 'object') {
    Ctor = __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */].extend(Ctor);
  }

  // Ensure a custom element is passed.
  if (!(Ctor.prototype instanceof HTMLElement)) {
    throw new Error('You must provide a constructor that extends HTMLElement to define().');
  }

  // DEPRECATED two arguments
  if (args.length === 2) {
    customElements.define(customElements.get(name) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_unique_id__["a" /* default */])(name) : name, Ctor);
  } else {
    // We must use hasOwnProperty() because we want to know if it was specified
    // directly on this class, not subclasses, as we don't want to inherit tag
    // names from subclasses.
    if (!Ctor.hasOwnProperty('is')) {
      // If we used defineProperty() then the consumer must also use it and
      // cannot use property initialisers. Instead we just set it so they can
      // use whatever method of overridding that they want.
      Ctor.is = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_unique_id__["a" /* default */])();
    }
    customElements.define(Ctor.is, Ctor);
  }

  // The spec doesn't return but this allows for a simpler, more concise API.
  return Ctor;
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(13)))

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__(3);


var Event = function (TheEvent) {
  if (TheEvent) {
    try {
      new TheEvent('emit-init'); // eslint-disable-line no-new
    } catch (e) {
      return undefined;
    }
  }
  return TheEvent;
}(__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* default */].Event);

function createCustomEvent(name) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var detail = opts.detail;

  delete opts.detail;

  var e = void 0;
  if (Event) {
    e = new Event(name, opts);
    Object.defineProperty(e, 'detail', { value: detail });
  } else {
    e = document.createEvent('CustomEvent');
    Object.defineProperty(e, 'composed', { value: opts.composed });
    e.initCustomEvent(name, opts.bubbles, opts.cancelable, detail);
  }
  return e;
}

/* harmony default export */ __webpack_exports__["a"] = function (elem, name) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (opts.bubbles === undefined) {
    opts.bubbles = true;
  }
  if (opts.cancelable === undefined) {
    opts.cancelable = true;
  }
  if (opts.composed === undefined) {
    opts.composed = true;
  }
  return elem.dispatchEvent(createCustomEvent(name, opts));
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__props__ = __webpack_require__(7);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function getValue(elem) {
  var type = elem.type;
  if (type === 'checkbox' || type === 'radio') {
    return elem.checked ? elem.value || true : false;
  }
  return elem.value;
}

/* harmony default export */ __webpack_exports__["a"] = function (elem, target) {
  return function (e) {
    // We fallback to checking the composed path. Unfortunately this behaviour
    // is difficult to impossible to reproduce as it seems to be a possible
    // quirk in the shadydom polyfill that incorrectly returns null for the
    // target but has the target as the first point in the path.
    // TODO revisit once all browsers have native support.
    var localTarget = e.target || e.composedPath()[0];
    var value = getValue(localTarget);
    var localTargetName = target || localTarget.name || 'value';

    if (localTargetName.indexOf('.') > -1) {
      var parts = localTargetName.split('.');
      var firstPart = parts[0];
      var propName = parts.pop();
      var obj = parts.reduce(function (prev, curr) {
        return prev && prev[curr];
      }, elem);

      obj[propName || e.target.name] = value;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__props__["a" /* default */])(elem, _defineProperty({}, firstPart, elem[firstPart]));
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__props__["a" /* default */])(elem, _defineProperty({}, localTargetName, value));
    }
  };
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_assign__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_empty__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_to_null_or_string__ = __webpack_require__(12);
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boolean", function() { return boolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object", function() { return object; });




function create(def) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.unshift({}, def);
    return __WEBPACK_IMPORTED_MODULE_0__util_assign__["a" /* default */].apply(undefined, args);
  };
}

var parseIfNotEmpty = function parseIfNotEmpty(val) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_empty__["a" /* default */])(val) ? null : JSON.parse(val);
};

var array = create({
  coerce: function coerce(val) {
    return Array.isArray(val) ? val : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_empty__["a" /* default */])(val) ? null : [val];
  },
  default: function _default() {
    return [];
  },
  deserialize: parseIfNotEmpty,
  serialize: JSON.stringify
});

var boolean = create({
  coerce: function coerce(val) {
    return !!val;
  },
  default: false,
  // TODO: 'false' string must deserialize to false for angular 1.x to work
  // This breaks one existing test.
  // deserialize: val => !(val === null || val === 'false'),
  deserialize: function deserialize(val) {
    return !(val === null);
  },
  serialize: function serialize(val) {
    return val ? '' : null;
  }
});

// defaults empty to 0 and allows NaN
var zeroIfEmptyOrNumberIncludesNaN = function zeroIfEmptyOrNumberIncludesNaN(val) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_empty__["a" /* default */])(val) ? 0 : Number(val);
};

var number = create({
  default: 0,
  coerce: zeroIfEmptyOrNumberIncludesNaN,
  deserialize: zeroIfEmptyOrNumberIncludesNaN,
  serialize: __WEBPACK_IMPORTED_MODULE_2__util_to_null_or_string__["a" /* default */]
});

var string = create({
  default: '',
  coerce: __WEBPACK_IMPORTED_MODULE_2__util_to_null_or_string__["a" /* default */],
  deserialize: __WEBPACK_IMPORTED_MODULE_2__util_to_null_or_string__["a" /* default */],
  serialize: __WEBPACK_IMPORTED_MODULE_2__util_to_null_or_string__["a" /* default */]
});

var object = create({
  default: function _default() {
    return {};
  },
  deserialize: parseIfNotEmpty,
  serialize: JSON.stringify
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_symbols__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_data__ = __webpack_require__(5);



/* harmony default export */ __webpack_exports__["a"] = function (elem, done) {
  var info = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_data__["a" /* default */])(elem);
  if (elem[__WEBPACK_IMPORTED_MODULE_0__util_symbols__["c" /* created */]]) {
    done(elem);
  } else if (info.readyCallbacks) {
    info.readyCallbacks.push(done);
  } else {
    info.readyCallbacks = [done];
  }
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_symbols__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return __WEBPACK_IMPORTED_MODULE_0__util_symbols__["b"]; });
// DEPRECTAED
//
// We should not be relying on internals for symbols as this creates version
// coupling. We will move forward with platform agnostic ways of doing this.


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_incremental_dom__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_incremental_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_symbols__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_prop_context__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_root__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["element"] = element;
/* harmony export (immutable) */ __webpack_exports__["builder"] = builder;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr", function() { return newAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementClose", function() { return newElementClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementOpen", function() { return newElementOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementOpenEnd", function() { return newElementOpenEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementOpenStart", function() { return newElementOpenStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementVoid", function() { return newElementVoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return newText; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint no-plusplus: 0 */






var customElements = __WEBPACK_IMPORTED_MODULE_3__util_root__["a" /* default */].customElements,
    HTMLElement = __WEBPACK_IMPORTED_MODULE_3__util_root__["a" /* default */].HTMLElement;

var applyDefault = __WEBPACK_IMPORTED_MODULE_0_incremental_dom__["attributes"][__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["symbols"].default];

// A stack of children that corresponds to the current function helper being
// executed.
var stackChren = [];

var $skip = '__skip';
var $currentEventHandlers = '__events';
var $stackCurrentHelperProps = '__props';

// The current function helper in the stack.
var stackCurrentHelper = void 0;

// This is used for the Incremental DOM overrides to keep track of what args
// to pass the main elementOpen() function.
var overrideArgs = void 0;

// The number of levels deep after skipping a tree.
var skips = 0;

var noop = function noop() {};

// Adds or removes an event listener for an element.
function applyEvent(elem, ename, newFunc) {
  var events = elem[$currentEventHandlers];

  if (!events) {
    events = elem[$currentEventHandlers] = {};
  }

  // Undefined indicates that there is no listener yet.
  if (typeof events[ename] === 'undefined') {
    // We only add a single listener once. Originally this was a workaround for
    // the Webcomponents ShadyDOM polyfill not removing listeners, but it's
    // also a simpler model for binding / unbinding events because you only
    // have a single handler you need to worry about and a single place where
    // you only store one event handler
    elem.addEventListener(ename, function (e) {
      if (events[ename]) {
        events[ename].call(this, e);
      }
    });
  }

  // Not undefined indicates that we have set a listener, so default to null.
  events[ename] = typeof newFunc === 'function' ? newFunc : null;
}

var attributesContext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_prop_context__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["attributes"], _defineProperty({
  // Attributes that shouldn't be applied to the DOM.
  key: noop,
  statics: noop,

  // Attributes that *must* be set via a property on all elements.
  checked: __WEBPACK_IMPORTED_MODULE_0_incremental_dom__["applyProp"],
  className: __WEBPACK_IMPORTED_MODULE_0_incremental_dom__["applyProp"],
  disabled: __WEBPACK_IMPORTED_MODULE_0_incremental_dom__["applyProp"],
  value: __WEBPACK_IMPORTED_MODULE_0_incremental_dom__["applyProp"],

  // Ref handler.
  ref: function ref(elem, name, value) {
    elem[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["a" /* ref */]] = value;
  },


  // Skip handler.
  skip: function skip(elem, name, value) {
    if (value) {
      elem[$skip] = true;
    } else {
      delete elem[$skip];
    }
  }
}, __WEBPACK_IMPORTED_MODULE_0_incremental_dom__["symbols"].default, function (elem, name, value) {
  var ce = customElements.get(elem.localName);
  var props = ce && ce.props || {};
  var prototype = ce && ce.prototype || {};

  // TODO when refactoring properties to not have to workaround the old
  // WebKit bug we can remove the "name in props" check below.
  //
  // NOTE: That the "name in elem" check won't work for polyfilled custom
  // elements that set a property that isn't explicitly specified in "props"
  // or "prototype" unless it is added to the element explicitly as a
  // property prior to passing the prop to the vdom function. For example, if
  // it were added in a lifecycle callback because it wouldn't have been
  // upgraded yet.
  //
  // We prefer setting props, so we do this if there's a property matching
  // name that was passed. However, certain props on SVG elements are
  // readonly and error when you try to set them.
  if ((name in props || name in elem || name in prototype) && !('ownerSVGElement' in elem)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["applyProp"])(elem, name, value);
    return;
  }

  // Explicit false removes the attribute.
  if (value === false) {
    applyDefault(elem, name);
    return;
  }

  // Handle built-in and custom events.
  if (name.indexOf('on') === 0) {
    var firstChar = name[2];
    var eventName = void 0;

    if (firstChar === '-') {
      eventName = name.substring(3);
    } else if (firstChar === firstChar.toUpperCase()) {
      eventName = firstChar.toLowerCase() + name.substring(3);
    }

    if (eventName) {
      applyEvent(elem, eventName, value);
      return;
    }
  }

  applyDefault(elem, name, value);
}));

function resolveTagName(name) {
  // We return falsy values as some wrapped IDOM functions allow empty values.
  if (!name) {
    return name;
  }

  // We try and return the cached tag name, if one exists. This will work with
  // *any* web component of any version that defines a `static is` property.
  if (name.is) {
    return name.is;
  }

  // Get the name for the custom element by constructing it and using the
  // localName property. Cache it and lookup the cached value for future calls.
  if (name.prototype instanceof HTMLElement) {
    if (name[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["b" /* name */]]) {
      return name[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["b" /* name */]];
    }

    // eslint-disable-next-line
    var elem = new name();
    return elem[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["b" /* name */]] = elem.localName;
  }

  // Pass all other values through so IDOM gets what it's expecting.
  return name;
}

// Incremental DOM's elementOpen is where the hooks in `attributes` are applied,
// so it's the only function we need to execute in the context of our attributes.
var elementOpen = attributesContext(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["elementOpen"]);

function elementOpenStart(tag) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var statics = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  overrideArgs = [tag, key, statics];
}

function elementOpenEnd() {
  var node = newElementOpen.apply(undefined, _toConsumableArray(overrideArgs)); // eslint-disable-line no-use-before-define
  overrideArgs = null;
  return node;
}

function wrapIdomFunc(func) {
  var tnameFuncHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  return function wrap() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args[0] = resolveTagName(args[0]);
    stackCurrentHelper = null;
    if (typeof args[0] === 'function') {
      // If we've encountered a function, handle it according to the type of
      // function that is being wrapped.
      stackCurrentHelper = args[0];
      return tnameFuncHandler.apply(undefined, args);
    } else if (stackChren.length) {
      // We pass the wrap() function in here so that when it's called as
      // children, it will queue up for the next stack, if there is one.
      stackChren[stackChren.length - 1].push([wrap, args]);
    } else {
      if (func === elementOpen) {
        if (skips) {
          return ++skips;
        }

        var elem = func.apply(undefined, args);

        if (elem[$skip]) {
          ++skips;
        }

        return elem;
      }

      if (func === __WEBPACK_IMPORTED_MODULE_0_incremental_dom__["elementClose"]) {
        if (skips === 1) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["skip"])();
        }

        // We only want to skip closing if it's not the last closing tag in the
        // skipped tree because we keep the element that initiated the skpping.
        if (skips && --skips) {
          return;
        }

        var _elem = func.apply(undefined, args);
        var ref = _elem[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["a" /* ref */]];

        // We delete so that it isn't called again for the same element. If the
        // ref changes, or the element changes, this will be defined again.
        delete _elem[__WEBPACK_IMPORTED_MODULE_1__util_symbols__["a" /* ref */]];

        // Execute the saved ref after esuring we've cleand up after it.
        if (typeof ref === 'function') {
          ref(_elem);
        }

        return _elem;
      }

      // We must call elementOpenStart and elementOpenEnd even if we are
      // skipping because they queue up attributes and then call elementClose.
      if (!skips || func === elementOpenStart || func === elementOpenEnd) {
        return func.apply(undefined, args);
      }
    }
  };
}

function newAttr() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (stackCurrentHelper) {
    stackCurrentHelper[$stackCurrentHelperProps][args[0]] = args[1];
  } else if (stackChren.length) {
    stackChren[stackChren.length - 1].push([newAttr, args]);
  } else {
    overrideArgs.push(args[0]);
    overrideArgs.push(args[1]);
  }
}

function stackOpen(tname, key, statics) {
  var props = { key: key, statics: statics };

  for (var _len3 = arguments.length, attrs = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    attrs[_key3 - 3] = arguments[_key3];
  }

  for (var a = 0; a < attrs.length; a += 2) {
    props[attrs[a]] = attrs[a + 1];
  }
  tname[$stackCurrentHelperProps] = props;
  stackChren.push([]);
}

function stackClose(tname) {
  var chren = stackChren.pop();
  var props = tname[$stackCurrentHelperProps];
  delete tname[$stackCurrentHelperProps];
  var elemOrFn = tname(props, function () {
    return chren.forEach(function (args) {
      return args[0].apply(args, _toConsumableArray(args[1]));
    });
  });
  return typeof elemOrFn === 'function' ? elemOrFn() : elemOrFn;
}

// Incremental DOM overrides
// -------------------------

// We must override internal functions that call internal Incremental DOM
// functions because we can't override the internal references. This means
// we must roughly re-implement their behaviour. Luckily, they're fairly
// simple.
var newElementOpenStart = wrapIdomFunc(elementOpenStart, stackOpen);
var newElementOpenEnd = wrapIdomFunc(elementOpenEnd);

// Standard open / closed overrides don't need to reproduce internal behaviour
// because they are the ones referenced from *End and *Start.
var newElementOpen = wrapIdomFunc(elementOpen, stackOpen);
var newElementClose = wrapIdomFunc(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["elementClose"], stackClose);

// Ensure we call our overridden functions instead of the internal ones.
function newElementVoid(tag) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  newElementOpen.apply(undefined, [tag].concat(args));
  return newElementClose(tag);
}

// Text override ensures their calls can queue if using function helpers.
var newText = wrapIdomFunc(__WEBPACK_IMPORTED_MODULE_0_incremental_dom__["text"]);

// Convenience function for declaring an Incremental DOM element using
// hyperscript-style syntax.
function element(tname, attrs) {
  var atype = typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs);

  // If attributes are a function, then they should be treated as children.

  for (var _len5 = arguments.length, chren = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
    chren[_key5 - 2] = arguments[_key5];
  }

  if (atype === 'function' || atype === 'string' || atype === 'number') {
    chren.unshift(attrs);
  }

  // Ensure the attributes are an object. Null is considered an object so we
  // have to test for this explicitly.
  if (attrs === null || atype !== 'object') {
    attrs = {};
  }

  // We open the element so we can set attrs after.
  newElementOpenStart(tname, attrs.key, attrs.statics);

  // Delete so special attrs don't actually get set.
  delete attrs.key;
  delete attrs.statics;

  // Set attributes.
  Object.keys(attrs).forEach(function (name) {
    return newAttr(name, attrs[name]);
  });

  // Close before we render the descendant tree.
  newElementOpenEnd(tname);

  chren.forEach(function (ch) {
    var ctype = typeof ch === 'undefined' ? 'undefined' : _typeof(ch);
    if (ctype === 'function') {
      ch();
    } else if (ctype === 'string' || ctype === 'number') {
      newText(ch);
    } else if (Array.isArray(ch)) {
      ch.forEach(function (sch) {
        return sch();
      });
    }
  });

  return newElementClose(tname);
}

// Even further convenience for building a DSL out of JavaScript functions or hooking into standard
// transpiles for JSX (React.createElement() / h).
function builder() {
  for (var _len6 = arguments.length, tags = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tags[_key6] = arguments[_key6];
  }

  if (tags.length === 0) {
    return function () {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return element.bind.apply(element, [null].concat(args));
    };
  }
  return tags.map(function (tag) {
    return function () {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return element.bind.apply(element, [null, tag].concat(args));
    };
  });
}

// We don't have to do anything special for the text function; it's just a
// straight export from Incremental DOM.


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_symbols__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_data__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_empty__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_attributes_manager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_get_default_value__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_get_initial_value__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_get_prop_data__ = __webpack_require__(32);
/* harmony export (immutable) */ __webpack_exports__["a"] = createNativePropertyDescriptor;








function createNativePropertyDescriptor(propDef) {
  var nameOrSymbol = propDef.nameOrSymbol;


  var prop = {
    configurable: true,
    enumerable: true
  };

  prop.beforeDefineProperty = function (elem) {
    var propData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_get_prop_data__["a" /* default */])(elem, nameOrSymbol);
    var attrSource = propDef.attrSource;

    // Store attrSource name to property link.
    if (attrSource) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_data__["a" /* default */])(elem, 'attrSourceLinks')[attrSource] = nameOrSymbol;
    }

    // prop value before upgrading
    var initialValue = elem[nameOrSymbol];

    // Set up initial value if it wasn't specified.
    var valueFromAttrSource = false;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_empty__["a" /* default */])(initialValue)) {
      if (attrSource && elem.hasAttribute(attrSource)) {
        valueFromAttrSource = true;
        initialValue = propDef.deserialize(elem.getAttribute(attrSource));
      } else if ('initial' in propDef) {
        initialValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_get_initial_value__["a" /* default */])(elem, propDef);
      } else {
        initialValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_get_default_value__["a" /* default */])(elem, propDef);
      }
    }

    initialValue = propDef.coerce(initialValue);

    propData.internalValue = initialValue;

    // Reflect to Target Attribute
    var mustReflect = propDef.attrTarget && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_empty__["a" /* default */])(initialValue) && (!valueFromAttrSource || propDef.attrTargetIsNotSource);

    if (mustReflect) {
      var serializedValue = propDef.serialize(initialValue);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_attributes_manager__["a" /* default */])(elem).setAttrValue(propDef.attrTarget, serializedValue);
    }
  };

  prop.get = function get() {
    var propData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_get_prop_data__["a" /* default */])(this, nameOrSymbol);
    var internalValue = propData.internalValue;

    return propDef.get ? propDef.get(this, { name: nameOrSymbol, internalValue: internalValue }) : internalValue;
  };

  prop.set = function set(newValue) {
    var propData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_get_prop_data__["a" /* default */])(this, nameOrSymbol);

    var useDefaultValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_empty__["a" /* default */])(newValue);
    if (useDefaultValue) {
      newValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_get_default_value__["a" /* default */])(this, propDef);
    }

    newValue = propDef.coerce(newValue);

    if (propDef.set) {
      var oldValue = propData.oldValue;


      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_empty__["a" /* default */])(oldValue)) {
        oldValue = null;
      }
      var changeData = { name: nameOrSymbol, newValue: newValue, oldValue: oldValue };
      propDef.set(this, changeData);
    }

    // Queue a re-render.
    this[__WEBPACK_IMPORTED_MODULE_0__util_symbols__["i" /* rendererDebounced */]](this);

    // Update prop data so we can use it next time.
    propData.internalValue = propData.oldValue = newValue;

    // Reflect to Target attribute.
    var mustReflect = propDef.attrTarget && (propDef.attrTargetIsNotSource || !propData.settingPropFromAttrSource);
    if (mustReflect) {
      // Note: setting the prop to empty implies the default value
      // and therefore no attribute should be present!
      var serializedValue = useDefaultValue ? null : propDef.serialize(newValue);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_attributes_manager__["a" /* default */])(this).setAttrValue(propDef.attrTarget, serializedValue);
    }
  };

  return prop;
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Polyfill Object.is for IE
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
if (!Object.is) {
  Object.is = function (x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  };
}
/* harmony default export */ __webpack_exports__["a"] = Object.is;

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createSymbol;
function createSymbol(description) {
  return typeof Symbol === 'function' ? Symbol(description) : description;
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (str) {
  return str.split(/([A-Z])/).reduce(function (one, two, idx) {
    var dash = !one || idx % 2 === 0 ? '' : '-';
    return '' + one + dash + two.toLowerCase();
  });
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__native__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__root__ = __webpack_require__(3);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }




var MutationObserver = __WEBPACK_IMPORTED_MODULE_1__root__["a" /* default */].MutationObserver;


function microtaskDebounce(cbFunc) {
  var scheduled = false;
  var i = 0;
  var cbArgs = [];
  var elem = document.createElement('span');
  var observer = new MutationObserver(function () {
    cbFunc.apply(undefined, _toConsumableArray(cbArgs));
    scheduled = false;
    cbArgs = null;
  });

  observer.observe(elem, { childList: true });

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    cbArgs = args;
    if (!scheduled) {
      scheduled = true;
      elem.textContent = '' + i;
      i += 1;
    }
  };
}

// We have to use setTimeout() for IE9 and 10 because the Mutation Observer
// polyfill requires that the element be in the document to trigger Mutation
// Events. Mutation Events are also synchronous and thus wouldn't debounce.
//
// The soonest we can set the timeout for in IE is 1 as they have issues when
// setting to 0.
function taskDebounce(cbFunc) {
  var scheduled = false;
  var cbArgs = [];
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    cbArgs = args;
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        cbFunc.apply(undefined, _toConsumableArray(cbArgs));
      }, 1);
    }
  };
}
/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__native__["a" /* default */])(MutationObserver) ? microtaskDebounce : taskDebounce;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = error;
function error(message) {
  throw new Error(message);
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDefaultValue;
function getDefaultValue(elem, propDef) {
  return typeof propDef.default === 'function' ? propDef.default(elem, { name: propDef.nameOrSymbol }) : propDef.default;
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getInitialValue;
function getInitialValue(elem, propDef) {
  return typeof propDef.initial === 'function' ? propDef.initial(elem, { name: propDef.nameOrSymbol }) : propDef.initial;
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__get_prop_names_and_symbols__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__get_prop_names_and_symbols__["a" /* default */])(obj).reduce(function (prev, nameOrSymbol) {
    prev[nameOrSymbol] = Object.getOwnPropertyDescriptor(obj, nameOrSymbol);
    return prev;
  }, {});
};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = getPropData;


function getPropData(elem, name) {
  var elemData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__data__["a" /* default */])(elem, 'props');
  return elemData[name] || (elemData[name] = {});
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var nativeHints = ['native code', '[object MutationObserverConstructor]' // for mobile safari iOS 9.0
];
/* harmony default export */ __webpack_exports__["a"] = function (fn) {
  return nativeHints.map(function (hint) {
    return (fn || '').toString().indexOf([hint]) > -1;
  }).reduce(function (a, b) {
    return a || b;
  });
};

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assign__ = __webpack_require__(4);


function enter(object, props) {
  var saved = {};
  Object.keys(props).forEach(function (key) {
    saved[key] = object[key];
    object[key] = props[key];
  });
  return saved;
}

function exit(object, saved) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__assign__["a" /* default */])(object, saved);
}

// Decorates a function with a side effect that changes the properties of an
// object during its execution, and restores them after. There is no error
// handling here, if the wrapped function throws an error, properties are not
// restored and all bets are off.
/* harmony default export */ __webpack_exports__["a"] = function (object, props) {
  return function (func) {
    return function () {
      var saved = enter(object, props);
      var result = func.apply(undefined, arguments);
      exit(object, saved);
      return result;
    };
  };
};

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dash_case__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__empty__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__is_type__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






/**
 * @internal
 * Property Definition
 *
 * Internal meta data and strategies for a property.
 * Created from the options of a PropOptions config object.
 *
 * Once created a PropDefinition should be treated as immutable and final.
 * 'getPropsMap' function memoizes PropDefinitions by Component's Class.
 *
 * The 'attribute' option is normalized to 'attrSource' and 'attrTarget' properties.
 */

var PropDefinition = function () {
  function PropDefinition(nameOrSymbol, propOptions) {
    var _this = this;

    _classCallCheck(this, PropDefinition);

    this._nameOrSymbol = nameOrSymbol;

    propOptions = propOptions || {};

    // default 'attrSource': no observed source attribute (name)
    this.attrSource = null;

    // default 'attrTarget': no reflected target attribute (name)
    this.attrTarget = null;

    // default 'attrTargetIsNotSource'
    this.attrTargetIsNotSource = false;

    // default 'coerce': identity function
    this.coerce = function (value) {
      return value;
    };

    // default 'default': set prop to 'null'
    this.default = null;

    // default 'deserialize': return attribute's value (string or null)
    this.deserialize = function (value) {
      return value;
    };

    // default 'get': no function
    this.get = null;

    // 'initial' default: unspecified
    // 'initial' option is truly optional and it cannot be initialized.
    // Its presence is tested using: ('initial' in propDef)

    // 'serialize' default: return string value or null
    this.serialize = function (value) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__empty__["a" /* default */])(value) ? null : String(value);
    };

    // default 'set': no function
    this.set = null;

    // Note: option key is always a string (no symbols here)
    Object.keys(propOptions).forEach(function (option) {
      var optVal = propOptions[option];

      // Only accept documented options and perform minimal input validation.
      switch (option) {
        case 'attribute':
          if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__is_type__["c" /* isObject */])(optVal)) {
            _this.attrSource = _this.attrTarget = resolveAttrName(optVal, nameOrSymbol);
          } else {
            var source = optVal.source,
                target = optVal.target;

            if (!source && !target) {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__error__["a" /* default */])(option + ' \'source\' or \'target\' is missing.');
            }
            _this.attrSource = resolveAttrName(source, nameOrSymbol);
            _this.attrTarget = resolveAttrName(target, nameOrSymbol);
            _this.attrTargetIsNotSource = _this.attrTarget !== _this.attrSource;
          }
          break;
        case 'coerce':
        case 'deserialize':
        case 'get':
        case 'serialize':
        case 'set':
          if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__is_type__["a" /* isFunction */])(optVal)) {
            _this[option] = optVal;
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__error__["a" /* default */])(option + ' must be a function.');
          }
          break;
        case 'default':
        case 'initial':
          _this[option] = optVal;
          break;
        default:
          // TODO: undocumented options?
          _this[option] = optVal;
          break;
      }
    });
  }

  _createClass(PropDefinition, [{
    key: 'nameOrSymbol',
    get: function get() {
      return this._nameOrSymbol;
    }
  }]);

  return PropDefinition;
}();

/* harmony default export */ __webpack_exports__["a"] = PropDefinition;


function resolveAttrName(attrOption, nameOrSymbol) {
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__is_type__["d" /* isSymbol */])(nameOrSymbol)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__error__["a" /* default */])(nameOrSymbol.toString() + ' symbol property cannot have an attribute.');
  } else {
    if (attrOption === true) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dash_case__["a" /* default */])(String(nameOrSymbol));
    }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__is_type__["e" /* isString */])(attrOption)) {
      return attrOption;
    }
  }
  return null;
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = uniqueId;
// DEPRECATED prefix when we deprecated the name argument to define()
function uniqueId(prefix) {
  // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523
  var rand = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    // eslint-disable-next-line no-mixed-operators
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  return (prefix || 'x') + '-' + rand;
}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ })
/******/ ]);
});

},{"incremental-dom":2}],2:[function(require,module,exports){

/**
 * @license
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A cached reference to the hasOwnProperty function.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * A cached reference to the create function.
 */
var create = Object.create;

/**
 * Used to prevent property collisions between our "map" and its prototype.
 * @param {!Object<string, *>} map The map to check.
 * @param {string} property The property to check.
 * @return {boolean} Whether map has property.
 */
var has = function (map, property) {
  return hasOwnProperty.call(map, property);
};

/**
 * Creates an map object without a prototype.
 * @return {!Object}
 */
var createMap = function () {
  return create(null);
};

/**
 * Keeps track of information needed to perform diffs for a given DOM node.
 * @param {!string} nodeName
 * @param {?string=} key
 * @constructor
 */
function NodeData(nodeName, key) {
  /**
   * The attributes and their values.
   * @const {!Object<string, *>}
   */
  this.attrs = createMap();

  /**
   * An array of attribute name/value pairs, used for quickly diffing the
   * incomming attributes to see if the DOM node's attributes need to be
   * updated.
   * @const {Array<*>}
   */
  this.attrsArr = [];

  /**
   * The incoming attributes for this Node, before they are updated.
   * @const {!Object<string, *>}
   */
  this.newAttrs = createMap();

  /**
   * The key used to identify this node, used to preserve DOM nodes when they
   * move within their parent.
   * @const
   */
  this.key = key;

  /**
   * Keeps track of children within this node by their key.
   * {?Object<string, !Element>}
   */
  this.keyMap = null;

  /**
   * Whether or not the keyMap is currently valid.
   * {boolean}
   */
  this.keyMapValid = true;

  /**
   * The node name for this node.
   * @const {string}
   */
  this.nodeName = nodeName;

  /**
   * @type {?string}
   */
  this.text = null;
}

/**
 * Initializes a NodeData object for a Node.
 *
 * @param {Node} node The node to initialize data for.
 * @param {string} nodeName The node name of node.
 * @param {?string=} key The key that identifies the node.
 * @return {!NodeData} The newly initialized data object
 */
var initData = function (node, nodeName, key) {
  var data = new NodeData(nodeName, key);
  node['__incrementalDOMData'] = data;
  return data;
};

/**
 * Retrieves the NodeData object for a Node, creating it if necessary.
 *
 * @param {Node} node The node to retrieve the data for.
 * @return {!NodeData} The NodeData for this Node.
 */
var getData = function (node) {
  var data = node['__incrementalDOMData'];

  if (!data) {
    var nodeName = node.nodeName.toLowerCase();
    var key = null;

    if (node instanceof Element) {
      key = node.getAttribute('key');
    }

    data = initData(node, nodeName, key);
  }

  return data;
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const */
var symbols = {
  default: '__default',

  placeholder: '__placeholder'
};

/**
 * @param {string} name
 * @return {string|undefined} The namespace to use for the attribute.
 */
var getNamespace = function (name) {
  if (name.lastIndexOf('xml:', 0) === 0) {
    return 'http://www.w3.org/XML/1998/namespace';
  }

  if (name.lastIndexOf('xlink:', 0) === 0) {
    return 'http://www.w3.org/1999/xlink';
  }
};

/**
 * Applies an attribute or property to a given Element. If the value is null
 * or undefined, it is removed from the Element. Otherwise, the value is set
 * as an attribute.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {?(boolean|number|string)=} value The attribute's value.
 */
var applyAttr = function (el, name, value) {
  if (value == null) {
    el.removeAttribute(name);
  } else {
    var attrNS = getNamespace(name);
    if (attrNS) {
      el.setAttributeNS(attrNS, name, value);
    } else {
      el.setAttribute(name, value);
    }
  }
};

/**
 * Applies a property to a given Element.
 * @param {!Element} el
 * @param {string} name The property's name.
 * @param {*} value The property's value.
 */
var applyProp = function (el, name, value) {
  el[name] = value;
};

/**
 * Applies a style to an Element. No vendor prefix expansion is done for
 * property names/values.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} style The style to set. Either a string of css or an object
 *     containing property-value pairs.
 */
var applyStyle = function (el, name, style) {
  if (typeof style === 'string') {
    el.style.cssText = style;
  } else {
    el.style.cssText = '';
    var elStyle = el.style;
    var obj = /** @type {!Object<string,string>} */style;

    for (var prop in obj) {
      if (has(obj, prop)) {
        elStyle[prop] = obj[prop];
      }
    }
  }
};

/**
 * Updates a single attribute on an Element.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value. If the value is an object or
 *     function it is set on the Element, otherwise, it is set as an HTML
 *     attribute.
 */
var applyAttributeTyped = function (el, name, value) {
  var type = typeof value;

  if (type === 'object' || type === 'function') {
    applyProp(el, name, value);
  } else {
    applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
  }
};

/**
 * Calls the appropriate attribute mutator for this attribute.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value.
 */
var updateAttribute = function (el, name, value) {
  var data = getData(el);
  var attrs = data.attrs;

  if (attrs[name] === value) {
    return;
  }

  var mutator = attributes[name] || attributes[symbols.default];
  mutator(el, name, value);

  attrs[name] = value;
};

/**
 * A publicly mutable object to provide custom mutators for attributes.
 * @const {!Object<string, function(!Element, string, *)>}
 */
var attributes = createMap();

// Special generic mutator that's called for any attribute that does not
// have a specific mutator.
attributes[symbols.default] = applyAttributeTyped;

attributes[symbols.placeholder] = function () {};

attributes['style'] = applyStyle;

/**
 * Gets the namespace to create an element (of a given tag) in.
 * @param {string} tag The tag to get the namespace for.
 * @param {?Node} parent
 * @return {?string} The namespace to create the tag in.
 */
var getNamespaceForTag = function (tag, parent) {
  if (tag === 'svg') {
    return 'http://www.w3.org/2000/svg';
  }

  if (getData(parent).nodeName === 'foreignObject') {
    return null;
  }

  return parent.namespaceURI;
};

/**
 * Creates an Element.
 * @param {Document} doc The document with which to create the Element.
 * @param {?Node} parent
 * @param {string} tag The tag for the Element.
 * @param {?string=} key A key to identify the Element.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element.
 * @return {!Element}
 */
var createElement = function (doc, parent, tag, key, statics) {
  var namespace = getNamespaceForTag(tag, parent);
  var el = undefined;

  if (namespace) {
    el = doc.createElementNS(namespace, tag);
  } else {
    el = doc.createElement(tag);
  }

  initData(el, tag, key);

  if (statics) {
    for (var i = 0; i < statics.length; i += 2) {
      updateAttribute(el, /** @type {!string}*/statics[i], statics[i + 1]);
    }
  }

  return el;
};

/**
 * Creates a Text Node.
 * @param {Document} doc The document with which to create the Element.
 * @return {!Text}
 */
var createText = function (doc) {
  var node = doc.createTextNode('');
  initData(node, '#text', null);
  return node;
};

/**
 * Creates a mapping that can be used to look up children using a key.
 * @param {?Node} el
 * @return {!Object<string, !Element>} A mapping of keys to the children of the
 *     Element.
 */
var createKeyMap = function (el) {
  var map = createMap();
  var child = el.firstElementChild;

  while (child) {
    var key = getData(child).key;

    if (key) {
      map[key] = child;
    }

    child = child.nextElementSibling;
  }

  return map;
};

/**
 * Retrieves the mapping of key to child node for a given Element, creating it
 * if necessary.
 * @param {?Node} el
 * @return {!Object<string, !Node>} A mapping of keys to child Elements
 */
var getKeyMap = function (el) {
  var data = getData(el);

  if (!data.keyMap) {
    data.keyMap = createKeyMap(el);
  }

  return data.keyMap;
};

/**
 * Retrieves a child from the parent with the given key.
 * @param {?Node} parent
 * @param {?string=} key
 * @return {?Node} The child corresponding to the key.
 */
var getChild = function (parent, key) {
  return key ? getKeyMap(parent)[key] : null;
};

/**
 * Registers an element as being a child. The parent will keep track of the
 * child using the key. The child can be retrieved using the same key using
 * getKeyMap. The provided key should be unique within the parent Element.
 * @param {?Node} parent The parent of child.
 * @param {string} key A key to identify the child with.
 * @param {!Node} child The child to register.
 */
var registerChild = function (parent, key, child) {
  getKeyMap(parent)[key] = child;
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const */
var notifications = {
  /**
   * Called after patch has compleated with any Nodes that have been created
   * and added to the DOM.
   * @type {?function(Array<!Node>)}
   */
  nodesCreated: null,

  /**
   * Called after patch has compleated with any Nodes that have been removed
   * from the DOM.
   * Note it's an applications responsibility to handle any childNodes.
   * @type {?function(Array<!Node>)}
   */
  nodesDeleted: null
};

/**
 * Keeps track of the state of a patch.
 * @constructor
 */
function Context() {
  /**
   * @type {(Array<!Node>|undefined)}
   */
  this.created = notifications.nodesCreated && [];

  /**
   * @type {(Array<!Node>|undefined)}
   */
  this.deleted = notifications.nodesDeleted && [];
}

/**
 * @param {!Node} node
 */
Context.prototype.markCreated = function (node) {
  if (this.created) {
    this.created.push(node);
  }
};

/**
 * @param {!Node} node
 */
Context.prototype.markDeleted = function (node) {
  if (this.deleted) {
    this.deleted.push(node);
  }
};

/**
 * Notifies about nodes that were created during the patch opearation.
 */
Context.prototype.notifyChanges = function () {
  if (this.created && this.created.length > 0) {
    notifications.nodesCreated(this.created);
  }

  if (this.deleted && this.deleted.length > 0) {
    notifications.nodesDeleted(this.deleted);
  }
};

/**
* Makes sure that keyed Element matches the tag name provided.
* @param {!string} nodeName The nodeName of the node that is being matched.
* @param {string=} tag The tag name of the Element.
* @param {?string=} key The key of the Element.
*/
var assertKeyedTagMatches = function (nodeName, tag, key) {
  if (nodeName !== tag) {
    throw new Error('Was expecting node with key "' + key + '" to be a ' + tag + ', not a ' + nodeName + '.');
  }
};

/** @type {?Context} */
var context = null;

/** @type {?Node} */
var currentNode = null;

/** @type {?Node} */
var currentParent = null;

/** @type {?Element|?DocumentFragment} */
var root = null;

/** @type {?Document} */
var doc = null;

/**
 * Returns a patcher function that sets up and restores a patch context,
 * running the run function with the provided data.
 * @param {function((!Element|!DocumentFragment),!function(T),T=)} run
 * @return {function((!Element|!DocumentFragment),!function(T),T=)}
 * @template T
 */
var patchFactory = function (run) {
  /**
   * TODO(moz): These annotations won't be necessary once we switch to Closure
   * Compiler's new type inference. Remove these once the switch is done.
   *
   * @param {(!Element|!DocumentFragment)} node
   * @param {!function(T)} fn
   * @param {T=} data
   * @template T
   */
  var f = function (node, fn, data) {
    var prevContext = context;
    var prevRoot = root;
    var prevDoc = doc;
    var prevCurrentNode = currentNode;
    var prevCurrentParent = currentParent;
    var previousInAttributes = false;
    var previousInSkip = false;

    context = new Context();
    root = node;
    doc = node.ownerDocument;
    currentParent = node.parentNode;

    if ('production' !== 'production') {}

    run(node, fn, data);

    if ('production' !== 'production') {}

    context.notifyChanges();

    context = prevContext;
    root = prevRoot;
    doc = prevDoc;
    currentNode = prevCurrentNode;
    currentParent = prevCurrentParent;
  };
  return f;
};

/**
 * Patches the document starting at node with the provided function. This
 * function may be called during an existing patch operation.
 * @param {!Element|!DocumentFragment} node The Element or Document
 *     to patch.
 * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
 *     calls that describe the DOM.
 * @param {T=} data An argument passed to fn to represent DOM state.
 * @template T
 */
var patchInner = patchFactory(function (node, fn, data) {
  currentNode = node;

  enterNode();
  fn(data);
  exitNode();

  if ('production' !== 'production') {}
});

/**
 * Patches an Element with the the provided function. Exactly one top level
 * element call should be made corresponding to `node`.
 * @param {!Element} node The Element where the patch should start.
 * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
 *     calls that describe the DOM. This should have at most one top level
 *     element call.
 * @param {T=} data An argument passed to fn to represent DOM state.
 * @template T
 */
var patchOuter = patchFactory(function (node, fn, data) {
  currentNode = /** @type {!Element} */{ nextSibling: node };

  fn(data);

  if ('production' !== 'production') {}
});

/**
 * Checks whether or not the current node matches the specified nodeName and
 * key.
 *
 * @param {?string} nodeName The nodeName for this node.
 * @param {?string=} key An optional key that identifies a node.
 * @return {boolean} True if the node matches, false otherwise.
 */
var matches = function (nodeName, key) {
  var data = getData(currentNode);

  // Key check is done using double equals as we want to treat a null key the
  // same as undefined. This should be okay as the only values allowed are
  // strings, null and undefined so the == semantics are not too weird.
  return nodeName === data.nodeName && key == data.key;
};

/**
 * Aligns the virtual Element definition with the actual DOM, moving the
 * corresponding DOM node to the correct location or creating it if necessary.
 * @param {string} nodeName For an Element, this should be a valid tag string.
 *     For a Text, this should be #text.
 * @param {?string=} key The key used to identify this element.
 * @param {?Array<*>=} statics For an Element, this should be an array of
 *     name-value pairs.
 */
var alignWithDOM = function (nodeName, key, statics) {
  if (currentNode && matches(nodeName, key)) {
    return;
  }

  var node = undefined;

  // Check to see if the node has moved within the parent.
  if (key) {
    node = getChild(currentParent, key);
    if (node && 'production' !== 'production') {
      assertKeyedTagMatches(getData(node).nodeName, nodeName, key);
    }
  }

  // Create the node if it doesn't exist.
  if (!node) {
    if (nodeName === '#text') {
      node = createText(doc);
    } else {
      node = createElement(doc, currentParent, nodeName, key, statics);
    }

    if (key) {
      registerChild(currentParent, key, node);
    }

    context.markCreated(node);
  }

  // If the node has a key, remove it from the DOM to prevent a large number
  // of re-orders in the case that it moved far or was completely removed.
  // Since we hold on to a reference through the keyMap, we can always add it
  // back.
  if (currentNode && getData(currentNode).key) {
    currentParent.replaceChild(node, currentNode);
    getData(currentParent).keyMapValid = false;
  } else {
    currentParent.insertBefore(node, currentNode);
  }

  currentNode = node;
};

/**
 * Clears out any unvisited Nodes, as the corresponding virtual element
 * functions were never called for them.
 */
var clearUnvisitedDOM = function () {
  var node = currentParent;
  var data = getData(node);
  var keyMap = data.keyMap;
  var keyMapValid = data.keyMapValid;
  var child = node.lastChild;
  var key = undefined;

  if (child === currentNode && keyMapValid) {
    return;
  }

  if (data.attrs[symbols.placeholder] && node !== root) {
    if ('production' !== 'production') {}
    return;
  }

  while (child !== currentNode) {
    node.removeChild(child);
    context.markDeleted( /** @type {!Node}*/child);

    key = getData(child).key;
    if (key) {
      delete keyMap[key];
    }
    child = node.lastChild;
  }

  // Clean the keyMap, removing any unusued keys.
  if (!keyMapValid) {
    for (key in keyMap) {
      child = keyMap[key];
      if (child.parentNode !== node) {
        context.markDeleted(child);
        delete keyMap[key];
      }
    }

    data.keyMapValid = true;
  }
};

/**
 * Changes to the first child of the current node.
 */
var enterNode = function () {
  currentParent = currentNode;
  currentNode = null;
};

/**
 * Changes to the next sibling of the current node.
 */
var nextNode = function () {
  if (currentNode) {
    currentNode = currentNode.nextSibling;
  } else {
    currentNode = currentParent.firstChild;
  }
};

/**
 * Changes to the parent of the current node, removing any unvisited children.
 */
var exitNode = function () {
  clearUnvisitedDOM();

  currentNode = currentParent;
  currentParent = currentParent.parentNode;
};

/**
 * Makes sure that the current node is an Element with a matching tagName and
 * key.
 *
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @return {!Element} The corresponding Element.
 */
var coreElementOpen = function (tag, key, statics) {
  nextNode();
  alignWithDOM(tag, key, statics);
  enterNode();
  return (/** @type {!Element} */currentParent
  );
};

/**
 * Closes the currently open Element, removing any unvisited children if
 * necessary.
 *
 * @return {!Element} The corresponding Element.
 */
var coreElementClose = function () {
  if ('production' !== 'production') {}

  exitNode();
  return (/** @type {!Element} */currentNode
  );
};

/**
 * Makes sure the current node is a Text node and creates a Text node if it is
 * not.
 *
 * @return {!Text} The corresponding Text Node.
 */
var coreText = function () {
  nextNode();
  alignWithDOM('#text', null, null);
  return (/** @type {!Text} */currentNode
  );
};

/**
 * Gets the current Element being patched.
 * @return {!Element}
 */
var currentElement = function () {
  if ('production' !== 'production') {}
  return (/** @type {!Element} */currentParent
  );
};

/**
 * Skips the children in a subtree, allowing an Element to be closed without
 * clearing out the children.
 */
var skip = function () {
  if ('production' !== 'production') {}
  currentNode = currentParent.lastChild;
};

/**
 * The offset in the virtual element declaration where the attributes are
 * specified.
 * @const
 */
var ATTRIBUTES_OFFSET = 3;

/**
 * Builds an array of arguments for use with elementOpenStart, attr and
 * elementOpenEnd.
 * @const {Array<*>}
 */
var argsBuilder = [];

/**
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} const_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
var elementOpen = function (tag, key, statics, const_args) {
  if ('production' !== 'production') {}

  var node = coreElementOpen(tag, key, statics);
  var data = getData(node);

  /*
   * Checks to see if one or more attributes have changed for a given Element.
   * When no attributes have changed, this is much faster than checking each
   * individual argument. When attributes have changed, the overhead of this is
   * minimal.
   */
  var attrsArr = data.attrsArr;
  var newAttrs = data.newAttrs;
  var attrsChanged = false;
  var i = ATTRIBUTES_OFFSET;
  var j = 0;

  for (; i < arguments.length; i += 1, j += 1) {
    if (attrsArr[j] !== arguments[i]) {
      attrsChanged = true;
      break;
    }
  }

  for (; i < arguments.length; i += 1, j += 1) {
    attrsArr[j] = arguments[i];
  }

  if (j < attrsArr.length) {
    attrsChanged = true;
    attrsArr.length = j;
  }

  /*
   * Actually perform the attribute update.
   */
  if (attrsChanged) {
    for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
      newAttrs[arguments[i]] = arguments[i + 1];
    }

    for (var _attr in newAttrs) {
      updateAttribute(node, _attr, newAttrs[_attr]);
      newAttrs[_attr] = undefined;
    }
  }

  return node;
};

/**
 * Declares a virtual Element at the current location in the document. This
 * corresponds to an opening tag and a elementClose tag is required. This is
 * like elementOpen, but the attributes are defined using the attr function
 * rather than being passed as arguments. Must be folllowed by 0 or more calls
 * to attr, then a call to elementOpenEnd.
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 */
var elementOpenStart = function (tag, key, statics) {
  if ('production' !== 'production') {}

  argsBuilder[0] = tag;
  argsBuilder[1] = key;
  argsBuilder[2] = statics;
};

/***
 * Defines a virtual attribute at this point of the DOM. This is only valid
 * when called between elementOpenStart and elementOpenEnd.
 *
 * @param {string} name
 * @param {*} value
 */
var attr = function (name, value) {
  if ('production' !== 'production') {}

  argsBuilder.push(name, value);
};

/**
 * Closes an open tag started with elementOpenStart.
 * @return {!Element} The corresponding Element.
 */
var elementOpenEnd = function () {
  if ('production' !== 'production') {}

  var node = elementOpen.apply(null, argsBuilder);
  argsBuilder.length = 0;
  return node;
};

/**
 * Closes an open virtual Element.
 *
 * @param {string} tag The element's tag.
 * @return {!Element} The corresponding Element.
 */
var elementClose = function (tag) {
  if ('production' !== 'production') {}

  var node = coreElementClose();

  if ('production' !== 'production') {}

  return node;
};

/**
 * Declares a virtual Element at the current location in the document that has
 * no children.
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} const_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
var elementVoid = function (tag, key, statics, const_args) {
  elementOpen.apply(null, arguments);
  return elementClose(tag);
};

/**
 * Declares a virtual Element at the current location in the document that is a
 * placeholder element. Children of this Element can be manually managed and
 * will not be cleared by the library.
 *
 * A key must be specified to make sure that this node is correctly preserved
 * across all conditionals.
 *
 * @param {string} tag The element's tag.
 * @param {string} key The key used to identify this element.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} const_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
var elementPlaceholder = function (tag, key, statics, const_args) {
  if ('production' !== 'production') {}

  elementOpen.apply(null, arguments);
  skip();
  return elementClose(tag);
};

/**
 * Declares a virtual Text at this point in the document.
 *
 * @param {string|number|boolean} value The value of the Text.
 * @param {...(function((string|number|boolean)):string)} const_args
 *     Functions to format the value which are called only when the value has
 *     changed.
 * @return {!Text} The corresponding text node.
 */
var text = function (value, const_args) {
  if ('production' !== 'production') {}

  var node = coreText();
  var data = getData(node);

  if (data.text !== value) {
    data.text = /** @type {string} */value;

    var formatted = value;
    for (var i = 1; i < arguments.length; i += 1) {
      /*
       * Call the formatter function directly to prevent leaking arguments.
       * https://github.com/google/incremental-dom/pull/204#issuecomment-178223574
       */
      var fn = arguments[i];
      formatted = fn(formatted);
    }

    node.data = formatted;
  }

  return node;
};

exports.patch = patchInner;
exports.patchInner = patchInner;
exports.patchOuter = patchOuter;
exports.currentElement = currentElement;
exports.skip = skip;
exports.elementVoid = elementVoid;
exports.elementOpenStart = elementOpenStart;
exports.elementOpenEnd = elementOpenEnd;
exports.elementOpen = elementOpen;
exports.elementClose = elementClose;
exports.elementPlaceholder = elementPlaceholder;
exports.text = text;
exports.attr = attr;
exports.symbols = symbols;
exports.attributes = attributes;
exports.applyAttr = applyAttr;
exports.applyProp = applyProp;
exports.notifications = notifications;


},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _skatejs = require('skatejs');

var skate = _interopRequireWildcard(_skatejs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import 'skatejs-web-components';


customElements.define('global-navigation', function (_skate$Component) {
	_inherits(_class, _skate$Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'i18n',
		value: function i18n(key) {
			// FIXME: lol
			return key.split('-').slice(-1).pop();
		}
	}, {
		key: 'style',
		value: function style() {
			return skate.h(
				'style',
				null,
				'@import \'http://wikiadesignsystem.com/assets/design-system.css\';',
				'.wds-global-navigation {\n\t\t\t\tz-index: 5000102;\n\t\t\t}'
			);
		}
	}, {
		key: 'logo',
		value: function logo(model) {
			if (!model.header) {
				return;
			}

			// FIXME svgs should be rendered based on model data
			return skate.h(
				'a',
				{ 'class': 'wds-global-navigation__logo', href: model.module.main.href },
				skate.h(
					'svg',
					{ 'class': 'wds-global-navigation__logo-image wds-is-wds-company-logo-fandom', xmlns: 'http://www.w3.org/2000/svg', width: '117', height: '23', viewBox: '0 0 117 23' },
					skate.h(
						'defs',
						null,
						skate.h(
							'linearGradient',
							{ id: 'logo-fandom-gradient', x1: '0%', x2: '63.848%', y1: '100%', y2: '32.54%' },
							skate.h('stop', { 'stop-color': '#94D11F', offset: '0%' }),
							skate.h('stop', { 'stop-color': '#09D3BF', offset: '100%' })
						)
					),
					skate.h(
						'g',
						{ 'fill-rule': 'evenodd' },
						skate.h('path', { d: 'M114.543 8.924c-1.028-1.086-2.48-1.66-4.197-1.66-1.748 0-3.18.79-4.062 2.23-.882-1.44-2.315-2.23-4.063-2.23-1.71 0-3.16.574-4.19 1.66-.96 1.013-1.48 2.432-1.48 3.997v6.48h3.24v-6.48c0-1.75.89-2.75 2.445-2.75s2.444 1.01 2.444 2.76v6.48h3.24v-6.48c0-1.75.89-2.75 2.44-2.75 1.554 0 2.444 1.005 2.444 2.756v6.48h3.24v-6.48c0-1.564-.53-2.983-1.487-3.996M37.3 1.467c-.26-.038-.53-.078-.81-.078-3.886 0-6.496 2.47-6.496 6.15V19.4h3.24v-8.717h3.397V7.78h-3.39v-.263c0-2.077 1.15-3.13 3.41-3.13.22 0 .43.035.657.073.085.014.17.03.26.042l.163.024v-3l-.13-.016-.29-.05m10.31 11.923c0 2.11-1.083 3.224-3.133 3.224-2.81 0-3.23-2.02-3.23-3.224 0-2.05 1.18-3.223 3.23-3.223 2.007 0 3.03 1.058 3.135 3.226m3.254.602c-.004-.226-.007-.43-.014-.61-.153-3.774-2.594-6.12-6.373-6.12-1.95 0-3.6.62-4.77 1.792-1.1 1.096-1.7 2.627-1.7 4.31 0 3.507 2.63 6.152 6.12 6.152 1.66 0 3.01-.6 3.92-1.736.134.534.32 1.05.56 1.54l.04.08h3.264l-.09-.19c-.91-1.938-.94-3.91-.96-5.217m8.774-6.73c-1.86 0-3.436.62-4.553 1.79-1.046 1.09-1.622 2.63-1.622 4.34v6.01h3.24v-6.01c0-2.05 1.07-3.23 2.935-3.23s2.938 1.174 2.938 3.223v6.01h3.237v-6.01c0-1.7-.576-3.24-1.622-4.336-1.115-1.17-2.69-1.79-4.552-1.79m17.61 6.125c0 2.11-1.085 3.224-3.135 3.224-2.812 0-3.232-2.02-3.232-3.224 0-2.05 1.18-3.22 3.235-3.22 2.006 0 3.03 1.055 3.134 3.223m2.786 0V3.095h-3.13v4.85c-.994-.423-1.724-.68-2.962-.68-3.82 0-6.385 2.453-6.385 6.103 0 3.5 2.655 6.15 6.17 6.15 1.79 0 3.085-.51 3.94-1.56.14.55.34 1.15.58 1.71l.033.082h3.27l-.088-.19c-1.048-2.27-1.428-4.937-1.428-6.174m11.655-.003c0 2.05-1.16 3.225-3.183 3.225-2.024 0-3.184-1.175-3.184-3.224 0-2.05 1.16-3.22 3.185-3.22 2.024 0 3.184 1.175 3.184 3.225M88.52 7.26c-3.78 0-6.42 2.52-6.42 6.13s2.64 6.13 6.42 6.13 6.42-2.52 6.42-6.127c0-3.607-2.64-6.126-6.42-6.126' }),
						skate.h('path', { fill: 'url(#logo-fandom-gradient)', d: 'M10.175 16.803c0 .19-.046.46-.26.666l-.81.69-7.362-6.94V8.51l8.094 7.627c.126.12.338.367.338.666zm11.21-8.096v2.525l-9.158 8.86a.673.673 0 0 1-.493.21.73.73 0 0 1-.514-.21l-.838-.76L21.384 8.707zm-6.976 4.498l-2.54 2.422-8.04-7.672a1.997 1.997 0 0 1-.01-2.9l2.54-2.423 8.04 7.672c.84.8.84 2.1 0 2.9zm-1.5-6.682L15.55 4c.406-.387.945-.6 1.52-.6.575 0 1.114.213 1.52.6l2.73 2.605-4.164 3.973-1.52-1.45-2.73-2.605zm10.17-.403L17.09.317l-.125-.12-.124.12-5.22 5.03L6.96.867 6.953.864 6.948.858l-.583-.47-.12-.098-.115.106L.052 6.11 0 6.16v5.76l.05.05 11.396 10.867.123.117.12-.117L23.07 11.97l.05-.05V6.17l-.05-.05z' })
					)
				),
				skate.h(
					'svg',
					{ 'class': 'wds-global-navigation__logo-image wds-is-wds-company-logo-powered-by-wikia', width: '128', height: '13', viewBox: '0 0 128 13', xmlns: 'http://www.w3.org/2000/svg' },
					skate.h(
						'g',
						{ fill: 'none', 'fill-rule': 'evenodd' },
						skate.h('path', { d: 'M3.233 8.427c.208 0 .409-.015.602-.046.194-.032.363-.091.51-.18a.986.986 0 0 0 .353-.376c.089-.163.134-.374.134-.637 0-.262-.045-.475-.134-.637a.99.99 0 0 0-.353-.377 1.395 1.395 0 0 0-.51-.178 3.69 3.69 0 0 0-.602-.046H1.819v2.477h1.414zm.497-3.89c.518 0 .958.075 1.32.226.364.15.66.349.887.596.228.247.394.528.499.845a3.158 3.158 0 0 1 0 1.963c-.105.319-.27.603-.5.85a2.458 2.458 0 0 1-.885.596c-.363.15-.803.226-1.321.226H1.819v2.964H0V4.536h3.73zm5.696 5.181c.08.328.21.623.388.885.177.262.41.472.695.63.286.16.633.238 1.043.238.409 0 .757-.079 1.043-.237.286-.159.517-.369.695-.631a2.71 2.71 0 0 0 .388-.885c.08-.328.122-.666.122-1.013a4.53 4.53 0 0 0-.122-1.054 2.799 2.799 0 0 0-.388-.908 1.968 1.968 0 0 0-.695-.637c-.286-.158-.634-.238-1.043-.238-.41 0-.757.08-1.043.238-.286.158-.518.37-.695.637a2.749 2.749 0 0 0-.388.908 4.471 4.471 0 0 0 0 2.067M7.763 6.985c.186-.528.452-.989.8-1.384a3.665 3.665 0 0 1 1.28-.925c.507-.224 1.077-.336 1.71-.336.64 0 1.213.112 1.715.336.502.223.927.533 1.275.925.347.395.614.856.8 1.384a5.19 5.19 0 0 1 .277 1.72 5.01 5.01 0 0 1-.278 1.684 4.017 4.017 0 0 1-.8 1.36 3.664 3.664 0 0 1-1.274.909c-.502.22-1.074.33-1.715.33-.633 0-1.203-.11-1.708-.33a3.654 3.654 0 0 1-1.281-.909 4.017 4.017 0 0 1-.8-1.36 4.981 4.981 0 0 1-.278-1.684c0-.617.092-1.19.278-1.72m15.282 5.818l-1.402-5.627h-.023l-1.38 5.627H18.4l-2.19-8.266h1.818l1.31 5.627h.023L20.8 4.537h1.7l1.414 5.695h.023l1.356-5.695h1.785l-2.225 8.266zm11.169-8.266v1.528h-4.368v1.771h4.01V9.25h-4.01v2.025h4.46v1.528h-6.28V4.537zm5.249 3.739c.417 0 .73-.092.939-.278.208-.185.312-.485.312-.903 0-.4-.104-.692-.312-.874-.21-.181-.522-.272-.94-.272h-1.992v2.327h1.993zm.649-3.74c.37 0 .705.061 1.002.18.297.12.552.284.764.492.213.21.375.45.487.723.111.274.168.57.168.887 0 .485-.103.906-.306 1.262-.206.354-.54.625-1.003.81v.023c.223.061.41.156.556.284a1.6 1.6 0 0 1 .36.451c.092.174.16.364.202.573.042.208.07.416.087.625.007.132.016.285.023.464.008.177.02.358.041.543.019.186.05.36.092.527.043.166.107.307.19.422H40.96a3.17 3.17 0 0 1-.186-.937c-.024-.363-.058-.71-.104-1.042-.062-.433-.193-.748-.394-.95-.201-.2-.53-.3-.985-.3h-1.82v3.23h-1.819V4.536h4.462zm10.207.001v1.528h-4.368v1.771h4.01V9.25h-4.01v2.025h4.46v1.528h-6.28V4.537zm4.878 6.738c.263 0 .517-.043.764-.128a1.7 1.7 0 0 0 .662-.422c.192-.197.347-.453.463-.77.116-.317.173-.702.173-1.157 0-.417-.04-.794-.12-1.13a2.278 2.278 0 0 0-.4-.863 1.776 1.776 0 0 0-.736-.548c-.305-.129-.683-.192-1.13-.192h-1.298v5.21h1.622zm.128-6.738c.532 0 1.03.085 1.49.254.458.17.856.425 1.192.765.335.34.598.764.789 1.273.188.51.282 1.108.282 1.795 0 .602-.077 1.157-.23 1.666-.155.51-.39.95-.702 1.32-.313.37-.704.662-1.17.875-.468.212-1.018.318-1.65.318h-3.57V4.537h3.57zm12.235 6.853c.178 0 .348-.016.51-.052.162-.034.305-.092.43-.174a.875.875 0 0 0 .294-.33c.073-.138.11-.316.11-.532 0-.423-.12-.727-.358-.908-.24-.182-.556-.273-.95-.273h-1.983v2.27h1.947zm-.104-3.508c.324 0 .59-.076.8-.231.208-.155.312-.404.312-.753a.954.954 0 0 0-.104-.474.761.761 0 0 0-.278-.29 1.165 1.165 0 0 0-.4-.144 2.63 2.63 0 0 0-.47-.041h-1.703v1.933h1.843zm.233-3.345c.394 0 .754.035 1.078.104.324.07.602.183.834.341.231.159.411.369.539.631.126.263.19.588.19.973 0 .417-.094.765-.284 1.041-.189.28-.468.506-.84.684.51.147.891.403 1.142.77.25.366.376.808.376 1.326 0 .416-.08.776-.242 1.082a2.12 2.12 0 0 1-.656.746 2.897 2.897 0 0 1-.938.43 4.255 4.255 0 0 1-1.083.137h-4.01V4.537h3.894zm3.486 0h2.04l1.934 3.265 1.923-3.265h2.028L76.03 9.63v3.172h-1.819V9.584z', fill: '#656E78' }),
						skate.h('path', { d: 'M102.992.404V12.81h2.79v-2.233l.96-.913 1.9 3.146h3.617l-3.487-5.004 3.346-3.268h-3.989l-1.604 1.89-.744.929V.404zM92.934 4.536l-1.05 5.649-1.375-5.65H87.3l-1.353 5.65-1.056-5.65H81.98l2.15 8.272h3.737l1.047-4.292 1.047 4.292H93.7l2.155-8.271zm32.036 5.173c-.355.463-.912.772-1.64.772-.834 0-1.5-.54-1.5-1.824 0-1.283.666-1.824 1.5-1.824.728 0 1.285.31 1.64.773V9.71zm2.784-2.767l.155-2.406h-2.546l-.192.906c-.587-.617-1.316-1.128-2.598-1.128-2.322 0-3.59 1.5-3.59 4.343 0 2.844 1.268 4.343 3.59 4.343 1.282 0 2.011-.51 2.598-1.128l.2.936h2.538l-.155-2.435V6.942zM98.83.45a1.594 1.594 0 1 0-.001 3.187A1.594 1.594 0 0 0 98.83.45m2.402 5.83V4.536h-3.996v8.272h3.996v-1.735h-1.253V6.28zM114.4 2.043a1.595 1.595 0 0 0 3.19 0 1.595 1.595 0 1 0-3.19 0m.445 4.237v4.793h-1.252v1.735h3.997V4.536h-3.997V6.28z', fill: '#092344' })
					)
				)
			);
		}
	}, {
		key: 'fandomOverviewLinks',
		value: function fandomOverviewLinks(model) {
			var _this2 = this;

			if (!model || !model.links) {
				return;
			}

			return model.links.map(function (link) {
				return _this2.linkBranded(link);
			});
		}
	}, {
		key: 'links',
		value: function links(model, type) {
			var _this3 = this;

			if (model.header) {
				return this.dropdown(model, type);
			} else {
				return model.links.map(function (link) {
					return _this3.link(link);
				});
			}
		}
	}, {
		key: 'userMenu',
		value: function userMenu(model) {
			if (model.user) {
				return this.userMenuLoggedIn(model.user);
			} else if (model.anon) {
				return this.userMenuAnon(model.anon);
			}
		}
	}, {
		key: 'userMenuAnon',
		value: function userMenuAnon(model) {
			var _this4 = this;

			// TODO make this.dropdown() generic enough to use here
			var toggleHeaderSvg = skate.h(
				'svg',
				{ xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', 'class': 'wds-icon wds-icon-small wds-icon', id: 'wds-icons-user' },
				skate.h('path', { d: 'M12 14c3.309 0 6-2.691 6-6V6c0-3.309-2.691-6-6-6S6 2.691 6 6v2c0 3.309 2.691 6 6 6zm5 2H7c-3.86 0-7 3.14-7 7a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1c0-3.86-3.14-7-7-7z', 'fill-rule': 'evenodd' })
			);
			var toggleHeaderSpan = skate.h(
				'span',
				{ 'class': 'wds-global-navigation__account-menu-caption' },
				this.i18n(model.header.title.key)
			);
			var links = model.links.map(function (link) {
				return _this4.linkAuthentication(link);
			});

			return skate.h(
				'div',
				{ 'class': 'wds-dropdown wds-global-navigation__account-menu' },
				skate.h(
					'div',
					{ 'class': 'wds-global-navigation__dropdown-toggle wds-dropdown__toggle' },
					toggleHeaderSvg,
					toggleHeaderSpan,
					skate.h(
						'svg',
						{ 'class': 'wds-icon wds-icon-tiny wds-dropdown__toggle-chevron', width: '12', height: '12', viewBox: '0 0 12 12', xmlns: 'http://www.w3.org/2000/svg' },
						skate.h('path', { d: 'M1 3h10L6 9z' })
					)
				),
				skate.h(
					'div',
					{ 'class': 'wds-global-navigation__dropdown-content wds-dropdown__content wds-is-right-aligned' },
					skate.h(
						'ul',
						{ 'class': 'wds-list wds-has-lines-between' },
						links
					)
				)
			);
		}
	}, {
		key: 'userMenuLoggedIn',
		value: function userMenuLoggedIn(model) {
			return this.links(model, 'user-menu', true);
		}
	}, {
		key: 'link',
		value: function link(model) {
			return skate.h(
				'a',
				{ 'class': 'wds-global-navigation__link', href: model.href },
				this.i18n(model.title.key)
			);
		}
	}, {
		key: 'linkAuthentication',
		value: function linkAuthentication(model) {
			var classMap = {
				'global-navigation-anon-sign-in': 'wds-button wds-is-full-width',
				'global-navigation-anon-register': 'wds-button wds-is-full-width wds-is-secondary',
				'global-navigation-user-sign-out': 'wds-global-navigation__dropdown-link'
			};
			var classNames = classMap[model.title.key];
			var subtitle = model.subtitle ? skate.h(
				'div',
				{ 'class': 'wds-global-navigation__account-menu-dropdown-caption' },
				this.i18n(model.subtitle.key)
			) : '';
			var link = void 0;

			link = skate.h(
				'a',
				{ href: model.href, rel: 'nofollow', id: model.title.key, 'class': classNames },
				this.i18n(model.title.key)
			);

			return skate.h(
				'li',
				null,
				subtitle,
				link
			);
		}
	}, {
		key: 'linkBranded',
		value: function linkBranded(model) {
			var classNames = ['wds-global-navigation__link'];

			classNames.push('wds-is-' + model.brand);

			return skate.h(
				'a',
				{ 'class': classNames.join(' '), href: model.href },
				this.i18n(model.title.key)
			);
		}
	}, {
		key: 'dropdown',
		value: function dropdown(model, type) {
			var _this5 = this;

			var classNames = ['wds-dropdown', 'wds-global-navigation__' + type],
			    links = model.links.map(function (link) {
				return skate.h(
					'li',
					null,
					skate.h(
						'a',
						{ 'class': 'wds-global-navigation__dropdown-link', href: link.href },
						_this5.i18n(link.title.key)
					)
				);
			});

			return skate.h(
				'div',
				{ 'class': classNames.join(' ') },
				skate.h(
					'div',
					{ 'class': 'wds-global-navigation__dropdown-toggle wds-dropdown__toggle', title: this.dropdownToggleTitle(model) },
					this.dropdownToggleHeader(model),
					skate.h(
						'svg',
						{ 'class': 'wds-icon wds-icon-tiny wds-dropdown__toggle-chevron', width: '12', height: '12', viewBox: '0 0 12 12', xmlns: 'http://www.w3.org/2000/svg' },
						skate.h('path', { d: 'M1 3h10L6 9z' })
					)
				),
				skate.h(
					'div',
					{ 'class': 'wds-global-navigation__dropdown-content wds-dropdown__content' },
					skate.h(
						'ul',
						{ 'class': 'wds-is-linked wds-list' },
						links
					)
				)
			);
		}
	}, {
		key: 'dropdownToggleTitle',
		value: function dropdownToggleTitle(model) {
			if (model.header.type === 'avatar') {
				return model.header.username.value;
			}
		}
	}, {
		key: 'dropdownToggleHeader',
		value: function dropdownToggleHeader(model) {
			if (model.header.type === 'avatar') {
				return skate.h('img', { 'class': 'wds-avatar', src: model.header.url, alt: model.header.username.value });
			} else {
				return skate.h(
					'span',
					null,
					this.i18n(model.header.title.key)
				);
			}
		}
	}, {
		key: 'search',
		value: function search(model) {
			var _this6 = this;

			return skate.h(
				'form',
				{ 'class': 'wds-global-navigation__search', action: model.search.module.results.url },
				skate.h(
					'div',
					{ 'class': 'wds-global-navigation__search-input-wrapper wds-dropdown ' },
					skate.h(
						'label',
						{ 'class': 'wds-dropdown__toggle wds-global-navigation__search-label' },
						skate.h(
							'svg',
							{ 'class': 'wds-icon wds-icon-small wds-global-navigation__search-label-icon', width: '24', height: '24', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
							skate.h(
								'g',
								{ 'fill-rule': 'evenodd' },
								skate.h('path', { d: 'M21.747 20.524l-4.872-4.871a.864.864 0 1 0-1.222 1.222l4.871 4.872a.864.864 0 1 0 1.223-1.223z' }),
								skate.h('path', { d: 'M3.848 10.763a6.915 6.915 0 0 1 6.915-6.915 6.915 6.915 0 0 1 6.915 6.915 6.915 6.915 0 0 1-6.915 6.915 6.915 6.915 0 0 1-6.915-6.915zm-1.729 0a8.643 8.643 0 0 0 8.644 8.644 8.643 8.643 0 0 0 8.644-8.644 8.643 8.643 0 0 0-8.644-8.644 8.643 8.643 0 0 0-8.644 8.644z' })
							)
						),
						skate.h('input', { type: 'search', name: 'query', placeholder: 'Search', autocomplete: 'off', 'class': 'wds-global-navigation__search-input', ref: function ref(el) {
								_this6.searchInput = el;
							}, onFocus: this.activateSearch.bind(this), onKeydown: this.searchKeydown.bind(this), onInput: this.searchOnInput.bind(this) })
					),
					skate.h(
						'button',
						{ 'class': 'wds-button wds-is-text wds-global-navigation__search-close', type: 'reset', 'data-ember-action': '690', onClick: this.deactivateSearch.bind(this) },
						skate.h(
							'svg',
							{ 'class': 'wds-icon wds-icon-small wds-global-navigation__search-close-icon', width: '24', height: '24', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
							skate.h('path', { d: 'M19.707 4.293a.999.999 0 0 0-1.414 0L12 10.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L10.586 12l-6.293 6.293a.999.999 0 1 0 1.414 1.414L12 13.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L13.414 12l6.293-6.293a.999.999 0 0 0 0-1.414', 'fill-rule': 'evenodd' })
						)
					),
					skate.h(
						'div',
						{ 'class': 'wds-dropdown__content wds-global-navigation__search-suggestions' },
						skate.h('ul', { 'class': 'wds-has-ellipsis wds-is-linked wds-list' })
					),
					skate.h(
						'button',
						{ 'class': 'wds-button wds-global-navigation__search-submit', type: 'button', disabled: true, ref: function ref(el) {
								_this6.searchSubmit = el;
							} },
						skate.h(
							'svg',
							{ 'class': 'wds-icon wds-icon-small wds-global-navigation__search-submit-icon', width: '24', height: '24', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
							skate.h('path', { d: 'M22.999 12a1 1 0 0 0-1-1H4.413l5.293-5.293a.999.999 0 1 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.415l7 7a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.415L4.413 13h17.586a1 1 0 0 0 1-1', 'fill-rule': 'evenodd' })
						)
					)
				)
			);
		}
	}, {
		key: 'activateSearch',
		value: function activateSearch() {
			var $globalNav = $(this.root),
			    activeSearchClass = 'wds-search-is-active',
			    $searchInput = $(this.searchInput);
			if (!$globalNav.hasClass(activeSearchClass)) {
				$globalNav.addClass(activeSearchClass);
				$searchInput.attr('placeholder', $searchInput.data('active-placeholder'));
				this.isSearchActive = true;

				/**
     * [bug fix]: On Firefox click is not triggered when placeholder text is changed
     * that is why we have to do it manually
     */
				$(this).click();
			}
		}
	}, {
		key: 'deactivateSearch',
		value: function deactivateSearch() {
			var $globalNav = $(this.root),
			    $searchInput = $(this.searchInput),
			    $searchSubmit = $(this.searchSubmit),
			    placeholderText = $searchInput.attr('placeholder'),
			    activeSearchClass = 'wds-search-is-active';
			$searchSubmit.prop('disabled', true);
			$globalNav.removeClass(activeSearchClass);
			$searchInput.attr('placeholder', placeholderText).val('');
			this.isSearchActive = false;
		}
	}, {
		key: 'searchKeydown',
		value: function searchKeydown(event) {
			// Escape key
			if (event.which === 27) {
				this.blur();
				this.deactivateSearch();
			}
		}
	}, {
		key: 'searchOnInput',
		value: function searchOnInput() {
			var $searchSubmit = $(this.searchSubmit);
			var textLength = this.searchInput.value.length;

			if (textLength > 0 && $searchSubmit.prop('disabled')) {
				$searchSubmit.prop('disabled', false);
			} else if (textLength === 0) {
				$searchSubmit.prop('disabled', true);
			}
		}

		// TODO use model

	}, {
		key: 'startWiki',
		value: function startWiki() /*model*/{
			return skate.h(
				'div',
				{ 'class': 'wds-global-navigation__start-a-wiki' },
				skate.h(
					'a',
					{ 'class': 'wds-global-navigation__start-a-wiki-button wds-button wds-is-squished wds-is-secondary', href: 'http://www.wikia.com/Special:CreateNewWiki' },
					skate.h(
						'span',
						{ 'class': 'wds-global-navigation__start-a-wiki-caption' },
						'Start a Wiki'
					),
					skate.h(
						'svg',
						{ 'class': 'wds-global-navigation__start-a-wiki-icon wds-icon', width: '24', height: '24', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
						skate.h('path', { d: 'M11 13v9a1 1 0 1 0 2 0v-9h9a1 1 0 1 0 0-2h-9V2a1 1 0 1 0-2 0v9H2a1 1 0 1 0 0 2h9z', 'fill-rule': 'evenodd' })
					)
				)
			);
		}
	}, {
		key: 'onClick',
		value: function onClick(event) {
			var $eventTarget = $(event.target),
			    $clickedToggle = $eventTarget.closest('.wds-dropdown__toggle'),
			    $clickedDropdown = $eventTarget.closest('.wds-dropdown');

			if ($clickedToggle.length) {
				$clickedDropdown.toggleClass('wds-is-active');

				if ($clickedDropdown.hasClass('wds-is-active')) {
					skate.emit($eventTarget.get(0), 'wdsDropdownOpen');
				} else {
					skate.emit($eventTarget.get(0), 'wdsDropdownClose');
				}
			}

			this.closeDropdowns($(this.root).find('.wds-dropdown.wds-is-active').not($clickedDropdown));

			this.isDropdownOpen = $clickedDropdown.hasClass('wds-is-active');
		}
	}, {
		key: 'updatedCallback',
		value: function updatedCallback(previousProps) {
			// The 'previousProps' will be undefined if it is the initial render.
			if (!previousProps) {
				return true;
			}

			if (!this.isDropdownOpen) {
				this.closeDropdowns($(this.root).find('.wds-dropdown.wds-is-active'));
			}
		}
	}, {
		key: 'closeDropdowns',
		value: function closeDropdowns(openDropdowns) {
			openDropdowns.removeClass('wds-is-active');
			openDropdowns.each(function () {
				skate.emit(this, 'wdsDropdownClose');
			});
		}
	}, {
		key: 'renderedCallback',
		value: function renderedCallback() {
			if ($(this.searchInput).is(':focus')) {
				this.activateSearch();
			}

			if ($(this.searchInput).val().length === 0) {
				$(this.searchSubmit).prop('disabled', true);
			}
		}
	}, {
		key: 'renderCallback',
		value: function renderCallback() {
			var _this7 = this;

			return skate.h(
				'div',
				{ 'class': 'wds-global-navigation', onClick: this.onClick.bind(this), ref: function ref(element) {
						_this7.root = element;
					} },
				this.style(),
				skate.h(
					'div',
					{ 'class': 'wds-global-navigation__content-bar' },
					this.logo(this.model.logo),
					skate.h(
						'div',
						{ 'class': 'wds-global-navigation__links-and-search' },
						this.fandomOverviewLinks(this.model.fandom_overview),
						this.links(this.model.wikis, 'wikis-menu'),
						this.search(this.model)
					),
					this.userMenu(this.model),
					this.startWiki(this.model)
				)
			);
		}
	}], [{
		key: 'props',
		get: function get() {
			return {
				model: {
					attribute: true,
                  coerce: function coerce(value) {
						return JSON.parse(value);
					},
					serialize: function serialize(value) {
                      return value;
						// return JSON.stringify(value);
					}
				},
				isDropdownOpen: skate.prop.boolean({ attribute: true }),
				isSearchActive: skate.prop.boolean({ attribute: true })
			};
		}
	}]);

	return _class;
}(skate.Component));

},{"skatejs":1}]},{},[3]);
