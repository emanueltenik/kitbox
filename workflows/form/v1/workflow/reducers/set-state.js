import updateFormValues from "../effects/form-values.js";

export default function setState(ctx, newState) {
  const ctxObject = ctx.get();
  const { workflowElement, formFields } = ctxObject;

  //setState
  ctx.set({
    ...ctx.get(),
    state: newState,
  });

  //Update DOM
  updateFormValues(workflowElement, newState.values, formFields);

  return newState;
}
