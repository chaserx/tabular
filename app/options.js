window.addEventListener('load', function() {
  options.tabLimit.value = localStorage.tabLimit;

  options.tabLimit.onchange = function() {
    localStorage.tabLimit = options.tabLimit.value;
  };
});
