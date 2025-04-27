from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# 配置
API_KEY = 'JyE8Vkx-5SOygr4wq-_LWcvvSxWUZr-Q'
API_SECRET = 'ulbuY0_jGXtKP1TvUHXqczUmmvYM7GLe'
API_URL = 'https://api-cn.faceplusplus.com/humanbodypp/v1/gesture'

@app.route('/api/gesture', methods=['POST', 'OPTIONS'])
def gesture():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        if not data or 'imageData' not in data:
            return jsonify({'error': '缺少图像数据'}), 400

        # 准备请求数据
        files = {
            'api_key': (None, API_KEY),
            'api_secret': (None, API_SECRET),
            'image_base64': (None, data['imageData']),
            'return_gesture': (None, '1')
        }

        # 发送请求到 Face++ API
        response = requests.post(API_URL, files=files)
        
        if response.status_code != 200:
            return jsonify({
                'error': 'API 错误',
                'message': response.text
            }), response.status_code

        return jsonify(response.json())
    except Exception as e:
        return jsonify({
            'error': '手势识别失败',
            'message': str(e)
        }), 500

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True) 