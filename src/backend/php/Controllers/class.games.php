
<?php 
require_once ('class.database.php');
class Games {

    private $source;
    protected $gamesData = array();
    protected $categories = array();

    /*
    ** We accept new games added will be vissible on a new session
    ** Gain more free server resources for new visitiors
    */
    public function __construct() {
        $this->source = GAMESJSON;

        if(isset($_SESSION['gamesData'])){
            $this->gamesData = $_SESSION['gamesData'];
            $this->gamesCategories = $_SESSION['categories'];
        } else {
            $this->gamesData = $this->getGamesDataInit($this->source);
            $this->gamesCategories = $this->getGamesCategoriesInit($this->gamesData);
        } 
    }

    /*
     * * Get Games List
     * *
    */
    public function get_gamesData() {
        return $this->gamesData;
    }

    /*
     * * Get Games Categories
     * *
    */
    public function get_categories() {
        return $this->gamesCategories;
    }


     /**
     * Get History Games of Authenthificated User
     *
     * 
     * @return          array of last 16 games played by User
     * @see             Use EX: getHistoryGamesInit();
     */ 
    public static function getHistoryGamesInit(){
        $response = array();
        if(isset($_COOKIE['username'])) {
            $stmt = DB::run("SELECT game_name FROM 32red_user_history WHERE username=? ORDER BY date_play DESC LIMIT 16", [$_COOKIE['username']] );
            while ($row = $stmt->fetch(PDO::FETCH_LAZY)) { 
                $response[] = $row->game_name;
            }

            $response = array_filter($response);
            $response = array_unique($response);
            $response = array_values($response);
        } else {
            $response = false;
        }
        return $response;
    }

     /**
     * Set History Games for Authenthificated User
     *
     * @param string    $gameName name of Game
     * 
     * @return          Response PDO Code
     * @see             Use EX: setHistoryGamesInit('game name');
     */ 
    public static function setHistoryGamesInit($gameName){
        $stmt = DB::prepare("INSERT INTO 32red_user_history VALUES (NULL, ?, ?, NOW())");
        $stmt->execute([$_COOKIE['username'], $gameName]);
        return $stmt->errorCode();
    }

    /**
     * Get Games by Category
     *
     * @param object    $games games list
     * @param string    $category name of category
     * 
     * @return          array Games Category  
     * @see             Use EX: $blackjack = getGamesByCategoriesInit(['poker', 'jackpot']);
     */ 
    public function getGamesByCategoriesInit($categories){ 
        $categories = is_array($categories) ? $categories : explode(',', $categories);
        $gamesCategory = array();

        if(is_array($categories)) {
            foreach ($categories as $ckey => $category){
                foreach ($this->gamesData as $gkey => $game){
                    if (strpos($game['tags'], $category) !== false) {
                        $gamesCategory[$category][] = $game;
                    }
                }
            }
            return $gamesCategory;
        } else {
            return 'No categories';
        }    
    }


    /**
     * Search Games by Name
     *
     * @param string    $name name of game
     * 
     * @return          array Games Data  
     * @see             Use EX: searchGamesByNameInit('Thunderstruck');
     */ 
    public function searchGamesByNameInit($name){ 
        $search = array();
        foreach ($this->gamesData as $ckey => $game){ 
            if (stripos($game['name'], ltrim($name)) !== false) {
                $search[] = $game;
            } 
        }

        return $search;
    }

     /**
     * Search Games by or Slug
     *
     * @param string    $slug slug of game
     * 
     * @return          object Game Data
     * @see             Use EX: searchGamesBySlugInit('thunderstruck_2');
     */ 
    public function searchGamesBySlugInit($slug){ 
        $search = array();
        foreach ($this->gamesData as $ckey => $game){ 
            if ($game['slug'] == ltrim($slug)) {
                $search = $game;
            } 
        }

        return $search;
    }


    /**
     * Set Games List
     *
     * @param object    $source source for games list
     * 
     * @return          object all Games Data
     * @see             Use EX: getGamesDataInit();
     */ 
    private function getGamesDataInit() {
        $data = file_get_contents($this->source);
        $gamesDataJson = json_decode($data, 1);
        if(count($gamesDataJson) != 0 ) {
            return $gamesDataJson;
        } else {
            return false;
        }
    }

    /**
     * Get Games Categories
     * 
     * @return          array all games uniqu categories
     * @see             Use EX: getGamesCategoriesInit();
     */ 
    private function getGamesCategoriesInit(){

        if($this->gamesData === false ) {
            return false;
        }

        $categories_string = '';
        $categories = array();

        foreach ($this->gamesData as $key => $game){
            $categories_string .= $game["tags"] . ',';
        }

        $categories = explode(',', $categories_string);
        $categories = array_filter($categories);
        $categories = array_unique($categories);
        $categories = array_values($categories);
    
        return $categories;
    }
}

$games =  new Games();

?>