function getSteamID (){
    const textWriting = document.getElementById("testText");
    const IDPls = document.getElementById("SteamID").value;

    textWriting.innerText = "https://store.steampowered.com/wishlist/id/" + IDPls + "/wishlistdata/";


    fetch(textWriting.innerText)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonData => {
    // Iterate through each object in the JSON array
    const modifiedData = jsonData.map(item => {
      // Extract the first two properties of each object
      const { name, capsule } = item;
      // Return a new object with only the first two properties
      return { name, capsule };
    });
    console.log(modifiedData);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

}