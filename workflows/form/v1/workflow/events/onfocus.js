import validateFormValue from "../validators/form-value.js";
import { setHint } from "../effects/hints.js";

export default function handleHintsOnFocus(ctx) {
  const ctxObject = ctx.get();
  const { workflowElement, formFields } = ctxObject;

  formFields.forEach((field) => {
    const fieldElement = workflowElement.querySelector(`[name="${field.name}"]`);
    if (!fieldElement || !Object.hasOwn(field, "hint")) return;

    fieldElement.addEventListener("focus", () => {
      if (Object.hasOwn(field, "validate")) {
        const error = validateFormValue(field, ctx);
        if (error) setHint(field, ctx);
      } else {
        setHint(field, ctx);
      }
    });
  });
}
