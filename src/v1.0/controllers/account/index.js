const { handleChangePassword } = require("../../services/internal/auth");
const { getUserById, updateUser } = require("../../services/internal/user");
const messages = require("../../../config/messages");

const changePassword = async (req) => {
    await handleChangePassword(req?.user?._id, req?.body);
    return { message: messages.passwordChangeSuccess };
};

const viewProfile = async (req) => {
    const profile = await getUserById(req?.user?._id, "-password -resetPasswordToken");
    return { data: profile };
};

const updateProfile = async (req) => {
    const data = {
        name: req?.body?.name,
        phoneNumber: req?.body?.phoneNumber,
        email: req?.body?.email,
        gender: req?.body?.gender,
        dob: req?.body?.dob,
        location: req?.body?.location,
        sectorId: req?.body?.sectorId,
    };
    await updateUser({ _id: req?.user?._id }, data);
    return { message: messages.profileUpdateSuccuess };
};

module.exports = { changePassword, viewProfile, updateProfile };
