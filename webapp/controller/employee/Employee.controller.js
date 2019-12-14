sap.ui.define([
   'sap/ui/demo/nav/controller/BaseController'
],function(Controller){
    'use strict'

    return Controller.extend('sap.ui.demo.nav.controller.employee.Employee',{
        onInit: function(){
            var oRouter = this.getRouter();
            oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);            
        },

        _onRouteMatched: function(oEvent){
            var oArgs,oView;
            oArgs = oEvent.getParameter("arguments");
            console.log(oArgs);
            oView = this.getView();
            
            oView.bindElement({
                path : `/Employees(${oArgs.employeeId})`,
                events : {
                    change : this._onBindingChange.bind(this),
                    dataRequested : function(oEvent){
                        console.log("data Requested");
                        oView.setBusy(true);
                    },
                    dataReceived : function(oEvent){
                        console.log("data Received");
                        oView.setBusy(false);
                    }
                }                
            });
        },

        _onBindingChange: function(oEvent){
            if(!this.getView().getBindingContext()){
                this.getRouter().getTargets().display("notFound");
            }
        },

        onShowResume : function(oEvent){
            var context =  this.getView().getBindingContext();
            // console.log(context.getProperty("EmployeeId"));
            this.getRouter().navTo("employeeResume",{
                employeeId : context.getProperty("EmployeeID")
            })
        }
    })
})