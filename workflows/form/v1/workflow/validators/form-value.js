import getFormDataObject from "../../helpers/get-form-data-object.js";

export default function validateFormValue(field, ctx) {
  const ctxObject = ctx.get();
  const { workflowElement } = ctxObject;
  const formValues = getFormDataObject(workflowElement);
  const userValue = formValues[field.name];

  if (!Object.hasOwn(field, "validate")) return;

  const error = field.validate({
    value: userValue,
    isEmpty: (value) => !value || String(value).trim().length === 0,
    trimmedValue: String(userValue).trim(),
  });

  return error ?? null;
}
