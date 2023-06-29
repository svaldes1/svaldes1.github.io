

window.addEventListener('load', () => {
    if (localStorage.getItem('light-mode') === 'true') {
      document.body.classList.add('light-mode-body');     
    } else {
        document.body.classList.remove('light-mode-body');
    }
  })
  

function switchMode() {
 
    document.body.classList.toggle('light-mode-body');

    if (document.body.classList.contains('light-mode-body')){
        localStorage.setItem('light-mode', 'true');

    } else {
        localStorage.setItem('light-mode', 'false');
    }
 };

 if (localStorage.getItem('light-mode') === 'true') {
    document.body.classList.add('light-mode-body');
 };
 function openNav() {
    document.getElementById("myNav").style.height = "100%";
  };
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  };
  
    
