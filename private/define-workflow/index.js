import Ctx from "./context.js";
import { createEmitter } from "./create-emitter.js";

export default function defineWorkflow(args, workflowObject) {
  const emitter = createEmitter(args.element, workflowObject.name);

  const normalizedWorkFlow = {
    ...workflowObject,
    ...args,
    emitter: emitter,
    workflowElement: args.element,
  };

  const ctx = new Ctx(normalizedWorkFlow);

  const clientCtx = { // public facing API of the workflow 
    workflow: ctx.get().name,
    element: ctx.get().element,
    on: (eventAlias, callback) => ctx.get().emitter.on(eventAlias, callback),
    off: (eventAlias, callback) => ctx.get().emitter.off(eventAlias, callback),
  }

  return { ctx, clientCtx};
}
