/*----------------------------------- Dog Fact API ------------------------------------- */
const url = 'https://random-dog-facts.p.rapidapi.com/api/dogs';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '86c8ba1a5cmsh09797d1b1284abbp1a6092jsn02d24ad9fc53',
		'x-rapidapi-host': 'random-dog-facts.p.rapidapi.com'
	}
};

// Fetches and displays a random dog fact and handles errors
async function getDogFact() {
  try {
      const response = await fetch(url, options);
      const data = await response.json();
      document.getElementById('dog-fact').textContent = data.fact;
  } catch (error) {
      console.error(error);
      document.getElementById('dog-fact').textContent = "Dogs dream just like humans!"
  } 
}

getDogFact();
