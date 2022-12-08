"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/widget.ts
var widget_exports = {};
__export(widget_exports, {
  ReactWidget: () => ReactWidget
});
__toCommonJS(widget_exports);
var Widget = require("$:/core/modules/widgets/widget.js").widget;
var ReactDom = require("react-dom");
var React = require("react");
if (typeof window !== "undefined") {
  window.React = React;
} else if (typeof global !== "undefined") {
  global.React = React;
}
Widget.prototype.removeChildDomNodes = function(parentRemoved) {
  if (this.domNodes.length > 0 && !parentRemoved) {
    $tw.utils.each(this.domNodes, function(domNode) {
      domNode?.parentNode?.removeChild(domNode);
    });
    this.domNodes = [];
    parentRemoved = true;
  }
  $tw.utils.each(this.children, function(childWidget) {
    childWidget?.removeChildDomNodes(parentRemoved);
  });
};
var ReactWidget = class extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.reactComponent = null;
    this.getProps = () => ({ parentWidget: this });
  }
  refresh(changedTiddlers) {
    return false;
  }
  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    if (!this.reactComponent) {
      return;
    }
    const currentProps = this.getProps() ?? {};
    if (currentProps.parentWidget === void 0 || currentProps.parentWidget === null) {
      currentProps.parentWidget = this;
    }
    if (this.root === void 0 || this.containerElement === void 0) {
      this.containerElement = document.createElement("div");
      this.root = ReactDom.createRoot(this.containerElement);
    }
    this.domNodes.push(this.containerElement);
    parent.appendChild(this.containerElement);
    const reactElement = React.createElement(this.reactComponent, currentProps);
    this.root.render(reactElement);
  }
  refreshSelf() {
    var nextSibling = this.findNextSiblingDomNode();
    this.render(this.parentDomNode, nextSibling);
  }
  removeChildDomNodes() {
    super.removeChildDomNodes();
    this.root?.unmount?.();
  }
};
exports.widget = ReactWidget;
