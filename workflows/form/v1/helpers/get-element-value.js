export default function getElementValue(element) {
    const { type, tagName, checked, value, files, multiple, selectedOptions } = element;

    if (type === 'checkbox') return checked;

    if (type === 'radio') return checked ? value : null; //Only return value if it's the checked one

    if (type === 'file') {  // Return array if multiple, otherwise the single File object (or null)
        return multiple ? Array.from(files) : (files[0] || null); 
    }

    if (tagName === 'SELECT' && multiple) {
        return Array.from(selectedOptions).map(opt => opt.value); //Array of values
    }

    return value; // Default for normal inputs, single select, date, number, etc.
}
