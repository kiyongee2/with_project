$(function(){
    
    // 메인페이지 찜 버튼
    $(".product").mouseover(function(){
        $(this).children("button").stop().css("opacity","1")
    }).mouseout(function(){
        $(this).children("button").stop().css("opacity","0")
    })
    // 메인페이지 찜 버튼 끝

 // ======== header 시작 ========
    // 접근할 요소 변수로 선언
    let mainHeader = "header";
    // 스크롤시 header height 조정, 아이콘 변경 프로그램
    $(window).scroll(function(){ 
        let winS = $(window).scrollTop();
        let screenW = $(window).width();
        // console.log(winS);
        // console.log(screenW);
        if(winS < 30){
            $(mainHeader).height((150-winS)+"px");
        }else if(winS < 80){
            $(mainHeader).height((150-winS)+"px");
        }else{
            $(mainHeader).height("70px");
        }
    });
    // ======== header 끝   ========


    // ======== login popup 시작 ========
    // 로그인 클릭시 body에 빈 div를 생성하여 추가함
    // 이후 div에 새로운 div를 추가하고 요소 안에 login_test.html를 추가함



    //로그인 팝업 임시 주석처리

    // $(".fa-user").click(function(){
    //     console.log("click login");
    //     $("body").append("<div class='demo'></div>");
    //     $(".demo").css({
    //         "width":"100%", "height":"100%", "background":"rgba(0,0,0,0.35)",
    //         "position":"fixed", "top":"0", "left":"0", "z-index":"6000"
    //     });
    //     $(".demo").append("<div></div>")
    //     $(".demo div").css({
    //         "width":"90%", "height":"90%", "border":"10px solid #ccc", 
    //         "border-radius":"20px", 
    //         "position":"fixed", "top":"5%", "left":"5%", "overflow":"auto"
    //     });
    //     $(".demo>div").load("../login.html");
    //     $(".demo>div").click(function(){$(".demo").remove()});
    // });
    


    
    
    // ======== login popup 끝   ========
    
    // 주문 옵션 추가 기능
    
    function addCommaToString(num){ //콤마 추가 후 문자열 파싱
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function subCommaToInt(str){ //콤마 제거 후 정수 파싱
       return parseInt(str.split(',').join(""));
    }

    //select 된 값 받아오기
    let price;
    $(".order_option").change(function () {
        let val = $(this).val()
        $(".order_name").val(val)
        $(".order_num").val(1)
        $(".order_controll").css("display", "flex")

        price = $(".order_option").val().substr(9) //수정 필요
        price = price.slice(0,-2)

        price = subCommaToInt(price);
        
    })
    //옵션 수량 컨트롤 버튼
    let orderNum;
    $(".order_controll button").click(function () {
        orderNum = Number($(".order_num").val())
        if ($(this).val() == "+") {
            orderNum = Number($(".order_num").val())
            orderNum++
            $(".order_num").val(orderNum)
        } else if ($(".order_num").val() > 0) {
            if ($(this).val() == "-") {
                orderNum = Number($(".order_num").val())
                orderNum--
                $(".order_num").val(orderNum)
            }
        }
    })
    
    //선택옵션 요소 생성 후 각각 고유id부여
    let i = 1; //count 변수 i == id값으로도 쓰임
    //문자열로 변환 후 정규식으로 1000단위 "," 생성 코드
    let currentPrice = ""; 
    let finalPrice = 0;
    $(".order_send").click(function () {
        currentPrice = price*parseInt(orderNum) // 옵션 가격 * 선택 수량 
        currentPrice = addCommaToString(currentPrice)
        if(i<4){
            let add = "id = num" 
            add += i
            $("<div class = 'order_check_inner' " + add + "></div>").appendTo(".order_check")
            let c = $(".order_name").val()
            c += " 수량 : "
            c +=  $(".order_num").val()
            $("#num"+i).text(c)
            $("<div><span> +" + currentPrice + "원 </span><button class = 'bt'>x</button></div>").appendTo("#num"+i)
            i++
            let resultPrice = $(".order_check_inner").eq(i-2).children("div").children("span").text()
            resultPrice = resultPrice.slice(2,-2)
            resultPrice = subCommaToInt(resultPrice);
            finalPrice += resultPrice
            // finalPrice += 15000;
            console.log(finalPrice);
            console.log($(".order_option").val().replace(/[^0-9]/g,""));
            
            $(".order_price p").css("display","block")
            $(".order_price p").text(addCommaToString(finalPrice)+"원 ")
        }
    })
    
    
    



    //선택옵션 삭제
    $(document).on("click",".bt",function(){
        i--
        console.log("button");
        $(this).parent().parent().remove()
        
        console.log($(this).parent().children("span").text());
        finalPrice -=subCommaToInt($(this).parent().children("span").text())

        $(".order_price").text(addCommaToString(finalPrice)+"원 결제하기")

    })

})