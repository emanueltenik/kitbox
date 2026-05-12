import getFormDataObject from "../helpers/get-form-data-object.js";

export default function validate(field, ctx) {
  const ctxObject = ctx.get();
  const { workflowElement } = ctxObject;
  const formValues = getFormDataObject(workflowElement);
  const userValue = formValues[field.name];

  if (!field?.validate) return;

  const error = field.validate({
    value: userValue,
    isEmpty: (value) => !String(value).trim().length > 0,
    trimmedValue: String(userValue).trim(),
  });

  return error ?? null;
}
