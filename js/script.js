$('.scroll-page').on('click', function(e){
    var link = $(this).attr('href');
    var section = $(link);

    console.log(section.offset().top);
    $('body, html').animate({
        scrollTop: section.offset().top - 50
    }, 1700, 'easeInOutBack');

    $('.navbar-collapse, .in').collapse('hide');
    $('nav, navbar').removeClass('toggle-click');

    // e.preventDefault();
});


$('button, .navbar-toggle').on('click', function(e) {
    $('nav, navbar').toggleClass('toggle-click');
    $('#navbar-collapse-1').css('padding-top', '20vh');
    // $('nav, navbar').css({'height': '100vh'});
});

$( document ).ready(function() {
    $('.edu').append('<div class="dot dot-right"></div>', '<div class="line line-right"></div>');
    $('.work-ex').append('<div class="dot dot-left"></div>', '<div class="line line-left"></div>');
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