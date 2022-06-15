<?php
// (A) ERROR REPORTING
// error_reporting(E_ALL & ~E_NOTICE);
// error_reporting(0);

// (B) DATABASE SETTINGS
defined('DB_HOST') ? null : define('DB_HOST', 'localhost');
defined('DB_NAME') ? null : define('DB_NAME', '32red_casino');
defined('DB_CHAR') ? null : define('DB_CHAR', 'utf8');
defined('DB_USER') ? null : define('DB_USER', 'root');
defined('DB_PASS') ? null : define('DB_PASS', '');


// (C) FILE PATHS
defined('PATH') ? null : define("PATH", realpath(dirname(__DIR__)) . DIRECTORY_SEPARATOR);
defined('PATH_VIEWS') ? null : define("PATH_VIEWS", dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Views' . DIRECTORY_SEPARATOR);


defined('GAMESJSON') ? null : define('GAMESJSON', PATH . 'web' . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'games.json');

/** Instantiate all classes to be available on globals file included */
foreach (glob("Controllers/*.php") as $filename) {
    include $filename;
}


?>