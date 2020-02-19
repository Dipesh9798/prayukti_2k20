/* eslint-disable eqeqeq */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/always-return */
/* eslint-disable no-alert */

var usr;
var dbRootRef=firebase.firestore();
var number;
//var otp;

window.onload=function(){
    window.recaptchVerifier=new firebase.auth.RecaptchaVerifier('r1',{
      'size':'normal',
      'callback':function(response){
        document.getElementById('r1').style.display="none";
       // var appverifier=window.recaptchVerifier;
      },
      'expired-callback': function() {
        console.log("expired-callback");
      }
    });
    recaptchVerifier.render();

}

function sendOTP(){
  number=document.getElementById('number').value;
  

        firebase.auth().signInWithPhoneNumber("+91"+number,window.recaptchVerifier)
        .then(function(confirmationResult){
          window.confirmationResult=confirmationResult;
          console.log("OTP sent");
         // otp=prompt("Enter the OTP");
         document.getElementById('beforeotp').style.display="none";
          document.getElementById('otp').style.display="block";


        })
        .catch(function(error){
          //OTP sending error ........... Give a alert of error.message
          alert('You have consumed max try of OTP verification \n Please try after some time');
          console.log(error.message);
          window.location.href="/";
        });
     
   // recaptchaVerifier.render().then(function(widgetId) {
    //  window.recaptchaWidgetId = widgetId;
  //});

}

function codeVerify(){
  var otp=document.getElementById('code').value;
  confirmationResult.confirm(otp)
  .then(function(result){
    var user=result.user;
    
    
       dbRootRef.collection('outhouse_database')
        .doc(user.uid)
      .get()
      .then( doc =>{
        if(doc.exists){
            console.log("Logged In");
            window.location.href="/Dash_outhouse/Dash.html";
            //console.log(doc.data());
            //console.log("chu");
            console.log(doc.data().user_name);
            console.log(doc.get('user_name'));
        }
           else
           {
                //alert("Proceed to Fill the Form");
                document.getElementById('login1').style.display="none";
                document.getElementById('outhouse').style.display="block";
           }
   
  })
  
})
.catch(function(error){
  alert("wrong Otp"); // add a route to login_inhouse.html
  console.log(error.message);
});
}

 function registerUser(){

  console.log("In register user");

 // console.log(firebase.auth().currentUser);

 // var id1=prompt("gaandu");
  this.Unsubscribe=firebase.auth().onAuthStateChanged(function(user){
  //  var id2=prompt("gaandu");
    console.log(user);
  //  var id3=prompt("gaandu");
  //  console.log(firebase.auth().currentUser);
    if(user){
      var user_uid=user.uid;
      //window.localStorage.setItem("usr",user_uid);

      console.log(user_uid);
     // var id=prompt("gaandu");

  var mobile =document.getElementById('number').value;
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var gender=document.getElementById('gender').value;
  var dob=document.getElementById('DOB').value;
  var college_name = document.getElementById('college').value;
  var dept=document.getElementById('dept').value;
  var college_roll = document.getElementById('roll').value;
  var college_code = "O";
  var tshirt_size = document.getElementById('tshirt').value;
     // dbRootRef.collection('inhouse_database')
     // .where("user_mobile", "==" , mobile)
     // .where("user_email", "==" , email)
     // .get()
      //.then( snapshot =>{
       // if(snapshot.empty){
          //User can register
          //post user data to database

          //console.log("Snap is Empty");
          if(name==="" && email ==="" && dob==="" && college_roll==="" && college_name==="")
          {
            alert("Please fill the form carefully");
            window.location.href="/registration.html";
          }

          var userDocData = {
            user_name: name,
            user_email: email,
            user_uid: user_uid,
            user_mobile:mobile,
            gender:gender,
           // user_profile_img: user_profile_img,
            user_college : college_name,
            user_roll: college_roll,
            user_dept:dept,
            user_dob:dob,
           // college_session: session,
            college_id: college_code,
            tshirt_size : tshirt_size,
            events_reg:"",
            payment_status:"",
            timestamp: Date.now()
          };
          console.log(userDocData);
          dbRootRef
            .collection("outhouse_database")
            .doc(user_uid)
            .set(userDocData)
            .then(function() {
             // res.send({status: 200})
              console.log("User Added to Database Succesfully");
              window.location.href="/Dash_outhouse/Dash.html";
              console.log(doc.data());


            })
            .catch(function(error) {
              console.log("Error writing document: ", error);
            });

      //  }
        //else{
          //user alreday exist in database 
          //res.send({status :400 , errorMessage : "User already exist in database"})
          //res.render('/Dash/Dash.html')
       // }

//end posting database 

} 
else {
// User is signed out.
// ...
console.log("user already signed out");
}
})
event.preventDefault();
}

/*
function codeVerify(){
  var otp=document.getElementById('code').value;
  confirmationResult.confirm(otp)
  .then(function(result){
    var user=result.user;
    console.log("Logged In");
    alert("Proceed to Fill the Form");
    document.getElementById('otp').style.display="none";
    document.getElementById('inhouse').style.display="block";
   
  })
  .catch(function(error){
    alert("wrong Otp"); // add a route to login_inhouse.html
    console.log(error.message);
  });
}

function registerUser(){

  console.log("In register user");

 // console.log(firebase.auth().currentUser);

 // var id1=prompt("gaandu");
  this.Unsubscribe=firebase.auth().onAuthStateChanged(function(user){
  //  var id2=prompt("gaandu");
    console.log(user);
  //  var id3=prompt("gaandu");
  //  console.log(firebase.auth().currentUser);
    if(user){
      var user_uid=user.uid;
      console.log(user_uid);
     // var id=prompt("gaandu");

  var mobile =document.getElementById('number').value;
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var gender=document.getElementById('gender').value;
  var dob=document.getElementById('DOB').value;
  var college_name = "Haldia Institute of Technology";
  var dept=document.getElementById('dept').value;
  var college_roll = document.getElementById('roll').value;
  var college_code = document.getElementById('CID').value;
  var tshirt_size = document.getElementById('tshirt').value;
      dbRootRef.collection('inhouse_database')
      .where("user_mobile", "==" , mobile)
      .where("user_email", "==" , email)
      .get()
      .then( snapshot =>{
        if(snapshot.empty){
          //User can register
          //post user data to database

          console.log("Snap is Empty");

          var userDocData = {
            user_name: name,
            user_email: email,
            user_uid: user_uid,
            user_mobile:mobile,
            gender:gender,
           // user_profile_img: user_profile_img,
            user_college : college_name,
            user_roll: college_roll,
            user_dept:dept,
            user_dob:dob,
           // college_session: session,
            college_id: college_code,
            tshirt_size : tshirt_size
          //  t_shirt_type : t_shirt_type,
            //"timestamp": Date.now
          };
          console.log(userDocData);
          dbRootRef
            .collection("inhouse_database")
            .doc(user_uid)
            .set(userDocData)
            .then(function() {
             // res.send({status: 200})
              console.log("User Added to Database Succesfully");
              window.location.href="/Dash/Dash.html";
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });

        }
        else{
          //user alreday exist in database 
          //res.send({status :400 , errorMessage : "User already exist in database"})
          res.render('/Dash/Dash.html')
        }

  })
  .catch(err =>{
    console.log("ErrInternal Server Error is +" +err);
  });

//end posting database 

} else {
// User is signed out.
// ...
console.log("user already signed out");
}
})
event.preventDefault();
}*/

//console.log(localStorage.getItem("usr"))

function dashrender(){
  //console.log("inside dashboard")
  //console.log(doc.data())
  //console.log(firebase.auth().currentUser.uid);
  //console.log(user.uid)
  firebase.auth().onAuthStateChanged(function(user){

    //prompt("hello!")
    if(user){
            var user_uid=user.uid;
            console.log(user_uid)
            console.log(user)
            //console.log(user.user_name)
            console.log(firebase.auth().currentUser.uid)
            //console.log(getUserName())
            //const db = firebase.firestore()
            /*dbRootRef.collection('inhouse_database').get().then((snapshot)=>{
              snapshot.docs.forEach(doc => {
                console.log(doc.data());
                document.getElementById('name').value=doc.data().user_name
              })
            })*/
            firebase.firestore().collection('outhouse_database').doc(user_uid).get()
            .then(doc=>{
              if(doc.exists){
                console.log(doc.data());
                let values=doc.data();
                console.log(values.events_reg);
                if(values.gender==="Male")
                {
                    document.getElementById('image').src="https://img.icons8.com/bubbles/2x/user.png";
                }
                else
                {
                    document.getElementById('image').src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBOdXy4P-QmsJNaewfKFRD1RM5D6jXjjrzbgm9e8ViME3JwCU5";
                }

                document.getElementById('college').innerHTML=values.user_college;
                document.getElementById('name').innerHTML=values.user_name;
                document.getElementById('roll').innerHTML=values.user_roll;
                document.getElementById('tshirt').innerHTML=values.tshirt_size;
                document.getElementById('id').innerHTML='O'+values.user_mobile;
                if(values.payment_status === "p" || values.payment_status === "P"){
                  document.getElementById('payment').innerHTML= "PAID" ;
                  document.getElementById("submit").disabled = true;
                  document.getElementById("pay").disabled = true;
                  document.getElementsByTagName("input").disabled = true;
                  }
                  a1 = [] 
                  if(values.events_reg.length>0){
                    a1 = values.events_reg; 
                    var boxes=document.getElementsByTagName("input");
                      
                    for(i = 0;i<a1.length;i++){
                      for(j=0;j<boxes.length;j++)
                      {
                        if(boxes[j].value===a1[i])
                        {
                          boxes[j].checked=true;
                        }
                      }
                    }
  
                    checkboxes();
                    
                  
                  }
                   
  
                  
                }
  
              else{
                alert("server side error");
              }
            })
    }
    else
    {
      //alert("error");
    }
  })
}

var checkbox = document.querySelectorAll("input[type=checkbox]");
                //console.log(checkbox);
        
                //var checkbox1 = document.querySelector("input[name=saudagar1]");

function checkboxes()
          {
           var inputElems = document.getElementsByTagName("input"),
            count = 0;
            paym=0;
            //var st=""
            var cost=""
            var yanarr = [];
            var ranarr = [];
            //console.log(inputElems[17].name)
             arr=[];
            for (var i=0; i<inputElems.length; i++) {
               if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
                  count++;
                   arr.push(inputElems[i].value);
        
                   
              if (inputElems[i].name == "yantriki[]"){
                   yanarr.push(inputElems[i].value);
                   
                }
        
                if (inputElems[i].name == "ranbhoomi[]"){
                   ranarr.push(inputElems[i].value);
                   
                }
        
               }
               
               
            }
        if(ranarr.length <3){
        
        
        if (yanarr.length <4){
        
            if(count>6){
              alert("You have selected more than 6 events.Kindly deselect a few to proceed");
              document.getElementById("submit").disabled = true;
                
            }
            // if(arr.length == 0)
            // {
            //   alert("You haven't selected any events.Kindly select your events to proceed.");
            // }
            else{
              if(count==0){
                alert("You haven't selected any events.Please select events to proceed.");
              }
  
                else{
              console.log(arr);
              document.getElementById("submit").disabled = false;       
                  var st=""
              st = arr.join(" <br> ");
              document.getElementById("ev").innerHTML=st; 
              paym =(arr.length-1) * 100 +550 ;
              for(i=0;i<count ; i++){
                if(arr[i]==='INNOVACION'  && count>1){
                  paym-=100;
              }}
              cost ="<h3>Rs." + paym +"</h3>";
              document.getElementById("cost").innerHTML = cost ;
              //document.getElementById("sub").disabled = false;
              alert("You are good to go. Now click on Save button.");
            }
          }
        
            //alert(count);
         }
        else{
            alert("You have selected more than 3 events in Yantriki,kindly deselect some to proceed.")
        }
        
        }
        else{
            alert("You have selected more than 2 events in Ranbhoomi,kindly deselect some to proceed.")
        }
        
        }
        /*
        document.getElementByClassName('events').onclick=function(){
          var abc=document.getElementByClassName("events");
          for(i=0;i<abc.length;i++){
            abc[i].checked=(this.checked)?true:false;
            }
            for (var i = 0; i < abc.length; i++) {
              abc[i].addEventListener('change',function(){
                if (this.checked) {
                  console.log("checked");
                }
              })
            }
        }
        var abc=document.getElementByClassName("events");
        for(i=0;i<abc.length;i++){
          abc[i].checked=(this.checked)?true:false;
          if(this.checked){
            console.log("Checkbox is checked..");
          }
        
        }
        checkbox.addEventListener( 'change', function(e) {
            if(e.target.checked){
              console.log("Checkbox is checked..");
            }
        
        
        });/*/
                
        
                //document.getElementById('tshirt').innerHTML=values.us;
              

//EVENTS REGISTRAION

function event_register(){
  firebase.auth().onAuthStateChanged(function(user){
    //prompt("hello!")
    if(user){
      //console.log(user)
      var user_uid=user.uid;
      //console.log("sahi");
      //checkboxes();
      console.log(arr);
      //var events={
        //events:arr};
      //prompt("chup kro")
      firebase.firestore().collection("outhouse_database")
       .doc(user_uid)
       .update({events_reg:arr})
       .then(function(){
        dashrender();
        
      });
                  
     }
     else
     {
       alert("You are signed out . \n please sign in to Proceed");
     }
    })  
    event.preventDefault(); 
}
  
  
function signOut(){
	firebase.auth().signOut().then(function() {
    alert("Signed out Successfully");
    window.location.href="/riv.html";
    // Sign-out successful.
   // window.href.location="/";
		//window.location('/');
	}).catch(function(error) {
		// An error happened.
		alert("Problem in signing out");
		console.log(error);
	});
}