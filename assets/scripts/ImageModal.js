---
---
"use strict";
(() => {
    // Constent values
    const SKETCHFAB_MODEL = "sketchfab-model";
    const SKETCHFAB_ID = "sketchfabid";
    const ZOOM_IN = "zoom-in-image";
    const ZOOM_OUT = "zoom-out-image";
    /** sketchfab iframe html */
    function sketchEmbed(id) {
        return `
      <iframe id="sketchfab-iframe"
      src="https://sketchfab.com/models/${id}/embed" frameborder="0"
      allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
    `;
    }
    function setup() {
        // get array of elements with class 
        const imgList = $(".img-thumbnail");
        // Get the modal
        let modal = new Modal(imgList);
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        imgList.each(function (index, element) {
            var jElement = $(element);
            jElement.click(() => modal.SetNewElement(index));
        });
        createKeyBinding(modal);
    }
    function createKeyBinding(modal) {
        $(document).keydown(function (e) {
            if (e.key === "Escape") { // escape key maps to keycode `27`
                modal.Hide();
            }
            else if (e.key === "ArrowLeft") {
                modal.ShowPrevious();
            }
            else if (e.key === "ArrowRight") {
                modal.ShowNext();
            }
        });
    }
    class Modal {
        constructor(imgList) {
            this.imgList = imgList;
            this.outer = $('#galleryModal');
            this.captionText = this.outer.find("#caption");
            this.modalContent = this.outer.find(".modal-content");
            this.modalImg = this.outer.find("#modal-image");
            this.sketchWrapper = this.outer.find('#sketch-wrapper');
            this.nextButton = $(".nextImg").first();
            this.nextButton = this.outer.find(".nextImg");
            this.previousButton = this.outer.find(".previousImg");
            this.closeButton = this.outer.find(".close");
            this.nextButton.click(() => { this.ShowNext(); });
            this.previousButton.click(() => { this.ShowPrevious(); });
            this.closeButton.click(() => { this.Hide(); });
            this.setupOuterClick();
            this.imageZoom = new ImageZoom(this.modalImg);
            this.Hide();
        }
        setupOuterClick() {
            // hides modal if clicking outside of image and buttons
            const notOuterElement = [
                this.modalImg.get(0),
                this.nextButton.get(0),
                this.previousButton.get(0),
                this.closeButton.get(0)
            ];
            this.outer.click((e) => {
                let notOuter = notOuterElement.indexOf(e.target) === -1;
                if (notOuter) {
                    this.Hide();
                }
            });
        }
        Show() {
            this.outer.css("display", "block");
            this.hidden = false;
        }
        Hide() {
            this.outer.css("display", "none");
            this.hidden = true;
        }
        SetNewElement(index) {
            var jElement = this.imgList.eq(index);
            this.currentIndex = index;
            let isSketchFab = jElement.hasClass(SKETCHFAB_MODEL);
            this.toggleImageDisplay(!isSketchFab);
            if (isSketchFab) {
                this.setSketchFabViewer(jElement);
            }
            else {
                this.setNewImage(jElement);
            }
            this.Show();
        }
        /** Toggles Between Image and sketchfab embed */
        toggleImageDisplay(displayImage) {
            const NONE = "none";
            const BLOCK = "block";
            const DISPLAY = "display";
            this.sketchWrapper.css(DISPLAY, displayImage ? NONE : BLOCK);
            this.modalImg.css(DISPLAY, displayImage ? BLOCK : NONE);
        }
        setNewImage(jElement) {
            const SOURCE = "src";
            const ALT = "alt";
            const INNER = "innerHTML";
            var src = jElement.attr(SOURCE);
            var alt = jElement.attr(ALT);
            this.modalImg.attr(SOURCE, src);
            this.captionText.attr(INNER, alt);
            // image zoom
            this.imageZoom.RefreshImage();
        }
        setSketchFabViewer(jElement) {
            var id = jElement.attr(SKETCHFAB_ID);
            var html = sketchEmbed(id);
            this.sketchWrapper.html(html);
        }
        ShowNext() {
            let nextIndex = this.getNextIndex();
            this.SetNewElement(nextIndex);
        }
        ShowPrevious() {
            let previousIndex = this.getPreviousIndex();
            this.SetNewElement(previousIndex);
        }
        getNextIndex() {
            var next = this.currentIndex + 1;
            return next < this.imgList.length ? next : 0;
        }
        getPreviousIndex() {
            var prev = this.currentIndex - 1;
            return prev > 0 ? prev : this.imgList.length - 1;
        }
    }
    class ImageZoom {
        constructor(imageElement) {
            this.img = imageElement;
            this.img.click(() => this.imgClicked());
            this.RefreshImage();
        }
        RefreshImage() {
            var { naturalWidth, naturalHeight, height } = this.img.get(0);
            this.naturalHeight = naturalHeight;
            this.naturalWidth = naturalWidth;
            this.isZoomed = false;
            this.canZoom = this.naturalHeight > height;
            if (this.canZoom) {
                this.UnZoom();
            }
            else {
                this.img.removeClass([ZOOM_IN, ZOOM_OUT]);
                this.removeSize();
            }
        }
        imgClicked() {
            if (this.canZoom) {
                if (this.isZoomed) {
                    this.UnZoom();
                }
                else {
                    this.Zoom();
                }
            }
        }
        Zoom() {
            this.isZoomed = true;
            this.img.removeClass(ZOOM_IN);
            this.img.addClass(ZOOM_OUT);
            this.addSize();
        }
        UnZoom() {
            this.isZoomed = false;
            this.img.removeClass(ZOOM_OUT);
            this.img.addClass(ZOOM_IN);
            this.removeSize();
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
    setup();
})();
