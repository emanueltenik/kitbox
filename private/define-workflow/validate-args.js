import * as type from "../helpers/index.js";

const BASE_MESSAGE =
  "Expected an object with an 'element' property (a DOM element associated with the workflow).";

export default function validateArgs(args) {
  if (args == null) {
    return `No arguments provided to defineWorkflow(). ${BASE_MESSAGE}`;
  }

  if (!type.isObject(args)) {
    return `Invalid arguments provided to defineWorkflow(). ${BASE_MESSAGE}`;
  }

  if (!Object.hasOwn(args, "element")) {
    return `Missing 'element' property in arguments to defineWorkflow(). ${BASE_MESSAGE}`;
  }

  const { element } = args;

  if (!type.isHtmlElement(element)) {
    return `The 'element' property provided to defineWorkflow() is not a valid DOM element. ${BASE_MESSAGE}`;
  }

  return null;
}