import {notes, categories} from "./data.js";
import {refs} from "./refs.js";
import {
    renderNotes,
    rerenderStats,
    refreshTables,
    changeTableSection
} from "./render.js";

let data = [...notes];

renderNotes(getActiveNotes());
rerenderStats();


refs.deleteAll.addEventListener("click", deleteAll);
refs.createNoteBtn.addEventListener("click", openModal);
refs.toggleSection.addEventListener("click", changeTableSection);
refs.notesTable.addEventListener("click", onTableClick);
refs.archiveAll.addEventListener("click", changeStatusOfAllNotes);


function onSubmitBtn(event){
    try{
        event.preventDefault();
        const {name, content, category} = event.target;

        if(name.value.trim() === "" || content.value.trim() === "" || category.value.trim() === ""){
            throw new SyntaxError("Fill all the inputs!");
        }

        addCategory(category.value);
        
        refs.modal.dataset.noteId
            ? editElement( refs.modal.dataset.noteId, event.target)
            : createNewNote(event.target);
        
        closeModal();
        refreshTables();

    } catch(error) {
        alert(error.message );
    }
    
}


function addCategory (str){
    if(Object.keys(categories).includes(str) ){
     return
    }
    categories[str] = '<span class="material-icons">more_horiz</span>';
}


function createNewNote({name, content, category}){
    let newNote = {
        id: String(Date.now()),
        name: name.value,
        created: makeFormatedDate(),
        category: category.value,
        content: content.value,
        dates: getDates(content.value),
        archived: false
    }

    data.push(newNote);
}


function onTableClick(event){
    let id = event.target.closest("tr").dataset.id;
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


function onEditBtn(id){
    openModal();
    let el = data.find(item=>item.id===id);
    refs.modal.dataset.noteId = id;

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


function deleteElement(id){
    data = data.filter(item=>item.id !== id);
    refreshTables();
}


function changeStatus (id){
    let el = data.find(item=>item.id===id);
    el.archived = !el.archived;
    refreshTables();
}


function deleteAll(){
    let currentNotes = (refs.notesTable.dataset.section ==="active" 
        ? getActiveNotes()
        : getArchivedNotes())
    data = data.filter(item=>!currentNotes.includes(item));
    refreshTables();
}


function changeStatusOfAllNotes(){
    data.map(note => note.archived = refs.notesTable.dataset.section === "active");
    refreshTables();
}


function getArchivedNotes(){
    return data.filter(item=>item.archived);
}


function getActiveNotes(){
    return data.filter(item =>!item.archived);
}


function makeFormatedDate(){
    return new Date().toLocaleString("en-US",{
        year: "numeric",
        month: "long",
        day: "2-digit"
    })
}


function getDates (str){
    let reg = /\d{1,2}\/\d{1,2}\/\d{2,4}/g;
    return (str.match(reg) === null ?  " " : str.match(reg).join(', '))
}


function resetForm(){
    refs.modal.dataset.noteId = "";
    refs.form.reset();
    refs.form.content.innerHTML = "";
}


function openModal(){
    refs.modal.classList.remove("visually-hidden");
    refs.closeModalBtn.addEventListener("click", closeModal);
    refs.form.addEventListener("submit", onSubmitBtn);
}


function closeModal(){
    refs.modal.classList.add("visually-hidden");
    refs.closeModalBtn.removeEventListener("click", closeModal);
    refs.submitNewNote.removeEventListener("click", onSubmitBtn);
    resetForm()
}  

export{
    data,
    getActiveNotes,
    getArchivedNotes
}