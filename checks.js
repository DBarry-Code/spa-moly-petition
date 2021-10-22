const passwordValidator = require("password-validator");

function passwordCheck(password) {
    var schema = new passwordValidator();

    schema
        .is()
        .min(8) // Minimum length 8
        .is()
        .max(15) // Maximum length 15
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .digits(1) // Must have at least 1 digits
        .has()
        .not()
        .spaces();

    return schema.validate(password);
}

module.exports = { passwordCheck };
