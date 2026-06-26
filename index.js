let gamesData = [];

function sortGames(filter, gamesData) {
    let gamesSorted;

    if (filter === "A_TO_Z") {
        gamesSorted = gamesData.sort((a, b) => a.title.localeCompare(b.title));
        return gamesSorted;
    } else if (filter === "Z_TO_A") {
        gamesSortedReverse = gamesData.sort((a, b) => b.title.localeCompare(a.title));
        return gamesSortedReverse;
    } 

}

function handleSearch(query) {
  const q = query.toLowerCase();
  const filtered = gamesData.filter((game) =>
    game.title.toLowerCase().includes(q) ||
    game.genre.toLowerCase().includes(q) ||
    game.platform.toLowerCase().includes(q)
  );
  renderGames(filtered);
}

function goToSearch() {
  const query = document.getElementById('search-input').value;
  window.location.href = `./games.html?search=${encodeURIComponent(query)}`;
}

async function main() {
  const response = await fetch("https://www.freetogame.com/api/games");
  gamesData = await response.json();
  renderGames(gamesData);
}

function renderGames(games) {
  const gamesListEl = document.querySelector('.game-list');
  gamesListEl.innerHTML = games.map((game) => gamesHTML(game)).join("");
}

function handleSort(filter) {
  const sorted = sortGames(filter, gamesData);
  renderGames(sorted);
}

main();



function gamesHTML(game) {
    return `<div class="game-card" onclick="gameData(${game.id})">
            <div class="game-card__container">
              <h3>${game.title}</h4>
                <p><b>Platform:</b>${game.platform}</p>
                <p><b>Genre:</b> ${game.genre}</p>
                <p><b>FreetoGame Profile URL:</b> <a href="https://${game.freetogame_profile_url}" target="_blank">${game.freetogame_profile_url}</a></p>
            </div>
          </div>`
}

function goToSearch() {
  const query = document.getElementById('search-input').value;
  window.location.href = `./games.html?search=${encodeURIComponent(query)}`;
}

