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
    if (arr.length !== numBooksDisplayed) {
        libGrid.innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
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
                <button class="read-btn">${arr[i].read}</button>
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

function checkBookExists(book) {
    if (!library.some(item => item.title.toUpperCase() === book.title.toUpperCase())) {
        return true;
    } else {
        alert("This book already exists in your library.")
    }
}

function submitBook(e) {
    let values = [title.value, author.value, pages.value, year.value]
    e.preventDefault();
    if (checkValues(values)) {
        if (read[0].checked) {
            values.push(read[0].value);
        } else {
            values.push(read[1].value);
        }
        let newBook = new Book(values[0], values[1], values[2], values[3], values[4]);
        if (checkBookExists(newBook)) {
            addBookToLibrary(newBook);
            closeForm();
            displayBooks(library);
            clearInputs();
        }
    }
}

function updatePositions(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].position = i;
    }
};

// Remove book function

function deleteBook(e) {
    if (e.target.classList.contains('del-btn')) {
        let book = e.target.parentElement.parentElement;
        let allBooksInGrid = libGrid.querySelectorAll('.book');
        let index = [...allBooksInGrid].indexOf(book);
        library.splice(index, 1);
        displayBooks(library);
    }
};

document.addEventListener('click', deleteBook);
document.addEventListener('click', readToggle);

// let delBtns = document.getElementsByClassName('del-btn');

// Array.from(delBtns).forEach(btn => {
//     btn.addEventListener('click', deleteBook);
// });



// Change read status

Book.prototype.changeReadStatus = function() {
    this.read === 'Read' ? this.read = 'Not Read' : this.read = 'Read';
};

function readToggle(e) {
    if (e.target.classList.contains('read-btn')) {
        let book = e.target.parentElement.parentElement;
        let allBooksInGrid = libGrid.querySelectorAll('.book');
        let index = [...allBooksInGrid].indexOf(book);
        library[index].changeReadStatus();
        if (e.target.textContent === 'Read') {
            e.target.textContent = 'Not Read';
        } else {
            e.target.textContent = 'Read';
        }
    }
}

// FORM VALIDATION 

function checkValues(arr) {
    let titleError = document.getElementById('title-error');
    let authorError = document.getElementById('author-error');
    let pagesError = document.getElementById('pages-error');
    let yearError = document.getElementById('year-error');

    let errorMsgs = document.querySelectorAll('.error-msg');

    if (arr.some((value) => value === '')) {
        if (title.value === '') {
            titleError.classList.add('active');
            return false;
        } else {
            titleError.classList.remove('active');
        }
        if (author.value === '') {
            authorError.classList.add('active');
            return false;
        } else {
            authorError.classList.remove('active');
        }
        if (pages.value === '') {
            pagesError.classList.add('active');
            return false;
        } else {
            pagesError.classList.remove('active');
        }
        if (year.value === '') {
            yearError.classList.add('active');
            return false;
        } else {
            yearError.classList.remove('active');
        }
    } else {
        errorMsgs.forEach(msg => {
            msg.classList.remove('active');
        })
        return true;
    }
}


// MOBILE RESPONSIVE

function detectScreenSize() {
    if (screen.width <= 767) {
        addBtn.innerHTML = `<img src="icons/plus.svg">`;
    }
}
detectScreenSize();