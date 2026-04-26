sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("showsensordata.controller.View1", {

        onInit: function () {
            // Initialize model
            var oModel = new JSONModel({});
            this.getView().setModel(oModel, "sensorData");
            
            // Initialize gauge with default values
            this._initializeGauge();
        },

        _initializeGauge: function() {
            var oRadialChart = this.byId("radialChart");
            if (oRadialChart) {
                oRadialChart.setValue(0);
                oRadialChart.setDisplayedValue("0 °C");
                oRadialChart.setValueColor("Neutral");
            }
        },

        onSearch: function (oEvent) {
            var sSensorId = this.byId("sensorInput").getValue();
            
            if (!sSensorId) {
                sap.m.MessageToast.show(this.getResourceBundle().getText("sensorIdRequired"));
                return;
            }
            
            // Show loading indicator
            this.getView().setBusy(true);
            
            // Fetch data from API
            this._fetchSensorData(sSensorId);
        },

        _fetchSensorData: function (sSensorId) {
            var sUrl = "http://localhost/projekte-01/iotph1/getsdata.php?api_key=tP3434AATdasd444&sensorid=" + sSensorId;
            
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                dataType: "json",
                success: this._onDataReceived.bind(this),
                error: this._onDataError.bind(this)
            });
        },

        _onDataReceived: function (oData) {
            this.getView().setBusy(false);
            
            // Set data to model
            var oModel = this.getView().getModel("sensorData");
            if (oData && oData.Sensor && oData.Sensor.length > 0) {
                // Sort sensor data by timestamp (newest first)
                oData.Sensor.sort(function(a, b) {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                oModel.setData(oData);
                
                // Update gauge with latest data
                this._updateGauge(oData.Sensor[0]);
            } else {
                sap.m.MessageToast.show(this.getResourceBundle().getText("noDataFound"));
                oModel.setData({});
                this._initializeGauge();
            }
        },

        _onDataError: function (oError) {
            this.getView().setBusy(false);
            sap.m.MessageToast.show(this.getResourceBundle().getText("loadError"));
            this._initializeGauge();
        },

        _updateGauge: function (oLatestData) {
            var oRadialChart = this.byId("radialChart");
            if (!oRadialChart) return;
            
            var fTemperature = parseFloat(oLatestData.value1);
            
            if (isNaN(fTemperature)) {
                oRadialChart.setValue(0);
                oRadialChart.setDisplayedValue("0 °C");
                oRadialChart.setValueColor("Neutral");
                return;
            }
            
            // Update gauge values
            oRadialChart.setValue(fTemperature);
            oRadialChart.setDisplayedValue(fTemperature.toFixed(1) + " °C");
            
            // Set color based on temperature
            if (fTemperature > 30) {
                oRadialChart.setValueColor("Error");
            } else if (fTemperature > 20) {
                oRadialChart.setValueColor("Warning");
            } else {
                oRadialChart.setValueColor("Success");
            }
        },

        getResourceBundle: function() {
            var oBundle = this.getView().getModel("i18n") && this.getView().getModel("i18n").getResourceBundle();
            if (!oBundle) {
                // Fallback for when i18n model is not available
                return {
                    getText: function(key) {
                        var texts = {
                            sensorIdRequired: "Sensor ID is required",
                            noDataFound: "No data found",
                            loadError: "Error loading data",
                            sensorTableTitle: "Sensor Data",
                            sensorIdColumn: "Sensor ID",
                            temperatureColumn: "Temperature",
                            humidityColumn: "Humidity",
                            dateTimeColumn: "Date Time"
                        };
                        return texts[key] || "";
                    }
                };
            }
            return oBundle;
        }
    });
});
