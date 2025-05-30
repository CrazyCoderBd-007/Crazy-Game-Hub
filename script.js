document.addEventListener('DOMContentLoaded', () => {
    const gameListContainer = document.getElementById('game-list');
    const addGameModal = document.getElementById('addGameModal');
    const showAddGameModalBtn = document.getElementById('showAddGameModalBtn');
    const closeModalBtn = document.querySelector('.modal .close-btn');
    const addGameForm = document.getElementById('addGameForm');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Initial Games Data ---
    // Try to load games from localStorage, otherwise use defaults
    let games = JSON.parse(localStorage.getItem('crazyGameHubGames')) || [
        {
            id: 1,
            title: "Retro Ping Pong",
            description: "A classic arcade game. Keep the ball in play!",
            url:"https://poki.com/en/g/ping-pong-html5#fullscreen", // Replace with actual game link
            imageUrl: "images/placeholder.png" // Create this image or use a direct link
        },
        {
            id: 2,
            title: "Snake Online",
            description: "Eat the dots, grow your snake, don't hit the walls or yourself.",
            url: "https://www.google.com/search?q=play+snake+online", // Replace with actual game link
            
        },
        {
            id: 3,
            title: "2048 Puzzle",
            description: "Slide tiles to combine numbers and reach the 2048 tile.",
            url: "https://play2048.co/",
            
        },
        {
            id: 4,
            title: "subway-surfers",
            description: "A classic arcade game. Keep the ball in play.",
            url: "https://freeonlinegames.github.io/subway-surfers-tokyo/",
            
        }
    ];

    const defaultImageUrl = 'https://imgur.com/'; // Path to your placeholder

    // --- Render Games ---
    function renderGames() {
        if (!gameListContainer) return;
        gameListContainer.innerHTML = ''; // Clear existing games

        if (games.length === 0) {
            gameListContainer.innerHTML = '<p style="text-align:center; grid-column: 1 / -1;">No games available yet. Add some or request new ones!</p>';
            return;
        }

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            gameCard.innerHTML = `
                <img src="${game.imageUrl || defaultImageUrl}" alt="${game.title}" onerror="this.onerror=null;this.src='${defaultImageUrl}';">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <a href="${game.url}" target="_blank" class="play-button">Play Game</a>
            `;
            gameListContainer.appendChild(gameCard);
        });
    }

    // --- Save Games to LocalStorage ---
    function saveGames() {
        localStorage.setItem('crazyGameHubGames', JSON.stringify(games));
    }

    // --- Modal Logic ---
    if (showAddGameModalBtn) {
        showAddGameModalBtn.onclick = () => {
            addGameModal.style.display = 'block';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.onclick = () => {
            addGameModal.style.display = 'none';
        }
    }

    window.onclick = (event) => {
        if (event.target == addGameModal) {
            addGameModal.style.display = 'none';
        }
    }

    // --- Add Game Form Submission ---
    if (addGameForm) {
        addGameForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const title = document.getElementById('gameTitle').value;
            const description = document.getElementById('gameDescription').value;
            const url = document.getElementById('gameUrl').value;
            const imageUrl = document.getElementById('gameImageUrl').value;

            const newGame = {
                id: games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1, // Simple ID generation
                title,
                description,
                url,
                imageUrl: imageUrl || defaultImageUrl
            };

            games.push(newGame);
            saveGames(); // Save to localStorage
            renderGames(); // Re-render the list
            addGameForm.reset(); // Clear the form
            addGameModal.style.display = 'none'; // Close modal
        });
    }

    // --- Initial Render ---
    renderGames();
});
