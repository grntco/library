let library = [];

class Book {
    constructor(_title, _author, _pages, _year, _read) {
        this.title = _title,
        this.author = _author,
        this.pages = _pages,
        this.year = _year,
        this.read = _read;
    }

    changeReadStatus() {
        return this.read === 'Read' ? this.read = 'Not Read' : this.read = 'Read';
    };

    addToLibrary() {
        return library.push(this)
    }
}

const libGrid = document.getElementById('lib-grid');

// Display Books

function displayBooks(arr) {
    let booksDisplayedCount = libGrid.childElementCount;
    if (arr.length !== booksDisplayedCount) {
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
        console.error("Failed to display books.")
    }
}

// Display Form
const addBtn = document.getElementById('add-btn');
const formContainer = document.getElementById('form-container');
const form = document.querySelector('form');
const mainContainer = document.getElementById('main-container');

function displayForm() {
    mainContainer.classList.add('blur');
    formContainer.classList.add('active');
}

addBtn.addEventListener('click', displayForm);

// Close Form
const xBtn = document.getElementById('x-btn');

function closeForm() {
    mainContainer.classList.remove('blur');
    formContainer.classList.remove('active');
}

xBtn.addEventListener('click', closeForm);

document.addEventListener('click', function(e) {
    if ((formContainer.classList.contains('active')) && (e.target === formContainer)) {
        closeForm();
    }
})

// Get values from form
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const year = document.getElementById('year');
const read = document.querySelectorAll('input[name="read"]');
const submitBtn = document.getElementById('submit-btn');
const errorMsgs = [ ...document.querySelectorAll('.error-msg')];

function resetForm() {
    form.reset()
    errorMsgs.map(msg => msg.textContent = '');
}

function checkDuplicate(book) {
    if (!library.some(item => item.title.toUpperCase() === book.title.toUpperCase())) {
        return false;
    } else {
        alert("This book already exists in your library.")
        return true;
    }
}

function submitBook(e) {
    let values = [title.value, author.value, pages.value, year.value]
    e.preventDefault();
    if (!form.checkValidity()) {
        displayError();
    } else {
        if (read[0].checked) {
            values.push(read[0].value);
        } else {
            values.push(read[1].value);
        }
        let newBook = new Book(values[0], values[1], values[2], values[3], values[4]);
        if (!checkDuplicate(newBook)) {
            newBook.addToLibrary();
            closeForm();
            displayBooks(library);
            resetForm();
            // form.reset();
        }
    }
}
submitBtn.addEventListener('click', submitBook);

// Delete Book
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

function toggleRead(e) {
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

document.addEventListener('click', toggleRead);

// FORM VALIDATION 

// function checkValues(arr) {
//     let titleError = document.getElementById('title-error');
//     let authorError = document.getElementById('author-error');
//     let pagesError = document.getElementById('pages-error');
//     let yearError = document.getElementById('year-error');

//     let errorMsgs = document.querySelectorAll('.error-msg');

//     if (arr.some((value) => value === '')) {
//         if (title.value === '') {
//             titleError.classList.add('active');
//             title.classList.add('error');
//             return false;
//         } else {
//             titleError.classList.remove('active');
//             title.classList.remove('error');
//         }
//         if (author.value === '') {
//             authorError.classList.add('active');
//             author.classList.add('error');
//             return false;
//         } else {
//             authorError.classList.remove('active');
//             author.classList.remove('error');
//         }
//         if (pages.value === '') {
//             pagesError.classList.add('active');
//             pages.classList.add('error');
//             return false;
//         } else {
//             pagesError.classList.remove('active');
//             pages.classList.remove('error');
//         }
//         if (year.value === '') {
//             yearError.classList.add('active');
//             year.classList.add('error');
//             return false;
//         } else {
//             yearError.classList.remove('active');
//             year.classList.remove('error');
//         }
//     } else {
//         errorMsgs.forEach(msg => {
//             msg.classList.remove('active');
//         })
//         document.querySelectorAll('input[type=text], input[type=number]').forEach(input => {
//             input.classList.remove('error');
//         })
//         return true;
//     }
// }

function displayError() {
    let titleError = document.getElementById('title-error');
    let authorError = document.getElementById('author-error');
    let pagesError = document.getElementById('pages-error');
    let yearError = document.getElementById('year-error');

    if (title.validity.valueMissing) {
        titleError.textContent = 'Please provide a title.';
    } else {
        titleError.textContent = '';
    }

    if (author.validity.valueMissing) {
        authorError.textContent = 'Please provide an author.';
    } else {
        authorError.textContent = '';
    }

    if (pages.validity.valueMissing) {
        pagesError.textContent = 'Please provide the number of pages.';
    } else {
        pagesError.textContent = '';
    }

    if (year.validity.valueMissing) {
        yearError.textContent = 'Please provide a publication year.';
    } else {
        yearError.textContent = '';
    }
}


// MOBILE RESPONSIVE

function detectScreenSize() {
    if (screen.width <= 767) {
        addBtn.innerHTML = `<img src="icons/plus.svg">`;
    }
}
detectScreenSize();

// DARK/LIGHT THEME SWITCHER

function toggleTheme() {
    let icons = document.querySelectorAll('.icon');
    if (!document.body.classList.contains('dark-mode')) {
        document.body.classList.add('dark-mode');
        icons.forEach(icon => {
            icon.classList.add('dark-mode');
        });
    } else {
        document.body.classList.remove('dark-mode');
        icons.forEach(icon => {
            icon.classList.remove('dark-mode');
        });    
    }
}

const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', toggleTheme);