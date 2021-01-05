// required login
const getAcc = async()=>{
    try{
     const token = localStorage.getItem('token')
     const response = await fetch('/api/accounts/authentication',{
         method:'GET',
         mode : 'cors',
         cache : 'no-cache',
         credentials :'same-origin',
         headers:{
             "Content-Type":"application/json",
             "x-token":token,
         },
         redirect:'follow',
         referrerPolicy:'no-referrer'
     })

     console.log(response.status)
     if(response.status === 400){
         location.href = '/login_register.html'
     }

     const acc = await response.json()
     document.getElementById('account').innerText = `${acc.name}`
     localStorage.setItem('name',acc.name)
     console.log(localStorage.getItem('name'))
    } catch(err){
        console.log(err)
    }
 }
 getAcc()



//socket IO
const socket = io()

var count_message = 0

const name = localStorage.getItem('name')
socket.emit('new-user',name)

const connect_message = (message)=>{
    const _content=`
        <div class="d-flex justify-content-center mb-4">
            ${message}
        </div>
    `
    document.getElementById("main_chat").innerHTML += _content
    document.getElementById("main_chat").scrollTo(0, document.getElementById("main_chat").scrollHeight)
}

const create_my_message = (content,time)=>{
    const _content =`
    <div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
            <img src="img/1.png" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
            ${content}
            <span class="msg_time">${time}, Today</span>
        </div>
     </div>`

    document.getElementById("main_chat").innerHTML += _content
    document.getElementById("main_chat").scrollTo(0, document.getElementById("main_chat").scrollHeight)
    count_message = count_message + 1
    document.getElementById("count_message").innerText = `${count_message} message`
}

const create_parter_message = (content,name, time="00:00:00")=>{
    const _content =`
    <div class="d-flex justify-content-end mb-4">
        <div class="img_cont_msg">
            <img src="./img/3.jpg" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer_send">
            ${name} said :
            ${content}
            <span class="msg_time_send"> ${time}, Today</span>
        </div>
    </div>`
    document.getElementById("main_chat").innerHTML += _content  
    document.getElementById("main_chat").scrollTo(0, document.getElementById("main_chat").scrollHeight)
    count_message = count_message + 1
    document.getElementById("count_message").innerText = `${count_message} message`
}
$("#send_btn").on("click", function(e) {
    const input = $("#Input-text")[0].value
    const today = new Date()
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    if (socket.emit("chat-message", input)) {
        create_my_message(input, time)
        $("#Input-text")[0].value = ""
    }
});

connect_message("You joined")

socket.on('user-connected',name=>{
    connect_message(`${name} joined`)
})


socket.on("chat-message", (message , name) => {
    create_parter_message(message,name)
});

socket.on('user-disconnected',name=>{
    connect_message(`${name} disconnected`)
})



  