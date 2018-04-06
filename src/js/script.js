var photo = {
    photoNum: 15,
    photoIndex: undefined,
    radio: $(window).height() / $(window).width(),
    photoW: ($('.wrapper').width() - 48) / 4,
    init: function () {
        this.render();
        this.bindEvent();
    }
}
photo.render = function () {
    var html = '',
        w = this.photoW;
    for (var i = 0; i < this.photoNum; i ++) {
        html += '<li><img src="./src/image/' + i + '.png"></li>'
    }
    $(html).appendTo($('.wrapper')).css({'height': w, 'width': w}).find('img').animate({opacity: 1}, 500);
}
photo.bindEvent = function () {
    var that = this;
    $('.wrapper').on('tap', 'li', function () {
        that.photoIndex = $(this).index();
        that.photoShow(that.photoIndex);
        $('li').css({'opacity': 0});
    });
    $('.show')
        .on('tap', function () {
            $(this).hide();
            $('li').animate({opacity: 1}, 500);
        })
        .on('swipeLeft', function () {
            that.photoIndex = that.photoIndex == that.photoNum - 1 ? that.photoNum - 1 : that.photoIndex + 1;
            that.photoShow(that.photoIndex);  
        })
        .on('swipeRight', function () {
            that.photoIndex = that.photoIndex == 0 ? 0 : that.photoIndex - 1;
            that.photoShow(that.photoIndex);
        })

    
}
photo.photoShow = function (index) {
    $('.show').html('').show();
    var that = this;
    var Img = new Image();
    var src_img = './src/image/' + index + '.png';
    Img.src = src_img;
    Img.onload = function () {
        var r = this.height / this.width;
        if (r > that.radio) {
            $(this).appendTo('.show').css({'height': '100%'}).animate({opacity: 1}, 500);
        } else {
            $(this).appendTo('.show').css({'width': '100%'}).animate({opacity: 1}, 500);
        }
    };
}
photo.init();