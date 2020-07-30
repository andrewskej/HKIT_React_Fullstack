$(document).ready(function(){
    $('#mycarousel').carousel({interval:2000})
    $("#carouselButton").click(function(){
        if ($("#carouselButton").children().children().hasClass('fa-pause')) {
            $("#mycarousel").carousel('pause');
            $("#carouselButton").children().children().removeClass('fa-pause');
            $("#carouselButton").children().children().addClass('fa-play');
        }
        else if ($("#carouselButton").children().children().hasClass('fa-play')){
            $("#mycarousel").carousel('cycle');
            $("#carouselButton").children().children().removeClass('fa-play');
            $("#carouselButton").children().children().addClass('fa-pause');                    
        }
    });
})

$('#reserveButton').on('click', function(){
    $('#reserveModal').modal()
})

$('#loginButton').on('click', function(){
    $('#loginModal').modal()
})