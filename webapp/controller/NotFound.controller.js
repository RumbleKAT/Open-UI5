sap.ui.define([
    "sap/ui/demo/nav/controller/BaseController"
],function(BaseController){
    "use strict"
    return BaseController.extend("sap.ui.demo.nav.controller.NotFound",{
        onInit: function(){
            console.log("page not found...");
            let oRouter, oTarget;
            oRouter = this.getRouter();
            oTarget = oRouter.getTarget("notFound");
            oTarget.attachDisplay(function(oEvent){
                this._oData = oEvent.getParameter("data");
            },this);
        }//bypassed 속성을 이용하여, url 대처 , sap.m.MessagePage 컨트롤 사용하여 라우팅 오류 메시지 표시
        ,onNavBack : function(oEvent){
            //hash값의 변화없이 notFound 페이지로 이동
            console.log(this._oData);
            if(this._oData && this._oData.fromTarget){
                this.getRouter().getTargets().display(this._oData.fromTarget);
                delete this._oData.fromTarget;
                return;
            }

            BaseController.prototype.onNavBack.apply(this.arguments);
        }
    });
})