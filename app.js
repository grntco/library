const libGrid = document.getElementById('lib-grid');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const year = document.getElementById('year');
const read = document.querySelectorAll('input[name="read"]');
const submitBtn = document.getElementById('submit-btn');
const errorMsgs = [ ...document.querySelectorAll('.error-msg')];
const requiredInputs = [ ...document.querySelectorAll('input[required]')];
const themeBtn = document.getElementById('theme-btn');
const addBtn = document.getElementById('add-btn');
const xBtn = document.getElementById('x-btn');
const formContainer = document.getElementById('form-container');
const form = document.querySelector('form');
const mainContainer = document.getElementById('main-container');

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

function displayForm() {
    mainContainer.classList.add('blur');
    formContainer.classList.add('active');
}

// Close Form

function closeForm() {
    mainContainer.classList.remove('blur');
    formContainer.classList.remove('active');
    resetForm();
}

function displayError(input) {
    let requiredContent = '';
    let errorMsg = input.nextElementSibling;
    
    if (input.validity.valueMissing) {
        if (input === title) {
            requiredContent = 'a title';
        } else if (input === author) {
            requiredContent = 'an author';
        } else if (input === pages) {
            requiredContent = 'the number of pages';
        } else if (input === year) {
            requiredContent = 'the publication year';
        }
        errorMsg.textContent = `Please provide ${requiredContent}`;
        input.classList.add('invalid');
    } else {
        errorMsg.textContent = '';
        input.classList.remove('invalid');
    }
};

function resetForm() {
    form.reset()
    requiredInputs.forEach(input => input.classList.remove('invalid'));
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
        requiredInputs.forEach(input => {
            displayError(input);
        });
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
        }
    }
}

function deleteBook(e) {
    if (e.target.classList.contains('del-btn')) {
        let book = e.target.parentElement.parentElement;
        let allBooksInGrid = libGrid.querySelectorAll('.book');
        let index = [...allBooksInGrid].indexOf(book);
        library.splice(index, 1);
        displayBooks(library);
    }
};

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

// Change to just icon on add-btn on mobile
function detectScreenSize() {
    if (screen.width <= 767) {
        addBtn.innerHTML = `<img src="icons/plus.svg">`;
    }
}
detectScreenSize();

// FORM VALIDATION 

// EVENTS

xBtn.addEventListener('click', closeForm);

document.addEventListener('click', function(e) {
    if ((formContainer.classList.contains('active')) && (e.target === formContainer)) {
        closeForm();
    }
})

requiredInputs.forEach(input => {
    input.addEventListener('input', () => {
        displayError(input);
    });
});

submitBtn.addEventListener('click', submitBook);
document.addEventListener('click', deleteBook);
document.addEventListener('click', toggleRead);
themeBtn.addEventListener('click', toggleTheme);
addBtn.addEventListener('click', displayForm);

