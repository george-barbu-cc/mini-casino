// load games by category on HomePage
async function gamesCategoriesHomepage(gamesLimit) {
    await fetch(api('getGamesCategories'))
        .then((resp) => resp.json())
        .then(function (categories) {
            categories.forEach(category => {
                categoryTab(category, gamesLimit);
            });
        });
}

// function for generate wrapper for each game html
function categoryTabHTML(categoryName, categoryGames, gamesLimit) {
    let vieGames = (gamesLimit < 1000) ? '<a href="' + categoryName + '">View All</a>' : '';
    if (categoryGames[categoryName]) {
        let categoryTabHTMLul = '';
        categoryTabHTMLul += `
            <section>
                <h2>${categoryName}<span>${categoryGames[categoryName].length}</span>${vieGames}</h2>
                <ul class="default-gb-flex-grid" data-games-category="${categoryName}"> </ul>
            </section>
        `;

        document.querySelector('#games-container').innerHTML += categoryTabHTMLul;
        document.querySelectorAll('[data-games-category="' + categoryName + '"]').forEach(categoryGamesSection => {
            categoryGamesSection.innerHTML = categoryTabHTMLulli(categoryGames, gamesLimit);
        });
    } else {
        document.querySelector('#games-container').innerHTML = 'Page not Found';
    }
}

// function for generate each game html
function categoryTabHTMLulli(games, gamesLimit = 1000) {
    var categoryTabHTMLliElement = '';
    let icounter = '';
    let dateToCheck = new Date('2018-01-01 00:00:00');
    let thirtyDaysInMilliseconds = 2592000000;
    for (const [key, categoryGames] of Object.entries(games)) {
        let i = 1;
        categoryGames.forEach(game => {
            let gameDate = new Date(game.created);
            if (icounter < gamesLimit) {
                let gameImageUrl = game.image;
                let wideImageUrl = gameImageUrl.replace("game-icon", "game-icon-wide");
                // check game has less that 30 days from date provided for New Games (dateToCheck)
                let newGameTag = dateToCheck.getTime() - gameDate.getTime() < thirtyDaysInMilliseconds;
                newGameTag = (newGameTag) ? '<span class="new-game">NEW</span>' : '';
                categoryTabHTMLliElement += `
                    <li class="default-gb-flex-grid__item">
                        <a href="javascript:void(0)">
                            <img class="grid" loading="lazy" src="${gameImageUrl}">
                            <img class="wide" loading="lazy" src="${wideImageUrl}">
                            ${newGameTag}
                            <span class="info">
                                <span class="title">${game.name}</span>
                                <button type="button" class="btn action" data-game-title="${game.name}"  data-game-slug="${game.slug}" onclick="openModal(\'${game.slug}\')">Play Now</button>
                            </span>
                        </a>
                    </li>
                `;

                icounter = i++;
            }
        });
    }
    return categoryTabHTMLliElement;
}

// get games for category tab
async function categoryTab(category, gamesLimit) {
    await fetch(api('getGamesByCategories', category))
        .then((resp) => resp.json())
        .then(function (games) {
            categoryTabHTML(category, games, gamesLimit);
        })
        .then(function () {
            if (document.getElementById('loader')) {
                document.getElementById('loader').remove();
            }
        });
};


// Search game by name 
const searchGamesByName = function (name) {
    let searchULContent, icounter = '';
    let searchResults = document.getElementById('search--results');
    let searchUL = document.querySelector(".search--results-ul");

    searchResults.style.display = 'block';
    window.addEventListener('click', function (e) {
        if (!searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        } else {
            document.getElementById('search--results').removeAttribute('style');
        }
    });

    fetch(api('searchGamesByName', name))
        .then((response) => response.json())
        .then(function (games) {
            searchUL.innerHTML = '';
            if (games.length == 0) {
                searchUL.innerHTML = '<li class="text-left" style="padding-left: 45px!important;">Type to Search</li>';
            } else {
                let i = 1;
                games.forEach(game => {
                    searchULContent += `<li>
                        <span data-game-title="${game.name}" data-game-slug="${game.slug}" onclick="openModal('${game.slug}')">
                            <img src="${game.image}">
                            <span>${game.name}</span>
                        </span>
                    </li>`;
                    icounter = i++;
                });
                if (icounter == games.length) {
                    searchUL.innerHTML = searchULContent;
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

// Switch between grid and layout
const filterGrid = function (grid) {
    let gameClassFilter = grid.parentNode.getAttribute("data-grid");

    document.querySelectorAll('.' + grid.parentNode.classList[1]).forEach(filter => {
        filter.classList.remove("active");
    });
    grid.parentNode.classList.add("active");

    document.querySelectorAll("ul[class*=-gb-flex-grid]").forEach(sectionsClass => {
        sectionsClass.classList = '';
        sectionsClass.classList = gameClassFilter + '-gb-flex-grid';
    });
    document.querySelectorAll("li[class*=-gb-flex-grid]").forEach(gameClass => {
        gameClass.classList = '';
        gameClass.classList = gameClassFilter + '-gb-flex-grid__item';
    });
};