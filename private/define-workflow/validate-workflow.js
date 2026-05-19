import * as type from "../helpers/index.js";

const EXPECTED_PROPS = ["name", "state", "actions"];

const BASE_MESSAGE =
  "Expected an object with name, state, and actions properties.";

export default function validateWorkflowObject(workflow) {
  if (workflow == null || type.isEmpty(workflow)) {
    return `No workflow provided to defineWorkflow(). ${BASE_MESSAGE}`;
  }

  if (!type.isObject(workflow)) {
    return `Invalid workflow provided to defineWorkflow(). ${BASE_MESSAGE}`;
  }

  for (const prop of EXPECTED_PROPS) {
    if (!Object.hasOwn(workflow, prop)) {
      return `Missing '${prop}' property in workflow object passed to defineWorkflow(). ${BASE_MESSAGE}`;
    }
  }

  return null;
}