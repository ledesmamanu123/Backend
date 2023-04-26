const socket = io({
    autoConnect:false //No auto conectarse cuando se recarga la pagina
});

const chatBox = document.getElementById('chatBox')
let user;

Swal.fire({
    title:"Identifícate",
    text:"Para acceder al chat, coloca tu username",
    icon:"question",
    input:"text",
    inputValidator: (value) =>{
        return !value && '¡Necesitas identificarte antes de entrar!'
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then(result=>{ //Despues de logearse, recien conectar con el Back
    user = result.value;
    socket.connect()
    socket.emit('authenticated',user)
})

chatBox.addEventListener('keyup', evt=>{

    if(evt.key === "Enter"){
        if(chatBox.value.trim().length>0){ //Verificamos que el msj no este vacio. (le sacamos todos los espacios con trim, y verificamos que sea mayor a 0)

            //Le manda la data a el evt "message"
            socket.emit('message', {user,message:chatBox.value.trim()})
        }
    }
})

//Para cada on, hay un emit

//Se pone a escuchar el evt 'Logs'
socket.on('logs', data=>{ //Nos llega la data que mandamos del Back

    //Traemos el lugar en memoria con el id logs, donde vamos a inyectar los datos en el Front
    const logs = document.getElementById('logs')
    let message = "";

    //La data que nos llega del front, le aplicamos una funcion a cada log
    data.forEach(log => {
        message+= `${log.user} dice: ${log.message} <br/>` //Creamos un string, concatenando el user, y el msg
    });
    logs.innerHTML = message; //Inyectamos message en el html
})

socket.on('newUserConnected',data=>{
    if(!user) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        title:`${data} se unió al chat!`,
        icon:"success"
    })
})