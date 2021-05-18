# Trento-HH_IoT-Project
## About
Covid IoT project in collaboration with Haaga-Helia in Finland and Trento in Italy.

Trento provides IoT data in a csv format, Haaga-Helia has created a react webtool to handle the large quantity of data and provide a CSV file with relevant information.

## Built with
-Node.js

-Npm

-React

## Getting started
-Clone from this github repository.
 ```
 
 $ git clone https://github.com/Epoggi/Trento-HH_IoT-Project.git
 
 ```

-Install node and npm to your computer.

-Hit 'npm install' at the cloned repository location with terminal.
     -cd coronafront folder

-If all went well 'npm start' should start the web application.

### Prerequisites
-Node.js

-Npm

### Installation
Npm and node come in the same package, install node from link provided below to get both

#### After Npm and node, other used components can be installed just by typing 'npm install' in your terminal at the cloned project location.

##### What is npm? (https://www.npmjs.com/get-npm)
npm makes it easy for JavaScript developers to share and reuse code, and makes it easy to update the code that you’re sharing, so you can build amazing things.

##### About Node.js® (https://nodejs.org/en/about/)
As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

#### Node.js and Npm
Here's the abbreviated guide, highlighting the major steps:

1. Open the official page for Node.js downloads and download Node.js for Windows by clicking the "Windows Installer" option
2. Run the downloaded Node.js .msi Installer - including accepting the license, selecting the destination, and authenticating for the install.
     
     This requires Administrator privileges, and you may need to authenticate
3. To ensure Node.js has been installed, run 'node -v' in your terminal - you should get something like v6.9.5
```

$ node -v

```
5. Update your version of npm with
```

$ npm install npm --global

```

     This requires Administrator privileges, and you may need to authenticate
##### Congratulations - you've now got Node.js installed, and are ready to start building!

##### Download:
https://nodejs.org/en/

##### Guide Source:
https://nodesource.com/blog/installing-nodejs-tutorial-windows/

### Other installations
hit 'npm install' on your terminal, at the project location

## Using the software
##### remember to hit 'npm install' on your terminal, at the project location
This step downloads necessary parts e.g. react and other components

1. After installation is succesful, hit 'npm start' in your terminal at the project location
2. At this page you can see the data in a scatter chart, two date pickers, filter button and link to provide a csv file and a button to add csv file
3. Adjusting the date pickers and pressing filter, filters the data in the scatter chart to show the datapoints between the time you have adjusted.
4. The data for the csv creation is created in riskCheck function.

## Changing the CSV file used in the data processing
1. Under the chart is select CSV data to parse, button to open file browser and after it selected file
2. Test data is found at data folder in the project under src folder

## Contact

* []() [Joni Miettinen](https://github.com/Jonnemanni)
* []() [Niko Hautala](https://github.com/Epoggi)
