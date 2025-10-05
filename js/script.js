// js for menu link click
$('.scroll-page').on('click', function (e) {
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
$('.navbar-toggle').on('click', function (e) {
    $('nav').toggleClass('toggle-click');
    $('#navbar-collapse-1').css('margin-top', '25vh');
});

// js for showing dot & line in resume page
$(document).ready(function () {
    $('.edu').append('<div class="dot dot-right"></div>', '<div class="line line-right"></div>');
    $('.work-ex').append('<div class="dot dot-left"></div>', '<div class="line line-left"></div>');

    // Tombol "Load More" untuk portofolio
    $('#loadMoreBtn').on('click', function(e) {
        e.preventDefault();
        $('.portfolio-item:hidden').slideDown(500); // Menampilkan item tersembunyi dengan animasi
        $(this).fadeOut(300); // Menghilangkan tombol setelah diklik
    });
});

// js for trasnparent while in top offset
window.addEventListener('scroll', function () {
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

$(group).each(function (key, element) {
    element.onclick = addLabelActiveClass;// group listenere ends
    var input = element.getElementsByClassName('form-control')[0];

    input.onblur = removeLabelActiveClass;
    input.onfocus = callLabelActiveClass;
});

function callLabelActiveClass() {
    addLabelActiveClass.call(this.parentNode);
}

function addLabelActiveClass() {
    var label = this.getElementsByTagName('label')[0];
    var input = this.getElementsByClassName('form-control')[0];
    if (!label.classList.contains('style')) {
        label.classList.add('style');
        input.focus();
    }
}

function removeLabelActiveClass() {
    //only move label back if input is empty
    if (this.value === "") {
        var label = this.parentNode.children[0];

        if (label.classList.contains('style')) {
            label.classList.remove('style');
        }
    }
}

// js for send email
document.querySelector('.contact-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get input values
    var data = {
        name: document.querySelector('.name').value,
        phoneNumber: document.querySelector('.phoneNumber').value,
        email: document.querySelector('.email').value,
        subject: document.querySelector('.subject').value,
        message: document.querySelector('.message').value,
    }

    sendEmail(data);
}

function sendEmail(data) {
    Email.send({
        Host: "smtp.elasticemail.com",
        Port: '2525',
        Username: "adeprisma7@gmail.com",
        Password: "BA3784B7CB4C188DCB5B032EA1C17269BE87",
        To: "adeprisma7@gmail.com",
        From: "adeprisma7@gmail.com",
        Subject: `[📩ADEPRISMA.GITHUB.IO] ${data.subject}`,
        Body: `Name: ${data.name} <br>Phone Number: ${data.phoneNumber} <br>Email: ${data.email} <br>Message: ${data.message}`,
    }).then(function (message) {
        alert(message == "OK" ? "Email sent successfully" : "Error sending email. Message: " + message);
        this.clearForm();
    });
}

function clearForm() {
    return window.location.reload();
    $('.name').val('');
    $('.phoneNumber').val('');
    $('.email').val('');
    $('.subject').val('');
    $('.message').val('');
}
