/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
 define(["N/record", "N/runtime", "N/ui/serverWidget", "N/url"], function (
    record,
    runtime,
    serverWidget,
    url
  ) {
    function beforeLoad(context) {
      var estado = context.newRecord.getText("shipstatus");//Conocer estado actual
      var currentUserID = runtime.getCurrentUser().id;//Conocer mi Id de Usuario
      if (estado == "EN PROCESO") {//Si mi estado actual es- EN PROCESO
        if (
          runtime.executionContext === runtime.ContextType.USER_INTERFACE &&
          (context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.VIEW)
        ) {
          //Creo primer boton
          context.form.addButton({
            id: "custpage_sample_tab",
            label: "Imprimir Orden de trabajo",
            functionName: "myFunction",
          });
          context.form.clientScriptModulePath = "./RegFactScriptClient.js"; 
          
          
          
          //Agrego mi tab personalizado
          var SampleTab = context.form.addTab({
            id: "custpage_sample_tab",
            label: "Impresiones",
          });
  
          //En la pestaña Muestra, cree un nuevo campo de tipo inlinehtml
          var createNewReqLink = context.form.addField({
            id: "custpage_new_req_link",
            type: "inlinehtml",
            label: " ",
            container: "custpage_sample_tab",
          });
  
          //Definimos los parámetros del Suitelet que se ejecutará
          //Reemplace el scriptId y el deploymentId con los valores de su Suitelet
          var linkURL =
            url.resolveScript({
              scriptId: "customscriptmco_suitlet_imprime",
              deploymentId: "customdeploymco_suitlet_imprime",
            }) +
            "&recordid=" +
            context.newRecord.id;
  
          //Cree un enlaces para iniciar los Suitelets. K me llevaran a las impresiones
          createNewReqLink.defaultValue =
            '<B>Click <A HREF="' +
            linkURL +
            '">aqui</A> para imprimir Orden de Trabajo.</B>';
        } //temina if anidado
      } //termina if principal 
    } //Termina funcion principal
    return {
      beforeLoad: beforeLoad,
    };
  });
  
  
/*mi tab  

          /**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

/*
           define(['N/record', 'N/runtime', 'N/ui/serverWidget', 'N/url'], function(record, runtime, serverWidget, url) {
            function beforeLoad(scriptContext) {
                var currentUserID = runtime.getCurrentUser().id;
                /* If the record is edited or viewed, a tab called Sample Tab is added.
                 * Note that the script execution context is set to userinterface.
                 * This ensures that this script is ONLY invoked from a user event
                 * occurring through the UI.
                 */
/*     if ((runtime.executionContext === runtime.ContextType.USER_INTERFACE) && (scriptContext.type === scriptContext.UserEventType.EDIT || scriptContext.type === scriptContext.UserEventType.VIEW)) {
                    //Creates the new tab Sample Tab on the form
                    var SampleTab = scriptContext.form.addTab({
                        id: 'custpage_sample_tab',
                        label: 'Mi tap'
                    });
        
                    //On Sample Tab, create a field of type inlinehtml
                    var createNewReqLink = scriptContext.form.addField({
                        id: 'custpage_new_req_link',
                        type: 'inlinehtml',
                        label: ' ',
                        container: 'custpage_sample_tab'
                    });
        
                    //Define the parameters of the Suitelet that will be executed
                    //Replace the scriptId and the deploymentId with the values of your Suitelet
                    var linkURL = url.resolveScript({
                        scriptId: 'customscriptmco_suitelet_hello_word',
                        deploymentId: 'customdeploymco_suitelet_hello_word'
                    }) + '&recordid=' + scriptContext.newRecord.id;
                    
                    //Create a link to launch the Suitelet.
                    createNewReqLink.defaultValue = '<B>Click <A HREF=\"' + linkURL
                        +'\">here</A> to create a new document signature request record.</B>';
        
                    //Add a sublist to Sample Tab
                    var signatureRequestSublist = scriptContext.form.addSublist({
                        id: 'custpage_sig_req_sublist',
                        type: 'list',
                        label: 'Document Signature Requests',
                        tab: 'custpage_sample_tab'
                    });
                    signatureRequestSublist.addField({
                        id: 'custpage_req_name',
                        type: 'text',
                        label: 'Name'
                    });
                    signatureRequestSublist.addField({
                        id: 'custpage_req_status',
                        type: 'text',
                        label: 'Status'
                    });
                    signatureRequestSublist.addField({
                        id: 'custpage_req_created',
                        type: 'date',
                        label: 'Date Created'
                    });
                }
            }
        
            return {
                beforeLoad: beforeLoad,
            };
        }); 
        
                


*/
