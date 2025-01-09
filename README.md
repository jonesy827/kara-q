# 🎤 Kara-Q

A lightweight, browser-based karaoke queue management system. Kara-Q helps you manage your karaoke party's singing rotation with a clean, simple interface.

## Features

- Add singers to the queue with or without song selections
- Edit song choices for queued singers at any time
- Automatically requeue singers after their performance (optional)
- Track the current performer and upcoming singers
- Remove singers from the queue
- No installation required - runs entirely in the browser
- No backend or database needed - perfect for local karaoke parties

## Getting Started

1. Clone this repository or download the files:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in your web browser

That's it! You're ready to manage your karaoke queue.

## Usage

### Adding Singers
1. Enter the singer's name (required)
2. Optionally enter their song choice
3. Click "Add to Queue"

### Managing the Queue
- Click "Next Singer" to move to the next person in the queue
- Use the "Requeue singer after performance" checkbox to automatically add the current singer back to the rotation
  - When requeued, the singer's song choice is cleared for their next turn
- Remove any singer from the queue using the "Remove" button next to their name

### Editing Songs
- Click on any queued singer's song to edit it
- Enter the new song choice
- Click "Save" to update the song
- The song text is clickable and will highlight on hover

## Technical Details

Kara-Q is built with pure JavaScript, HTML, and CSS. It uses browser-local state management, making it perfect for single-session use with no setup required.

## License

MIT License - Feel free to use and modify as needed! 