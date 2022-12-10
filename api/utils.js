function reqUser(req,res,next){
    if(!req.user){
        next({
            name: "MissingLoginError",
            message: "You must be logged in to complete this action"
        })
    }
    next()
}

function reqAdmin(req,res,next){
    if(!req.user.isAdmin){
        next({
            name: "MissingAdmingError",
            message: "You must be an admin to complete this action"
        })
    }
    next()
}

module.exports = {
    reqUser,
    reqAdmin
}