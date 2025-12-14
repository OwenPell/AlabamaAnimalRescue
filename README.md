# AlabamaAnimalRescueWebsite
A community-centered animal rescue website for showcasing adoptable dogs and cats in Alabama. This project features a clean, responsive design with interactive filtering, favorites management, and a contact form system.

# Features

* Animal of the Day: Rotating featured animal on the homepage
* Browse Animals: Separate pages for dogs and cats with detailed profiles
* Search Functionality: Search by animal name across all pages
* Filter System: Filter animals by breed and age range
* Favorites: Save favorite animals using localStorage
* Contact Form: Backend-powered form with data persistence
* Dog Facts API: Random dog facts integration on the dogs page
* Cat Facts API: Random cat facts integration on the cats page
* Responsive Design: Mobile-friendly layout that adapts to different screen sizes

# Technologies Used

* Frontend: HTML5, CSS3, Vanilla JavaScript
* Backend: Node.js with Express
* API: RapidAPI Dog Facts API & Cat Facts API
* Storage: localStorage for favorites, JSON file for form submissions

# JavaScript Implementation

## main.js
Primary client-side functionality including:

* Animal of the Day Rendering: Dynamically selects and displays a featured animal on the homepage based on the current date

* Search System:
** Handles Enter key events on search inputs
** Searches current page for matching animal cards
** Uses Fetch API and DOMParser to search across dogs.html and cats.html
** Scrolls to and highlights matching animals
** Supports navigation keyword searches (e.g., "donate", "contact", "faq")


## Filter Controls:

* Event listeners for breed and age filter dropdowns
* Dynamic show/hide of animal cards based on filter criteria
* Clear filters functionality


## Favorites Management:

* localStorage integration for persistent favorites
* Toggle favorite state with visual feedback
* Updates button text and styling (♡ ↔ ♥)


## DOM Manipulation: Dynamic content updates and event handling throughout

## dogFacts.js AND catFacts.js
API integration featuring:

* Async/Await: Fetches random dog facts from RapidAPI
* Error Handling: Fallback fact if API request fails
* DOM Updates: Displays fetched fact in the designated element

## server.js
Backend logic using Node.js/Express:

* Route Handling: Serves static files and processes form submissions
* File System Operations: Reads and writes to submissions.json
* Data Validation: Server-side validation of required form fields
* JSON Parsing: Manages submission data structure

# Credits
Sponsored by: Owen Pell • Ryan Cornelison • Trilla McKee
