require('child_process').exec(`cd ${__dirname}`)
const path = url => require('path').join(__dirname, url)
const fs = require('fs');
const http = require("http");
const aar_url = "http://ide.update.aardio.com/releases/aardio.7z";
const log_url = "http://ide.update.aardio.com/log/";
const server_url = "http://ide.update.aardio.com/check/";
const local_text = path('./local_ver.txt')

const get_res = (url, is_down = false) => {
  // 根据 url 获取 res, is_down: 是否下载
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      const { statusCode } = res;
      let contentLength = parseInt(res.headers['content-length']);
      if(statusCode !== 200) {
        reject(statusCode)
      }
      let data = '';
      if(is_down) {
        res.setEncoding('binary');
      } else {
        res.setEncoding('utf8');
      }
      res.on('data', function (chunk) {
        data += chunk;
        if(is_down) {
          let length = ((data.length) / contentLength) * 100;
          let percent = parseInt(((length).toFixed(0)));
          //任务栏进度条
          process.stdout.write(`已下载/总共 = ${data.length}/${contentLength} = ${percent}/100\r`);
        }
      });
      res.on('end', function () {
        if(!is_down) {
          data.toString('utf8')
        }
        resolve(data)
      });
    })
  })
}

const dateFtt = (fmt, date)  => {
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

const get_log = (server_ver) => {
  return new Promise(async (resolve, reject) => {
    // 从日志中获取当前版本的更新日期
    let re = new RegExp(`aardio v${server_ver} .+?(\\d+.*\\d+).+?\\s`)
    let server_log = await get_res(log_url)
    if(re.test(server_log)) {
      let date = server_log.match(re)[1].replace(/\//g, '_')
      let re_ver_log = new RegExp(`aardio v${server_ver}.*\\s-{75}([\\s\\S]+?)-{75}`)
      let ver_log = server_log.match(re_ver_log)[1].replace(/\saardio v.*/, '')
      resolve({
        date,
        ver_log,
      })
    } else {
      // 作者没有及时填写更新日志时可能匹配不到
      resolve({
        date: `${dateFtt("yyyy_MM_dd", new Date())}__`,
        ver_log: '',
      })
      // reject({})
    }
  })
}

const get_aau = () => {
  console.log('检查更新:', (new Date()).toLocaleString())
  new Promise(async () => {
    let server_ver = JSON.parse((await get_res(server_url))).version
    let local_ver = fs.readFileSync(local_text, 'utf8').split('\n')[0]

    if(local_ver !== server_ver) {
      console.log(`\n正在下载版本: ${server_ver}\n`)
      let log = await get_log(server_ver)
      let aar = await get_res(aar_url, true)
      let tag = `aardio_v${server_ver}__${log.date}`
      let aar_name = path(tag)
      fs.writeFile(`${aar_name}.7z`, aar, 'binary', (err) => {
        if(!err) {
          console.log('\n成功写入新版本')
          let ver_log = `${tag}\n${'-'.repeat(75)}\n${log.ver_log}`
          fs.writeFile(`${aar_name}.log.txt`, ver_log, (err) => {
            if(!err) {
              console.log('成功写入更新日志\n', ver_log)
            }
          });
          fs.writeFile(local_text, server_ver, (err) => {
            if(!err) {
              console.log('成功更新最新版本标志')
            }
          });
        }
      });

    } else {
      console.log('本地版本已是最新')
    }
  })
}

{
  get_aau()
  setInterval(() => {
    get_aau()
  }, 1000 * 60 * 2);
}
