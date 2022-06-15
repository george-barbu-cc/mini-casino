function openModal(game) {
    let gameElement = document.querySelector('[data-game-slug="' + game + '"]');
    let gameOptions;

    if (getCookie(cookiename)) {
        setHistoryGame(game);
        gameOptions = {
            title: gameElement.dataset.gameTitle,
            body: 'Game Playing',
            class: 'modal-game',
        };
    } else {
        gameOptions = {
            title: 'Login',
            body: `<div class="user-wrapper" style="display: block;">
                    <form method="POST" action="#" onsubmit="event.preventDefault(); return login(this, '${game}');">
                        <input name="username" class="username" type="text" placeholder="Username" onfocus="loginOnFocus()" value="">
                        <input name="pwd" class="password" type="password" placeholder="Password" onfocus="loginOnFocus()" value="">
                        <button type="submit" class="submit">Log In</button>
                        <span class="error-login"></span>
                    </form>
                </div>`,
            class: 'modal-login',
        };
    }

    let modalHTML = `
        <div class="modal ${gameOptions.class}" id="gamePlay" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">${gameOptions.title}</h4>
                        <button type="button" class="close" data-dismiss="modal" onclick="historyGame()">&times;</button>
                    </div>

                    <div class="modal-body text-center">
                        ${gameOptions.body}
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" class="" data-dismiss="modal" onclick="historyGame()">Stop Play</button>
                    </div>
                </div>
            </div>
        </div>
    `;


    if (document.contains(document.getElementById("gamePlay"))) {
        document.getElementById("gamePlay").remove();
    }
    if (document.contains(document.querySelector(".modal-backdrop"))) {
        document.querySelector(".modal-backdrop").remove();
    }
    document.querySelector("body").innerHTML += modalHTML;

    $('#gamePlay').modal('show');
};