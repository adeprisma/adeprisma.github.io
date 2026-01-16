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
    $('#loadMoreBtn').on('click', function (e) {
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
    const btn = document.querySelector('.btn-send-contact');
    const originalText = btn.innerText;
    btn.innerText = 'SENDING...';
    btn.disabled = true;

    fetch("https://formspree.io/f/mgooovld", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Email sent successfully!");
            clearForm();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            })
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your form");
    }).finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
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
