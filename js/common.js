$(function () {

	// Slider
	checkWidth();

	// Custom JS
	function ibg() {

		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}

	ibg();



	$('.icon-menu').click(function (event) {
		$(this).toggleClass('active');
		$('.menu__body').toggleClass('active');
		$('body').toggleClass('lock');
	});



	$(".header .menu__body").append("<div class='phone-number-clone'>");
	$(".header .phone__number").clone().appendTo(".phone-number-clone");



	$.each($('input.phone'), function (index, val) {
		$(this).focus(function () {
			$(this).inputmask('+7(999) 999 9999', {
				clearIncomplete: true, clearMaskOnLostFocus: true,
				"onincomplete": function () { maskclear($(this)); }
			});
		});
	});
	$('input.phone').focusout(function (event) {
		maskclear($(this));
	});


	// Корзина
	$('.columns__btn-price').click(function () {
		var checkbox = $(this).prev().find('input[type=checkbox]');
		if (checkbox.is(':checked')) {
			$(".basket__list").prepend("<li class='new'><a href='#'></a><div class='basket__col'><div class='basket__price'></div><div class='basket__delete'><span></span><span></span></div></div></li>");
			var title = $(this).parent().find('.columns__title').html();
			var price = parseInt($(this).parent().find('.columns__price').html());
			$('.basket__list .new:first-child a').text(title);
			$(".basket__list .new:first-child .basket__price").text(price);

			var lever = $(this).prev().find('.lever');
			$(this).addClass('active');
			lever.addClass('act');
			var total = parseInt($('.basket .basket__sum i').html());
			if ($(this).hasClass('active')) {
				total = total + price;
			}
			$('.basket .basket__sum i').html(total);

			$('.basket__delete').click(function () {
				$('.columns__btn-price').removeClass('active');
				lever.removeClass('act');
				var result = parseInt($(this).parents().children().html());
				if (!$('.columns__btn-price').hasClass('active')) {
					total = total - result;
				}
				$('.basket .basket__sum i').html(total);
				$(this).parents().remove('li.new');
				$('input.check').prop('checked', false);
			});
		}


	});



	// Slider
	function checkWidth() {
		$vWidth = $(window).width();

		if ($vWidth > 1100) {
			var swiper = new Swiper('.swiper-container', {
				direction: 'vertical',
				slidesPerView: 1,
				mousewheel: true,
				spaceBetween: 30,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				}
			});
		} else {
			var swiperH = new Swiper('.swiper-container', {
				slidesPerView: 1,
				mousewheel: true,
				spaceBetween: 30,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			});

		}
	}


	// Modal
	function modal() {
		if (!$.cookie('HideModal')) {
			$('#overlay').fadeIn(400,
				function () {
					$('#modal_form')
						.css('display', 'block')
						.animate({ opacity: 1, top: '50%' }, 200);
				});
			$("form.modal-form__form").submit(function () { //Change
				var th = $(this);
				$.ajax({
					type: "POST",
					url: "mail.php", //Change
					data: th.serialize()
				}).done(function () {
					$(th).parent('.modal-form').addClass('active');
					$(th).parents('#modal_form').addClass('active');
					$(th).parent().prev('.success').addClass('active').css({'display': 'flex', 'opacity': '1'}).hide().fadeIn();
					setTimeout(function () {
						// Done Functions
						$(th).parent().prev('.success').removeClass('active').css({'display': 'none', 'opacity': '0'}).fadeOut();
						$(th).parents('#modal_form').removeClass('active');
						$('#modal_form').animate({ opacity: 0, top: '45%' }, 200,
							function () {
								$(this).css('display', 'none');
								$('#overlay').fadeOut(400);
							}
						);
						th.trigger("reset");
					}, 5000);
				});
				return false;
			});
			$.cookie('HideModal', true, { expires: 3, path: '/' });
		}
	}

	$('#modal_close, #overlay').click(function () {
		$('#modal_form')
			.animate({ opacity: 0, top: '45%' }, 200,
				function () {
					$(this).css('display', 'none');
					$('#overlay').fadeOut(400);
				}
			);
	});

	setTimeout(modal, 3000);



	// Клик на вызов мастера
	$('.form__btn').click(function() {
		$('#overlay').fadeIn(400,
			function () {
				$('#modal_form')
					.css('display', 'block')
					.animate({ opacity: 1, top: '50%' }, 200);
			});
		$('.modal-form').addClass('active');
		$('#modal_form').addClass('active');
		$('.success').addClass('active').css({'display': 'flex', 'opacity': '1'}).hide().fadeIn();
		setTimeout(function () {
			// Done Functions
			$('.success').removeClass('active').css({'display': 'none', 'opacity': '0'}).fadeOut();
			$('#modal_form').removeClass('active');
			$('#modal_form').animate({ opacity: 0, top: '45%' }, 200,
				function () {
					$(this).css('display', 'none');
					$('#overlay').fadeOut(400);
				}
			);
		}, 5000);
		return false;
	});




	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) { 
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});

	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});


	// Lazy Load Lozad
	const observer =  lozad();  // lazy loads elements with default selector as '.lozad'
	observer.observe( );


	$(".header-content__body").animated("fadeInLeft", "fadeOutUp");
	$(".plus__descr").animated("fadeInLeft", "fadeOutUp");
	$(".basket__column:nth-child(3)").animated("fadeInRight", "fadeOutUp");
	$(".repairs__column:nth-child(1)").animated("fadeInLeft", "fadeOutUp");
	$(".repairs__column:nth-child(2)").animated("fadeInRight", "fadeOutUp");
	$(".call__row").animated("slideInUp", "fadeOutUp");

	$(".repairs__list").waypoint(function() {
		$(".repairs__item").each(function(index) {
			var ths = $(this);
			setInterval(function() {
			   ths.addClass("on"); 
			}, 100*index);
		});
	}, {
		offset : "15%"
	});

});
