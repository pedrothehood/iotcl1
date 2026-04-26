<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>OpenUI5 Sensor Data Gauge</title>
    <script id="sap-ui-bootstrap"
            src="https://ui5.sap.com/resources/sap-ui-core.js"
            data-sap-ui-theme="sap_belize"
            data-sap-ui-libs="sap.m,sap.viz.ui5.controls">
    </script>
    <script>
        sap.ui.getCore().attachInit(function () {
            new sap.ui.core.ComponentContainer({
                name: "openui5",
                settings: {
                    id: "app"
                }
            }).placeAt("content");
        });
    </script>
</head>
<body class="sapUiBody" role="application">
<div id="content"></div>
</body>
</html>

