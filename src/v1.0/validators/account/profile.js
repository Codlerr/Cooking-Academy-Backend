const { checkSchema } = require("express-validator");
const messages = require("../../../config/messages");
const { getUserByEmail, getUserByPhoneNumber } = require("../../services/internal/user");

const updateProfileValidator = async (req, res, next) => {
    const [emailExist, phoneExist] = await Promise.all([
        getUserByEmail(req?.body?.email),
        getUserByPhoneNumber(req?.body?.phoneNumber),
    ]);
    await checkSchema({
        name: { notEmpty: { errorMessage: messages?.nameIsRequired } },
        phoneNumber: {
            notEmpty: { errorMessage: messages?.phoneNumberIsRequired, bail: true },
            isMobilePhone: { errorMessage: messages?.phoneNumberIsInvalid, bail: true },
            custom: {
                options: () => {
                    if (!phoneExist) return true;
                    return String(req.user._id) === String(phoneExist._id) ? true : false;
                },
                errorMessage: messages?.phoneNumberIsUnique,
            },
        },
        email: {
            notEmpty: { errorMessage: messages?.emailIsRequired, bail: true },
            isEmail: { errorMessage: messages?.emailIsInvalid, bail: true },
            custom: {
                options: () => {
                    if (!emailExist) return true;
                    return String(req.user._id) === String(emailExist._id) ? true : false;
                },
                errorMessage: messages?.emailIsUnique,
            },
        },
        gender: { notEmpty: { errorMessage: messages?.genderIsRequired } },
        dob: { notEmpty: { errorMessage: messages?.dobIsRequired } },
        location: { notEmpty: { errorMessage: messages?.locationIsRequired } },
        sectorId: { notEmpty: { errorMessage: messages?.sectorIsRequired } },
    }).run(req);
    next();
};

module.exports = (errorFormatter) => ({
    updateProfileValidator: [updateProfileValidator, errorFormatter],
});
