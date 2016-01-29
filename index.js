import { init } from "snabbdom";
import classModule from "snabbdom/modules/class";
import propsModule from "snabbdom/modules/props";
import styleModule from "snabbdom/modules/style";
import eventModule from "snabbdom/modules/eventlisteners";

const patch = init([classModule, propsModule, styleModule, eventModule]);

export function createRenderer(container, dispatch) {
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

const eventCache = {};

window.unload = () => {
  Object.keys(listeners)
    .forEach(eventName => {
      const events = eventCache[eventName];
      events.forEach(event => {
        document.body.removeEventListener(event.name, event.listener);
      });
    });
  listeners = null;
};

export function events(selector, name, handler) {
  const eventsByName = eventCache[name] || (eventCache[name] = []);
  const elements = document.querySelectorAll(selector);
  const listener = (e) => {
    const validElements = elements.filter(element => element === e.target);
    validElements.forEach(element => handler(e));
  };
  const event = {
    listener,
    elements: document.querySelectorAll(selector),
    name
  };
  document.body.addEventListener(name, listener);
  eventsByName.push(event);
}