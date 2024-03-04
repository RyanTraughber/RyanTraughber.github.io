// Arrays to store names and capsules
const names = [];
const capsules = [];

let comparisons = [];

// Initialize variables
let comparisonIndex = 0;
let scores = {};

function getSteamID (){
// URL of the JSON object
const url = 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json';

// Fetch the JSON data
fetch(url)
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Work with the JSON data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('There was a problem fetching the data:', error);
  });

    toggleUpload();
}

function uploadFile() {
    document.getElementById('fetchButton').addEventListener('click', function() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            console.error('No file selected.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const jsonContent = event.target.result;
            console.log('JSON data:', jsonContent); // Log JSON content to see what's being read

            try {
                const jsonData = JSON.parse(jsonContent);
                console.log('Parsed JSON data:', jsonData); // Log parsed JSON data

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
                extractFieldsAndCount(jsonData);

                // Log the arrays
                console.log("Names:", names);
                console.log("Capsules:", capsules);

                displayTwoGames();
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        reader.readAsText(file);

        

    });
}


function toggleUpload () {
    var buttonAndStuff= document.getElementById("fileUpload");
    if (buttonAndStuff.style.display === "none") {
      buttonAndStuff.style.display = "block";
      uploadFile();
    }
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