import Ctx from "./context.js";
import { createEmitter } from "./create-emitter.js";

export default function defineWorkflow (args, rawWorkFlowObject) {

  const emitter = createEmitter(args.element, rawWorkFlowObject.name);

  const normalizedWorkFlow = {
    ...rawWorkFlowObject, 
    ...args,
    emitter: emitter,
    workflowElement: args.element
  };

  delete normalizedWorkFlow.element;

  const ctx = new Ctx (normalizedWorkFlow);

   const clientWorkflow =  {
    workflow: normalizedWorkFlow.name,
    element: args.element,
    ...ctx.get().actions,
     state: () => ctx.get().state,
     on: (eventAlias, callback) => emitter.on(eventAlias, callback),
     off: (eventAlias, callback) => emitter.off(eventAlias, callback)
  } 

  return { clientWorkflow, ctx };
}