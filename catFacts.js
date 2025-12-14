/*------------------------------ Cat fact API -----------------------------*/
const url = 'https://cat-facts12.p.rapidapi.com/Fact';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '86c8ba1a5cmsh09797d1b1284abbp1a6092jsn02d24ad9fc53',
		'x-rapidapi-host': 'cat-facts12.p.rapidapi.com'
	}
};

// Fetches and displays a random cat fact and handles errors
async function getCatFact() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById('cat-fact').textContent = data.Fact;
    } catch (error) {
        console.error(error);
        //Default fact displayed if error is caught
        document.getElementById('cat-fact').textContent = "Cats sleep 12-16 hours a day, or roughly 70% of their life."
    }   
}

getCatFact();


