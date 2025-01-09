// Initialize queue array to store singers and their songs
let queue = JSON.parse(localStorage.getItem('karaokeQueue')) || [];
let currentSinger = JSON.parse(localStorage.getItem('currentSinger')) || null;

// Function to save state to localStorage
function saveState() {
    localStorage.setItem('karaokeQueue', JSON.stringify(queue));
    localStorage.setItem('currentSinger', JSON.stringify(currentSinger));
}

// Function to add a new singer to the queue
function addToQueue() {
    const nameInput = document.getElementById('singerName');
    const songInput = document.getElementById('songTitle');
    
    const name = nameInput.value.trim();
    const song = songInput.value.trim();
    
    if (name === '') {
        alert('Please enter a singer name');
        return;
    }
    
    const singer = {
        id: Date.now(), // Unique ID for each entry
        name: name,
        song: song || 'Click to add song'
    };
    
    queue.push(singer);
    saveState();
    updateQueueDisplay();
    
    // Clear inputs
    nameInput.value = '';
    songInput.value = '';
}

// Function to update song for a queued singer
function updateSong(id) {
    const singer = queue.find(s => s.id === id);
    if (!singer) return;
    
    const songInput = document.getElementById(`song-${id}`);
    singer.song = songInput.value.trim() || 'Click to add song';
    saveState();
    updateQueueDisplay();
}

// Function to make song editable
function makeEditable(id) {
    const singer = queue.find(s => s.id === id);
    if (!singer) return;
    
    const songSpan = document.getElementById(`song-${id}-span`);
    songSpan.innerHTML = `
        <input type="text" id="song-${id}" 
               value="${singer.song === 'Click to add song' ? '' : singer.song}" 
               placeholder="Enter song"
               class="edit-song-input"
               onkeydown="handleEditKeydown(event, ${id})">
        <button onclick="updateSong(${id})" class="save-btn">Save</button>
    `;
    
    // Set focus after creating the input
    const input = document.getElementById(`song-${id}`);
    input.focus();
    
    // Stop the click event from bubbling up
    songSpan.onclick = (e) => {
        e.stopPropagation();
    };
}

// Handle keyboard events for the edit input
function handleEditKeydown(event, id) {
    if (event.key === 'Enter') {
        updateSong(id);
    } else if (event.key === 'Escape') {
        updateQueueDisplay(); // Cancel edit
    }
    event.stopPropagation();
}

// Function to update the queue display
function updateQueueDisplay() {
    const queueList = document.getElementById('queue');
    queueList.innerHTML = '';
    
    queue.forEach((singer, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="singer-info">
                <span>${index + 1}. ${singer.name} - </span>
                <span id="song-${singer.id}-span" 
                      class="song-span ${singer.song === 'Click to add song' ? 'no-song' : ''}" 
                      onclick="makeEditable(${singer.id})">
                    ${singer.song}
                    ${singer.song === 'Click to add song' ? ' 📝' : ' (click to edit) ✏️'}
                </span>
            </div>
            <button onclick="removeSinger(${singer.id})" class="remove-btn">Remove</button>
        `;
        queueList.appendChild(li);
    });
    
    // Update current singer display
    const currentSingerDiv = document.getElementById('currentSinger');
    if (currentSinger) {
        const songText = currentSinger.song === 'Click to add song' ? 'No song selected' : currentSinger.song;
        currentSingerDiv.textContent = `${currentSinger.name} - ${songText}`;
    } else {
        currentSingerDiv.textContent = 'No one is currently singing';
    }
}

// Function to move to the next singer
function nextSinger() {
    const shouldRequeue = document.getElementById('requeue').checked;
    
    // If there's a current singer and requeue is checked, add them back to the queue
    if (currentSinger && shouldRequeue) {
        const requeuedSinger = {
            id: Date.now(),
            name: currentSinger.name,
            song: 'Click to add song' // Reset song when requeuing
        };
        queue.push(requeuedSinger);
    }
    
    if (queue.length === 0) {
        currentSinger = null;
        saveState();
        updateQueueDisplay();
        return;
    }
    
    currentSinger = queue.shift();
    saveState();
    updateQueueDisplay();
}

// Function to remove a specific singer from the queue
function removeSinger(id) {
    queue = queue.filter(singer => singer.id !== id);
    saveState();
    updateQueueDisplay();
}

// Initialize the display
updateQueueDisplay(); 