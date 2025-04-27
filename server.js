const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const FormData = require('form-data');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 配置CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// 配置静态文件服务
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
}));

// 设置静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
app.use('/model', express.static(path.join(__dirname, 'model')));

// 处理跨域请求
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 处理模型文件的请求
app.get('/model/witch/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(__dirname, 'model', 'witch', filename);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
        console.error('文件不存在:', filePath);
        return res.status(404).send('文件未找到');
    }

    // 如果是model3.json文件，需要特殊处理
    if (filename === 'witch.model3.json') {
        try {
            const modelJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            // 修改相对路径为绝对路径
            modelJson.FileReferences.Moc = '/model/witch/' + modelJson.FileReferences.Moc;
            modelJson.FileReferences.Physics = '/model/witch/' + modelJson.FileReferences.Physics;
            modelJson.FileReferences.DisplayInfo = '/model/witch/' + modelJson.FileReferences.DisplayInfo;
            modelJson.FileReferences.Textures = modelJson.FileReferences.Textures.map(texture => '/model/witch/' + texture);
            
            res.setHeader('Content-Type', 'application/json');
            res.json(modelJson);
        } catch (err) {
            console.error('处理model3.json时出错:', err);
            res.status(500).send('处理文件时出错');
        }
    } else {
        res.sendFile(filePath);
    }
});

// 添加调试中间件
app.use((req, res, next) => {
    console.log('请求路径:', req.path);
    console.log('请求URL:', req.url);
    console.log('请求方法:', req.method);
    next();
});

// Face++ API 配置
const API_KEY = 'JyE8Vkx-5SOygr4wq-_LWcvvSxWUZr-Q';
const API_SECRET = 'ulbuY0_jGXtKP1TvUHXqczUmmvYM7GLe';
const API_URL = 'https://api-cn.faceplusplus.com/humanbodypp/v1/gesture';

// 增加请求大小限制
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 配置 CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// 处理 OPTIONS 请求
app.options('*', cors());

// 日志中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// 手势识别端点
app.post('/api/gesture', async (req, res) => {
    try {
        const { imageData, width, height } = req.body;
        
        if (!imageData) {
            throw new Error('未收到图像数据');
        }

        console.log(`收到图像数据: ${imageData.length} 字节`);
        console.log(`图像尺寸: ${width}x${height}`);

        const formData = new FormData();
        formData.append('api_key', API_KEY);
        formData.append('api_secret', API_SECRET);
        formData.append('image_base64', imageData);
        formData.append('return_gesture', '1');
        formData.append('return_keypoints', '1');

        console.log('正在调用 Face++ API...');
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        console.log(`API 响应状态: ${response.status}`);
        
        const data = await response.json();
        console.log('API 响应数据:', data);
        
        if (!response.ok) {
            console.error('API 错误:', data);
            throw new Error(data.error_message || 'API 请求失败');
        }

        // 检查是否有手势数据
        if (!data.humanbody || !data.humanbody[0] || !data.humanbody[0].gesture) {
            console.log('未检测到手势');
            return res.json({ humanbody: [] });
        }

        // 处理手势数据
        const processedData = {
            humanbody: data.humanbody.map(body => ({
                gesture: {
                    type: body.gesture.type,
                    hand_box: body.gesture.hand_box
                }
            }))
        };

        console.log('处理后的手势数据:', processedData);
        res.json(processedData);
    } catch (error) {
        console.error('服务器错误:', error);
        res.status(500).json({
            error: true,
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).send('服务器内部错误');
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 