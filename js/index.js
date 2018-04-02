(function (widnow, $) {
    // 首页banner
    $(".flexslider").flexslider({
        slideshowSpeed: 4000, //展示时间间隔ms
        animationSpeed: 400, //滚动时间ms
        touch: true, //是否支持触屏滑动
        directionNav: false //是否显示左右方向箭头按钮
    });


    // 按科室找医生 下拉
    $('.select .select-head').click(function () {console.log('aa');
        var me = $(this);
        var input = me.parent().find('input');
        var list = me.parent().find('.select-content');
        list.toggle(300);
        list.find('li').one('click', function () {
            var text = $(this).text();
            me.text(text);
            input.val(text);
            list.hide(300);
        })
    });

    // 按科室找医生 列表
    try {
        var departmentUl = $('.department-wrapper');
        var departmentUlLi = departmentUl.find('.slides li');
        var departmentOl = $('.department-slider .flex-control-nav');
        var departmentOlLength = Math.ceil(departmentUlLi.length / 10);
        var departmentOlHtml = [];
        for(var i = 0; i < departmentOlLength; i++) {
            departmentOlHtml.push('<li><a href="javascript:;" class="'+ (i == 0 ? "flex-active" : "") +'">'+ (i+1) +'</a></li>')
        }
        departmentOl.html(departmentOlHtml.join(''));
        departmentUl.find('.slides').css({'height': departmentOlLength * 360 + 'px'});
        departmentOl.on('click', 'li', function () {
            $(this).find('a').addClass('flex-active').end().siblings().find('a').removeClass('flex-active');
            departmentUl.animate({'scrollTop': 360 * $(this).index()}, 300);
        });
    } catch (e){}


    // 返回顶部
    window.goToTop = function() {
        $('html, body').animate({'scrollTop': '0px'}, 300);
    };
    $(window).resize(function () {
        var goTop = $('.goTop');
        if($(window).width() < 1523) {
            goTop.css({'left': 'auto', 'right': '0', 'margin-left': '0'});
        } else {
            goTop.css({'left': '50%', 'right': 'auto', 'margin-left': '650px'});
        }
    });
    $(window).scroll(function () {
        var goTop = $('.goTop');
        if ($(window).scrollTop() > 100) {
            goTop.show();
        } else {
            goTop.hide();
        }
    });
    $(window).resize();
    $(window).scroll();
})(window, jQuery);