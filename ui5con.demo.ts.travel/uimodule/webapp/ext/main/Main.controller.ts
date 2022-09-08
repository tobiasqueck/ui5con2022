import Controller from 'sap/fe/core/PageController';
import ExtensionAPI from 'sap/fe/core/ExtensionAPI';
import Routing from "sap/fe/core/controllerextensions/Routing";
import UI5Event from 'sap/ui/base/Event';

/**
 * Required definition of extension API getter until it is fixed in the sap.fe types.
 */
interface ExtensionAccess {
    getExtensionAPI(): ExtensionAPI & {
        routing: Routing;
    };
}

/**
 * @namespace ui5con.demo.ts.travel.ext.main.Main.controller
 */
export default class Main extends Controller {

    public onChartSelectionChanged(this: ExtensionAccess, event: UI5Event) {
        if (event.getParameter('selected')) {
            const data = event.getParameter('data')[0].data;
            const router = this.getExtensionAPI().routing;
            router.navigateToRoute('AirlineObjectPage', { AirlineKey: `'${data.AirlineID}'` });
        }
    }
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf ui5con.demo.ts.travel.ext.main.Main
     */
    // public onInit(): void {
    //
    //}

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf ui5con.demo.ts.travel.ext.main.Main
     */
    // public  onBeforeRendering(): void {
    //
    //  },

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf ui5con.demo.ts.travel.ext.main.Main
     */
    // public  onAfterRendering(): void {
    //
    //  },

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf ui5con.demo.ts.travel.ext.main.Main
     */
    // public onExit(): void {
    //
    //  }
}