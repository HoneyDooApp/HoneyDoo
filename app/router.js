const orm = require('./db/orm.mongoose')
const sessionManager = require('./session-manager')

// session checking middleware
async function authRequired(req, res, next) {
   // check session set, and it's valid
   const sessionData = sessionManager.verifyAndLoad(req.headers.session)
   if (!sessionData) {
      console.log(`[${req.method} ${req.url}] .. [authRequired] invalid session, refusing (403)`)
      res.status(403).send({ status: false, message: 'Requires valid session. Please login again.' })
      return
   }
   console.log(`[${req.method} ${req.url}] .. [authRequired] session GOOD`)
   // session was good, pass info on, let's continue endpoint processing...
   req.sessionData = sessionData
   next()
}

function router(app) {
   app.post('/api/users/register', async function (req, res) {
      console.log('[POST /api/users/register] request body:', req.body)
      console.log('[POST] household name', req.body.householdName)
      const { status, userData, message } = await orm.userRegister(req.body)
      console.log('User Data from register Server', userData)
      if (!status) {
         res.status(403).send({ status, message }); return
      }

      // generate a session-key
      const session = sessionManager.create(userData.id)
      console.log(`.. registration complete! session: ${session}`)

      res.send({ status, session, userData, message })
   })
   app.post('/api/users/register/new', async function (req, res) {
      console.log('[POST /api/users/register/new] request body:', req.body)
      const { status, userData, message } = await orm.newRegister(req.body)
      console.log('UserData from server New User', userData)
      if (!status) {
         res.status(403).send({ status, message }); return
      }
   })

   app.post('/api/users/login', async function (req, res) {
      console.log('[POST /api/users/login] req.body:', req.body)
      const { status, userData, message } = await orm.userLogin(req.body.email, req.body.password)
      if (!status) {
         res.status(403).send({ status, message }); return
      }

      // generate a session-key
      const session = sessionManager.create(userData)
      console.log('UserData from session', userData)
      // console.log( `.. login complete! session: ${session}` )
      res.send({ status, session, userData, message })
   })

   // all these endpoints require VALID session info
   app.get('/api/users/session', authRequired, async function (req, res) {
      const { status, userData, message } = await orm.userSession(req.sessionData.userData.householdid)
      if (!status) {
         res.status(403).send({ status, message }); return
      }

      console.log('.. session was ok, resending data')
      res.send({ status, session, userData, message })
   })

   app.get('/api/users/logout', authRequired, async function (req, res) {
      sessionManager.remove(req.header.session)
      console.log(` .. removed session ${req.header.session}`)
      res.send({ status: true, message: 'Logout complete' })
   })
   //api get requests
   app.get('/api/chores', authRequired, async function (req, res) {
      console.log('Session Data', req.sessionData)
      const { status, chores, message } = await orm.choreList(req.sessionData.userData.householdid)
      console.log(` .. got ${chores} chore for household id(${req.sessionData.userData.householdid})`)
      res.send({ status, chores, message })
   })

   app.get('/api/tasks', authRequired, async function (req, res) {
      console.log('Session Data', req.sessionData)
      const { status, tasks, message } = await orm.taskList(req.sessionData.userData.householdid)
      console.log(` .. got ${tasks.length} tasks for household id(${req.sessionData.userData.householdid})`)
      res.send({ status, tasks, message })
   })
   //api chore post
   app.post('/api/tasks', authRequired, async function (req, res) {
      const newTask = req.body.task
      console.log('New Task', req.body)
      const { status, tasks, message } = await orm.taskSaveAndList(newTask, req.sessionData.userData.householdid)
      console.log(` .. updated with '${newTask}' for householdID(${req.sessionData.userData.householdid})`)
      res.send({ status, tasks, message })
   })
   app.post('/api/chores', authRequired, async function (req, res) {
      const newTask = req.body.task
      console.log(newTask)
      const { status, tasks, message } = await orm.choreCreate(newTask, req.sessionData.userData.householdid)
      console.log(` .. updated with '${newTask}' for householdID(${req.sessionData.userData.householdid})`)
      res.send({ status, tasks, message })
   })
   ///
   app.delete('/api/chores/:id', authRequired, async function (req, res) {
      const id = req.params.id
      console.log('deletingid', id)
      const { status, message } = await orm.tasksDel(id)
      //console.log( ` .. got ${tasks.length} tasks for ownerId(${req.sessionData.userId})` )
      res.send({ status, message })
      //req.method="GET"
      //res.redirect('/tasks')
   })
}

module.exports = router