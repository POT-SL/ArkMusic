// 上一首
function post_last_song() {
    arkts.last_song();
}
function post_next_song() {
    arkts.next_song();
}
function post_play_change() {
    arkts.play_change()
}

// 按钮控件信息发送外部接口
window.addEventListener('message', function(event) {
    if (event.data.type === 'post_last_song') {
        post_last_song()
    } else if (event.data.type === 'post_next_song') {
        post_next_song()
    } else if (event.data.type === 'post_play_change') {
        post_play_change();
    }
});