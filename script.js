// script.js

// Import Firebase modules and config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD4a9-GfumDhkpmkSvr4tKfvHxhTq5upgw",
  authDomain: "examhub-auth-5f84b.firebaseapp.com",
  projectId: "examhub-auth-5f84b",
  storageBucket: "examhub-auth-5f84b.appspot.com",
  messagingSenderId: "577946327245",
  appId: "1:577946327245:web:0820c5e11c67f3ec32b184",
  measurementId: "G-6Q06GL3C4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

// Function to fetch PDF papers from JSON
async function fetchPapers() {
    const response = await fetch('papers.json');
    const papers = await response.json();
    return papers;
}

// Function to display papers
function displayPapers(papers) {
    const papersContainer = document.getElementById('papers-container');
    papersContainer.innerHTML = '';

    papers.forEach(paper => {
        const paperElement = document.createElement('div');
        paperElement.classList.add('paper');
        paperElement.innerHTML = `
            <h3>${paper.title}</h3>
            <a href="${paper.url}" target="_blank">Download PDF</a>
        `;
        papersContainer.appendChild(paperElement);
    });
}

// Search functionality
function searchPapers(query) {
    fetchPapers().then(papers => {
        const filteredPapers = papers.filter(paper => 
            paper.title.toLowerCase().includes(query.toLowerCase())
        );
        displayPapers(filteredPapers);
    });
}

// Event listener for search input
document.getElementById('search-input').addEventListener('input', (event) => {
    const query = event.target.value;
    searchPapers(query);
});

// Initial fetch and display of papers
fetchPapers().then(displayPapers);
