<section class="header-bar">
		<div class="inner">
			<a id="logo" href="https://www.32red.com">
				<picture>
					<img src="https://static.32red.com/img/logo.svg?1612952721" alt="">
				</picture>
			</a>
			<div class="user-area">
				<div class="user-wrapper">
					<form method="POST" action="#" onsubmit="event.preventDefault(); return login(this);">
						<input name="username" class="username" type="text" placeholder="Username" value="">
						<input name="pwd" class="password" type="password" placeholder="Password" value="">
						<button type="submit" class="login">Log In</button>
						<span class="error-login"></span>
					</form>
				</div>
				<div class="user-wrapper-logged"></div>
			</div>
		</div>
	</section>

	<section class="filters">
		<nav class="tags menu">
			<ul>
				<li class="menu--link active"><a href="/"  data-category="casino" class="icon-casino casino-tab">Casino</a></li>
				<?php  
					foreach ($games->get_categories() as $key => $category) {
						$category = ltrim($category);
						$category = str_replace(' ', '-', $category);
						$category = strtolower($category);
						echo '<li class="menu--link"><a href="/'.$category.'" class="icon-'.$category.'" data-category="'.$category.'">'.$category.'</a></li>';
					}				
				?>
			</ul>
		</nav>
		<nav class="menu">
		<input type="checkbox" id="searchToggle" class="invis">
			<ul>
				<li class="menu--link group-grid active" data-grid="default" ><a href="javascript:void(0)" onclick="filterGrid(this)" class="icon-grid"></a></li>
				<li class="menu--link group-grid" data-grid="wide"><a href="javascript:void(0)"  onclick="filterGrid(this)" class="icomoon icom-menu"></a></li>
				<li class="search--wrapper">
					<div class="search--box">
						<label for="searchToggle" class="search--link"><i class="icon-search"></i></label>
						<form action="#" method="GET" id="search-form" class="search" autocomplete="off">
							<input id="gamename" name="gamename" type="text" placeholder="Search Games" oninput="searchGamesByName(this.value)">
							<label for="searchToggle"><i class="icon-close"></i></label>
						</form>
						<div class="search--results" id="search--results">
							<ul class="search--results-ul"></ul>
						</div>
					</div>
					
				</li>
			</ul>
		</nav>
	</section>
