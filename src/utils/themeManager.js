function get() {
  return localStorage.getItem('theme') || 'theme-yellow';
}

function isValid(theme) {
  return theme === 'theme-blue' || theme === 'theme-green' || theme === 'theme-yellow';
}

function save(themeName) {
  if (!!window.localStorage && isValid(themeName)) {
    localStorage.setItem('theme', themeName);
  }
}

function ThemeManager() {
  return { get, save };
}

const themeManager = new ThemeManager();

export default themeManager;
