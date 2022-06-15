
<?php 
session_start();
ob_start();

require_once (dirname(__DIR__, 1) . DIRECTORY_SEPARATOR .'Includes' . DIRECTORY_SEPARATOR . 'globals.php');
require_once (dirname(__DIR__, 1) . DIRECTORY_SEPARATOR .'Controllers' . DIRECTORY_SEPARATOR . 'class.games.php');

/** Get function and parameters from GET Call */
if (isset($_GET['f'])) {
    if (isset($_GET['p'])) { 
        if(function_exists($_GET['f'])) {
            $_GET['f']($_GET['p']);
        }
    } else {
        if(function_exists($_GET['f'])) {
            $_GET['f']();
        }
    }
}

/** Get all games Data */
function getGamesData() {
    global $games;
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($games->get_gamesData());
}

/** Get all games unique categories that exist in json */
function getGamesCategories(){ 
    global $games;
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($games->get_categories());
}

/** Get all games unique  by categories p=category1,category2 */
function getGamesByCategories($categories){ 
    global $games;
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($games->getGamesByCategoriesInit($categories));  
}

/** Get all games contains $name p=Game Name */
function searchGamesByName($name){
    global $games;
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($games->searchGamesByNameInit($name));
}

/** Get all games by $slug p=game_slug */
function searchGamesBySlug($slug){
    global $games;
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($games->searchGamesBySlugInit($slug));
}

/** Get all played games by logged user */
function getHistoryGames(){
    global $games;
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($games->getHistoryGamesInit());
}

/** Set game played for logged user  p=Game Name */
function setHistoryGames($gameName){
    global $games;
    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($games->setHistoryGamesInit($gameName));
}


die();

?>