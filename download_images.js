const fs = require('fs');
const https = require('https');
const path = require('path');

// 创建images文件夹
const imageDir = path.join(__dirname, 'images');
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
}

// 塔罗牌数据
const tarotCards = [
    { name: '愚者', image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg' },
    { name: '魔术师', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg' },
    { name: '女祭司', image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg' },
    { name: '女皇', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg' },
    { name: '皇帝', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg' },
    { name: '教皇', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg' },
    { name: '恋人', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg' },
    { name: '战车', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg' },
    { name: '力量', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg' },
    { name: '隐士', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg' },
    { name: '命运之轮', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg' },
    { name: '正义', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg' },
    { name: '倒吊人', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg' },
    { name: '死神', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg' },
    { name: '节制', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg' },
    { name: '恶魔', image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg' },
    { name: '塔', image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg' },
    { name: '星星', image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg' },
    { name: '月亮', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg' },
    { name: '太阳', image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg' },
    { name: '审判', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg' },
    { name: '世界', image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg' }
];

// 下载图片的函数
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(path.join(imageDir, filename));
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`下载完成: ${filename}`);
                    resolve();
                });
            } else {
                reject(new Error(`下载失败: ${filename}, 状态码: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            reject(new Error(`下载出错: ${filename}, 错误: ${err.message}`));
        });
    });
}

// 下载所有图片
async function downloadAllImages() {
    console.log('开始下载塔罗牌图片...');
    for (const card of tarotCards) {
        try {
            const filename = `${card.name}.jpg`;
            await downloadImage(card.image, filename);
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log('所有图片下载完成！');
}

// 执行下载
downloadAllImages(); 