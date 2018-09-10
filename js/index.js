/**
 * Created by lenovo on 2018/9/4.
 */
console.log("webstrom冲突验证");

$(function(){
    //改变轮播定时器速度
    //$('.carousel').carousel({
    //    interval: 2000
    //});

    //调用轮播
    banner();

    initProduct();
});

function banner(){
    /*
    *  步骤:
    *  1. 模拟数据(从后台获取数据)
    *  2. 判断当前设备(小于768px)
    *  3. 根据当前设备把数据转换成html(字符串拼接)
    *  3.1 点容器的动态生成
    *  3.2 图片容器的动态生成
    *  4. 渲染到页面中(追加到html中)
    *  5. 测试能否响应，两种设备 监听页面尺寸改变渲染
    *  6. 移动端手势切换功能(左滑 右滑)
    */

    //获取Dom元素
    var wjs_banner = $(".wjs_banner");
    //获取点
    var points = $(".carousel-indicators");
    //获取图
    var imgs = $(".carousel-inner");
    //获取window窗口大小
    var windowSize = $(window).width();
    //定义是否为移动设备
    var isMobile;

    //1. 模拟数据图片(从后台获取数据)
    var data = [
        {
          PC_img: "images/slide_01_2000x410.jpg",
          M_img: "images/slide_01_640x340.jpg"
        },
        {
          PC_img: "images/slide_02_2000x410.jpg",
          M_img: "images/slide_02_640x340.jpg"
        },
        {
          PC_img: "images/slide_03_2000x410.jpg",
          M_img: "images/slide_03_640x340.jpg"
        },
        {
          PC_img: "images/slide_04_2000x410.jpg",
          M_img: "images/slide_04_640x340.jpg"
        }
    ];

    //3. 根据当前设备把数据转换成html(字符串拼接)
    //   渲染
         var render = function(){
             //2. 判断当前设备(小于768px)
             isMobile = windowSize > 768 ? false : true;
             //   3.1 点容器的动态生成
                  var pointsHTML = '';
             //   3.2 图片容器的动态生成
                  var imgsHTML = '';
             //       循环遍历数据
             $.each(data, function(i, v){
                 //点渲染 \n使li空格分开距离
                 pointsHTML += '<li data-target="#carousel-example-generic" data-slide-to="'+ i +'" '+ (i==0 ? 'class="active"' : '') +'></li>\n';
                 //图渲染
                 imgsHTML += '<div class="item '+ (i==0 ? 'active' : '') +'">';
                 if(isMobile){
                     //超小屏屏幕
                     imgsHTML += '<a href="javaScript:;" class="m_Img"><img src="'+ v.M_img +'" alt=""/></a>';
                 } else {
                     //url('+ v.PC_img +')如果写成url("'+ v.PC_img +'")则没有图片显示
                     imgsHTML += '<a href="javaScript:;" class="PC_Img" style="background: url('+ v.PC_img +') no-repeat center"></a>';
                 }
                 imgsHTML += '</div>';
             });

             //4. 渲染到页面中(追加到html中)
             imgs.html(imgsHTML);
             points.html(pointsHTML);

             //或者写成
             //imgs.html($('<a href="javaScript:;" class="m_Img"></a>').css("backgroundImage", "url("+ v.M_img +")"));
         };

    //调用渲染
    //render();

    //5. 测试能否响应，两种设备 监听页面尺寸改变渲染
    $(window).on("resize", function(){
        //每次页面改变大小都重新渲染轮播图，trigger方法表示调用resize()方法一次
        windowSize = $(window).width();
        render();
    }).trigger('resize');

    //6. 移动端手势切换功能(左滑 右滑)
    var startX, moveX, distanceX;
    wjs_banner[0].addEventListener('touchstart', function(e){
        startX = e.targetTouches[0].clientX;
    });
    wjs_banner[0].addEventListener('touchmove', function(e){
        moveX = e.targetTouches[0].clientX;
        distanceX = moveX - startX;
    });
    wjs_banner[0].addEventListener('touchsend', function(e){
        if(Math.abs(distanceX) >= 50){
            if(distanceX > 0){
                //上一张
                wjs_banner.carousel('prev');
            } else {
                //下一张
                wjs_banner.carousel('next');
            }
        }

        //重置
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
}

//实现产品模块在移动端滑动功能
var initProduct = function(){
    //1. 把所有的页签在一行显示，父元素的宽度为所有子元素宽度之和
         // 获取DOM元素
         var nav_tabs = $('.wjs_product .nav-tabs');
         var lis = nav_tabs.find('li');
         //设置父元素宽度
         var width = 0;
         //遍历li
         $.each(lis, function(i, v){
            //width: 内容宽度
            //innerWidth: 内容宽度 + padding
            //outerWidth: 内容宽度 + padding + 边框
            //outerWidth(true): 内容宽度 + padding + 边框 + margin
            width += $(v).outerWidth(true);
         });
         nav_tabs.width(width);

    //2. 父盒子外还需盒子包容
    //   HTML中添加

    //3. 实现左右滑动，使用iscroll插件
         var myScroll = new IScroll('.tabBox',{
             //mouseWheel: true,
             //scrollbars: true
             scrollX: true,
             scrollY: false
         });
};

//初始化bootstrap Static tooltip上下提示框
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

