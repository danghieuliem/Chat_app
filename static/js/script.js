const socket = io()
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

     if(response.status === 400){
         location.href = '/login_register.html'
     }

     const acc = await response.json()
     return acc
    } 

    catch(err){
        location.href = '/login_register.html'
    }
 }
const check_login = async() =>{
    const account = await getAcc()
    document.getElementById('account').innerText = `${account.name}`
}

const getChatBoxs = async () => {
    try{
       const token = localStorage.getItem('token')
       const response =  await fetch('/api/chatBoxs',{
           method : 'GET',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            redirect : 'follow',
            headers:{
               "Content-Type":"application/json",
               "x-token":token
            },
            referrerPolicy:'no-referrer'
       })
       if(response.status === 200){
            const arrChatBox = await response.json()
            var content = ''
            arrChatBox.forEach(res =>{
                content += `<li id="${res._chatBoxID}" onclick="activeChatBox(this)">
                    <div class="d-flex bd-highlight">
                        <div class="img_cont">
                            <img src="${res.avatar}" class="rounded-circle user_img">
                            <span class="online_icon offline"></span>
                        </div>
                        <div class="user_info">
                            <span>${res.name}</span>
                            <p>${res.name} is <span id="statusInfo">offline</span></p>
                        </div>
                    </div>
                </li>`
            })
            document.getElementById('groupChat').innerHTML = content
            socket.emit('status',arrChatBox)
       }     
    }
    catch(err){
        console.log(err)
    }
}

const activeChatBox = (element) =>{
    const activeChatBox = document.getElementsByClassName('active')[0]
    if(activeChatBox != undefined)
        activeChatBox.classList.remove('active')
    element.classList.add('active')
    const name = element.querySelector(".user_info span").innerText
    const image = element.querySelector(".img_cont img").getAttribute("src")
    document.getElementById('nameChatting').innerText = name
    document.getElementById('imageChatting').setAttribute("src",image)
}

socket.on('online',(arr)=>{
    arr.forEach(res =>{
        document.querySelector(`[id="${res}"] .img_cont span`).classList.remove('offline')
        document.querySelector(`[id="${res}"] #statusInfo`).innerText = "Online"
    })
})

check_login()
getChatBoxs()

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








  