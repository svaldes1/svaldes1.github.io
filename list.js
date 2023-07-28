let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let reps = document.getElementById('reps');
let weight = document.getElementById('weight');


function getPageSpecificKey() {
  return "triples_" + (new URLSearchParams(window.location.search).get("id"));
}

// Call function 
form.addEventListener('submit', runEvent);

let deleteBtn = document.getElementById('items');
    deleteBtn.addEventListener('click', removeItem);


// Add item function
function runEvent(e){
    e.preventDefault();

    // Get input values
    let inputValue = document.getElementById('item').value;
    let repsValue = document.getElementById('reps').value;
    let weightValue = document.getElementById('weight').value;


    // validate input
    if(inputValue === '' || repsValue === '' || weightValue === ''){
        alert('Please enter a value');
        return;
    }
    
    // Create item
    let li = document.createElement('li');

    // add class to li
    li.className = 'element';

    // add text to li
    li.appendChild(document.createTextNode(inputValue));
    li.appendChild(document.createTextNode(' | Reps: '));
    li.appendChild(document.createTextNode(repsValue));
    li.appendChild(document.createTextNode('| Weight: '));
    li.appendChild(document.createTextNode(weightValue));
    
    //push item
    itemList.appendChild(li);
    var editButton = document.createElement('button');
    editButton.appendChild(document.createTextNode('Edit'));
    editButton.className = "edit";
    editButton.addEventListener('click', function() {
      editTriple(item, reps, weight, li);
    });
    li.appendChild(editButton);
    
    //create button
    let button = document.createElement('button');

    //add Text to botton
    button.appendChild(document.createTextNode('×'));

    //add classes to button;
    button.className = " trash delete";

    button.addEventListener('click', function () {
        // Remove the triple from the array
        removeTriple(item, reps, weight, li);
      });

    // push button to li
    li.appendChild(button);

    // store in local storage
    var item = document.getElementById('item').value;
    var reps = document.getElementById('reps').value;
    var weight = document.getElementById('weight').value;

    var pageKey = getPageSpecificKey();
    var triples = JSON.parse(localStorage.getItem(pageKey)) || [];

    triples.push({ item: item, reps: reps, weight: weight });

    localStorage.setItem(pageKey, JSON.stringify(triples));



    // clear input


    document.getElementById('item').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('weight').value = '';

}

