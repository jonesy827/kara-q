# Kara-Q

A lightweight, browser-based karaoke queue management system. Kara-Q helps you manage your karaoke party's singing rotation with a clean, simple interface.

## Features

- Add singers to the queue with or without song selections
- Edit song choices for queued singers at any time
- Automatically requeue singers after their performance (optional)
- Track the current performer and upcoming singers
- Remove singers from the queue
- No installation required - runs entirely in the browser
- No backend or database needed - perfect for local karaoke parties
- TV Display mode for showing the queue on a separate screen
- Cross-tab synchronization - manage from one tab, display on another
- Persistent storage - queue state is preserved even if you refresh

## Getting Started

1. Clone this repository or download the files
2. Open `index.html` in your web browser
3. Use the "Switch to TV Display" button to toggle between manager and TV views
4. Open in multiple tabs to use manager view on one device and TV view on another

## Project Structure

```
kara-q/
├── css/
│   ├── styles.css        (manager view styles)
│   └── tv-display.css    (TV display styles)
├── js/
│   ├── queue-manager.js  (core queue functionality)
│   └── view-manager.js   (view switching and TV display)
└── index.html           (main file with both views)
```

## Usage

### Managing the Queue
1. Enter the singer's name (required)
2. Optionally enter their song choice
3. Click "Add to Queue"
4. Use "Next Singer" to move to the next person
5. Toggle "Requeue singer after performance" to automatically add current singer back to rotation
6. Remove any singer using the "Remove" button

### Editing Songs
- Click on any queued singer's song to edit it
- Enter the new song choice
- Press Enter or click Save
- Press Escape to cancel editing

### TV Display
1. Click "Switch to TV Display" in the top-right corner
2. The display automatically updates when changes are made in manager view
3. Open in a separate tab/window to show on a different screen
4. Changes sync automatically between all open tabs

## Technical Details

Kara-Q is built with pure JavaScript, HTML, and CSS. It uses:
- Local storage for persistent state management
- Storage events for cross-tab communication
- Regular polling as a backup sync mechanism
- No external dependencies

## License

MIT License - Feel free to use and modify as needed! 