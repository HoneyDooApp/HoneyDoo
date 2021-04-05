const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongodb = require('mongodb')

mongoose.connect(process.env.MONGODB_URI,
   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// include mongoose models (it will include each file in the models directory)
const db = require('./models')
async function newRegister(userData) {
   //userData household name haz un call a household collection y busca el name para que te regrese el id y con ese id
   let household = await db.household.findOne({ name: userData.householdName })
   console.log('Household name:', userData.householdName)
   console.log('household entero:', household)

   if (!userData.name || !userData.email || !userData.password) {
      console.log('[registerUser] invalid userData! ', userData)
      return { status: false, message: 'Invalid user data' }
   }

   // refuse duplicate user emails
   let duplicateUser = await db.users.findOne({ email: userData.email })
   if (duplicateUser && duplicateUser._id) {
      return { status: false, message: 'Duplicate email, try another or login' }
   }
   const passwordHash = await bcrypt.hash(userData.password, 10)

   const saveData = {
      name: userData.name,
      email: userData.email || '',
      thumbnail: userData.thumbnail || '',
      password: passwordHash,
      householdid: household._id
   }
   const saveUser = await db.users.create(saveData)

   console.log('SaveUser', saveUser)

   if (!saveUser._id) {
      return { status: false, message: `Sorry failed creating entry for ${saveUser.name}: ` }
   }

   return {
      status: true,
      message: `Success! ${saveUser.name} was successfully registered`,
      userData: {
         id: saveUser._id,
         name: saveUser.name,
         email: saveUser.email,
         thumbnail: saveUser.thumbnail,
         householdid: saveUser.householdid
      }
   }
}
async function userRegister(userData) {
   if (!userData.name || !userData.email || !userData.password) {
      console.log('[registerUser] invalid userData! ', userData)
      return { status: false, message: 'Invalid user data' }
   }

   // refuse duplicate user emails
   let duplicateUser = await db.users.findOne({ email: userData.email })
   if (duplicateUser && duplicateUser._id) {
      return { status: false, message: 'Duplicate email, try another or login' }
   }
   let household = await db.household.findOne({ name: userData.householdName })
   console.log('Household name:', userData.householdName)
   console.log('household entero:', household)
   household = await db.household.create({ name: userData.householdName })
   console.log('Household:', household)

   // hash the password (salt=10)
   const passwordHash = await bcrypt.hash(userData.password, 10)
   // const passwordHash2 = await bcrypt.hash(userData.password2, 10)
   const saveData = {
      name: userData.name,
      email: userData.email || '',
      thumbnail: userData.thumbnail || '',
      password: passwordHash,
      householdid: household._id
   }
   // const saveData2={
   //    name:userData.name2,
   //    email:userData.email2,
   //    password:passwordHash2,
   //    householdid:saveData.householdid
   // }
   const saveUser = await db.users.create(saveData)
   // const saveUser2 = await db.users.create(saveData2)
   console.log('SAVE User', saveUser)
   // console.log(saveUser2)
   if (!saveUser._id) {
      return { status: false, message: `Sorry failed creating entry for ${saveUser.name}: ` }
   }

   return {
      status: true,
      message: `Success! ${saveUser.name} was successfully registered`,
      userData: {
         id: saveUser._id,
         name: saveUser.name,
         email: saveUser.email,
         thumbnail: saveUser.thumbnail,
         householdid: saveUser.householdid
      }
   }
}

async function userLogin(email, password) {
   const userData = await db.users.findOne({ email: email })
   console.log(userData)
   if (!userData || !userData.householdid) {
      return { status: false, message: 'Invalid login' }
   }

   // compare the passwords to see if valid login
   const isValidPassword = await bcrypt.compare(password, userData.password)
   // console.log( ` [loginUser] checking password (password: ${password} ) hash(${userData.password})`, isValidPassword )
   if (!isValidPassword) {
      return { status: false, message: 'Invalid password' }
   }

   return {
      status: true,
      message: `Logging in ${userData.name}...`,
      userData
   }
}

async function userSession(userId) {
   const userData = await db.users.findOne({ householdid: userId })
   if (!userData || !userData.householdid) {
      return { status: false, message: 'Invalid session' }
   }
   return {
      status: true,
      message: '',
      userData: {
         id: userData.householdid,
         name: userData.name,
         email: userData.email,
         thumbnail: userData.thumbnail
      }
   }
}

async function taskList(householdid, message = '') {
   // refuse duplicate user emails
   const tasks = await db.tasks.find({ householdid }, '-ownerId -__v')

   return {
      status: true,
      message,
      tasks
   }
}
async function choreList(householdid, message = '') {
   // refuse duplicate user emails
   const tasks = await db.chores.find({ householdid }, '-ownerId -__v')

   return {
      status: true,
      message,
      tasks
   }
}
//orm mongoose for chores create send the info
async function taskSaveAndList(newTask, householdid) {
   // refuse duplicate user emails
   const result = await db.tasks.create({ name: newTask, householdid })
   if (!result._id) {
      return {
         status: false,
         message: 'Sorry could not save task!'
      }
   }
   return taskList(householdid, 'Task saved')

}
async function choreCreate(newTask, householdid) {
   // refuse duplicate user emails
   const result = await db.chores.create({
      chore: newTask.chore,
      bee: newTask.bee,
      peachpoints: newTask.points,
      date: newTask.date,
      description: newTask.description,
      formInfo: newTask.formInfo,
      householdid
   })
   if (!result._id) {
      return {
         status: false,
         message: 'Sorry could not save task!'
      }
   }
   return choreList(householdid, 'Task saved')

}
// Added function to X button
async function tasksDel(id) {
   const result = await db.tasks.deleteOne({ _id: new mongodb.ObjectID(`${id}`) })
   if (!result._id) {
      return {
         status: false,
         message: 'Sorry could not remove task!'
      }
   }

}

module.exports = {
   userRegister,
   userLogin,
   userSession,
   taskList,
   taskSaveAndList,
   tasksDel,
   choreCreate,
   choreList
};