
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDce-h_h1ZCRaLMr3-JejW4wVIdg3LQGYw",
    authDomain: "food-pool.firebaseapp.com",
    databaseURL: "https://food-pool.firebaseio.com",
    projectId: "food-pool",
    storageBucket: "food-pool.appspot.com",
    messagingSenderId: "732124800461"
  };
  firebase.initializeApp(config);
// Globals
  let email = "";
  let password = "";
  $('.signupAlert').hide();
  $(".sign-out").hide();

  const signOut = function () {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log(`user is logged out`);
      }, function(error) {
        // An error happened.
        console.log(`there was error on logout ${error}`);
      });

    $(".sign-out").hide();
    $(".sign-in").show();
  }
// DOM Specific Code
$("document").ready(function(){

    // ======  FIREBASE SIGNUP ==== //
    //click handler for the signup form
    $("#userSubmit").on("click", (event)=>{
        //Don't refresh the page
        event.preventDefault();
         
        //Get the values from our form
        email = $("#newUserEmail").val().trim();
        password = $("#newUserPassword").val().trim();
        //check and see if both values are there
        if(email.length > 2 && password.length > 2){
            //Hide the warning
            $('.signupAlert').hide();
            //clear the form
            $("#newUserEmail").val("");
            $("#newUserPassword").val("");
            console.log(`email is: ${email} and password is: ${password}`);
            //If both values are there log them in with firebase
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                 // Handle Errors here.
                if(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    console.log(`${error.code}`);
                    console.log(`${error.message}`);
                    $('.signupAlert').text(error.message);
                    $('.signupAlert').show();
                }else{
                    //Hide modal with successful account creation
                    //close the modal
                    $('#registerModal').modal('hide');
                }
                
              });
        }else{
            $('.signupAlert').show();
        }
    });

    // ==== FIREBASE LOGIN ==== //
    //click handler for the signup form
    $("#userSignIn").on("click", (event)=>{
        //Don't refresh the page
        event.preventDefault();
            
        //Get the values from our form
        email = $("#userEmail").val().trim();
        password = $("#userPassword").val().trim();
        //check and see if both values are there
        if(email.length > 2 && password.length > 6){
            //Hide the warning
            $('.signupAlert').hide();
            //clear the form
            $("#newUserEmail").val("");
            $("#newUserPassword").val("");
            //close the modal
            $('#signInModal').modal('hide');
            console.log(`sign in email is: ${email} and sign in password is: ${password}`);
            //If both values are there log them in with firebase
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(`Sign in error code: ${errorCode} Sign In error message ${errorMessage}`);
                });
        }else{
            $('.signupAlert').show();
        }
  
    



    //===== FIREBASE USER INFO ==== //
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(`User ${JSON.stringify(user)} is signed in!!`);
            $(".sign-in").hide();
            $(".sign-out").show();
          // User is signed in.
          var displayName = user.displayName;
          console.log(`Firebase Display Name ${user.email}`);
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
          $("#userName").text(user.email);
        } else {
          // User is signed out.
          // ...
        }
      });

    

});
   

    

    
































});