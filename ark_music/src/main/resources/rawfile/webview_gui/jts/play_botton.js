// 获取元素
const btn_play = document.getElementById('btn_play');
const btn_next = document.getElementById('btn_next');
const btn_last = document.getElementById('btn_last');

// 播放按钮
btn_play.addEventListener('click', () => {
    arkts.song_play();
});
// 下一首按钮
btn_next.addEventListener('click', () => {
    console.log('下一首');
    arkts.next_song();
});
// 上一首按钮
btn_last.addEventListener('click', () => {
    console.log('上一首');
    arkts.last_song();
});

// （arkts接口）改变按钮
function set_button_status(status) {
    console.log('接收到状态：' + status);
    if (status) {
        btn_play.innerHTML = '<img src="img/play_stop.svg" style="width: 50%; height: 50%">';
    } else {
        btn_play.innerHTML = '<img src="img/play_play.svg" style="width: 50%; height: 50%; margin-left: 15%;">';
    }
}