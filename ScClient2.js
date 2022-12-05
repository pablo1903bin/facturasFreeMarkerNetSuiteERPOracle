/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(["N/ui/dialog", "N/currentRecord", "N/url"], function (
  dialog,
  currentRecord,
  url
) {
  function pageInit() {}
  function miFuncion() {
    try {
      var soRec = currentRecord.get();
      log.debug("Id de Registro actual", soRec.id);
      var lUrl = url.resolveScript({
        scriptId: "customscriptmco_suitlet_imprime",
        deploymentId: "customdeploymco_suitlet_imprime",
        params: {
          rectype: soRec,
          recid: soRec.id,
          tempid: "CUSTTMPL_NOTA_ENTRADA",
        },
        returnExternalUrl: true,
      });
      window.open(lUrl);

      log.debug({
        title: "Todo bien",
        details: "desplegue correctamente mi script chido",
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
