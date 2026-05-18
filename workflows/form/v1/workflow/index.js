import setState from "./reducers/set-state.js";
import handleOnChange from "./events/onchange.js";
import validateAll from "./validate-all.js";
import handleHintsOnFocus from "./events/onfocus.js";
import handleHintsOnBlur from "./events/onblur.js";


export default function (ctx, reset) {
  const ctxObject = ctx.get();
  const { workflowElement, formFields, state, emitter } = ctxObject;

  // set inital State
  const initialFormValues = {};

  formFields.forEach(
    (field) => (initialFormValues[field.name] = field.initialValue || ""),
  );

  setState(ctx, {
    status: "idle",
    values: { ...initialFormValues },
    errors: { ...validateAll(ctx) },
    result: null,
  });

  if (reset == true) return; // do not add events, since they already exist

  // handle default browser behaviours and emit events
  workflowElement.addEventListener("submit", (e) => {
    e.preventDefault();
    emitter.emit("submit", { event: e });
  });

  workflowElement.addEventListener("reset", (e) => {
    e.preventDefault();
    emitter.emit("reset", null);
  });

  // handle ctx manipulation on state change
  workflowElement.addEventListener("input", (e) => handleOnChange(e, ctx));

  // show/hide hints/errors
  handleHintsOnFocus(ctx);
  handleHintsOnBlur(ctx);
}
