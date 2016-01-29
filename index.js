import { init } from "snabbdom";
import classModule from "snabbdom/modules/class";
import propsModule from "snabbdom/modules/props";
import styleModule from "snabbdom/modules/style";
import eventModule from "snabbdom/modules/eventlisteners";

const patch = init([classModule, propsModule, styleModule, eventModule]);

function createRenderer(container, dispatch) {
  let vNode = null;

  if (container && container.childNodes.length > 0) {
    container.innerHTML = "";
  }

  const update = (render) => {
    const newVNode = render({dispatch, ...context});
    patch(vNode, newVNode);
    vNode = newVNode;
  };

  const create = (render, context) => {
    vNode = render({dispatch, ...context});
    patch(container, vNode);
  };

  return function renderer(renderVNode, context) {
    return vNode !== null
      ? update(renderVNode, context)
      : create(renderVNode, context);
  };
}

module.exports = createRenderer;