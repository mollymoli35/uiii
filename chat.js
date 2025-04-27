// 聊天API配置
const CHAT_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const CHAT_API_KEY = 'sk-e9d391ea17464622a1ca78041b4c55ce';

// 聊天历史记录
let chatHistory = [];

// 存储用户抽到的牌
let chatSelectedCards = [];

// 更新抽到的牌信息
window.updateSelectedCards = function(cards) {
    chatSelectedCards = cards;
    console.log('更新抽到的牌：', cards);
};

// 发送消息到DeepSeek API
async function sendToDeepSeek(message) {
    try {
        // 构建牌面信息
        const cardInfo = chatSelectedCards.map(card => 
            `${card.name}（${card.isReversed ? '逆位' : '正位'}）`
        ).join('、');

        const response = await fetch(CHAT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHAT_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: `你是一只神秘的猫咪占卜师喵~用户抽到的牌是：${cardInfo}喵~\n你的回答要专注于结合用户的问题和这些牌来解读喵~每段话不要超过100字喵~要直接回答用户的问题，不要偏离主题喵~记住要在每句话结尾加上'喵~'喵~在解读时，要结合塔罗牌的正位/逆位含义，以及牌面的象征意义喵~`
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

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('API请求错误:', error);
        return '抱歉，我现在无法回答你的问题喵~请稍后再试喵~';
    }
}

// 显示消息到聊天界面
function displayMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'fortune-teller'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 处理用户发送消息
async function handleSendMessage() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    
    if (!chatInput || !sendButton) return;

    const message = chatInput.value.trim();
    if (!message) return;

    try {
        // 禁用发送按钮
        sendButton.disabled = true;
        
        // 显示用户消息
        displayMessage(message, true);
        chatInput.value = '';
        
        // 添加到历史记录
        chatHistory.push({ role: "user", content: message });

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
    } catch (error) {
        console.error('处理消息时出错:', error);
        displayMessage('抱歉，处理消息时出现错误。请稍后再试。');
    } finally {
        // 重新启用发送按钮
        sendButton.disabled = false;
    }
}

// 初始化聊天功能
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    
    if (!chatInput || !sendButton) return;
    
    // 发送按钮点击事件
    sendButton.addEventListener('click', handleSendMessage);
    
    // 回车键发送
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // 输入框内容变化时更新按钮状态
    chatInput.addEventListener('input', () => {
        sendButton.disabled = !chatInput.value.trim();
    });
    
    // 初始状态
    sendButton.disabled = true;
}

// 页面加载完成后初始化聊天功能
document.addEventListener('DOMContentLoaded', initChat); 