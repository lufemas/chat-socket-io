function Message ({_user, _date, _text}){
  this.data = {
    user : _user,
    date : _date,
    text : _text,
  }
  this.aaa = ()=> 'sda'
  

}

Message.render = function ( {data:{user, date, text}}, _isCurrentUser ){ return (`
      <li class="msg-block ${_isCurrentUser ? 'msg-block-user' : ''}">
        <div class="msg-avatar">
          <img src="http://github.com/${user.username}.png" alt="">
        </div>
       <span class="msg-block-text"> <span class="msg-block-nick">${user.username}, <span class="msg-block-date">${date}</span> </span>${text}</span>
      </li>
  `)}



// <li class="msg-block">
// <div class="msg-avatar">
//     <img src="http://github.com/lufemas.png" alt="">
// </div>
// <span class="msg-block-text"> <span class="msg-block-nick">Lufemas <span class="msg-block-date"></span> </span> Lorem ipsum dolor sit amet consectetur adipisicing elit Distinctio, nesciunt at. Quia libero iure dolorem.</span>
// </li>