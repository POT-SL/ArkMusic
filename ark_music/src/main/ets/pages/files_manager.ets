// 模块池 //
import { bundleManager } from '@kit.AbilityKit';
import { picker, fileUri } from  '@kit.CoreFileKit';
import { fileIo as fs, ListFileOptions } from '@kit.CoreFileKit';

// 变量池 //
const support_audio_Format: string[] = ['.m4a', '.aac', '.mp3', '.ogg', '.wav', '.flac', '.amr', '.ape']  // 支持的文件类型
const root_location: string = 'file://docs/storage/Users/currentUser/Download/com.nekofoxpot.arkmusic/'
export let all_music: string[][] = [[]]

// 函数块 //
// 下载器
export function getDownloadPathFromPicker(): Promise<string> {
  return new Promise<string>(resolve => {
    try {
      const documentSaveOptions = new picker.DocumentSaveOptions();
      documentSaveOptions.pickerMode = picker.DocumentPickerMode.DOWNLOAD
      const documentPicker = new picker.DocumentViewPicker();
      documentPicker.save(documentSaveOptions).then(async (documentSaveResult: Array<string>) => {
        if (documentSaveResult.length <= 0) {
          resolve('');
          return;
        }
        const uriString = documentSaveResult[0];
        if (!uriString) {
          resolve('');
          return;
        }
        const uri = new fileUri.FileUri(uriString);
        resolve(uri.path);
      }).catch((err: BusinessError) => {
        console.error(`ErrorCode: ${err.code},  Message: ${err.message}`);
        resolve('');
      });
    } catch (error) {
      resolve('');
    }
  })
}

// 检测是否有download目录
export function get_download(): boolean {
  console.log('正在扫描目录...')
  try {
    // 尝试读取目录
    fs.listFileSync(new fileUri.FileUri(root_location).path);
    // 目录可用，返回false，不允许创建目录
    console.log('目录存在。')
    return false;
  } catch (e) {
    console.log(`目录不存在：“${e}”`)
    console.log('请求创建...')
    return true;
  }
}

// 扫描download里的歌曲（全覆盖模式）
export function scan_all_files() {
  // 创建临时map列表
  scan_all_songs()
}

// 扫描歌曲（模式1：所有）
export function scan_all_songs() {

  console.log('正在扫描所有歌曲')
  // 创建临时列表
  let tmp_all_music: string[][] = [];
  // 扫描当前地址目录
  let filenames = fs.listFileSync(new fileUri.FileUri(root_location).path, { recursion: true });

  // 处理识别音频是否有效，如果有效则添加
  for (const i of filenames) {
    const tmp = new fileUri.FileUri(root_location).path + i;
    if (fs.statSync(tmp).isFile()) {
      // 获取后缀
      let file_suffix = tmp.substring(tmp.lastIndexOf('.')).toLowerCase();
      // 解析后缀
      if (support_audio_Format.includes(file_suffix)) {
        try {
          // 获取文件名
          let name = fs.openSync(tmp).name;
          // 获取成功，添加
          tmp_all_music.push([tmp, name])
        } catch {}
      }
    }
  }
  // 覆盖原表
  all_music = tmp_all_music;
  console.log('所有歌曲更新完成！')

}

// 扫面歌曲（模式2：分层次结构）
export function scan_dir_songs(location: string = '') {

  // 判断如果是根目录，则使用根目录地址
  let path: string = ''
  if (location == '') {
    path = new fileUri.FileUri(root_location).path
  } else {
    path = location
  }

}