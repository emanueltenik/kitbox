import validate from "./validate.js";

export default function validateAll(ctx) {
  const ctxObject = ctx.get();
  const { formFields } = ctxObject;

  const invalidFields = {};

  formFields.forEach((field) => {
    if (!field.validate) return;

    const error = validate(field, ctx);
    if (error) invalidFields[field.name] = invalidFields[field.name] = error;
  });

  return Object.keys(invalidFields).length ? invalidFields : null;
}
