const form=document.getElementById('form');
const input=document.getElementById('input');
const chat=document.getElementById('chat');
const send=document.getElementById('send');

function format(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>')}

function add(text,role){
  const m=document.createElement('div');m.className='msg '+role;
  const a=document.createElement('div');a.className='avatar';a.textContent=role==='user'?'You':'⚡';
  const b=document.createElement('div');b.className='bubble';
  if(role==='bot') b.innerHTML='<b>Electrician Assistant</b><p>'+format(text)+'</p>'; else b.innerHTML='<p>'+format(text)+'</p>';
  m.append(a,b);chat.appendChild(m);chat.scrollTop=chat.scrollHeight;
}
function suggest(t){input.value=t;input.focus()}

form.addEventListener('submit',async e=>{
  e.preventDefault();const message=input.value.trim();if(!message)return;
  add(message,'user');input.value='';send.disabled=true;
  const typing=document.createElement('div');typing.className='msg bot';typing.innerHTML='<div class="avatar">⚡</div><div class="bubble">Thinking...</div>';chat.appendChild(typing);chat.scrollTop=chat.scrollHeight;
  try{
    const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message})});
    const d=await r.json();typing.remove();add(d.success?d.reply:(d.error||'Something went wrong.'),'bot');
  }catch(err){typing.remove();add('Unable to connect to the server. Please make sure Flask is running.','bot')}
  finally{send.disabled=false;input.focus()}
});
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();form.requestSubmit()}});
