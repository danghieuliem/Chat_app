const {Router} = require('express')

const accRouter = require('./AccRouters')
const chatBoxRouter = require('./ChatBoxRouter')
const router = Router({mergeParams:true})

router.use('/accounts',accRouter)
router.use('/chatBoxs',chatBoxRouter)

module.exports = router
