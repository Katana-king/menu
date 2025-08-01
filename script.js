function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function filterMenu(category) {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    const isVisible = category === 'all' || item.classList.contains(category);
    item.style.display = isVisible ? 'block' : 'none';
    if (isVisible) {
      item.classList.remove('visible');
      setTimeout(() => {
        item.classList.add('visible', 'animate-fade-in');
        setTimeout(() => item.classList.remove('animate-fade-in'), 500);
      }, 10);
    }
  });
}

function toggleTheme() {
  const body = document.body;
  const themePath = document.getElementById('themePath');
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    themePath.setAttribute('d', 'M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.636 17.364l-1.414 1.414M17.364 17.364l-1.414-1.414M6.636 6.636l-1.414-1.414');
  } else {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    themePath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const body = document.body;
  const themePath = document.getElementById('themePath');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themePath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
  } else {
    body.classList.remove('dark-mode');
    themePath.setAttribute('d', 'M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.636 17.364l-1.414 1.414M17.364 17.364l-1.414-1.414M6.636 6.636l-1.414-1.414');
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const debouncedFilter = debounce(filterMenu, 100);
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      debouncedFilter(button.dataset.filter);
      button.focus();
    });
  });

  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

  filterMenu('all');
});