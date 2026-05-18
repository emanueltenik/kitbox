import Ctx from "./context.js";
import { createEmitter } from "./create-emitter.js";
import validateArgs from "./validate-args.js";
import validateWorkflowObject from "./validate-workflow.js";

export default function defineWorkflow(args, workflowObject) {
  const invalidArgs = validateArgs(args);
  if (invalidArgs) throw new Error(invalidArgs);

  const invalidWorkflowObject = validateWorkflowObject(workflowObject);
  if (invalidWorkflowObject) throw new Error(invalidWorkflowObject);

  const emitter = createEmitter(args.element, workflowObject.name);
  const normalizedWorkFlow = {
    ...workflowObject,
    ...args,
    emitter: emitter,
    workflowElement: args.element,
  };

  const ctx = new Ctx(normalizedWorkFlow);

  const clientCtx = {
    // public facing API of the workflow
    workflow: ctx.get().name,
    element: ctx.get().element,
    on: (eventAlias, callback) => ctx.get().emitter.on(eventAlias, callback),
    off: (eventAlias, callback) => ctx.get().emitter.off(eventAlias, callback),
  };

  return { ctx, clientCtx };
}
