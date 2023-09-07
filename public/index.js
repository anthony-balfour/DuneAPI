/**
 * Name: Anthony Balfour
 * Date: 5/18/ 2023
 * Section: CSE 154 AF
 *
 * This javascript file, index.js, handles the functionality for the cp4 webpage.
 * In the Dune section, if a user clicks an image, more information about that book shows up,
 * This page handles the form input for the user information section. The user can enter their name,
 * email, and comments/questions.
 */

"use strict";

/**
 * Anonymous wrapper function for the entire file
 */
(function() {

  window.addEventListener("load", init);

  /**
   * Initializes the event listener on the Contact Me form
   * and the event listener for clicking a Dune book cover image
   */
  function init() {
    qs("form").addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm();
    });
    qsa("img").forEach(img => {
      img.addEventListener("click", duneInfo);
    });
  }

  /**
   * Submits the form information to the server
   */
  function submitForm() {
    let params = new FormData(qs("form"));
    if (qs("#form-container p") !== null) {
      qs("#form-container p").remove();
    }
    fetch("/", {method: "POST", body: params})
      .then(statusCheck)
      .then(res => res.text())
      .then(displayFormResult)
      .catch((error) => {
        displayFormResult(error);
      });
  }

  /**
   * Fetches the back cover synposis of the selected Dune book
   */
  function duneInfo() {
    let title = this.id;
    fetch("/dune/" + title)
      .then(statusCheck)
      .then(res => res.json())
      .then(displayDune)
      .catch(displayFormResult);
  }

  /**
   * Displays the JSON information of the clicked Dune book
   * @param {Object} res - JSON with back cover synposis of the selected book
   */
  function displayDune(res) {
    if (qs("#dune-section p") !== null) {
      qs("#dune-section p").remove();
    }
    let paragraph = generate("p");
    paragraph.textContent = res.synopsis;
    paragraph.classList.add("dune-synopsis");
    id("dune-section").appendChild(paragraph);
  }

  /**
   * Displays the response from the Contact Me Form Submission API endpoint
   * Has a message for success and for failure
   * @param {String} res - Response from API detailing if form submission was successful
   */
  function displayFormResult(res) {
    let paragraph = generate("p");
    paragraph.textContent = res;
    id("form-container").appendChild(paragraph);
  }

  /**
   * Finds the element with the specified selector
   *
   * @param {String} selector - css selector
   * @returns {HTMLElement} HTML element associated with the selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Finds the element with the specified selector
   *
   * @param {String} selector - css selector
   * @returns {HTMLElement} - all HTML elements matching the given selector
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Finds the element with the specified ID attribute.
   *
   * @param {string} id - element ID
   * @returns {HTMLElement} HTML element associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Generates a HTMLElement of the given type
   *
   * @param {String} type - HTML element type
   * @return {HTMLElement} returns generated HTML element
   */
  function generate(type) {
    return document.createElement(type);
  }

  /**
   * Checks the status code of the fetched endpoint
   * @param {Promise} response - response Object from the endpoint
   * @return {Promise} - response Object from the endpoint
   * @throws API error if the the status code is 400 or 500 level, or not ok
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }
})();