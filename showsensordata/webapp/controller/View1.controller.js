sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("showsensordata.controller.View1", {

        /**
         * Lifecycle Init
         * @public
         */
        onInit: function () {
            // Initiales Model setzen
            this.getView().setModel(new JSONModel({
                header: {},
                measurements: [],
                latest: { value1: 0, percentage: 0, color: "Neutral" }
            }), "sensorData");
        },

        /**
         * Holt die Daten vom PHP REST-Service
         * @public
         */
        onFetchData: function () {
            var sSensorId = this.byId("inputSensorId").getValue();
            if (!sSensorId) {
                MessageToast.show("Bitte Sensor-ID eingeben");
                return;
            }

            var sUrl = "http://localhost/projekte-01/iotph1/getsdata.php?api_key=tP3434AATdasd444&sensor_id=" + sSensorId;
            var oModel = this.getView().getModel("sensorData");

            sap.ui.core.BusyIndicator.show(0);

            fetch(sUrl)
                .then(response => response.json())
                .then(data => {
                    // Annahme: API gibt { sensorid_info: {...}, data: [...] } zurück
                    // Wir sortieren sicherheitshalber nach Zeit für das neuste Element
                    var aMeasurements = data.sensor || [];
                    aMeasurements.sort((a, b) => new Date(b.reading_time) - new Date(a.reading_time));

                    var oLatest = aMeasurements[0] || { value1: 0 };
                    var fTemp = parseFloat(oLatest.value1);

                    oModel.setProperty("/header", data.sensorid || {});
                    oModel.setProperty("/measurements", aMeasurements);
                    oModel.setProperty("/latest", {
                        value1: fTemp,
                        percentage: this._calculatePercentage(fTemp),
                        color: this._getTemperatureColor(fTemp)
                    });

                    sap.ui.core.BusyIndicator.hide();
                })
                .catch(err => {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("Fehler beim Laden der Daten");
                });
        },

        /**
         * Berechnet den Prozentwert für RadialMicroChart (10-40 Grad Bereich)
         * @private
         */
        _calculatePercentage: function (fTemp) {
            if (fTemp <= 10) return 0;
            if (fTemp >= 40) return 100;
            return ((fTemp - 10) / (40 - 10)) * 100;
        },

        /**
         * Ermittelt die Farbe basierend auf den Anforderungen
         * @private
         */
        _getTemperatureColor: function (fTemp) {
            if (fTemp >= 0 && fTemp <= 10) return "Error"; // Rot
            if (fTemp > 10 && fTemp <= 18) return "Critical"; // Gelb
            if (fTemp >= 19 && fTemp <= 24) return "Good"; // Grün
            if (fTemp >= 25 && fTemp <= 32) return "Critical"; // Gelb
            if (fTemp >= 33 && fTemp <= 40) return "Error"; // Rot
            return "Neutral";
        }
    });
});
