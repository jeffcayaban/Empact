

<h1 align="center"> Empact</h1> <br>

<p align="center">
  <img alt="EmpactLogo" title="EmpactLogo" src="https://i.ibb.co/wCfWPVV/Icon.jpg" width="225">
</p>

<p align="center">
  An online petition system. Ready to make a change?
</p>

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation) 
	* [Prerequisites](#prerequisites)
	* [Installing](#installing)
	* [Building](#building)
* [Usage](#usage)
* [Running Tests](#runningtests)
	* [Client Side Tests](#clientsidetests)
	* [Server Side Tests](#serversidetests)

<a class="anchor" id="introduction"></a>
## Introduction

Empact is an online petition system that allows you create your own petitions and invites others to create arguments. It uses several argumentation schemes to enable structured discussions to be made.

<a class="anchor" id="installation"></a>
## Installation

Follow these instructions to learn how to install and setup the project files.

<a class="anchor" id="prerequisites"></a>
### Prerequisites

You will need the following technologies in order to run the system:
* Java SE Development Kit 8 - [Install](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

> Note: After installing Java, ensure that the `JAVA_HOME` environment variable is set properly on your system. Click [here](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/) to learn how.

<a class="anchor" id="installing"></a>
### Installing

You can download the profile files by downloading the project on the [GitHub page](https://github.com/jeffcayaban/Empact/) or by cloning the project through [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

The following steps shows how you can clone the project through Git:

1. Open Terminal (if you are using macOS) or Command Prompt (if you are on Windows)
2. Go to a directory or folder you wish to have the project downloaded to.
   > To change directory, use the `cd` command.
4. Then run the following command to download the project into that directory:

   ```bash
   git clone https://github.com/jeffcayaban/Empact.git
   ```

<a class="anchor" id="building"></a>
### Building

Once you have downloaded the project, we can now start to build the project files. Below are the steps to build the project.

> Note: The process of building the project may take several minutes to complete. This is due to Maven (the build automation tool) having to download the project dependencies, running the required tests and then producing the final JAR file. 

If you are running **macOS**:
1. Open Terminal and navigate to the root of the project's directory.
2. Then run the following command:

   ```bash
   ./mvnw package
   ```

If you are using are using **Windows**:
1. Open Command Prompt and navigate to the root of the project's directory.
2. Then run the following command:

   ```bash
   mvnw.cmd package
   ```
   > You will know if the build was a success once you see a message saying "BUILD SUCCESS".

   <p align="center">
     <img alt="SuccessfulBuild" title="Successful Build" src="https://i.ibb.co/T8nYF1v/built-success.png" width="600">
   </p>

<a class="anchor" id="usage"></a>
## Usage

> You will need to have an internet connection in order to utilise the system, this is due to the system depending on an external database.

Once you have built the project, you can now start to use the system. To do so, follow the following steps:

1. Open Terminal (if you are using macOS) or Command Prompt (if you are on Windows)
2. Navigate to the root of the project's directory.
   > To change directory, use the `cd` command.
3. Then run the following command:

   ```bash
   java -jar target/Empact-0.0.1-SNAPSHOT.jar
   ```
4. Once you see the message: `Started EmpactApplication in ...` you can then proceed to opening the system's website. To view the website, go to http://localhost:5000

   > Below shows the message you should see:

   <p align="center">
     <img alt="CodeCoverageReport" title="Client-Side Code Coverage Report" src="https://i.ibb.co/d0VgMGW/running.png" width="900">
   </p>

You will be shown the homepage upon visiting http://localhost:5000. It will look as follows:

   <p align="center">
     <img alt="Homepage" title="Homepage" src="https://i.ibb.co/1Td9GHv/homepage.png" width="700">
   </p>



<a class="anchor" id="runningtests"></a>
## Running Tests

<a class="anchor" id="clientsidetests"></a>
### Client Side Tests

> These tests includes a combination of unit tests and snapshot tests (that are created with Jest).


In order to run the **client-side** tests, you will need to have the following technologies installed:
* Node (v10.15+) -  [Install](https://nodejs.org/en/)
* Yarn (v1.13+) -  [Install](https://nodejs.org/en/)

Once installed, follow the following steps:
1. Open Terminal (if you are using macOS) or Command Prompt (if you are on Windows).
2. Navigate to the root of the project's directory and navigate further to the `src/main/app` folder.
3. Run the following command:

   ```bash
   yarn test --coverage
   ```
   > Whilst the command is being executed, you will be able to see the tests that are passing. When the tests are finished, you will be shown a report of statistics regarding code coverage. Below shows an example of what you will see.

   <p align="center">
     <img alt="CodeCoverageReport" title="Client-Side Code Coverage Report" src="https://i.ibb.co/YtfSTwv/client-side-report.png" width="900">
   </p>

<a class="anchor" id="serversidetests"></a>
### Server Side Tests

> These tests are JUnit unit tests. They verify the functionality of the system's individual services and helper methods.

To run the **server-side** tests, follow the following steps:

If you are running **macOS**:
1. Open Terminal and navigate to the root of the project's directory.
2. Then run the following command:

   ```bash
   ./mvnw test
   ```

If you are using are using **Windows**:
1. Open Command Prompt and navigate to the root of the project's directory.
2. Then run the following command:

   ```bash
   mvnw.cmd test
   ```

   > Once the tests are completed, you will be shown a short summary the results. They should look as follows (if successful):

   <p align="center">
     <img alt="ServerSideReport" title="Server-Side Code Coverage Report" src="https://i.ibb.co/k2h4wfF/server-side-report.png" width="400">
   </p>

## External Dependencies

The system uses many open source libraries and packages. Below shows the different dependencies and how they are applied within the system.

### Front End Dependencies:
* [FontAwesome](https://fontawesome.com/) - Used to display icons on the website to help users to better understand certain features.
* [D3.js](https://d3js.org/) - Is a dependency for `react-d3-tree`. 
* [Moment.js](https://momentjs.com/) - Is used for parsing timestamps from API responses and for manipulating dates to be displayed to the user.
* [React](https://reactjs.org/) - Is a JavaScript library that is used to build the pages and the individual UI components of the system.
* [React Bootstrap](https://react-bootstrap.github.io/) - Is a React library that contains a set of components. Many components from this library have been used within the system pages.
* [react-copy-to-clipboard](https://www.npmjs.com/package/react-copy-to-clipboard) - Is a React component that is used for the "Share" functionality. It is found in arguments and petitions.
* [react-d3-tree](https://www.npmjs.com/package/react-d3-tree) - Is a React component that is used for rendering a data visualisation of the arguments made to a petition or to another argument.
* [react-datepicker](https://www.npmjs.com/package/react-datepicker) - Is a React component that is used to allow users to select a date for their petitions
* [react-dom](https://www.npmjs.com/package/react-dom) - Is used in conjunction with React.
* [react-horizontal-scrolling-menu](https://www.npmjs.com/package/react-horizontal-scrolling-menu) - Is a React component that is used to display the list of arguments for a petition report.
* [react-router-bootstrap](https://www.npmjs.com/package/react-router-bootstrap) - Is used for allowing React Bootstrap link components to work with the React Router.
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Is used with the React Router.
* [react-scripts](https://www.npmjs.com/package/react-scripts) - Is a dependency of React and is used to help run certain scripts. For example, for producing the build files.
* [react-spinners](https://www.npmjs.com/package/react-spinners) - Is a library of spinners in the form of React components. They are used for when a process is being performed on the system.
* [react-toastify](https://www.npmjs.com/package/react-toastify) - Is a React library of notification components. They are used to notify the user of a successful or unsuccessful login.
* [sweetalert2](https://sweetalert2.github.io/) - Is a JavaScript library of alert components. They are used for displaying the outcome of any operations that are performed in the system.

### Back End Dependencies:

* [Spring Data](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa) - Is used for accessing the data from the database.
* [Spring Security](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security) - Is used for authenticating users on the system.
* [Spring Boot Web Starter](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web) - Provides the functionalities required to RESTful services.
* [MySQL Connector for Java](https://mvnrepository.com/artifact/mysql/mysql-connector-java) - Is used for allowing the Java application to communicate with the SQL database.
* [Spring Boot Test Starter](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test) - Is used to provide the framework for testing a Spring Boot application.
* [Project Lombok](https://projectlombok.org/) - Used to reduce the boilerplate code for constructors, getters and setters.
* [Java JWT](https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt) - Is used to generate and authenticate JWT tokens.
* [Jackson Datatype: JSR310](https://mvnrepository.com/artifact/com.fasterxml.jackson.datatype/jackson-datatype-jsr310) - Is used to enable Jackson support for Java 8 date and time.
* [Mockito](https://site.mockito.org/) - Is used mocking code for unit tests.
