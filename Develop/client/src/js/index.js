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

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
});

async function saveContent(content) {
  const db = await dbPromise;
  const tx = db.transaction('notes', 'readwrite');
  const store = tx.objectStore('notes');
  const id = await store.put(content);

  console.log(`Content saved with ID: ${id}`);

  // Send content to the server
  await fetch('/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
}

async function loadContent() {
  const db = await dbPromise;
  const tx = db.transaction('notes', 'readonly');
  const store = tx.objectStore('notes');
  const content = await store.getAll();

  const latestContent = content[content.length - 1] || '';
  document.getElementById('editor').value = latestContent;

  // Load content from the server
  const response = await fetch('/api/load');
  const data = await response.json();
  console.log('Content loaded from the server:', data.content);
}
