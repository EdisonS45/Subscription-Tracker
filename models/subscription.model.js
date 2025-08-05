import mongoose from 'mongoose'
import User from './user.model'

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'INR', 'EUR', 'GPY', 'CAD', 'AUD', 'NAZ'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'cancelled'
    },
    startDate: {
        type: Date,
        validate: {
            validator: (value) => {
                return value <= new Date()
            },
            message: "start date must be in past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value >= this.startDate
            },
            message: 'Renewal date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        index: true
    }
})

subscriptionSchema.pre('save',function(next){
    const periodFrequency = {
        daily:1,
        weekly:7,
        monthly:30,
        yearly:365
    }
    if(!this.renewalDate){
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+periodFrequency[this.frequency])
    }
    if(this.renewalDate<new Date()){
        this.status='expired'
    }
    next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription