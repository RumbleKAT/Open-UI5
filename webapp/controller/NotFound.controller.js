sap.ui.define([
    "sap/ui/core/mvc/Controller"
],function(Controller){
    "use strict"
    return Controller.extend("sap.ui.demo.nav.controller.NotFound",{
        onInit: function(){
            console.log("page not found...");
        }//bypassed 속성을 이용하여, url 대처 , sap.m.MessagePage 컨트롤 사용하여 라우팅 오류 메시지 표시
        
    });
})