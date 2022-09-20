$(document).ready(function(){
    $(".lastCard ul li h2").click(function(){
        $(this).next("div").slideToggle();
        $(this).toggleClass("on");
        $(this).parent().siblings("li").children("div").slideUp();
        $(this).parent().siblings("li").children("h2").removeClass("on");
    });
});