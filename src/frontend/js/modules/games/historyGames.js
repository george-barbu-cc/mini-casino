// function for generate each game html
function historyGame() {
    var historyGameLi = '';
    let icounter = '';
    let i = 1;
    let history = document.querySelector(".account-history");
    let historyUL = document.querySelector(".account-history-ul");
    historyUL.innerHTML = '';

    fetch(api('getHistoryGames'))
        .then((response) => response.json())
        .then(function (slugs) {
            if (slugs.length) {
                slugs.forEach(slug => {
                    fetch(api('searchGamesBySlug', slug))
                        .then((response) => response.json())
                        .then(function (game) {
                            historyGameLi += `
                                    <li class="flex-grid-12__item">
                                        <a href="javascript:void(0)">
                                            <img class="grid" loading="lazy" src="${game.image}">
                                            <span class="info">
                                                <button type="button" class="btn action" data-game-title="${game.name}" data-game-slug="${game.slug}" onclick="openModal('${game.slug}')">Play Now</button>
                                            </span>
                                        </a>
                                    </li>
                                `;
                            historyUL.innerHTML = historyGameLi;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    icounter = i++;
                });
                history.style.display = "block";
            } else {
                history.style.display = "none";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}


// function for generate each game html
function setHistoryGame(game) {
    fetch(api('setHistoryGames', game))
        .then((resp) => resp.json())
        .then(function (response) {})
        .catch(function (error) {
            console.log(error);
        });


    console.log(game);
}


/** Show/Hide Last Games Played */
function collapseLAstPlayedGames($this) {
    $this.classList.toggle("active");
    var content = $this.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = (content.scrollHeight + 10) + "px";
    }
}