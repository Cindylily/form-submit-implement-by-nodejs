

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//配置使用模板引擎art-template
//第一个参数art表示是以.art结尾的文件，使用art-template模板引擎，也可以不使用art结尾，直接使用html结尾
//express为response相应对象提供了一个方法：render
//render默认是不可用的，但是配置了模板引擎就可以使用

//res.render('html模板名'，{模板数据})，第一个参数不需要写路径，会默认去项目中的views目录中去查找
//如果想要修改views目录，如下
//app.set('views', render函数的默认路径)
app.engine('html', require('express-art-template'))


const comments = [
    {
        name: '小吴',
        message: '天空好蓝',
        dateTime: '2018-9-10'
    },
    {
        name: '小吴2',
        message: '天空好蓝',
        dateTime: '2018-9-10'
    },
    {
        name: '小吴3',
        message: '天空好蓝',
        dateTime: '2018-9-10'
    },
    {
        name: '小吴4',
        message: '天空好蓝',
        dateTime: '2018-9-10'
    },
    {
        name: '小吴5',
        message: '天空好蓝',
        dateTime: '2018-9-10'
    }
]

//开放public目录资源
app.use('/public/', express.static('./public/'))

app.get('/', (req, res) =>{
    res.render('index.html', {
        comments: comments
    })
})

app.get('/post', (req, res) => res.render('post.html'))

//提交评论时，使用post来处理比较好
//req.query只能拿get请求参数
//使用了中间件body-parser,req.body就可以获取表单post数据
app.post('/post', (req, res) =>{
    const comment = req.body
    comment.dataTime = (new Date).getFullYear()+"-"+(new Date()).getMonth()+"-"+(new Date()).getDay()
    comments.unshift(comment)

    //res.send()
    //res.redirect()会自动结束响应
    res.redirect('/')
})

// app.get('/pinglun', (req, res) =>{
//     const comment = req.query
//     comment.dataTime = (new Date).getFullYear()+"-"+(new Date()).getMonth()+"-"+(new Date()).getDay()
//     comments.unshift(comment)
//
//     //以下代码等价于res.statusCode = 302   res.setHeader('Location','/')
//     res.redirect('/')
//
// })


app.listen(3000, ()=> console.log('server is running...'))