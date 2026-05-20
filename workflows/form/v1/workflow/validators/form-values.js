import validateFormValue from "./form-value.js";

export default function validateFormValues(ctx) {
  const ctxObject = ctx.get();
  const { formFields } = ctxObject;

  const invalidFields = {};

  formFields.forEach((field) => {
    if (!Object.hasOwn(field, "validate")) return;

    const error = validateFormValue(field, ctx);
    if (error) invalidFields[field.name] = invalidFields[field.name] = error;
  });

  return Object.keys(invalidFields).length ? invalidFields : null;
}
