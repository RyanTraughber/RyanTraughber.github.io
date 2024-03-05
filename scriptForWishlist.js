// Arrays to store names and capsules
const names = [];
const capsules = [];

let comparisons = [];

// Initialize variables
let comparisonIndex = 0;
let scores = {};

// Allows you to press enter instead of having to click Submit
var input = document.getElementById("SteamID");

    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("SteamButton").click();
      }
    });

function getSteamID (){

// Get steam id from user
const IDPls = document.getElementById("SteamID").value;
let link = "";

if(IDPls.length === 17) {
    link += "https://store.steampowered.com/wishlist/profiles/" + IDPls + "/wishlistdata/";
} else {
    link += "https://store.steampowered.com/wishlist/id/" + IDPls + "/wishlistdata/";
}


fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    const parsedData = JSON.parse(data.contents);
    // Now you can work with the parsed data
    try {
        console.log('Parsed JSON data:', parsedData); // Log parsed JSON data

        // Function to recursively extract "name" and "capsule" fields and count properties
        function extractFieldsAndCount(obj) {
            // If the input is an object
            if (typeof obj === 'object' && obj !== null) {
                // Check if it has "name" and "capsule" fields
                if ('name' in obj && 'capsule' in obj) {
                    console.log("Name:", obj.name);
                    console.log("Capsule:", obj.capsule);
                    console.log();
                    // Push name and capsule into their respective arrays
                    names.push(obj.name);
                    capsules.push(obj.capsule);
                }
                // Recursively call extractFields for nested properties
                for (let key in obj) {
                    extractFieldsAndCount(obj[key]);
                }
            }
        }

        // Call extractFields to start extracting "name" and "capsule" fields
        extractFieldsAndCount(parsedData);

        // Log the arrays
        console.log("Names:", names);
        console.log("Capsules:", capsules);

        displayTwoGames();
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
    console.log(parsedData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

}

function displayTwoGames() {
    
    // Generate all pairwise comparisons
    for (let i = 0; i < names.length; i++) {
        for (let j = i + 1; j < names.length; j++) {
            comparisons.push([names[i], names[j]]);
    }
}

// Shuffle comparisons randomly
shuffleArray(comparisons);


// Function to shuffle array elements randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display the first comparison
displayComparison();

}

// Function to record user preference and move to the next comparison
function choosePreference(prefIndex) {
    const comparison = comparisons[comparisonIndex];
    const preferredGame = comparison[prefIndex];
    const otherGame = comparison[1 - prefIndex];
    
    scores[preferredGame] = (scores[preferredGame] || 0) + 1;
    scores[otherGame] = scores[otherGame] || 0;
    
    comparisonIndex++;
    if (comparisonIndex < comparisons.length) {
        displayComparison();
        displayRankings();
    } else {
        finalResults();
        displayRankings();
    }
}

// Function to display the final rankings
function displayRankings() {
    const displayGames = document.getElementById('displayGames');

    // Sort games based on their scores
    const sortedGames = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    
    displayGames.innerHTML += `
    <div id="gameList" class="column right" style="text-align: center;">
        <h3>Rankings:</h3>
        <ol>
            ${sortedGames.map(game => `<li>${game}</li>`).join("")}
        </ol>
    </div>
    `;
}

// Function to display the comparison
function displayComparison() {
    const displayGames = document.getElementById('displayGames');
    const comparison = comparisons[comparisonIndex];
    const firstGameIndex = names.indexOf(comparison[0]);
    const secondGameIndex = names.indexOf(comparison[1]);

    displayGames.innerHTML = `
        <div id="firstGame" class="column left" style="text-align: center;">
            <h3>${comparison[0]}</h3>
            <img src="${capsules[firstGameIndex]}" alt="${comparison[0]}">
            <button onclick="choosePreference(0)">Select ${comparison[0]}</button>
        </div>
        <div id="secondGame" class="column middle" style="text-align: center;">
            <h3>${comparison[1]}</h3>
            <img src="${capsules[secondGameIndex]}" alt="${comparison[1]}">
            <button onclick="choosePreference(1)">Select ${comparison[1]}</button>
        </div>
    `;
}

function finalResults(){
    const displayGames = document.getElementById('displayGames');
    displayGames.innerHTML = `
        <div id="firstGame" class="column left" style="text-align: center;">
            <h3>You did it</h3>
            <img src="pepeDance.gif" alt="pepeDance">
        </div>
    `;

}