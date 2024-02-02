// Function to submit the form data using a POST request
function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const recipeName = document.getElementById('recipe_name').value;
  const ingredients = document.getElementById('ingredients').value;
  const method = document.getElementById('method').value; // Fixed typo in method
  const region = document.getElementById('region').value;

  const formData = {
      name: name,
      email: email,
      recipe_name: recipeName,
      ingredients: ingredients,
      methode: method, // Fixed typo in methode
      region: region
  };

  fetch('http://webServer-LB-289644287.us-east-1.elb.amazonaws.com:8080/recipe', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
      // Handle success
      console.log('Success:', data);
      document.getElementById('contest-form').reset(); // Reset the form
      alert('Recipe submitted successfully!');
  })
  .catch((error) => {
      // Handle error
      console.error('Error:', error);
      alert('Error submitting recipe. Please try again.');
  });
}

  // Function to get recipes using a GET request
function getRecipes() {
  fetch('http://webServer-LB-289644287.us-east-1.elb.amazonaws.com:8080/recipe')
  .then(response => response.json())
  .then(data => {
      // Handle success
      console.log('Recipes:', data);
      // Update the UI to display the recipes
      // You can customize this part based on your UI requirements
      
      // Assuming you have a div with id 'contest-items' in your HTML file
const contestItems = document.getElementById('contest-items');

// Iterate over each recipe and create a card-like display
data.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeTitle = document.createElement('h4');
    recipeTitle.textContent = recipe.recipe_name;

    const recipeDetails = document.createElement('p');
    recipeDetails.textContent = `${recipe.region} - ${recipe.method}`;

    recipeCard.appendChild(recipeTitle);
    recipeCard.appendChild(recipeDetails);

    contestItems.appendChild(recipeCard);
});

     
  })
  .catch((error) => {
      // Handle error
      console.error('Error:', error);
      alert('Error fetching recipes. Please try again.');
  });
}

// Initial call to get recipes when the page loads
getRecipes();
