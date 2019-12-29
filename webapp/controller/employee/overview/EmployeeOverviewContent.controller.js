sap.ui.define([
    "sap/ui/demo/nav/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/ViewSettingsDialog",
    "sap/m/ViewSettingsItem"
], function (BaseController,Filter, FilterOperator, Sorter, ViewSettingsDialog, ViewSettingsItem) {
    "use strict";
    return BaseController.extend("sap.ui.demo.nav.controller.employee.overview.EmployeeOverview", {
        onInit: function(){
            var oRouter = this.getRouter();
            this._oTable = this.byId("employeesTable");
            this._oVSD = null; 
            this._sSortField = null; 
            this._bSortDescending = false; 
            this._aValidSortFields = ["EmployeeID", "FirstName", "LastName"];
            this._sSearchQuery = null;
            this._oRouterArgs = null;
            this._initViewSettingsDialog();
            // make the search bookmarkable
            oRouter.getRoute("employeeOverview").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched : function(oEvent){
            this._oRouterArgs = oEvent.getParameter("arguments");
            this._oRouterArgs.query = this._oRouterArgs["?query"] || {};
            delete this._oRouterArgs["?query"];
            if (this._oRouterArgs.query) {
                // search/filter via URL hash
                this._applySearchFilter(this._oRouterArgs.query.search);
                // sorting via URL hash
                this._applySorter(this._oRouterArgs.query.sortField, this._oRouterArgs.query.sortDescending);
                // show dialog via URL hash
                if (!!this._oRouterArgs.query.showDialog) {
                    this._oVSD.open();
                }
            }
        },
        onSortButtonPressed : function (oEvent) {
            var oRouter = this.getRouter();
            // console.log(this._oRouterArgs);
            this._oRouterArgs.query.showDialog = 1;
            oRouter.navTo("employeeOverview",this._oRouterArgs);
        
        },
        onSearchEmployeesTable : function (oEvent) {
            // var sQuery = oEvent.getSource().getValue();
            this._applySearchFilter( oEvent.getSource().getValue() );
        },
        _initViewSettingsDialog : function(){
            let oRouter = this.getRouter();
            this._oVSD = new sap.m.ViewSettingsDialog("vsd",{
                confirm : function(oEvent) {
                    var oSortItem = oEvent.getParameter("sortItem");
                    this._oRouterArgs.query.sortField = oSortItem.getKey();
                    this._oRouterArgs.query.sortDescending = oEvent.getParameter("sortDescending");
                    delete this._oRouterArgs.query.showDialog;
                    oRouter.navTo("employeeOverview",this._oRouterArgs, true /*without history*/);
                }.bind(this),
                cancel : function(oEvent){
                    //event bubbling 막음
                    delete this._oRouterArgs.query.showDialog;
                    oRouter.navTo("employeeOverview",this._oRouterArgs,true);
                }.bind(this)
            }).addSortItem(new sap.m.ViewSettingsItem({
                key: "EmployeeID",
                text: "Employee ID",
                selected: true 
            
            })).addSortItem(new sap.m.ViewSettingsItem({
                key: "FirstName",
                text: "First Name",
                selected: false

            })).addSortItem(new sap.m.ViewSettingsItem({
                key: "LastName",
                text: "Last Name",
                selected: false
            }));
        },
        _applySearchFilter : function(sSearchQuery){
            let aFilters, oFilter, oBinding;
            if(this._sSearchQuery === sSearchQuery) return;

            this._sSearchQuery = sSearchQuery;
            this.byId("searchField").setValue(sSearchQuery);

            aFilters = [];
            if (sSearchQuery && sSearchQuery.length > 0) {
                aFilters.push(new Filter("FirstName", FilterOperator.Contains, sSearchQuery));
                aFilters.push(new Filter("LastName", FilterOperator.Contains, sSearchQuery));
                oFilter = new Filter({ filters: aFilters, and: false });  // OR filter
            }else{
                oFilter = null;
            }

            oBinding = this._oTable.getBinding("items");
            oBinding.filter(oFilter,"Application");
        },

        _applySorter : function(sSortField, sortDescending){
            let bSortDescending, oBinding, oSorter;

            if (sSortField && this._aValidSortFields.indexOf(sSortField) > -1) {
                // convert the sort order to a boolean value
                if (typeof sortDescending === "string") {
                    bSortDescending = sortDescending === "true";
                } else if (typeof sortDescending === "boolean") {
                    bSortDescending =  sortDescending;
                } else {
                    bSortDescending = false;
                }
                // sort only if the sorter has changed
                if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
                    return;
                }
                this._sSortField = sSortField;
                this._bSortDescending = bSortDescending;
                oSorter = new Sorter(sSortField, bSortDescending);
                // sync with View Settings Dialog
                this._syncViewSettingDialogSorter(sSortField, bSortDescending);
                oBinding = this._oTable.getBinding("items");
                oBinding.sort(oSorter);
            }
        },

        _syncViewSettingDialogSorter : function(sSortField, bSortDescending){
            this._oVSD.setSelectedSortItem(sSortField);
            this._oVSD.setSortDescending(bSortDescending);
        },

        onItemPressed : function (oEvent) {
            var oItem, oCtx, oRouter;
            oItem = oEvent.getParameter("listItem");
            oCtx = oItem.getBindingContext();
            this.getRouter().navTo("employeeResume",{
                employeeId : oCtx.getProperty("EmployeeID"),
                query : {
                    tab : "Info"
                }
            });
        }

    });
});