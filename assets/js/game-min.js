(()=>{"use strict";let d=[],e=["C","D","H","S"],f=["A","J","Q","K"],g=[],a=document.querySelector("#btnPlay"),b=document.querySelector("#btnStop"),c=document.querySelector("#btnNew"),h=document.querySelectorAll("small"),i=document.querySelectorAll(".cards"),j=(b=2)=>{d=k(),t(!1),h.forEach(a=>a.innerText=0),i.forEach(a=>a.innerHTML=""),g=[];for(let a=0;a<b;a++)g.push(0)},k=()=>{for(let a=2;a<=10;a++)for(let b of e)d.push(a+b);for(let c of e)for(let g of f)d.push(g+c);return _.shuffle(d)},l=()=>{if(!d.length)throw"Holy Guacamole!... No cards in the deck";return d.pop()},m=b=>{let a=b.substring(0,b.length-1);return isNaN(a)?"A"===a?11:10:1*a},n=(b,a)=>(g[a]+=m(b),h[a].innerText=g[a],g[a]),o=(b,c)=>{let a=document.createElement("img");a.src=`assets/deck/${b}.png`,a.classList.add("card"),i[c].append(a)},p=()=>{let[a,b]=g;b===a?s():a>21?s():b>21?r():s()},q=a=>{let b=0;do{let c=l();b=n(c,g.length-1),o(c,g.length-1)}while(b<a&&a<=21)p()};c.addEventListener("click",()=>{j()}),a.addEventListener("click",()=>{let b=l(),a=n(b,0);o(b,0),a>21?(s(),q(a)):21===a&&(r(),q(a))}),b.addEventListener("click",()=>{t(),q(g[0])});let r=()=>{t(),Swal.fire({title:"YOU WIN!!",imageUrl:"https://media.giphy.com/media/3rUbeDiLFMtAOIBErf/giphy.gif",width:600,color:"#716add",backdrop:`
                rgba(0,0,123,0.4)
            `})},s=()=>{t(),Swal.fire({title:"GAME OVER",imageUrl:"https://media.giphy.com/media/meCuxM5FdjWBBZXyNr/giphy.gif",width:600,color:"#00000"})},t=(c=!0)=>{a.disabled=c,b.disabled=c}})()