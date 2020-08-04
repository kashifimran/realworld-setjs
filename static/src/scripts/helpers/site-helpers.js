export function formErrors(comp, errorCb) {
  return function(errors) {
    comp.data.errors = errors;
    comp.renderList('errors');
    errorCb();
  };
}
