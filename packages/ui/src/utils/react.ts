/**
 * Monkey patching React Node to prevent crashing runtime errors
 * when trying to translate a page to other languages
 * using browser's Google Translate feature or 3rd party plugins
 * @see https://github.com/facebook/react/issues/11538#issuecomment-417504600
 */
export function patchNode() {
  if (typeof Node === "function" && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        if (console) {
          console.error(
            "Cannot remove a child from a different parent1",
            child,
            child.parentNode,
            this,
          );
        }
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (console) {
          console.error(
            "Cannot insert before a reference node from a different parent",
            referenceNode,
            referenceNode.parentNode,
            this,
          );
        }
        return newNode;
      }
      return originalInsertBefore.apply(this, arguments);
    };
  }
}
