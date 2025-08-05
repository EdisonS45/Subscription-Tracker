import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            const error = new Error('All input fields are required');
            error.statusCode = 400
            throw error;
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session })
        const token = jwt.sign({ user: newUsers[0]._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUsers[0],
                token
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
    }

}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const error = new Error('Email and password required during sign-in');
            error.statusCode = 400;
            throw (error)
        }
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('No user with this email found!');
            error.statusCode = 404;
            throw (error)
        }
        const isPasswordValid = await bcrypt.compare(password, user.password  );
        if (!isPasswordValid) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw (error)
        }
        const token = jwt.sign({user:user._id},JWT_SECRET,{
            expiresIn:JWT_EXPIRES_IN
        })
        res.status(200).json({
            success:true,
            message:'User authenticated successfully',
            data:{
                token,user
            }
        })

    } catch (error) {
        next(error)
    }

}

export const signOut = async (req, res) => {

}
