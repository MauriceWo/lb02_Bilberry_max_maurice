var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var tel = document.getElementById("tel");
var mess = document.getElementById("message");
var m = document.getElementById("m");
var f = document.getElementById("f");
var other = document.getElementById("other");
var gender;


//Indicators for user
function containsText(element) {
    if (element.value < 1) {
        element.style.borderColor = "darkred";
        element.style.borderStyle = "solid";
        element.style.borderWidth = "1px";
    } else {
        element.style.borderStyle = "none";
    };
}

fname.addEventListener("input", () => {
    containsText(fname);
});

lname.addEventListener("input", () => {
    containsText(lname);
});

tel.addEventListener("input", () => {
    containsText(tel);
});
mess.addEventListener("input", () => {
    containsText(mess);
});


m.addEventListener("change", () => {
    if (m.checked) {
        f.checked = false;
        other.checked = false;
        gender = 0;
    }
})
f.addEventListener("change", () => {
    if (f.checked) {
        m.checked = false;
        other.checked = false;
        gender = 1;
    }
})
other.addEventListener("change", () => {
    if (other.checked) {
        m.checked = false;
        f.checked = false;
        gender = 2;
    }
})

var dob = document.getElementById("dob");
var email = document.getElementById("email");

email.addEventListener("input", () => {
    containsText(email);
});

//Validations + API request

//Translate key to readable text
const keyToString = {
    tel: "telephone number",
    fname: "first name",
    lname: "last name",
    gender: "gender",
    dob: "date of birth",
    email: "E-Mail",
    message: "message"
};

//Define validation functions
function checkTel(tel) {
    if (tel.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) return true;
    return false;
};

//Check validity of first name
function checkFname(fname) {
    if (fname.length >= 1) return true;
    return false;
};

//Check validity of last name
function checkLname(lname) {
    if (lname.length >= 1) return true;
    return false;
};

//Check validity of gender
function checkGender(gender) {
    if (gender >= 0 && gender <= 2) return true;
    return false;
};

//Check validity of date of birth
function checkDob(dob) {
    if (dob.length < 1) return false;
    var parts = dob.split("-");
    //parts[0] = year, parts[1] = month, parts[2] = day
    dateNow = new Date();
    dobDate = new Date(parts[0], parts[1], parts[2], 0, 0, 0, 0);
    //Check if date is in future
    if (dobDate > dateNow) return false;
    if (dateNow.getFullYear() - dobDate.getFullYear() > 100 || dateNow.getFullYear() - dobDate.getFullYear() < 14) return false;
    return true;
};

//Check validity of E-Mail
function checkEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
    return false;
};

//Check validity of message
function checkMessage(message) {
    if (message.length >= 8) return true;
    return false;
};
async function validate() {
    let data = {
        tel: tel.value,
        fname: fname.value,
        lname: lname.value,
        gender: gender,
        dob: dob.value,
        email: email.value,
        message: mess.value
    };
    let validations = {
        tel: false,
        fname: false,
        lname: false,
        gender: false,
        dob: false,
        email: false,
        message: false
    }

    //Telephone number
    if ("tel" in data) {
        validations.tel = checkTel(data.tel);
    } else {
        console.log("Telephone number was not provided!");
    };

    //First name
    if ("fname" in data) {
        validations.fname = checkFname(data.fname);
    } else {
        console.log("First name was not provided!");
    };

    //Last name
    if ("lname" in data) {
        validations.lname = checkLname(data.lname);
    } else {
        console.log("Last name was not provided!");
    };

    //Gender
    if ("gender" in data) {
        validations.gender = checkGender(data.gender);
    } else {
        console.log("Gender was not provided!");
    };

    //Date of birth
    if ("dob" in data) {
        validations.dob = checkDob(data.dob);
    } else {
        console.log("Date of birth was not provided!");
    };

    //E-Mail
    if ("email" in data) {
        validations.email = checkEmail(data.email);
    } else {
        console.log("E-Mail name was not provided!");
    };

    //Message
    if ("message" in data) {
        validations.message = checkMessage(data.message);
    } else {
        console.log("Message was not provided!");
    };

    let message = "";
    let allCorrect = true;
    for (i in validations) {
        if (allCorrect) {
            if (!validations[i]) allCorrect = false;
            message = "You have errors in " + keyToString[i];
        } else {
            if (!validations[i]) message += ", " + keyToString[i];
        };
    };
    if (allCorrect) message = "Your data has been submitted";
    message += ".";

     alert(message);

    let response = await fetch('http://localhost:3000/validation', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
   
    if (allCorrect) window.location.href = "./index.html";
}