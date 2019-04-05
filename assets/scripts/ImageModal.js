---
---
"use strict";
(() => {
    // Constent values
    const SKETCHFAB_MODEL = "sketchfab-model";
    const SKETCHFAB_ID = "sketchfabid";
    // get image list
    const imgList = $(".img-thumbnail");
    // Get the modal
    const modal = $('#myModal');
    const captionText = modal.find("#caption");
    const modalContent = modal.find(".modal-content");
    const modalImg = modal.find("#modal-image");
    const sketchWrapper = modal.find('#sketch-wrapper');
    let nextImg;
    let previousImg;
    function sketchEmbed(id) {
        return `
  <iframe id="sketchfab-iframe"
  src="https://sketchfab.com/models/${id}/embed" frameborder="0"
  allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  `;
    }
    function setImageDisplay(displayImage) {
        if (displayImage) {
            sketchWrapper.css("display", "none");
            modalImg.css("display", "block");
        }
        else {
            sketchWrapper.css("display", "block");
            modalImg.css("display", "none");
        }
    }
    function setNewImage(jElement) {
        var src = jElement.attr("src");
        modalImg.attr("src", src);
        var alt = jElement.attr("alt");
        captionText.attr("innerHTML", alt);
        // image zoom
        new ModalImage(modalImg);
    }
    function setSketchFabViewer(jElement) {
        var id = jElement.attr(SKETCHFAB_ID);
        var html = sketchEmbed(id);
        sketchWrapper.html(html);
    }
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    imgList.each(function (index, element) {
        var jElement = $(element);
        jElement.click(function () {
            ShowModal();
            nextImg = imgList.get(index + 1 < imgList.length
                ? index + 1
                : 0);
            previousImg = imgList.get(index - 1);
            let isSketchFab = jElement.hasClass(SKETCHFAB_MODEL);
            setImageDisplay(!isSketchFab);
            if (isSketchFab) {
                setSketchFabViewer(jElement);
            }
            else {
                setNewImage(jElement);
            }
        });
    });
    // Get the <span> element that closes the modal
    const nextButton = $(".nextImg").first();
    nextButton.click(ShowNext);
    // Get the <span> element that closes the modal
    const previousButton = $(".previousImg").first();
    previousButton.click(ShowPrevious);
    // Get the <span> element that closes the modal
    var closeButton = $(".close").first();
    closeButton.click(CloseModal);
    const dontClick = [
        modalImg.get(0),
        nextButton.get(0),
        previousButton.get(0),
        closeButton.get(0)
    ];
    modal.click((e) => {
        let notInDontClick = dontClick.indexOf(e.target) === -1;
        if (notInDontClick) {
            CloseModal();
        }
    });
    function ShowModal() {
        modal.css("display", "block");
    }
    function CloseModal() {
        modal.css("display", "none");
    }
    function ShowNext() {
        if (nextImg !== undefined) {
            nextImg.click();
        }
    }
    function ShowPrevious() {
        if (previousImg !== undefined) {
            previousImg.click();
        }
    }
    $(document).keydown(function (e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            CloseModal();
        }
        else if (e.key === "ArrowLeft") {
            console.log("left, previous");
            ShowPrevious();
        }
        else if (e.key === "ArrowRight") {
            console.log("right, next");
            ShowNext();
        }
    });
    const ZOOM_IN = "zoom-in-image";
    const ZOOM_OUT = "zoom-out-image";
    class ModalImage {
        constructor(imageElement) {
            var { naturalWidth, naturalHeight, width, height } = imageElement.get(0);
            this.img = imageElement;
            this.height = height;
            this.naturalHeight = naturalHeight;
            this.naturalWidth = naturalWidth;
            if (naturalHeight > height) {
                // can zoom
                this.setZoomedOutState();
            }
            else {
                this.img.removeClass([ZOOM_IN, ZOOM_OUT]);
                this.removeSize();
                modalImg.off("click");
            }
        }
        setZoomedOutState() {
            this.img.removeClass(ZOOM_OUT);
            this.img.addClass(ZOOM_IN);
            this.removeSize();
            // needs to be called like this so that `this` context isnt lost
            this.img.click(() => { this.setZoomedInState(); });
        }
        setZoomedInState() {
            this.img.removeClass(ZOOM_IN);
            this.img.addClass(ZOOM_OUT);
            this.addSize();
            this.img.click(() => { this.setZoomedOutState(); });
        }
        addSize() {
            this.img.css("width", `${this.naturalWidth}px`);
            this.img.css("height", `${this.naturalHeight}px`);
            this.img.css("max-width", "none");
            this.img.css("max-height", "none");
        }
        removeSize() {
            this.img.css("width", "");
            this.img.css("height", "");
            this.img.css("max-width", "");
            this.img.css("max-height", "");
        }
    }
})();
