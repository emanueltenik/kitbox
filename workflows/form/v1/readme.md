# Form Workflow v1

`createForm` creates a controller around a native HTML form. It keeps form values in workflow state, runs field validation, emits lifecycle events, and can show hints or validation notes beside fields.

This workflow is framework-agnostic and works directly with DOM form elements.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Demo](#demo)
- [Field Config](#field-config)
- [Validation](#validation)
- [Controller API](#controller-api)
- [Events](#events)
- [Supported Controls](#supported-controls)
- [DOM Effects](#dom-effects)
- [Notes](#notes)

## Basic Usage

```js
import { createForm } from "../../../index.js";

const contactForm = createForm({
  element: document.querySelector("#contact-form"),
  formFields: [
    {
      name: "email",
      initialValue: "",
      hint: "Use an email address you check often.",
      validate: ({ value, isEmpty }) => {
        if (isEmpty(value)) return { message: "Email is required." };
        if (!String(value).includes("@")) {
          return { message: "Enter a valid email address." };
        }

        return null;
      },
    },
  ],
});

contactForm.runWorkflow();

contactForm.on("submit", () => {
  const invalidFields = contactForm.validateAll();

  if (invalidFields) {
    contactForm.showErrors();
    return;
  }

  const payload = contactForm.getTrimmedFormValues();
  console.log(payload);
});

contactForm.on("reset", () => {
  contactForm.reset();
});
```

## Demo

A browser demo is available at:

```text
workflows/form/v1/demo/index.html
```

## Field Config

Each item in `formFields` describes one form control. The `name` must match a field in the form.

```js
{
  name: "email",
  initialValue: "",
  hint: "Use an email address you check often.",
  validate: ({ value, trimmedValue, isEmpty }) => {
    if (isEmpty(value)) return { message: "Email is required." };
    return null;
  },
}
```

| Option | Description |
| --- | --- |
| `name` | Matches the form control's `name` attribute. |
| `initialValue` | Initial value written to state and the DOM. |
| `hint` | Optional helper text shown on focus or while invalid. |
| `validate` | Optional validator. Return an error object when invalid, otherwise `null` or `undefined`. |

## Validation

Validators receive:

```js
{
  value,
  trimmedValue,
  isEmpty,
}
```

Validators should return an error object:

```js
{ message: "Email is required." }
```

Return `null` or `undefined` when the field is valid.

## Controller API

### `runWorkflow()`

Initializes state, writes initial values into the DOM, validates the current form, and attaches form listeners.

```js
contactForm.runWorkflow();
```

### `reset()`

Removes hints and error notes, then restores the configured initial values.

```js
contactForm.reset();
```

### `state()`

Returns the current workflow state.

```js
const state = contactForm.state();

state.status;
state.values.formValues;
state.errors.invalidFields;
```

### `validate(fieldName)`

Validates one field.

```js
const error = contactForm.validate("email");
```

### `validateAll()`

Validates every configured field.

```js
const invalidFields = contactForm.validateAll();
```

Returns an object keyed by field name, or `null` when all fields are valid.

### `getFormValues()`

Returns the current form values from state.

```js
const values = contactForm.getFormValues();
```

### `getTrimmedFormValues()`

Returns a new object with all values converted to strings and trimmed.

```js
const payload = contactForm.getTrimmedFormValues();
```

### `getFormValue(fieldName)`

Returns one field value.

```js
const email = contactForm.getFormValue("email");
```

### `getTrimmedFormValue(fieldName)`

Returns one field value as a trimmed string.

```js
const email = contactForm.getTrimmedFormValue("email");
```

### `showErrors()`

Displays error notes for invalid fields and focuses the first invalid field.

```js
contactForm.showErrors();
```

### `hideErrors()`

Removes visible error notes.

```js
contactForm.hideErrors();
```

### `on(eventName, handler)`

Subscribes to a workflow event.

```js
contactForm.on("submit", ({ event }) => {
  console.log(event);
});
```

### `off(eventName, handler)`

Removes a workflow event handler.

```js
function handleSubmit() {}

contactForm.on("submit", handleSubmit);
contactForm.off("submit", handleSubmit);
```

## Events

| Event | When it fires | Payload |
| --- | --- | --- |
| `submit` | Native form submit is prevented. | `{ event }` |
| `reset` | Native form reset is prevented. | `null` |
| `change` | A configured input changes. | `{ changed }` |

For `change`, `changed` is currently populated when the field has a validation error. Otherwise it is `null`.

## Supported Controls

| Control | Value behavior |
| --- | --- |
| Text inputs, textareas, single select | Uses `element.value`. |
| Checkbox | Uses `element.checked`. |
| Radio | Stores the checked radio value. |
| File input | Stores a `File`, or an array of files when `multiple` is enabled. |
| Multiple select | Stores an array of selected values. |

## DOM Effects

Hints are inserted with:

```html
data-create-form-hint
```

Error notes are inserted with:

```html
data-create-form-error-note
```

Invalid fields receive:

```html
aria-invalid="true"
aria-describedby="<field-name>-error-note"
```

## Notes

- Call `runWorkflow()` once after creating the controller.
- The form element must exist before calling `createForm()`.
- Field names in `formFields` should match real controls in the form.
- Native submit and reset behavior is prevented so the workflow can emit `submit` and `reset` events.
