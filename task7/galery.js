let imageList = [
    "image2.jpeg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpeg",
    "image6.jpeg",
    "image7.jpg",
    "image8.jpg",
    "image9.jpg",
  ];
  
  let image1 = document.getElementById("image1");
  let image2 = document.getElementById("image2");
  let image3 = document.getElementById("image3");

  let pager = document.getElementById("pager");
  
  let ind1 = 0;
  let ind2 = 1;
  let ind3 = 2;
  
  function indexCompute(index, isLeft) {
    if (isLeft)
      if (index == 0) return imageList.length - 1;
      else return (index - 1) % imageList.length;
    else return (index + 1) % imageList.length;
  }
  
  function swipeGalleryLeft() {
    ind1 = indexCompute(ind1, true);
    ind2 = indexCompute(ind2, true);
    ind3 = indexCompute(ind3, true);
  
    image1.src = imageList[ind1];
    image2.src = imageList[ind2];
    image3.src = imageList[ind3];
  
    if (ind2 == 0) pager.innerText = "8/8";
    else pager.innerText = ind2.toString() + "/8";
  }
  
  function swipeGalleryRight() {
    ind1 = indexCompute(ind1, false);
    ind2 = indexCompute(ind2, false);
    ind3 = indexCompute(ind3, false);
  
    image1.src = imageList[ind1];
    image2.src = imageList[ind2];
    image3.src = imageList[ind3];
  
    if (ind2 == 0) pager.innerText = "8/8";
    else pager.innerText = ind2.toString() + "/8";
  }
  
  window.addEventListener("DOMContentLoaded", function () {
    let b = document.getElementById("buttonLeft");
    b.addEventListener("click", swipeGalleryLeft);
  });
  
  window.addEventListener("DOMContentLoaded", function () {
    let b = document.getElementById("buttonRight");
    b.addEventListener("click", swipeGalleryRight);
  });