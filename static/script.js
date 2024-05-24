function addNote() {
    const directoryInput = document.getElementById('directoryInput');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');

    const directoryName = directoryInput.value.trim();
    const noteTitle = noteTitleInput.value.trim();
    const noteContent = noteContentInput.value.trim();

    if (noteTitle !== '' && noteContent !== '') {
        const noteList = document.getElementById('noteList');
        const newNote = document.createElement('li');
        newNote.innerHTML = `<strong>${noteTitle}</strong>: ${noteContent}`;
        newNote.classList.add('note-item'); // Add a class to the note item
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button'); // Create delete button
        deleteButton.classList.add('delete-button'); // Add class to delete button
        deleteButton.textContent = 'Delete'; // Set delete button text
        newNote.appendChild(editButton); // Append the edit button to the note item
        newNote.appendChild(deleteButton); // Append the delete button to the note item
        noteList.appendChild(newNote);
        noteTitleInput.value = '';
        noteContentInput.value = '';

        if (directoryName !== '') {
            const directoryList = document.getElementById('directoryList');
            let directory = directoryList.querySelector(`#${directoryName}`);
            if (!directory) {
                directory = document.createElement('li');
                directory.id = directoryName;
                directory.innerHTML = `<strong>${directoryName}</strong>`;
                directoryList.querySelector('ul').appendChild(directory);
            }
            directory.querySelector('ul').appendChild(newNote.cloneNode(true));
        }
    } else {
        alert('Please enter a title and a note.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const noteContentInput = document.getElementById('noteContent');
    noteContentInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNote();
        }
    });

    const noteList = document.getElementById('noteList');
    noteList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'LI') {
            editNote(target);
        }
    });

    noteList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit-button')) {
            const noteElement = target.parentElement;
            editNoteWithButton(noteElement);
        }
        if (target.classList.contains('delete-button')) { // Check if delete button is clicked
            const noteElement = target.parentElement;
            deleteNote(noteElement); // Call deleteNote function
        }
    });
});

function editNoteWithButton(noteElement) {
    const noteText = noteElement.innerText.split(':');
    const noteTitle = noteText[0];
    const noteContent = noteText.slice(1).join(':').trim();

    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');

    noteTitleInput.value = noteTitle;
    noteContentInput.value = noteContent;

    noteElement.remove();
}

function deleteNote(noteElement) {
    noteElement.remove(); // Remove the note element from the DOM
}

document.addEventListener('DOMContentLoaded', function() {
    // Existing code...

    const directoryList = document.getElementById('directoryList');
    directoryList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'STRONG') {
            const directoryName = target.textContent.trim();
            deleteDirectory(directoryName);
        }
    });
});

function deleteDirectory(directoryName) {
    const directoryElement = document.getElementById(directoryName);
    if (directoryElement) {
        directoryElement.remove(); // Remove the directory element from the DOM
        // Also remove associated notes from the note list
        const noteList = document.getElementById('noteList');
        const noteItems = noteList.querySelectorAll(`.${directoryName}`);
        noteItems.forEach(item => item.remove());
    }
}

