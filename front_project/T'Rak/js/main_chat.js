$(function(){
    //채팅목록 마우스 오버기능
$(".chatlistbox li").mouseover(function(){
        $(this).find('i').addClass("fa-ellipsis-vertical fa-solid")
}).mouseout(function(){
        $(this).find('i').removeClass("fa-ellipsis-vertical fa-solid")
})

//채팅창 타이머바 및 시간
$("#start").click(function(){
    let time = 60;
function init(){
    document.getElementById("digit").innerHTML = "60초";
}

    $(".timerBar").addClass("element")
    $(".versus2").addClass("vindex2")

    if(time != 0){
            timer = setInterval(function(){
                    time--;
    
                    document.getElementById("digit").innerHTML = time + "초";
                }, 1000)
                if(time == 0 );{
                clearInterval
                time = 60;
            }
     }
})

$("#gameone").click(function(){
    $(".versus3").addClass("vindex3")
})

$("#gametwo").click(function(){
    $(".versus4").addClass("vindex4")
})

});