

const $      = (e)=> document.querySelector(e)
const socket = io()

//////////////////////////////
let isLogged = false;


const currentUser = new User(0,'Guest')


$('#input-msg').value=''

// console.log( new Message('nome','data','texto').render())




// Loggin
$('#login-btn').addEventListener('click', (e)=>{

    currentUser.username = $('#github-user').value || 'Guest'
    currentUser.id = socket.id
    
    // $('#avatar').setAttribute('src', currentUser.avatar())
    $('#login-window').style.display = 'none'
    isLogged = true;
    initSocketListening()

    socket.emit('login', {username : currentUser.username, id: currentUser.id})

})

// "https://github.com/" + usernames[card.cardValue-1].value + ".png"

const initSocketListening = ()=>{
        
    
    socket.on('newuser', (newUser) => {
        
        
        console.log(`${newUser.user} has connected!`)
        console.log(newUser)

        $('#user-list').innerHTML += User.render(newUser)
    
    })

    $('#send-msg-btn').addEventListener('click', (e)=>{
        e.preventDefault()

        const text = $('#input-msg').value;

        if(text){

            const newMsg = new Message({_text: text, _date: new Date(), _user: {username: currentUser.username, id: currentUser.id}})
    
            socket.emit('message',newMsg)
            $('#msg-list').innerHTML += Message.render(newMsg,true)
            $('.msgs-container').scrollTop = $('.msgs-container').scrollHeight
            
            $('#input-msg').value = ''
        }
    })

    
    socket.on('messageHistory', (messagesLog) => {

        messagesLog.forEach(msg =>{
            console.log(msg)
            $('#msg-list').innerHTML += Message.render(msg)
        })

    })

     
    socket.on('loggedUsers', (loggedUsers) => {

        loggedUsers.forEach(user =>{
            // console.log(msg)
            $('#user-list').innerHTML += User.render(user)
        })

    })


    socket.on('message', (receivedMsg) => {


        $('#msg-list').innerHTML += Message.render(receivedMsg)

    })
    
    const checkTyping = setInterval(()=>{
        if ($('#input-msg').value.length > 0 && !currentUser.isTypping){
            currentUser.isTypping = true
            socket.emit('typing', currentUser.id)
        }else if( $('#input-msg').value.length <= 0 && currentUser.isTypping){
            currentUser.isTypping = false
            socket.emit('notTyping', currentUser.id)

        }
    },1000)

    socket.on('typing',(userID)=>{
        $(`#-${userID}-typing-gif`).style.display = 'inline'
    })

    socket.on('notTyping',(userID)=>{
        $(`#-${userID}-typing-gif`).style.display = 'none'
    })

    }