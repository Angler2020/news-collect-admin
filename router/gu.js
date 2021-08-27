const express = require("express")
const router = express.Router()
const models = require('../db/models')
// 查询列表
router.get('/listAll', async (req, res, next) => {
  try {
    let data = await models.gu.findAll()
    res.json({
      data: data,
      message: '获取成功'
    })
  } catch (error) {
    next(error)
  }
})
router.post('/list', async (req, res, next) => {
  try {
    let { name, page, size } = req.body
    let base = name ? { name: name } : {}
    let total = await models.gu.findAll(
      {
        where: base
      }
    )
    let records = await models.gu.findAll(
      {
        where: base,
        limit: size,//返回个数
        offset: (page - 1) * size,//起始位置,跳过数量,用于分页
      }
    )
    res.json({
      data: { records: records, total: total.length },
      message: '获取成功'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    let { name, gu, tip, other, createdAt, updatedAt, del } = req.body
    // 检验是否重复
    let deboal = await models.gu.findOne(
      {
        where: {
          name: name
        }
      }
    )
    if (deboal) {
      res.json({
        message: {
          code: -1,
          msg: '请勿重复添加'
        }
      })
    } else {
      let data = await models.gu.create({
        name, gu, tip, other, createdAt, updatedAt, del
      })
      res.json({
        data: data,
        message: {
          code: 200,
          msg: '创建成功'
        }
      })
    }

  } catch (error) {
    next(error)
  }
})


router.post('/update', async (req, res, next) => {
  try {
    let { id, name, gu, tip, other, del } = req.body
    let data = await models.gu.update(
      { name, gu, tip, other, del },
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
    let data = await data.update(
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