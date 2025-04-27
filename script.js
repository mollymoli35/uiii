// DeepSeek API配置
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = 'sk-e9d391ea17464622a1ca78041b4c55ce';

// 塔罗牌数据
const tarotCards = [
    { name: '愚者', image: 'tarot_images/00_fool.jpg', upright: '新的开始、冒险、自由、天真、自发性', reversed: '鲁莽、冲动、不切实际、缺乏方向' },
    { name: '魔术师', image: 'tarot_images/01_magician.jpg', upright: '创造力、技能、专注、意志力', reversed: '操纵、欺骗、未实现的潜力' },
    { name: '女祭司', image: 'tarot_images/02_high_priestess.jpg', upright: '直觉、神秘、潜意识、内在智慧', reversed: '缺乏直觉、忽视直觉、隐藏的知识' },
    { name: '女皇', image: 'tarot_images/03_empress.jpg', upright: '生育、自然、富足、感性', reversed: '过度放纵、依赖、缺乏纪律' },
    { name: '皇帝', image: 'tarot_images/04_emperor.jpg', upright: '权威、结构、控制、稳定', reversed: '专制、缺乏控制、不灵活' },
    { name: '教皇', image: 'tarot_images/05_hierophant.jpg', upright: '传统、信仰、精神指导、道德', reversed: '教条主义、传统束缚、缺乏信仰' },
    { name: '恋人', image: 'tarot_images/06_lovers.jpg', upright: '爱情、和谐、关系、选择', reversed: '不和谐、不平衡、错误的选择' },
    { name: '战车', image: 'tarot_images/07_chariot.jpg', upright: '胜利、意志力、决心、成功', reversed: '缺乏方向、冲突、失败' },
    { name: '力量', image: 'tarot_images/08_strength.jpg', upright: '勇气、耐心、控制、内在力量', reversed: '软弱、缺乏信心、自我怀疑' },
    { name: '隐士', image: 'tarot_images/09_hermit.jpg', upright: '内省、孤独、寻求真理、智慧', reversed: '孤立、孤独、拒绝帮助' },
    { name: '命运之轮', image: 'tarot_images/10_wheel_of_fortune.jpg', upright: '变化、命运、机会、转折点', reversed: '坏运气、缺乏控制、外部变化' },
    { name: '正义', image: 'tarot_images/11_justice.jpg', upright: '公平、真相、因果、平衡', reversed: '不公正、缺乏责任感、偏见' },
    { name: '倒吊人', image: 'tarot_images/12_hanged_man.jpg', upright: '牺牲、暂停、新视角、放手', reversed: '拖延、抗拒改变、缺乏牺牲' },
    { name: '死神', image: 'tarot_images/13_death.jpg', upright: '结束、转变、放手、重生', reversed: '抗拒改变、停滞、恐惧' },
    { name: '节制', image: 'tarot_images/14_temperance.jpg', upright: '平衡、和谐、耐心、节制', reversed: '不平衡、过度、缺乏节制' },
    { name: '恶魔', image: 'tarot_images/15_devil.jpg', upright: '束缚、物质主义、权力、成瘾', reversed: '解放、打破束缚、克服成瘾' },
    { name: '塔', image: 'tarot_images/16_tower.jpg', upright: '突然变化、启示、觉醒、破坏', reversed: '避免灾难、害怕改变、延迟不可避免' },
    { name: '星星', image: 'tarot_images/17_star.jpg', upright: '希望、灵感、平静、信心', reversed: '绝望、缺乏信心、失望' },
    { name: '月亮', image: 'tarot_images/18_moon.jpg', upright: '幻觉、恐惧、焦虑、潜意识', reversed: '释放恐惧、减少焦虑、真相' },
    { name: '太阳', image: 'tarot_images/19_sun.jpg', upright: '快乐、成功、活力、自信', reversed: '暂时的挫折、缺乏信心、成功延迟' },
    { name: '审判', image: 'tarot_images/20_judgement.jpg', upright: '判断、重生、内在召唤、赦免', reversed: '自我怀疑、缺乏判断、拒绝召唤' },
    { name: '世界', image: 'tarot_images/21_world.jpg', upright: '完成、成就、旅行、成功', reversed: '缺乏完成、延迟、不完整' }
];

// DOM 元素
const questionInput = document.getElementById('question');
const cardSlots = document.querySelectorAll('.card-slot');
const resultContent = document.querySelector('.reading-result');
const cardsContainer = document.querySelector('.cards-container');

// 开始界面相关
const startScreen = document.querySelector('.start-screen');
const startButton = document.getElementById('startButton');
const container = document.querySelector('.container');

// Face++ API 配置
const API_KEY = 'JyE8Vkx-5SOygr4wq-_LWcvvSxWUZr-Q';
const API_SECRET = 'ulbuY0_jGXtKP1TvUHXqczUmmvYM7GLe';
const API_URL = 'http://localhost:3000/api/gesture';

// 使用代理服务器
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

// 视频和画布元素
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Live2D 配置
const live2dConfig = {
    model: {
        jsonPath: "魔女/魔女.model3.json",
        scale: 1.2,
        position: [0, 0],
        stageStyle: {
            width: 300,
            height: 400
        }
    },
    display: {
        superSample: 2,
        width: 300,
        height: 400,
        position: 'right',
        hOffset: 0,
        vOffset: 0
    },
    mobile: {
        show: true,
        scale: 1.0,
        motion: true
    },
    react: {
        opacityDefault: 1,
        opacityOnHover: 0.8
    },
    dialog: {
        enable: true,
        script: {
            'tap body': '你好呀~',
            'tap face': '不要戳我脸啦~'
        }
    }
};

// 创建牌堆
function createDeck() {
    const deck = document.createElement('div');
    deck.className = 'deck';
    deck.style.display = 'flex';
    deck.style.flexWrap = 'wrap';
    deck.style.justifyContent = 'center';
    deck.style.gap = '1rem';
    deck.style.margin = '2rem 0';
    
    // 随机打乱牌的顺序
    const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5);
    
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'deck-card';
        cardElement.style.width = '100px';
        cardElement.style.height = '175px';
        cardElement.style.cursor = 'pointer';
        cardElement.style.position = 'relative';
        cardElement.style.transformStyle = 'preserve-3d';
        cardElement.style.transition = 'transform 0.6s';
        // 初始状态为背面朝上
        cardElement.style.transform = 'rotateY(0deg)';
        // 存储原始卡牌数据
        cardElement.dataset.cardName = card.name;
        cardElement.dataset.cardIndex = index;
        
        // 卡牌背面
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.position = 'absolute';
        cardBack.style.width = '100%';
        cardBack.style.height = '100%';
        cardBack.style.backfaceVisibility = 'hidden';
        cardBack.style.borderRadius = '10px';
        cardBack.style.background = 'linear-gradient(45deg, var(--primary-purple), var(--glow-purple))';
        cardBack.style.backgroundSize = '200% 200%';
        cardBack.style.animation = 'gradientBG 3s ease infinite';
        
        // 卡牌正面
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.style.position = 'absolute';
        cardFront.style.width = '100%';
        cardFront.style.height = '100%';
        cardFront.style.backfaceVisibility = 'hidden';
        cardFront.style.borderRadius = '10px';
        cardFront.style.transform = 'rotateY(180deg)';
        cardFront.style.background = 'rgba(157, 78, 221, 0.2)';
        cardFront.style.border = '2px solid var(--primary-purple)';
        cardFront.style.padding = '0.5rem';
        cardFront.style.display = 'flex';
        cardFront.style.flexDirection = 'column';
        cardFront.style.alignItems = 'center';
        cardFront.style.justifyContent = 'space-between';
        
        const cardImage = document.createElement('img');
        cardImage.src = card.image;
        cardImage.style.width = '100%';
        cardImage.style.height = '100%';
        cardImage.style.objectFit = 'cover';
        cardImage.style.borderRadius = '5px';
        
        const cardName = document.createElement('div');
        cardName.textContent = card.name;
        cardName.style.color = 'var(--primary-purple)';
        cardName.style.fontSize = '0.8rem';
        cardName.style.textAlign = 'center';
        cardName.style.width = '100%';
        cardName.style.marginTop = 'auto';
        
        cardFront.appendChild(cardImage);
        cardFront.appendChild(cardName);
        cardElement.appendChild(cardBack);
        cardElement.appendChild(cardFront);
        deck.appendChild(cardElement);
    });
    
    return deck;
}

// 显示牌堆
function showDeck() {
    const deck = createDeck();
    cardsContainer.innerHTML = '';
    cardsContainer.appendChild(deck);
    
    // 添加点击事件
    const deckCards = deck.querySelectorAll('.deck-card');
    deckCards.forEach(card => {
        card.addEventListener('click', () => selectCard(card));
    });
}

// 选择卡牌
let selectedCards = [];
function selectCard(cardElement) {
    if (selectedCards.length >= 3) return;
    
    const isReversed = Math.random() < 0.5;
    const cardName = cardElement.dataset.cardName;
    const card = {
        ...tarotCards.find(c => c.name === cardName),
        isReversed: isReversed
    };
    
    // 添加选中效果
    cardElement.classList.add('selected');
    
    // 只旋转卡牌，不旋转文字
    cardElement.style.transform = `rotateY(180deg) scale(1.1)`;
    
    const cardSlot = cardSlots[selectedCards.length];
    flipCard(cardSlot, card);
    selectedCards.push(card);
    
    // 移除选中卡牌的点击选择文字
    const cardNameElement = cardElement.querySelector('.deck-card-front div:last-child');
    if (cardNameElement) {
        cardNameElement.style.display = 'none';
    }
    
    // 添加选中动画效果
    cardElement.style.animation = 'selectedPulse 1s ease-in-out';
    
    // 如果已经选择了三张牌，自动跳转到结果界面
    if (selectedCards.length === 3) {
        // 延迟1秒后跳转，让用户看到最后一张牌的翻转效果
        setTimeout(() => {
            // 隐藏提问框和抽牌按钮
            document.querySelector('.question-section').style.display = 'none';
            
            // 隐藏摄像头和画布
            video.style.display = 'none';
            canvas.style.display = 'none';
            
            // 停止摄像头流
            if (video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            
            // 创建新的卡牌容器
            const selectedCardsContainer = document.createElement('div');
            selectedCardsContainer.className = 'selected-cards-container';
            
            // 将选中的卡牌移动到新容器
            selectedCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'selected-card';
                
                const cardImage = document.createElement('img');
                cardImage.src = card.image;
                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';
                cardImage.style.borderRadius = '10px';
                cardImage.style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
                
                cardElement.appendChild(cardImage);
                selectedCardsContainer.appendChild(cardElement);
            });
            
            // 清空原有内容并添加新内容
            cardsContainer.innerHTML = '';
            cardsContainer.appendChild(selectedCardsContainer);
            
            // 显示结果
            document.getElementById('questionText').textContent = questionInput.value;
            document.getElementById('pastCard').textContent = `${selectedCards[0].name}${selectedCards[0].isReversed ? '(逆位)' : '(正位)'}：${selectedCards[0].isReversed ? selectedCards[0].reversed : selectedCards[0].upright}`;
            document.getElementById('presentCard').textContent = `${selectedCards[1].name}${selectedCards[1].isReversed ? '(逆位)' : '(正位)'}：${selectedCards[1].isReversed ? selectedCards[1].reversed : selectedCards[1].upright}`;
            document.getElementById('futureCard').textContent = `${selectedCards[2].name}${selectedCards[2].isReversed ? '(逆位)' : '(正位)'}：${selectedCards[2].isReversed ? selectedCards[2].reversed : selectedCards[2].upright}`;
            document.getElementById('overallMeaning').textContent = generateOverallMeaning(selectedCards);
            
            // 显示结果页面
            const resultElement = document.querySelector('.reading-result');
            resultElement.style.display = 'block';
            resultElement.classList.add('visible');
        }, 1000);
    }
}

// 重置占卜
function resetReading() {
    // 清空选中的卡牌
    selectedCards = [];
    
    // 重置卡牌槽
    cardSlots.forEach(slot => {
        slot.classList.remove('flipped');
        slot.innerHTML = '<div class="card-back"></div><div class="card-front"></div>';
    });
    
    // 显示问题输入框
    document.querySelector('.question-section').style.display = 'block';
    
    // 清空问题输入
    questionInput.value = '';
    
    // 隐藏结果页面
    const resultElement = document.querySelector('.reading-result');
    resultElement.style.display = 'none';
    resultElement.classList.remove('visible');
}

// 添加分享按钮事件监听
document.getElementById('shareButton').addEventListener('click', () => {
    // 获取问题和结果
    const question = document.getElementById('questionText').textContent;
    const past = document.getElementById('pastCard').textContent;
    const present = document.getElementById('presentCard').textContent;
    const future = document.getElementById('futureCard').textContent;
    const meaning = document.getElementById('overallMeaning').textContent;
    
    // 构建分享文本
    const shareText = `
我的塔罗牌占卜结果：

问题：${question}

过去：${past}
现在：${present}
未来：${future}

塔罗启示：${meaning}

来自神秘塔罗牌占卜
    `.trim();
    
    // 复制到剪贴板
    navigator.clipboard.writeText(shareText).then(() => {
        alert('占卜结果已复制到剪贴板，可以分享给朋友了！');
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制。');
    });
});

// 主要流程
async function startReading() {
    // 显示视频容器
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.style.display = 'block';
    }
    
    // 启动摄像头
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });
        video.srcObject = stream;
        await video.play();
        
        // 设置画布尺寸
        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };
        
        // 显示占卜界面
        document.getElementById('fortune-teller').style.display = 'none';
        document.getElementById('reading-interface').style.display = 'block';
        document.getElementById('question-input').style.display = 'block';
        
        // 初始化牌组
        createDeck();
        showDeck();
    } catch (err) {
        console.error('摄像头启动失败:', err);
        alert('无法启动摄像头，请确保已授予摄像头权限。');
    }
}

// 开始按钮点击事件
startButton.addEventListener('click', () => {
    // 延迟后隐藏开始界面并显示主界面
    setTimeout(() => {
        startScreen.style.opacity = '0';
        startScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            startScreen.style.display = 'none';
            container.classList.add('visible');
            // 显示牌堆
            showDeck();
        }, 500);
    }, 1000);
});

// 初始化时不显示牌堆
// showDeck();

// 翻转动画
function flipCard(cardElement, card) {
    cardElement.classList.add('flipped');
    const frontElement = cardElement.querySelector('.card-front');
    
    frontElement.innerHTML = `
        <div style="display: flex; flex-direction: column; height: 100%; width: 100%;">
            <img src="${card.image}" alt="${card.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px; transform: ${card.isReversed ? 'rotate(180deg)' : 'none'};">
        </div>
    `;
}

// 生成占卜结果解释
function generateReading(cards, question) {
    return `
        <div class="reading-container">
            <div class="reading-introduction">
                <h3>塔罗指引</h3>
                <p>亲爱的朋友，关于你的问题："${question}"，塔罗牌为你带来了指引：</p>
            </div>
            
            <div class="card-readings">
                ${generateCardReadings(cards)}
            </div>
            
            <div class="personalized-guidance">
                <h3>塔罗的启示</h3>
                <div class="guidance-content">
                    <p class="gentle-advice">${generateOverallMeaning(cards)}</p>
                </div>
            </div>
            
            <div class="feedback-section">
                <div class="feedback-content">
                    <p>塔罗牌为你带来了指引，愿这些启示能帮助你找到内心的答案。</p>
                    <p>记住，塔罗牌是照亮前路的明灯，但最终的选择权在你手中。</p>
                </div>
            </div>

            <div class="chat-section">
                <h3>与占卜师对话</h3>
                <div class="chat-container">
                    <div class="chat-messages" id="chatMessages">
                        <div class="chat-message fortune-teller">
                            <p>如果你对这些牌的含义有任何疑问，都可以随时问我哦~</p>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chatInput" placeholder="输入你的问题...">
                        <button id="sendMessage" class="send-button">发送</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 生成整体解读
function generateOverallMeaning(cards) {
    if (!cards || cards.length !== 3) {
        return '需要三张塔罗牌才能生成解读';
    }

    const meanings = cards.map(card => {
        const meaning = card.isReversed ? card.reversed : card.upright;
        return `${card.name}${card.isReversed ? '(逆位)' : '(正位)'}：${meaning}`;
    });

    // 根据牌的组合生成情感启示
    let emotionalGuidance = '';
    
    // 检查是否包含特定的牌组合
    const hasFool = cards.some(card => card.name === '愚者');
    const hasDeath = cards.some(card => card.name === '死神');
    const hasTower = cards.some(card => card.name === '塔');
    const hasStar = cards.some(card => card.name === '星星');
    const hasMoon = cards.some(card => card.name === '月亮');
    const hasSun = cards.some(card => card.name === '太阳');
    const hasWorld = cards.some(card => card.name === '世界');
    const hasLovers = cards.some(card => card.name === '恋人');
    const hasStrength = cards.some(card => card.name === '力量');
    const hasHermit = cards.some(card => card.name === '隐士');
    const hasWheel = cards.some(card => card.name === '命运之轮');
    const hasJustice = cards.some(card => card.name === '正义');
    const hasHanged = cards.some(card => card.name === '倒吊人');
    const hasTemperance = cards.some(card => card.name === '节制');
    const hasDevil = cards.some(card => card.name === '恶魔');
    const hasJudgement = cards.some(card => card.name === '审判');
    const hasMagician = cards.some(card => card.name === '魔术师');
    const hasPriestess = cards.some(card => card.name === '女祭司');
    const hasEmpress = cards.some(card => card.name === '女皇');
    const hasEmperor = cards.some(card => card.name === '皇帝');
    const hasHierophant = cards.some(card => card.name === '教皇');
    const hasChariot = cards.some(card => card.name === '战车');

    // 检查顺逆位情况
    const allReversed = cards.every(card => card.isReversed);
    const allUpright = cards.every(card => !card.isReversed);
    const hasReversed = cards.some(card => card.isReversed);

    // 根据牌的组合生成不同的启示
    if (hasFool && hasStar) {
        emotionalGuidance = "\n\n新的冒险正在召唤你，跟随内心的指引，勇敢地迈出第一步。";
    } else if (hasDeath && hasTower) {
        emotionalGuidance = allReversed ? 
            "\n\n虽然改变令人恐惧，但请相信这是重生的必经之路。放下过去，迎接新生。" :
            "\n\n巨大的转变即将来临，这是命运的安排。保持开放的心态，接受改变。";
    } else if (hasMoon && hasTower) {
        emotionalGuidance = "\n\n面对内心的恐惧和不安，记住这只是暂时的。真相终将照亮黑暗。";
    } else if (hasStar && hasSun) {
        emotionalGuidance = "\n\n希望和光明就在前方，保持信心，你的努力终将得到回报。";
    } else if (hasWorld) {
        emotionalGuidance = "\n\n一个重要的周期即将完成，新的篇章正在展开。保持开放和期待。";
    } else if (hasLovers && hasStrength) {
        emotionalGuidance = allUpright ? 
            "\n\n爱与力量同在，这是做出重要选择的时刻。相信自己的判断。" :
            "\n\n在感情中保持独立和坚强，不要被外界因素影响你的决定。";
    } else if (allReversed) {
        emotionalGuidance = "\n\n虽然当前面临挑战，但请记住，逆境是成长的契机。保持耐心和信心。";
    } else if (allUpright) {
        emotionalGuidance = "\n\n命运之轮正在转动，保持积极乐观的心态，把握当下的机遇。";
    } else if (hasReversed) {
        emotionalGuidance = "\n\n在顺境与逆境中保持平衡，这是成长必经的过程。相信命运的安排。";
    } else {
        emotionalGuidance = "\n\n相信自己的直觉，内心的声音往往最真实。保持开放和包容的心态，接纳生命给予的一切。";
    }

    return `${meanings.join('。')}。${emotionalGuidance}`;
}

// 添加荧光效果
function addGlowEffect(element) {
    element.style.textShadow = '0 0 10px var(--glow-purple)';
    setTimeout(() => {
        element.style.textShadow = 'none';
    }, 1000);
}

function generateCardReadings(cards) {
    return cards.map((card, index) => {
        const positions = ['过去', '现在', '未来'];
        const meaning = card.isReversed ? card.reversed : card.upright;
        
        return `
            <div class="card-reading">
                <h3>${positions[index]} - ${card.name} ${card.isReversed ? '(逆位)' : '(正位)'}</h3>
                <p>${meaning}</p>
            </div>
        `;
    }).join('');
}

// 初始化 MediaPipe Hands
const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

// 配置 MediaPipe Hands
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

// 初始化摄像头
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: 1280, 
                height: 720,
                facingMode: 'user'
            } 
        });
        
        video.srcObject = stream;
        // 添加视频翻转样式
        video.style.transform = 'scaleX(-1)';
        video.play();
        
        // 等待视频加载完成
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                resolve();
            };
        });
        
        // 设置画布尺寸
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // 添加画布翻转样式
        canvas.style.transform = 'scaleX(-1)';
        
        console.log('摄像头初始化成功');
        return true;
    } catch (error) {
        console.error('摄像头初始化错误:', error);
        showError('摄像头初始化失败，请刷新页面重试');
        return false;
    }
}

// 显示错误信息
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    // 3秒后自动移除错误信息
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// 添加翻转音效
function playFlipSound() {
    const audio = new Audio('flip.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('无法播放音效:', err));
}

// 添加卡牌发光效果样式
const style = document.createElement('style');
style.textContent = `
    .deck-card.glowing {
        box-shadow: 0 0 20px var(--glow-purple);
        transform: translateY(-10px);
    }
`;
document.head.appendChild(style);

// 初始化
initCamera();

// 处理手势检测结果
let lastCardSelectTime = 0;
const CARD_SELECT_INTERVAL = 1500; // 1.5秒间隔

// 添加摄像头处理函数
async function processCamera() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // 直接绘制视频帧到画布
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 发送到MediaPipe处理
        await hands.send({image: canvas});
    }
    // 持续处理视频流
    requestAnimationFrame(processCamera);
}

// 启动摄像头处理
processCamera();

hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // 使用食指指尖（landmark 8）作为选择点，并向上偏移
        // 由于视频已经镜像翻转，所以需要翻转x坐标
        const fingerX = (1 - landmarks[8].x) * window.innerWidth;
        const fingerY = (landmarks[8].y - 0.05) * window.innerHeight; // 向上偏移5%的屏幕高度
        
        // 获取所有卡牌元素
        const cards = document.querySelectorAll('.deck-card');
        let closestCard = null;
        let minDistance = Infinity;
        
        // 检查指尖是否在卡牌上方
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            
            // 计算指尖是否在卡牌区域内
            const isInCardArea = 
                fingerX >= rect.left && 
                fingerX <= rect.right && 
                fingerY >= rect.top && 
                fingerY <= rect.bottom;
            
            if (isInCardArea) {
                // 如果在卡牌区域内，计算到卡牌中心的距离
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(fingerX - cardX, 2) + Math.pow(fingerY - cardY, 2)
                );
                
                // 找到最近的卡牌
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            }
            
            // 移除所有卡牌的发光效果
            card.classList.remove('glowing');
        });
        
        // 如果指尖在卡牌区域内
        if (closestCard) {
            // 添加发光效果
            closestCard.classList.add('glowing');
            
            // 检测是否握拳（通过检查所有指尖是否都低于对应的指关节）
            const isFist = 
                landmarks[8].y > landmarks[5].y && // 食指
                landmarks[12].y > landmarks[9].y && // 中指
                landmarks[16].y > landmarks[13].y && // 无名指
                landmarks[20].y > landmarks[17].y; // 小指
            
            if (isFist) {
                // 检查是否满足时间间隔
                const currentTime = Date.now();
                if (currentTime - lastCardSelectTime >= CARD_SELECT_INTERVAL) {
                    // 握拳时，翻转卡牌
                    if (!closestCard.classList.contains('flipped')) {
                        closestCard.classList.add('flipped');
                        playFlipSound();
                        
                        // 如果卡牌还没有被选中，则选中它
                        if (!closestCard.dataset.selected) {
                            selectCard(closestCard);
                            closestCard.dataset.selected = 'true';
                        }
                        
                        // 更新最后选择时间
                        lastCardSelectTime = currentTime;
                    }
                }
            } else {
                // 不是握拳时，恢复卡牌
                if (closestCard.classList.contains('flipped')) {
                    closestCard.classList.remove('flipped');
                }
            }
        }
    }
});

// 添加示例问题点击事件
document.querySelectorAll('.category li').forEach(li => {
    li.addEventListener('click', () => {
        questionInput.value = li.textContent;
        questionInput.focus();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const startScreen = document.querySelector('.start-screen');
    const container = document.querySelector('.container');
    const fortuneTellerSelection = document.getElementById('fortuneTellerSelection');
    const questionSection = document.querySelector('.question-section');
    const cardsContainer = document.querySelector('.cards-container');
    const fortuneTellers = document.querySelectorAll('.fortune-teller');
    const startReadingBtn = document.getElementById('startReading');
    const videoContainer = document.querySelector('.video-container');

    // 开始按钮点击事件
    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        container.style.display = 'block';
        fortuneTellerSelection.style.display = 'block';
        // 隐藏摄像头
        videoContainer.style.display = 'none';
    });

    // 占卜师选择事件
    fortuneTellers.forEach(teller => {
        teller.addEventListener('click', function() {
            const model = this.dataset.model;
            
            // 创建并显示对话气泡
            const bubble = document.createElement('div');
            bubble.className = 'live2d-speech-bubble';
            bubble.innerHTML = '<p class="bubble-text">喵~让我来为你解读塔罗牌的指引吧~</p>';
            document.body.appendChild(bubble);
            
            // 显示气泡
            bubble.style.opacity = '1';
            bubble.style.visibility = 'visible';

            // 初始化Live2D模型
            L2Dwidget.init({
                model: {
                    jsonPath: `https://cdn.jsdelivr.net/npm/live2d-widget-model-${model}@1.0.5/assets/${model}.model.json`,
                    scale: 1
                },
                display: {
                    position: 'right',
                    width: 200,
                    height: 400,
                    hOffset: 0,
                    vOffset: -20
                },
                mobile: {
                    show: true,
                    scale: 0.5
                },
                react: {
                    opacityDefault: 0.7,
                    opacityOnHover: 0.2
                },
                dev: {
                    border: false
                }
            });

            // 隐藏选择界面
            fortuneTellerSelection.style.display = 'none';
            // 显示问题输入界面
            questionSection.style.display = 'block';
            // 保持摄像头隐藏
            videoContainer.style.display = 'none';

            // 3秒后隐藏气泡
            setTimeout(() => {
                bubble.style.opacity = '0';
                setTimeout(() => {
                    bubble.remove();
                }, 300);
            }, 3000);
        });
    });

    // 开始抽牌按钮点击事件
    startReadingBtn.addEventListener('click', function() {
        const question = document.getElementById('question').value.trim();
        if (!question) {
            alert('请输入你想占卜的问题');
            return;
        }
        
        // 获取必要的 DOM 元素
        const questionSection = document.querySelector('.question-section');
        const cardsContainer = document.querySelector('.cards-container');
        const videoContainer = document.querySelector('.video-container');
        const tutorialModal = document.getElementById('tutorialModal');
        
        // 检查元素是否存在
        if (questionSection) questionSection.style.display = 'none';
        if (cardsContainer) cardsContainer.style.display = 'block';
        if (videoContainer) videoContainer.style.display = 'block';
        if (tutorialModal) tutorialModal.style.display = 'block';
        
        // 移除对话气泡相关代码
    });

    function initFortuneTeller(model) {
        // 初始化 Live2D
        const live2d = new Live2D();
        live2d.init(live2dConfig);
        
        // 添加事件监听器
        const fortuneTeller = document.querySelector('.fortune-teller');
        if (fortuneTeller) {
            fortuneTeller.addEventListener('click', () => {
                // 移除对话气泡相关代码
            });
        }
    }

    // 显示结果
    async function showResult() {
        const resultContent = document.querySelector('.reading-result');
        if (!resultContent) {
            console.error('结果容器未找到');
            return;
        }
        
        resultContent.innerHTML = '<p>正在分析塔罗牌的指引...</p>';
        
        try {
            // 生成基础解读
            const reading = generateOverallMeaning(selectedCards);
            
            // 构建结果HTML
            const resultHTML = `
                <div class="reading-container">
                    <div class="reading-introduction">
                        <h3>塔罗指引</h3>
                        <p>关于你的问题："${questionInput.value}"，塔罗牌为你带来了指引：</p>
                    </div>
                    
                    <div class="card-readings">
                        <div class="card-reading">
                            <h3>过去</h3>
                            <p>${selectedCards[0].name}${selectedCards[0].isReversed ? '（逆位）' : ''}</p>
                            <p>${selectedCards[0].isReversed ? selectedCards[0].reversed : selectedCards[0].upright}</p>
                        </div>
                        <div class="card-reading">
                            <h3>现在</h3>
                            <p>${selectedCards[1].name}${selectedCards[1].isReversed ? '（逆位）' : ''}</p>
                            <p>${selectedCards[1].isReversed ? selectedCards[1].reversed : selectedCards[1].upright}</p>
                        </div>
                        <div class="card-reading">
                            <h3>未来</h3>
                            <p>${selectedCards[2].name}${selectedCards[2].isReversed ? '（逆位）' : ''}</p>
                            <p>${selectedCards[2].isReversed ? selectedCards[2].reversed : selectedCards[2].upright}</p>
                        </div>
                    </div>
                    
                    <div class="personalized-guidance">
                        <h3>塔罗的启示</h3>
                        <div class="guidance-content">
                            <p class="gentle-advice">${reading}</p>
                        </div>
                    </div>

                    <div class="chat-section">
                        <h3>与占卜师对话</h3>
                        <div class="chat-container">
                            <div class="chat-messages" id="chatMessages">
                                <div class="chat-message fortune-teller">
                                    <p>如果你对这些牌的含义有任何疑问，都可以随时问我哦~</p>
                                </div>
                            </div>
                            <div class="chat-input-container">
                                <input type="text" id="chatInput" placeholder="输入你的问题...">
                                <button id="sendMessage" class="send-button">发送</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            resultContent.innerHTML = resultHTML;
            
            // 等待DOM更新完成
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // 初始化聊天功能
            const chatInput = document.getElementById('chatInput');
            const sendButton = document.getElementById('sendMessage');
            const chatMessages = document.getElementById('chatMessages');
            
            if (!chatInput || !sendButton || !chatMessages) {
                console.error('聊天元素未找到');
                return;
            }
            
            // 发送按钮点击事件
            sendButton.addEventListener('click', async () => {
                const message = chatInput.value.trim();
                if (!message) return;
                
                console.log('发送消息:', message);
                
                // 添加用户消息
                const userMessageDiv = document.createElement('div');
                userMessageDiv.className = 'chat-message user';
                userMessageDiv.innerHTML = `<p>${message}</p>`;
                chatMessages.appendChild(userMessageDiv);
                
                // 清空输入框
                chatInput.value = '';
                sendButton.disabled = true;
                
                try {
                    // 获取AI响应
                    const response = await getAIResponse(message);
                    console.log('收到AI响应:', response);
                    
                    // 添加AI消息
                    const aiMessageDiv = document.createElement('div');
                    aiMessageDiv.className = 'chat-message fortune-teller';
                    aiMessageDiv.innerHTML = `<p>${response}</p>`;
                    chatMessages.appendChild(aiMessageDiv);
                    
                    // 滚动到底部
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                } catch (error) {
                    console.error('发送消息失败:', error);
                    const errorMessageDiv = document.createElement('div');
                    errorMessageDiv.className = 'chat-message fortune-teller';
                    errorMessageDiv.innerHTML = '<p>抱歉，发送消息时出现错误，请稍后再试。</p>';
                    chatMessages.appendChild(errorMessageDiv);
                }
            });
            
            // 回车键发送
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendButton.click();
                }
            });
            
            // 输入框内容变化时更新按钮状态
            chatInput.addEventListener('input', () => {
                sendButton.disabled = !chatInput.value.trim();
            });
            
            // 初始状态
            sendButton.disabled = true;
            
            console.log('聊天功能初始化完成');
        } catch (error) {
            console.error('生成解读失败:', error);
            resultContent.innerHTML = '<p>抱歉，现在无法生成解读。请稍后再试。</p>';
        }
    }

    // 聊天功能相关代码
    let chatHistory = [];

    // 发送消息到DeepSeek API
    async function sendToDeepSeek(message) {
        try {
            console.log('发送消息到DeepSeek API:', message);
            
            const response = await fetch(DEEPSEEK_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        {
                            role: "system",
                            content: "你是一个专业的塔罗牌占卜师，擅长解读塔罗牌的含义并提供有意义的建议。你的回答应该专业、温暖且富有启发性。请用中文回答，并保持友好的语气。"
                        },
                        ...chatHistory,
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            console.log('API响应状态:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API错误响应:', errorText);
                throw new Error(`API请求失败: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('API响应数据:', data);
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('API响应格式错误');
            }

            const aiResponse = data.choices[0].message.content;
            console.log('生成的AI响应:', aiResponse);
            
            if (!aiResponse || aiResponse.trim() === '') {
                throw new Error('AI响应内容为空');
            }
            
            return aiResponse;
        } catch (error) {
            console.error('API请求错误:', error);
            return '抱歉，我现在无法回答你的问题。请稍后再试。';
        }
    }

    // 显示消息到聊天界面
    function displayMessage(message, isUser = false) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) {
            console.error('聊天消息容器未找到');
            return;
        }

        try {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user' : 'fortune-teller'}`;
            messageDiv.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            console.log('消息已显示:', message);
        } catch (error) {
            console.error('显示消息时出错:', error);
        }
    }

    // 处理用户发送消息
    async function handleSendMessage() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');
        
        if (!chatInput || !sendButton) {
            console.error('聊天输入框或发送按钮未找到');
            return;
        }

        const message = chatInput.value.trim();
        if (!message) {
            console.log('消息为空，不发送');
            return;
        }

        try {
            // 禁用发送按钮
            sendButton.disabled = true;
            
            // 显示用户消息
            displayMessage(message, true);
            chatInput.value = '';
            
            // 添加到历史记录
            chatHistory.push({ role: "user", content: message });
            console.log('消息已添加到历史记录');

            // 显示等待消息
            const waitingDiv = document.createElement('div');
            waitingDiv.className = 'chat-message fortune-teller';
            waitingDiv.innerHTML = '<p>正在思考中...</p>';
            document.getElementById('chatMessages').appendChild(waitingDiv);

            // 获取AI响应
            const response = await sendToDeepSeek(message);
            
            // 移除等待消息
            waitingDiv.remove();
            
            // 显示AI响应
            displayMessage(response);
            
            // 添加到历史记录
            chatHistory.push({ role: "assistant", content: response });
            console.log('AI响应已添加到历史记录');
        } catch (error) {
            console.error('处理消息时出错:', error);
            displayMessage('抱歉，处理消息时出现错误。请稍后再试。');
        } finally {
            // 重新启用发送按钮
            sendButton.disabled = false;
        }
    }

    // 初始化聊天界面
    function initChat() {
        console.log('开始初始化聊天功能...');
        
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');
        
        if (!chatInput || !sendButton || !chatMessages) {
            console.error('聊天元素未找到:', { chatInput, sendButton, chatMessages });
            return;
        }
        
        console.log('找到所有聊天元素');
        
        // 移除旧的事件监听器
        const newSendButton = sendButton.cloneNode(true);
        sendButton.parentNode.replaceChild(newSendButton, sendButton);
        
        const newChatInput = chatInput.cloneNode(true);
        chatInput.parentNode.replaceChild(newChatInput, chatInput);
        
        // 添加新的事件监听器
        newSendButton.addEventListener('click', () => {
            const message = newChatInput.value.trim();
            if (!message) return;
            
            console.log('发送消息:', message);
            
            // 添加用户消息
            addMessageToChat(message, 'user');
            newChatInput.value = '';
            newSendButton.disabled = true;
            
            // 获取AI响应
            getAIResponse(message)
                .then(response => {
                    console.log('收到AI响应:', response);
                    addMessageToChat(response, 'fortune-teller');
                })
                .catch(error => {
                    console.error('发送消息失败:', error);
                    addMessageToChat('抱歉，发送消息时出现错误，请稍后再试。', 'fortune-teller');
                });
        });
        
        // 回车键发送
        newChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                newSendButton.click();
            }
        });
        
        // 输入框内容变化时更新按钮状态
        newChatInput.addEventListener('input', () => {
            newSendButton.disabled = !newChatInput.value.trim();
        });
        
        // 初始状态
        newSendButton.disabled = true;
        
        function addMessageToChat(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${type}`;
            messageDiv.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        console.log('聊天功能初始化完成');
    }

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .chat-container {
            margin-top: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        .chat-messages {
            max-height: 300px;
            overflow-y: auto;
            margin-bottom: 15px;
            padding: 10px;
        }

        .chat-message {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 10px;
            max-width: 80%;
        }

        .chat-message.user {
            background: var(--primary-purple);
            margin-left: auto;
        }

        .chat-message.fortune-teller {
            background: rgba(255, 255, 255, 0.1);
            margin-right: auto;
        }

        .chat-input-container {
            display: flex;
            gap: 10px;
        }

        #chatInput {
            flex: 1;
            padding: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 16px;
        }

        #chatInput:focus {
            outline: none;
            border-color: var(--primary-purple);
        }

        .send-button {
            padding: 10px 20px;
            background: var(--primary-purple);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 80px;
        }

        .send-button:hover:not(:disabled) {
            background: var(--glow-purple);
            transform: translateY(-2px);
        }

        .send-button:disabled {
            background: rgba(255, 255, 255, 0.2);
            cursor: not-allowed;
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);
});

// 测试 API 连接
async function testAPIConnection() {
    try {
        console.log('测试 DeepSeek API 连接...');
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "user",
                        content: "测试连接"
                    }
                ],
                temperature: 0.7,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API 错误:', errorText);
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        console.log('API 连接测试成功:', data);
        return true;
    } catch (error) {
        console.error('API 连接测试失败:', error);
        return false;
    }
}

// 在页面加载时测试 API 连接
document.addEventListener('DOMContentLoaded', async function() {
    const isConnected = await testAPIConnection();
    if (!isConnected) {
        alert('无法连接到 DeepSeek API，请检查 API 配置');
    }
});

async function getAIResponse(message) {
    try {
        console.log('开始获取AI响应...');
        
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "你是一个专业的塔罗牌占卜师，擅长解读塔罗牌的含义并提供有意义的建议。你的回答应该专业、温暖且富有启发性。请用中文回答，并保持友好的语气。"
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        console.log('API响应状态:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API错误响应:', errorText);
            throw new Error(`API请求失败: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API响应数据:', data);
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('API响应格式错误');
        }

        const aiResponse = data.choices[0].message.content;
        console.log('生成的AI响应:', aiResponse);
        
        if (!aiResponse || aiResponse.trim() === '') {
            throw new Error('AI响应内容为空');
        }
        
        return aiResponse;
    } catch (error) {
        console.error('获取AI响应时出错:', error);
        return '抱歉，我现在无法回答你的问题。请稍后再试。';
    }
}