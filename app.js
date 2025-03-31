const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "fiction",
    price: 9.99,
    language: "English",
    format: "paperback",
    rating: 4.5,
    description: "A classic novel about the American Dream."
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "non-fiction",
    price: 14.99,
    language: "English",
    format: "hardcover",
    rating: 4.7,
    description: "A fascinating exploration of human history."
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "fantasy",
    price: 7.99,
    language: "English",
    format: "paperback",
    rating: 4.8,
    description: "The first book in the magical Harry Potter series."
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "mystery",
    price: 11.99,
    language: "English",
    format: "ebook",
    rating: 4.6,
    description: "A thrilling psychological mystery."
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "fiction",
    price: 10.99,
    language: "English",
    format: "hardcover",
    rating: 4.9,
    description: "A profound novel on racial injustice."
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "fantasy",
    price: 12.99,
    language: "English",
    format: "paperback",
    rating: 4.8,
    description: "A classic fantasy adventure."
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "fiction",
    price: 8.99,
    language: "English",
    format: "paperback",
    rating: 4.7,
    description: "A dystopian novel exploring totalitarianism."
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "fiction",
    price: 9.49,
    language: "English",
    format: "ebook",
    rating: 4.4,
    description: "A classic coming-of-age novel."
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "non-fiction",
    price: 13.99,
    language: "English",
    format: "hardcover",
    rating: 4.8,
    description: "A memoir about the power of education."
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "mystery",
    price: 10.99,
    language: "English",
    format: "paperback",
    rating: 4.5,
    description: "A thrilling mystery novel with historical intrigue."
  }
];

function getRecommendations(preferences) {
  return books.filter(book => {
    const matchesGenre = preferences.genre === "any" || book.genre === preferences.genre;
    const matchesAuthor = !preferences.author || book.author.toLowerCase().includes(preferences.author.toLowerCase());
    const matchesPrice = preferences.priceRange === "any" || checkPriceRange(book.price, preferences.priceRange);
    const matchesLanguage = !preferences.language || book.language.toLowerCase() === preferences.language.toLowerCase();
    const matchesFormat = preferences.format === "any" || book.format === preferences.format;
    return matchesGenre && matchesAuthor && matchesPrice && matchesLanguage && matchesFormat;
  });
}

function checkPriceRange(price, range) {
  if (range === "50+") return price >= 50;
  const [min, max] = range.split('-').map(Number);
  return max ? price >= min && price <= max : price >= min;
}

function displayRecommendations(recommendations) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  if (recommendations.length === 0) {
    bookList.innerHTML = '<li>No books match your criteria.</li>';
    return;
  }

  recommendations.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${book.title}</strong> by ${book.author}<br>
      Price: £${book.price.toFixed(2)}<br>
      Format: ${book.format}<br>
      Rating: ${book.rating}<br>
      Description: ${book.description}
    `;
    bookList.appendChild(li);
  });
}

document.getElementById('preferences-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const preferences = {
    genre: document.getElementById('genre').value,
    author: document.getElementById('author').value,
    priceRange: document.getElementById('price-range').value,
    language: document.getElementById('language').value,
    format: document.getElementById('format').value
  };
  const recommendations = getRecommendations(preferences);
  displayRecommendations(recommendations);
});