// js for menu link click
$('.scroll-page').on('click', function(e){
    var link = $(this).attr('href');
    var section = $(link);

    $('body, html').animate({
        scrollTop: section.offset().top - 50
    }, 1600, 'easeOutBounce');

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
    var btnUp = document.querySelector('.button-up');
    var offset = window.pageYOffset;

    if (offset > 75) {
        nav.classList.add('scroll');
        btnUp.style.transform = 'scale(1)';
    } else {
        nav.classList.remove('scroll');
        btnUp.style.transform = 'scale(0)';
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

// js for send email
document.querySelector('.contact-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get input values
    let name = document.querySelector('.name').value;
    let phoneNumber = document.querySelector('.phoneNumber').value;
    let email = document.querySelector('.email').value;
    let subject = document.querySelector('.subject').value;
    let message = document.querySelector('.message').value;
    let result = document.querySelector('.resultForm');

    sendEmail(name, phoneNumber, email, subject, message);
}

function sendEmail(name, phoneNumber, email, subject, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'adeprisma7@gmail.com',
        Password: 'kcpvutnjeunyfutt',
        To: 'adeprisma7@gmail.com',
        From: email,
        Subject: `[📩ADEPRISMA.GITHUB.IO] ${subject}`,
        Body: `Name: ${name} <br>Phone Number: ${phoneNumber} <br>Email: ${email} <br>Message: ${message}`,
    }).then((message) => alert("mail sent succesfully"))
}