import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// import { chromedriver } from 'chromedriver';

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var assert = require('assert').strict;

var profilePath = "/mnt/c/Users/Mike/AppData/Local/Google/Chrome/User Data/"
var binaryPath =  "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"

var options = new chrome.Options({chromeOptions: {binary: binaryPath}})
options.binary = binaryPath;
options.addArguments("--user-data-dir=/mnt/c/Users/Mike/AppData/Local/Google/Chrome/User Data/")
options.addArguments('--headless')

var browser = new webdriver.Builder().
  withCapabilities({
    browserName: 'chrome',
    chromeOptions: { binary: binaryPath }
  }).
  setChromeOptions(options).
  build();


console.log(options)
console.log("raint raint raint")
console.log("raint raint raint")
console.log("raint raint raint")
console.log("raint raint raint")

var serverUri = "http://localhost:3000"
const appTitle = "React Selenium App";

/**
 * Function to get the title and resolve it it promise.
 * @return {[type]} [description]
 */
function logTitle() {
 return new Promise((resolve, reject) => {
  browser.getTitle().then(function(title) {
   resolve(title);
  });
 });
}
describe("Home Page", function() {
 /**
  * Test case to load our application and check the title.
  */
 it("Should load the home page and get title", function() {
  return new Promise((resolve, reject) => {
   browser
    .get(serverUri)
    .then(logTitle)
    .then(title => {
     assert.strictEqual(title, appTitle);
     resolve();
    })
    .catch(err => reject(err));
  });
 });
/**
  * Test case to check whether the given element is loaded.
  */
 it("Should check whether the given element is loaded", function() {
  return new Promise((resolve, reject) => {
   browser
    .findElement({ id: "sel-button" })
    .then(elem => resolve())
    .catch(err => reject(err));
  });
 });
/**
  * End of test cases use.
  * Closing the browser and exit.
  */
 after(function() {
  // End of test use this.
  browser.quit();
 });
});