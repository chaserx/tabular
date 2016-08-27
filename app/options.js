window.addEventListener('load', function() {
  options.tabLimit.value = localStorage.tabLimit || 12;

  options.tabLimit.onchange = function() {
    localStorage.tabLimit = options.tabLimit.value;
  };
});
