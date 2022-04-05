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
    deleteAll:document.querySelector(".delete-all"),
    archiveAll: document.querySelector(".archive-all")
}

export {refs};