(function($){
    var obj = {
        init :function(opt){
            this.options = opt || {};
            this.createDom();
            this.bindEvent();
        },
        createDom:function(){
            var self = this;
            var opt = self.options;
            var wrap = opt.father;
            var len = opt.tabList.length;
            var oBander = $('<div class="bander"></div>')
            var oSpan = $('<span class="header"></span>');
            var oUl = $('<ul id="tabs"></ul>');
            var con = $('<div class="content"></div>');
            var tabHtml ='';
            for(var i = 0;i < len;i++){
                tabHtml+='<li><a href="#" tittle="tab'+i+'">'+opt.tabList[i]+'</a></li>';
            }
            oBander.append(oSpan.text(opt.spanStr))
                   .append(oUl.html(tabHtml));
            wrap.append(oBander).append(con.html(opt.conStr));
            for(var i = 0;i < len; i++){
                $($('.conBox')[i]).attr('id','tab' + i);
            }
            $('#tabs li a').eq(0).addClass('active');
            $(".content").find('.conBox:first').addClass('current');

        },
        bindEvent:function(){
            var self = this;
            $('#tabs').on('click','a',function(e){
                e.preventDefault();
                var tittle = $(this).attr('tittle');
                $('#popular .active').removeClass('active');
                $(this).attr('class','active');
                $('.current').removeClass("current");
                $('#' +tittle).addClass('current');
            })
        },
        
    };
    $.fn.extend({
        tab:function(option){
            option.father = this || $('body');
            obj.init(option);
        }
    })
})(jQuery)