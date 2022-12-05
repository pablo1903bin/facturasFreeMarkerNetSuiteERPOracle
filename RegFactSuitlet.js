/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 define(["N/ui/serverWidget"], function (serverWidget) {
  function suitelet_print(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "Simple Form",
      });
      //Crear Formulario d opcion multiple
      var select = form.addField({
        id: "custpage_selectfield",
        type: serverWidget.FieldType.SELECT,
        label: "Selecciona Addenda", //Titulo del formulario
      });
      select.addSelectOption({
        value: "a",
        text: "Oxxo",
      });
      select.addSelectOption({
        value: "b",
        text: "Waltmart",
      });
      select.addSelectOption({
        value: "c",
        text: "Casa Ley",
      });
      form.addSubmitButton({
        label: "Crear Addenda",
      });
      context.response.writePage(form);
    } else {
      var delimiter = /\u0001/;
      var textField = context.request.parameters.textfield;
      var dateField = context.request.parameters.datefield;
      var currencyField = context.request.parameters.currencyfield;
      var selectField = context.request.parameters.selectfield;
      var sublistData = context.request.parameters.sublistdata.split(delimiter);
      var sublistField1 = sublistData[0];
      var sublistField2 = sublistData[1];
      context.response.write(
        "You have entered: " +
          textField +
          " " +
          dateField +
          " " +
          currencyField +
          " " +
          selectField +
          " " +
          sublistField1 +
          " " +
          sublistField2
      );
    }
  }
  return {
    onRequest: suitelet_print,
  };
});








// /**
//  * @NApiVersion 2.x
//  * @NScriptType Suitelet
//  */
// define([], function () {
//   //fUNCION DE 1.0
//   function suitelet_print(request, response) {
//     var ifid = request.getParameter("custparam_recid");
//     var file = nlapiPrintRecord("TRANSACTION", ifid, "PDF", {
//       formnumber: STDTMPLJOURNAL,
//     });
//     //this will allow you to define the template that will be used to print the invoice
//     response.setContentType("PDF", "Print Invoice Record", "INLINE");
//     response.write(file.getValue());
//   }

//   return {
//     onRequest: suitelet_print,
//   };
// });

////// mi script 29/11/2022
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
// This sample shows how to render search results into a PDF file.
define(['N/render','N/file','N/record'],

function(render, file , record) {
  function onRequest(context) {

      if (context.request.method == 'GET'){
            
               function renderizarTemplate(){
                  var ifid = context.request.parameters.recid;   
                  log.debug("Mi ifId verdas",ifid);
                  var transactionFile = render.transaction({
                     entityId: 4531,
                     printMode: render.PrintMode.HTML
                  });
              
                  var fileObj = render.packingSlip({//Me devuelve un archivo en objeto
                   entityId: 4531,
                   printMode: render.PrintMode.PDF,
                     inCustLocale: true
              });
                 log.debug("Mi archivo a renderizar",fileObj);
                 //fileObj.save()
           
         }
        renderizarTemplate();
      }
    }
  return {
     onRequest: onRequest
  };

 });



 /**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
// Este ejemplo muestra cómo representar los resultados de la búsqueda en un archivo PDF.
define(['N/render','N/file','N/record','N/ui/serverWidget','N/xml'], function(render, file , record,serverWidget,xml) {
      
  function onRequest(context) {
     if (context.request.method == 'GET') {
         
           var serverResponse = context.response; //Gets the response object
                 
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
                 '<td colspan="26" rowspan="1" style="width: 400px;"><strong style="font-size: 11px;">LIBERACI&Oacute;N DE MATERIA DOSIFICADO</strong></td>'+
         
                "</tr>"+
               "</table>"+
              "</body>\n" +
              "</pdf>"; //Test string to be rendered as PDF
         
           var filename = 'Orden de Trabajo.pdf'; //Nombre del pdf cuando se descargue
           serverResponse.setHeader({
           name: 'Orden-trabajo',
             value: 'filename="' + filename + '"',
         }); //sets the filename to the specified format or name
      
                var miId = context.request.parameters.recid;
                var myId = parseInt(miId);
                var xmlFileContent = file.load('SuiteScripts/TempOrdenTrabajo.xml').getContents();
                log.debug("contenido cadena file", xmlFileContent);
                var tip = typeof xmlFileContent;
                log.debug("tipo d datos del archivo",tip);
        
       //cargar un registro 
       var renderer = render.create();
         var myContent = renderer.addRecord({
             templateName: 'record',
             record: record.load({
                 type: record.Type.ITEM_FULFILLMENT,
                 id:4531
             }),
         });
           
          
           log.debug("Mi obj de registro", myContent);//********************************************
    
      try{
            //serverResponse.renderPdf({
         //  xmlString: xmlStr
       // }); //renders the string as a PDF file
         //return;
         
         // context.response.renderPdf(transactionFile);
          context.response.writePage(myContent);
} catch (e) {
    log.error({
      title : e.name,
      details : e.message,
    });
  }
         
          }
 
    }
   return {
         onRequest: onRequest
      };

     });