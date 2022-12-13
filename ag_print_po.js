function print_po(request, response) {
  
  var recId = request.getParameter('custparam_po_id');
  var recType = request.getParameter('custparam_po_type');
  
  if (recType == 'purchaseorder')
  {
    var file = nlapiPrintRecord('TRANSACTION', recId, 'PDF', {
	formnumber: 297
	});
  }
  
   if (recType == 'itemfulfillment')
  {
    var file = nlapiPrintRecord('TRANSACTION', recId, 'PDF', {
	formnumber: 298
	});
  }

  //this will allow you to define the template that will be used to print the invoice
  //itemfulfillment
  //
  response.setContentType('PDF', 'Print Invoice Record', 'INLINE');
  response.write(file.getValue());
}