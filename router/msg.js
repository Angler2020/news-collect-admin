const express = require("express")
const router = express.Router()
const models = require('../db/models')
const { Op } = require('sequelize');
// 查询列表
router.post('/list', async (req, res, next) => {
  try {
    let { type, startTime, endTime } = req.body
    let base = {
      del: 0,
      startTime: {
        [Op.gte]: startTime
      },
      endTime: {
        [Op.lt]: endTime
      }
    }
    let baseNode = {
      del: 0,
      dealTime: {
        [Op.gte]: startTime
      },
      dealTime: {
        [Op.lt]: endTime
      },
    }
    if (type) {
      base = Object.assign(base, { type: type })
    }
    let msgList = await models.msg.findAll({
      where: base,
      order: [
        ['createdAt', 'desc']
      ]
    })
    let dataNote = await models.note.findAll({
      where: baseNode,
      order: [
        ['createdAt', 'desc']
      ]
    })
    res.json({
      data: {
        msg: msgList,
        dataNote: dataNote
      },
      message: '获取成功'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    let { title, gu, startTime, endTime, tip, other, type, createdAt, updatedAt, del } = req.body
    let data = await models.msg.create({
      title, gu, startTime, endTime, tip, other, type, createdAt, updatedAt, del
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
    let { id, startTime, endTime, title, gu, deadltime, tip, other, type } = req.body
    let data = await models.msg.update(
      { startTime, endTime, title, gu, deadltime, tip, other, type },
      {
        where: {
          id
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
    let data = await models.msg.update(
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