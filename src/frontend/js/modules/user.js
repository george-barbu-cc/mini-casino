const logOut = function () {
    deleteCookie(cookiename);
    checkUsername();
}

const checkUsername = function () {
    let accountHistory = document.querySelector(".account-history");

    if (getCookie(cookiename)) {
        historyGame();
        document.querySelector(".user-wrapper-logged").innerHTML = `Hello <b id="username">${getCookie(cookiename)}</b><button type="submit" class="submit" onclick="logOut()">Log Out</button>`;
        document.querySelector(".user-wrapper-logged").style.display = "block";
        document.querySelector(".user-wrapper").style.display = "none";
    } else {
        document.querySelector(".user-wrapper").style.display = "block";
        document.querySelector(".user-wrapper-logged").style.display = "none";
        if (accountHistory) {
            accountHistory.style.display = "none";
        }
    }
};

const loginOnFocus = function () {
    document.querySelector('.error-login').style.display = 'none';
};


const loginUsername = function (username, game = false) {
    setCookie(cookiename, username, '365');
    checkUsername();
    if (game) {
        openModal(game);
    }
};


function login(form, game = false) {

    var errorContainer = form.getElementsByClassName("error-login")[0];
    let errorHandler = (errorMessage) => {
        errorContainer.innerHTML = errorMessage;
        errorContainer.style.display = "block";
    };


    if (form.username.value == "") {
        errorHandler("Error: Username cannot be blank!");
        return false;
    }

    let re = /^\w+$/;
    if (!re.test(form.username.value)) {
        errorHandler("Error: Username must contain only letters, numbers and underscores!");
        return false;
    }


    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    if (passw.test(form.pwd.value)) {
        loginUsername(form.username.value, game);
        return true;
    } else {
        if (!/[a-zA-Z0-9]{6,}/.test(form.pwd.value)) {
            return errorHandler("Try add more than 5 characters");
        } else if (!/(?=.*[a-z])/.test(form.pwd.value)) {
            return errorHandler("Try adding an lowercase letter");
        } else if (!/(?=.*[A-Z])/.test(form.pwd.value)) {
            return errorHandler("Try adding an uppercase letter");
        } else if (!/(?=.*\d)/.test(form.pwd.value)) {
            return errorHandler("Try adding an number digit");
        }
        return false;
    }

}