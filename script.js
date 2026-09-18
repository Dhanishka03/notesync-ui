// NoteSync UI — create, search, and delete notes

let notes = [];

const noteTitle   = document.getElementById('noteTitle');
const noteBody    = document.getElementById('noteBody');
const addNoteBtn  = document.getElementById('addNoteBtn');
const searchInput = document.getElementById('searchInput');
const notesList   = document.getElementById('notesList');

function addNote() {
  const title = noteTitle.value.trim();
  const body  = noteBody.value.trim();
  if (!title && !body) return;
  notes.push({ id: Date.now(), title: title || '(untitled)', body });
  noteTitle.value = '';
  noteBody.value  = '';
  render();
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  render();
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = query
    ? notes.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.body.toLowerCase().includes(query)
      )
    : notes;

  notesList.innerHTML = '';
  visible.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button class="note-delete" data-id="${note.id}" title="Delete">✕</button>
    `;
    notesList.appendChild(card);
  });

  notesList.querySelectorAll('.note-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteNote(Number(btn.dataset.id)));
  });
}

addNoteBtn.addEventListener('click', addNote);
searchInput.addEventListener('input', render);

render();
