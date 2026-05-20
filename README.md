# Kitbox

Kitbox is a small workflow layer for common browser UI logic.

It gives repeated UI patterns a consistent controller shape: create a workflow, initialize it, read its state, call its actions, and subscribe to lifecycle events. The project is currently early and form-focused.


## Project Status

Kitbox is Experimental and still in development. APIs may change while the workflow patterns are being refined.


Currently exported from Kitbox:

```js
createForm
```

## Table of Contents

- [Why](#why)
- [Installation](#installation)
- [Demo](#demo)
- [Quick Example](#quick-example)
- [Available Workflows](#available-workflows)
- [Controller Pattern](#controller-pattern)
- [Form Controller API](#form-controller-api)
- [Design Principles](#design-principles)
- [Planned Ideas](#planned-ideas)
- [License](#license)
- [Contributing](#contributing)

## Why

Many small browser projects end up repeating the same glue code:

- collect values from a form
- keep state in sync with the DOM
- validate fields
- show hints or errors
- intercept submit and reset events
- expose hooks for app-specific behavior

Kitbox packages that repeated behavior into reusable workflows without tying the code to a frontend framework.

## Installation

For now, copy or download the `kitbox` folder into your project and import from it directly.

```js
import { createForm } from "./kitbox/index.js";
```

NPM packaging may be added later if the project grows into a stable library.

## Demo

A public-facing form workflow demo is available at:

```text
workflows/form/v1/demo/index.html
```

## Quick Example

```html
<form id="contact-form">
  <label>
    Email
    <input name="email" type="email" />
  </label>

  <label>
    Message
    <textarea name="message"></textarea>
  </label>

  <button type="submit">Send</button>
  <button type="reset">Reset</button>
</form>
```
```css
[data-create-form-error-note] {
  color: red;
}

[data-create-form-hint] {
  color: gray;
  font-size: 16px;
}

```
```js
import { createForm } from "./kitbox/index.js";

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
    {
      name: "message",
      initialValue: "",
      validate: ({ trimmedValue }) => {
        if (trimmedValue.length === 0) return { message: "Message is required." };
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

## Available Workflows

### `createForm`

Creates a controller around a native HTML form.

It can:

- initialize form values
- keep workflow state in sync with form input
- validate one field or all fields
- show and hide field hints
- show and hide error notes
- emit `submit`, `reset`, and `change` events
- expose form values through controller methods

See the form workflow docs:

```text
workflows/form/v1/readme.md
```

## Controller Pattern

Kitbox workflows are intended to follow this shape:

```js
const workflow = createWorkflow(config);

workflow.runWorkflow();
workflow.state();
workflow.on("event", handler);
workflow.off("event", handler);
```

Each workflow returns a controller with:

- workflow-specific actions
- a `state()` method
- `on()` and `off()` event hooks
- a reference to the controlled DOM element

## Form Controller API

```js
contactForm.runWorkflow();
contactForm.reset();

contactForm.state();

contactForm.validate("email");
contactForm.validateAll();

contactForm.getFormValues();
contactForm.getTrimmedFormValues();
contactForm.getFormValue("email");
contactForm.getTrimmedFormValue("email");

contactForm.showErrors();
contactForm.hideErrors();

contactForm.on("submit", handler);
contactForm.off("submit", handler);
```

## Design Principles

- Workflows over scattered utilities
- Explicit state and actions
- DOM-first, framework-agnostic behavior
- Small controllers with predictable methods
- App code controls what happens after workflow events

## Planned Ideas

These are not currently exported as working workflows:

- `createStore` for local storage or session storage patterns
- `createFetch` for data fetching state and retries
- lifecycle cleanup methods such as `destroy()`
- npm packaging once the API feels stable

## License

MIT

## Contributing

Ideas, issues, and small improvements are welcomed.
