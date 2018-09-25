

//应用程序
//为了统一处理静态资源，新建一个public文件夹，里面存放的是静态资源
//把所有的路径当做url来处理

var http = require('http')
var fs = require('fs')
var url = require('url')
var template  = require('art-template')

var comments = [
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

///pinglun?name='''''&message=''''
//不好通过url判断来处理请求
//通过模块url来处理，用到的API是url.parse(查询地址，布尔值（查询参数转为对象）)

http.createServer(function (req, res) {

    var parseObj = url.parse(req.url, true)
    var pathname = parseObj.pathname

    if (pathname === '/'){
        fs.readFile('./views/index.html', function (err,data) {
            if (err){
                return res.end('404 Not Found')
            }
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
        })

    }else if (pathname === '/post'){
        fs.readFile('./views/post.html', function(err,data){
            if (err){
                return res.end('404 Not Found')
            }
            res.end(data)
        })

    }else if (pathname.indexOf('/public/') === 0) {
        fs.readFile("." + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found')
            }
            res.end(data)
        })
    }else if (pathname === '/pinglun'){

        var comment = parseObj.query
        var date = new Date()
        comment.dateTime = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
        comments.unshift(comment)
        console.log(comment.dateTime)

        //提交表单后跳转到首页，使用临时重定向302来做   statusCode
        //在响应头通过Location告诉客户端往哪里重定向   setHeader()
        //如果客户端收到服务器的响应状态码是302就会自动去响应头中找Location，然后对该地址发起新的请求

        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    }else {
        fs.readFile('./views/404.html', function (err,data) {
            if (err){
                console.log('404 Not Found')
            }
            res.end(data)
        })
    }

})
.listen(3000, function () {
    console.log('server is running')
})