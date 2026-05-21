let globalRerender = null;

let currentComponent = null;
let hookIndex = 0;

export function createElement(type, props, ...children) {
    console.log("createElement:", type);

  return {
    type,
    props: props || {},
    children
  };
}

export function useState(initialValue) {
    const state = currentComponent.state;
    const i = hookIndex++;
  
    if (state[i] === undefined) {
      state[i] = initialValue;
      console.log("useState init:", initialValue);
    }
  
    console.log("useState read:", state[i]);
  
    const setState = (newValue) => {
      console.log("setState called:", newValue);
  
      state[i] =
        typeof newValue === "function"
          ? newValue(state[i])
          : newValue;
  
      console.log("state updated:", state[i]);
  
      globalRerender();
    };
  
    return [state[i], setState];
  }

  export function useEffect(callback, deps) {
    const state = currentComponent.state;
    const i = hookIndex++;
  
    const prevDeps = state[i];
  
    const hasChanged =
      !prevDeps ||
      !deps ||
      deps.some((d, idx) => d !== prevDeps[idx]);
  
    console.log("useEffect check:", {
      prevDeps,
      deps,
      hasChanged
    });
  
    if (hasChanged) {
      console.log("useEffect running callback");
      callback();
      state[i] = deps;
    }
  }

  export function render(node, rerender) {
    globalRerender = rerender;
  
    console.log("render:", node.type);
  
    if (typeof node.type === "function") {
      console.log("Rendering component:", node.type.name);
  
      const Component = node.type;
  
      if (!currentComponent?.state) {
        currentComponent = {
          state: {}
        };
      }
  
      hookIndex = 0;
  
      const renderedVNode = Component(node.props);
  
      return render(renderedVNode, rerender);
    }
  
    console.log("Creating DOM:", node.type);
  
    const dom = document.createElement(node.type);
  
    for (const key in node.props) {
      if (key.startsWith("on")) {
        const event = key.slice(2).toLowerCase();
        console.log("Adding event:", event);
  
        dom.addEventListener(event, node.props[key]);
      } else {
        dom.setAttribute(key, node.props[key]);
      }
    }
  
    node.children.forEach((child) => {
      if (typeof child === "string") {
        dom.appendChild(document.createTextNode(child));
      } else if (child) {
        dom.appendChild(render(child, rerender));
      }
    });
  
    return dom;
  }