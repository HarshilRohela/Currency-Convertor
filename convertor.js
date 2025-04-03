const baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
let from=document.querySelector(".from select");
let to=document.querySelector(".to select");
let result=document.querySelector(".result");

for (let select of dropdown) {
    for (let currcode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currcode;
        newOption.value = currcode;

        if (select.name == "from" && currcode == "USD") {
            newOption.selected = "selected";
        } else if (select.name == "to" && currcode == "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let cc = countryList[currcode]; 

    if (cc) { 
        let countrycode = cc.toLowerCase();
        let newsrc = `https://flagcdn.com/w80/${countrycode}.png`; 
        let img = element.parentElement.querySelector("img");

        if (img) {
            img.src = newsrc;
            
        } else {
            console.error("Image not found in the parent element.");
        }
    } else {
        console.error(`Country code not found for currency: ${currcode}`);
    }
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    convert();
    
})

const convert=async()=>{
    let amt=document.querySelector(".amount");
    let amtval=amt.value;
    if(amtval=="" || amtval<1){
        amtval=1;
        amt.value="1";
    }
    console.log(amtval);
    console.log(from.value,to.value);
    let fromc=from.value.toLowerCase();
    let toc=to.value.toLowerCase();
    const url=`${baseurl}/${fromc}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[fromc][toc];
    convertedamt=rate*amt.value;

    result.innerHTML=`<p>${amt.value} ${fromc.toUpperCase()} = ${convertedamt.toFixed(2)} ${toc.toUpperCase()} <br> 1 ${fromc.toUpperCase()} = ${rate} ${toc.toUpperCase()}</p>`;

}


