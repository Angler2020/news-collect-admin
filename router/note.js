const express = require("express")
const router = express.Router()
const models = require('../db/models')
const { Op } = require('sequelize');
// 查询列表
router.post('/list', async (req, res, next) => {
  try {
    let { gu } = req.body
    let data = await models.note.findAll({
      where: { gu: gu, del: 0 },
      order: [
        ["dealTime", "desc"]//根据id倒序
      ],

    })
    res.json({
      data: data,
      message: '获取成功'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    let { content, gu, other, dealTime, createdAt, updatedAt, del } = req.body
    let data = await models.note.create({
      content, gu, other, dealTime, createdAt, updatedAt, del
    })
    res.json({
      data: data,
      message: {
        code: 200,
        msg: '创建成功'
      }
    })
  } catch (error) {
    next(error)
  }
})


router.post('/update', async (req, res, next) => {
  try {
    let { id, content, gu, other, dealTime, createdAt, updatedAt, del } = req.body
    let data = await models.note.update(
      { content, gu, other, dealTime, createdAt, updatedAt, del },
      {
        where: {
          id: id
        }
      }
    )
    res.json({
      data: data,
      message: {
        code: 200,
        msg: '更新成功'
      }
    })
  } catch (error) {
    next(error)
  }
})
router.post('/del', async (req, res, next) => {
  try {
    let { id, del } = req.body
    let data = await models.note.update(
      { del },
      {
        where: {
          id
        }
      }
    )
    res.json({
      data
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router