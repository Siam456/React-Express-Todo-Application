const people = require('../models/usersModel');
const bcrypt = require('bcrypt')

const showUser = async (req, res) => {
    try{
        const data = await people.find({})
        .select({
            password: 0,
            updatedAt: 0,
            __v: 0,
        });
        res.json({
            users: data
        })

    } catch(err){
        throw err
    }
    
}

const addUsers = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashpass= await bcrypt.hash(req.body.password, salt);

    const user = new people({
        ...req.body,
       password: hashpass
    });
   
    try{
        const response = await user.save();
        if(response){
            res.json({
                user,
            })
        } else{
            res.status(500).json({
                msg: 'muri khao'
            })
        }


    } catch(err){
        throw err;
    }

}

const updateUser = async (req, res) => {
    try{
        const userAdmin = await people.findOne({email: req.user.email});
            if(userAdmin){
                const checkPass = await bcrypt.compare(req.body.password, userAdmin.password);
                if(checkPass){
                    const response = await people.updateOne({_id: req.params.id},
                        {
                            $set: {
                                username: req.body.username,
                                email: req.body.email,
                                phone: req.body.phone,
                                role: req.body.role,
                            }
                        });
                    res.json({
                        data: response
                    })
                } else{
                    res.status(501).json({
                        errors: 'Please enter correct Password',
                    })
                }
            } else{
                res.status(501).json({
                    errors: 'Admin not found',
                })
            }

        }catch(err) {
            res.status(500).json({
                err: err.message
            })
        }
        
        
}

const deleteUsers = async (req, res) => {
    try{
        const response = await people.deleteOne({_id: req.params.id});
        if(response.deletedCount === 0){
            res.json({
                msg: 'data not found',
                response
            })
        } else{
            res.json({
                response
            })
        }

    } catch(err){
        throw err;
    }
}

module.exports = {
    showUser,
    addUsers,
    updateUser,
    deleteUsers
};