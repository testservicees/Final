let user_uid = "massage";


document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
    const email = document.getElementById('cemail').value;
    const password = document.getElementById('cpassword').value;

    if(document.getElementById('cemail').value == "lakshyajain.1944@gmail.com"){
        console.log('Good');
    
    }
    else if(document.getElementById('cemail').value == "lakshyajain.14022@gmail.com"){
        admin(email,password);
        return;
    }
    else{
        alert('Bad credentials')
        return;
    }

  

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
          window.location.href = 'admin.html';
          displayMessages('usernames');

      })
      .catch(error => {
          console.error(error.message);
          alert('Login failed. Check your email and password.');
      });
});

function admin(email,password) {

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'admin2.html';
            displayMessages('usernames');

        })
        .catch(error => {
            console.error(error.message);
            alert('Login failed. Check your email and password.');
        });
}



function displayMessages(userId) {
    const messagesRef = database.ref('messages/' + userId);

    messagesRef.on('value', snapshot => {
        const messages = snapshot.val();
        const messageList = document.getElementById('messageList');

        messageList.innerHTML = '';

        if (messages) {
            Object.values(messages).forEach(message => {
                const listItem = document.createElement('li');
                listItem.textContent = message.text;
                messageList.appendChild(listItem);
            });
        }
    });
}

function sendMessage(userId) {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message.trim() !== '') {
        // Store the message in Realtime Database
        const messagesRef = firebase.database().ref('messages/' + userId);
        messagesRef.push({
            text: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // Clear the message input
        messageInput.value = '';
    }
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'cordilogin.html';
    });
}
