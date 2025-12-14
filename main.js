// Animal of the Day
const animals = [
{
    id: 'buddy',
    name: 'Buddy',
    image: 'images/dog1.jpg',
    meta: '3 years • Labrador Mix',
    desc: 'Friendly and energetic, Buddy loves fetch and long walks. Great with older kids and other dogs.'
},
{
    id: 'willow',
    name: 'Willow',
    image: 'images/cat1.jpg',
    meta: '2 years • Domestic Shorthair',
    desc: 'Curious and affectionate, Willow loves window watching and gentle chin scratches.'
}
];

function renderAnimalOfDay() {
const container = document.querySelector('.animal-of-day');
if (!container) return;

const dayIndex = Math.floor(Date.now() / 86400000) % animals.length;
const animal = animals[dayIndex];

const img = container.querySelector('img');
const title = container.querySelector('h3');
const meta = container.querySelector('.animal-meta');
const desc = container.querySelectorAll('p')[1]; // second paragraph in the right column

if (img) {
    img.src = animal.image;
    img.alt = `Animal of the Day: ${animal.name}`;
}
if (title) title.textContent = animal.name;
if (meta) meta.textContent = animal.meta;
if (desc) desc.textContent = animal.desc;
}

// Search function
const navMap = {
    dogs: 'dogs.html',
    dog: 'dogs.html',
    cats: 'cats.html',
    cat: 'cats.html',
    contact: 'contact.html',
    faq: 'faq.html',
    donate: 'index.html#donate',
    home: 'index.html',
    adopt: 'dogs.html'
};

function wireSearch() {
    const inputs = document.querySelectorAll('#site-search');
    inputs.forEach((input) => {
      input.addEventListener('keydown', async function (e) {
        if (e.key === 'Enter') {
          const q = input.value.trim().toLowerCase();
          if (!q) return;
          
          //Checks if current page has animal cards
          const animalCard = document.querySelector(`.animal-card[data-id="${q}"]`);
          if (animalCard){
            animalCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            animalCard.style.outline = '3px solid #007bff';
            setTimeout(() => {animalCard.style.outline = ''}, 2000);
            return;
          }

          //Search cats.html and dogs.html
          const foundIn = await searchForAnimal(q);
          if(foundIn){
            window.location.href = `${foundIn}#${q}`;
            return;
          }

          for (const key in navMap) {
            if (q.includes(key)) {
              window.location.href = navMap[key];
              return;
            }
          }
          // fallback: try exact matches for page titles
          if (q === 'adopt' || q === 'adoptions') window.location.href = 'dogs.html';
        }
      });
    });
}

//async function to create an array of the dog and cat html page
async function searchForAnimal(name) {
  const pages = ['dogs.html', 'cats.html'];
  
  //iterates through the array of html pages
  for (const page of pages) {
    try {
      //retrieves html file
      const response = await fetch(page);
      //converts response into text
      const html = await response.text();
      //parses the html text into a document
      const parser = new DOMParser();
      // creates a document from the html string
      const doc = parser.parseFromString(html, 'text/html');
      // searches for the animal card with the matching name
      const card = doc.querySelector(`.animal-card[data-id="${name}"]`);
      //if found, returns the page name
      if (card) {
        return page;
      }
    } catch (error) {
      console.error(`Error searching ${page}:`, error);
    }
  }
  
  return null;
}

// Filtering system
  function setupFilters() {
    const grid = document.querySelector('.animal-grid');
    if (!grid) return;

    // get filter elements
    const breedSelect = document.getElementById('breed-filter');
    const ageSelect = document.getElementById('age-filter');
    const clearBtn = document.getElementById('clear-filters');

    // filter function that shows/hides cards
    function applyFilters() {
      const breed = breedSelect ? breedSelect.value : 'all';
      const ageRange = ageSelect ? ageSelect.value : 'all';
      const cards = Array.from(grid.querySelectorAll('.animal-card'));

      cards.forEach((card) => {
        const cardBreed = (card.getAttribute('data-breed') || '').trim();
        const cardAge = parseFloat(card.getAttribute('data-age')) || 0;

        let breedOk = true;
        if (breed && breed !== 'all') {
          breedOk = cardBreed === breed;
        }

        let ageOk = true;
        if (ageRange && ageRange !== 'all') {
          if (ageRange === '0-1') ageOk = cardAge <= 1;
          else if (ageRange === '1-3') ageOk = cardAge > 1 && cardAge <= 3;
          else if (ageRange === '3-6') ageOk = cardAge > 3 && cardAge <= 6;
          else if (ageRange === '6+') ageOk = cardAge > 6;
        }

        card.style.display = breedOk && ageOk ? '' : 'none';
      });
    }

    if (breedSelect) breedSelect.addEventListener('change', applyFilters);
    if (ageSelect) ageSelect.addEventListener('change', applyFilters);
    if (clearBtn) clearBtn.addEventListener('click', function () {
      if (breedSelect) breedSelect.value = 'all';
      if (ageSelect) ageSelect.value = 'all';
      applyFilters();
    });
  }

// Favorites system
const FAV_KEY = 'aaar-favorites';

function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

function saveFavorites(list) {
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

function setupFavorites() {
const grid = document.querySelector('.animal-grid');
if (!grid) return;

const favs = new Set(getFavorites());

function updateButtonState(btn, isFav) {
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(isFav));
    if (isFav) btn.classList.add('favorited');
    else btn.classList.remove('favorited');
    btn.textContent = isFav ? '♥ Favorited' : '♡ Favorite';
}

// initialize existing buttons
grid.querySelectorAll('.favorite-btn').forEach((btn) => {
    const id = btn.getAttribute('data-id');
    const isFav = favs.has(id);
    updateButtonState(btn, isFav);

    btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id');
        if (favs.has(id)) {
          favs.delete(id);
          updateButtonState(btn, false);
        } else {
          favs.add(id);
          updateButtonState(btn, true);
        }
        saveFavorites(Array.from(favs));
    });
});
}

/*-----------------------Dynamic Animal Search-----------------------*/
function searchByName(){
  const searchInput = document.getElementById('site-search').value.toLowerCase();
  const dogCards = document.querySelectorAll('.animal-card');

  //Iterates through each dog card and checks if the data-id includes the search input
  dogCards.forEach((card)=>{
    const dogName = card.getAttribute('data-id');
    if (dogName.includes(searchInput)){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

}

  /* -------------------- Boot -------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderAnimalOfDay();
    wireSearch();
    setupFilters();
    setupFavorites();
    searchByName();
  });
