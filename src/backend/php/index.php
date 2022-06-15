<?php require_once(__DIR__ . DIRECTORY_SEPARATOR . 'Includes' . DIRECTORY_SEPARATOR . 'globals.php'); ?>
<!doctype html>
<html lang="en">
    <?php require_once(PATH_VIEWS . 'shared' . DIRECTORY_SEPARATOR . 'layout' . DIRECTORY_SEPARATOR . 'parts' . DIRECTORY_SEPARATOR . 'head.php'); ?>
    <?php require_once(PATH_VIEWS . 'shared' . DIRECTORY_SEPARATOR . 'layout' . DIRECTORY_SEPARATOR . 'header.php'); ?>
    <body>
        <?php require_once(PATH_VIEWS . 'components' . DIRECTORY_SEPARATOR . 'gamesContainer.php'); ?>
    </body>
    <?php require_once(PATH_VIEWS . 'components' . DIRECTORY_SEPARATOR . 'gamesContainerHistory.php'); ?>
    <?php require_once(PATH_VIEWS . 'shared' . DIRECTORY_SEPARATOR . 'layout' . DIRECTORY_SEPARATOR . 'footer.php'); ?> 
</html>