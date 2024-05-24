const passwordDisplay=document.querySelector(".dispass");
const slider=document.querySelector("#ipslider");
const indicator=document.querySelector('#indicator');
const copyicon=document.querySelector('.copyic');
const copieddiv=document.querySelector('.copieddiv');
const gntbtn=document.querySelector('#btn');
const passwordfield=document.querySelector("#password");

const sliderbg=document.querySelector("#ipslider");

// console.log(copieddiv);

const checkbox=document.querySelectorAll('input[type=checkbox]')
let symbols="!@#$%^&*";
// console.log(checkbox[0]);

let password="";
let passwordLength=10;
sliderhandle();

function sliderhandle(){
    slider.value=passwordLength;
    passwordDisplay.innerHTML=passwordLength;

    // sliderbg.style.
    const min=sliderbg.min;
    const max=sliderbg.max;

    sliderbg.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}

slider.addEventListener('input',(val)=>{
    passwordLength=val.target.value;
    // passwordDisplay.innerHTML=val;
    sliderhandle();
});

function getRndNum(min,max){
    // console.log(Math.random());
    // console.log(max-min);
    // console.log(Math.random()*(max-min));
    // console.log(Math.floor(Math.random()*(max-min)));
    // console.log(Math.floor(Math.random()*(max-min))+min);
    return Math.floor(Math.random()*(max-min))+min;
}

function getNum(){
    let num=getRndNum(0,9);
    return num;
}

function getUpper(){
    let up=getRndNum(65,90);
    return String.fromCharCode(up);
}

function getLower(){
    let low=getRndNum(97,122);
    return String.fromCharCode(low);
}

function getSymbol(){
    let sym=getRndNum(0,symbols.length);
    return symbols.charAt(sym);
}

function indiup(){
    let up=false;
    let low=false;
    let num=false;
    let sym=false;

    let cnt=0;

    if(checkbox[0].checked){
       up=true;
       cnt++;
    }
    if(checkbox[1].checked){
       low=true;
       cnt++;
    }
    if(checkbox[2].checked){
       num=true;
       cnt++;
    }
    if(checkbox[3].checked){
       sym=true;
       cnt++;
    }
        
    if(cnt>=3 && passwordLength>=6 ){
        indicator.style.backgroundColor="green";
        indicator.style.filter = 'blur(0.8px) brightness(2)';
    }
    else if(cnt>=2 && passwordLength>=10){
        indicator.style.backgroundColor="green";
        indicator.style.filter = 'blur(0.8px) brightness(2)';
    }
    else if(cnt>=2 && passwordLength>=5){
        indicator.style.backgroundColor="yellow";
        indicator.style.filter = 'blur(0.8px) brightness(2)';
    }
    else if(cnt==1 && passwordLength>=15){
        indicator.style.backgroundColor="green";
        indicator.style.filter = 'blur(0.8px) brightness(2)';    
    }
    else if(cnt==1 && passwordLength>=10){
        indicator.style.backgroundColor="yellow";
        indicator.style.filter = 'blur(0.8px) brightness(2)';

    }
    else{
        indicator.style.backgroundColor="red";
        indicator.style.filter = 'blur(0.8px) brightness(2)';
    }
}

copyicon.addEventListener("click",copyContent);

async function copyContent(){
    if(password){

        try{
            await navigator.clipboard.writeText(password);
            // copieddiv.style.transition="display 1s";
            // copieddiv.style.scale="1";
            copieddiv.innerHTML="COPIED";
        }
        catch(e){
            copieddiv.innerHTML="FAILED";
        }
        
            copieddiv.classList.add("active");     
            setTimeout(()=>{
                // copieddiv.style.transition="scale 0.5s";
                // copieddiv.style.scale="0";
                // copieddiv.style.display="none";
                copieddiv.classList.remove("active");     
            },1500);
    }
    
}

gntbtn.addEventListener('click',()=>{
    password=gnt(passwordLength);
    passwordfield.innerHTML=password;
    passwordfield.style.opacity=1;
    indiup();

});

function gnt(len){
    let temp="";

    let up=false;
    let low=false;
    let num=false;
    let sym=false;

    let cnt=0;

    if(checkbox[0].checked){
       up=true;
       cnt++;
    }
    if(checkbox[1].checked){
       low=true;
       cnt++;
    }
    if(checkbox[2].checked){
       num=true;
       cnt++;
    }
    if(checkbox[3].checked){
       sym=true;
       cnt++;
    }


    let array=[];

    if(up){
        array.push(getUpper);
    }
    if(low){
        array.push(getLower);
    }
    if(num){
        array.push(getNum);
    }
    if(symbols){
        array.push(getSymbol);
    }


    for(let i=0;i<len;i++){
        let index=getRndNum(0,array.length-1);

        temp=temp+array[index]();
    }

    return temp;
}