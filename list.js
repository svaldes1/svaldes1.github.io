let form = document.getElementById('addForm');
let itemList = document.getElementById('items');


// Call function 
form.addEventListener('submit', runEvent);

let deleteBtn = document.getElementById('items');
    deleteBtn.addEventListener('click', removeItem);

// Filter Items


// Add item function
function runEvent(e){
    e.preventDefault();

    // Get input value
    let inputValue = document.getElementById('item').value;

    // validate input
    if(inputValue === ''){
        alert('Please enter a value');
        return;
    }
    
    // Create item
    let li = document.createElement('li');

    // add class to li
    li.className = 'element';

    // add text to li
    li.appendChild(document.createTextNode(inputValue));
    
    //push item
    itemList.appendChild(li);
    
    //create button
    let button = document.createElement('button');

    //add Text to botton
    button.appendChild(document.createTextNode('×'));

    //add classes to button;
    button.className = " trash delete";

    // push button to li
    li.appendChild(button);

    // clear input

    document.getElementById('item').value = '';

}

// function remove item

function removeItem(e){
    if(e.target.classList.contains('delete')){
            let li = e.target.parentElement;
            itemList.removeChild(li);
    }
    console.log(e.target.parentElement);
}
