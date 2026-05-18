import * as type  from "../helpers/index.js";

export default function validateWorkflowObject(workflow) {
  const messageForExpectedWorklow =
    "Expected an object:{} with name, state and actions properties.";
  const expectedProps = ["name", "state", "actions"];

  if (!workflow || type.isEmpty(workflow))
    return `No workflow provided to defineWorkflow(). ${messageForExpectedWorklow}.`;

  if (!type.isObject(workflow))
    return `Invalid workflow provided to defineWorkflow(). ${messageForExpectedWorklow}.`;

  expectedProps.forEach((prop) => {
    if (!workflow.hasOwnProperty(prop))
      return `No ${prop} property provided in workflow object to defineWorkflow(). ${messageForExpectedWorklow}.`;
  });

  return null;
}
