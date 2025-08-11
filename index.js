// let balance = localStorage.getItem('balance') != null ? localStorage.getItem('balance') : 0;
let balance = +localStorage.getItem('userBalance') || 0;
let trasnactions = JSON.parse(localStorage.getItem('userTransactions')) || [];

let spanBalance = document.querySelector('#balanceSpan');
let table = document.querySelector('table tbody');
let amountInput = document.querySelector('#amountInput');

// Actions
let showBalance = () => {
  spanBalance.innerText = balance;
};
showBalance();

let showTransactions = () => {
  table.innerHTML = '';
  trasnactions.forEach((el, index) => {
    table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${el.beforeBalance}</td>
            <td>${el.amount}</td>
            <td>
                <p class="p-2 text-center fw-bold rounded shadow ${el.type == 'deposit' ? 'bg-info text-white' : 'bg-warning text-dark'}">${el.type}</p>
            </td>
            <td>${el.afterBalance}</td>
            <td>
                ${index == trasnactions.length - 1 ? `<button onclick="removeLastTransactions(${index})" class="btn btn-danger">Remove Transaction</button>` : `----`}
            </td>
        </tr>
        `;
  });
};

let saveDataToLocalStora = () => {
  localStorage.setItem('userBalance', balance);
  localStorage.setItem('userTransactions', JSON.stringify(trasnactions));
};

let desposit = () => {
  let amount = +amountInput.value;
  if (amount > 0) {
    let newObj = {
      beforeBalance: balance,
      amount: amount,
      type: 'deposit',
      afterBalance: balance + amount,
    };
    trasnactions.push(newObj);
    balance = balance + amount;
    showBalance();
    showTransactions();
    amountInput.value = '';
    saveDataToLocalStora();
  } else {
    alert('Please Put Valid Value');
  }
};

let withdraw = () => {
  let amount = +amountInput.value;
  if (amount <= balance && amount > 0) {
    let newObj = {
      beforeBalance: balance,
      amount: amount,
      type: 'withdraw',
      afterBalance: balance - amount,
    };
    trasnactions.push(newObj);
    balance = balance - amount;
    showBalance();
    showTransactions();
    amountInput.value = '';
    saveDataToLocalStora();
  } else {
    alert('Please Put Valid Value');
  }
};

let removeLastTransactions = (index) => {
  // let beforeBalance = trasnactions[index].beforeBalance;
  let beforeBalance = trasnactions[trasnactions.length - 1].beforeBalance;
  balance = beforeBalance;
  // trasnactions.pop();
  trasnactions.splice(index, 1);
  saveDataToLocalStora();
  showBalance();
  showTransactions();
};

let showIndex = false;

let showPassword = () => {
  let passwordInput = document.querySelector('#passwordInput');
  if (showIndex) {
    passwordInput.setAttribute('type', 'password');
    showIndex = false;
  } else {
    passwordInput.setAttribute('type', 'text');
    showIndex = true;
  }
};

// DOM => document
// BOM Browser Object Model => window
// localStorage - session Storage - cookies
// control Browser
// navigator

let login = () => {
  // Check
  window.location.href = 'https://www.google.com';
};
