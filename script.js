/* =====================================
   GET ALL GALLERY ITEMS
===================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");


/* Current visible images */

let visibleItems = Array.from(galleryItems);


/* Current image */

let currentImage = 0;


/* =====================================
   OPEN LIGHTBOX
===================================== */

function openLightbox(index) {

    /* Get currently visible gallery items */

    visibleItems =
        Array.from(galleryItems).filter(function(item) {

            return item.style.display !== "none";

        });


    /* Make sure index is valid */

    if (index < 0 || index >= visibleItems.length) {
        return;
    }


    currentImage = index;


    const lightbox =
        document.getElementById("lightbox");


    /* Show lightbox */

    lightbox.style.display = "flex";


    /* Update image */

    updateLightbox();

}


/* =====================================
   UPDATE LIGHTBOX
===================================== */

function updateLightbox() {

    if (visibleItems.length === 0) {
        return;
    }


    const lightboxImage =
        document.getElementById("lightboxImage");


    const lightboxTitle =
        document.getElementById("lightboxTitle");


    const currentItem =
        visibleItems[currentImage];


    /* Get image */

    const image =
        currentItem.querySelector("img");


    /* Get title */

    const title =
        currentItem.querySelector("h3");


    /* Show image */

    lightboxImage.src = image.src;


    /* Show title */

    lightboxTitle.textContent =
        title.textContent;

}


/* =====================================
   CLOSE LIGHTBOX
===================================== */

function closeLightbox() {

    document.getElementById(
        "lightbox"
    ).style.display = "none";

}


/* =====================================
   NEXT IMAGE
===================================== */

function nextImage() {

    if (visibleItems.length === 0) {
        return;
    }


    currentImage++;


    /* Go back to first visible image */

    if (
        currentImage >=
        visibleItems.length
    ) {

        currentImage = 0;

    }


    updateLightbox();

}


/* =====================================
   PREVIOUS IMAGE
===================================== */

function previousImage() {

    if (visibleItems.length === 0) {
        return;
    }


    currentImage--;


    /* Go to last visible image */

    if (currentImage < 0) {

        currentImage =
            visibleItems.length - 1;

    }


    updateLightbox();

}


/* =====================================
   FILTER IMAGES
===================================== */

function filterImages(
    category,
    clickedButton
) {


    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    /* Remove active class */

    buttons.forEach(
        function(button) {

            button.classList.remove(
                "active"
            );

        }
    );


    /* Add active class */

    clickedButton.classList.add(
        "active"
    );


    /* Filter gallery */

    galleryItems.forEach(
        function(item) {


            if (
                category === "all" ||
                item.dataset.category ===
                category
            ) {

                item.style.display =
                    "block";

            }

            else {

                item.style.display =
                    "none";

            }

        }
    );


    /* Update visible items */

    visibleItems =
        Array.from(galleryItems).filter(
            function(item) {

                return item.style.display !== "none";

            }
        );


    /* Reset lightbox position */

    currentImage = 0;

}


/* =====================================
   KEYBOARD CONTROLS
===================================== */

document.addEventListener(
    "keydown",
    function(event) {


        const lightbox =
            document.getElementById(
                "lightbox"
            );


        /* Only work when lightbox is open */

        if (
            lightbox.style.display ===
            "flex"
        ) {


            /* Right Arrow */

            if (
                event.key ===
                "ArrowRight"
            ) {

                nextImage();

            }


            /* Left Arrow */

            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousImage();

            }


            /* Escape */

            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }

        }

    }
);


/* =====================================
   CLICK OUTSIDE LIGHTBOX
===================================== */

document
    .getElementById("lightbox")
    .addEventListener(
        "click",
        function(event) {


            if (
                event.target === this
            ) {

                closeLightbox();

            }

        }
    );