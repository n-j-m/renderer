"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _snabbdom = require("snabbdom");

var _class = require("snabbdom/modules/class");

var _class2 = _interopRequireDefault(_class);

var _props = require("snabbdom/modules/props");

var _props2 = _interopRequireDefault(_props);

var _style = require("snabbdom/modules/style");

var _style2 = _interopRequireDefault(_style);

var _eventlisteners = require("snabbdom/modules/eventlisteners");

var _eventlisteners2 = _interopRequireDefault(_eventlisteners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patch = (0, _snabbdom.init)([_class2.default, _props2.default, _style2.default, _eventlisteners2.default]);

function createRenderer(container, dispatch) {
  var vNode = null;

  if (container && container.childNodes.length > 0) {
    container.innerHTML = "";
  }

  var update = function update(render) {
    var newVNode = render(_extends({ dispatch: dispatch }, context));
    patch(vNode, newVNode);
    vNode = newVNode;
  };

  var create = function create(render, context) {
    vNode = render(_extends({ dispatch: dispatch }, context));
    patch(container, vNode);
  };

  return function renderer(renderVNode, context) {
    return vNode !== null ? update(renderVNode, context) : create(renderVNode, context);
  };
}

module.exports = createRenderer;

//# sourceMappingURL=index.js.map