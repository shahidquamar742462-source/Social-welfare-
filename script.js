// --- REVENUE (DONATION) LOGIC ---
const revForm = document.getElementById('revenueForm');
const revList = document.getElementById('revenueList');
const totalRevEl = document.getElementById('totalRevenue');
let revenues = JSON.parse(localStorage.getItem('pwta_revenues')) || [];

function renderRevenues() {
  revList.innerHTML = '';
  let total = 0;
  revenues.forEach((item, index) => {
    total += Number(item.amount);
    revList.innerHTML += `
      <li>
        <div><b>${item.name}</b><br><small>${item.date}</small></div>
        <div>
          <span>₹${item.amount}</span>
          <button class="delete-btn" onclick="deleteRevenue(${index})">🗑️</button>
        </div>
      </li>
    `;
  });
  totalRevEl.innerText = total;
  localStorage.setItem('pwta_revenues', JSON.stringify(revenues));
}

revForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newRev = {
    name: document.getElementById('revName').value,
    date: document.getElementById('revDate').value,
    amount: document.getElementById('revAmount').value
  };
  revenues.push(newRev);
  renderRevenues();
  revForm.reset();
});

function deleteRevenue(index) {
  if(confirm('Delete this revenue entry?')) {
    revenues.splice(index, 1);
    renderRevenues();
  }
}

// --- EXPENDITURE LOGIC ---
const expForm = document.getElementById('expenditureForm');
const expList = document.getElementById('expenditureList');
const totalExpEl = document.getElementById('totalExpenditure');
let expenditures = JSON.parse(localStorage.getItem('pwta_expenditures')) || [];

function renderExpenditures() {
  expList.innerHTML = '';
  let total = 0;
  expenditures.forEach((item, index) => {
    total += Number(item.amount);
    expList.innerHTML += `
      <li>
        <div><b>${item.name}</b><br><small>${item.date}</small></div>
        <div>
          <span>₹${item.amount}</span>
          <button class="delete-btn" onclick="deleteExpenditure(${index})">🗑️</button>
        </div>
      </li>
    `;
  });
  totalExpEl.innerText = total;
  localStorage.setItem('pwta_expenditures', JSON.stringify(expenditures));
}

expForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newExp = {
    name: document.getElementById('expName').value,
    date: document.getElementById('expDate').value,
    amount: document.getElementById('expAmount').value
  };
  expenditures.push(newExp);
  renderExpenditures();
  expForm.reset();
});

function deleteExpenditure(index) {
  if(confirm('Delete this expenditure entry?')) {
    expenditures.splice(index, 1);
    renderExpenditures();
  }
}

// Initialize on load
renderRevenues();
renderExpenditures();

// Register Service Worker for PWA (App installation)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
