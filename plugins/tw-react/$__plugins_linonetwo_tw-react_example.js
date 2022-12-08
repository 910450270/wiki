"use strict";

// src/exampleFunction.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function ExampleFunction() {
  const [counter, counterSetter] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    let localCounter = 0;
    const handle = setInterval(() => {
      counterSetter(++localCounter);
    }, 1e3);
    return () => {
      clearInterval(handle);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: counter });
}

// src/example.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Widget = require("$:/plugins/linonetwo/tw-react/widget.js").widget;
var ReactDom = require("react-dom");
var React = require("react");
var e = React.createElement;
var LikeButton = class extends React.Component {
  constructor(props) {
    super(props);
    const defaultState = { liked: false };
    try {
      this.state = JSON.parse($tw.wiki.getTiddlerText(this.props.stateTiddler, "{}")) ?? defaultState;
    } catch {
      this.state = defaultState;
    }
  }
  setState(nextState) {
    super.setState(nextState);
    $tw.wiki.setText(this.props.stateTiddler, "text", void 0, JSON.stringify(nextState));
  }
  render() {
    if (this.state.liked) {
      return "You liked this.";
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => this.setState({ liked: true }), children: [
      "Like ",
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExampleFunction, {})
    ] });
  }
};
var LikeButtonWidget = class extends Widget {
  constructor() {
    super(...arguments);
    this.reactComponent = LikeButton;
    this.getProps = () => ({ stateTiddler: this.getAttribute("stateTiddler") });
  }
};
exports.likeButtonExampleWidget = LikeButtonWidget;
