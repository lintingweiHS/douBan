$('#swiper').sliderImg({
    image: ['https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2753.jpg', 'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2756.jpg', 'https://img1.doubanio.com/view/music_index_banner/raw/public/banner-2747.jpg', 'https://img1.doubanio.com/view/music_index_banner/raw/public/banner-2749.jpg', 'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2750.jpg', 'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2732.jpg', 'https://img3.doubanio.com/view/music_index_banner/raw/public/banner-2743.jpg', 'https://img1.doubanio.com/view/music_index_banner/raw/public/banner-2727.jpg'],
    data: 1500
});
var content1 = [
    { image: 'image/new1.png', name: '&copy 放肆的肆', mark: '流行 Pop' },
    { image: 'image/new2.png', name: 'pentatonic', mark: '摇滚 Rock' },
    { image: 'image/new3.png', name: 'Phigma', mark: '世界音乐 World' },
    { image: 'image/new4.png', name: '地磁卡', mark: '说唱 Rap' },
    { image: 'image/new5.png', name: 'AirS', mark: '流行 Pop' },
    { image: 'image/new6.png', name: '&copy DVC', mark: '说唱 Rap' },
    { image: 'image/new7.png', name: '&copy 痛仰', mark: '摇滚 Rock' },
    { image: 'image/new8.png', name: 'Alternative for</br>Baroque', mark: '轻音乐 Easy Listening' }
];
var content2 = [
    { image: 'image/now1.png', name: 'Soil terrapin', mark: '说唱 Rap' },
    { image: 'image/now2.png', name: '鞭子情人', mark: '民谣 Folk' },
    { image: 'image/now3.png', name: 'Ascension Music</br>Group', mark: '说唱 Rap' },
    { image: 'image/now4.png', name: '包小静', mark: '说唱 Rap' },
    { image: 'image/now5.png', name: '德宏老爹', mark: '说唱 Rap' },
    { image: 'image/now6.png', name: '罗艺恒', mark: '流行 Pop' },
    { image: 'image/now7.png', name: '英伦盒子', mark: '民谣 Folk' },
    { image: 'image/now8.png', name: '李蔓', mark: '流行 Pop' },
];
function addDom(conBox, arr) {
    var strHtml = '';
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        strHtml += '<div class="box"><div class="imgBox">\
        <img src="'+ arr[i].image + '" alt="">\
        </div><div class="con"><a href="#" class="name">'+ arr[i].name + '</a>\
        <p>'+ arr[i].mark + '</p></div></div>'
    }
    conBox.html(strHtml);
    return conBox
}
var div1 = addDom($('<div class="conBox"></div>'), content1);
var div2 = addDom($('<div class="conBox"></div>'), content2);

$('#popular').tab({
    spanStr: '',
    tabList: ['流行音乐人', '流行音乐'],
    tabRight: '',
    conStr: [div1, div2],
});

// $.ajax({
//     type: "GET",
//     // url:'https://api.douban.com/v2/music/search',
//     url: './data.json',
//     success: function (data) {
//         console.log(data)
//     },
//     error:function(a){
//         console.log('error')
//     }
// })
// oinp.addEventListener('input', depounce(event, 800));
function bindEvent() {
    $('.inpt').on('input', depounce(event, 800));
}
function event(){
    var val = $(this).val();
    getData(val);
}
bindEvent()
function getData(value) {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'https://api.douban.com/v2/music/search?q=' + value + '&count=7',
        success: addItem,
        error: function () {
            alert('error')
        }

    });
}
function addItem(data) {
    var dataList = data.musics;
    var $list = $('.search_list');
    console.log(dataList);
    var str = "";
    dataList.forEach(function (ele, index) {
        str += '<li><a href="">\
                    <img src="'+ ele.image + '" alt="">\
                    <div><span>'+ ele.title + '</span><p>' + ele.author[0].name + '</p></div>\
                </a></li>';
    });
    $list.html(str);
}
function depounce(handle, delay) {
    var timer;
    return function () {
        var self = this;
        var arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(self, arg);
        }, delay);
    }
}