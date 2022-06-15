(function () {
    //check page url for load category 
    var categoryLink = window.location.pathname;
    var categoryName = categoryLink.substring(1).replace(/[^A-Z0-9]/ig, "-");
    if (categoryName.length > 0) {
        categoryTab([categoryName]);
    } else {
        gamesCategoriesHomepage(8);
    }

    // check if username exist in cookie for login
    checkUsername();

    //add jquery just for refference
    // Add Active class for current category
    $('.tags ul').find('a').each(function () {
        $(this).parent().toggleClass('active', $(this).attr('href') == window.location.pathname);
    });

}());