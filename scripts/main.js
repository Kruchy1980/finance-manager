// Icon using cookies from pages secure
document.cookie = "promo_shown=1; Max-Age=2600000; Secure promo_shown=1; Max-Age=2600000; Secure";

// I. Variables
// BLOCKS
const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const availableFunds = document.querySelector('.available-funds');
const addTransactionPanel = document.querySelector('.add-transaction-panel');

// INPUTS
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

// BUTTONS
const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteTransactionBtn = document.querySelector('.delete');
const colorLightBtn = document.querySelector('.light');
const colorDarkBtn = document.querySelector('.dark');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

// OTHER VARIABLES
let root = document.documentElement;
let ID;
let categoryIcon;
let selectedCategory;
let fundsArray = [0];

// II. Functions
const showAddPanel = () => {
    addTransactionPanel.style.display = 'flex';
};

// 2. Close add transaction panel
const closeAndClearPanel = () => {
    addTransactionPanel.style.display = 'none';
    clearPanelInputs();
};

// 3. Calculation and add/sve function
const createNewTransaction = () => {
    ID = Math.round(Math.random() * (new Date().getTime() * 24));
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);
    checkCategory(selectedCategory);
    newTransaction.innerHTML =
        `
        <p class="transaction-name">
            ${categoryIcon} ${nameInput.value}
        </p>
        <p class="transaction-amount">${amountInput.value} PLN
            <button class="delete" onclick="deleteTransaction(${ID})">
                <i class="fas fa-times">
                </i>
            </button>
        </p>
    `;
    category.value === 'income' ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesSection.appendChild(newTransaction) && newTransaction.classList.add('expenses');

    if (category.value === 'income') {
        fundsArray.push(Number(`${amountInput.value}`));
    } else {
        fundsArray.push(Number(`${-amountInput.value}`));
    };
    calculateBudget();
    closeAndClearPanel();
};

const deleteAllTransactions = () => {
    incomeSection.innerHTML = '<h3 class="income">Income:</h3>';
    expensesSection.innerHTML = '<h3 class="expenses">Expenses:</h3>';
    availableFunds.textContent = `0.00 PLN`;
    availableFunds = [0];
};
const lightMode = () => {
    root.style.setProperty('--main-color', '#fff');
    root.style.setProperty('--secondary-color', '#222');
    root.style.setProperty('--border-color', '#00000033');
    colorLightBtn.style.transform = 'scale(0.7)';
    colorDarkBtn.style.transform = 'scale(1)';
};
const darkMode = () => {
    root.style.setProperty('--main-color', '#222');
    root.style.setProperty('--secondary-color', '#fff');
    root.style.setProperty('--border-color', '#ffffff64');
    colorLightBtn.style.transform = 'scale(1)';
    colorDarkBtn.style.transform = 'scale(0.7)';
};



// III. Help functions
const checkForm = () => {
    if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
        createNewTransaction();
    } else {
        alert('You need to fill up all the information in the form!');
    };
    closeAndClearPanel();
};

const clearPanelInputs = () => {
    nameInput.value = '';
    amountInput.value = '';
    categorySelect.selectedIndex = 0;
};

const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(`${id}`);
    const deletedAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    const absoluteFundsArray = fundsArray.map(el => Math.abs(el));
    const indexOfTransaction = absoluteFundsArray.indexOf(deletedAmount);

    fundsArray.splice(indexOfTransaction, 1);
    calculateBudget();

    transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expensesSection.removeChild(transactionToDelete);
};

const checkCategory = transaction => {
    switch (transaction) {
        case '[ + ] Income':
            categoryIcon = `<i class="fas fa-money-bill-wave"></i>
            `;
            break;
        case '[ - ] Shopping':
            categoryIcon = `<i class="fas fa-cart-arrow-down"></i>
            `;
            break;
        case '[ - ] Food':
            categoryIcon = `                              <i class="fas fa-hamburger"></i>
            `;
            break;
        case '[ - ] Cinema':
            categoryIcon = `
            <i class="fas fa-film"></i>
            `;
            break;
        case '[ - ] Other expenses':
            categoryIcon = `
            <i class="far fa-credit-card"></i>
            `;
            break;
    };
};

const selectCategory = () => {
    selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const calculateBudget = () => {
    let result = fundsArray.reduce((p, n) => p + n);
    if (result > 0) {
        availableFunds.style.color = '#13c864';
    } else {
        availableFunds.style.color = '#c81313';
    }
    availableFunds.textContent = `${result.toFixed(2)} PLN`;
};




// IV. Event Listeners
addTransactionBtn.addEventListener('click', showAddPanel);
cancelBtn.addEventListener('click', closeAndClearPanel);
saveBtn.addEventListener('click', checkForm);
categorySelect.addEventListener('change', selectCategory);
deleteAllBtn.addEventListener('click', deleteAllTransactions);

colorLightBtn.addEventListener('click', lightMode);
colorDarkBtn.addEventListener('click', darkMode);