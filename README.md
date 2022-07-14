# UI5Con 2022 - 

This repository contains our demo script and example service from UI5Con 2022. The demo is intended show the amazing interplay between community projects, open-ux-tools, Fiori tools and Fiori elements FPM.

## Target Application
![target app](./wireframes.jpg)

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

### 1. Create an application using the easy-ui5 generator
* we using the community driven easyUI5 generator to create our initial app
   * `yo easy-ui5 project`
   * subgenerator `generator-ui5-project` has been enhanced with sub-generators to enabled the new Fiori elements flexible programming model
* while this generator is a community project, it uses modules provided as part of our `open-ux-tools` initiative (https://github.com/SAP/open-ux-tools) that aims to consolidate the core tooling functionality in an open source project that you can inspect, use or contribute to
* let me run the generator ([generated files](https://github.tools.sap/I821846/ui5con/pull/1/files))
    * the generator should be executed in a folder that is already in a VSCode workspace for simplicity
```
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
## 2. Show App in Fiori tools and start the preview
* if VSCode is not open yet, and your folder not part of the active workspace, then open VSCode and add the project to the active workspace
* open the Fiori tools side panel
* open the application info page
    * the generated project can be used with the SAP Fiori tools because the generator utilizes the `open-ux-tools` modules that are also the core of the SAP Fiori tools
* start the preview

## 3. Show FPM Explorer and manually add a FilterBar
* open https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview and explain that we could use annotation driven controls aka FPM building blocks with any FPM enabled app
    * FPM enabled means: use the FE controller as base and make sure that `sap.fe.macros` is available
    * More information at https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/guidance/guidanceCustomApps
* open `FilterBar` and explain what you can do here
    * it is possible to change the code on the fly and see the results
    * remove handlers (which we don't need for today's app) and show that it still renders in FPM
* copy the `FilterBar` snippet
```
<macros:FilterBar metaPath="@com.sap.vocabularies.UI.v1.SelectionFields#SF1" id="FilterBar" />
```
* open `MainView` in VSCode and paste it
* remove qualifier (which we don't need ) and add `xmlns:macros="sap.fe.macros"` to the root element
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

* of course, you could also do this without building blocks but since we have a well annotated OData service here, we can make use of the building block to do less coding even in a freestyle app. In this case, adding the FilterBar building blockgit to the view is all we needed to add agency and travel status as filters in the filter bar because these two fields are specified in the annotations of the entity.

## 4.Explain Application Idea and add Chart
* show the FPM explorer again and select Chart - FilterBar and explain that while I can copy&paste the snippet again, this time it requires specific annotations that a little more complicated and don't exist in my app yet
* since I have no idea how to use it, I use guided development
    * open GD on the side
    * select project
    * scroll to custom page
    * select Chart
    * click on start guide
    * fill form (BookedFlights, any qualifier/title/description, Column, CountFlights)
    * click on insert snippet and next
    * enter relevant data (view, MyChart, BookedFlights)
    * click on instert snippet
* show the preview again

## 5. Add ObjectPage 
* while the main / start page is custom and does not match an SAP Fiori elements page type, from here we need to navigate into a standard FE object page that we can generate with the Fiori tools
* open Page Map
    * select custom main page
    * add navigation to new object page
    * entity: `Airline`
* ALTERNATIVE: with `easy-ui5`
    * change into the project directory
    * execute `yo easy-ui5 project`
    * select `newfpmpage`
```
? What type of page should be use for the main page? Object Page
? What entity should be used for the new page? Airline
```
* explain that the object page has been created (maybe show that the manifest has been updated) but that we still need to take care of the navigation

# 6: Implement Navigation
* open `Main.controller` and add a simple event handler with an alert
```
onChartSelectionChanged: function(event) {
    var oData = event.mParameters.data[0].data;
    alert(oData);
```
* open `Main.view` and add the reference to the event handler `selectionChange=".onChartSelectionChanged"`
* show that the event is handled (in preview)
* go back to code and add the actual navigation coding
```
if (event.mParameters.selected) {
    var oData = event.mParameters.data[0].data;
    var oRouter = this.getExtensionAPI().routing;
    oRouter.navigateToRoute('AirlineObjectPage', { AirlineKey: `'${oData.AirlineID}'` });
}
```
* notes about extension API for routing: built in support for semantic path, making sure that the context are properly handled / propagated, ensuring that the draft / sticky session are dealt with accordingly if they need to be closed
* show preview and working navigation

## 7: Enable FCL
* open application modeler and add FCL
* show that it was added to `manifest.json`
* show the preview again
