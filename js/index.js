import {notes, categories} from "../data.js";
let data = [...notes]
const refs = {
    notesTable: document.querySelector(".notes-table"),
    statsTable: document.querySelector(".stats-table"),
    toggleSection: document.querySelector(".toggle-section"),
    btnActive: document.querySelector(".toggle-section .active"),
    btnArchived: document.querySelector(".toggle-section .archived"),
    createNoteBtn: document.querySelector(".create-note-btn"),
    modal: document.querySelector(".backdrop"),
    closeModalBtn:document.querySelector(".btn-close"),
    submitNewNote:document.querySelector(".submit-btn"),
    form: document.querySelector(".new-note-form"),
    timeOptions: {
        year: "numeric",
        month: "long",
        day: "2-digit"
    },
    deleteAll:document.querySelector(".delete-all"),
    archiveAll: document.querySelector(".archive-all")
}

renderNotes(getActiveNotes())
rerenderStats()


refs.deleteAll.addEventListener("click", deleteAll)

function renderNotes(notes){

    let markup = notes.map(({id, name, created, category, content, dates, archived})=>{
        return (`
        <tr data-id = "${id}">
            <td><div class="note-type">${categories[category]}</div></td>
            <td class="name">${name}</td>
            <td>${created}</td>
            <td>${category}</td>
            <td>${content}</td>
            <td>${dates}</td>
            <td>
            <span class="material-icons btn" data-act = "edit">mode_edit</span>
            <span class="material-icons btn" data-act = "archive">${archived?"unarchive":"archive"}</span>
            <span class="material-icons btn" data-act = "delete">delete_sweep</span>
            </td>
          </tr>
        `)
    }).join("");

    refs.notesTable.insertAdjacentHTML('beforeend', markup)
}


function rerenderStats(){
    refs.statsTable.innerHTML="";

    let markup = Object.keys(categories).map(category=>{
        // console.log(data.filter(item=>item.category===category && item.archived))
        return(`
        <tr>
        <td><div class="note-type">${categories[category]}</div></td>
        <td class="name">${category}</td>
        <td>${data.filter(item=>item.category===category && !item.archived).length}</td>
        <td>${data.filter(item=>item.category===category && item.archived).length}</td>
      </tr>`)
    }).join("");
    
    refs.statsTable.insertAdjacentHTML('beforeend', markup)
}


function getArchivedNotes(){
    return data.filter(item=>item.archived)
}

function getActiveNotes(){
    return data.filter(item=>!item.archived)
}


function changeTableSection(event){
    refs.btnArchived.classList.toggle('chosen');
    refs.btnActive.classList.toggle('chosen');
    event.target.disabled = true;
    (event.target === refs.btnArchived 
        ? refs.btnActive
        : refs.btnArchived
    ).disabled = false;
    resetTable(refs.notesTable);
    renderNotes(event.target === refs.btnArchived 
        ? getArchivedNotes()
        : getActiveNotes()
    );
    refs.createNoteBtn.disabled = event.target === refs.btnArchived;
    refs.notesTable.dataset.section = event.target === refs.btnArchived 
        ? "archive"
        : "active";
    refs.archiveAll.innerHTML = refs.notesTable.dataset.section === "active"
        ? "archive"
        : "unarchive"
}

function resetTable (){
    refs.notesTable.innerHTML="";
}

function onSubmitBtn(event){
    event.preventDefault();
    const {name, content} = event.target;

    if(name.value.trim() === "" || content.value.trim() === ""){
        alert("Enter all the inputs!")
        return;
    }
    
    refs.modal.dataset.noteId
        ? editElement( refs.modal.dataset.noteId, event.target)
        : createNewNote(event.target)
    
    
    closeModal();
    resetTable(refs.notesTable);
    rerenderStats()
    renderNotes(refs.notesTable.dataset.section === "active" 
        ? getActiveNotes() 
        : getArchivedNotes())
    
}

function createNewNote({name, content, category}){
    let date = new Date( );
    
    let newNote = {
        id: String(Date.now()),
        name: name.value,
        created: date.toLocaleString("en-US", refs.timeOptions),
        category: category.value,
        content: content.value,
        dates: getDates(content.value),
        archived: false
    }
    data.push(newNote);
}


function openModal(){
    refs.modal.classList.remove("visually-hidden");
    refs.closeModalBtn.addEventListener("click", closeModal);
    refs.form.addEventListener("submit", onSubmitBtn);
}

function closeModal(){
    refs.modal.classList.add("visually-hidden");
    refs.modal.dataset.noteId = "";
    refs.closeModalBtn.removeEventListener("click", closeModal);
    refs.submitNewNote.removeEventListener("click", onSubmitBtn);
    refs.form.reset();
    refs.form.content.innerHTML = "";
}



refs.createNoteBtn.addEventListener("click", openModal)
refs.toggleSection.addEventListener("click", changeTableSection)




refs.notesTable.addEventListener("click", onTableClick);
function onTableClick(event){
    let id=event.target.closest("tr").dataset.id;
    if(event.target.dataset.act==="delete"){
        deleteElement(id)
    }
    if(event.target.dataset.act==="archive"){
        changeStatus(id)
    }
    if(event.target.dataset.act==="edit"){
        onEditBtn(id)
    }
}

function deleteElement(id){
    data = data.filter(item=>item.id !== id)
    resetTable(refs.notesTable);
    rerenderStats()
    renderNotes(refs.notesTable.dataset.section === "active" 
        ? getActiveNotes() 
        : getArchivedNotes())
    
}


function changeStatus (id){
    let el = data.find(item=>item.id===id);
    el.archived = !el.archived;
    resetTable(refs.notesTable);
    rerenderStats()
    renderNotes(refs.notesTable.dataset.section === "active" 
        ? getActiveNotes() 
        : getArchivedNotes())
}


function deleteAll(){
    let currentNotes = (refs.notesTable.dataset.section ==="active" 
        ? getActiveNotes()
        : getArchivedNotes() )
    data = data.filter(item=>!currentNotes.includes(item));
    resetTable(refs.notesTable);
    rerenderStats()
}

function onEditBtn(id){
    let el = data.find(item=>item.id===id);
    refs.modal.dataset.noteId = id;
    openModal()
    refs.form.name.value = el.name;
    refs.form.category.value = el.category;
    refs.form.content.innerHTML = el.content;
}


function editElement(id, {name, content, category}){
    
    let el = data[data.findIndex(item=>item.id===id)];
    el.name = name.value;
    el.content = content.value;
    el.category = category.value;
    el.dates = getDates(content.value);
}

function getDates (str){
    let reg = /\d{1,2}\/\d{1,2}\/\d{2,4}/g;
    return (str.match(reg) === null ?  " " : str.match(reg).join(', '))
}
