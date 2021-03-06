# Application Builder for Cumulocity
The Application Builder for Cumulocity provides a simple, coding-free way to create new applications inside Cumulocity. 

![](https://user-images.githubusercontent.com/38696279/72333172-47cec300-36b3-11ea-9abf-1bb29b490a22.png)

## What's new?
* **Support for the Latest Cumulocity Version:** Based on Cumulocity 1006.3 (The current eu-latest version)
* **Browser-based Device Simulators:** Create device simulators that run directly in your browser.
* **[Runtime widget loading](https://github.com/SoftwareAG/cumulocity-runtime-widget-loader):** Install widgets without re-compiling
* **Group template dashboards:** Give every device in a group an identical dashboard (but customised to the device)
* **Create an App with a custom contextPath:** Change the URL used to access a particular app
* **Tabs:** Group your dashboards into tabs

## Installation
1. Grab the **[Latest Release Zip](https://github.com/SoftwareAG/cumulocity-app-builder/releases)**
2. Go to the **Administration view** in your tenant (/apps/administration)
3. Open the **Own applications** section in the navigator
4. Click **Add application**
5. Select **Upload web application**
6. Select the Zip you downloaded earlier

## Build Instructions
**Note:** It is only necessary to follow these instructions if you are modifying/extending the Application Builder (such as adding custom widgets), otherwise see the [Installation Guide](#Installation).

**Requirements:**
* Git
* NodeJS (release builds are currently built with `v10.19.0`)
* NPM (Included with NodeJS)

**Instructions**
1. Clone the repository: 
```
git clone https://github.com/SoftwareAG/cumulocity-app-builder.git
```
2. Change directory: 
```
cd cumulocity-app-builder
```
2. (Optional) Checkout a specific version: 
```
git checkout v1.1.0
```
3. Install the dependencies: 
```
npm install
```
4. (Optional) Local development server: 
```
npm start
```
5. Build the app: 
```
npm run build
```
6. Deploy the app: 
```
npm run deploy
```

## Quickstart

This guide will teach you how to create your first application using the Application Builder.

**NOTE:** This guide assumes you have followed the [Installation instructions](#Installation)

1. Open the Application Builder from the app switcher (Next to your username in the top right)
2. Click `Add application`
3. Enter the application details and click `Save`
4. Select `Add dashboard`
5. Click `Blank Dashboard`
6. Enter the dahsboard details and click `Save`
7. Select the dashboard from the navigation

Congratulations! You have created an application and added your first screen.

## User Guide
A more detailed user guide is available in the Help section of the Application Builder app.

**NOTE:** This is only shown in the main page of the Application Builder, not when editing an individual application

------------------------------

These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).

You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).
