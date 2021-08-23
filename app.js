/* Getting Reaturants entered information */
// var restemail = document.getElementById('restemail')
// var restname = document.getElementById('restname')
// var restpassword = document.getElementById('restpassword')
// var restcountry = document.getElementById('restcountry')
// var restcity = document.getElementById('restcity')
// var itemslist = []

/* Getting customers entered information */

var useremail = document.getElementById('useremail')
var username = document.getElementById('username')
var userphone = document.getElementById('userphone')
var userpassword = document.getElementById('userpassword')
var usercountry = document.getElementById('usercountry')



/* Sign up function for restaurant */

var restsignup=()=>{
    var restemail = document.getElementById('restemail')
    var restname = document.getElementById('restname')
    var restpassword = document.getElementById('restpassword')
    var restcountry = document.getElementById('restcountry')
    var restcity = document.getElementById('restcity')
    var new_restaurant = {
        restname:restname.value,
        restemail:restemail.value,
        restcountry:restcountry.value,
        restcity:restcity.value,
        restpassword:restpassword.value,
        totalitem:0
    
    }
    console.log(new_restaurant)
    
   firebase.auth().createUserWithEmailAndPassword(restemail.value, restpassword.value)
  .then((userCredential) => {
 
    var user = userCredential.user;
      firebase.database().ref('restaurants').child(user.uid).set(new_restaurant) // we are creating key by our own
     setTimeout(function(){
         window.location = "restlogin.html"
     },1000)
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var a = document.getElementById('my-modal')
    document.getElementById('modalpara').innerHTML = errorMessage
    a.style.display = 'block'

  });
}

var customersignup = ()=>{
    let new_customer= {
        username:username.value,
        useremail:useremail.value,
        usercountry:usercountry.value,
        userphone:userphone.value,
        userpassword:userpassword.value,
    
    }
    console.log(new_customer)
    

   firebase.auth().createUserWithEmailAndPassword(useremail.value, userpassword.value)
  .then((userCredential) => {
 
    var user = userCredential.user;
    console.log(user)
 
      firebase.database().ref('USERS').child(user.uid).set(new_customer)
      setTimeout(function(){
          window.location = 'usersignin.html'
      },2000)



    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var a = document.getElementById('my-modal')
    document.getElementById('modalpara').innerHTML = errorMessage
    a.style.display = 'block'

  });

}

var close_popup = ()=>{
    var a = document.getElementById ('my-modal')
    a.style.display = 'none'
  }



var restsignin = ()=>{
    firebase.auth().signInWithEmailAndPassword(restemail.value, restpassword.value)
    .then((userCredential) => {
      
      var user = userCredential.user;
      var all = {
          curr_user:restemail.value,
          curr_userid:user.uid
      }
      window.localStorage.setItem('curr_rest',JSON.stringify(all))
      setTimeout(function(){
          window.location = "restpanel.html"

      },1000)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var a = document.getElementById('my-modal')
      document.getElementById('modalpara').innerHTML = errorMessage
      a.style.display = 'block'
  
     
    });
}
function restsignout(){
    window.location = "RestSignup.html"
}

function displayrestitems(){
        let a = document.getElementById('card')
     
      

        var current_restaurant=JSON.parse(window.localStorage.getItem('curr_rest'))
        var current_restaurant_id=current_restaurant.curr_userid
        firebase.database().ref(current_restaurant_id).on('child_added',function(data){
            alllist = [data.val()]
            console.log(alllist)
            let current_category = document.getElementById('food_category')
           for(var i = 0;i<alllist.length;i++){
               if(alllist[i].category===current_category.value){
                now.innerHTML+=`
            <li style = " list-style: none;
            margin: 0;
            padding: 0; display: flex;
            justify-content: space-between;
            margin: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #ccc;">
            <div >
                <h3 style = " margin: 0 0 0.25rem 0;">${alllist[i].category}</h3>
                <div style = "font-style: italic;">${alllist[i].name}</div>
                <div style = " margin-top: 0.25rem;
                font-weight: bold;
                color: #ad5502;
                font-size: 1.25rem;">${alllist[i].price}</div>
            </div>
            <div style = "text-align: right;">
            <label style = " font-weight: bold;
            margin-right: 1rem;">Amount</label>
            <input type = "number"       style = "  display: flex;align-items: center; margin-bottom: 0.5rem; width: 6rem;border-radius: 5px; border: 1px solid #ccc;font: inherit;padding-left: 0.5rem;"                 />
             <button style = "font: inherit;
             cursor: pointer;
             background-color: #8a2b06;
             border: 1px solid #8a2b06;
             color: white;
             padding: 0.25rem 2rem;
             border-radius: 20px;
             font-weight: bold;">Add</button>
            </div>
            </li>`}
               }
    
             
    
             
        
     }
    
            
    
    
    
        
)}


         

         

    
 

        




function addRestitem(){
    var category = document.getElementById('item_category')
    var name = document.getElementById('item_name')
    var price = document.getElementById('item_price')
    var delivery = document.getElementById('delivery_version')

    var current_restaurant=JSON.parse(window.localStorage.getItem('curr_rest'))
    var current_restaurant_id=current_restaurant.curr_userid
    var key = firebase.database().ref('allitems').push().key
    var new_item=  {
        id:current_restaurant_id,
        identifier:key,
        category:category.value,
        name:name.value,
        price:price.value,
        delivery:delivery.value
    }
  
    firebase.database().ref('allitems').child(key).set(new_item)
    console.log(key)
    firebase.database().ref(current_restaurant_id+"items").child(key).set(new_item)
    category.value =""
    name.value =""

   

}


function displayingrestitems(){
    let a = document.getElementById('card')
    var current_restaurant=JSON.parse(window.localStorage.getItem('curr_rest'))
    var current_restaurant_id=current_restaurant.curr_userid
    firebase.database().ref(current_restaurant_id+  "items").on('child_added',function(data){
        alllist = [data.val()]
        console.log(alllist)
        let current_category = document.getElementById('food_category')
       for(var i = 0;i<alllist.length;i++){
           
            a.innerHTML+=`
        <li style = " list-style: none;
        margin: 0;
        padding: 0; display: flex;
        justify-content: space-between;
        margin: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #ccc;">
        <div >
            <h3 style = " margin: 0 0 0.25rem 0; color:black">${alllist[i].category + ' food'}</h3>
            <div style = "font-style: italic;">${alllist[i].name}</div>
            <div style = " margin-top: 0.25rem;
            font-weight: bold;
            color: #ad5502;
            font-size: 1.25rem;">${alllist[i].price}</div>
        </div>
        <div style = "text-align: right;">
      
         <button  style = "font: inherit;
         cursor: pointer;
         background-color: #8a2b06;
         border: 1px solid #8a2b06;
         color: white;
         padding: 0.25rem 2rem;
         border-radius: 20px;
         font-weight: light;" onclick = 'deleteitem("${alllist[i].identifier}")'>Add</button>
        </div>
        </li>`}


           })
}


function deleteitem(e){
    var current_restaurant=JSON.parse(window.localStorage.getItem('curr_rest'))
    var current_restaurant_id=current_restaurant.curr_userid
    firebase.database().ref(current_restaurant_id+"items").child(e).remove()
    firebase.database().ref('allitems').child(e).remove()

}

function hidingnew_item_form(){
    var a = document.getElementById('form')
    a.style.display = 'none'
}












  function gettingdatafromfirebase(){
    // firebase.database().ref('users').once('value',function(data){  //this will give us the data whenvever we load this function
         firebase.database().ref('users').on('child_added',function(data){ // this will bring us the data whenever a new object  is inserted in the database 
             console.log(data.val())
            
 
         })
         
 
 
 }

 
 function displayingallitems(){
     let a = document.getElementById('card')
     
     firebase.database().ref('allitems').on('child_added',function (data) {
        alllist = [data.val()]
       
        let current_category = document.getElementById('food_category')
       for(var i = 0;i<alllist.length;i++){
           if(alllist[i].category===current_category.value){
            a.innerHTML+=`
        <li style = " list-style: none;
        margin: 0;
        padding: 0; display: flex;
        justify-content: space-between;
        margin: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #ccc;">
        <div >
            <h3 style = " margin: 0 0 0.25rem 0;">${alllist[i].category}</h3>
            <div style = "font-style: italic;">${alllist[i].name}</div>
            <div style = " margin-top: 0.25rem;
            font-weight: bold;
            color: #ad5502;
            font-size: 1.25rem;">${alllist[i].price}</div>
        </div>
        <div style = "text-align: right;">
        <label style = " font-weight: bold;
        margin-right: 1rem;">Amount</label>
        <input type = "number"       style = "  display: flex;align-items: center; margin-bottom: 0.5rem; width: 6rem;border-radius: 5px; border: 1px solid #ccc;font: inherit;padding-left: 0.5rem;"                 />
         <button style = "font: inherit;
         cursor: pointer;
         background-color: #8a2b06;
         border: 1px solid #8a2b06;
         color: white;
         padding: 0.25rem 2rem;
         border-radius: 20px;
         font-weight: bold;" onclick = 'orderitem("${alllist[i].id}","${alllist[i].name}","${alllist[i].price}")'>Add</button>
        </div>
        </li>`}


         

         
     }})
    
 }
var global=[]
 function orderitem(id,name,price){
     var a = document.getElementById('badge')
     a.innerHTML++
  
   
    var c = {
        id,
        name,
        price,
    }
    global.unshift(c)
    

 }
 function orderitemlasttime(){
     if(document.getElementById('badge').innerHTML==0){
         var error = document.getElementById('error_modal')
         error.style.display = "block"
     }
     else{

        var date =new Date()
        var user = JSON.parse(window.localStorage.getItem('curr_user'))

        for(var i = 0;i<global.length;i++){
            var a = {
                time:date.getTime(),
               customer_email:user.curr_user,
               quantity:1,
               price:global[i].price,
               status:"pending",


            }
        var key = firebase.database().ref('allitems').push().key
        firebase.database().ref(global[i].id+"orders").child(key).set(a)



        }
        var modal = document.getElementById('modal')
        modal.style.display = "block"
        global = []
        document.getElementById('badge').innerHTML = 0
}

    
 }

function Looping() {
    let a = document.getElementById('card')
    a.innerHTML = ""
      
    firebase.database().ref('allitems').on('child_added',function (data) {
        alllist = [data.val()]
        console.log(alllist)
        let current_category = document.getElementById('food_category')
       for(var i = 0;i<alllist.length;i++){
           if(alllist[i].category===current_category.value){
            a.innerHTML+=`
        <li style = " list-style: none;
        margin: 0;
        padding: 0; display: flex;
        justify-content: space-between;
        margin: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #ccc;">
        <div >
            <h3 style = " margin: 0 0 0.25rem 0;">${alllist[i].category}</h3>
            <div style = "font-style: italic;">${alllist[i].name}</div>
            <div style = " margin-top: 0.25rem;
            font-weight: bold;
            color: #ad5502;
            font-size: 1.25rem;">${alllist[i].price}</div>
        </div>
        <div style = "text-align: right;">
        <label style = " font-weight: bold;
         margin-right: 1rem;">Amount</label>
         <input type = "number"       style = "  display: flex;align-items: center; margin-bottom: 0.5rem; width: 6rem;border-radius: 5px; border: 1px solid #ccc;font: inherit;padding-left: 0.5rem;"                 />
         <button style = "font: inherit;
         cursor: pointer;
         background-color: #8a2b06;
         border: 1px solid #8a2b06;
         color: white;
         padding: 0.25rem 2rem;
         border-radius: 20px;
         font-weight: bold;" >Delete item</button>
        </div>
        </li>`}


         
           }})}


function useraftersignin(){
    firebase.auth().signInWithEmailAndPassword(useremail.value, userpassword.value)
    .then((userCredential) => {
      
      var user = userCredential.user;
      var all = {
          curr_user:useremail.value,
          curr_userid:user.uid
      }
      window.localStorage.setItem('curr_user',JSON.stringify(all))
      setTimeout(function(){
          window.location = "../usermainpage.html"
      },2000)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var a = document.getElementById('my-modal')
      document.getElementById('modalpara').innerHTML = errorMessage
      a.style.display = 'block'
  
     
    });
}
    

// let a = document.getElementById('food_category')
//  console.log(a.value)


function getMonth(a){
    if(a===0){
        return "Jan"
    }
    else if(a===1){
        return "Feb"
    }
    else if(a===2){
        return "Mar"
    }
    else if(a===3){
        return "Apr"
    }
    else if(a===4){
        return "May"
    }
    else if(a===5){
        return "Jun"
    }
    else if(a===6){
        return "Jul"
    }
    else if(a===7){
        return "Aug"
    }
    else if(a===8){
        return "Sep"
    }
    else if(a===9){
        return "Oct"
    }
    else if(a===10){
        return "Nov"
    }
    else if(a===11){
        return "Dec"
    }
}

function additemformdisplay(){
    var a = document.getElementById('my-modal')
    a.style.display = "block"
}



function usermodalclose(){
    let a = document.getElementById('modal')
    a.style.display = 'none'
}

function usererrormodalclose(){
    let a = document.getElementById('error_modal')
    a.style.display = 'none'
}



function restdashboard(){
    var rest = JSON.parse(window.localStorage.getItem('curr_rest'))
    var current = rest.curr_userid
    firebase.database().ref(current + "orders").on('child_added',function (data) {
        alllist = [data.val()]
        console.log(alllist)
        let a = document.getElementById('card')
       for(var i = 0;i<alllist.length;i++){
            a.innerHTML+=`
        <li style = " list-style: none;
        margin: 0;
        padding: 0; display: flex;
        justify-content: space-between;
        margin: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #ccc;">
        <div >
            <h3 style = " margin: 0 0 0.25rem 0;">Order by: ${alllist[i].customer_email}</h3>
            <div style = "font-style: italic;">Price: ${alllist[i].price}</div>
            <div style = " margin-top: 0.25rem;
            font-weight: bold;
            color: #ad5502;
            font-size: 1.25rem;">Status: ${alllist[i].status}</div>
        </div>
        <div style = "text-align: center;">
         <button style = "font: inherit;
         cursor: pointer;
         background-color: #8a2b06;
         border: 1px solid #8a2b06;
         color: white;
         padding: 0.25rem 2rem;
         border-radius: 20px;
         font-weight: bold;" >Reject Order</button>
         <button style = "font: inherit;
         cursor: pointer;
         background-color: #8a2b06;
         border: 1px solid #8a2b06;
         color: white;
         padding: 0.25rem 2rem;
         border-radius: 20px;
         font-weight: bold;" >Deliver Order</button>
        </div>
        </li>`}


    })

    

}

function showdashboard(){
    window.location = "restdashboard.html"
}

// let b= new Date()
// c = (getMonth(b.getMonth()))
// console.log(c)
// console.log(b.getDate() , c)
// let d = b.getDate() + " " +  c
// console.log(d)



function loggingoutuser(){
    
    window.localStorage.removeItem('curr_user')

}