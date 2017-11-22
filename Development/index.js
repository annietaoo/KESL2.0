//dd menu toggle;
$(document).ready(function(){
  $('.hamburger-button').click(function() {
      $(this).toggleClass('change');
      $('.drop-down-menu').toggle();
      return false;
  });
  
  $("#email").on("blur", validateEmail);
  $("#email, #confirm-email").on("blur", checkEmailMatch);
  $("#username").on("blur", validateUserName);
  $("#password").on("blur", validatePassword);
  $("#password, #confirm-password").on("blur", checkPasswordMatch);
  
  $("#registration-submit").bind("click", registrationValidation);
  $("#registration-form").on('submit', function(e) {
    e.preventDefault();
    if(registratonValidation() == true)
    this.submit();
  });
});

//slideshow style interval
var autoSwap = setInterval( swap,3500);

//pause slideshow and reinstantiate on mouseout
$('ul').hover(
  function () {
    clearInterval(autoSwap);
}, 
  function () {
   autoSwap = setInterval( swap,3500);
});

//global variables
var items = [];
var startItem = 1;
var position = 0;
var itemCount = $('.kesl-carousel li.items').length;
var leftpos = itemCount;
var resetCount = itemCount;

//unused: gather text inside items class
$('li.items').each(function(index) {
    items[index] = $(this).text();
});

//swap images function
function swap(action) {
  var direction = action;
  
  //moving carousel backwards
  if(direction == 'counter-clockwise') {
    var leftitem = $('.left-pos').attr('id') - 1;
    if(leftitem == 0) {
      leftitem = itemCount;
    }
    
    $('.right-pos').removeClass('right-pos').addClass('back-pos');
    $('.main-pos').removeClass('main-pos').addClass('right-pos');
    $('.left-pos').removeClass('left-pos').addClass('main-pos');
    $('#'+leftitem+'').removeClass('back-pos').addClass('left-pos');
    
    startItem--;
    if(startItem < 1) {
      startItem = itemCount;
    }
  }
  
  //moving carousel forward
  if(direction == 'clockwise' || direction == '' || direction == null ) {
    function pos(positionvalue) {
      if(positionvalue != 'leftposition') {
        //increment image list id
        position++;
        
        //if final result is greater than image count, reset position.
        if((startItem+position) > resetCount) {
          position = 1-startItem;
        }
      }
    
      //setting the left positioned item
      if(positionvalue == 'leftposition') {
        //left positioned image should always be one left than main positioned image.
        position = startItem - 1;
      
        //reset last image in list to left position if first image is in main position
        if(position < 1) {
          position = itemCount;
        }
      }
   
      return position;
    }  
  
   $('#'+ startItem +'').removeClass('main-pos').addClass('left-pos');
   $('#'+ (startItem+pos()) +'').removeClass('right-pos').addClass('main-pos');
   $('#'+ (startItem+pos()) +'').removeClass('back-pos').addClass('right-pos');
   $('#'+ pos('leftposition') +'').removeClass('left-pos').addClass('back-pos');

    startItem++;
    position=0;
    if(startItem > itemCount) {
      startItem = 1;
    }
  }
}

//if any visible items are clicked
$('li').click(function() {
  if($(this).attr('class') == 'items left-pos') {
     swap('counter-clockwise'); 
  }
  else {
    swap('clockwise'); 
  }
});

//form submission

$('#CTA-email').keypress(function (e) {
  if (e.which == 13) {
    $('.kesl-newsletter-title').toggle();
    $('#CTA-email').toggle();
    $('#CTA-email-2').toggle();
    $('.newsletter-submit-success').toggle();
    return false;
  }
});

$('#CTA-email-2').keypress(function (e) {
  if (e.which == 13) {
    $('.kesl-newsletter-title').toggle();
    $('#CTA-email').toggle();
    $('#CTA-email-2').toggle();
    $('.newsletter-submit-success').toggle();
    return false;
  }
});

function validateEmail() {
    var email = $("#email").val();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
        $("#invalid-email").css('display','none');
    }
    else {
        $("#invalid-email").css('display','block');
    }
    return re.test(email);
}

function checkEmailMatch() {
    var email = $("#email").val();
    var confirmEmail = $("#confirm-email").val();

    if (email!= confirmEmail){
        $("#email-dnm").css('display','block');
        return false;
    }
    else{
        $("#email-dnm").css('display','none');
        return true;
    }
}

function validateUserName() {
    var username = $("#username").val();
    var re = /^((?!_)[A-Za-z0-9]){1,30}$/;
    if(re.test(username))
        $("#invalid-user").css('display','none');
    else
        $("#invalid-user").css('display','block');
    return re.test(username);
}

function validatePassword() {
    var psw = $("#password").val();
    var re = /^([0-9a-zA-Z@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\?]){1,30}$/;
    if(re.test(psw))
        $("#invalid-psw").css('display','none');
    else
        $("#invalid-psw").css('display','block');
    return re.test(psw);
}

function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#confirm-password").val();

    if (password != confirmPassword){
        $("#psw-dnm").css('display','block');
        return false;
    }
    else{
        $("#psw-dnm").css('display','none');
        return true;
    }
}

function privacyAndTermsChecked() {
  var cb = $("#privacy-and-terms");
  if (cb.is(':checked')){
    $("#pt-check-error").css('display','none');
  }
  else {
    $("#pt-check-error").css('display','block');
  }
  return re.test(cb);
}

function registrationValidation() {
  if (validateEmail() && checkEmailMatch() && validateUserName() && validatePassword() && checkPasswordMatch() && privacyAndTermsChecked()) {
    return true;
  }
  else {
      if(!validateEmail()) {
          $("#invalid-email").css('display','block');
        }
      if(!checkEmailMatch()){
          $("#email-dnm").css('display','block');
      }
      if(!validateUserName()){
          $("#invalid-user").css('display','block');
      }
      if(!validatePassword()){
          $("#invalid-psw").css('display','block');
      }
      if(!checkPasswordMatch()){
          $("#psw-dnm").css('display','block');
      }
      if(!privacyAndTermsChecked()){
          $("#pt-check-error").css('display','block');
      }
      return false;
  }
}