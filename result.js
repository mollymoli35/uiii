// 获取URL参数中的结果数据
const urlParams = new URLSearchParams(window.location.search);
const readingData = urlParams.get('data');

// 显示结果
const resultContent = document.querySelector('.result-content');
if (readingData) {
    resultContent.innerHTML = readingData;
} else {
    resultContent.innerHTML = '<p>没有找到占卜结果，请重新占卜。</p>';
}

// 返回按钮事件
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// 分享按钮事件
document.getElementById('shareButton').addEventListener('click', () => {
    // 创建分享文本
    const shareText = `我的塔罗牌占卜结果：\n${readingData}`;
    
    // 如果浏览器支持分享API
    if (navigator.share) {
        navigator.share({
            title: '塔罗牌占卜结果',
            text: shareText
        }).catch(console.error);
    } else {
        // 如果不支持分享API，则复制到剪贴板
        navigator.clipboard.writeText(shareText)
            .then(() => alert('结果已复制到剪贴板！'))
            .catch(err => console.error('复制失败:', err));
    }
}); 