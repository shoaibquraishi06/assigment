const  userModel = require('../models/user.models');

const jwt = require('jsonwebtoken');




async function signIN(req, res) {

  const { username, email, password } = req.body;
 

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
        {username},
        {email},
        {password}
    ]
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({ message: 'User already exists' });
  }



  const newUser = new userModel({
    username,
    email,
    password: password
  });


await newUser.save();

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      
     }, process.env.JWT_SECRET, {expiresIn:'1d'})

  res.cookie("token", token,{
    httpOnly:true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  })


  res.status(201).json({
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    message: 'user registered successfully'
  });


}



async function loginUser(req, res) {
  try {
    const {  username, email, password } = req.body; 
    const idValue = username || email;

    const user = await userModel.findOne({
      $or: [{ email: idValue }, { username: idValue }],
    }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Direct password comparison (no hashing)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in login user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = {
  signIN,
  loginUser,
 
}