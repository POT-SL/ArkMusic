function switch_page(page = 1) {
    if (window.parent) {
        window.parent.postMessage({
            type: 'page_switch',
            page: page
        }, '*');
    }
}