const http = require('http');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

const port = 3000;
const API_KEY = 'JyE8Vkx-5SOygr4wq-_LWcvvSxWUZr-Q';
const API_SECRET = 'ulbuY0_jGXtKP1TvUHXqczUmmvYM7GLe';
const API_URL = 'https://api-cn.faceplusplus.com/humanbodypp/v1/gesture';

const server = http.createServer(async (req, res) => {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // 处理 POST 请求
    if (req.method === 'POST' && req.url === '/api/gesture') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { imageData } = JSON.parse(body);
                
                if (!imageData) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: '缺少图像数据' }));
                    return;
                }

                const formData = new FormData();
                formData.append('api_key', API_KEY);
                formData.append('api_secret', API_SECRET);
                formData.append('image_base64', imageData);
                formData.append('return_gesture', '1');

                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    res.writeHead(response.status);
                    res.end(JSON.stringify({ 
                        error: 'API 错误',
                        message: errorText
                    }));
                    return;
                }

                const data = await response.json();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ 
                    error: '手势识别失败',
                    message: error.message
                }));
            }
        });
    } else {
        // 处理静态文件请求
        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './index.html';
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(404);
                res.end('文件未找到');
            } else {
                res.writeHead(200);
                res.end(content);
            }
        });
    }
});

server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 