import defineWorkflow from "../../../private/define-workflow/index.js";
import runWorkflowSetup from "./workflow/index.js";
import handleReset from "./workflow/events/onreset.js";
import validateFormValues from "./workflow/validators/form-values.js";
import validateFormValue from "./workflow/validators/form-value.js";
import validateFormFields from "./workflow/validators/form-fields.js";
import { showErrors, hideErrors } from "./workflow/effects/error-notes.js";

export default function createForm(args) {
  const { ctx, clientCtx } = defineWorkflow(args, {
    name: "create-form",
    state: {
      status: "idle",
      values: {},
      errors: {},
      result: null,
    },

    actions: {
      runWorkflow: () => runWorkflowSetup(ctx),
      reset: () => handleReset(ctx),

      validate: (field) =>
        validateFormValue(
          ctx.get().formFields.filter((f) => f.name === field)[0] || "",
          ctx,
        ),
      validateAll: () => validateFormValues(ctx),

      getFormValues: () => ctx.get().state.values,
      getTrimmedFormValues: () => {
        const formValues = ctx.get().state.values;
        const trimedFormValues = {};

        Object.keys(formValues).forEach(
          (field) =>
            (trimedFormValues[field] = String(formValues[field]).trim()),
        );

        return trimedFormValues;
      },

      getFormValue: (field) => ctx.get().state.values[field],
      getTrimmedFormValue: (field) => {
        const value = ctx.get().state.values[field];
        return String(value).trim() || value;
      },

      showErrors: () => showErrors(ctx),
      hideErrors: () => hideErrors(ctx),
    },
  });

  const invalidFormFieldsSchema = validateFormFields(ctx);
  if (invalidFormFieldsSchema) throw new Error(invalidFormFieldsSchema);

  return {
    // public facing API of the workflow
    ...clientCtx,
    ...ctx.get().actions,
    state: () => ctx.get().state,
  };
}
