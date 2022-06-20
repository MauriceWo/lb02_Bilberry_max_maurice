const express = require('express');
const cors = require('cors');

//Replace keys with readable text for users
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const keyToString = {
    tel: "Telephone number",
    fname: "First name",
    lname: "Last name",
    gender: "Gender",
    dob: "Date of birth",
    email: "E-Mail",
    message: "Message"
};


//Validation route
app.post('/validation', (req, res) => {
    let data = req.body;

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

    switch(data.gender) {
        case 0:
            data.gender = "Male";
            break;
        case 1:
            data.gender = "Female";
            break;
        case 2:
            data.gender = "Other";
            break;
    }
    //Spacer for readability of console logs
    console.log("--------------------------");
    for (let i in validations) {
        if (!validations[i]) console.error(keyToString[i] + " is invalid."); else console.log(keyToString[i] + ": " + data[i]);
    };

    //Return validity checks to client
    res.send(validations);
});

//Check validity of telephone number
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


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});