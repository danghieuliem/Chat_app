async function register(e){
    e.preventDefault()

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    const config = {
        method:"POST",
        mode:"cors",
        cache :"no-cache",
        credentials : "same-origin",
        headers:{
            "Content-Type":"application/json",
        },
        redirect : "follow",
        referrerPolicy:"no-referrer",
        body:JSON.stringify({email,password,name})
    };

    const response = await fetch('/api/accounts',config)
    const data = await response.json()

    location.href="/login_register.html"
    
    console.log(data)
    
    return false;
}
const formRegister = document.getElementById("formRegister")

formRegister.addEventListener("submit",register)