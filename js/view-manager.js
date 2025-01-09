let isManagerView = true;

// Listen for changes in other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'karaokeQueue' || e.key === 'currentSinger') {
        // Reload the data from localStorage
        queue = JSON.parse(localStorage.getItem('karaokeQueue')) || [];
        currentSinger = JSON.parse(localStorage.getItem('currentSinger'));
        
        // Update the appropriate view
        if (isManagerView) {
            updateQueueDisplay();
        } else {
            updateTVDisplay();
        }
    }
});

function toggleView() {
    isManagerView = !isManagerView;
    document.getElementById('managerView').classList.toggle('hidden');
    document.getElementById('tvView').classList.toggle('hidden');
    
    const button = document.querySelector('.view-toggle');
    button.textContent = isManagerView ? 'Switch to TV Display' : 'Switch to Manager View';
    
    // Update the appropriate view
    if (!isManagerView) {
        updateTVDisplay();
    } else {
        updateQueueDisplay();
    }
}

function updateTVDisplay() {
    // Update current singer display
    const currentSingerDiv = document.getElementById('tvCurrentSinger');
    if (currentSinger) {
        const songText = currentSinger.song === 'Click to add song' ? 'No song selected' : currentSinger.song;
        currentSingerDiv.textContent = `${currentSinger.name} - ${songText}`;
    } else {
        currentSingerDiv.textContent = 'No one is currently singing';
    }

    // Update queue display
    const queueList = document.getElementById('tvQueue');
    queueList.innerHTML = '';
    
    queue.forEach((singer, index) => {
        const li = document.createElement('li');
        const songText = singer.song === 'Click to add song' ? 'No song selected' : singer.song;
        li.textContent = `${index + 1}. ${singer.name} - ${songText}`;
        queueList.appendChild(li);
    });
}

// Modify the original updateQueueDisplay to also update TV view if it's active
const originalUpdateQueueDisplay = updateQueueDisplay;
updateQueueDisplay = function() {
    originalUpdateQueueDisplay();
    if (!isManagerView) {
        updateTVDisplay();
    }
};

// Poll for updates every 500ms as a backup
setInterval(() => {
    const newQueue = JSON.parse(localStorage.getItem('karaokeQueue')) || [];
    const newCurrentSinger = JSON.parse(localStorage.getItem('currentSinger'));
    
    // Check if data has changed
    if (JSON.stringify(newQueue) !== JSON.stringify(queue) || 
        JSON.stringify(newCurrentSinger) !== JSON.stringify(currentSinger)) {
        
        queue = newQueue;
        currentSinger = newCurrentSinger;
        if (isManagerView) {
            updateQueueDisplay();
        } else {
            updateTVDisplay();
        }
    }
}, 500); 