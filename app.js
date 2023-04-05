let library = [
    {
        title: 'Dune',
        author: 'Frank Herbert',
        pages: 412,
        year: 1965,
        read: 'Yes'
    },
    {
        title: 'Foundation',
        author: 'Isaac Asimov',
        pages: 255,
        year: 1951,
        read: 'Yes'
    },
    {
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        pages: 302,
        year: 2014,
        read: 'No'
    },
    {
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        pages: 496,
        year: 2021,
        read: 'Yes'
    },
    {
        title: 'East of Eden',
        author: 'John Steinbeck',
        pages: 704,
        year: 1952,
        read: 'Yes'
    },
    {
        title: 'The Martian',
        author: 'Andy Weir',
        pages: 369,
        year: 2011,
        read: 'No'
    },
    {
        title: 'Stories of Your Life and Others',
        author: 'Ted Chiang',
        pages: 285,
        year: 2002,
        read: 'Yes'
    },
];

function Book(title, author, pages, year, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.year = year,
    this.read = read;
}

function addBookToLibrary(book) {
    return library.push(book);
};

const libGrid = document.getElementById('lib-grid');

function displayBooks(arr) {
    for (let i = 0; i < arr.length; i++) {
        let newBook = document.createElement('div');
        newBook.classList.add('book')
        newBook.innerHTML = `
        <h3 class="title">${arr[i].title}</h3>
        <div class="author">By ${arr[i].author}</div>
        <div class="pages">${arr[i].pages} pages</div>
        <div class="year">Published in ${arr[i].year}</div>
        <div class="read">Read Status: ${arr[i].read}</div>`;
        libGrid.appendChild(newBook);
    }
    return arr;
}
displayBooks(library);

// Show form on add btn click
const addBtn = document.getElementById('add-btn');
const formContainer = document.getElementById('form-container');
const mainContainer = document.getElementById('main-container');

addBtn.addEventListener('click', displayForm);

function displayForm() {
    mainContainer.classList.add('blur');
    formContainer.classList.add('active');
}

// Close form on x btn click
const xBtn = document.getElementById('x-btn');
xBtn.addEventListener('click', closeForm);

function closeForm() {
    mainContainer.classList.remove('blur');
    formContainer.classList.remove('active');
}

// Get values from form
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const year = document.getElementById('year');
const haveRead = document.getElementById('have-read');
const notRead = document.getElementById('not-read');

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', submitBook);

function submitBook(e) {
    let newBook = new Book(title.value, author.value, pages.value, year.value, haveRead.value);
    addBookToLibrary(newBook);
    displayBooks(library);
    closeForm();
    e.preventDefault();
}
