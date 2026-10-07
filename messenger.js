const { Client, TablesDB, ID } = Appwrite;

// ================================
// تنظیمات Appwrite
// ================================

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6ac3b38f000976364cad");

// اتصال به TablesDB
const tablesDB = new TablesDB(client);


// ================================
// اطلاعات دیتابیس
// ================================

const DATABASE_ID = "6ac3b50f001bdd8488ff";
const TABLE_ID = "6ac3b51800052942e6b5";


// ================================
// عناصر صفحه
// ================================

const messageInput = document.getElementById("messageInput");
const sendMessage = document.getElementById("sendMessage");
const chatBox = document.getElementById("chatBox");


// ================================
// شناسه کاربر
// ================================

// فعلاً برای تست
// بعداً این مقدار را از سیستم ورود خود سایت می‌گیریم.

const currentUser = JSON.parse(localStorage.getItem("memoryUser") || "null");

const currentUserId = currentUser?.userid || currentUser?.userId || "";

if (!currentUserId) {
    alert("ابتدا وارد حساب کاربری خود شوید.");
    window.location.href = "login.html";
}


// ================================
// ارسال پیام
// ================================

sendMessage.addEventListener("click", sendMessageNow);

messageInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendMessageNow();
    }

});


async function sendMessageNow() {

    const message = messageInput.value.trim();

    if (!message) return;

    try {

        // حذف پیام خالی
        const emptyMessage = chatBox.querySelector(".empty-chat");

        if (emptyMessage) {
            emptyMessage.remove();
        }


        // ساخت پیام در Appwrite
        const response = await tablesDB.createRow(
            DATABASE_ID,
            TABLE_ID,
            ID.unique(),
            {
                userid: currentUserId,
                username: localStorage.getItem("username") || "کاربر",
                massage: message,
                recieverid: "test-receiver",
                createdat: new Date().toISOString()
            }
        );


        console.log("پیام با موفقیت ذخیره شد:", response);


        // نمایش پیام در صفحه
        const messageElement = document.createElement("div");

        messageElement.className = "message sent";

        messageElement.textContent = message;

        chatBox.appendChild(messageElement);

        messageInput.value = "";

        chatBox.scrollTop = chatBox.scrollHeight;


    } catch (error) {

        console.error("خطا در ارسال پیام:", error);

        alert("ارسال پیام انجام نشد. Console را بررسی کن.");

    }

}