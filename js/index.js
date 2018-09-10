/**
 * Created by lenovo on 2018/9/4.
 */
console.log("webstrom��ͻ��֤");

$(function(){
    //�ı��ֲ���ʱ���ٶ�
    //$('.carousel').carousel({
    //    interval: 2000
    //});

    //�����ֲ�
    banner();

    initProduct();
});

function banner(){
    /*
    *  ����:
    *  1. ģ������(�Ӻ�̨��ȡ����)
    *  2. �жϵ�ǰ�豸(С��768px)
    *  3. ���ݵ�ǰ�豸������ת����html(�ַ���ƴ��)
    *  3.1 �������Ķ�̬����
    *  3.2 ͼƬ�����Ķ�̬����
    *  4. ��Ⱦ��ҳ����(׷�ӵ�html��)
    *  5. �����ܷ���Ӧ�������豸 ����ҳ��ߴ�ı���Ⱦ
    *  6. �ƶ��������л�����(�� �һ�)
    */

    //��ȡDomԪ��
    var wjs_banner = $(".wjs_banner");
    //��ȡ��
    var points = $(".carousel-indicators");
    //��ȡͼ
    var imgs = $(".carousel-inner");
    //��ȡwindow���ڴ�С
    var windowSize = $(window).width();
    //�����Ƿ�Ϊ�ƶ��豸
    var isMobile;

    //1. ģ������ͼƬ(�Ӻ�̨��ȡ����)
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

    //3. ���ݵ�ǰ�豸������ת����html(�ַ���ƴ��)
    //   ��Ⱦ
         var render = function(){
             //2. �жϵ�ǰ�豸(С��768px)
             isMobile = windowSize > 768 ? false : true;
             //   3.1 �������Ķ�̬����
                  var pointsHTML = '';
             //   3.2 ͼƬ�����Ķ�̬����
                  var imgsHTML = '';
             //       ѭ����������
             $.each(data, function(i, v){
                 //����Ⱦ \nʹli�ո�ֿ�����
                 pointsHTML += '<li data-target="#carousel-example-generic" data-slide-to="'+ i +'" '+ (i==0 ? 'class="active"' : '') +'></li>\n';
                 //ͼ��Ⱦ
                 imgsHTML += '<div class="item '+ (i==0 ? 'active' : '') +'">';
                 if(isMobile){
                     //��С����Ļ
                     imgsHTML += '<a href="javaScript:;" class="m_Img"><img src="'+ v.M_img +'" alt=""/></a>';
                 } else {
                     //url('+ v.PC_img +')���д��url("'+ v.PC_img +'")��û��ͼƬ��ʾ
                     imgsHTML += '<a href="javaScript:;" class="PC_Img" style="background: url('+ v.PC_img +') no-repeat center"></a>';
                 }
                 imgsHTML += '</div>';
             });

             //4. ��Ⱦ��ҳ����(׷�ӵ�html��)
             imgs.html(imgsHTML);
             points.html(pointsHTML);

             //����д��
             //imgs.html($('<a href="javaScript:;" class="m_Img"></a>').css("backgroundImage", "url("+ v.M_img +")"));
         };

    //������Ⱦ
    //render();

    //5. �����ܷ���Ӧ�������豸 ����ҳ��ߴ�ı���Ⱦ
    $(window).on("resize", function(){
        //ÿ��ҳ��ı��С��������Ⱦ�ֲ�ͼ��trigger������ʾ����resize()����һ��
        windowSize = $(window).width();
        render();
    }).trigger('resize');

    //6. �ƶ��������л�����(�� �һ�)
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
                //��һ��
                wjs_banner.carousel('prev');
            } else {
                //��һ��
                wjs_banner.carousel('next');
            }
        }

        //����
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
}

//ʵ�ֲ�Ʒģ�����ƶ��˻�������
var initProduct = function(){
    //1. �����е�ҳǩ��һ����ʾ����Ԫ�صĿ��Ϊ������Ԫ�ؿ��֮��
         // ��ȡDOMԪ��
         var nav_tabs = $('.wjs_product .nav-tabs');
         var lis = nav_tabs.find('li');
         //���ø�Ԫ�ؿ��
         var width = 0;
         //����li
         $.each(lis, function(i, v){
            //width: ���ݿ��
            //innerWidth: ���ݿ�� + padding
            //outerWidth: ���ݿ�� + padding + �߿�
            //outerWidth(true): ���ݿ�� + padding + �߿� + margin
            width += $(v).outerWidth(true);
         });
         nav_tabs.width(width);

    //2. �������⻹����Ӱ���
    //   HTML�����

    //3. ʵ�����һ�����ʹ��iscroll���
         var myScroll = new IScroll('.tabBox',{
             //mouseWheel: true,
             //scrollbars: true
             scrollX: true,
             scrollY: false
         });
};

//��ʼ��bootstrap Static tooltip������ʾ��
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

