sap.ui.define([
    'sap/ui/demo/nav/controller/BaseController',
    'sap/ui/model/json/JSONModel'
], function (Controller,JSONModel) {
    "use strict";

    const _aValidTabKeys = ['Info','Projects','Hobbies','Notes'];
    //유효성 검사를 위한 키 설정

    return Controller.extend("sap.ui.demo.nav.controller.employee.Resume", {

        onInit: function () {
            this.getView().setModel(new JSONModel(),"view");
            this.getRouter().getRoute("employeeResume").attachMatched(this._onRouteMatched,this);
        },
        _onRouteMatched : function(oEvent){
            let oArgs,oView;
            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();
            oView.bindElement({
                path : `/Employees(${oArgs.employeeId})`,
                events : {
                    change : this._onBindingChange.bind(this),
                    dataRequested: function(oEvent){
                        oView.setBusy(true);
                    },
                    dataReceived : function(oEvent){
                        oView.setBusy(false);
                    }
                }
            });
            //탭에 따라 parameter를 정함
            let query = oArgs["?query"];
            console.log(oArgs);
            if(query !== undefined && _aValidTabKeys.indexOf(query.tab) > -1){
                oView.getModel("view").setProperty("/selectedTabKey",query.tab);
                if(query.tab === 'Hobbies' || query.tab === 'Notes'){
                    console.log(query.tab);
                    this.getRouter().getTargets().display("resumeTab" + query.tab);
                }
            }else{
                this.getRouter().navTo("employeeResume",{
                    employeeId : oArgs.employeeId,
                    query : {
                        tab  : _aValidTabKeys[0]
                    }
                },true);
                //url에 매칭되는 값이 없을 경우 info로 매칭됨
            }
        },
        _onBindingChange : function(oEvent){
            if(!this.getView().getBindingContext()){
                this.getRouter().getTargets().display("notFound");
            }
        },
        onTabSelect : function(oEvent){
            let context = this.getView().getBindingContext();
            this.getRouter().navTo("employeeResume",{
                employeeId : context.getProperty("EmployeeID"),
                query : {
                    tab : oEvent.getParameter("selectedKey")
                }
            },true);//without history //매개변수로 전달
        }
    });

});