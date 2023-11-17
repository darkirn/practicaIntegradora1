const socketClient = io();
const evName = document.getElementById('name');
const showChat = document.getElementById('chatList');
const chatForm = document.getElementById('chatForm');
const message = document.getElementById('message');

Swal.fire({
    title: 'Bienvenido',
    text: 'Indique su nombre',
    input: 'text',
    inputValidator: (value) => {
        if(!value){
            return 'nombre es requerido'
        }
    },
    confirmButtonText: 'Aceptar'
  }).then(input=>{
    user = input.value;
    evName.innerText = `Chat de : ${user}` ;
    socketClient.emit('newUser', user)
  });


socketClient.on('nuevoUsuario', (useR) =>{
  console.log(`${useR} connected`)
});

chatForm.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user: user,
    message: message.value,
  };
  socketClient.emit('message', infoMessage);
};

socketClient.on('getChat', (actu) => {
  const chat = actu.map((c) => {
            return `<p>${c.user} dice : ${c.message}</p>
                    <hr>`;
        }).join(" ");
  
    showChat.innerHTML = chat;
}) 

