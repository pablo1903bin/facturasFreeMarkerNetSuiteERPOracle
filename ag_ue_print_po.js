function beforeLoad(type, form, request) {
  form.setScript('customscript_client_ag_print');
  form.addButton('custpage_Print_btn', 'Imprimir Nota', 'client_print_po()');
}