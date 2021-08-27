const express = require('express')
const app = express()
const msg = require("../router/msg")
const gu = require("../router/gu")
const note = require("../router/note")
const bodyParser = require('body-parser')
// 参数格式化中间件
app.use(express.json())
app.use(express.urlencoded())
// 转换post中参数格式化的中间件
app.use(bodyParser.json())   //在其他路由中间件前（尽可能靠前，以能够通过bodyPaser获取req.body）
app.use(bodyParser.urlencoded({ extended: false })) // 调试工具如果出现警告请加上extended: false

// 业务内容
app.use("/msg", msg)
app.use("/gu", gu)
app.use("/note", note)

// 错误处理
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

app.listen(3000, () => {
  console.log('服务启动成功！')
})
