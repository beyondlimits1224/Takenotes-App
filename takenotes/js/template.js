document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, options);
});

// Or with jQuery

$(function(){
  $('.sidenav').sidenav();
});


// define UI variables
const form = document.querySelector('#task-form');
const notelist = document.querySelector('.collection');
const clearNotesBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const noteInput = document.querySelector('#task');
const saveDate = new Date();


// Load all events listener
loadEventListener();


// function loadEventListener
function loadEventListener(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getNotes);

  // Add note event
  form.addEventListener('submit', addTask);
  // Remove notes event
  notelist.addEventListener('click', removeNote);
  // Clear notes event
  clearNotesBtn.addEventListener('click', clearNotes);
  // Filter note events
  filter.addEventListener('keyup', filterNotes);

}

// Get NoteList from Local Storage
function getNotes(){
  let notes;
  if(localStorage.getItem('notes') === null){
    notes = [];
  }else{
    notes = JSON.parse(localStorage.getItem('notes'));
  }

  notes.forEach(function(note){
    // Create list item
    // Create li element
    // Custom design the li
    const li = document.createElement('li');
    // add a class to li element
    li.className = 'collection-item'
    // Create a text node and append to li
    li.appendChild(document.createTextNode(note));
    // Create new link element
    const link = document.createElement('a');
    // add a class to a element
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fas fa-trash"></li>';
    // append the link to li
    li.appendChild(link);

    // Append the li to the ul
    notelist.appendChild(li);
  });
}

// Add note
function addTask(e){

  if(noteInput.value === ''){
    alert('Please add a note.');
        // clear the input
        noteInput.value = '';
        
  }else{     
    // Create list item
    // Create li element
    // Custom design the li
    const li = document.createElement('li');
    // add a class to li element
    li.className = 'collection-item'
    // Create a text node and append to li
    li.appendChild(document.createTextNode(noteInput.value));
    // Create new link element
    const link = document.createElement('a');
    // add a class to a element
    link.className = 'delete-item secondary-content';
    // add icon htmls
    link.innerHTML = '<i class="fas fa-trash"></li>';
    // append the link to li
    li.appendChild(link);

    // Append the li to the ul
    notelist.appendChild(li);

    // Store in local storage
    storeNoteInLocalStorage(noteInput.value);

    // clear the input
    noteInput.value = '';

    // save the date list create
    console.log(saveDate);
  }


  
  e.preventDefault();
}


// Store Notes
function storeNoteInLocalStorage(note){
  let notes;
  if(localStorage.getItem('notes') === null){
    notes = [];
  }else{
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.push(note);  

  localStorage.setItem('notes', JSON.stringify(notes));
}

// Remove Notes
// Delete Buttons
// Click the x button icon
function removeNote(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Delete this note?')){
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeNoteFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage function
function removeNoteFromLocalStorage(NoteItem){
  let notes;
  if(localStorage.getItem('notes') === null){
    notes = [];
  }else{
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.forEach(function(note, index){
    if(NoteItem.textContent === note){
      notes.splice(index, 1);
    }
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}

// Clear all Notes
function clearNotes(e){
  if(confirm('Delete all notes?')){
    while(notelist.firstChild){  
        notelist.removeChild(notelist.firstChild);
    }
  }

  // Clear all notes from local storage
  clearNotesFromLocalStorage();
}

// clearNotesFromLocalStorage function
function clearNotesFromLocalStorage(){
  localStorage.clear();
}

// Filter Notes
function filterNotes(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(note){
    const item = note.firstChild.textContent;
    if (item.toLowerCase().indexOf(text)!= -1) {
      note.style.display = 'block';      
    } else {
      note.style.display = 'none';
    }
  });
}