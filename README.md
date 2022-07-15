# UI5Con 2022 - Building SAP Fiori apps with flexible open-source modules

This repository contains the demo script and example service used at UI5Con 2022 in session [“Building SAP Fiori apps with flexible open-source modules"](https://openui5.org/ui5con/germany2022/slides/2022-UI5con-1_7-Ashley-Tung-Final.pdf). The demo is intended show the amazing interplay between community projects, open UX tools, SAP Fiori tools and SAP Fiori elements flexible programming model.

**Just to be sure:** this is a demo script, nothing else, no delivered software or promise of future features etc. There is also no guarantee that the demo works. It worked for us at UI5Con and we want it to work for you as well, so if it doesn't work, just open an issue, and we look at it as soon as time permits - no response times guaranteed, but trust us, we care about you.

## Target Application
![target app](./wireframes.png)

At the end of running through the demo script, you should have an app like [../demo-result/ui5con.demo.travel](../demo-result/ui5con.demo.travel)

## Before the Demo
For the demo, we are using features of the SAP Fiori tools that are not yet fully released. To use the features, you need to an unlisted feature flag. If you are interested in trying this demo script, please reach out to Ashley or Tobias and we share the feature flag.

We are using the `easy-ui5-generator` and `yo` therefore, both need to be globally installed.
```
npm i -g yo
npm i -g generator-easy-ui5
```

We are using Visual Studio Code for the demo including any command that we run in a terminal. The commands can of course be execute in any terminal, and it is also possible to run the very same demo in SAP Business Application Studio.

We are using a locally running server (included in this repo) for the demo so that we don't risk any issues with the network. To start the server:
```
cd server
npm i
npm start
```
The server should be running at http://localhost:4004

## Demo

### 1. Create application using easy-ui5 generator
* we are using the community driven easyUI5 generator to create our initial app
   * `yo easy-ui5 project`
   * subgenerator `generator-ui5-project` has been enhanced with sub-generators to enabled the new Fiori elements flexible programming model
* while this generator is a community project, it uses modules provided as part of our `open-ux-tools` initiative (https://github.com/SAP/open-ux-tools) that aims to consolidate the core tooling functionality in an open source project that you can inspect, use or contribute to
* let's run the generator
    * the generator should be executed in a folder that is already in a VSCode workspace for simplicity
```
? What do you want to do? Create a new OpenUI5/SAPUI5 project
? How do you want to name this project? travel
? Which namespace do you want to use? ui5con.demo
? Do you want to enable the SAP Fiori elements flexible programming model? Yes
? Do you want the module to be visible in the SAP Fiori tools? Yes
? On which platform would you like to host the application? Static webserver
? Where should your UI5 libs be served from? Content delivery network (SAPUI5)
? Would you like to create a new directory for the project? Yes
? Would you like to add JavaScript code assist libraries to the project? Yes
? What type of page should be use for the main page? Custom Page
? What is the name of the page view? Main
? What is the url of the main service? http://localhost:4004/travel
? What entity should be used for the new page? BookedFlights
```
## 2. Show App in SAP Fiori tools and preview
* if VSCode is not open yet, and your folder not part of the active workspace, then open VSCode and add the project to the active workspace
* open the Fiori tools side panel
* open the application info page
    * the generated project can be used with the SAP Fiori tools because the generator utilizes the `open-ux-tools` modules that are also the core of the SAP Fiori tools
* start the preview

## 3. Show FPM Explorer and add FilterBar
* to add a building block the first time, we should look at the SAP Fiori elements for OData v4 flexbible programming model explorer (aka FPM Explorer) at https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview 
* here we select the `FilterBar` in the left pane to show a working `FilterBar` and its corresponding code and configuration
    * it is possible to change the code on the fly and see the results
    * we remove the event handlers (which we don't need for today's app) and can see that the building block still renders correctly
* copy the `FilterBar` snippet
* Note:
    * building blocks can only be used in FPM enabled apps, i.e. apps that use the the Fiori elements controllers and component as well as load the `sap.fe` libs
    * More information at https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/guidance/guidanceCustomApps

```
<macros:FilterBar metaPath="@com.sap.vocabularies.UI.v1.SelectionFields#SF1" id="FilterBar" />
```
* open `MainView` in VSCode and paste it
* finally, we need to remove the qualifier (which we don't need have in our servuce) and add `xmlns:macros="sap.fe.macros"` to the root element
```
<mvc:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"
    xmlns:html="http://www.w3.org/1999/xhtml" controllerName="ui5con.demo.travel.ext.main.Main" 
    xmlns:macros="sap.fe.macros">
    <Page title="Main">
        <content>
            <macros:FilterBar
				metaPath="@com.sap.vocabularies.UI.v1.SelectionFields#SF1"
				id="FilterBar"
				
			/>
        </content>
    </Page>
</mvc:View>
```

* of course, we could also do this without building blocks but since we have a well annotated OData service here, we can make use of the building block to do less coding even in a freestyle app. In this case, adding the `FilterBar` building blockgit to the view is all we needed to add agency and travel status as filters in the filter bar because these two fields are specified in the annotations of the entity.

## 4.Add Chart
* to add a chart, we could use the FPM explorer again, however, for the `FilteBar` we just needed to copy the snippet for the building blocks, for the chart, we would also need to add chart specific annotations
* as alternative, we are using the guided development extensions of the SAP Fiori tools to "guide" us through the "development" of a chart and its annotions
    * open GD on the side
    * select project
    * scroll to custom page
    * select Chart
    * click on start guide
    * fill form (BookedFlights, any qualifier/title/description, Column, CountFlights)
    * click on insert snippet and next
    * enter relevant data (view, MyChart, BookedFlights)
    * click on instert snippet
* we can now check the preview again and interact with the `FilterBar` to update the data shown in the `Chart`

## 5. Add ObjectPage 
* while the main / start page is custom and does not match an SAP Fiori elements page type, from here we need to navigate into a standard SAP Fiori elements object page
* we can generate the configuration with the application modeler extension of the SAP Fiori tools
* open the page map (using the SAP Fiori tools side panel again)
    * select custom main page
    * add navigation to new object page
    * entity: `Airline`
* ALTERNATIVE, we could also use the `easy-ui5` generator again
    * change into the project directory
    * execute `yo easy-ui5 project`
    * select `newfpmpage`
```
? What type of page should be use for the main page? Object Page
? What entity should be used for the new page? Airline
```
* both will result in exactly the same changes (this can be visualized best by checking the source control tab) because both are based on the same module from the `open-ux-tools` project

## 6: Implement Navigation
* open `Main.controller` and add a simple event handler with an alert
```
onChartSelectionChanged: function(event) {
    var oData = event.mParameters.data[0].data;
    alert(oData);
}
```
* open `Main.view` and add the reference to the event handler `selectionChange=".onChartSelectionChanged"`
* we can now test the initial code in our live preview by clicking on a bar in the chart
* go back to code and add the actual navigation coding
```
if (event.mParameters.selected) {
    var oData = event.mParameters.data[0].data;
    var oRouter = this.getExtensionAPI().routing;
    oRouter.navigateToRoute('AirlineObjectPage', { AirlineKey: `'${oData.AirlineID}'` });
}
```
* we can use the SAP Fiori elements extension API and its routing component to do the navigation (and synching of bindings etc.)
* we can go back to the preview and test the working navigation

## 7: Enable FCL
* open Page Map (using the SAP Fiori tools side panel again)
* in the list of application properties we can enable the flexible column layout (FCL)
* we can check the added configuration in the source control tab when selecting the `manifest.json`
* we can go back to the preview and test our final application
