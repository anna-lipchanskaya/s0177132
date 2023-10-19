
  function click1() {
    let f1 = document.getElementsByName("field1");
    let f2 = document.getElementsByName("select1");
    let r = document.getElementById("result");
    if(f2[0].value == "v1") r.innerHTML = f1[0].value * 180;
    if(f2[0].value == "v2") r.innerHTML = f1[0].value * 100;
    if(f2[0].value == "v3") r.innerHTML = f1[0].value * 1800;
    if(f2[0].value == "v4") r.innerHTML = f1[0].value * 60;
    let s = document.getElementsByName("select1");
    console.log(s[0].value);
    return false;
  }

window.addEventListener('DOMContentLoaded', function (event) {
  let s = document.getElementsByName("myradios");
  s[0].addEventListener("change", function(event) {
    let radios = event.target;
    let select1 = document.getElementById("myselect1");
    let select2 = document.getElementById("myselect2");

    if (radios.value == "r2") {
      select1.style.display = "block";
    }
    else {
      select1.style.display = "none";
    }

    if (radios.value == "r3") {
      select2.style.display = "block";
    }
    else {
      select2.style.display = "none";
    }
  });
  
  let r1 = document.querySelectorAll(".myselect1 input");
  r1.forEach(function(select1) {
    select1.addEventListener("change", function(event) {
      let r1 = event.target;
      console.log(r1.value);
    });    
  });
  
  let r2 = document.querySelectorAll(".myselect2 input[type = checkbox]");
  r2.forEach(function(select2) {
    select2.addEventListener("change", function(event) {
      let r2 = event.target;
      console.log(r2.value);
    });    
  });
});
