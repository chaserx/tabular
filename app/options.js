window.addEventListener('load', function() {
  options.tabLimit.value = localStorage.tabLimit || 25;

  options.tabLimit.onchange = function() {
    localStorage.tabLimit = options.tabLimit.value;
  };
});
