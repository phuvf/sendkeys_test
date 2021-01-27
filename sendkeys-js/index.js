const {spawn, spawnSync} = require("child_process")

let config
switch (process.platform) {
  case 'darwin':
    config = require('./platform/darwin')
    break
  case 'win32':
    config = require('./platform/win32')
    break
  case 'linux':
    config = require('./platform/linux')
    break
  default:
    throw new Error('Unknown platform: ' + process.platform)
}

async function cmd(args) {
  const app = args[0]
  args = args.slice(1)
  //const {stdout, stderr, status} = await spawnSync(app, args,{stdio: 'inherit'});
  const rtn = await spawn(app, args,{stdio: 'inherit',encoding : 'utf8'});
  console.log('rtn: ' , rtn);
  console.log('stdout here: \n' + rtn.stdout);
  if (rtn.status !== 0) throw rtn.stderr
  return rtn.stdout
}

// function cmd2(args2) {
//   for (let i in args2) {
//     let args = args2[i]
//     const app = args[0]
//     args = args.slice(1)
//     // console.log(app, args)
//     const {stderr, status} = spawnSync(app, args);
//     if (status !== 0) {
//       if (process.platform === 'linux') {
//         console.warn('** Linux needs `xdotool`')
//       }
//       throw stderr
//     }
//   }
// }

function send(keys, metaKeys) {
  cmd(config.send(keys, metaKeys))
}
function activate(title) {
  cmd(config.activate(title))
}
function run(path) {
  return cmd(config.run(path))
}
function sleep(v) {
  cmd(config.sleep(v))
}
function sendKeys(keys) {
  cmd2(config.sendKeys(keys))
}

module.exports = {
  'sendKeys': sendKeys,
  'send': send,
  'activate': activate,
  'run': run,
  'sleep': sleep
}


