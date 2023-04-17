let library = [
    // {
    //     title: 'Dune',
    //     author: 'Frank Herbert',
    //     pages: 412,
    //     year: 1965,
    //     read: 'Yes'
    // },
    // {
    //     title: 'Foundation',
    //     author: 'Isaac Asimov',
    //     pages: 255,
    //     year: 1951,
    //     read: 'Yes'
    // },
    // {
    //     title: 'The Three-Body Problem',
    //     author: 'Liu Cixin',
    //     pages: 302,
    //     year: 2014,
    //     read: 'No'
    // },
    // {
    //     title: 'Project Hail Mary',
    //     author: 'Andy Weir',
    //     pages: 496,
    //     year: 2021,
    //     read: 'Yes'
    // },
    // {
    //     title: 'East of Eden',
    //     author: 'John Steinbeck',
    //     pages: 704,
    //     year: 1952,
    //     read: 'Yes'
    // },
    // {
    //     title: 'The Martian',
    //     author: 'Andy Weir',
    //     pages: 369,
    //     year: 2011,
    //     read: 'No'
    // },
    // {
    //     title: 'Stories of Your Life and Others',
    //     author: 'Ted Chiang',
    //     pages: 285,
    //     year: 2002,
    //     read: 'Yes'
    // },
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
    let numBooksDisplayed = libGrid.childElementCount;
    if (arr.length >= numBooksDisplayed + 1) { //Basically, if I just added one or more new books to the library array
        let diff = arr.length - numBooksDisplayed; // get the difference
        for (let i = arr.length - diff; i < arr.length; i++) {
            let newBook = document.createElement('div');
            newBook.classList.add('book')
            newBook.innerHTML = `
            <div class="book-info">
                <h3 class="title">${arr[i].title}</h3>
                <div class="author">By ${arr[i].author}</div>
                <div class="pages">${arr[i].pages} pages</div>
                <div class="year">Published in ${arr[i].year}</div>
            </div>
            <div class="btn-container">
                <button class="read">${arr[i].read}</button>
                <button class="del-btn">Delete</button>
            </div>`;
            libGrid.appendChild(newBook);
        }
    } else {
        console.log("Something is wrong.")
    }
    return arr;
}

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
const read = document.querySelectorAll('input[name="read"]');

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', submitBook);

function clearInputs() {
    title.value = '';
    author.value = '';
    pages.value = '';
    year.value = '';
    read[0].checked = false;
    read[1].checked = false;
}

function checkBook(book) {
    if (!library.some(item => item.title.toUpperCase() === book.title.toUpperCase())) {
        return true;
    } else {
        alert("This book already exists in your library.")
    }
}

function submitBook(e) {
    let values = [title.value, author.value, pages.value, year.value]
    if (read[0].checked) {
        values.push(read[0].value);
    } else {
        values.push(read[1].value);
    }
    let newBook = new Book(values[0], values[1], values[2], values[3], values[4]);
    if (checkBook(newBook)) {
        newBook.position = library.length;
        addBookToLibrary(newBook);
        closeForm();
        displayBooks(library);
        clearInputs();
        e.preventDefault();
    }
}

const bookCards = document.querySelectorAll('.book');

// bookCards.forEach(card => {
//     card.addEventListener('click', function() {
//         let delBtn = card.getElementById('del-btn');
//         delBtn.classList.add('active');
//     });
// });