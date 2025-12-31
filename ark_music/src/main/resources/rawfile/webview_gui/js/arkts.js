// arkts文档接口

// 更改play状态
function change_play_status(status) {
    change_page_play_status(status)
    // 如果为播放
    if (status === 'play') {
        play_change.innerHTML = '<img src="file/play_pause.svg">'
    } else if (status === 'pause') {
        // 修改图标
        play_change.innerHTML = '<img src="file/play_change.svg" style="margin-left: 5px;">'
    }

}
function change_page_play_status(status) {
    page_play.contentWindow.postMessage({
        type: 'play_page_change_play_status', arg1: status
    }, '*');
}

// 更新时间
function update_duration_time(time) {
    let min = Math.floor(time / 60000);
    let second = ((time % 60000) / 1000).toFixed(0);
    second = second.padStart(2, '0');
    let format_time = `${min}:${second}`
    music_bar_playback_control.max = time;
    page_play.contentWindow.postMessage({
        type: 'play_page_update_duration_time', arg1: time, arg2: format_time
    }, '*');
}
function update_current_time(time) {
    let min = Math.floor(time / 60000);
    let second = ((time % 60000) / 1000).toFixed(0);
    second = second.padStart(2, '0');
    let format_time = `${min}:${second}`
    music_bar_playback_control.value = time;
    music_bar_playback_screen.style.width = `${(music_bar_playback_control.value / music_bar_playback_control.max * 100)}%`;
    page_play.contentWindow.postMessage({
        type: 'play_page_update_current_time', arg1: time, arg2: format_time
    }, '*');
}

// 更新音量
function change_volume(vol) {
    page_play.contentWindow.postMessage({
        type: 'change_volume', arg1: vol
    }, '*');
}