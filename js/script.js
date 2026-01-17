// js for menu link click
$('.scroll-page').on('click', function (e) {
    var link = $(this).attr('href');
    var section = $(link);

    // Standard behavior (CSS scroll-behavior: smooth handles smoothness now)
    // $('body, html').animate({ scrollTop: ... }) removed as requested.

    // We can manually scroll if needed, but anchor default + css smooth scroll is cleaner "plain" approach.
    // However, since we intercept click, we should ensure the jump happened if default was prevented.
    // The original code didn't use e.preventDefault() for the link click itself, only the toggler.
    // But jquery easing block usually implies we handle it.
    // Let's just use window.scrollTo for a clean "plain" js jump if desired, or let event bubble.
    // For now, let's keep it simple: Just close menu. The anchor default behavior will handle the jump.


    // Close mobile menu if open
    $('#mobile-menu').removeClass('active');
    $('body').css('overflow', 'auto');

    // Bootstrap 5 uses .show instead of .in, but .collapse('hide') works on the collapsible element itself
    $('.navbar-collapse').collapse('hide');
    // $('nav, navbar').removeClass('toggle-click'); // Legacy class removed

    // Default anchor click will happen as we removed preventDefault() in previous steps implicitly if we removed the 'e.preventDefault()'
    // Actually, line 1 was: $('.scroll-page').on('click', function (e) { ... e.preventDefault(); })
    // If we want "plain" jump, we should remove e.preventDefault() OR enable scrollTo.
    // Let's use scrollTo for precise offset control (navbar height).
    window.scrollTo({
        top: section.offset().top - 50,
        behavior: 'smooth'
    });

    e.preventDefault();
});

// Splash Screen Loader
window.addEventListener('load', function () {
    const loader = document.getElementById('loader-wrapper');
    loader.classList.add('loaded');
});

//  js for button navbar
//  js for button navbar
$('.navbar-toggler').on('click', function (e) {
    e.preventDefault();
    $('#mobile-menu').toggleClass('active');

    // Prevent body scrolling when menu is open
    if ($('#mobile-menu').hasClass('active')) {
        $('body').css('overflow', 'hidden');
    } else {
        $('body').css('overflow', 'auto');
    }
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
    var offset = window.scrollY; // Updated from pageYOffset

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
