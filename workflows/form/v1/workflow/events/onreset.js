import initializeWorkflow from "../index.js"
import { removeHint } from "../effects/hints.js";
import { removeErrorNote } from "../effects/error-notes.js";

export default function handleReset(ctx) {
  const ctxObject = ctx.get();
  const { formFields } = ctxObject;

  // remove injected elements
  formFields.forEach((field) => {
    if (Object.hasOwn(field, "hint")) removeHint(field, ctx);
    if (Object.hasOwn(field, "validate")) removeErrorNote(field, ctx);
  });

  initializeWorkflow(ctx, true);
}
