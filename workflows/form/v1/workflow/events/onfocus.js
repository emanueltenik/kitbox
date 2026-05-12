import validate from "../validate.js";
import { setHint } from "../effects/hints.js";

export default function handleHintsOnFocus(ctx) {
  const ctxObject = ctx.get();
  const { workflowElement, formFields } = ctxObject;

  formFields.forEach((field) => {
    const fieldElement = workflowElement.querySelector(`[name="${field.name}"]`) ?? null;
    if (!fieldElement || !field.hint) return;

    fieldElement.addEventListener("focus", () => {
      if (field.validate) {
        const error = validate(field, ctx);
        if (error) setHint(field, ctx);
      } else {
        setHint(field, ctx);
      }
    });
  });
}
