function testPrint() {
  var suiteletURL2= "https://tstdrv2662340.app.netsuite.com/app/site/hosting/scriptlet.nl?script=3244&deploy=2";
    var suiteletURL = 'https://tstdrv2662340.app.netsuite.com' +
      nlapiResolveURL('SUITELET', "customscriptmco_suitelet_templatepdf", "customdeploymco_suitelet_templatepdf") +
      '&custparam_recid=' + nlapiGetRecordId();
//na1 se puede cambiar dependiendo del centro de datos/url del usuario
     //scriptid y deploymentid dependerán del Suitelet que se creará a continuación
    window.open(suiteletURL2);
  }
  
  function callingPrintDirectly(){
    console.dir(context)
       var genericRestlerURL = url.resolveScript({
          scriptId: 'customscript_print_rl_trigger_print',
          deploymentId: 'customdeploy_print_rl_trigger_print',
          returnExternalUrl: false,
       })
      };