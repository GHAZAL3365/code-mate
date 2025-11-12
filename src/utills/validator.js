
const validator = require("validator")

const validationForSignup = (firstName, email, password, skills, age) => {
    
    if(!firstName) {
        throw new Error("Firstname i srequired")
    }

    if(!email) {
        throw new Error("Email is required")
    }

    if(email) {
      const isValid =   validator.isEmail(email);
       if(!isValid) {
          throw new Error("Please Enter a valid Email")
       }
    }
    if(password) {
      const isValid =   validator.isStrongPassword(password);
       if(!isValid) {
          throw new Error("Please Enter a valid Password")
       }
    }
    if(!password) {
        throw new Error("Password is required");
    }
    if (skills?.length > 10) {
      throw new Error("Skills can't be more than 10");
    }

    if(age < 0) {
        throw new Error("Age should greather than zero")
    }
}


const validateDataForEditProfile = (req) => {
  const allowedFieldsForEdit = ["firstName", "lastName", "age", "gender", "about", "skills"];

  const isAllowedToEdit = Object.keys(req.body).every((key) => allowedFieldsForEdit.includes(key) );

  return isAllowedToEdit;

}

module.exports = {
    validationForSignup,
    validateDataForEditProfile

}