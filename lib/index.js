"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var vdom = require("virtual-dom");
var createElement = vdom.create;
var patch = vdom.patch;
var diff = vdom.diff;

function createRenderer(container, dispatch) {
  var view = null;
  var node = null;

  if (container && container.childNodes.length > 0) {
    container.innerHTML = "";
  }

  var update = function update(newView) {
    var patches = diff(view, newView);
    node = patch(node, patches);
    view = newView;
    return node;
  };

  var create = function create(newView, context) {
    view = newView;
    node = createElement(view);
    container.appendChild(node);
    return node;
  };

  return function renderer(view, context) {
    return node !== null ? update(view(_extends({ dispatch: dispatch }, context))) : create(view(_extends({ dispatch: dispatch }, context)));
  };
}

module.exports = createRenderer;

//# sourceMappingURL=index.js.map