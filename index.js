const vdom = require("virtual-dom");
const createElement = vdom.create;
const patch = vdom.patch;
const diff = vdom.diff;

function createRenderer(container, dispatch) {
  let view = null;
  let node = null;

  if (container && container.childNodes.length > 0) {
    container.innerHTML = "";
  }

  const update = (newView) => {
    let patches = diff(view, newView);
    node = patch(node, patches);
    view = newView;
    return node;
  };

  const create = (newView, context) => {
    view = newView;
    node = createElement(view);
    container.appendChild(node);
    return node;
  };

  return function renderer(view, context) {
    return node !== null
      ? update(view({dispatch, ...context}))
      : create(view({dispatch, ...context}));
  };
}

module.exports = createRenderer;