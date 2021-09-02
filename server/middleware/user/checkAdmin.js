const checkAdmin = (req, res, next) => {
    //console.log(process.env.ADMIN_SECRATE);
    if(req.user.email===process.env.ADMIN_SECRATE){
        next();
        //this is a secrate pass 
    }else if(req.user.role=== 'admin'){
        next();
    } else{
        res.status(404).json({
            error: 'muri khao',
        })
    }
}

module.exports = checkAdmin;
