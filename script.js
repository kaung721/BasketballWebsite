$(document).ready(function() {
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Fade in animation for elements
    function fadeInOnScroll() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // Run fade in animation on scroll
    $(window).on('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Run on page load

    // Registration form handling
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.html('<span class="loading"></span> Processing...');
        submitBtn.prop('disabled', true);

        // Simulate form submission (replace with actual form handling)
        setTimeout(function() {
            // Show success message
            $('#registrationForm').html(`
                <div class="alert alert-success text-center">
                    <i class="fas fa-check-circle fa-3x mb-3"></i>
                    <h4>Registration Submitted!</h4>
                    <p>Thank you for your interest in joining Baytown Basketball Club. We'll review your application and get back to you soon.</p>
                    <a href="Index.html" class="btn btn-primary">Return to Home</a>
                </div>
            `);
        }, 2000);
    });

    // Form validation
    function validateForm() {
        var isValid = true;
        var requiredFields = ['firstName', 'lastName', 'email', 'phone', 'position', 'experience'];

        requiredFields.forEach(function(field) {
            var input = $('#' + field);
            if (!input.val().trim()) {
                input.addClass('is-invalid');
                isValid = false;
            } else {
                input.removeClass('is-invalid');
            }
        });

        // Email validation
        var email = $('#email').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    // Real-time form validation
    $('input, select, textarea').on('blur', function() {
        if ($(this).attr('required') && !$(this).val().trim()) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }
    });

    // Card hover effects
    $('.card').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
        }
    );

    // Schedule item click handler
    $('.schedule-item').on('click', function() {
        $(this).toggleClass('active');
        $(this).find('.game-details').slideToggle();
    });

    // Mobile menu close on link click
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Counter animation for stats
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when stats section is visible
    $(window).on('scroll', function() {
        var statsSection = $('.stats-section');
        if (statsSection.length && $(window).scrollTop() + $(window).height() > statsSection.offset().top) {
            if (!statsSection.hasClass('animated')) {
                statsSection.addClass('animated');
                animateCounters();
            }
        }
    });

    // Player card flip effect
    $('.player-card').on('click', function() {
        $(this).toggleClass('flipped');
    });

    // Search functionality for roster
    $('#playerSearch').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('.player-card').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Filter functionality for roster
    $('#positionFilter').on('change', function() {
        var position = $(this).val();
        if (position === 'all') {
            $('.player-card').show();
        } else {
            $('.player-card').hide();
            $('.player-card[data-position="' + position + '"]').show();
        }
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Back to top button
    var backToTop = $('<button class="btn btn-primary back-to-top" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; display: none; border-radius: 50%; width: 50px; height: 50px;"><i class="fas fa-arrow-up"></i></button>');
    $('body').append(backToTop);

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Loading screen (if needed)
    $(window).on('load', function() {
        $('.loading-screen').fadeOut();
    });

    // Console log for debugging
    console.log('Baytown Basketball Club website loaded successfully!');
});
