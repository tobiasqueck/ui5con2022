/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["ui5con/demo/ts/travel/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
