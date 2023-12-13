function submitForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";

        // Display toast message or handle the response as needed
        alert(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
}