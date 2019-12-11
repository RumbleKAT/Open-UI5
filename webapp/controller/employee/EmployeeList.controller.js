/* viewLevel 2 slide 전환 애니메이션이 왼쪽으로 */
sap.ui.define([
   'sap/ui/demo/nav/controller/BaseController'
],function(BaseController){
    'use strict'
    return BaseController.extend('sap.ui.demo.nav.controller.employee.EmployeeList',{
        onInit : function(){
            console.log("on init!");
            //한번 생성되면 삭제되지 않음 -> 생명주기를 공부해 봐야할 듯
        },
        onListItemPressed : function(oEvent){
            let oItem, oCtx;
            oItem = oEvent.getSource();
            oCtx = oItem.getBindingContext();
            console.log(oItem);
            console.log(oCtx.oModel.oData);
            this.getRouter().navTo("employee",{
                employeeId : oCtx.getProperty("EmployeeID")
            });
        }
    })
})