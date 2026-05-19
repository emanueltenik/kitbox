export function isArray(value) {
  return Array.isArray(value);
}

export function isEmptyArray(value) {
  return Array.isArray(value) && value.length === 0;
}

export function isObject(value) {
  return value !== null && typeof value === "object";
}

export function isPlainObject(value) {
  //either normal {} object or Object.create(null)
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function isEmptyObject(value) {
  return (
    value !== null &&
    value !== undefined &&
    value.constructor === Object &&
    Object.keys(value).length === 0
  );
}

export function isString(value) {
  return typeof value === "string";
}

export function isEmptyString(value) {
  return typeof value === "string" && value.trim().length === 0;
}

export function isUndefined(value) {
  return typeof value === "undefined";
}

export function isNull(value) {
  return value === null;
}

export function isNil(value) {
  return value == null; // null or undefined
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}

export function isNumeric(value) {
  if (typeof value === "number") {
    return !Number.isNaN(value);
  }

  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim();
  if (trimmed === "") return false;

  const num = Number(trimmed);

  return !Number.isNaN(num);
}

export function isInteger(value) {
  return Number.isInteger(value);
}

export function isFloat(value) {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    !Number.isInteger(value)
  );
}

export function isBoolean(value) {
  return typeof value === "boolean";
}

export function isHtmlElement(value) {
  return value instanceof HTMLElement;
}
