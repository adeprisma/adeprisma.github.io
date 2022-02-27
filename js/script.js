$('.scroll-page').on('click', function(e){
    var link = $(this).attr('href');
    var section = $(link);

    console.log(section.offset().top);
    $('body, html').animate({
        scrollTop: section.offset().top - 50
    }, 1000, 'easeOutBack');

    $('.navbar-collapse').collapse('hide');

    e.preventDefault();
});

window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    var offset = window.pageYOffset;

    if (offset > 75) {
        nav.classList.add('scroll')
    } else {
        nav.classList.remove('scroll')
    }
});