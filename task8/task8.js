$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    PopUpHide();
});
//Функция отображения PopUp
function PopUpShow(){
    $("#popup1").show();
}
//Функция скрытия PopUp
function PopUpHide(){
    $("#popup1").hide();
}
$(function(){
    $(".ajaxForm").submit(function(e){
      e.preventDefault();
      var href = $(this).attr("action");
      $.ajax({
        type: "POST",
        dataType: "json",
        url: href,
        data: $(this).serialize(),
        success: function(response){
          if(response.status == "success"){
            alert("Данные отправились, спасибо!");
            var frm = document.getElementsByName('contact-form')[0];
            frm.reset();
            return false;
          }else{
            alert("Произошла ошибка: " + response.message);
          }
        }
      });
    });
  });
area.onchange = function(e1) {
    localStorage.setItem("text", e1.target.value)
    }
    if(localStorage.text) area.value = localStorage.text
phone.onchange = function(e2) {
    localStorage.setItem("number", e2.target.value)
    }
    if(localStorage.number) phone.value = localStorage.number
mail.onchange = function(e3) {
    localStorage.setItem("email", e3.target.value)
    }
    if(localStorage.email) mail.value = localStorage.email
orz.onchange = function(e4) {
    localStorage.setItem("orz", e4.target.value)
    }
    if(localStorage.orz) orz.value = localStorage.orz
coob.onchange = function(e5) {
    localStorage.setItem("coob", e5.target.value)
    }
    if(localStorage.coob) coob.value = localStorage.coob
