import {refs} from "./refs.js"
import {categories} from "./data.js";

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

    refs.notesTable.insertAdjacentHTML('beforeend', markup);
}


function rerenderStats(){
    refs.statsTable.innerHTML="";

    let markup = Object.keys(categories).map(category=>{
        let arch = data.filter(item=>item.category===category && item.archived).length;
        let act = data.filter(item=>item.category===category && !item.archived).length;

        if(arch === 0 && act===0){
            return
        }

        return(`
        <tr>
        <td><div class="note-type">${categories[category]}</div></td>
        <td class="name">${category}</td>
        <td>${act}</td>
        <td>${arch}</td>
      </tr>`)
    }).join("");
    
    refs.statsTable.insertAdjacentHTML('beforeend', markup);
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
        : "unarchive";
}

function refreshTables(){
    refs.notesTable.innerHTML="";
    rerenderStats();
    renderNotes(refs.notesTable.dataset.section === "active" 
        ? getActiveNotes() 
        : getArchivedNotes());
}

export{
    renderNotes,
    rerenderStats,
    refreshTables,
    changeTableSection
}