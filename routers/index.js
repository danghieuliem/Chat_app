const {Router} = require('express')

const accRouter = require('./AccRouters')
const router = Router({mergeParams:true})

router.use('/accounts',accRouter)

module.exports = router
