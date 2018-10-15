(function ($) {
    function Swiper(opt) {
        var opts = opt || {};
        this.date = opts.date || 2000;
        this.wrap = opts.father;
        this.img = opts.image;
        this.init();
    }
    Swiper.prototype.init = function () {
        this.nowIndex = 0;
        this.len = this.img.length;
        this.itemWidth = parseInt(this.wrap.css('width'));
        this.timer = undefined;
        this.key = true;
        this.flag = true;
        this.creatDom();
        this.siliderAuto();
        this.bindEvent();
    }
    Swiper.prototype.creatDom = function () {
        var len = this.len;
        var str = '';
        var listStr = '';
        var content = $('<ul class="content"></ul>');
        var oclick = $('<div class="oclick">\
        <span class="prevBtn">&lt;</span>\
        <span class="nextBtn">&gt;</span>\</div>');
        var oIndex = $('<ul class="oindex"></ul>');
        for (var i = 0; i < len; i++) {
            str += '<li><a href="#"><img src="' + this.img[i] + '" alt=""></a></li>';
            listStr += '<li></li>';
        }
        str += '<li><a href="#"><img src="' + this.img[0] + '" alt=""></a></li>'
        this.wrap.append(content.html(str)).append(oclick).append(oIndex.html(listStr));
        $('#swiper .content').css({
            width: (len + 1) * this.itemWidth + 'px'
        })
        $('#swiper .content img').css({
            width: this.itemWidth + 'px'
        })
        $('#swiper .oindex li').eq(0).addClass('active');
    }
    Swiper.prototype.siliderAuto = function () {
        var self = this;
        clearTimeout(this.timer);
        if (self.flag) {
            this.timer = setTimeout(function () {
                self.move('next');
            }, this.date)
        }
    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('#swiper .oindex li').add('#swiper .prevBtn').add('#swiper .nextBtn').on('click', function () {
            self.flag = false;
            if ($(this).attr('class') == 'prevBtn') {
                self.move('prev');
            } else if ($(this).attr('class') == 'nextBtn') {
                self.move('next');
            } else {
                var index = $(this).index();
                self.move(index);
            }

        })
        self.wrap.on('mouseenter', function () {
            $('.oclick span').css('opacity', '0.7');
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            self.flag = true;
            $('.oclick span').css('opacity', '0.3');
            self.siliderAuto();
            
        })
    }
    Swiper.prototype.move = function (dir) {
        var self = this;
        var len = this.len;
        var itemWidth = this.itemWidth;
        if (self.key) {
            self.key = false;
            if (dir == 'prev' || dir == 'next') {
                if (dir == 'prev') {
                    if (this.nowIndex == 0) {
                        $('#swiper .content').css({
                            left: (-len * itemWidth)
                        })
                        this.nowIndex = len - 1;
                    } else {
                        this.nowIndex = this.nowIndex - 1;
                    }
                } else {
                    if (this.nowIndex == len - 1) {
                        $('#swiper .content').animate({
                            left: (-len * itemWidth)
                        }, function () {
                            $(this).css({
                                left: 0
                            });
                            self.key = true;
                            self.siliderAuto();
                        })
                        this.nowIndex = 0;
                    } else {
                        this.nowIndex = this.nowIndex + 1;
                    }
                }
            } else {
                this.nowIndex = dir;
            }
            self.slider();
            self.changeStyle();
        }
    }
    Swiper.prototype.slider = function () {
        var self = this;
        $('#swiper .content').animate({
            left: -self.nowIndex * self.itemWidth,
        }, function () {
            self.key = true;
            self.siliderAuto();
        })
    }
    Swiper.prototype.changeStyle = function () {
        $('#swiper .active').removeClass('active');
        $('#swiper .oindex>li').eq(this.nowIndex).addClass('active');
    }
    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || {};
            new Swiper(options);
        }
    })
})(jQuery);