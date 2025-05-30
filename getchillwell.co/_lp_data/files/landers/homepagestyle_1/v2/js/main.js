/* ------------------------------------------------

Page    : Main JS
Version : 1.0
Author  : Surjith S M
URI     : http://themeforest.net/user/surjithctly

Copyright © All rights Reserved
Surjith S M / @surjithctly

-------------------------------------------------- */

(function ($) {
  'use strict';

  //check if mobile
  var isMobile = window.matchMedia('only screen and (max-width: 767px)').matches;
  var isMobileBig = window.matchMedia('only screen and (max-width: 991px)').matches;

  refreshImages();

  /* ------------ PAGE LOADING ------------ */

  // hide header first
  // $('.fadeInOnLoad').css('opacity', 0);

  // closing loading section on click
  // useful for bored users
  // $('#loading').on('click', function () {
  //   $('#loading').fadeOut();
  // });
  /*On Page Load, Fadecout Loading, Start Scroll Animation*/
  $(window).on('load', function () {
    // $('#loading').fadeOut();
    // $('#loading .object').delay(700).fadeOut('slow');
    // // Show header on load
    // $('.fadeInOnLoad').delay(700).fadeTo('slow', 1);

    /*Iniitate Scroll Animation*/
    bodyScrollAnimation();
  });

  /* ------------ ON SCROLL ANIMATION ------------ */

  function bodyScrollAnimation() {
    // var scrollAnimate = $('body').data('scroll-animation');
    // if (scrollAnimate === true) {
    //   new WOW({
    //     mobile: false,
    //   }).init();
    // }
  }

  /* ------------ SCROLL SPY ------------ */

  /*Scroll Spy*/
  // $('body').scrollspy({
  //   target: '#main-navbar',
  //   offset: 100,
  // });

  /* ================================================
       Scroll Functions
       ================================================ */

  $('nav a[href^="#"]:not([href="#"]), .back_to_top, .explore').on('click', function (event) {
    var $anchor = $(this);
    $('html, body')
        .stop()
        .animate(
            {
              scrollTop: $($anchor.attr('href')).offset().top - 70,
            },
            1500,
        );
    event.preventDefault();
  });

  /* ---------- Nav BG ON Scroll---------- */

  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 99) {
      $('.custom-navbar').addClass('is-scrolling');
    } else {
      $('.custom-navbar').removeClass('is-scrolling');
    }
  });

  /* ---------- Back to Top ---------- */

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 1000) {
      $('.back_to_top').fadeIn('slow');
    } else {
      $('.back_to_top').fadeOut('slow');
    }
  });

  /* ---------- PRODUCT POPUP ---------- */

  if ($('a[href="#product-choose"]').length) {
    $('a[href="#product-choose"]').magnificPopup({
      type: 'inline',
      mainClass: 'mfp-fade',
      midClick: true, // mouse middle button click
    });
  }

  /* ---------- CONTACT FORM FLIPBOX ---------- */

  $('.flip-contact-box').on('click', function () {
    if (!$('.flip-box-container').hasClass('show-form')) {
      $('.flip-box-container').addClass('show-form');
    }
  });

  $('.js-close-flip').on('click', function () {
    $('.flip-box-container').removeClass('show-form');
  });

  /*Feature Notes*/
  $('.feature-note .plus-icon .plus').on('click', function () {
    if ($(this).parents('.feature-note').hasClass('show-cont')) {
      $(this).parents('.feature-note').removeClass('show-cont');
    } else {
      $(this).parents('.feature-note').addClass('show-cont');
    }
  });

  $(document).ready(function () {
    // owl quote slider
    var owlQuoteProps = {
      rtl: isRTL,
      center: true,
      items: 1,
      loop: true,
      margin: 0,
      nav: true,
      navText: ["<div class='quote-prev'></div>", "<div class='quote-next'></div>"],
    };
    $('#quote-carousel').owlCarousel(owlQuoteProps);
  });

  if (!isMobile) {
    // init masonry
    // $('.grid').masonry({
    //   itemSelector: '.grid-item',
    //   gutter: 37,
    // });

    // show more
    var beginHeight = $('#reviews .grid').height();
    var maxHeight = 0;

    $('#reviews .review:lt(3)').each(function () {
      var thisH = $(this).height();
      if (thisH > maxHeight) {
        maxHeight = thisH;
      }
    });

    $('#reviews .grid').css('height', maxHeight + 50);
    $('#reviews .review').not(':lt(3)').hide();

    $('.load-more .btn').on('click', function () {
      $(this).hide();
      $('#reviews .grid').css('height', beginHeight);
      $('#reviews .review').show();
    });
  }

  // add responsive for reviews
  $(document).ready(function () {
    if (isMobileBig) {
      // owl reviews slider
      var owlReviewsProps = {
        rtl: isRTL,
        slideSpeed : 200,
        paginationSpeed : 200,
        rewind: true,
        autoplay: true,
        loop: true,
        items : 1,
        nav: true,
        navText: [
          "<img src='https://i.imgur.com/kgD0Nrq.png'>",
          "<img src='https://i.imgur.com/kgD0Nrq.png'>",
        ],
        responsive: {
          0: {
            items: 1, loop: true,
          },
          600: {
            items: 2, loop: true,
          }
        }
      };

      $('#reviews .review').show();
      $('#reviews .flex').owlCarousel(owlReviewsProps);
    }
  });

  // video popups
  $('.video').each(function (index, el) {
    let videoSrc;

    let videoBtn = $(el).find('.video-btn');
    let modal = $(el).find('.modal');
    let videoWrap = $(el).find('.video-wrapper');

    $(videoBtn).on('click', function () {
      videoSrc = $(this).data('src');
    });

    $(modal).on('shown.bs.modal', function () {
      if (videoSrc.indexOf('youtube') != -1) {
        $(videoWrap).attr('src', videoSrc + '&autoplay=1&amp;modestbranding=1&amp;showinfo=0');
      } else {
        $(videoWrap).attr('src', videoSrc + '?autoplay=1');
      }
    });

    $(modal).on('hide.bs.modal', function () {
      $(videoWrap).attr('src', videoSrc);
    });
  });

  // Exit Popup
  const exitModal = $('#exitModal');
  let discountCounter = 1;
  const maxTimesShowPopup = 2;
  // Get the current URL
  const currentURL = window.location.href;

  if (exitPopup && !currentURL.includes("tech2020.co") && !currentURL.includes("test.mvmaindomain")) {
    $(document).on('mouseleave', leaveFromTop);
  }

  function leaveFromTop(e) {
    if (e.clientY < 0 && discountCounter <= maxTimesShowPopup) {
      exitModal.modal({ backdrop: 'static', keyboard: false, show: true });
    }
  }

  $(exitModal).on('hide.bs.modal', function () {
    discountCounter++;
  });

  // Timer
  const interval = setInterval(function () {
    const timer = timer2.split(':');
    let minutes = parseInt(timer[0], 10);
    let seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = seconds < 0 ? --minutes : minutes;
    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    if (minutes < 0) {
      clearInterval(interval);
    } else {
      $('.cd-mins').html(minutes);
      $('.cd-secs').html(seconds);

      timer2 = minutes + ':' + seconds;
    }
  }, 1000);

  // Timer special-offer v2
  const interval2 = setInterval(function () {
    const timer_special_offer_v2 = timer2_special_offer_v2.split(':');
    let minutes = parseInt(timer_special_offer_v2[0], 10);
    let seconds = parseInt(timer_special_offer_v2[1], 10);
    --seconds;
    minutes = seconds < 0 ? --minutes : minutes;
    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    if (minutes < 0) {
      clearInterval(interval2);
    } else {
      $('.cd-mins2').html(minutes);
      $('.cd-secs2').html(seconds);

      timer2_special_offer_v2 = minutes + ':' + seconds;
    }
  }, 1000);

  /* ----- Get first letter REVIEW ----- */
  var firstnames = document.getElementsByClassName("firstname");
  for(var i = 0; i < firstnames.length; i++){
    document.getElementsByClassName("firstletter")[i].innerHTML = firstnames[i].innerHTML.charAt(0);
  }

  /* ----- Features2 carousel ----- */
  $(document).ready(function () {
    $('#features2-carousel').owlCarousel({
      rtl: isRTL,
      slideSpeed : 200,
      paginationSpeed : 200,
      rewind: true,
      autoplay: true,
      dots:true,
      dotsEach: true,
      loop: true,
      items : 1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
    });
  });

  /* ----- Features2 - V2 - carousel ----- */
  $(document).ready(function () {
    $('#features2-v2-carousel').owlCarousel({
      rtl: isRTL,
      slideSpeed : 200,
      paginationSpeed : 200,
      rewind: true,
      autoplay: true,
      dots:true,
      dotsEach: true,
      loop: true,
      items : 1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
    });
  });

  /* ----- Picture showcase carousel ----- */
  $(document).ready(function () {
    $('#picture-showcase-carousel').owlCarousel({
      rtl: isRTL,
      slideSpeed : 200,
      paginationSpeed : 200,
      rewind: true,
      autoplay: true,
      dots:true,
      dotsEach: true,
      loop: true,
      items : 1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
    });
  });

  /* ----- Reviews 3 carousel ----- */
  if (isMobileBig) {
    $(document).ready(function () {
      $('#reviews3-carousel').owlCarousel({
        rtl: isRTL,
        slideSpeed : 200,
        paginationSpeed : 200,
        rewind: true,
        autoplay: true,
        loop: true,
        items : 1,
        nav: true,
        navText: [
          "<img src='https://i.imgur.com/kgD0Nrq.png'>",
          "<img src='https://i.imgur.com/kgD0Nrq.png'>",
        ],
        responsive: {
          0: {
            items: 1, loop: true,
          },
          600: {
            items: 2, loop: true,
          },
          992: {
            items: 3, loop: false, autoplay: false, nav: false,
          }
        }
      });
    });
  }

  /* ----- Features2 carousel ----- */
  $(document).ready(function () {
    $('#quote-v2-carousel').owlCarousel({
      rtl: isRTL,
      slideSpeed : 200,
      paginationSpeed : 200,
      rewind: true,
      autoplay: true,
      loop: true,
      items : 1,
      nav: true,
      navText: [
        "<img src='https://i.imgur.com/kgD0Nrq.png'>",
        "<img src='https://i.imgur.com/kgD0Nrq.png'>",
      ]
    });
  });

  /* ----- Reviews V2 carousel ----- */
  $(document).ready(function () {
    $('#reviews-v2-carousel').owlCarousel({
      rtl: isRTL,
      slideSpeed : 200,
      paginationSpeed : 200,
      rewind: true,
      autoplay: true,
      loop: true,
      items : 1,
      nav: true,
      navText: [
        "<img src='https://i.imgur.com/kgD0Nrq.png'>",
        "<img src='https://i.imgur.com/kgD0Nrq.png'>",
      ],
      responsive: {
        0: {
          items: 1, loop: true,
        },
        600: {
          items: 2, loop: true,
        },
        992: {
          items: 3, loop: true,
        }
      }
    });
  });

  /* ----- Reviews2 V2 carousel ----- */
  $(document).ready(function () {
    $('#reviews2-v2-carousel').owlCarousel({
      rtl: isRTL,
      slideSpeed : 200,
      paginationSpeed : 200,
      rewind: true,
      autoplay: true,
      dots:true,
      dotsEach: true,
      loop: true,
      items : 1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
    });
  });


  /* ----- Small Side popup ----- */
  $(document).ready(function () {
    smallSidePopupTimer();
  });

  // Facebook comment functions
  $(document).ready(function() {
    // new post
    $('#newPostInput').click(function(){
      $('#newPostArea').show();
    });

    $('#newPostButton').click(function(){
      $('#newPostArea .busyMsg').fadeIn(300);
      $('#newPostInput').val('');
    });
    // End new post

    // Likes
    $('.likeButton').click(function() {
      var thisCommentId = $(this).parent().parent().parent().attr('id');
      var thisCommentClass = $(this).parent().attr('class'); // use this to differentiate 2 levels
      var thisCommentLikes = '#' + thisCommentId + ' .' + thisCommentClass + ' .commentLikes';
      var thisLikeButton = '#' + thisCommentId + ' .' + thisCommentClass + ' .likeButton';
      var thisUnLikeButton = '#' + thisCommentId + ' .' + thisCommentClass + ' .unlikeButton';
      $(thisCommentLikes).html(function(i, val) { return val * 1 + 1 });
      $(thisLikeButton).hide();
      $(thisUnLikeButton).show();
    });

    $('.unlikeButton').click(function() {
      var thisCommentId = $(this).parent().parent().parent().attr('id');
      var thisCommentClass = $(this).parent().attr('class');
      var thisCommentLikes = '#' + thisCommentId + ' .' + thisCommentClass + ' .commentLikes';
      var thisLikeButton = '#' + thisCommentId + ' .' + thisCommentClass + ' .likeButton';
      var thisUnLikeButton = '#' + thisCommentId + ' .' + thisCommentClass + ' .unlikeButton';
      $(thisCommentLikes).html(function(i, val) { return val * 1 - 1 });
      $(thisUnLikeButton).hide();
      $(thisLikeButton).show();
    });
    // End Likes

    // User replies
    $('.replyButton').click(function(){
      var thisCommentId = $(this).parent().parent().parent().attr('id');
      var thisCommentClass = $(this).parent().parent().attr('class');
      if(thisCommentClass == 'commentContent'){
        var thisCommentReply = '#' + thisCommentId + ' .' + thisCommentClass + ' .commentSpacer';
      }
      else{
        var thisCommentReply = '#' + thisCommentId + ' .' + thisCommentClass + ' .replySpacer';
      }
      var replyBox = $(thisCommentReply).text().length;
      if(replyBox == 0){
        $(thisCommentReply).append('<table class="newReplyTable"><tr><td><img src="' + lang['IMG_FB_COMMENTS_DEFAULT_PIC'] + '"></td><td><input class="newReplyInput" type="text" placeholder="' + lang['TXT_FB_COMMENTS_COMMENT_PLACEHOLDER'] + '"><div class="newReplyArea"><span class="busyMsg">' + lang['TXT_FB_COMMENTS_BUSY_SERVER'] + '</span><img src="' + lang['IMG_FB_COMMENTS_REPLY_PIC'] + '" class="newReplyButton"><img src="' + lang['IMG_FB_COMMENTS_CANCEL_PIC'] + '" class="newCancelButton"><div style="clear: both;"></div></div></td></tr></table>');
      }

      $('.newReplyButton').click(function(){
        var thisCommentId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().attr('id');
        var thisCommentClass = $(this).parent().parent().parent().parent().parent().parent().attr('class');
        var thisReplyBusyMsg = '#' + thisCommentId + ' .' + thisCommentClass + ' .busyMsg';
        var thisNewReplyInput = '#' + thisCommentId + ' .' + thisCommentClass + ' .newReplyInput';
        $(thisReplyBusyMsg).fadeIn(300);
        $(thisNewReplyInput).val('');

      });
      // End reply button

      $('.newCancelButton').click(function(){
        var thisCommentId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().attr('id');
        var thisCommentClass = $(this).parent().parent().parent().parent().parent().parent().attr('class');
        var thisNewReplyTable = '#' + thisCommentId + ' .' + thisCommentClass + ' .newReplyTable';
        $(thisNewReplyTable).remove();
      });// End cancel button

    });
    // End User replies
  });

  // ------------------------------------------------------------
  //  SETTING RIGHT TAG (IMG OR VIDEO) FOR THE RIGHT EXTENSION
  // ------------------------------------------------------------
  // Define supported file extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  const videoExtensions = ['mp4', 'webm', 'ogg'];

  // Get all containers with the class 'media-container'
  const mediaContainers = document.querySelectorAll('.media-container');

  // Render appropriate content in each container
  mediaContainers.forEach((mediaContainer) => {
    let file = mediaContainer.getAttribute('media-link')?.trim();

    // Set to default if file is empty
    if (!file) {
      file = lang['IMG_DEFAULT_WHEN_BROKEN'];
    }

    const fileExtension = file.split('.').pop().toLowerCase();

    if (imageExtensions.includes(fileExtension)) {
      const img = document.createElement('img');
      img.src = file;
      img.alt = '';
      img.setAttribute('loading', 'lazy');
      img.style.width = '100%';
      mediaContainer.appendChild(img);
    } else if (videoExtensions.includes(fileExtension)) {
      const video = document.createElement('video');
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('loading', 'lazy');
      video.style.width = '100%';

      const source = document.createElement('source');
      source.src = file;
      source.type = `video/${fileExtension}`;
      video.appendChild(source);

      mediaContainer.appendChild(video);
    } else {
      mediaContainer.textContent = 'Unsupported file format';
    }
  });
})(jQuery);

function scrollToSection(givenSection){
  let e = document.getElementById(givenSection);
  e.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
    inline: 'center'
  });
}

function openFooter2Modal(modalId){
  const body = document.querySelector("body");
  const modal = document.getElementById("footer2Modal" + modalId);

  modal.style.display = "block";
  body.style.overflow = "hidden";

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      body.style.overflow = "auto";
    }
  }
}

function closeFooter2Modal(modalId){
  const body = document.querySelector("body");
  const modal = document.getElementById("footer2Modal" + modalId);

  modal.style.display = "none";
  body.style.overflow = "auto";
}

function setTheme(colorTheme) {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', `var(--${colorTheme}-primary-1)`);
  root.style.setProperty('--primary-color-2', `var(--${colorTheme}-primary-2)`);
  root.style.setProperty('--primary-hover-color', `var(--${colorTheme}-primary-5)`);
  root.style.setProperty('--secondary-1', `var(--${colorTheme}-secondary-1-3)`);
  root.style.setProperty('--secondary-2', `var(--${colorTheme}-secondary-2-3)`);
}

/* ----- Small Side popup ----- */
function smallSidePopupTimer() {
  var min = 10, max = 30;
  var randomTime = Math.floor(Math.random() * (max - min + 1) + min);
  setTimeout(showSmallSidePopup, randomTime * 1000);
}

function showSmallSidePopup(){
  if(!isRTL){
    document.getElementById("small-side-popup").style.left = "10px";
  }else{
    document.getElementById("small-side-popup").style.right = "10px";
  }
  document.getElementById("small-side-popup-country").innerHTML = countries[Math.floor(Math.random()*countries.length)];
  setTimeout(closeSmallSidePopup, 5000);
  smallSidePopupTimer();
}

function closeSmallSidePopup() {
  if(!isRTL){
    document.getElementById("small-side-popup").style.left = "-600px";
  }else{
    document.getElementById("small-side-popup").style.right = "-600px";
  }
}

function setDefaultOnBrokenImgLink(image) {
  image.onerror = null;
  image.src = defaultImg;
}

function refreshImages() {
  const images = document.querySelectorAll('img');

  // Loop over all images and reassign the src attribute
  images.forEach(image => {
    const originalSrc = image.src;
    image.src = '';
    image.src = originalSrc;

    // Attach the error handler to handle broken image links
    image.onerror = () => setDefaultOnBrokenImgLink(image);
  });
}