

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
* Java 1.8 - [Install](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

> Note: After installing Java 1.8, ensure that the `JAVA_HOME` environment variable is set properly on your system. Click [here](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/) to learn how.

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
