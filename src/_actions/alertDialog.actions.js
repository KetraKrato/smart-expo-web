import { alertDialogConstants } from "../_constants";

export const alertDialogActions = {
  success,
  error,
  pending,
  begin,
};
function begin(message) {
  return { type: alertDialogConstants.BEGIN, message };
}
function success(message) {
  return { type: alertDialogConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertDialogConstants.ERROR, message };
}

function pending(message) {
  return { type: alertDialogConstants.PENDDING, message };
}
