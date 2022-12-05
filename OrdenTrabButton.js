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
      if (estado == "SO RECIBIDA") {//Si mi estado actual es- SO RESIBIDA 
        if (
          runtime.executionContext === runtime.ContextType.USER_INTERFACE &&
          (context.type === context.UserEventType.EDIT ||
            context.type === context.UserEventType.VIEW)
        ) {
          //Creo primer boton
          context.form.addButton({
            id: "custpage_sample_tab",
            label: "Imprimir Orden de trabajo",
            functionName: "miFunction",
          });
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
  