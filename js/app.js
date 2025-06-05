// app.js

const mealForm = document.getElementById('mealForm');
const mealList = document.getElementById('mealList');
const mealName = document.getElementById('mealName');
const mealPrice = document.getElementById('mealPrice');
const mealImage = document.getElementById('mealImage');

let meals = [];

window.addEventListener('DOMContentLoaded', () => {
  loadMealsFromStorage();
});

mealForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addMeal();
});

function addMeal() {
  const name = mealName.value.trim();
  const price = mealPrice.value.trim();
  const image = mealImage.value.trim();

  if (!name || !price || !image) {
    alert('Please fill all the fields!');
    return;
  }

  const newMeal = { name, price: parseFloat(price).toFixed(2), image };
  meals.push(newMeal);
  saveMealsToStorage();
  renderMeals();
  mealForm.reset();
}

function renderMeals() {
  mealList.innerHTML = '';
  meals.forEach(meal => {
    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';

    mealCard.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" />
      <h3>${meal.name}</h3>
      <p>$${meal.price}</p>
    `;

    mealList.appendChild(mealCard);
  });
}

function saveMealsToStorage() {
  localStorage.setItem('crazyMealOrders', JSON.stringify(meals));
}

function loadMealsFromStorage() {
  const stored = localStorage.getItem('crazyMealOrders');
  if (stored) {
    meals = JSON.parse(stored);
    renderMeals();
  }
}
