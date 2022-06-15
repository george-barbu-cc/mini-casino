<?php

class DB {
    protected static $instance = null;

    public static function instance()  {
        if (self::$instance === null) {
            $opt  = array(
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => FALSE,
            );
            $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset='.DB_CHAR;
            self::$instance = new PDO($dsn, DB_USER, DB_PASS, $opt);
            self::checkInstallTable();
        }
        return self::$instance;
    }

    /** Check if table exist in DB, if not Create */
    public static function checkInstallTable() {
        $stmt = self::run("SHOW TABLES LIKE '32red_user_history'");
        $_32red_user_history = $stmt->fetch(PDO::FETCH_LAZY);

        if(!$_32red_user_history) {
            self::query("CREATE TABLE 32red_user_history (id int auto_increment primary key, username varchar(255), game_name varchar(255), date_play datetime)");
        }
    }

    public static function __callStatic($method, $args) {
        return call_user_func_array(array(self::instance(), $method), $args);
    }

    public static function run($sql, $args = []) {
        if (!$args) {
             return self::instance()->query($sql);
        }
        $stmt = self::instance()->prepare($sql);
        $stmt->execute($args);
        return $stmt;
    }

}

?>