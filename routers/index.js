const {Router} = require('express')

const {router:accRouter} = require('./AccRouters')
const {router:chatBoxRouter} = require('./ChatBoxRouters')
const {router:chatGroupRouter} = require('./ChatGroupRouters')
const {router:messageRouter} = require('./MessageRouters')
const router = Router({mergeParams:true})

router.use('/accounts',accRouter)
router.use('/chatBoxs',chatBoxRouter)
router.use('/chatGroups',chatGroupRouter)
router.use('/messages',messageRouter)

module.exports = router
