$('.scroll-page').on('click', function(e){
    var link = $(this).attr('href');
    var section = $(link);

    console.log(section.offset().top);
    $('body, html').animate({
        scrollTop: section.offset().top - 50
    }, 600, 'easeInBack');

    e.preventDefault();
});