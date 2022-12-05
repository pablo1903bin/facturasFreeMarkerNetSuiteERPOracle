function suitelet_print(request, response) {
  if (request.getMethod() == 'GET' ) {
       var ifid = request.getParameter('custparam_recid');//Id que viene en la peticion http 1572
       var archivo = nlapiPrintRecord('TRANSACTION', "17", 'PDF', {
         formnumber: "STDTMPLJOURNAL"
       });
       //esto me permitirá definir la plantilla que se utilizará para imprimir la factura
       response.setContentType('PDF', 'Print Invoice Record', 'INLINE');
       response.write(archivo.getValue());
   }
}

//   function suitelet_print
// (request, response)
// {
//  if (request.getMethod() == 'GET' )
//  {
//  //Create the form and add fields to it
//  var form = nlapiCreateForm("Suitelet - GET call" );
//  form.addField('custpage_field1', 'text', 'Text Field' ).setDefaultValue('This is a text field' );
//  form.addField('custpage_field2', 'integer', 'Integer Field' ).setDefaultValue(10);
//  form.addField('custpage_field3', 'select', 'Select Field', 'customer' );

//  form.addSubmitButton('Submit' );

//  response.writePage(form);
//  }
//  //POST call
//  else
//  {
//  var form = nlapiCreateForm("Suitelet - POST call" );

//  //create the fields on the form and populate them with values from the previous screen
//  var resultField1 = form.addField('custpage_res1', 'text', 'Text Field value entered: ' );
//  resultField1.setDefaultValue(request.getParameter('custpage_field1' ));
//  resultField1.setDisplayType('inline' );

//  var resultField2 = form.addField('custpage_res2', 'integer', 'Integer Field value entered: ' );
//  resultField2.setDefaultValue(request.getParameter('custpage_field2' ));
//  resultField2.setDisplayType('inline' );

//  var resultField3 = form.addField('custpage_res3', 'select', 'Select Field value entered: ', 'customer' );
//  resultField3.setDefaultValue(request.getParameter('custpage_field3' ));
//  resultField3.setDisplayType('inline' );

//  response.writePage(form);
//  }
// }