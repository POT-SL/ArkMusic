window.addEventListener('message', function(event) {
    if (event.data.type === 'play_page_update_duration_time') {
        play_page_playback_control.max = event.data.arg1;
        play_page_duration_time.innerText = event.data.arg2;
    } else if (event.data.type === 'play_page_update_current_time') {
        play_page_playback_control.value = event.data.arg1;
        play_page_playback_screen.style.width = `${(play_page_playback_control.value / play_page_playback_control.max * 100)}%`
        play_page_current_time.innerText = event.data.arg2;
    }
}, false);