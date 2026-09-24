/* =========================================================
   قاب‌های ماندگار
   PROFILE.JS
========================================================= */


/* =========================================================
   CHECK LOGIN
========================================================= */

const savedUser =
    localStorage.getItem("memoryUser");

const loggedIn =
    localStorage.getItem("loggedIn");


if (!savedUser || loggedIn !== "true") {

    window.location.href =
        "login.html";

}


/* =========================================================
   USER DATA
========================================================= */

let user;

try {

    user =
        JSON.parse(savedUser);

} catch (error) {

    localStorage.removeItem("memoryUser");
    localStorage.removeItem("loggedIn");

    window.location.href =
        "login.html";

}


/* =========================================================
   USER ELEMENTS
========================================================= */

const userName =
    document.getElementById("userName");

const profileName =
    document.getElementById("profileName");

const profilePhone =
    document.getElementById("profilePhone");

const joinDate =
    document.getElementById("joinDate");

const favoriteCount =
    document.getElementById("favoriteCount");


/* =========================================================
   DISPLAY USER
========================================================= */

function updateUserDisplay() {

    if (userName) {

        userName.textContent =
            user.name || "کاربر";

    }


    if (profileName) {

        profileName.textContent =
            user.name || "ثبت نشده";

    }


    if (profilePhone) {

        profilePhone.textContent =
            user.phone || "ثبت نشده";

    }


    if (joinDate) {

        joinDate.textContent =
            user.joinDate || "-";

    }

}


/* =========================================================
   JOIN DATE
========================================================= */

if (!user.joinDate) {

    user.joinDate =
        new Date().toLocaleDateString("fa-IR");

    localStorage.setItem(
        "memoryUser",
        JSON.stringify(user)
    );

}


updateUserDisplay();


/* =========================================================
   FAVORITES
   عکس‌ها + آهنگ‌ها
========================================================= */


/* =========================
   عکس‌های موردعلاقه
========================= */

let favoriteImages = [];

try {

    favoriteImages =
        JSON.parse(
            localStorage.getItem(
                "favoriteImages"
            ) || "[]"
        );

} catch (error) {

    favoriteImages = [];

}


/* =========================
   آهنگ‌های موردعلاقه
========================= */

let favoriteSongsCount = 0;


for (
    let i = 0;
    i < localStorage.length;
    i++
) {

    const key =
        localStorage.key(i);


    if (
        key &&
        key.startsWith("favorite-song-") &&
        localStorage.getItem(key) === "true"
    ) {

        favoriteSongsCount++;

    }

}


/* =========================
   تعداد کل
========================= */

const totalFavorites =
    favoriteImages.length +
    favoriteSongsCount;


/* =========================
   نمایش در پروفایل
========================= */

if (favoriteCount) {

    favoriteCount.textContent =
        totalFavorites;

}


/* =========================================================
   PROFILE PHOTO
========================================================= */

const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );

const profileImage =
    document.getElementById(
        "profileImage"
    );

const profileImageInput =
    document.getElementById(
        "profileImageInput"
    );

const defaultAvatar =
    document.getElementById(
        "defaultAvatar"
    );


/* =========================================================
   LOAD PROFILE IMAGE
========================================================= */

function loadProfileImage() {

    const savedProfileImage =
        localStorage.getItem(
            "profileImage"
        );


    if (
        savedProfileImage &&
        profileImage
    ) {

        profileImage.src =
            savedProfileImage;

        profileAvatar.classList.add(
            "has-image"
        );

        if (defaultAvatar) {

            defaultAvatar.style.display =
                "none";

        }

    } else {

        profileImage.src = "";

        profileAvatar.classList.remove(
            "has-image"
        );

        if (defaultAvatar) {

            defaultAvatar.style.display =
                "block";

        }

    }

}


loadProfileImage();


/* =========================================================
   EDIT INFORMATION
========================================================= */

const editModal =
    document.getElementById(
        "editModal"
    );

const editInput =
    document.getElementById(
        "editInput"
    );

const editTitle =
    document.getElementById(
        "editTitle"
    );

const editHelp =
    document.getElementById(
        "editHelp"
    );

const cancelEdit =
    document.getElementById(
        "cancelEdit"
    );

const saveEdit =
    document.getElementById(
        "saveEdit"
    );


let editingField = null;


/* ---------- Open Edit ---------- */

document
    .querySelectorAll(".edit-info-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                editingField =
                    this.dataset.edit;


                if (
                    editingField === "name"
                ) {

                    editTitle.textContent =
                        "ویرایش نام";

                    editHelp.textContent =
                        "نام جدیدت رو وارد کن.";

                    editInput.value =
                        user.name || "";

                    editInput.type =
                        "text";

                }


                if (
                    editingField === "phone"
                ) {

                    editTitle.textContent =
                        "ویرایش شماره موبایل";

                    editHelp.textContent =
                        "شماره موبایل جدیدت رو وارد کن.";

                    editInput.value =
                        user.phone || "";

                    editInput.type =
                        "tel";

                }


                editModal.classList.add(
                    "active"
                );


                setTimeout(function () {

                    editInput.focus();

                    editInput.select();

                }, 150);

            }
        );

    });


/* ---------- Save Edit ---------- */

if (saveEdit) {

    saveEdit.addEventListener(
        "click",
        function () {

            const value =
                editInput.value.trim();


            if (!value) {

                alert(
                    "لطفاً مقدار جدید را وارد کن."
                );

                return;

            }


            if (
                editingField === "phone" &&
                value.length < 7
            ) {

                alert(
                    "شماره موبایل وارد شده معتبر نیست."
                );

                return;

            }


            if (
                editingField === "name"
            ) {

                user.name =
                    value;

            }


            if (
                editingField === "phone"
            ) {

                user.phone =
                    value;

            }


            localStorage.setItem(
                "memoryUser",
                JSON.stringify(user)
            );


            updateUserDisplay();


            editModal.classList.remove(
                "active"
            );


            /* انیمیشن کوچک بعد از ذخیره */

            const target =
                editingField === "name"
                    ? profileName
                    : profilePhone;


            if (target) {

                target.animate(
                    [
                        {
                            opacity: .3,
                            transform:
                                "translateY(5px)"
                        },
                        {
                            opacity: 1,
                            transform:
                                "translateY(0)"
                        }
                    ],
                    {
                        duration: 400,
                        easing: "ease"
                    }
                );

            }


            editingField = null;

        }
    );

}


/* ---------- Cancel Edit ---------- */

if (cancelEdit) {

    cancelEdit.addEventListener(
        "click",
        function () {

            editModal.classList.remove(
                "active"
            );

            editingField = null;

        }
    );

}


/* ---------- Enter To Save ---------- */

if (editInput) {

    editInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                saveEdit.click();

            }

        }
    );

}


/* ---------- Click Outside Edit ---------- */

if (editModal) {

    editModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                editModal
            ) {

                editModal.classList.remove(
                    "active"
                );

                editingField = null;

            }

        }
    );

}


/* =========================================================
   CROP ELEMENTS
========================================================= */

const cropModal =
    document.getElementById(
        "cropModal"
    );

const cropArea =
    document.getElementById(
        "cropArea"
    );

const cropImage =
    document.getElementById(
        "cropImage"
    );

const zoomIn =
    document.getElementById(
        "zoomIn"
    );

const zoomOut =
    document.getElementById(
        "zoomOut"
    );

const cancelCrop =
    document.getElementById(
        "cancelCrop"
    );

const saveCrop =
    document.getElementById(
        "saveCrop"
    );


/* =========================================================
   CROP VARIABLES
========================================================= */

let imageX = 0;
let imageY = 0;

let scale = 1;

let imageWidth = 0;
let imageHeight = 0;

let dragging = false;

let startX = 0;
let startY = 0;


/* =========================================================
   OPEN CROP
========================================================= */

if (profileImageInput) {

    profileImageInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "لطفاً یک عکس انتخاب کن."
                );

                this.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    cropImage.onload =
                        function () {

                            cropModal.classList.add(
                                "active"
                            );

                            setupCrop();

                        };


                    cropImage.src =
                        event.target.result;

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   SETUP CROP
========================================================= */

function setupCrop() {

    if (
        !cropArea ||
        !cropImage
    ) {
        return;
    }


    const areaSize =
        cropArea.clientWidth;


    const naturalWidth =
        cropImage.naturalWidth;


    const naturalHeight =
        cropImage.naturalHeight;


    if (
        !naturalWidth ||
        !naturalHeight
    ) {
        return;
    }


    const coverScale =
        Math.max(
            areaSize / naturalWidth,
            areaSize / naturalHeight
        );


    imageWidth =
        naturalWidth * coverScale;


    imageHeight =
        naturalHeight * coverScale;


    scale = 1;


    imageX =
        (areaSize - imageWidth) / 2;


    imageY =
        (areaSize - imageHeight) / 2;


    updateCropImage();

}


/* =========================================================
   UPDATE CROP IMAGE
========================================================= */

function updateCropImage() {

    cropImage.style.width =
        imageWidth * scale + "px";


    cropImage.style.height =
        imageHeight * scale + "px";


    cropImage.style.left =
        imageX + "px";


    cropImage.style.top =
        imageY + "px";

}


/* =========================================================
   KEEP IMAGE INSIDE
========================================================= */

function keepImageInside() {

    const size =
        cropArea.clientWidth;


    const width =
        imageWidth * scale;


    const height =
        imageHeight * scale;


    const minX =
        size - width;


    const minY =
        size - height;


    if (imageX > 0) {

        imageX = 0;

    }


    if (imageY > 0) {

        imageY = 0;

    }


    if (imageX < minX) {

        imageX = minX;

    }


    if (imageY < minY) {

        imageY = minY;

    }

}


/* =========================================================
   ZOOM IN
========================================================= */

if (zoomIn) {

    zoomIn.addEventListener(
        "click",
        function () {

            scale += .1;

            scale =
                Math.min(
                    scale,
                    3
                );

            keepImageInside();

            updateCropImage();

        }
    );

}


/* =========================================================
   ZOOM OUT
========================================================= */

if (zoomOut) {

    zoomOut.addEventListener(
        "click",
        function () {

            scale -= .1;

            scale =
                Math.max(
                    scale,
                    1
                );

            keepImageInside();

            updateCropImage();

        }
    );

}


/* =========================================================
   DRAG - MOUSE
========================================================= */

if (cropArea) {

    cropArea.addEventListener(
        "mousedown",
        function (event) {

            dragging = true;

            startX =
                event.clientX - imageX;

            startY =
                event.clientY - imageY;

        }
    );

}


window.addEventListener(
    "mousemove",
    function (event) {

        if (!dragging) {
            return;
        }


        imageX =
            event.clientX - startX;

        imageY =
            event.clientY - startY;


        keepImageInside();

        updateCropImage();

    }
);


window.addEventListener(
    "mouseup",
    function () {

        dragging = false;

    }
);


/* =========================================================
   DRAG - TOUCH
========================================================= */

if (cropArea) {

    cropArea.addEventListener(
        "touchstart",
        function (event) {

            const touch =
                event.touches[0];

            dragging = true;

            startX =
                touch.clientX - imageX;

            startY =
                touch.clientY - imageY;

        },
        {
            passive: false
        }
    );


    cropArea.addEventListener(
        "touchmove",
        function (event) {

            if (!dragging) {
                return;
            }


            event.preventDefault();


            const touch =
                event.touches[0];


            imageX =
                touch.clientX - startX;

            imageY =
                touch.clientY - startY;


            keepImageInside();

            updateCropImage();

        },
        {
            passive: false
        }
    );


    cropArea.addEventListener(
        "touchend",
        function () {

            dragging = false;

        }
    );

}


/* =========================================================
   CANCEL CROP
========================================================= */

if (cancelCrop) {

    cancelCrop.addEventListener(
        "click",
        function () {

            closeCrop();

        }
    );

}


function closeCrop() {

    cropModal.classList.remove(
        "active"
    );

    profileImageInput.value = "";

}


/* =========================================================
   SAVE CROP
========================================================= */

if (saveCrop) {

    saveCrop.addEventListener(
        "click",
        function () {

            const canvas =
                document.createElement(
                    "canvas"
                );


            const outputSize =
                500;


            canvas.width =
                outputSize;

            canvas.height =
                outputSize;


            const ctx =
                canvas.getContext(
                    "2d"
                );


            const areaSize =
                cropArea.clientWidth;


            const sourceScale =
                cropImage.naturalWidth /
                (imageWidth * scale);


            const sourceX =
                (-imageX) *
                sourceScale;


            const sourceY =
                (-imageY) *
                sourceScale;


            const sourceSize =
                areaSize *
                sourceScale;


            ctx.drawImage(

                cropImage,

                sourceX,
                sourceY,

                sourceSize,
                sourceSize,

                0,
                0,

                outputSize,
                outputSize

            );


            const finalImage =
                canvas.toDataURL(
                    "image/jpeg",
                    .88
                );


            localStorage.setItem(
                "profileImage",
                finalImage
            );


            profileImage.src =
                finalImage;


            profileAvatar.classList.add(
                "has-image"
            );


            if (defaultAvatar) {

                defaultAvatar.style.display =
                    "none";

            }


            closeCrop();


            /* انیمیشن ذخیره */

            profileAvatar.animate(
                [
                    {
                        transform:
                            "scale(.85)",
                        opacity: .5
                    },
                    {
                        transform:
                            "scale(1.08)",
                        opacity: 1
                    },
                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 550,
                    easing: "ease-out"
                }
            );

        }
    );

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

const imagePreviewModal =
    document.getElementById(
        "imagePreviewModal"
    );

const previewProfileImage =
    document.getElementById(
        "previewProfileImage"
    );

const closeImagePreview =
    document.getElementById(
        "closeImagePreview"
    );


if (profileAvatar) {

    profileAvatar.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest(
                    "#deleteProfileImage"
                )
            ) {
                return;
            }


            if (
                !profileAvatar.classList.contains(
                    "has-image"
                )
            ) {
                return;
            }


            const image =
                localStorage.getItem(
                    "profileImage"
                );


            if (!image) {
                return;
            }


            previewProfileImage.src =
                image;


            imagePreviewModal.classList.add(
                "active"
            );

        }
    );

}


/* ---------- Close Preview ---------- */

function closePreview() {

    imagePreviewModal.classList.remove(
        "active"
    );

}


if (closeImagePreview) {

    closeImagePreview.addEventListener(
        "click",
        closePreview
    );

}


if (imagePreviewModal) {

    imagePreviewModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                imagePreviewModal
            ) {

                closePreview();

            }

        }
    );

}


/* =========================================================
   DELETE PROFILE PHOTO
========================================================= */

const deleteProfileImage =
    document.getElementById(
        "deleteProfileImage"
    );

const deleteModal =
    document.getElementById(
        "deleteModal"
    );

const cancelDelete =
    document.getElementById(
        "cancelDelete"
    );

const confirmDelete =
    document.getElementById(
        "confirmDelete"
    );


/* ---------- Open Delete ---------- */

if (deleteProfileImage) {

    deleteProfileImage.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (
                !profileAvatar.classList.contains(
                    "has-image"
                )
            ) {
                return;
            }


            deleteModal.classList.add(
                "active"
            );

        }
    );

}


/* ---------- Cancel Delete ---------- */

if (cancelDelete) {

    cancelDelete.addEventListener(
        "click",
        function () {

            deleteModal.classList.remove(
                "active"
            );

        }
    );

}


/* ---------- Confirm Delete ---------- */

if (confirmDelete) {

    confirmDelete.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "profileImage"
            );


            profileImage.animate(
                [
                    {
                        opacity: 1,
                        transform:
                            "scale(1)"
                    },
                    {
                        opacity: 0,
                        transform:
                            "scale(.5)"
                    }
                ],
                {
                    duration: 300,
                    easing: "ease-in"
                }
            );


            setTimeout(function () {

                loadProfileImage();

            }, 280);


            deleteModal.classList.remove(
                "active"
            );

        }
    );

}


/* ---------- Outside Delete ---------- */

if (deleteModal) {

    deleteModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                deleteModal
            ) {

                deleteModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   LOGOUT MODAL
========================================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const logoutModal =
    document.getElementById(
        "logoutModal"
    );

const cancelLogout =
    document.getElementById(
        "cancelLogout"
    );

const confirmLogout =
    document.getElementById(
        "confirmLogout"
    );


/* ---------- Open Logout ---------- */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            logoutModal.classList.add(
                "active"
            );

        }
    );

}


/* ---------- Cancel Logout ---------- */

if (cancelLogout) {

    cancelLogout.addEventListener(
        "click",
        function () {

            logoutModal.classList.remove(
                "active"
            );

        }
    );

}


/* ---------- Confirm Logout ---------- */

if (confirmLogout) {

    confirmLogout.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "loggedIn"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* ---------- Outside Logout ---------- */

if (logoutModal) {

    logoutModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                logoutModal
            ) {

                logoutModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   GLOBAL THEME COLORS
========================================================= */

const colorOptions =
    document.querySelectorAll(".color-option");

const themeNames = [
    "theme-purple",
    "theme-blue",
    "theme-pink",
    "theme-green",
    "theme-orange"
];


function applyTheme(theme) {

    if (!theme) {
        theme = "purple";
    }


    document.body.classList.remove(
        ...themeNames
    );


    document.body.classList.add(
        "theme-" + theme
    );


    colorOptions.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.color === theme
        );

    });


    localStorage.setItem(
        "profileColor",
        theme
    );

}


/* ---------- Load Saved Theme ---------- */

const savedColor =
    localStorage.getItem("profileColor") || "purple";

applyTheme(savedColor);


/* ---------- Change Theme ---------- */

colorOptions.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedColor =
                this.dataset.color;


            applyTheme(selectedColor);


            this.animate(
                [
                    {
                        transform: "scale(.8)"
                    },
                    {
                        transform: "scale(1.18)"
                    },
                    {
                        transform: "scale(1.12)"
                    }
                ],
                {
                    duration: 350,
                    easing: "ease-out"
                }
            );

        }
    );

});
/* =========================================================
   DARK / LIGHT MODE
   اگر از سیستم قبلی سایت استفاده می‌کنی،
   localStorage با کل سایت مشترک خواهد بود.
========================================================= */

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light-mode"
    );

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            cropModal &&
            cropModal.classList.contains(
                "active"
            )
        ) {

            closeCrop();

            return;

        }


        if (
            imagePreviewModal &&
            imagePreviewModal.classList.contains(
                "active"
            )
        ) {

            closePreview();

            return;

        }


        if (
            editModal &&
            editModal.classList.contains(
                "active"
            )
        ) {

            editModal.classList.remove(
                "active"
            );

            return;

        }


        if (
            deleteModal &&
            deleteModal.classList.contains(
                "active"
            )
        ) {

            deleteModal.classList.remove(
                "active"
            );

            return;

        }


        if (
            logoutModal &&
            logoutModal.classList.contains(
                "active"
            )
        ) {

            logoutModal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   PREVENT IMAGE DRAG
========================================================= */

document.addEventListener(
    "dragstart",
    function (event) {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);

/* =========================================================
   قاب‌های ماندگار
   PROFILE MUSIC FAVORITES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById(
            "profileMusicFavorites"
        );

    if (!container) {
        return;
    }


    /* =====================================================
       آهنگ‌ها
    ===================================================== */

    const songs = [

        {
            title: "عنبر نسأ",
            artist: "ابوالفضل جمالی"
        },

        {
            title: "مدرسه",
            artist:
                "جواد ابراهیمی، حسین حق‌خواه، ابوالفضل جمالی، عرفان سرانجام"
        },

        {
            title: "شهر پایگاه",
            artist:
                "امیر علی پیرمراد - هوش مصنوعی"
        }

    ];


    /* =====================================================
       دریافت علاقه‌مندی‌ها
    ===================================================== */

    const favorites =
        JSON.parse(
            localStorage.getItem(
                "musicFavorites"
            ) || "[]"
        );


    /* =====================================================
       اگر چیزی انتخاب نشده
    ===================================================== */

    if (!favorites.length) {

        container.innerHTML = `
            <div class="no-music-favorites">
                هنوز آهنگی به موردعلاقه‌ها اضافه نکردی 🎵
            </div>
        `;

        return;
    }


    /* =====================================================
       ساخت لیست
    ===================================================== */

    favorites.forEach(function (index) {

        const song =
            songs[index];

        if (!song) {
            return;
        }


        const item =
            document.createElement("div");

        item.className =
            "profile-favorite-song";


        item.innerHTML = `

            <div class="profile-favorite-icon">
                🎵
            </div>

            <div class="profile-favorite-info">

                <strong>
                    ${song.title}
                </strong>

                <small>
                    ${song.artist}
                </small>

            </div>

            <div class="profile-favorite-star">
                ★
            </div>

        `;


        container.appendChild(item);

    });

});