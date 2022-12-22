$(document).ready(function(){

    // Mobile menu
    $('.header__burger').on('click', function() {
        $(this).toggleClass('header__burger_active');
        $('.mobile-menu').toggleClass('mobile-menu_active');
    });
    $('.mobile-menu>*:not(.mobile-menu__contacts, .mobile-menu__address)').on('click', function() {
        $('.header__burger').toggleClass('header__burger_active');
        $('.mobile-menu').toggleClass('mobile-menu_active');
    });

    // Show more information
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function() {
                $('.catalog__description').eq(i).toggleClass('catalog__description_active');
            })
        });
    };

    toggleSlide('.catalog__more');
    toggleSlide('.catalog__back');

    // Tabs
    $('.catalog__menu').on('click', '.catalog__menu-item:not(.catalog__menu-item_active)', function() {
        let idx = $(this).index();
        $(this).addClass('catalog__menu-item_active').siblings().removeClass('catalog__menu-item_active');
        if (idx == 0) {
            $('#burgers').addClass('catalog__items_active').siblings().removeClass('catalog__items_active')
        } else if (idx == 1) {
            $('#shawarmas').addClass('catalog__items_active').siblings().removeClass('catalog__items_active')
        } else if (idx == 2) {
            $('#shashlik').addClass('catalog__items_active').siblings().removeClass('catalog__items_active')
        } else if (idx == 3) {
            $('#drinks').addClass('catalog__items_active').siblings().removeClass('catalog__items_active')
        } else if (idx == 4) {
            $('#sauces').addClass('catalog__items_active').siblings().removeClass('catalog__items_active')
        }
    });

    // Shopping-cart
    // Show/hide
    $('.header__shopping').on('click', function() {
        $('.shopping-cart').toggleClass('shopping-cart_active');
    });
    $('.shopping-cart__exit').on('click', function() {
        $('.shopping-cart').toggleClass('shopping-cart_active');
    });
    // Add/remove to cart
    let global_qty = 0,
        total = 0;
    $('.catalog__button').on('click', function() {
        let qty = 0,
            position = $(this).closest('.catalog__item').find('.catalog__name').html(),
            id = $(this).closest('.catalog__item').find('.catalog__name').attr('id'),
            price = $(this).closest('.catalog__item').find('.catalog__price>span').html(),
            goods = '';
        $(this).removeClass('catalog__button_active')
        .closest('.catalog__item').find('.catalog__setting').addClass('catalog__setting_active')
        .find('.catalog__qty').html(qty += 1);
        global_qty += 1;
        total += Number(price)
        $('.header__qty').html(global_qty);

        $('.shopping-cart__table').append($('<tr class="'+id+'"><td class="name">'+position+'</td><td class="price">'+price+' руб.</td><td class="qty">'+qty+'</td><td class="subtotal">'+(price * qty)+' руб.</td></tr>'));
        $('.shopping-cart__total>span').html(total);
        $('.shopping-cart__total>input').attr('value', total);

        goods = $('.shopping-cart__table').html();
        $('.shopping-cart__order>input').attr('value', goods);
    });

    // Minus
    $('.catalog__minus').on('click', function() {
        let qty = Number($(this).closest('.catalog__setting').find('.catalog__qty').html()),
            id = $(this).closest('.catalog__item').find('.catalog__name').attr('id'),
            price = $(this).closest('.catalog__item').find('.catalog__price>span').html(),
            goods = '';
        global_qty -= 1;
        $('.header__qty').html(global_qty);
        if (qty == 1) {
            $(this).closest('.catalog__setting').removeClass('catalog__setting_active')
            .closest('.catalog__item').find('.catalog__button').addClass('catalog__button_active');
            qty -= 1;
            $('.'+id).remove();
        } else {
            $(this).closest('.catalog__setting').find('.catalog__qty').html(qty -= 1)
        }

        total -= Number(price);
        $('.shopping-cart__total>span').html(total);
        $('.shopping-cart__total>input').attr('value', total);
    
        $('.shopping-cart__table').find('.'+id).find('.qty').html(qty);
        $('.shopping-cart__table').find('.'+id).find('.subtotal').html((qty*price)+' руб.');

        goods = $('.shopping-cart__table').html();
        $('.shopping-cart__order>input').attr('value', goods);
    });

    // Plus
    $('.catalog__plus').on('click', function() {
        global_qty += 1;
        $('.header__qty').html(global_qty);
        let qty = Number($(this).closest('.catalog__setting').find('.catalog__qty').html()),
            price = $(this).closest('.catalog__item').find('.catalog__price>span').html(),
            goods = '';
        $(this).closest('.catalog__setting').find('.catalog__qty').html(qty += 1);
        $('.header__qty').html(global_qty);

        let id = $(this).closest('.catalog__item').find('.catalog__name').attr('id');

        total += Number(price);
        $('.shopping-cart__total>span').html(total);
        $('.shopping-cart__total>input').attr('value', total);
    
        $('.shopping-cart__table').find('.'+id).find('.qty').html(qty);
        $('.shopping-cart__table').find('.'+id).find('.subtotal').html((qty*price)+' руб.');

        goods = $('.shopping-cart__table').html();
        $('.shopping-cart__order>input').attr('value', goods);
    });

    // Form
    $('input[name="delivery"]').on('click', function() {
        if ($('input[id="delivery"]').is(':checked')) {
            $('.shopping-cart__address').addClass('shopping-cart__address_active');
            $('input[name="address"]').prop('required', true);
        } else {
            $('.shopping-cart__address').removeClass('shopping-cart__address_active');
            $('#address-error').remove();
            $('input[name="address"]').prop('required', false);
        }
    });

    // Validation
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                delivery: false,
                address: 'Пожалуйста, ведите адрес',
                name: "Пожалуйста, введите имя",
                phone: "Пожалуйста, введите номер телефона",
                email: {
                    required: "Пожалуйста, введите e-mail",
                    email: "Введите корректный e-mail"
                }
            }
        });
    };
  
    validateForms('.form');

    // Masked input
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Mailer
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('.shopping-cart').removeClass('shopping-cart_active');
            // $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
        });
});