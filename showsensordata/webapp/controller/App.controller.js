sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("showsensordata.controller.App", {

        onInit: function () {
            // Initialize the model
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "sensorItems");
        },

        onFetchData: function (oEvent) {
            var sSensorId = this.byId("sensorIdInput").getValue();
            
            if (!sSensorId) {
                sap.m.MessageToast.show("Please enter a sensor ID");
                return;
            }

            // Show loading indicator
            var oPage = this.byId("page");
            oPage.setBusy(true);

            // Create URL with sensor ID
            var sUrl = "http://localhost/projekte-01/iotph1/getsdata.php?api_key=tP3434AATdasd444&sensor_id=" + sSensorId;
            
            // Fetch data
            fetch(sUrl)
                .then(response => response.json())
                .then(data => {
                    this._updateDataModel(data);
                    this._updateGauge(data);
                })
                .catch(error => {
                    console.error("Error fetching sensor data:", error);
                    sap.m.MessageToast.show("Error fetching sensor data");
                })
                .finally(() => {
                    oPage.setBusy(false);
                });
        },

        _updateDataModel: function (aData) {
            // Transform data to fit table model
            var oModel = this.getView().getModel("sensorItems");
            oModel.setData(aData);
        },

        _updateGauge: function (aData) {
            // Get the latest temperature reading
            if (!aData || aData.length === 0) return;
            
            var oLatestReading = aData.sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate))[0];
            var fTemp = oLatestReading.value1;

            // Get chart element
            var oChart = this.byId("temperatureChart");
            
            // Update chart with temperature value and color coding
            var oData = {
                value: fTemp,
                maxValue: 40,
                color: this._getTemperatureColor(fTemp)
            };
            
            // Note: In a full implementation, we would update the chart with actual chart data
            // This is a simplified example
        },

        _getTemperatureColor: function (fTemp) {
            if (fTemp >= 0 && fTemp <= 10) return "Error";
            if (fTemp >= 33 && fTemp <= 40) return "Error";
            if (fTemp >= 11 && fTemp <= 18) return "Warning";
            if (fTemp >= 25 && fTemp <= 32) return "Warning";
            if (fTemp >= 19 && fTemp <= 24) return "Success";
            return "None";
        }
    });
});
