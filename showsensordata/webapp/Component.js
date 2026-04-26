sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "showsensordata/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("showsensordata.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
        }
    });
});
