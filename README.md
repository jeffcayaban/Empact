<h1 align="center"> Empact</h1> <br>

<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="EmpactLogo" title="EmpactLogo" src="https://i.ibb.co/wCfWPVV/Icon.jpg" width="225">
  </a>
</p>

<p align="center">
  An online petition system. Ready to make a change?
</p>

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#runningtests)

<a class="anchor" id="introduction"></a>
## Introduction

Empact is an online petition system that allows you create your own petitions and invites others to create arguments. It uses several argumentation schemes to enable structured discussions to be made.

<a class="anchor" id="installation"></a>
## Installation

Follow these instructions to learn how to install and setup the project files.

### Prerequisites

You will need the following technologies in order to run the system:
* Node (v6+) and Npm (v5.2+) - [Install](https://nodejs.org/en/)
* Java 1.8 - [Install](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Maven (v3.3+) - [Install](https://maven.apache.org/download.cgi)

### Installing
You can download the profile files by downloading the project on the GitHub page or by cloning the project through git.

The following commands shows how you can clone the project through git:

```bash
git clone https://github.com/jeffcayaban/Empact.git
```

### Building
Once you have downloaded the project, we can now build the project files. Run the following command (in the project's directory) to build the required project files:
```bash
mvn package
```
<a class="anchor" id="usage"></a>
## Usage
Once you have built the project, you can now run the system by running the following command in the project's directory:

```bash
java -jar target/Empact-0.0.1-SNAPSHOT.jar
```
Then, start the **client-side** by going to the `/client` folder (of the project directory) and then executing the following command:
```bash
npm start
```
You can now use the system by going to your web browser and visiting: http://localhost:5000

<a class="anchor" id="runningtests"></a>
## Running Tests

To run the **client-side** tests, visit the `/src/main/app` folder and run the following command:
```bash
npm test -- --coverage
```

To run the **server-side** tests, simply run the following command at the root of the project's directory:

```bash
mvn test
```