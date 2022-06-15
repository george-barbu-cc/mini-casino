<?php
    /** Show Last Played Games container if player is logged in and hide if not */
    $gamesHistory = $games->getHistoryGamesInit();
    $show = (!empty($gamesHistory)) ? 'block' : 'none';
?>
<div class="account-history" style="display:<?php echo $show; ?>">
    <h2>Last Played Games</h2>
    <button type="button" class="collapsible" onclick="collapseLAstPlayedGames(this)"></button>
    <section class="content-history">
        <ul class="account-history-ul"> </ul>
    </section>
</div>
    