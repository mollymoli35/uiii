from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.request
import urllib.parse
import base64
from io import BytesIO
import os

class GestureHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/gesture':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if 'imageData' not in data:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': '缺少图像数据'}).encode())
                return

            # 调用 Face++ API
            api_key = 'JyE8Vkx-5SOygr4wq-_LWcvvSxWUZr-Q'
            api_secret = 'ulbuY0_jGXtKP1TvUHXqczUmmvYM7GLe'
            api_url = 'https://api-cn.faceplusplus.com/humanbodypp/v1/gesture'

            try:
                # 准备请求数据
                boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
                data = {
                    'api_key': api_key,
                    'api_secret': api_secret,
                    'image_base64': data['imageData'],
                    'return_gesture': '1'
                }
                
                # 发送请求
                req = urllib.request.Request(api_url)
                req.add_header('Content-Type', 'multipart/form-data; boundary=%s' % boundary)
                
                # 构建表单数据
                form_data = []
                for key, value in data.items():
                    form_data.append('--%s' % boundary)
                    form_data.append('Content-Disposition: form-data; name="%s"' % key)
                    form_data.append('')
                    form_data.append(str(value))
                form_data.append('--%s--' % boundary)
                form_data.append('')
                
                # 发送请求
                req.data = '\r\n'.join(form_data).encode()
                response = urllib.request.urlopen(req)
                result = response.read().decode('utf-8')
                
                # 返回结果
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(result.encode())
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': '手势识别失败', 'message': str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_GET(self):
        # 处理静态文件请求
        if self.path == '/':
            self.path = '/index.html'
        
        try:
            # 读取文件
            with open('.' + self.path, 'rb') as file:
                self.send_response(200)
                self.send_header('Content-type', self.get_content_type(self.path))
                self.end_headers()
                self.wfile.write(file.read())
        except:
            self.send_response(404)
            self.end_headers()

    def get_content_type(self, path):
        if path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.png'):
            return 'image/png'
        else:
            return 'application/octet-stream'

def run(server_class=HTTPServer, handler_class=GestureHandler, port=3000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'服务器运行在 http://localhost:{port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run() 