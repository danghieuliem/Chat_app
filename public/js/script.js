const socket = io();

const create_my_messege = (content, datime) => {
    const _content = `
    <div class="d-flex justify-content-end mb-4">
        <div class="msg_cotainer_send">
            ${content}
            <span class="msg_time_send"> ${datime}, Today</span>
        </div>
        <div class="img_cont_msg">
            <img src="img/1.png" class="rounded-circle user_img_msg">
        </div>
    </div>`;
    document.getElementById("main_chat").innerHTML += _content;

    document.getElementById("main_chat").scrollTo(0, document.getElementById("main_chat").scrollHeight);
}

const create_other_messege = (content, datime = "00:00:00") => {
    const _content = `
    <div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
            <img src="./img/6.jpg" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
            ${content}
            <span class="msg_time">${datime}, Today</span>
        </div>
    </div>`;
    document.getElementById("main_chat").innerHTML += _content;
    document.getElementById("main_chat").scrollTo(0, document.getElementById("main_chat").scrollHeight);
}

$("#send_btn").on("click", function(e) {
    const input = $("#Input-text")[0].value;
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (socket.emit("chat-messege", input)) {
        create_my_messege(input, time);
        $("#Input-text")[0].value = "";
    }
});

socket.on("chat-messege", data => {
    create_other_messege(data);
});