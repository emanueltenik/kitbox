const hintElementAttributeName = "data-create-form-hint";

export function setHint(field, ctx) {
  const fieldElement = ctx
    .get()
    .workflowElement.querySelector(`[name="${field.name}"]`);

  const hint = fieldElement.parentElement.querySelector(
    `[${hintElementAttributeName}]#${field.name}-hint`,
  );

  if (hint) return;

  fieldElement.after(
    createHint({ fieldName: field.name, message: field.hint }),
  );
}

export function removeHint(field, ctx) {
  const fieldElement = ctx
    .get()
    .workflowElement.querySelector(`[name="${field.name}"]`);

  const hint = fieldElement.parentElement.querySelector(
    `[${hintElementAttributeName}]#${field.name}-hint`,
  );
  if (hint) hint.remove();
}

function createHint({ message, fieldName }) {
  const hint = document.createElement("p");

  hint.setAttribute(hintElementAttributeName, "");
  hint.setAttribute("id", `${fieldName}-hint`);
  hint.textContent = message;

  return hint;
}
