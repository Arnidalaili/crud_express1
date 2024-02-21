var exports = module.exports = {};
const models = require('../models');
let Op = require("sequelize").Op;

exports.index = function (req, res) {
    console.log('test')
    let page = req.query.page || 1;
    let offset = 0;
    if (page > 1) {
        offset = ((page - 1) * 10) + 1;
    }
    models.users.findAndCountAll({
        limit: 10,
        offset: offset,
        order: [['id', 'DESC']],
    }).then((users) => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        const totalPage = Math.ceil(users.count / 10);
        const pagination = { totalPage: totalPage, currentPage: page };
        res.render('user/index', {
            user: users.rows,
            alert: alert,
            pagination: pagination
        });
    });
}

exports.create = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    let data = {
        name: req.flash('nama'),
        gender: req.flash('gender'),
        no_telp: req.flash('no_telp'),
        alamat: req.flash('alamat')
    };  
    res.render('user/tambah', {
        alert: alert,
        data: data
    });
}
exports.createUser = function (req, res) {
    let userFound;
    models.users.create(req.body).then((user) => {
        userFound = user;
        req.flash('alertMessage', `Sukses Menambahkan Data User dengan nama : ${userFound.nama}`);
        req.flash('alertStatus', 'success');
        res.redirect('/user');
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        req.flash('name', req.body.nama);
        req.flash('name', req.body.username);
        req.flash('name', req.body.password);
        res.redirect('/user/tambah');
    });
}
exports.edit = function (req, res) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    const id = req.params.id;
    models.users.findOne({ where: { id: { [Op.eq]: id } } }).then((user) => {
        res.render('user/edit', {
            alert: alert,
            user: user
        });
    });
}
exports.editUser = function (req, res) {
    const id = req.params.id;
    let userFound;
    models.users.findOne({ where: { id: { [Op.eq]: id } } }).then((user) => {
        userFound = user;
        return user.update(req.body).then(() => {
            req.flash('alertMessage', `Sukses Mengubah Data User dengan nama : ${userFound.nama}`);
            req.flash('alertStatus', 'success');
            res.redirect('/user');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/user');
    });
}
exports.hapusUser = function (req, res) {
    let id = req.params.id;
    let userFound;
    models.users.findOne({ where: { id: { [Op.eq]: id } } }).then((user) => {
        userFound = user;
        return user.destroy().then(() => {
            req.flash('alertMessage', `Sukses Menghapus Data User dengan nama : ${userFound.nama}`);
            req.flash('alertStatus', 'success');
            res.redirect('/user');
        })
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/user');
    });
}

exports.notFound = function (req, res) {
    res.render('main/notfound');
}