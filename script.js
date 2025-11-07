const messages=[  
  {text:"ALOO SAYANGGKUU BOCILLKUU 💖",emoji:"💝"},  
  {text:"MAACIHH YAA SUDAH HADIR DI HIDUP TENGILL 💕",emoji:"🥰"},  
  {text:"MAAPP KALO TENGILL BELUM SEMPURNA KAYAK HARAPANMU 😘",emoji:"💌"},  
  {text:"KITA HADAPI SEMUA BARENG-BERENG YAA 💑",emoji:"💞"},  
  {text:"I LOVE YOU BOCILLKUU SAYANGGKUU CINTAKUU ❤️",emoji:"❤️"}  
];  
let currentMessage=0;  
const giftScreen=document.getElementById("giftScreen");  
const messageScreen=document.getElementById("messageScreen");  
const sliderButton=document.getElementById("sliderButton");  
const giftLid=document.getElementById("giftLid");  
const messageText=document.getElementById("messageText");  
const emojiElement=document.getElementById("emoji");  
const nextButton=document.getElementById("nextButton");  
const progressDots=document.getElementById("progressDots");  

function initDots(){  
  progressDots.innerHTML="";  
  messages.forEach((_,i)=>{  
    const dot=document.createElement("div");  
    dot.className="dot"+(i===currentMessage?" active":"");  
    progressDots.appendChild(dot);  
  });  
}  
function updateDots(){  
  document.querySelectorAll(".dot").forEach((dot,i)=>{  
    dot.classList.toggle("active",i===currentMessage);  
  });  
}  
function showMessage(){  
  messageText.textContent=messages[currentMessage].text;  
  emojiElement.textContent=messages[currentMessage].emoji;  
  updateDots();  
}  

let isDragging=false,startX=0,currentX=0;  
const maxX=217;  

const startDrag=(x)=>{isDragging=true;startX=x-sliderButton.offsetLeft;};  
const moveDrag=(x)=>{  
  if(!isDragging)return;  
  currentX=x-startX;  
  if(currentX<3)currentX=3;  
  if(currentX>maxX)currentX=maxX;  
  sliderButton.style.left=currentX+"px";  
  const progress=(currentX-3)/(maxX-3);  
  giftLid.style.transform=`translate(-50%,-100%) translateY(-${progress*100}px) rotate(${progress*-15}deg)`;  
  if(currentX>=maxX)openGift();  
};  
const endDrag=()=>{  
  if(!isDragging)return;  
  if(currentX<maxX){sliderButton.style.left="3px";giftLid.style.transform="translate(-50%,-100%)";}  
  isDragging=false;  
};  

sliderButton.addEventListener("mousedown",e=>startDrag(e.clientX));  
document.addEventListener("mousemove",e=>moveDrag(e.clientX));  
document.addEventListener("mouseup",endDrag);  

sliderButton.addEventListener("touchstart",e=>startDrag(e.touches[0].clientX));  
document.addEventListener("touchmove",e=>moveDrag(e.touches[0].clientX));  
document.addEventListener("touchend",endDrag);  

function openGift(){  
  isDragging=false;  
  setTimeout(()=>{  
    giftScreen.classList.add("hidden");  
    messageScreen.classList.remove("hidden");  
    initDots();  
    showMessage();  
    // ✅ Musik otomatis setelah kado terbuka
    const music = document.getElementById("bgMusic");
    music.volume = 0.4; // B = Volume Sedang
    music.play();
  },300);  
}  

nextButton.addEventListener("click",()=>{  
  currentMessage++;  
  if(currentMessage<messages.length){showMessage();}  
  else{  
    messageText.textContent="Terima kasih sudah membaca semuanya! 💕";  
    emojiElement.textContent="🥰";  
    nextButton.style.display="none";  
  }  
});