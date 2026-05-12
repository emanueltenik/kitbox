/**
 * A functional emitter that can be stored in ctx.state
 */
export function createEmitter(element, namespace) {
  // This registry stays in the closure to track handlers for .off()
  const registry = new Map();

  return {
    /**
     * Subscribe to a custom event
     */
    on(eventAlias, callback) {
      const fullEventName = `${namespace}:${eventAlias}`;
      const handler = (e) => callback(e.detail);

      if (!registry.has(eventAlias)) registry.set(eventAlias, []);
      registry.get(eventAlias).push({ callback, handler });

      element.addEventListener(fullEventName, handler);
    },

    /**
     * Unsubscribe from a custom event
     */
    off(eventAlias, callback) {
      const fullEventName = `${namespace}:${eventAlias}`;
      const listeners = registry.get(eventAlias);
      if (!listeners) return;

      const index = listeners.findIndex((l) => l.callback === callback);
      if (index !== -1) {
        const { handler } = listeners[index];
        element.removeEventListener(fullEventName, handler);
        listeners.splice(index, 1);
      }
    },

    /**
     * Trigger the custom event
     */
    emit(eventAlias, detail) {
      const event = new CustomEvent(`${namespace}:${eventAlias}`, {
        detail,
        bubbles: true,
        cancelable: true,
      });
      element.dispatchEvent(event);
    },

    // clear() {
    //   for (const [eventAlias, listeners] of registry.entries()) {
    //     const fullEventName = `${namespace}:${eventAlias}`;

    //     for (const { handler } of listeners) {
    //       element.removeEventListener(fullEventName, handler);
    //     }
    //   }

    //   registry.clear();
    // },
  };
}
