
window.onload = function () {
  // Retrieve stored triples from local storage
  var pageKey = getPageSpecificKey();
  var triples = JSON.parse(localStorage.getItem(pageKey)) || [];

  // Display the stored triples on the page
  triples.forEach(function (triple) {
    displayTriple(triple.item, triple.reps, triple.weight);
  });
}
function displayTriple(item, reps, weight) {
  var ul = document.getElementById('items');
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  li.appendChild(document.createTextNode(' | Reps: '));
  li.appendChild(document.createTextNode(reps));
  li.appendChild(document.createTextNode('| Weight: '));
  li.appendChild(document.createTextNode(weight));

  //push item
  ul.appendChild(li);

  var editButton = document.createElement('button');
  editButton.appendChild(document.createTextNode('Edit'));
  editButton.addEventListener('click', function () {
    editTriple(item, reps, weight, li);
  });
  editButton.className = "edit";
  li.appendChild(editButton);
  //create button
  let button = document.createElement('button');

  //add Text to botton
  button.appendChild(document.createTextNode('×'));

  button.addEventListener('click', function () {
    // Remove the triple from the array
    removeTriple(item, reps, weight, li);
  });

  //add classes to button;
  button.className = " trash delete";

  // push button to li
  li.appendChild(button);
}
function removeTriple(item, reps, weight, listItem) {
  // Retrieve stored triples from local storage
  var pageKey = getPageSpecificKey();
  var triples = JSON.parse(localStorage.getItem(pageKey)) || [];

  // Find the index of the triple to be removed
  var index = triples.findIndex(function (triple) {
    return triple.item === item && triple.reps === reps && triple.weight === weight;
  });

  // Remove the triple from the array if found
  if (index > -1) {
    triples.splice(index, 1);
  }

  // Save the updated triples to local storage
  localStorage.setItem(pageKey, JSON.stringify(triples));

  // Remove the list item from the list
  listItem.remove();
}


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

function editTriple(item, reps, weight, listItem) {
  // Create an edit form
  var editForm = document.createElement('form');

  // Create input fields for the triple components
  var itemInput = document.createElement('input');
  itemInput.type = 'text';
  itemInput.value = item;

  var repsInput = document.createElement('input');
  repsInput.type = 'text';
  repsInput.value = reps;

  var weightInput = document.createElement('input');
  weightInput.type = 'text';
  weightInput.value = weight;

  // Create a save button
  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.type = 'button';

  // Event listener for the form submission
  saveButton.addEventListener('click', function () {
    // Get the updated values from the input fields
    var updatedItem = itemInput.value;
    var updatedReps = repsInput.value;
    var updatedWeight = weightInput.value;

    // Update the triple in the list
    listItem.textContent = updatedItem + " | Reps: " + updatedReps + "| Weight: " + updatedWeight;

    // Update the triple in local storage
    updateTriple(item, reps, weight, updatedItem, updatedReps, updatedWeight);

    // Remove the edit form
    editForm.remove();


    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = "edit";
    editButton.addEventListener('click', function () {
      editTriple(item, reps, weight, listItem);
    });
    listItem.appendChild(editButton);

    // Create a close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'x';
    closeButton.className = " trash delete";
    closeButton.addEventListener('click', function () {
      listItem.remove();
      removeTriple(item, reps, weight, listItem);
    });
    listItem.appendChild(closeButton);
  });
  editForm.appendChild(itemInput);
  editForm.appendChild(repsInput);
  editForm.appendChild(weightInput);
  editForm.appendChild(saveButton);

  // Replace the list item with the edit form
  listItem.innerHTML = '';
  listItem.appendChild(editForm);

}
function updateTriple(oldItem, oldReps, oldWeight, newItem, newReps, newWeight) {
  // Retrieve stored triples from local storage
  var pageKey = getPageSpecificKey();
  var triples = JSON.parse(localStorage.getItem(pageKey)) || [];

  // Find the index of the triple to be updated
  var index = triples.findIndex(function (triple) {
    return triple.item === oldItem && triple.reps === oldReps && triple.weight === oldWeight;
  });

  // Update the triple in the array if found
  if (index > -1) {
    triples[index].item = newItem;
    triples[index].reps = newReps;
    triples[index].weight = newWeight;
  }

  // Save the updated triples to local storage
  localStorage.setItem(pageKey, JSON.stringify(triples));
}

function closeDiv(divId) {

  event.stopPropagation();
  const div = document.getElementById(divId);
  if (div) {
    div.style.display = 'none';
    localStorage.setItem(divId, 'closed');
  }
}

// Check local storage for closed divs on page load
window.addEventListener('load', () => {
  const closedDivs = Object.keys(localStorage);
  closedDivs.forEach(divId => {
    const div = document.getElementById(divId);
    if (div && localStorage.getItem(divId) === 'closed') {
      div.style.display = 'none';
    }
  });
});
