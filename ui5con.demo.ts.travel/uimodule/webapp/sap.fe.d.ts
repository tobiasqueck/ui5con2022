import Controller from 'sap/fe/core/PageController';
import ExtensionAPI from 'sap/fe/core/ExtensionAPI';
import Routing from "sap/fe/core/controllerextensions/Routing";
import EditFlow from "sap/fe/core/controllerextensions/EditFlow";

declare module 'sap/fe/core/PageController' {
	export default interface PageController {
		getExtensionAPI() : ExtensionAPI & {
            routing: Routing;
            editFlow: EditFlow;
        };
	}
}
