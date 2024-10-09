

// note class

class Note{
    constructor(id, title, text){
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

// define app class to manage notes

class App{
    constructor(){
        this.notes []; // initialize an empty array to store notes
        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector(".note-title");
        this.$noteText = document.querySelector(".note-text");
        this.$notes = document.querySelector(".notes");
        this.$form = document.querySelector("#modal-form");
        this.$modal = document.querySelector(".modal");

        this.addEventListeners();
        this.displayNotes();
    }

    addEventListeners(){
        //Add a click event listener to body of document
        document.body.addEventListener("click", (event) =>{
            //when click event occurs, call the handleFormClick method
            this.handleFormClick(event);
            this.openModel(event);
        })

        this.$form.addEventListener("submit", (event) => {
            event.preventDefault(); //prefents page/browser from refreshing
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            this.addNote({ title, text})
            this.closeActiveForm();
        })
    }

    handleFormClick(event){
        const isActiveFormClickOn = this.$activeForm.contains(event.target);
        const isInactiveFormClickOn = this.$inactiveForm.contains(event.target);

        const title = this.$noteTitle.value;
        const text = this.$noteText.value;

        if(isInactiveFormClickOn){
            //calling function to open the active form
            this.openActiveForm(); 
        } else if(isInactiveFormClickOn && !isActiveFormClickOn){
            //calling the function to add a new note
            this.addNote({title, text});
            //calling function to close active form
            this.closeActiveForm();

        }
    }

    openModel(event){
        if(event.target.closest(".note")){
            this.$modal.classList.add("open-modal")
        }
    }

    openActiveForm(){
        this.$activeForm.style.display = "block";
        this.$inactiveForm.style.display = "none";
        this.$noteText.focus();
    }

    closeActiveForm(){
        this.$activeForm.style.display = "none";
        this.$inactiveForm.style.display = "block";
    }

    // method to add a new note to notes
    addNote({ title, text}) {
        id(text != "") {
            const newNote = new Note (cuid(), title, text)
            this.notes = (...this.notes, newNote); //add the note to notes array

            this.displayNotes();
        };
    };



    // method to edit an existing note to notes
    editNote({ title, text}) {
        this.notes = this.notes.map(note => {
            if(note.id === id){
                note.title = title;
                note.text = text;
            }
            return note;
        })
    }

    // method to delete a note in the notes
    deleteNote(id){
        this.notes - this.notes.filter(note => note.id !== id); //remove note from array

    }

    displayNotes(){
        this.$notes.innerHTML = this.notes.map((notes) => 
        `
        <div class="note" id"${note.id}">
            <div class="note-content">
                <div class="note-header">

                    <p>${note.title}</p>

                    <span class="material-symbols-outlined note-pin">keep</span>
                </div>

                p>${note.text}</p>
            </div>
            <div class="note-footer-icons">
                <span class="material-symbols-outlined footer-icon">add_alert</span>
                <span class="material-symbols-outlined footer-icon">person_add</span>
                <span class="material-symbols-outlined footer-icon">palette</span>
                <span class="material-symbols-outlined footer-icon">image</span>
                <span class="material-symbols-outlined footer-icon">archive</span>
                <span class="material-symbols-outlined footer-icon">more_vert</span>
            </div>
        </div>
        `).join(""); // display each notes details
    }
}

const app = new App();