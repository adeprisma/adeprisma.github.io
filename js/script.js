// js for menu link click
$('.scroll-page').on('click', function(e){
    var link = $(this).attr('href');
    var section = $(link);

    $('body, html').animate({
        scrollTop: section.offset().top - 50
    }, 1700, 'easeInOutBack');

    $('.navbar-collapse, .in').collapse('hide');
    $('nav, navbar').removeClass('toggle-click');

    // e.preventDefault();
});

//  js for button navbar
$('.navbar-toggle').on('click', function(e) {
    $('nav').toggleClass('toggle-click');
    $('#navbar-collapse-1').css('margin-top', '25vh');
});

// js for showing dot & line in resume page
$( document ).ready(function() {
    $('.edu').append('<div class="dot dot-right"></div>', '<div class="line line-right"></div>');
    $('.work-ex').append('<div class="dot dot-left"></div>', '<div class="line line-left"></div>');
});

// js for trasnparent while in top offset
window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    var offset = window.pageYOffset;

    if (offset > 75) {
        nav.classList.add('scroll')
    } else {
        nav.classList.remove('scroll')
    }
});

//js for contact form
var group = document.getElementsByClassName('form-group');
for(var i = 0; i < group.length; i++){
    group[i].onclick = addLabelActiveClass;// group listenere ends
    var input = group[i].getElementsByClassName('form-control')[0];
    
    input.onblur = removeLabelActiveClass;
    input.onfocus = callLabelActiveClass;
  
  
}//end for loop
function callLabelActiveClass(){
    addLabelActiveClass.call(this.parentNode);
}
function addLabelActiveClass(){
    var label = this.getElementsByTagName('label')[0];
    var input = this.getElementsByClassName('form-control')[0];
    if (!label.classList.contains('style')) {
        label.classList.add('style');
        input.focus();
    }
 }

function removeLabelActiveClass(){
  //only move label back if input is empty
    if(this.value===""){
        var label = this.parentNode.children[0];

        if(label.classList.contains('style')) {
            label.classList.remove('style');
        }
    }
}