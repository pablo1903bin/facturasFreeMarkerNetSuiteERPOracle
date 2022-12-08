/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 define(['N/render','N/file','N/record'],
 function(render, file , record) {
   
    function onRequest(context) {
 
         if (context.request.method == 'GET'){
 
                function renderizarTemplate(){
                     var ifid = context.request.parameters.recordid;//viene un valor en la url el id
                     log.debug("Mi ifId verdad",ifid);
 
                     var miId = parseInt(ifid);
                    // var obj_JE_order = record.load({ type: record.Type.ITEM_FULFILLMENT, id: ifid,isDynamic: true});
                     var transactionFile = render.transaction({
                         entityId:  miId,
                         printMode: render.PrintMode.PDF,
 
                         inCustLocale:true
                      });
                    var xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                    "<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n" +
                    "<pdf lang=\"ru-RU\" xml:lang=\"ru-RU\">\n" +
                    "<head>\n" +
                    "<link name=\"russianfont\" type=\"font\" subtype=\"opentype\" " +
                    "src=\"NetSuiteFonts/verdana.ttf\" " +
                    "src-bold=\"NetSuiteFonts/verdanab.ttf\" " +
                    "src-italic=\"NetSuiteFonts/verdanai.ttf\" " +
                    "src-bolditalic=\"NetSuiteFonts/verdanabi.ttf\" " +
                    "bytes=\"2\"/>\n" +
                    "</head>\n" +
                    "<body font-family=\"russianfont\" font-size=\"8\">"+
                    '<table  align="center" border="1" cellpadding="2" cellspacing="4" style="width:660px;">'+
                      "<tr>"+
                         '<td colspan="1" rowspan="1" style="width: 16px;">UNO</td>'+
                         '<td colspan="26" rowspan="1" style="width: 400px;"><strong style="font-size: 11px;">LIBERACI&Oacute;N DE MATERIA DOSIFICADO${record.id}</strong></td>'+
                       "</tr>"+
                    "</table>"+
                    "</body>\n" +
                    "</pdf>";
                  
                     var xmlTmplFile = file.load('Templates/PDF Templates/invoicePDFTemplate.xml');
                     var cadenaxml= xmlTmplFile.getContents();
                  
                  
                    log.debug("Archivo cargado xml",  cadenaxml);
                     var myFile = render.create();
                     myFile.templateContent = xmlStr;
 
                     var pdf = myFile.renderAsPdf();   
                     pdf.name = 'test.pdf';
                     context.response.writeFile(pdf,true);
                     log.debug("Mi archivo a renderizar",transactionFile);
                     //fileObj.save()
 
                 }
                 renderizarTemplate();
          }
    }
   return {
      onRequest: onRequest
   };
 
  });