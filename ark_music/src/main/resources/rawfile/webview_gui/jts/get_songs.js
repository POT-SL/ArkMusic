document.addEventListener('DOMContentLoaded', () => {

    // 绑定按钮
    document.getElementById('favourite_list').addEventListener('click', function(event) {
        
        const targetDiv = event.target.tagName === 'DIV' ? event.target : event.target.closest('#favourite_list > div');
        
        if (targetDiv) {
            const pTag = targetDiv.querySelector('p');
            if (pTag) {
                // 切换歌曲
                arkts.change_example_songs(pTag.textContent);
            }
        }
    });

    document.getElementById('local_list').addEventListener('click', function(event) {
        
        const targetDiv = event.target.tagName === 'DIV' ? event.target : event.target.closest('#favourite_list > div');
        
        if (targetDiv) {
            const pTag = targetDiv.querySelector('p');
            if (pTag) {
                // 切换歌曲
                arkts.change_storage_songs(pTag.textContent);
            }
        }
    });

});