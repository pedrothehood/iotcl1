sap.ui.define([
    "sap/ui/core/UIComponent",
    "showsensordata/model/models",
    "sap/ui/Device"
], function (UIComponent, models, Device) {
    "use strict";

    return UIComponent.extend("showsensordata.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Set the device model
            this.setModel(models.createDeviceModel(), "device");
        },

        /**
         * Diese Methode wird vom App.controller.js aufgerufen.
         * Sie bestimmt, ob der Compact- oder Cozy-Modus (für Touch) genutzt wird.
         * @public
         * @returns {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy'
         */
        getContentDensityClass: function () {
            if (!this._sContentDensityClass) {
                if (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });
});
