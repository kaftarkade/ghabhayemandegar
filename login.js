/* =========================================================
   LOGIN / REGISTER
========================================================= */

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const tabs = document.querySelector(".tabs");


/* =========================================================
   TAB SWITCH
========================================================= */

loginTab.addEventListener("click", function () {

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginForm.classList.add("active-form");
    registerForm.classList.remove("active-form");

    tabs.classList.remove("register-active");

});


registerTab.addEventListener("click", function () {

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    registerForm.classList.add("active-form");
    loginForm.classList.remove("active-form");

    tabs.classList.add("register-active");

});


/* =========================================================
   SHOW / HIDE PASSWORD
========================================================= */

const passwordButtons =
    document.querySelectorAll(".show-password");


passwordButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const input =
            document.getElementById(
                button.dataset.target
            );


        if (input.type === "password") {

            input.type = "text";

            button.textContent = "🙈";

        } else {

            input.type = "password";

            button.textContent = "👁";

        }

    });

});


/* =========================================================
   REGISTER
========================================================= */

registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        const password2 =
            document.getElementById(
                "registerPassword2"
            ).value;


        const message =
            document.getElementById(
                "registerMessage"
            );


        message.textContent = "";

        message.className = "message";


        /* بررسی شماره */

        const phonePattern =
            /^09[0-9]{9}$/;


        if (!phonePattern.test(phone)) {

            message.textContent =
                "شماره موبایل باید مثل 09123456789 باشد.";

            message.classList.add("error");

            return;

        }


        /* بررسی رمز */

        if (password.length < 6) {

            message.textContent =
                "رمز عبور باید حداقل ۶ کاراکتر باشد.";

            message.classList.add("error");

            return;

        }


        /* بررسی تکرار رمز */

        if (password !== password2) {

            message.textContent =
                "رمزهای عبور یکسان نیستند.";

            message.classList.add("error");

            return;

        }


        /* ساخت حساب */

        const user = {
    name: name,
    phone: phone,
    password: password,
    joinDate: new Date().toLocaleDateString("fa-IR")
};

        localStorage.setItem(
            "memoryUser",
            JSON.stringify(user)
        );


        /* ورود */

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        message.textContent =
            "حساب با موفقیت ساخته شد ❤️";

        message.classList.add(
            "success"
        );


        /* انتقال به پروفایل */

        setTimeout(function () {

            window.location.href =
                "profile.html";

        }, 1000);

    }
);


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const phone =
            document.getElementById(
                "loginPhone"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const message =
            document.getElementById(
                "loginMessage"
            );


        message.textContent = "";

        message.className = "message";


        /* دریافت حساب */

        const savedUser =
            localStorage.getItem(
                "memoryUser"
            );


        if (!savedUser) {

            message.textContent =
                "هنوز حسابی ساخته نشده. ابتدا ثبت‌نام کن.";

            message.classList.add(
                "error"
            );

            return;

        }


        const user =
            JSON.parse(savedUser);


        /* بررسی اطلاعات */

        if (
            phone === user.phone &&
            password === user.password
        ) {

            localStorage.setItem(
                "loggedIn",
                "true"
            );


            message.textContent =
                "خوش اومدی " +
                user.name +
                " ❤️";


            message.classList.add(
                "success"
            );


            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1000);


        } else {

            message.textContent =
                "شماره موبایل یا رمز عبور اشتباه است.";

            message.classList.add(
                "error"
            );

        }

    }
);


/* =========================================================
   THEME
========================================================= */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


const themeIcon =
    document.getElementById(
        "themeIcon"
    );


function updateThemeIcon() {

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        themeIcon.textContent = "🌙";

    } else {

        themeIcon.textContent = "☀️";

    }

}


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-mode"
            );


            if (
                document.body.classList.contains(
                    "light-mode"
                )
            ) {

                localStorage.setItem(
                    "theme",
                    "light"
                );

            } else {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }


            updateThemeIcon();

        }
    );

}