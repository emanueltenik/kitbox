export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  return value && typeof value === "object" && !isArray(value);
}

export function isString(value) {
  return typeof value === "string";
}

export function isEmpty(value) {
  if (isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  if (isString(value)) return value.trim().length === 0;
  if (isUndefined(value) || isNull(value)) return true;
  return false;
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isInteger(value) {
  return Number.isInteger(value);
}

export function isBoolean(value) {
  return typeof value === "boolean";
}

export function isUndefined(value) {
  return typeof value === "undefined";
}

export function isNull(value) {
  return value === null;
}

export function isFalsy(value) {
  return !value;
}

export function isHtmlElement(value) {
  return value instanceof HTMLElement;
}
