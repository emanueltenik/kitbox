import defineWorkflow from "../../../private/define-workflow/index.js";
import runWorkflowSetup from "./workflow/index.js";
import handleReset from "./workflow/events/onreset.js";
import validateAll from "./workflow/validate-all.js";
import validate from "./workflow/validate.js";
import { showErrors, hideErrors } from "./workflow/effects/error-notes.js";


export default function createForm(args) {
  const { clientWorkflow, ctx } = defineWorkflow(args, {
    name: "create-form",
    state: {
      status: "idle",
      values: {
        formValues: {},
      },
      errors: {
        invalidFields: {},
      },
      result: null,
    },

    actions: {
      runWorkflow: () => runWorkflowSetup(ctx),
      reset: () => handleReset(ctx),

      validate: (field) =>
        validate(
          ctx.get().formFields.filter((f) => f.name === field)[0] || "",
          ctx,
        ),
      validateAll: () => validateAll(ctx),

      getFormValues: () => ctx.get().state.values.formValues,
      getTrimmedFormValues: () => {
        const formValues = ctx.get().state.values.formValues;
        const trimedFormValues = {};
        Object.keys(formValues).forEach(
          (field) =>
            (trimedFormValues[field] = String(formValues[field]).trim()),
        );

        return trimedFormValues;
      },

      getFormValue: (field) => ctx.get().state.values.formValues[field],
      getTrimmedFormValue: (field) => {
        const value = ctx.get().state.values.formValues[field];
        return String(value).trim() || value;
      },

      showErrors: () => showErrors(ctx),
      hideErrors: () => hideErrors(ctx)
    },
  });

  return clientWorkflow;
}
