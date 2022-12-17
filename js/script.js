$(document).ready(function(){

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
    // Add/remove to cart
    let global_qty = 0,
        order = 0;
    $('.catalog__button').on('click', function() {
        let qty = 0,
            position = $(this).closest('.catalog__item').find('.catalog__name').html(),
            id = $(this).closest('.catalog__item').find('.catalog__name').attr('id'),
            price = $(this).closest('.catalog__item').find('.catalog__price>span').html();
        $(this).removeClass('catalog__button_active')
        .closest('.catalog__item').find('.catalog__setting').addClass('catalog__setting_active')
        .find('.catalog__qty').html(qty += 1);
        global_qty += 1;
        order += 1;
        $('.header__qty').html(global_qty);

        $('.shopping-cart__table').append($('<tr class="'+id+'"><td class="order">'+String(order)+'</td><td class="name">'+position+'</td><td class="price">'+price+' руб.</td><td class="qty">'+qty+'</td><td class="subtotal">'+(price * qty)+' руб.</td></tr>'))
    });

    // Minus
    $('.catalog__minus').on('click', function() {
        let qty = Number($(this).closest('.catalog__setting').find('.catalog__qty').html()),
            id = $(this).closest('.catalog__item').find('.catalog__name').attr('id'),
            price = $(this).closest('.catalog__item').find('.catalog__price>span').html();
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
    
        $('.shopping-cart__table').find('.'+id).find('.qty').html(qty);
        $('.shopping-cart__table').find('.'+id).find('.subtotal').html((qty*price)+' руб.');
    });

    // Plus
    $('.catalog__plus').on('click', function() {
        global_qty += 1;
        $('.header__qty').html(global_qty);
        let qty = Number($(this).closest('.catalog__setting').find('.catalog__qty').html()),
            price = $(this).closest('.catalog__item').find('.catalog__price>span').html();
        $(this).closest('.catalog__setting').find('.catalog__qty').html(qty += 1);
        $('.header__qty').html(global_qty);

        let id = $(this).closest('.catalog__item').find('.catalog__name').attr('id');
    
        $('.shopping-cart__table').find('.'+id).find('.qty').html(qty);
        $('.shopping-cart__table').find('.'+id).find('.subtotal').html((qty*price)+' руб.');
    });
});