export default function setDomElementValue(element, newValue) {
    const { type, tagName } = element;

    // 1. Checkboxes -> Expects boolean
    if (type === 'checkbox') {
        element.checked = Boolean(newValue);
    } 
    // 2. Radio Buttons -> Only check if the values match
    else if (type === 'radio') {
        element.checked = String(element.value) === String(newValue);
    } 
    // 3. Multi-Select -> Expects an array of values
    else if (tagName === 'SELECT' && element.multiple) {
        const values = Array.isArray(newValue) ? newValue.map(String) : [String(newValue)];
        Array.from(element.options).forEach(opt => {
            opt.selected = values.includes(String(opt.value));
        });
    } 
    // 4. File Inputs -> For security, you can only clear them programmatically
    else if (type === 'file') {
        if (!newValue) element.value = ''; // Safely clears the file picker
    }
    // 5. Default: text, textarea, single select, date, number, etc.
    else {
        element.value = newValue ?? ''; 
    }
}
