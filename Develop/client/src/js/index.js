// index.js
import { openDB } from 'idb';

const dbPromise = openDB('text-editor-db', 1, {
  upgrade(db) {
    db.createObjectStore('notes', { autoIncrement: true });
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const saveBtn = document.getElementById('save-btn');
  const loadBtn = document.getElementById('load-btn');

  saveBtn.addEventListener('click', () => {
    const content = editor.value;
    saveContent(content);
  });

  loadBtn.addEventListener('click', () => {
    loadContent();
  });

  // Load content from IndexedDB on page load
  loadContent();
});

async function saveContent(content) {
  const db = await dbPromise;
  const tx = db.transaction('notes', 'readwrite');
  const store = tx.objectStore('notes');
  const id = await store.put(content);

  console.log(`Content saved with ID: ${id}`);
}

async function loadContent() {
  const db = await dbPromise;
  const tx = db.transaction('notes', 'readonly');
  const store = tx.objectStore('notes');
  const content = await store.getAll();

  const latestContent = content[content.length - 1] || '';
  document.getElementById('editor').value = latestContent;
}
