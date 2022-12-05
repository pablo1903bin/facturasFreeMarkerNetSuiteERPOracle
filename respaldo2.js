/**
 * @NApiVersion  2.x
 * @NScriptType  Suitelet
 * @NModuleScope SameAccount
 * @author       Jaqueline Valencia - Luis Angel, Garcia
 * @description  This's a sample SuiteLet script(SuiteScript 2.0) to export data 
 *               to Excel file and directly download it in browser
 */
 define(['N/ui/serverWidget', 'N/encode' ,'N/search', 'N/record','N/format','N/file','N/xml','N/ui/message','N/currentRecord','N/https', 'N/url','N/format','N/format/i18n'],
 /**
 * @param {file}
 *            file
 * @param {format}
 *            format
 * @param {record}
 *            record
 * @param {redirect}
 *            redirect
 * @param {runtime}
 *            runtime
 * @param {search}
 *            search
 * @param {serverWidget}
 *            serverWidget
 */
function(ui,encode,SEARCHMODULE,r,format,file,xml,message,currentRecord, https, url,format,formato) {
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object}
     *            context
     * @param {ServerRequest}
     *            context.request - Encapsulation of the incoming
     *            request
     * @param {ServerResponse}
     *            context.response - Encapsulation of the Suitelet
     *            response
     * @Since 2015.2
     */
    function onRequest(option,context) {


    if (option.request.method == 'GET'){
       var form = star();
       option.response.writePage(form);
    }else{
        var form = star();
        option.response.writePage(form);
    }

    function star(){

        var temp =[];
        
         var clasificacion = LeerConfiguracion();
        

        try{

            var fechain = option.request.parameters.datefieldid;
            var fechafin = option.request.parameters.datefieldid1;

            if(fechain === undefined)
            {
                var date = new Date();
                //var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
                var primerDia = new Date(date.getFullYear(), 0, 1);
                var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            } else
            {
              var dat = formatofechas(fechain,fechafin);
              var primerDia = dat[0];
              var ultimoDia = dat[1];
            }

            var fechain = formatDate(primerDia);  //Se le da Formato a la fecha inicial del periodo
            var fechafin = formatDate(ultimoDia);

            var curFormatter = formato.getCurrencyFormatter({currency: "USD"}); //establece forma moneda
            var temp = valores(fechain,fechafin); //carga saldos
            
            //Montos
            
            try{temp[0].saldo = curFormatter.format({number: parseFloat(temp[0].saldo)});}catch(ex){temp[0].saldo = "$ 000.00";}
            try{temp[0].saldo1 = curFormatter.format({number: parseFloat(temp[0].saldo1)});}catch(ex){temp[0].saldo1 = "$ 000.00";}
            try{temp[1].saldo = curFormatter.format({number: parseFloat(temp[1].saldo)});}catch(ex){temp[1].saldo = "$ 000.00";}
            try{temp[1].saldo1 = curFormatter.format({number: parseFloat(temp[1].saldo1)});}catch(ex){temp[1].saldo1 = "$ 000.00";}
            try{temp[2].saldo = curFormatter.format({number: parseFloat(temp[2].saldo)});}catch(ex){temp[2].saldo = "$ 000.00";}
            try{temp[2].saldo1 = curFormatter.format({number: parseFloat(temp[2].saldo1)});}catch(ex){temp[2].saldo1 = "$ 000.00";}
            try{temp[3].saldo = curFormatter.format({number: parseFloat(temp[3].saldo)});}catch(ex){temp[3].saldo = "$ 000.00";}
            try{temp[3].saldo1 = curFormatter.format({number: parseFloat(temp[3].saldo1)});}catch(ex){temp[3].saldo1 = "$ 000.00";}
            try{temp[4].saldo = curFormatter.format({number: parseFloat(temp[4].saldo)});}catch(ex){temp[4].saldo = "$ 000.00";}
            try{temp[4].saldo1 = curFormatter.format({number: parseFloat(temp[4].saldo1)});}catch(ex){temp[4].saldo1 = "$ 000.00";}
            try{temp[5].saldo = curFormatter.format({number: parseFloat(temp[5].saldo)});}catch(ex){temp[5].saldo = "$ 000.00";}
            try{temp[5].saldo1 = curFormatter.format({number: parseFloat(temp[5].saldo1)});}catch(ex){temp[5].saldo1 = "$ 000.00";}
            try{temp[6].saldo = curFormatter.format({number: parseFloat(temp[6].saldo)});}catch(ex){temp[6].saldo = "$ 000.00";}
            try{temp[6].saldo1 = curFormatter.format({number: parseFloat(temp[6].saldo1)});}catch(ex){temp[6].saldo1 = "$ 000.00";}
            try{temp[9].saldo = curFormatter.format({number: parseFloat(temp[9].saldo)});}catch(ex){temp[9].saldo = "$ 000.00";}
            try{temp[9].saldo1 = curFormatter.format({number: parseFloat(temp[9].saldo1)});}catch(ex){temp[9].saldo1 = "$ 000.00";}
            

            //dias
            if(isNaN(parseInt(Math.round (temp[7].saldo)))){ temp[7].saldo = " 0";} else { temp[7].saldo = parseInt(Math.round(temp[7].saldo)); }       
            if(isNaN(parseInt(Math.round (temp[7].saldo1)))){ temp[7].saldo1 = " 0";} else { temp[7].saldo1 = parseInt(Math.round(temp[7].saldo1)); }
            if(isNaN(parseInt(Math.round (temp[8].saldo)))){ temp[8].saldo = " 0";} else { temp[8].saldo = parseInt(Math.round(temp[8].saldo)); }
            if(isNaN(parseInt(Math.round (temp[8].saldo1)))){ temp[8].saldo1 = " 0";} else { temp[8].saldo1 = parseInt(Math.round(temp[8].saldo1)); }

            //Variacion
            if(isNaN(parseFloat(temp[0].variacion))){ temp[0].variacion = " 0.0";} else { temp[0].variacion = parseFloat(temp[0].variacion); }
            if(isNaN(parseFloat(temp[1].variacion))){ temp[1].variacion = " 0.0";} else { temp[1].variacion = parseFloat(temp[1].variacion); }
            if(isNaN(parseFloat(temp[2].variacion))){ temp[2].variacion = " 0.0";} else { temp[2].variacion = parseFloat(temp[2].variacion); }
            if(isNaN(parseFloat(temp[3].variacion))){ temp[3].variacion = " 0.0";} else { temp[3].variacion = parseFloat(temp[3].variacion); }
            if(isNaN(parseFloat(temp[4].variacion))){ temp[4].variacion = " 0.0";} else { temp[4].variacion = parseFloat(temp[4].variacion); }
            if(isNaN(parseFloat(temp[5].variacion))){ temp[5].variacion = " 0.0";} else { temp[5].variacion = parseFloat(temp[5].variacion); }
            if(isNaN(parseFloat(temp[6].variacion))){ temp[6].variacion = " 0.0";} else { temp[6].variacion = parseFloat(temp[6].variacion); }
            if(isNaN(parseFloat(temp[7].variacion))){ temp[7].variacion = " 0.0";} else { temp[7].variacion = parseFloat(temp[7].variacion); }
            if(isNaN(parseFloat(temp[8].variacion))){ temp[8].variacion = " 0.0";} else { temp[8].variacion = parseFloat(temp[8].variacion); }
            if(isNaN(parseFloat(temp[9].variacion))){ temp[9].variacion = " 0.0";} else { temp[9].variacion = parseFloat(temp[9].variacion); }
            
            
            
            
/*
            try{temp[1] = curFormatter.format({number: parseFloat(temp[1])});}catch(ex){temp[1] = "$ 000.00";}
            try{temp[2] = curFormatter.format({number: parseFloat(temp[2])});}catch(ex){temp[2] = "$ 000.00";}
            try{temp[3] = curFormatter.format({number: parseFloat(temp[3])});}catch(ex){temp[3] = "$ 000.00";}
              
            try{temp[4] = curFormatter.format({number: parseFloat(temp[4])});}catch(ex){temp[4] = "$ 000.00";}
            try{temp[5] = curFormatter.format({number: parseFloat(temp[5])});}catch(ex){temp[5] = "$ 000.00";}
            try{temp[6] = curFormatter.format({number: parseFloat(temp[6])});}catch(ex){temp[6] = "$ 000.00";}
            
            try{temp[7] = curFormatter.format({number: parseFloat(temp[7])});}catch(ex){temp[7] = "$ 000.00";}
            try{temp[8] = curFormatter.format({number: parseFloat(temp[8])});}catch(ex){temp[8] = "$ 000.00";}
            try{temp[9] = curFormatter.format({number: parseFloat(temp[9])});}catch(ex){temp[9] = "$ 000.00";}
              
            try{temp[10] = curFormatter.format({number: parseFloat(temp[10])});}catch(ex){temp[10] = "$ 000.00";}
            try{temp[11] = curFormatter.format({number: parseFloat(temp[11])});}catch(ex){temp[11] = "$ 000.00";}
            try{temp[12] = curFormatter.format({number: parseFloat(temp[12])});}catch(ex){temp[12] = "$ 000.00";}

            try{temp[13] = curFormatter.format({number: parseFloat(temp[13])});}catch(ex){temp[13] = "$ 000.00";}
            try{temp[14] = curFormatter.format({number: parseFloat(temp[14])});}catch(ex){temp[14] = "$ 000.00";}
            try{temp[15] = curFormatter.format({number: parseFloat(temp[15])});}catch(ex){temp[15] = "$ 000.00";}        
            try{temp[16] = curFormatter.format({number: parseFloat(temp[16])});}catch(ex){temp[16] = "$ 000.00";}
            try{temp[17] = curFormatter.format({number: parseFloat(temp[17])});}catch(ex){temp[17] = "$ 000.00";}
            try{temp[18] = curFormatter.format({number: parseFloat(temp[18])});}catch(ex){temp[18] = "$ 000.00";}        
            try{temp[19] = curFormatter.format({number: parseFloat(temp[19])});}catch(ex){temp[19] = "$ 000.00";}
            try{temp[20] = curFormatter.format({number: parseFloat(temp[20])});}catch(ex){temp[20] = "$ 000.00";}
            try{temp[21] = curFormatter.format({number: parseFloat(temp[21])});}catch(ex){temp[21] = "$ 000.00";}
            try{temp[23] = curFormatter.format({number: parseFloat(temp[23])});}catch(ex){temp[23] = "$ 000.00";}
            try{temp[28] = curFormatter.format({number: parseFloat(temp[28])});}catch(ex){temp[28] = "$ 000.00";}

            if(isNaN(parseInt(Math.round (temp[31])))){ temp[31] = " 0";} else { temp[31] = parseInt(Math.round(temp[31])); }       
            if(isNaN(parseInt(Math.round (temp[33])))){ temp[33] = " 0";} else { temp[33] = parseInt(Math.round(temp[33])); }
            if(isNaN(parseInt(Math.round (temp[35])))){ temp[35] = " 0";} else { temp[35] = parseInt(Math.round(temp[35])); }
            if(isNaN(parseInt(Math.round (temp[37])))){ temp[37] = " 0";} else { temp[37] = parseInt(Math.round(temp[37])); }

            if(isNaN(parseFloat(temp[38]))){ temp[38] = " 0.0";} else { temp[38] = parseFloat(temp[38]); }
            if(isNaN(parseFloat(temp[39]))){ temp[39] = " 0.0";} else { temp[39] = parseFloat(temp[39]); }
            if(isNaN(parseFloat(temp[40]))){ temp[40] = " 0.0";} else { temp[40] = parseFloat(temp[40]); }
            if(isNaN(parseFloat(temp[41]))){ temp[41] = " 0.0";} else { temp[41] = parseFloat(temp[41]); }
            if(isNaN(parseFloat(temp[42]))){ temp[42] = " 0.0";} else { temp[42] = parseFloat(temp[42]); }
            if(isNaN(parseFloat(temp[43]))){ temp[43] = " 0.0";} else { temp[43] = parseFloat(temp[43]); }
            if(isNaN(parseFloat(temp[44]))){ temp[44] = " 0.0";} else { temp[44] = parseFloat(temp[44]); }
            if(isNaN(parseFloat(temp[45]))){ temp[45] = " 0.0";} else { temp[45] = parseFloat(temp[45]); }
            if(isNaN(parseFloat(temp[46]))){ temp[46] = " 0.0";} else { temp[46] = parseFloat(temp[46]); }
          */

            var form = Formulario(temp,fechain,fechafin);

        }
        catch(ex){

            for (var i=0; i<20; i++) //al arreglo temp[] le da fotma decimal
            {
                temp[i] = parseFloat(0).toFixed(2);
            }
            var fechain = option.request.parameters.datefieldid;
            var fechafin = option.request.parameters.datefieldid1;
            var form = Formulario(temp,fechain,fechafin);
            
        }

        return form;
                    
    }

    function formatofechas(inicial,final){

        var fechas = [];
        try{

            inicial = inicial.replace('.', '/').replace('.', '/');
            final = final.replace('.', '/').replace('.', '/');

            var inicio = inicial.split("/");
            var final1  = final.split("/");

            if(inicio.length ==1)
            {
              var inicio = fecha.split(".");
              var final1 = fechafin.split(".");
            }

            if(inicio[0].length ==4)
            {
              var primerDia = new Date(inicio[0]  + '/' + inicio[1]  + '/' + inicio[2]);
              var ultimoDia = new Date(final1[0] + '/' + final1[1] + '/' + final1[2]);
              fechas[0]= primerDia;  fechas[1]= ultimoDia;
            }
            else 
            { 
              var primerDia = new Date(inicio[2]  + '/' + inicio[1]  + '/' + inicio[0]);
              var ultimoDia = new Date(final1[2] + '/' + final1[1] + '/' + final1[0]);
              fechas[0]= primerDia;  fechas[1]= ultimoDia;
            }

            
        }
        catch(ex){
            fechas[0]= inicial;  fechas[1]= final;
        }
        return fechas;
    }

    function formatDate(testDate){
      var responseDate=format.format({value:testDate,type:format.Type.DATE});
      return responseDate;
    }
    
    function LeerConfiguracion(){
        var indicadores = []; //Crea Arreglo que almacenara los resultados
        try{
            //Crea Busqueda Guardada para Leer Datos de Clasificacion
            var searchInfo = SEARCHMODULE.create({
            type: 'customrecord_clss_indicadores',
            columns: [
                {name: 'custrecord_indicador'},
                {name: 'custrecord_busqueda'},
                {name: 'custrecord_tipo'},
                {name: 'custrecord_funcion'},
            ]
            });
            var resultset = searchInfo.run(); //Corre Busqueda
            try {                 
            var results = resultset.getRange(0, 1000);
             for (var i = 0; i < results.length; i++) {
                  var result = results[i];
                  indicadores.push({id: result.id , Indicador: result.getValue('custrecord_indicador'), clasificacion: result.getValue('custrecord_tipo'), busqueda: result.getValue('custrecord_busqueda'), funcion:result.getValue('custrecord_funcion') });
                  //Agrega resultados de la busqueda al Array
             }
            }
            catch (error) {
                log.error({title: 'Eror al Leer Configuracion - Agregar Reultados de la Busqueda', details: error});
                var indicadores = []; // En caso de error devuelve arrar vacio
            }

            return indicadores;
        }
        catch(error){
            log.error({title: 'Eror al Leer Configuracion', details: error});
            return indicadores;
        }
    }

    function valores(fechain,fechafin){

            var Lista = [];
            Lista[0] = 0;
            var fec = fechaadd(fechain,fechafin,12);    // Obtiene Fechas de hace un año
            var dias = diastranscurridos(fechain,fechafin,fec[0],fec[1]);

            var dias3 = dias[0];
            var dias4 = dias[1];
            var mes   = dias[2];
            
            var filterult = SEARCHMODULE.createFilter({
                name: 'trandate',
                operator: SEARCHMODULE.Operator.WITHIN,
                values: [fechain, fechafin]  //Filtro Entre Rango de Fechas Seleccionadas
            });

            var filterult2 = SEARCHMODULE.createFilter({
                name: 'trandate',
                operator: SEARCHMODULE.Operator.WITHIN,
                values: [fec[0], fec[1]]     //Filtro Entre Rango de Fechas Seleccionadas - un año
            });
        
            var filterults = SEARCHMODULE.createFilter({
                name: 'trandate',
                operator: SEARCHMODULE.Operator.ONORBEFORE,
                values: fechafin              //Filtro HASTA la Fecha Selecionada (Acomulado)
            });
   
            var filterultss = SEARCHMODULE.createFilter({
                name: 'trandate',
                operator: SEARCHMODULE.Operator.ONORBEFORE,
                values: fec[1]               //Filtro HASTA la Fecha Selecionada (Acomulado) - un año
            }); 


            var matriz= [];
            var tabla = LeerConfiguracion();
            
            
                
            if(tabla.length > 0){
            for (var i = 0; i < tabla.length; i++) {
                var busqueda = tabla[i].busqueda;
                var etiqueta = tabla[i].Indicador;
                var tipo = tabla[i].clasificacion;
                var funcion  = tabla[i].funcion;
                                    
                var monto =0;
                var monto1 =0;

                 if (etiqueta == 'Egreso promedio diario' && i == 9)
                {
                           

                    monto = monto+ matriz[2].saldo + matriz[3].saldo + matriz[4].saldo + matriz[5].saldo + matriz[6].saldo;
                    //monto1 = monto1+ matriz[2].saldo1 + matriz[3].saldo1 + matriz[4].saldo1 + matriz[5].saldo1 + matriz[6].saldo1;
                    
                    if (isNaN(parseFloat( matriz[1].saldo1))) {monto1 = parseFloat(0);} else {parseFloat( matriz[1].saldo1);}
                    var monto2 =  matriz[2].saldo1;
                    if (isNaN(parseFloat( matriz[2].saldo1))) {monto2 = parseFloat(0);} else {parseFloat( matriz[2].saldo1);}
                    var monto3 = matriz[3].saldo1; 
                    if (isNaN(parseFloat( matriz[3].saldo1))) {monto3 = parseFloat(0);} else {parseFloat( matriz[3].saldo1);}
                    var monto4 = matriz[4].saldo1; 
                    if (isNaN(parseFloat( matriz[4].saldo1))) {monto4 = parseFloat(0);} else {parseFloat( matriz[4].saldo1);}
                    var monto5= matriz[5].saldo1; 
                    if (isNaN(parseFloat( matriz[5].saldo1))) {monto5 = parseFloat(0);} else {parseFloat( matriz[5].saldo1);}
                    var monto6 = matriz[6].saldo1;
                    if (isNaN(parseFloat( matriz[6].saldo1))) {monto6 = parseFloat(0);} else {parseFloat( matriz[6].saldo1);}
                    
                    monto1 = monto1 + monto2 + monto3 + monto4 + monto5 + monto6;
                    
                    if(monto === Infinity) {monto = 0.0;} else{ 
                        monto = monto;
                    }
                    if(monto1 === Infinity) {monto1 = 0.0;} else{ monto1 = monto1;}
                    var variacions = variacion(monto,monto1);

                     matriz.push({saldo: monto, saldo1: monto1, variacion: variacions, tipo : tabla[i].clasificacion, etiqueta: tabla[i].Indicador , busqueda: tabla[i].busqueda,funcion: tabla[i].funcion});
                        i++;
                        continue;
                    //}
                 } 
                
                
                var dif = funcion.split('-');

                if (dif[0] == 'Saldo'){
                
                    if(dif[1] =='dias')
                    {
                        monto = Saldo(filterult, busqueda);
                        monto1 = Saldo(filterult2, busqueda);
                    
                        if((monto / dias3)=== Infinity) {monto = 0.0;} else{ monto = monto/dias3;}
                        if((monto1 / dias4)=== Infinity) {monto1 = 0.0;} else{ monto1 = monto1/dias4;}
                        var variacions = variacion(monto,monto1);
                        matriz.push({saldo: monto, saldo1: monto1, variacion: variacions, tipo : tabla[i].clasificacion, etiqueta: tabla[i].Indicador });
                        
                    }



                    else
                    {
                        var divis= dif[1];
                        var filtro = matriz.filter(function (e) {
                        return e.etiqueta.indexOf(divis)> -1; 
                        });

                        if(filtro.length ==1)
                        {
                            //var monto = 1;
                            //var monto1 = 1;
                            //var variacions = 1;

                            var dia =filtro[0].saldo;
                            var dia1 =filtro[0].saldo1;
                            monto = Saldo(filterults, busqueda);
                            monto1 = Saldo(filterultss, busqueda);

                            if((monto / dia)=== Infinity) {monto = 0.0;} else{ monto = monto/dia;}
                            if((monto1 / dia1)=== Infinity) {monto1 = 0.0;} else{ monto1 = monto1/dia1;}
                            var variacions = variacion(monto,monto1);
            
                            matriz.push({saldo: monto, saldo1: monto1, variacion: variacions, tipo : tabla[i].clasificacion, etiqueta: tabla[i].Indicador });

                        }else{
                            var monto=0;
                            var monto1=0;
                            var variacions=0;
                            matriz.push({saldo: monto, saldo1: monto1, variacion: variacions, tipo : tabla[i].clasificacion, etiqueta: tabla[i].Indicador });
                        }


                    }
                    
                

                }else{

                monto = saldoacomulado(busqueda,fechain,fechafin,dif[1]);
                monto1 = saldoacomulado(busqueda,fec[0],fec[1],dif[1]);
                
                if((monto / dias3)=== Infinity) {monto = 0.0;} else{ monto = monto/dias3;}
                if((monto1 / dias4)=== Infinity) {monto1 = 0.0;} else{ monto1 = monto1/dias4;}
                var variacions = variacion(monto,monto1);
                matriz.push({saldo: monto, saldo1: monto1, variacion: variacions, tipo : tabla[i].clasificacion, etiqueta: tabla[i].Indicador });

                }
              
              }
            }

            /*
            /////////////Venta Media Diaria////// 
            Lista[1] = Saldo(filterult, 'customsearch_sales_kpis');
            if((Lista[1] / dias3)=== Infinity) {Lista[1] = 0.0;} else{ Lista[1] = Lista[1]/dias3;}


            Lista[3] = Saldo(filterult2, 'customsearch_sales_kpis'); // Un Año Anterior
            if((Lista[3] / dias4)=== Infinity) {Lista[3] = 0.0;} else{ Lista[3] = Lista[3]/dias4;}

            //variacion
            Lista[38] = variacion(Lista[1],Lista[3]);
            /////////////Venta Media Diaria////// 

                        
            ////Costo de venta promedio diario/////
            Lista[2] = Saldo(filterult, 'customsearch_costvtas_mc')/dias3;
            Lista[4] = Saldo(filterult2, 'customsearch_costvtas_mc')/dias4; //anterior

            //variacion
            Lista[39] = variacion(Lista[2],Lista[4]);
            ////Costo de venta promedio diario/////

                          
            ////Compra media diaria/////
            Lista[6] = saldoacomulado('customsearch_h3_compra_media_diaria_2',fechain,fechafin,2);
            if((Lista[6] / dias3)=== Infinity || NaN) {Lista[7] = 0;} else{ Lista[7] = Lista[6]/dias3;}
            ////Compra media diaria/////


            ////Compra media diaria///// -- Hace un año
            Lista[8] = saldoacomulado('customsearch_h3_compra_media_diaria_2',fec[0],fec[1],2);
            if((Lista[8] / dias4)=== Infinity || NaN) {Lista[9] = 0;} else{ Lista[9] = Lista[8]/dias4;}

            //variacion
            Lista[40] = variacion(Lista[7],Lista[9]);       
            ////Compra media diaria/////

            
            ////Gasto fijo medio diario/////
            Lista[10] = saldoacomulado('customsearch_h3_gasto_fijo_2',fechain,fechafin,5);
            if((Lista[10] / dias3)=== Infinity) {Lista[11] = 0;} else{ Lista[11] = Lista[10]/dias3;}
            ////Gasto fijo medio diario/////


            ////Gasto fijo medio diario///// -- Hace un año
            Lista[12] = saldoacomulado('customsearch_h3_gasto_fijo_2',fec[0],fec[1],5);
            if((Lista[12] / dias4)=== Infinity) {Lista[13] = 0;} else{ Lista[13] = Lista[12]/dias4;}
            ////Gasto fijo medio diario///// -- Hace un año
               
            //variacion
            Lista[41] = variacion(Lista[11],Lista[13]); 

               
            ////Gasto Operación medio diario///
            Lista[14] = saldoacomulado('customsearch_h3_gasto_operacion_2',fechain,fechafin,3);
            if((Lista[14] / dias3)=== Infinity) {Lista[15] = 0;} else{ Lista[15] = Lista[14]/dias3;} 
            ////Gasto Operación medio diario///


            ////Gasto Operación medio diario/// -- Hace un año
            Lista[16] = saldoacomulado('customsearch_h3_gasto_operacion_2',fec[0],fec[1],3);
            if((Lista[16] / dias4)=== Infinity) {Lista[17] = 0;} else{ Lista[17] = Lista[16]/dias4;} 
            
            //variacion
            Lista[42] = variacion(Lista[15],Lista[17]);
         


          
            ////Gasto financiero medio diario///
            Lista[18] = saldoacomulado('customsearch_h3_gasto_financiero_3',fechain,fechafin,4);
            if((Lista[18] / dias3)=== Infinity) {Lista[19] = 0;} else{ Lista[19] = Lista[18]/dias3;} 
            ////Gasto financiero medio diario///


            ////Gasto financiero medio diario/// -- Hace un año
            Lista[20] = saldoacomulado('customsearch_h3_gasto_financiero_3',fec[0],fec[1],4);
            if((Lista[20] / dias4)=== Infinity) {Lista[21] = 0;} else{ Lista[21] = Lista[20]/dias4;} 
            ////Gasto financiero medio diario/// -- Hace un año

            //variacion
            Lista[43] = variacion(Lista[19],Lista[21]);


            ////Prestacion Social media diaria////
            Lista[27] = saldoacomulado('customsearch_h3_beneficio_prestaciones_4',fechain,fechafin,11);          
            if((Lista[27] / dias3)=== Infinity) {Lista[28] = 0;} else{ Lista[28] = Lista[27]/dias3;}
            ////Prestacion Social media diaria////  


            ////Prestacion Social media diaria////  -- Hace un año
            Lista[22] = saldoacomulado('customsearch_h3_beneficio_prestaciones_4',fec[0],fec[1],11);          
            if((Lista[22] / dias4)=== Infinity) {Lista[23] = 0;} else{ Lista[23] = Lista[22]/dias4;}
            ////Prestacion Social media diaria////   -- Hace un año

            //variacion
            Lista[44] = variacion(Lista[28],Lista[23]);  


            //////Días promedio de inventario/////(Indicador) 
            Lista[30] = Saldo(filterults, 'customsearch_h3_dias_prom_invt');//Días promedio de inventario
            if((Lista[30] / Lista[2])=== Infinity) {Lista[31] = 0.0;} else{ Lista[31] = Lista[30] / Lista[2];}


            //////Días promedio de inventario/////(Indicador)  -- Hace un año
            Lista[34] = Saldo(filterultss, 'customsearch_h3_dias_prom_invt');//Días promedio de inventario
            if((Lista[34] / Lista[4])=== Infinity) {Lista[35] = 0.0;} else{ Lista[35] = Lista[34] / Lista[4];}
            //////Días promedio de inventario/////(Indicador)  -- Hace un año

            //variacion
            Lista[45] = variacion(Lista[31],Lista[35]);


            //////Días promedio de pago////(Indicador) 
            Lista[32] = Saldo(filterults, 'customsearch_h3_dias_prom_pago');//Días promedio de pago
            if((Lista[32] / Lista[6])=== Infinity){Lista[33] = 0;} else{Lista[33] = Lista[32] / Lista[7].toFixed(2);}

            //////Días promedio de pago////(Indicador)  -- Hace un año
            Lista[36] = Saldo(filterultss, 'customsearch_h3_dias_prom_pago');//Días promedio de pago
            if((Lista[36] / Lista[8])=== Infinity){Lista[37] = 0;} else{Lista[37] = Lista[36] / Lista[9].toFixed(2);}
            //////Días promedio de pago////(Indicador)  -- Hace un año

            //variacion
            Lista[46] = variacion(Lista[33],Lista[37]);
*/
        return matriz;
    }

    function fechaadd(fecha,fechafin,mes){

        var valor = [];
        try
        {

            var arrg = fecha.split("/"); 
            var arrg2 = fechafin.split("/");
          
            if(arrg.length ==1)
            {
              var arrg = fecha.split(".");
              var arrg2 = fechafin.split(".");
            }

            if(arrg[0].length ==4)
            {                    
              var e = new Date(arrg[0]  + '/' + arrg[1]  + '/' + arrg[2]);
              var f = new Date(arrg2[0] + '/' + arrg2[1] + '/' + arrg2[2]);
              var today = new Date(arrg[0], 00, 01); 
              var anioact = arrg[0];}

            else 
            { 
              var e = new Date(arrg[2]  + '/' + arrg[1]  + '/' + arrg[0]);
              var f = new Date(arrg2[2] + '/' + arrg2[1] + '/' + arrg2[0]);
              var today = new Date(arrg[2], 00, 01); 
              var anioact = arrg[2];
            }

            e.setMonth(e.getMonth() - mes);
            f.setMonth(f.getMonth() - mes);
            if (arrg2[1] == 2 && biciesto(f.getFullYear()) == true){ f.setDate(f.getDate() + 1); }
            var fn = new Date(e.getFullYear(), e.getMonth(), 1); 
            valor[0] = formatDate(e); //Fecha inicio
            valor[1] = formatDate(f);  //Fecha final
            valor[2] = formatDate(today); //primer dia del año
            valor[3] = anioact;    // Año Actual
            valor[4] = anioact -1; // Año Anterior
        }
        catch(ex)
        {
            valor[0] = fecha;
            valor[1] = fecha;
            valor[2] = fecha;
            valor[3] = fecha;
            valor[4] = fecha;
        }
        return valor;
    }

    function biciesto(year)
    {   
        var valor = false;
        try{
            if(year % 4 === 0){valor = true;}
        }
        catch(ex){
            valor = false;
        }
        return valor;
    }

    function diastranscurridos(fechain,fechafin,fecha1,fechafin1){
        var dias = [];
        
        try{

            var dat = formatofechas(fechain,fechafin);
            var primerDia = dat[0];
            var ultimoDia = dat[1];

            var dat = formatofechas(fecha1,fechafin1);
            var primerDiant = dat[0];
            var ultimoDiant = dat[1];

            ////////////////dias del año acumulados/// --- Actual
            var val1 = new Date(new Date(ultimoDia).setHours(23));
            var val2 = new Date(new Date(primerDia).setHours(23));
            var dias3 = Math.round((val1 - val2)/1000/60/60/24)+1; 
            //var dias3 = Math.round((new Date(ultimoDia).setHours(23) - new Date(new Date(primerDia).getYear()+1900, 0, 1, 0, 0, 0))/1000/60/60/24)

            /*var dias3 = 0;
            diff3 = ultimoDia - primerDia;                
            dias3 = parseInt((diff3/(1000*60*60*24))+1);*/

            ////////////////dias del año acumulados/// --- Actual

            ////////////////dias del año acumulados/// --- Actual
            var val1 = new Date(new Date(ultimoDiant).setHours(23));
            var val2 = new Date(new Date(primerDiant).setHours(23));
            var dias4 = Math.round((val1 - val2)/1000/60/60/24)+1; 
            //var dias4 = Math.round((new Date(ultimoDiant).setHours(23) - new Date(new Date(primerDiant).getYear()+1900, 0, 1, 0, 0, 0))/1000/60/60/24)

            /*var dias4 = 0;
            diff4 = ultimoDiant - primerDiant;                
            dias4 = parseInt((diff4/(1000*60*60*24))+1);*/

            ////////////////dias del año acumulados/// --- Actual

            dias[0] = dias3; //Dias Año actual
            dias[1] = dias4; //Dias Año anterior
            dias[2] = parseInt(ultimoDia.getMonth());

        }
        catch(ex){
            dias[0] = 0; dias[1] = 0; dias[2] = 0;
        }

        return dias;
    }
      
    function Saldo(filterSub, savedSearchId){
      
            var nac = "";
            var mySearch = SEARCHMODULE.load(savedSearchId);
            var filters = mySearch.filters;
            filters.push(filterSub);
            var resultset = mySearch.run();

            
            try {
                var results = resultset.getRange(0, 1000);
                var result = results[0];
                var nac = result.getValue(result.columns[0]);
                if (nac.length === 0) {
                    saldo = parseFloat(0).toFixed(2);
                } else {
                    nac = parseFloat(nac).toFixed(2);
                }
            }
            catch (ex) {
                var nac = parseFloat(0).toFixed(2);
            }

            if (isNaN(parseFloat(nac))) {
                nac = parseFloat(0);
            } else {
                parseFloat(nac);
            }

            
            return nac;
    }

    function saldoacomulado(busqueda,fechaini,fechafin,opcion){
        
        var saldo = 0;

        if(opcion ==1)
        {
                    var mySearch = SEARCHMODULE.load(busqueda);
                    var filters = mySearch.filters;  

                    filters[4] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[9] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    var resultset = mySearch.run();
                    try
                    {
                        var canti = [];
                        var cuenta = [];
                        var results = resultset.getRange(0, 1000);
                        for (var i = 0; i < results.length; i++) {
                           var result = results[i];
                           canti[i] = result.getValue(result.columns[0]);
                           cuenta[i] = result.getValue(result.columns[1]);
                        }
                        
                        if(canti.length ==1)
                        {
                            saldo = parseFloat(parseFloat(canti[0]));
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }
                        if(canti.length ==2)
                        {                                 
                            saldo = parseFloat(canti[1]) - parseFloat(canti[0]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }
                        if(canti.length ==3)
                        {
                            saldo = parseFloat(canti[2]) - parseFloat(canti[1]) - parseFloat(canti[0]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo; 
                        }
                        
                    }
                    catch(ex)
                    {
                        return parseFloat(saldo);
                    }
        }
      
        if(opcion ==11)
        {
           var mySearch = SEARCHMODULE.load(busqueda);
           var filters = mySearch.filters;  

           filters[4] = SEARCHMODULE.createFilter({
           name: 'trandate',
           operator: SEARCHMODULE.Operator.WITHIN,
           values: [fechaini, fechafin]
           });

                    filters[9] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    var resultset = mySearch.run();
                    try
                    {
                        var canti = [];
                        var cuenta = [];
                        var results = resultset.getRange(0, 1000);
                        for (var i = 0; i < results.length; i++) {
                           var result = results[i];
                           canti[i] = result.getValue(result.columns[0]);
                           cuenta[i] = result.getValue(result.columns[1]);
                        }
                        
                        if(canti.length ==1)
                        {
                            saldo = parseFloat(parseFloat(canti[0]));
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }
                        if(canti.length ==2){

                        if (cuenta[0] == "OthExpense")
                        {
                            canti[0] = canti[0] *-1;
                            if(cuenta[1] == "OthCurrLiab") { canti[1] = canti[1] *-1;}
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }
                        if (cuenta[1] == "OthExpense")
                        {
                            canti[1] = canti[1] *-1;
                            if(cuenta[0] == "OthCurrLiab") { canti[0] = canti[0] *-1;}
                            saldo = parseFloat(canti[1]) - parseFloat(canti[0]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }

                        }
                        if(canti.length ==3){

                        if (cuenta[0] == "OthExpense")
                        {
                            canti[0] = canti[0] *-1;
                            if(cuenta[1] == "OthCurrLiab") { canti[1] = canti[1] *-1;}
                            if(cuenta[2] == "OthCurrLiab") { canti[2] = canti[2] *-1;}
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]) - parseFloat(canti[2]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }
                        if (cuenta[1] == "OthExpense")
                        {
                            canti[1] = canti[1] *-1;
                            if(cuenta[0] == "OthCurrLiab") { canti[0] = canti[0] *-1;}
                            if(cuenta[2] == "OthCurrLiab") { canti[2] = canti[2] *-1;}
                            saldo = parseFloat(canti[1]) - parseFloat(canti[0]) - parseFloat(canti[2]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }

                        if (cuenta[2] == "OthExpense")
                        {
                            canti[2] = canti[2] *-1;
                            if(cuenta[1] == "OthCurrLiab") { canti[1] = canti[1] *-1;}
                            if(cuenta[0] == "OthCurrLiab") { canti[0] = canti[0] *-1;}
                            saldo = parseFloat(canti[2]) - parseFloat(canti[1]) - parseFloat(canti[0]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }

                        }
                        
                    }
                    catch(ex)
                    {
                        return parseFloat(saldo);
                    }
        }

        if(opcion ==2)
        {
                    var mySearch = SEARCHMODULE.load(busqueda);
                    var filters = mySearch.filters;  

                    filters[5] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[9] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    var resultset = mySearch.run();
                    try
                    {
                        var canti = [];
                        var results = resultset.getRange(0, 1000);
                        for (var i = 0; i < results.length; i++) {
                           var result = results[i];
                           canti[i] = result.getValue(result.columns[0]);
                        }

                        if(canti.length ==1)
                        {
                            saldo = parseFloat(canti[0]);
                            saldo = parseFloat(saldo).toFixed(2);
                            return saldo;
                        }
                        if(canti.length ==2)
                        {
                            saldo = parseFloat(canti[0]) + parseFloat(canti[1]);
                            saldo = parseFloat(saldo).toFixed(2);
                            return saldo;
                        }
                        if(canti.length ==3)
                        {
                            saldo = parseFloat(canti[0]) + parseFloat(canti[1]) + parseFloat(canti[2]);
                            saldo = parseFloat(saldo).toFixed(2);
                            return saldo;
                        }
                        
                    }
                    catch(ex)
                    {
                        return parseFloat(saldo).toFixed(2);
                    }
        }

        if(opcion ==3)
        {
                    var mySearch = SEARCHMODULE.load(busqueda);
                    var filters = mySearch.filters;  

                    filters[4] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[8] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[13] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    var resultset = mySearch.run();
                    try
                    {
                        var canti = [];
                        var results = resultset.getRange(0, 1000);
                        for (var i = 0; i < results.length; i++) {
                           var result = results[i];
                           canti[i] = result.getValue(result.columns[0]);
                        }
                        if(canti.length ==2)
                        {
                            canti[1] = parseFloat(canti[1]) *-1;
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }
                        else
                        {
                            canti[1] = parseFloat(canti[1]) *-1;
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]) - parseFloat(canti[2]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo; 
                        }
                        
                    }
                    catch(ex)
                    {
                        return parseFloat(saldo).toFixed(2);
                    }
        }

        if(opcion ==4)
        {
                    var mySearch = SEARCHMODULE.load(busqueda);
                    var filters = mySearch.filters;  

                    filters[5] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[9] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[14] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    var resultset = mySearch.run();
                    try
                    {
                        var canti = [];
                        var results = resultset.getRange(0, 1000);
                        for (var i = 0; i < results.length; i++) {
                           var result = results[i];
                           canti[i] = result.getValue(result.columns[0]);
                        }

                        if(canti.length ==1)
                        {
                            canti[0] = parseFloat(canti[0]) *-1;
                            //saldo = parseFloat(canti[0]) - parseFloat(canti[1]);
                            saldo = parseFloat(canti[0]).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }

                        if(canti.length ==2)
                        {
                            canti[0] = parseFloat(canti[0]) *-1;
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }
                        if(canti.length ==3)
                        {
                            canti[0] = parseFloat(canti[0]) *-1;
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]) - parseFloat(canti[2]);
                            saldo = parseFloat(saldo).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo; 
                        }
                        
                    }
                    catch(ex)
                    {
                        return parseFloat(saldo).toFixed(2);
                    }
        }

        if(opcion ==5)
        {
                    var mySearch = SEARCHMODULE.load(busqueda);
                    var filters = mySearch.filters;  

                    filters[2] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[8] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    filters[13] = SEARCHMODULE.createFilter({
                    name: 'trandate',
                    operator: SEARCHMODULE.Operator.WITHIN,
                    values: [fechaini, fechafin]
                    });

                    var resultset = mySearch.run();
                    try
                    {
                        var canti = [];
                        var results = resultset.getRange(0, 1000);
                        for (var i = 0; i < results.length; i++) {
                           var result = results[i];
                           canti[i] = result.getValue(result.columns[0]);
                        }

                        if(canti.length ==1)
                        {
                            canti[0] = parseFloat(canti[0]);
                            saldo = parseFloat(canti[0]).toFixed(2);
                            if(saldo <0) {saldo = saldo * -1;}
                            return saldo;
                        }

                        if(canti.length ==2)
                        {
                            canti[1] = parseFloat(canti[1]) *-1;
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]);
                            saldo = parseFloat(saldo).toFixed(2);
                            return saldo;
                        }
                        if(canti.length ==3)
                        {
                            canti[1] = parseFloat(canti[1]) *-1;
                            saldo = parseFloat(canti[0]) - parseFloat(canti[1]) - parseFloat(canti[2]);
                            saldo = parseFloat(saldo).toFixed(2);
                            return saldo; 
                        }
                        
                    }
                    catch(ex)
                    {
                        return parseFloat(saldo).toFixed(2);
                    }
        }
    }

    function variacion(actual,anterior){

                var valor = "0.00";
                var valor1 = "0.00";
                try{

                     if(isNaN(actual)){ actual = 0;}
                     if(isNaN(anterior)){ anterior = 0;}

                     if (actual < anterior){
                        if(actual == 0 && anterior >0)
                        { valor = "-100.00";} 
                        else{ 
                        valor =(((anterior-actual)/anterior)*100*-1).toFixed(2).toString();
                        }
                        
                     }
                     else{
                        if(anterior == 0 && actual >0)
                        { valor = "100.00";} 
                        else
                        { valor =(((anterior-actual)/anterior)*100*-1).toFixed(2).toString();}
                     }
                     
                     if(valor > 100)
                     { valor1 = (100*anterior)/actual; 
                     valor=(100-valor1).toFixed(2).toString();}
                     
                     if(isNaN(valor)){ valor = "0.00";}
                     if(isNaN(valor1)){ valor1 = "0.00";}
                     
                     

                }
                catch(ex){
                    valor = "0.00";
                }

                return valor;

    }

    function Formulario(lista,fechain,fechafin){
              
            var form = ui.createForm({
             title: 'Indicadores Financieros'
             });
              
            var fieldgroups = form.addFieldGroup({
            id : 'custpage_main',
            label : 'KPIs'
            });
      
            form.clientScriptFileId = 11401;
                       
            form.addField({
            id: 'datefieldid',
            label: 'Fecha Inicio',
            type: ui.FieldType.DATE,
            container: 'custpage_main'
            }).defaultValue = fechain;
                     
            form.addField({
            id: 'datefieldid1',
            label: 'Fecha Fin',
            type: ui.FieldType.DATE,
            container: 'custpage_main'
            }).defaultValue = fechafin;

             
            var fec = fechaadd(fechain,fechafin,1);          
                       

            
            //for (var i=0; i<3; i++) //al arreglo temp[] le da fotma decimal
            //{
            
            //if(i>0 ){
                
                
            var filtro = lista.filter(function (e) {
            return e.tipo.indexOf(1)> -1; // Primarios
            });

          
            
            var linea = 0;
            if(filtro.length > 0)
            {
                var sublist = form.addSublist({id: 'custpage_indicadores',type: ui.SublistType.LIST,label: 'Primario'});
                sublist.addField({id: 'custpage_indicador',type: ui.FieldType.TEXT,label: 'Indicador'});
                sublist.addField({id: 'custpage_encabezadoact',type: ui.FieldType.TEXT,label: fec[3].toString()});
                sublist.addField({id: 'custpage_encabezadoant',type: ui.FieldType.TEXT,label: fec[4].toString()});			
                sublist.addField({id: 'custpage_encabezadoporcentual',type: ui.FieldType.TEXT,label: 'VARIACIÓN'});
                
                for (var j=0; j<filtro.length; j++) 
                {
                  sublist.setSublistValue({id: 'custpage_indicador',line: linea,value: filtro[j].etiqueta});
                  sublist.setSublistValue({id: 'custpage_encabezadoact',line: linea,value: filtro[j].saldo});
                  sublist.setSublistValue({id: 'custpage_encabezadoant',line: linea,value: filtro[j].saldo1});
                  sublist.setSublistValue({id: 'custpage_encabezadoporcentual',line: linea,value: filtro[j].variacion + ' %'});
                  linea++;
                }
            }
            
            var filtro = lista.filter(function (e) {
            return e.tipo.indexOf(2)> -1; // Primarios
            });
            
            var linea = 0;
            if(filtro.length > 0)
            {
                var sublist = form.addSublist({id: 'custpage_indicadores2',type: ui.SublistType.LIST,label: 'Secundario'});
                sublist.addField({id: 'custpage_indicador2',type: ui.FieldType.TEXT,label: 'Indicador'});
                sublist.addField({id: 'custpage_encabezadoact2',type: ui.FieldType.TEXT,label: fec[3].toString()});
                sublist.addField({id: 'custpage_encabezadoant2',type: ui.FieldType.TEXT,label: fec[4].toString()});			
                sublist.addField({id: 'custpage_encabezadoporcentual2',type: ui.FieldType.TEXT,label: 'VARIACIÓN'});
                
                for (var j=0; j<filtro.length; j++) 
                {
                  sublist.setSublistValue({id: 'custpage_indicador2',line: linea,value: filtro[j].etiqueta});
                  sublist.setSublistValue({id: 'custpage_encabezadoact2',line: linea,value: filtro[j].saldo});
                  sublist.setSublistValue({id: 'custpage_encabezadoant2',line: linea,value: filtro[j].saldo1});
                  sublist.setSublistValue({id: 'custpage_encabezadoporcentual2',line: linea,value: filtro[j].variacion + ' %'});
                  linea++;
                }
            }
            
            
            var filtro = lista.filter(function (e) {
            return e.tipo.indexOf(3)> -1; // Primarios
            });
            
            var linea = 0;
            if(filtro.length > 0)
            {
                var sublist = form.addSublist({id: 'custpage_indicadores3',type: ui.SublistType.LIST,label: 'Auxiliar'});
                sublist.addField({id: 'custpage_indicador3',type: ui.FieldType.TEXT,label: 'Indicador'});
                sublist.addField({id: 'custpage_encabezadoact3',type: ui.FieldType.TEXT,label: fec[3].toString()});
                sublist.addField({id: 'custpage_encabezadoant3',type: ui.FieldType.TEXT,label: fec[4].toString()});			
                sublist.addField({id: 'custpage_encabezadoporcentual3',type: ui.FieldType.TEXT,label: 'VARIACIÓN'});
                
                for (var j=0; j<filtro.length; j++) 
                {
                  sublist.setSublistValue({id: 'custpage_indicador3',line: linea,value: filtro[j].etiqueta});
                  sublist.setSublistValue({id: 'custpage_encabezadoact3',line: linea,value: filtro[j].saldo});
                  sublist.setSublistValue({id: 'custpage_encabezadoant3',line: linea,value: filtro[j].saldo1});
                  sublist.setSublistValue({id: 'custpage_encabezadoporcentual3',line: linea,value: filtro[j].variacion + ' %'});
                  linea++;
                }
            }
            
            
              
            form.addSubmitButton({
                label : 'Actualizar'
            });
        
        return form;
    }

}


return {
onRequest : onRequest
};

});
