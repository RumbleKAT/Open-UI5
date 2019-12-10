sap.ui.define([
    "sap/ui/demo/nav/controller/BaseController"
],function(BaseController){
    "use strict";
    return BaseController.extend("sap.ui.demo.nav.controller.Home",{
        onInit: function(){
            console.log("initialize Home page..");
        },
        onDisplayNotFound : function(oEvent){
            // this.getRouter().getTargets().display("notFound"); //getTargets의 객체에 대한 참조를 가져온다.
            this.getRouter().getTargets().display("notFound",{
                fromTarget : "home"
            });
        },

        onNavToEmployees : function(){
            console.log("Clicked!");
            this.getRouter().navTo("employeeList");
        }
    });
})