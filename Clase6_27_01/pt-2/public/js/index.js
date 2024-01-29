const socket = io();

let user;
const chatBox = document.getElementById("chat-box")

Swal.fire({
    title: 'Ingresa tu nombre',
    input: 'text',
    text: 'Ingresa el usuario para identificarte en el chat',
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre de usuario para continuar";
    },
    allowOutsideClick: false
}).then((result) => { 
    user = result.value
    socket.emit("new-user", user) 
});

chatBox.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        if(chatBox.value.trim().length) {
            socket.emit("message", { user, message: chatBox.value });
            chatBox.value = "";
        }
    }
})

socket.on("messageLogs", (data) => {
    if(!user) return;
    const logs = document.getElementById("message-logs");
    let messages = "";

    data.forEach(obj => {
        messages += `<p>${obj.user} dice: ${obj.message}</p>`
    });

    logs.innerHTML = messages
})

socket.on("new-user", (data) => {
    if(!user) return;
    Swal.fire({
        text: `${data} se ha unido al chat`,
        toast: true,
        position: "top-right"
    })
})