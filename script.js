// Helper for bulletproof local storage reading
function safeGetItem(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        if (!item || item === "undefined") return defaultValue;
        return JSON.parse(item);
    } catch (e) {
        console.error("Error parsing localStorage key: " + key, e);
        return defaultValue;
    }
}

// Initial mock data to populate the platform on first run
const defaultNotes = [
    {
        id: 1,
        title: "Data Structures & Algorithms Cheat Sheet",
        subject: "Data Structures",
        description: "A comprehensive guide on trees, graphs, sorting algorithms, and complexity analysis.",
        uploader: "Rahul Verma",
        fileData: "data:text/html;charset=utf-8," + encodeURIComponent(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>DSA Cheat Sheet</title>
                <style>
                    body { font-family: 'Poppins', sans-serif; padding: 40px; background: #f4f6f9; color: #333; }
                    h1 { color: #6a5cff; border-bottom: 2px solid #6a5cff; padding-bottom: 10px; }
                    h2 { color: #333; margin-top: 20px; }
                    pre { background: #eef; padding: 15px; border-radius: 8px; font-family: monospace; }
                    ul { line-height: 1.6; }
                </style>
            </head>
            <body>
                <h1>Data Structures & Algorithms Cheat Sheet</h1>
                <p>Prepared by Rahul Verma</p>
                <h2>1. Time Complexities</h2>
                <ul>
                    <li>Accessing Array Element: O(1)</li>
                    <li>Binary Search: O(log n)</li>
                    <li>Quick Sort (Average): O(n log n)</li>
                    <li>Merge Sort: O(n log n)</li>
                </ul>
                <h2>2. Graph Traversals</h2>
                <pre>BFS (Queue): Level-order traversal\nDFS (Stack/Recursion): Depth-first traversal</pre>
            </body>
            </html>
        `),
        fileName: "DSA_CheatSheet.html",
        likes: 12,
        dislikes: 0,
        comments: ["Highly recommended for exam prep!", "Very clear explanation of graphs."]
    },
    {
        id: 2,
        title: "Operating Systems Lecture Notes",
        subject: "Operating Systems",
        description: "Detailed notes on CPU Scheduling, Deadlocks, Semaphores, and Virtual Memory management.",
        uploader: "Priya Sharma",
        fileData: "data:text/html;charset=utf-8," + encodeURIComponent(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>OS Notes</title>
                <style>
                    body { font-family: 'Poppins', sans-serif; padding: 40px; background: #f4f6f9; color: #333; }
                    h1 { color: #6a5cff; border-bottom: 2px solid #6a5cff; padding-bottom: 10px; }
                    h2 { color: #333; margin-top: 20px; }
                    ul { line-height: 1.6; }
                </style>
            </head>
            <body>
                <h1>Operating Systems Cheat Sheet</h1>
                <p>Prepared by Priya Sharma</p>
                <h2>1. CPU Scheduling Algorithms</h2>
                <ul>
                    <li>First-Come, First-Served (FCFS) - Non-preemptive</li>
                    <li>Shortest Job First (SJF) - Optimal but hard to predict</li>
                    <li>Round Robin (RR) - Uses time slices (quanta)</li>
                </ul>
                <h2>2. What is a Deadlock?</h2>
                <p>A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.</p>
            </body>
            </html>
        `),
        fileName: "OS_LectureNotes.html",
        likes: 8,
        dislikes: 1,
        comments: ["Saved me during midterms."]
    },
    {
        id: 3,
        title: "SQL Cheatsheet & DBMS Queries",
        subject: "DBMS",
        description: "Quick reference guide for SQL Joins, subqueries, indexing, and normalization forms.",
        uploader: "Akshita Anand",
        fileData: "data:text/html;charset=utf-8," + encodeURIComponent(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>SQL Cheatsheet</title>
                <style>
                    body { font-family: 'Poppins', sans-serif; padding: 40px; background: #f4f6f9; color: #333; }
                    h1 { color: #6a5cff; border-bottom: 2px solid #6a5cff; padding-bottom: 10px; }
                    h2 { color: #333; margin-top: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #6a5cff; color: white; }
                </style>
            </head>
            <body>
                <h1>SQL Query Cheatsheet</h1>
                <p>Prepared by Akshita Anand</p>
                <h2>Common SQL Joins</h2>
                <table>
                    <tr>
                        <th>Join Type</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>INNER JOIN</td>
                        <td>Returns records that have matching values in both tables</td>
                    </tr>
                    <tr>
                        <td>LEFT JOIN</td>
                        <td>Returns all records from the left table, and matching records from the right</td>
                    </tr>
                    <tr>
                        <td>RIGHT JOIN</td>
                        <td>Returns all records from the right table, and matching records from the left</td>
                    </tr>
                </table>
            </body>
            </html>
        `),
        fileName: "SQL_DBMS_Guide.html",
        likes: 15,
        dislikes: 0,
        comments: ["Love the clean SQL join table!"]
    }
];

const defaultMessages = [
    {
        id: 101,
        type: "group",
        target: "Java Masters",
        sender: "Priya Sharma",
        text: "Hey everyone! Does anyone have notes on Java Garbage Collection?",
        timestamp: "10:15 AM"
    },
    {
        id: 102,
        type: "group",
        target: "Java Masters",
        sender: "Rahul Verma",
        text: "Yes, I uploaded a cheat sheet earlier. You can check it out in the trending tab!",
        timestamp: "10:17 AM"
    },
    {
        id: 103,
        type: "direct",
        target: "Priya Sharma",
        sender: "Priya Sharma",
        text: "Hey Akshita, thanks for sharing the DSA notes! They were super helpful.",
        timestamp: "Yesterday"
    }
];

// Initialize Notes State
let notes = safeGetItem("notes", defaultNotes);
if (!localStorage.getItem("notes")) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Initialize Messages State
let messages = safeGetItem("messages", defaultMessages);
if (!localStorage.getItem("messages")) {
    localStorage.setItem("messages", JSON.stringify(messages));
}

// Initialize Profile State
let userProfile = safeGetItem("userProfile", {
    name: "Akshita Anand",
    desc: "Computer Science Student"
});

// Initialize Groups & Contacts Lists and Active Targets
let groups = safeGetItem("studyGroups", ["Java Masters"]);
let contacts = safeGetItem("chatContacts", ["Priya Sharma"]);
let activeGroup = localStorage.getItem("activeGroup") || "Java Masters";
let activeContact = localStorage.getItem("activeContact") || "Priya Sharma";

// Initialize registered users database in local storage if not present
const defaultUsers = [
    { username: "akshita", password: "123", name: "Akshita Anand", desc: "Computer Science Student", profilePic: "" }
];
let registeredUsers = safeGetItem("registeredUsers", defaultUsers);
if (!localStorage.getItem("registeredUsers")) {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}

// Load everything on startup
window.onload = function () {
    updateAuthBtn();
    refreshAll();
    loadProfileData();
    renderGroups();
    renderContacts();

    // Default to the correct active chat targets
    switchTarget('group', activeGroup);
    switchTarget('direct', activeContact);

    // If not logged in, pop up the login/signup modal (without close button)
    if (localStorage.getItem("loggedIn") !== "true") {
        openAuthModal(false);
    }

    showPage("home");
};

// Update Authentication Buttons dynamically based on state
function updateAuthBtn() {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const authBtn = document.getElementById("authBtn");
    if (authBtn) {
        authBtn.innerText = isLoggedIn ? "Logout" : "Login";
    }
}

// Handle navbar login/logout button click
function handleAuthBtnClick() {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
        handleLogout();
    } else {
        openAuthModal(true); // Show with close button when clicked from navbar
    }
}

// Open Auth Modal Popup
function openAuthModal(showClose = false) {
    const modal = document.getElementById("authModal");
    const closeBtn = document.getElementById("closeAuthBtn");
    if (modal) {
        modal.style.display = "flex";
    }
    if (closeBtn) {
        closeBtn.style.display = showClose ? "block" : "none";
    }
}

// Close Auth Modal Popup
function closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Toggle between Login and Signup forms in the Pop-up Modal
function toggleAuthForm(mode) {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    if (mode === "login") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

// Handle Sign Up
function handleSignup() {
    const user = document.getElementById("signupUser").value.trim();
    const name = document.getElementById("signupName").value.trim();
    const pass = document.getElementById("signupPass").value.trim();

    if (!user || !name || !pass) {
        return alert("All fields are required!");
    }

    // Check if username already exists
    const exists = registeredUsers.some(u => u.username.toLowerCase() === user.toLowerCase());
    if (exists) {
        return alert("Username is already taken. Please choose another!");
    }

    const newUser = {
        username: user,
        password: pass,
        name: name,
        desc: "Student",
        profilePic: ""
    };

    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    // Clear signup inputs
    document.getElementById("signupUser").value = "";
    document.getElementById("signupName").value = "";
    document.getElementById("signupPass").value = "";

    showNotify("Account created! Please log in.");
    toggleAuthForm("login");
}

// Handle Login Form Submission
function handleAuth() {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    if (!user || !pass) {
        return alert("Please enter credentials!");
    }

    // Search users database
    const matchedUser = registeredUsers.find(
        u => u.username.toLowerCase() === user.toLowerCase() && u.password === pass
    );

    if (matchedUser) {
        localStorage.setItem("loggedIn", "true");
        
        // Save the matched user as the active profile
        localStorage.setItem("userProfile", JSON.stringify({
            name: matchedUser.name,
            desc: matchedUser.desc || "Student",
            profilePic: matchedUser.profilePic || ""
        }));
        
        // Clear login inputs
        document.getElementById("loginUser").value = "";
        document.getElementById("loginPass").value = "";
        
        closeAuthModal();
        updateAuthBtn();
        loadProfileData();
        showNotify(`Welcome back, ${matchedUser.name}! 👋`);
        showPage("home");
    } else {
        alert("Invalid username or password!");
    }
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userProfile");
    updateAuthBtn();
    showNotify("Logged out successfully! 👋");
    openAuthModal(false); // Show login popup immediately (no close button)
    showPage("home");
}

// Switch between SPA views
function showPage(pageId) {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (!isLoggedIn && (pageId === "upload" || pageId === "profile" || pageId === "chat" || pageId === "groups" || pageId === "library")) {
        openAuthModal(false);
        return;
    }

    // Hide all normal pages and show the active one
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add("active");
    }

    refreshAll();
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    document.getElementById("themeToggle").innerText =
        document.body.classList.contains("dark") ? "🌙" : "🌑";
}

// Handle Note Submissions
function handleUpload() {
    const title = document.getElementById("uploadTitle").value.trim();
    const subj = document.getElementById("uploadSubject").value;
    const desc = document.getElementById("uploadDesc").value.trim();
    const fileInput = document.getElementById("uploadFile");
    const file = fileInput.files[0];

    if (!title || !file) return alert("Fill all fields!");

    const reader = new FileReader();

    reader.onload = function (e) {
        const currentProfile = JSON.parse(localStorage.getItem("userProfile")) || userProfile;
        const uploaderName = currentProfile.name || "Akshita Anand";

        notes.push({
            id: Date.now(),
            title: title,
            subject: subj || "General",
            description: desc,
            uploader: uploaderName,
            fileData: e.target.result,
            fileName: file.name,
            likes: 0,
            dislikes: 0,
            comments: []
        });

        localStorage.setItem("notes", JSON.stringify(notes));

        // Reset the form fields for clean UX
        document.getElementById("uploadTitle").value = "";
        document.getElementById("uploadSubject").value = "";
        document.getElementById("uploadDesc").value = "";
        fileInput.value = "";

        showNotify("Notes uploaded successfully!");
        showPage("home");
    };

    reader.readAsDataURL(file);
}

// Refresh all note views
function refreshAll() {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const currentProfile = safeGetItem("userProfile", userProfile);
    const currentUser = currentProfile.name || "Akshita Anand";

    if (!isLoggedIn) {
        // Render a card prompting login in the trending container
        const trendingContainer = document.getElementById("trending");
        if (trendingContainer) {
            trendingContainer.innerHTML = `
                <div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px; background: rgba(255,255,255,0.9); border-radius: 15px;">
                    <h3 style="color: #6a5cff; margin-bottom: 10px;">🔒 Access Restricted</h3>
                    <p style="color: #555; margin-bottom: 20px;">Please login or sign up to view and download study notes.</p>
                    <button class="btn-primary" onclick="openAuthModal(false)">Login / Sign Up</button>
                </div>
            `;
        }
        
        // Render placeholder for savedNotes
        const savedContainer = document.getElementById("savedNotes");
        if (savedContainer) {
            savedContainer.innerHTML = `
                <div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px; background: rgba(255,255,255,0.9); border-radius: 15px;">
                    <h3 style="color: #6a5cff; margin-bottom: 10px;">🔒 Library Locked</h3>
                    <p style="color: #555; margin-bottom: 20px;">Please login to view your saved study notes library.</p>
                    <button class="btn-primary" onclick="openAuthModal(false)">Login / Sign Up</button>
                </div>
            `;
        }
        return;
    }

    renderNotes(notes, "trending", false);
    renderNotes(notes.filter(n => n.isSaved), "savedNotes", false);
    renderNotes(notes.filter(n => n.uploader === currentUser), "myUploads", true);
}

// Render Notes Cards list
function renderNotes(data, containerId, canDelete) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 20px;">No notes found here.</p>`;
        return;
    }

    container.innerHTML = data.map(n => `
        <div class="card">
            <span style="color:#6a5cff;font-weight:bold;font-size:0.7rem;">
                ${n.subject || "General"}
            </span>

            <h3>${n.title}</h3>
            ${n.description ? `<p style="color:#555;font-size:0.85rem;margin-top:5px;">${n.description}</p>` : ""}
            ${n.uploader ? `<p style="font-size:0.75rem;color:#888;margin-top:5px;">Uploaded by: ${n.uploader}</p>` : ""}

            <div style="margin:10px 0;display:flex;gap:5px;">
                <button class="action-btn" onclick="viewNote(${n.id})">👁️ View</button>
                <button class="action-btn" onclick="downloadNote(${n.id})">⬇️ Download</button>
                <button class="action-btn" onclick="handleAction(${n.id},'save')"  
                    style="color:${n.isSaved ? "#6a5cff" : "#ccc"}">🔖</button>
            </div>

            <div class="note-actions">
                <button class="action-btn" onclick="handleAction(${n.id},'like')">🔥 ${n.likes || 0}</button>
                <button class="action-btn" onclick="handleAction(${n.id},'dislike')">👎 ${n.dislikes || 0}</button>
                <button class="action-btn" onclick="handleAction(${n.id},'comment')">💬 Comments</button>
            </div>

            ${n.comments && n.comments.length > 0 ? `
                <div class="comment-box">
                    ${n.comments.map(c => `<div class="comment-item">${c}</div>`).join("")}
                </div>
            ` : ""}

            ${canDelete ? `<button class="btn-delete" onclick="deleteNote(${n.id})" style="margin-top:10px; width: 100%;">Delete Note</button>` : ""}
        </div>
    `).join("");
}

// Render groups sidebar dynamically
function renderGroups() {
    const sidebar = document.getElementById('groupSidebar');
    if (!sidebar) return;
    sidebar.innerHTML = groups.map(g => `
        <div class="list-item ${g === activeGroup ? 'active-item' : ''}" onclick="switchTarget('group', '${g}')">👥 ${g}</div>
    `).join("");
}

// Render contacts sidebar dynamically
function renderContacts() {
    const sidebar = document.getElementById('chatSidebar');
    if (!sidebar) return;
    sidebar.innerHTML = contacts.map(c => `
        <div class="list-item ${c === activeContact ? 'active-item' : ''}" onclick="switchTarget('direct', '${c}')">👤 ${c}</div>
    `).join("");
}

// Add New Study Group
function addNewGroup() {
    const name = prompt("Enter new group name:");
    if (name && name.trim()) {
        const trimmed = name.trim();
        if (!groups.includes(trimmed)) {
            groups.push(trimmed);
            localStorage.setItem("studyGroups", JSON.stringify(groups));
            activeGroup = trimmed;
            localStorage.setItem("activeGroup", trimmed);
            renderGroups();
            switchTarget('group', trimmed);
            showNotify(`Group "${trimmed}" created!`);
        }
    }
}

// Add New Contact
function addNewContact() {
    const name = prompt("Enter contact name:");
    if (name && name.trim()) {
        const trimmed = name.trim();
        if (!contacts.includes(trimmed)) {
            contacts.push(trimmed);
            localStorage.setItem("chatContacts", JSON.stringify(contacts));
            activeContact = trimmed;
            localStorage.setItem("activeContact", trimmed);
            renderContacts();
            switchTarget('direct', trimmed);
            showNotify(`Contact "${trimmed}" added!`);
        }
    }
}

// Switch between active study group or chat contact channels
function switchTarget(type, name) {
    if (type === 'group') {
        activeGroup = name;
        localStorage.setItem("activeGroup", name);
        
        const groupHeader = document.getElementById('groupHeader');
        if (groupHeader) groupHeader.innerText = `Group: ${name}`;
        
        renderGroups();
        refreshMessages('group');
    } else {
        activeContact = name;
        localStorage.setItem("activeContact", name);
        
        const chatHeader = document.getElementById('chatHeader');
        if (chatHeader) chatHeader.innerText = `Chat with ${name}`;
        
        renderContacts();
        refreshMessages('direct');
    }
}

// Send Chat/Group Messages
function sendMessage(type) {
    const inputId = type === 'group' ? 'groupInputText' : 'chatInputText';
    const textInput = document.getElementById(inputId);
    const text = textInput.value;
    
    if (!text || !text.trim()) return;
    
    const target = type === 'group' ? activeGroup : activeContact;
    const currentProfile = JSON.parse(localStorage.getItem("userProfile")) || userProfile;
    const sender = currentProfile.name || "Akshita Anand";

    const msg = {
        id: Date.now(),
        type: type, // 'group' or 'direct'
        target: target,
        sender: sender,
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    messages.push(msg);
    localStorage.setItem("messages", JSON.stringify(messages));
    textInput.value = ""; // Clear input
    
    refreshMessages(type);
}

// Refresh Chat/Group messages on the screen
function refreshMessages(type) {
    const container = type === 'group' ? document.getElementById('groupMessages') : document.getElementById('chatMessages');
    if (!container) return;
    
    const target = type === 'group' ? activeGroup : activeContact;
    const filtered = messages.filter(m => m.type === type && m.target === target);
    
    const currentProfile = JSON.parse(localStorage.getItem("userProfile")) || userProfile;
    const currentUser = currentProfile.name || "Akshita Anand";

    container.innerHTML = filtered.map(m => {
        const isSent = m.sender === currentUser || !m.sender;
        return `
            <div style="display: flex; flex-direction: column; align-items: ${isSent ? 'flex-end' : 'flex-start'}; margin-bottom: 8px;">
                ${type === 'group' && !isSent ? `<span style="font-size: 0.75rem; color: #888; margin-left: 5px; margin-bottom: 2px;">${m.sender}</span>` : ''}
                <div class="message ${isSent ? 'sent' : 'received'}" style="margin: 0;">
                    ${m.text}
                </div>
                <span style="font-size: 0.65rem; color: #aaa; margin: 2px 5px 0;">${m.timestamp}</span>
            </div>
        `;
    }).join("");
    
    // Auto-scroll to the latest message
    container.scrollTop = container.scrollHeight;
}

// View Note inside a secure frame in a new tab
function viewNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note || !note.fileData) {
        alert("No file found.");
        return;
    }

    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
            <head>
                <title>${note.title}</title>
                <style>body { margin:0; padding:0; height:100vh; overflow:hidden; }</style>
            </head>
            <body>
                <iframe src="${note.fileData}" style="width:100%; height:100%; border:none;"></iframe>
            </body>
            </html>
        `);
        win.document.close();
    } else {
        alert("Please enable pop-ups to view notes.");
    }
}

// Download Note File
function downloadNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note || !note.fileData) return alert("No file found.");

    const a = document.createElement("a");
    a.href = note.fileData;
    a.download = note.fileName || "downloaded_note";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Search Notes from Input
function searchNotes() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    const filtered = notes.filter(n =>
        n.title.toLowerCase().includes(query) ||
        (n.subject && n.subject.toLowerCase().includes(query)) ||
        (n.description && n.description.toLowerCase().includes(query))
    );

    renderNotes(filtered, "trending", false);
}

// Delete note from database
function deleteNote(id) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes = notes.filter(n => n.id !== id);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotify("Note Deleted");
        refreshAll();
    }
}

// Show purple Toast Notification
function showNotify(text) {
    const box = document.getElementById("notification");
    if (!box) {
        console.error("Notification element not found!");
        return;
    }
    
    box.innerText = text;
    box.style.display = "block";
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        box.style.display = "none";
    }, 3000);
}

// Handle like, dislike, save, or comments actions
function handleAction(id, type) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    let actionMessage = "Action performed";

    if (type === "like") {
        note.likes = (note.likes || 0) + 1;
        actionMessage = "Liked! 🔥";
    } else if (type === "dislike") {
        note.dislikes = (note.dislikes || 0) + 1;
        actionMessage = "Disliked 👎";
    } else if (type === "save") {
        note.isSaved = !note.isSaved;
        actionMessage = note.isSaved ? "Saved to Library 🔖" : "Removed from Library";
    } else if (type === "comment") {
        let msg = prompt("Write your comment:");
        if (msg && msg.trim() !== "") {
            if (!note.comments) note.comments = [];
            note.comments.push(msg.trim());
            actionMessage = "Commented! 💬";
        } else {
            return;
        }
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    showNotify(actionMessage);
    refreshAll();
}

// Load Profile Data from state
function loadProfileData() {
    const profile = JSON.parse(localStorage.getItem("userProfile")) || userProfile;

    document.getElementById("display-name").innerText = profile.name;
    document.getElementById("display-desc").innerText = profile.desc;

    if (profile.profilePic) {
        document.getElementById("profilePic").src = profile.profilePic;
    }
}

// Toggle Profile edit state
function toggleView(view) {
    if (view === 'edit') {
        document.getElementById('profileView').style.display = 'none';
        document.getElementById('profileEdit').style.display = 'block';
        document.getElementById('edit-name').value = document.getElementById('display-name').innerText;
        document.getElementById('edit-desc').value = document.getElementById('display-desc').innerText;
    } else {
        document.getElementById('profileView').style.display = 'block';
        document.getElementById('profileEdit').style.display = 'none';
    }
}

// Save Profile text changes
function saveProfile() {
    const newName = document.getElementById('edit-name').value.trim();
    const newDesc = document.getElementById('edit-desc').value.trim();

    if (!newName) return alert("Name cannot be empty!");
    
    const profile = JSON.parse(localStorage.getItem("userProfile")) || userProfile;
    profile.name = newName;
    profile.desc = newDesc;
    
    localStorage.setItem("userProfile", JSON.stringify(profile));
    
    document.getElementById('display-name').innerText = newName;
    document.getElementById('display-desc').innerText = newDesc;
    
    toggleView('view');
    showNotify("Profile Updated! ✅");
    refreshAll(); // Refresh uploaded notes to match name updates
}

// Upload Profile Photo
function uploadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("profilePic").src = e.target.result;

        const profile = JSON.parse(localStorage.getItem("userProfile")) || userProfile;
        profile.profilePic = e.target.result;
        
        localStorage.setItem("userProfile", JSON.stringify(profile));
        showNotify("Profile picture updated! 📷");
    };
    reader.readAsDataURL(file);
}