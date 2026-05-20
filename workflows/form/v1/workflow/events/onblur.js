import { removeHint } from "../effects/hints.js";

export default function handleHintsOnBlur(ctx) {
  const ctxObject = ctx.get();
  const { workflowElement, formFields } = ctxObject;

  formFields.forEach((field) => {
    const fieldElement = workflowElement.querySelector(`[name="${field.name}"]`);
    if (!fieldElement || !Object.hasOwn(field, "hint")) return;

    fieldElement.addEventListener("blur", () => removeHint(field, ctx));
  });
}
