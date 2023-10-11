
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