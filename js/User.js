function User(_id, _username){
  this.id = _id
  this.username = _username
  this.status=''
  this.isTypping= false,
  this.avatar = ()=> `https://github.com/${this.username}.png`
  
}

User.render = function({id, username}){
  return (`
  <li class="user-list-item" id=${'-'+id}>
    <img src="http://github.com/${username}.png" class="online-user-avatar" alt="">
    <span>
      <strong class="online-user-username">${username}</strong>
      <img id=${`-`+id+`-typing-gif`} class="online-user-status" src="./assets/gifs/typing.gif"/>
    </span> 
    
  </li>
  `)
}