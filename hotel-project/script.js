let slides=document.querySelectorAll(".slider img")
let index=0

setInterval(()=>{
slides[index].classList.remove("active")
index=(index+1)%slides.length
slides[index].classList.add("active")
},3000)

let rooms={single:5,double:3,family:2}

let foodPrices={
Idli:50,Dosa:80,Pongal:70,Upma:60,Vada:50,Tea:20,Coffee:25,
"Veg Meals":120,"Chicken Biryani":180,"Veg Biryani":150,
"Fried Rice":130,"Curd Rice":90,Chapati:60,
"Paneer Curry":160,"Chicken Curry":200,
Noodles:100,Soup:90
}

let foodTotal=0

if(!localStorage.getItem("user")){
localStorage.setItem("user",JSON.stringify({
email:"admin@hotel.com",
password:"1234"
}))
}

function signup(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

localStorage.setItem("user",JSON.stringify({email,password}))

alert("Account Created")

}

function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

let user=JSON.parse(localStorage.getItem("user"))

if(user && email===user.email && password===user.password){

document.getElementById("login").style.display="none"
document.getElementById("booking").style.display="block"

updateAvailability()

}else{

document.getElementById("loginMsg").innerText="Invalid Login"

}

}

function updateAvailability(){

document.getElementById("availability").innerHTML=
"Single: "+rooms.single+
" | Double: "+rooms.double+
" | Family: "+rooms.family

}

function showFood(){

let type=document.getElementById("room").value

if(type===""){
alert("Select room")
return
}

if(rooms[type]<=0){
alert("Room not available")
return
}

rooms[type]--

document.getElementById("booking").style.display="none"
document.getElementById("foodOrder").style.display="block"

updateAvailability()

}

function addFood(){

let item=document.getElementById("foodItem").value
let q=document.getElementById("qty").value

if(item===""||q==="") return

let price=foodPrices[item]*q

foodTotal+=price

document.getElementById("foodList").innerHTML+=
"<div class='foodItem'>"+item+" x "+q+" = ₹"+price+"</div>"

}

function showPayment(){

document.getElementById("foodOrder").style.display="none"
document.getElementById("paymentPage").style.display="block"

}

function completeBooking(){

let roomType=document.getElementById("room").value

let checkin=document.getElementById("checkin").value
let checkout=document.getElementById("checkout").value

let days=(new Date(checkout)-new Date(checkin))/(1000*60*60*24)

if(days<=0) days=1

let roomPrice={single:1000,double:2000,family:3500}

let roomTotal=roomPrice[roomType]*days

let total=roomTotal+foodTotal

document.getElementById("bill").innerHTML=
"Customer: "+document.getElementById("name").value+"<br>"+
"Room: "+roomType+"<br>"+
"Days: "+days+"<br>"+
"Room Cost: ₹"+roomTotal+"<br>"+
"Food Cost: ₹"+foodTotal+"<br>"+
"<b>Total: ₹"+total+"</b>"

document.getElementById("paymentPage").style.display="none"
document.getElementById("billPage").style.display="block"

}

function downloadPDF(){

const { jsPDF } = window.jspdf

let doc=new jsPDF()

doc.text("Lucky Grand Hotel",20,20)
doc.text(document.getElementById("bill").innerText,20,40)

doc.save("hotel_bill.pdf")

}

function addReview(){

let name=document.getElementById("reviewName").value
let text=document.getElementById("reviewText").value

document.getElementById("reviews").innerHTML+=
"<div class='reviewBox'><b>"+name+"</b><br>"+text+"</div>"

}

new Chart(document.getElementById("chart"),{
type:"bar",
data:{
labels:["Single","Double","Family"],
datasets:[{
label:"Rooms Available",
data:[rooms.single,rooms.double,rooms.family],
backgroundColor:["blue","green","orange"]
}]
}
})