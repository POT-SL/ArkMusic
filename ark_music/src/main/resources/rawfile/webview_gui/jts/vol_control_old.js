// 音量控制交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    const volControl = document.querySelector('.vol_control');

    // 创建新的双色胶囊滑块结构
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'volume-slider-container';

    const dualSlider = document.createElement('div');
    dualSlider.className = 'dual-slider';

    const sliderTrack = document.createElement('div');
    sliderTrack.className = 'slider-track';

    const sliderFill = document.createElement('div');
    sliderFill.className = 'slider-fill';

    // 构建滑块结构
    sliderTrack.appendChild(sliderFill);
    dualSlider.appendChild(sliderTrack);
    sliderContainer.appendChild(dualSlider);

    // 将滑块添加到音量控制容器中
    volControl.appendChild(sliderContainer);

    // 初始化音量值
    let volumeValue = 50;

    // 更新滑块填充
    function updateSliderFill(pos) {
        // 限制在0到100之间
        pos = Math.max(0, Math.min(100, pos));
        sliderFill.style.width = pos + '%';
        volumeValue = Math.round(pos);

        // 触发自定义事件，允许其他组件监听音量变化
        const volumeEvent = new CustomEvent('volumeChanged', {
            detail: { volume: volumeValue }
        });
        document.dispatchEvent(volumeEvent);

        // 调用ArkTS后端方法设置音量
        if (typeof ArkTSBridge !== 'undefined' && ArkTSBridge.setVolume) {
            ArkTSBridge.setVolume(volumeValue);
        }
    }

    // 点击音量控制按钮时切换显示状态
    volControl.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');

        // 如果激活了音量控制面板，则初始化滑块位置
        if (this.classList.contains('active')) {
            // 根据当前音量值设置滑块位置
            updateSliderFill(volumeValue);
        }
    });

    // 鼠标/触摸事件处理
    let isDragging = false;

    function updateSliderFromPosition(clientX) {
        const rect = dualSlider.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;

        // 限制在0到1之间
        pos = Math.max(0, Math.min(1, pos));

        // 转换为百分比
        updateSliderFill(pos * 100);
    }

    // 触摸事件支持（移动端）
    dualSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSliderFromPosition(e.touches[0].clientX);
        e.preventDefault();
    });

    dualSlider.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSliderFromPosition(e.touches[0].clientX);
            e.preventDefault(); // 防止页面滚动
        }
    });

    dualSlider.addEventListener('touchend', () => {
        isDragging = false;
    });

    // 添加按钮点击事件监听
    document.querySelector('.vol-up')?.addEventListener('click', () => {
        updateSliderFill(volumeValue + 5);
    });

    document.querySelector('.vol-down')?.addEventListener('click', () => {
        updateSliderFill(volumeValue - 5);
    });

    // 点击页面其他地方关闭音量控制面板
    document.addEventListener('click', function(e) {
        // 检查点击的目标是否在音量控制区域内
        if (!volControl.contains(e.target) && volControl.classList.contains('active')) {
            volControl.classList.remove('active');
        }
    });
});