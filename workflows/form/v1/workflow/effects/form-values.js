import setDomElementValue from "../../helpers/set-element-value.js";

export default function updateFormValues(form, formValues, formFields) {
  formFields.forEach((field) => {
    const element = form.querySelector(`[name="${field.name}"]`) ?? null;

    if (!element) return;

    const elementValue = formValues[field.name];

    setDomElementValue(element, elementValue);
  });
}
