'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var router = express.Router();
//后台管理
router.post('/addArticle', controller.addArticle);
router.get('/getArticleList',controller.getArticleList);
router.put('/:id/updateArticle', controller.updateArticle);
router.delete('/', controller.destroy);
router.get('/:id/getArticle', controller.getArticle);
router.post('/uploadImage', auth.hasRole('admin'), upload.single('file'), controller.uploadImage);
router.post('/fetchImage', auth.hasRole('admin'), controller.fetchImage);

//前台获取
router.get('/getFrontArticleList',controller.getFrontArticleList);
router.get('/getFrontArticleCount',controller.getFrontArticleCount);
router.get('/:id/getFrontArticle',controller.getFrontArticle);
//获取首页图片
router.get('/getIndexImage',controller.getIndexImage);
//用户喜欢文章
router.put('/:id/toggleLike',auth.isAuthenticated(),controller.toggleLike);
//获取上一篇和下一篇
router.get('/:id/getPrenext',controller.getPrenext);
module.exports = router;