function beforeLoad(type, form, request) {
  form.setScript('customscriptmco_print_invoice_cs');
  form.addButton('custpage_Print_btn', 'Imprimir Factura', 'testPrint()');
}

