/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

 define(["N/ui/dialog","N/currentRecord","N/url"], function (dialog,currentRecord,url) {
  function pageInit(context){  
  }
  function miFuncion(context) {
    try {
          var soRec = currentRecord.get();
          log.debug("Id de PInxe Registro actual S-Client",soRec.id);
          log.debug("Tipo de Registro S-Client ",soRec.type);
          var lUrl = url.resolveScript({
              scriptId: 'customscriptmco_suitlet_imprime',//customscriptmco_sc_helloword, customscriptmco_suitlet_imprime
              deploymentId: 'customdeploymco_suitlet_imprime',//customdeploymco_suitlet_pedidos ,, customdeploymco_suitlet_imprime
              params:{ rectype:soRec.type, recid:soRec.id, tempid:"CUSTTMPL_136_5662827_SB1_211"}//Debe ser el id de mi formulario 
          })
//https://5662827-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=1598&deploy=1&compid=5662827_SB1&rectype=itemfulfillment&recid=4531&tempid=CUSTTMPL_136_5662827_SB1_211
//https://5662827-sb1.app.netsuite.com/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&id=4529&label=Packing%20Slip&printtype=packingslip&trantype=itemship&orgtrantype=SalesOrd&auxtrans=4531     
window.open(lUrl);
          log.debug({
             title: "Contenido de lUrl",
             details: lUrl,
          });
     } catch (e) {
         log.error({
            title: e.name,
            details: e.message,
        });
     }
  }

  return {
    myFunction: miFuncion,
    pageInit: pageInit,
  };
});
