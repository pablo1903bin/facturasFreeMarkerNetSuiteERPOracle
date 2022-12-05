/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 define(["N/ui/serverWidget"], function (serverWidget) {
    function onRequest(context) {
      if (context.request.method === "GET") {
        var form = serverWidget.createForm({
          title: "Simple Form",
        });
        //Crear Formulrio d opcion multiple
        var select = form.addField({
          id: "custpage_selectfield",
          type: serverWidget.FieldType.SELECT,
          label: "Selecciona Addenda",
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
       
          var selectw = form.addField({
          id: "custpage_selectfield2",
          type: serverWidget.FieldType.SELECT,
          label: "Selecciona Addenda2",
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
      onRequest: onRequest,
    };
  });
  