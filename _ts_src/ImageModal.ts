var imgList = $(".img-thumbnail");


// Get the modal
var modal = $('#myModal');
var modalImg = modal.find("img");
var captionText = modal.find("#caption");

var nextImg: HTMLElement;
var previousImg: HTMLElement;


// Get the image and insert it inside the modal - use its "alt" text as a caption
imgList.each(function (index, element: HTMLElement) {

  var jElement = $(element);
  jElement.click(function () {
    modal.css("display", "block");
    var src = jElement.attr("src");
    modalImg.attr("src", src);
    var alt = jElement.attr("alt");
    captionText.attr("innerHTML", alt);

    var h1 = modal.innerHeight();
    var h2 = modalImg.height();

    var top = (h1 - h2) / 2;
    modalImg.css("top", top);

    nextImg = imgList.get(index + 1);
    previousImg = imgList.get(index - 1);
  });
});


// Get the <span> element that closes the modal
var nextButton = $(".nextImg").first();
nextButton.click(function () {
  if (nextImg !== undefined) {
    nextImg.click();
  }
});

// Get the <span> element that closes the modal
var previousButton = $(".previousImg").first();
previousButton.click(function () {
  if (previousImg !== undefined) {
    previousImg.click();
  }
});
// Get the <span> element that closes the modal
var closeButton = $(".close").first();
closeButton.click(function () {
  modal.css("display", "none");
});