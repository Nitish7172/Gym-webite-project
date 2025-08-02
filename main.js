/**
 * @file main.js
 * @description Main script for the IronCore Fitness website.
 * @author Your Name
 * @version 1.0.0
 */

// Encapsulate the entire script in an object to avoid global scope pollution.
const IronCoreApp = {
  /**
   * Initializes the application by setting up all event listeners and functionalities.
   */
  init() {
    // Wait for the DOM to be fully loaded before running the script.
    document.addEventListener('DOMContentLoaded', () => {
      this.setupMobileMenu();
      this.setupSmoothScrolling();
      this.setupTrialForm();
      console.log('IronCore Fitness App Initialized.');
    });
  },

  /**
   * Sets up the functionality for the mobile navigation menu (hamburger).
   */
  setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) {
      console.error('Mobile menu elements not found.');
      return;
    }

    hamburger.addEventListener('click', () => {
      // Toggle 'active' class on both the hamburger and the nav links for CSS styling.
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close the mobile menu when a link is clicked.
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  },

  /**
   * Sets up smooth scrolling for all anchor links pointing to an ID on the page.
   */
  setupSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          console.warn(`Smooth scroll target not found for ID: ${targetId}`);
        }
      });
    });
  },

  /**
   * Handles the submission logic for the free trial form.
   */
  setupTrialForm() {
    const trialForm = document.getElementById('trial-form');

    if (!trialForm) {
      console.error('Trial form not found.');
      return;
    }

    trialForm.addEventListener('submit', function (e) {
      // Prevent the default form submission behavior.
      e.preventDefault();

      const nameInput = this.elements['name'];
      const emailInput = this.elements['email'];
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      // Simple validation.
      if (!name || !email) {
        alert('Please fill in both your name and email.');
        return;
      }

      // More robust email format validation using a regular expression.
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus(); // Set focus back to the email field for correction.
        return;
      }

      // Success feedback. In a real application, you would send this data to a server.
      alert(`Thank you, ${name}! Your free trial has been registered with the email: ${email}. We'll be in touch!`);
      
      // Reset the form for a new submission.
      this.reset();
    });
  }
};

// Start the application.
IronCoreApp.init();