const errorNoteElementAttributeName = "data-create-form-error-note";
import validateAll from "../validate-all.js";

export function showErrors (ctx)  {
    const invalidFieldElements = getInvalidFieldElements(ctx);
    if (!invalidFieldElements) return;

    invalidFieldElements.forEach((element) => {
      const elementField = ctx.get().formFields.filter((f) => f.name === element.name)[0];
      setErrorNote(elementField, ctx);
    });

    invalidFieldElements[0].focus(); //set Focus on the first occurence
}

export function hideErrors (ctx)  {
    const invalidFieldElements = getInvalidFieldElements(ctx);
    if (!invalidFieldElements) return;

    invalidFieldElements.forEach((element) => {
      const elementField = ctx.get().formFields.filter((f) => f.name === element.name)[0];
      removeErrorNote(elementField, ctx);
    });
}

export function setErrorNote(field, ctx) {
  const fieldElement = ctx
    .get()
    .workflowElement.querySelector(`[name="${field.name}"]`);
  const errorNote =
    fieldElement.parentElement.querySelector(
      `[${errorNoteElementAttributeName}]#${field.name}-error`,
    ) ?? null;

  if (errorNote) return;

  const errorMessage = ctx.get().actions.validate(field.name).message;

  // mark as invalid
  fieldElement.setAttribute("aria-invalid", true);
  fieldElement.setAttribute("aria-describedby", `${field.name}-error`);

  // append to dom
  fieldElement.parentElement.insertBefore(
    createErrorNote({ fieldName: field.name, message: errorMessage }),
    fieldElement,
  );
}

export function removeErrorNote(field, ctx) {
  const fieldElement = ctx
    .get()
    .workflowElement.querySelector(`[name="${field.name}"]`);
  const errorNote =
    fieldElement.parentElement.querySelector(
      `[${errorNoteElementAttributeName}]#${field.name}-error`,
    ) ?? null;

    if (!errorNote) return

    errorNote.remove();
    fieldElement.removeAttribute('aria-invalid');
    fieldElement.removeAttribute('aria-describedby');
}

function createErrorNote({ message, fieldName }) {
  const errorNote = document.createElement("p");

  errorNote.setAttribute(errorNoteElementAttributeName, "");
  errorNote.setAttribute("id", `${fieldName}-error`);
  errorNote.textContent = message;

  return errorNote;
}


export function getInvalidFieldElements (ctx) {
  const ctxObject = ctx.get();
  const { workflowElement } = ctxObject;

   const invalidFields = validateAll(ctx);
  
    if (!invalidFields) return null;
  
     const invalidFieldElements = Object.keys(invalidFields).map((fieldName) => {
        return workflowElement.querySelector(`[name="${fieldName}"]`);
    });

    return invalidFieldElements;

  }