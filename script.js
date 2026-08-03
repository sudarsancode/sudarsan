const loadingScreen = document.querySelector('.loading-screen');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const revealItems = document.querySelectorAll('.reveal');
const bmiForm = document.querySelector('.bmi-form');
const bmiResult = document.querySelector('.result-box');

window.addEventListener('load', () => {
  setTimeout(() => loadingScreen.classList.add('hidden'), 800);
});

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

bmiForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const height = parseFloat(document.querySelector('#height').value);
  const weight = parseFloat(document.querySelector('#weight').value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    bmiResult.innerHTML = '<strong>Enter valid height and weight.</strong>';
    return;
  }

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  let message = '';

  if (bmi < 18.5) {
    message = 'You are currently underweight.';
  } else if (bmi < 24.9) {
    message = 'You are in a healthy range.';
  } else if (bmi < 29.9) {
    message = 'You are in the overweight range.';
  } else {
    message = 'You are in the obese range.';
  }

  bmiResult.innerHTML = `<strong>BMI:</strong> ${bmi} <br>${message}`;
});
