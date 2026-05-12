export default function getFormDataObject(formElement) {
    const formData = new FormData(formElement);
    const dataObject = {};

    formData.forEach((value, key) => {
        if (!Object.hasOwn(dataObject, key)) {
            dataObject[key] = value;
            return;
        }
        // If key exists, turn into an array or push to existing array
        if (!Array.isArray(dataObject[key])) {
            dataObject[key] = [dataObject[key]];
        }
        dataObject[key].push(value);
    });
    return dataObject;
}
