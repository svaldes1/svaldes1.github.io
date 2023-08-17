



window.addEventListener('load', () => {
  if (localStorage.getItem('light-mode') === 'true') {
    document.body.classList.add('light-mode-body');
  } else {
    document.body.classList.remove('light-mode-body');
  }
})



function switchMode() {

  document.body.classList.toggle('light-mode-body');

  if (document.body.classList.contains('light-mode-body')) {
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



// function closeDiv(divId) {

//   event.stopPropagation();
//   const div = document.getElementById(divId);
//   if (div) {
//     div.style.display = 'none';
//     localStorage.setItem(divId, 'closed');
//   }
// }

// // Check local storage for closed divs on page load
// window.addEventListener('load', () => {
//   const closedDivs = Object.keys(localStorage);
//   closedDivs.forEach(divId => {
//     const div = document.getElementById(divId);
//     if (div && localStorage.getItem(divId) === 'closed') {
//       div.style.display = 'none';
//     } 
//   });
// });

// let divCount = 8;

// // Function to add a new div with unique divID
// function addNewDiv() {
//   divCount++;
//   const divId = `div${divCount}`;

//   const container = document.getElementById('container');
  
//   const newDiv = document.createElement('div');
//   newDiv.classList.add('card');
//   newDiv.classList.add('card-wide');
//   newDiv.id = divId;

//   newDiv.innerHTML = "New Routine";
  
//   const closeButton = document.createElement('span');
//   closeButton.classList.add('close-button');
//   closeButton.innerHTML = '&times;';
//   closeButton.onclick = () => closeDiv(divId);


//   newDiv.appendChild(closeButton);

//   // Attach the onclick function to navigate to the page
//   newDiv.onclick = () => navigateToPage(divId);

//   container.append(newDiv);

//   localStorage.setItem(divId, 'open');

// }

function createDiv() {
  const divContainer = document.getElementById('container');
  const newDiv = document.createElement('div');
  const divId = 'div_' + Date.now(); // Generate a unique ID using timestamp
  newDiv.id = divId;
  newDiv.classList.add('card');
  newDiv.classList.add('card-wide');
  
  
  newDiv.onclick = () => navigateToPage(divId);
  const divTitle = localStorage.getItem(divId);
  divContainer.appendChild(newDiv);
  document.getElementById(divId).textContent = divTitle || "New Routine";
  newDiv.innerHTML += `<span class="close-button" onclick="removeDiv('${divId}')">X</span>`;
  saveDivToLocalStorage(divId);
}
function saveDivToLocalStorage(divId) {
  const divs = JSON.parse(localStorage.getItem('divs')) || [];
  divs.push(divId);
  localStorage.setItem('divs', JSON.stringify(divs));
}
function removeDiv(divId) {
  event.stopPropagation();
  const divContainer = document.getElementById('container');
  const divToRemove = document.getElementById(divId);
  divContainer.removeChild(divToRemove);

  const divs = JSON.parse(localStorage.getItem('divs')) || [];
  const index = divs.indexOf(divId);
  if (index !== -1) {
      divs.splice(index, 1);
      localStorage.setItem('divs', JSON.stringify(divs));
  }
}
function loadDivsFromLocalStorage() {
  const divs = JSON.parse(localStorage.getItem('divs')) || [];
  const divContainer = document.getElementById('container');
  divs.forEach(divId => {
      const newDiv = document.createElement('div');
      newDiv.id = divId;
      const divTitle = localStorage.getItem(divId);
      divContainer.appendChild(newDiv);
      document.getElementById(divId).textContent = divTitle || "New Routine";
      newDiv.innerHTML += `<span class="close-button" onclick="removeDiv('${divId}')">X</span>`;
      
      newDiv.classList.add('card');
      newDiv.classList.add('card-wide');
      
      newDiv.onclick = () => navigateToPage(divId);
  });
}
window.addEventListener('load', loadDivsFromLocalStorage);

