import getElementValue from "../../helpers/get-element-value.js";
import setState from "../reducers/set-state.js";
import validateFormValue from "../validators/form-value.js";
import { removeHint, setHint } from "../effects/hints.js";
import { removeErrorNote } from "../effects/error-notes.js";

export default function handleOnChange(e, ctx) {
  const ctxObject = ctx.get();
  const { emitter, state, formFields } = ctxObject;
  const element = e.target;
  const field = formFields.filter((f) => f.name === element.name)[0];
  const fieldName = element.name;

  if (!fieldName) return;

  removeErrorNote(field, ctx);

  const value = getElementValue(element); // from the DOM

  // We only update state if a radio is checked.
  // If it's unchecked (value is null), we ignore it so we don't overwrite the selected one.
  if (element.type === "radio" && value === null) return;

  // show hint
  if (Object.hasOwn(field, "hint") && !Object.hasOwn(field, "validate"))
    setHint(field, ctx);

  // validate input
  let error = null;

  if (Object.hasOwn(field, "validate"))
    error = validateFormValue(
      formFields.filter((f) => f.name === fieldName)[0],
      ctx,
    );

  // show/hide hint based on if the input is valid
  if (Object.hasOwn(field, "validate")&& !error) removeHint(field, ctx);
  if (Object.hasOwn(field, "validate")&& error) setHint(field, ctx);

  // update state
  const newValues = {
    ...state.values,
    ...{ [fieldName]: value },
  };

  const newErrors = error
    ? {
        ...state.errors,
        [fieldName]: error,
      }
    : state.errors;

  if (!error &&  Object.hasOwn(state, "errors")) delete newErrors[fieldName];

  const newState = { ...state, values: newValues, errors: newErrors };

  setState(ctx, newState);

  // Expose the change event with field name, value, and error (if any)
  emitter.emit("change", {
    name: fieldName,
    value: value,
    error: error ? error : null,
  });
}
