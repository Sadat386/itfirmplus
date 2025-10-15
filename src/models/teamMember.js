const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    expertise: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;