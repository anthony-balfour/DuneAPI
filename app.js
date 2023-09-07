/**
 * Name: Anthony Balfour
 * Date: 5/18/ 2023
 * Section: CSE 154 AF
 *
 * This file, app.js, runs Node and creates two main endpoints:
 * One endpoint for a "Contact Me" form with fields for user information
 * One endpoint for synopses of any of the first 3 Dune books.
 */

"use strict";

const express = require("express");
const app = express();
const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const fs = require("fs").promises;
const STATUS_CLIENT_ERROR = 400;
const STATUS_SERVER_ERROR = 500;
const DEFAULT_PORT = 8000;

/**
 * Designates a POST endpoint which requires parameters of:
 * firstName
 * lastName
 * email
 * and an optional parameter of:
 * comments-questions
 * If the required parameters are not given, a message will be returned stating
 * there is a missing field
 */
app.post("/", (req, res) => {
  res.type("text");
  let firstName = req.body["first-name"];
  let lastName = req.body["last-name"];
  let email = req.body.email;

  if (firstName && lastName && email) {
    res.send("Form successfully submitted!");
  } else {
    let message = "Form subsmission not successful. Missing a required field.";
    res.status(STATUS_CLIENT_ERROR).send(message);
  }
});

/**
 * Creates a GET endpoint with a route parameter of "/dune/:title"
 * valid :title parameters are:
 * "dune"
 * "messiah"
 * "children"
 * Returns JSON with the respective book synposis.
 * Since this endpoint is fetched in index.js
 * from a clickable element with a hard-coded parameter,
 * an error in this case would be a server error handled with a message to the user
 */
app.get("/dune/:title", async (req, res) => {
  let title = req.params.title;
  let synopsis = await readDuneFile(title);
  if (synopsis !== null) {
    res.json({
      "synopsis": synopsis
    });
  } else {
    res.status(STATUS_SERVER_ERROR).send({
      "error": "Server error. Try again."
    });
  }
});

/**
 * Reads the the local text file with the name of the given title.
 * If the local file does not exist, returns null
 * @param {String} title -title of the Dune book
 * @returns {Promise} returns a promise from reading the text file with the name
 * of the given title
 */
function readDuneFile(title) {
  if (title === "dune" || title === "messiah" || title === "children") {
    return fs.readFile(title + ".txt", "utf-8");
  }
  return null;
}

app.use(express.static("public"));
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT);