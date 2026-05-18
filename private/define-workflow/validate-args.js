import * as type  from "../helpers/index.js";

export default function validateArgs(args) {
  const messageForExpectedArgs =
    "Expected an object:{} with atleast an element property (the DOM element associated with the workflow";

  if (!args || type.isEmpty(args))
    return `No arguments provided to defineWorkflow(). ${messageForExpectedArgs}.`;

  if (!type.isObject(args))
    return `Invalid arguments provided to defineWorkflow(). ${messageForExpectedArgs}.`;

  if (!args.hasOwnProperty("element"))
    return `No element prop provided in arguments to defineWorkflow(). ${messageForExpectedArgs}.`;

  if (!type.isHtmlElement(args.element))
    return `The element property provided in arguments to defineWorkflow() is not a valid DOM element. ${messageForExpectedArgs}.`;

  return null;
}
