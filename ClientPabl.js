/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
 define(['N/currentRecord'], currentRecord => {
    return ({
      

        test_set_getValue: () => {
            // Get a reference to the currently active record
            let myRecord = currentRecord.get();

            // Set the value of a custom field
            myRecord.setValue({
                fieldId: 'custpage_textfield',
                value: 'Body value',
                ignoreFieldChange: true,
                forceSyncSourcing: true
            });

            // Retrieve the value that was set
            let actValue = myRecord.getValue({
                fieldId: 'custpage_textfield'
            });

            // Set the value of another custom field
            myRecord.setValue({
                fieldId: 'custpage_resultfield',
                value: actValue,
                ignoreFieldChange: true,
                forceSyncSourcing: true
            });
        },

        test_set_getCurrentSublistValue: () => {
            // Get a reference to the currently active record
            let myRecord = currentRecord.get();

            // Set the value of a custom sublist field
            myRecord.setCurrentSublistValue({
                sublistId: 'sitecategory',
                fieldId: 'custpage_subtextfield',
                value: 'Sublist Value',
                ignoreFieldChange: true,
                forceSyncSourcing: true
            });

            // Retrieve the value that was set
            let actValue2 = myRecord.getCurrentSublistValue({
                sublistId: 'sitecategory',
                fieldId: 'custpage_subtextfield'
            });

            // Set the value of another custom field
            myRecord.setValue({
                fieldId: 'custpage_sublist_resultfield',
                value: actValue2,
                ignoreFieldChange: true,
                forceSyncSourcing: true
            });
        },
        pageInit: () => {}
    });
});