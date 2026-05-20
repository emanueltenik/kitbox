import * as type from "../../../../../private/helpers/type-checks.js";

const FORM_FIELDS_SCHEMA =
    "Expected an array of objects where each object defines a form input passed to createForm(). " +
    "Each object must contain a 'name' property matching an HTML form element name. " +
    "Optional properties: validate, hint, initialValue.";

export default function validateFormFields(ctx) {
    const { workflowElement, formFields } = ctx.get();

    if (type.isNil(formFields)) {
        return `formFields was not passed to createForm(). ${FORM_FIELDS_SCHEMA}`;
    }

    if (!type.isArray(formFields)) {
        return `Invalid formFields type. ${FORM_FIELDS_SCHEMA}`;
    }

    for (const [index, field] of formFields.entries()) {
        const itemNumber = index + 1;

        if (!type.isPlainObject(field)) {
            return `Expected object at formFields item ${itemNumber}, received ${typeof field}. ${FORM_FIELDS_SCHEMA}`;
        }

        if (!Object.hasOwn(field, "name") || !type.isString(field.name)) {
            return `Missing or invalid 'name' property at formFields item ${itemNumber}. ${FORM_FIELDS_SCHEMA}`;
        }

        const formElement = workflowElement.querySelector(
            `[name="${field.name}"]`
        );

        if (!type.isHtmlElement(formElement)) {
            return `No corresponding form element found for formFields item ${itemNumber} (name="${field.name}").`;
        }

        if (
            Object.hasOwn(field, "validate") &&
            !type.isFunction(field.validate)
        ) {
            return `validate property at formFields item ${itemNumber} must be a function. Received ${typeof field.validate}.`;
        }
    }

    return null;
}