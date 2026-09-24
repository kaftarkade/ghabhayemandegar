/* =========================================================
   قاب‌های ماندگار
   THEME.JS
   مدیریت حالت تاریک / روشن
========================================================= */

(function () {

    const themeToggle =
        document.getElementById("theme-toggle");


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("theme") || "dark";


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        if (themeToggle) {
            themeToggle.checked = false;
        }

    } else {

        document.body.classList.remove(
            "light-mode"
        );

        if (themeToggle) {
            themeToggle.checked = true;
        }

    }


    /* =====================================================
       CHANGE THEME
    ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    document.body.classList.remove(
                        "light-mode"
                    );

                    localStorage.setItem(
                        "theme",
                        "dark"
                    );

                } else {

                    document.body.classList.add(
                        "light-mode"
                    );

                    localStorage.setItem(
                        "theme",
                        "light"
                    );

                }

            }
        );

    }

})();

/* =========================================================
   ACCOUNT LINK
   ورود / پروفایل
========================================================= */

(function () {

    const accountLink =
        document.getElementById("accountLink");


    if (!accountLink) {
        return;
    }


    const savedUser =
        localStorage.getItem("memoryUser");


    const loggedIn =
        localStorage.getItem("loggedIn");


    if (
        savedUser &&
        loggedIn === "true"
    ) {

        accountLink.textContent =
            "👤 پروفایل";

        accountLink.href =
            "profile.html";

    } else {

        accountLink.textContent =
            "👤 ورود / ثبت‌نام";

        accountLink.href =
            "login.html";

    }

})();