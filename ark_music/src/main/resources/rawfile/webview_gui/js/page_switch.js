// 页面切换函数
function page_switch(page = 1) {
    if (page === 1) {
        main_gui.style.transform = 'translateX(0)';
        taskbar_selector.className = 'taskbar_selector main';
        taskbar.className = 'taskbar';
        music_bar.className = 'music_bar';
        music_bar_frame.className = 'music_bar_frame';
        music_bar_playback_screen.className = 'music_bar_playback_screen sink'
    } else if (page === 2) {
        main_gui.style.transform = 'translateX(-100%)';
        taskbar_selector.className = 'taskbar_selector files';
        taskbar.className = 'taskbar';
        music_bar.className = 'music_bar show';
        music_bar_frame.className = 'music_bar_frame show';
        music_bar_playback_screen.className = 'music_bar_playback_screen high'
    } else {
        main_gui.style.transform = `translateX(-${(page - 1) * 100}%)`
        taskbar.className = 'taskbar hide';
        music_bar_frame.className = 'music_bar_frame show';
        music_bar.className = 'music_bar';
        music_bar_playback_screen.className = 'music_bar_playback_screen sink'
    }
}

// 页面切换外部接口
window.addEventListener('message', function(event) {
    if (event.data.type === 'page_switch') {
        page_switch(event.data.page);
    } else if (event.data.type === 'play_change') {
        play_change();
    }
});