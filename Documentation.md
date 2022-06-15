## Implementation List

- [x] Add filters based on games tags
- [x] Categorize the games based on tags.
- [x] Add a "search" feature so the user can search for a game by name
- [x] Improve the basic display of the game items, including hover status
- [x] Display the game name and/or description
- [x] Display a "NEW" sticker on any games published in the last X months
- [ ] Paginate the games to show page by page (allow the user to change the page, prev/next)
- [ ] Implement an "infinite scroll" where it loads the games as required
- [ ] Order the games by... date created, alphabetically, rtp, or whatever criteria you like
- [x] Display the games in... circles, hexagons, 3d cubes

- [x] Have the clicks ("plays") on the games recorded and remembered, so you can display the user's recently played games
- [x] Do the filtering and sorting on the server side

## Areas to improve

- [ ] Add infinite Scroll
- [ ] Lazy loading for all games Images
- [ ] Add games Data to sesionstorage / localstorage
- [ ] Tweak and Tweets on Desin (Adding games to History Arrea more smoothly)
- [ ] Change GET method to POST for API /api/games.php?f=setHistoryGames&p=slug

# Features

####Login

- For Login User you need any username and password + **Username Validation**
  `username can be reused to see Games History` + not blanck + letters + underscores + numbers digit + **Password Validation**
  `password it's not required to be same each time` + minimum 6 characters + minimum 1 number digit + minimum 1 uppercase letter + minimum 1 lowercase letter

####Game Play

- For Game to Play Loged in User is required
  - **Case 1**
    - Login on top page form
    - Click Play Now on Game
  - **Case 2**
    - Click Play Now on Game
    - Login Pop-up will show
    - Login user
    - Game Pop-up will show
