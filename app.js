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
        title: 'The Third-Body Problem',
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

];

class Book {
    constructor(title, author, pages, year, read) {

    }
};

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
        <div class="author">${arr[i].author}</div>
        <div class="pages">${arr[i].pages}</div>
        <div class="year">Published in ${arr[i].year}</div>
        <div class="read">${arr[i].read}</div>`;
        libGrid.appendChild(newBook);
    }
    return arr;
}
displayBooks(library);