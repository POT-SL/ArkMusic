// 子子组件通信转接桥
window.addEventListener('message', function(event) {
    if (event.data.type === 'files_get_all_songs') {
        page_all_files.contentWindow.postMessage({
            type: 'files_get_all_songs'
        }, '*');
    }
});