const mongoose = require('mongoose');
const connectionRequestsSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "rejected", "accepted"],
            message: `{VALUE} is incorrect status type`
        }
    }
}, {timestamps: true});


const connectionRequestsModel = new mongoose.model("ConnectionRequests", connectionRequestsSchema);


module.exports = connectionRequestsModel;