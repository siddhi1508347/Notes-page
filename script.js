const API_URL = "http://127.0.0.1:8000/notes";

const form = document.getElementById("note-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesList = document.getElementById("notes-list");

async function loadNotes() {
  const response = await fetch(API_URL);
  const notes = await response.json();

  notesList.innerHTML = "";

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;
    notesList.appendChild(card);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newNote = {
    title: titleInput.value,
    content: contentInput.value,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  });

  titleInput.value = "";
  contentInput.value = "";
  loadNotes();
});

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadNotes();
}

loadNotes();

