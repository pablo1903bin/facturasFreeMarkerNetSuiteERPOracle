function client_print_po() {
  //var suiteletURL = 'https://5662827-sb1.app.netsuite.com' +
    //nlapiResolveURL('SUITELET', 'customscript_ag_print_po', 'customdeploy_ag_print_po') +
    //'&custparam_po_id=' + nlapiGetRecordId();
	var newurl = nlapiResolveURL('SUITELET', 'customscript_ag_print_po', 'customdeploy_ag_print_po', false)
	
	newurl += '&custparam_po_id=' + nlapiGetRecordId();
	newurl += '&custparam_po_type=' + nlapiGetRecordType();
	
	console.log(newurl);
  //na1 can be changed depending on the data center/url of the user
  //scriptid and deploymentid will depend on the Suitelet that will be created below
  window.open(newurl);
}