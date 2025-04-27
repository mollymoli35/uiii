import os
import requests
from urllib.parse import urlparse
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# 创建images文件夹
if not os.path.exists('images'):
    os.makedirs('images')

# 配置重试策略
session = requests.Session()
retry = Retry(
    total=3,  # 最多重试3次
    backoff_factor=1,  # 重试间隔
    status_forcelist=[500, 502, 503, 504]  # 需要重试的HTTP状态码
)
adapter = HTTPAdapter(max_retries=retry)
session.mount('http://', adapter)
session.mount('https://', adapter)

# 禁用代理
session.trust_env = False  # 禁用环境变量中的代理设置
os.environ['NO_PROXY'] = '*'  # 禁用所有代理

# 塔罗牌数据 - 使用国内CDN链接
tarot_cards = [
    {'name': '愚者', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '魔术师', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '女祭司', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '女皇', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '皇帝', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '教皇', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '恋人', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '战车', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '力量', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '隐士', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '命运之轮', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '正义', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '倒吊人', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '死神', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '节制', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '恶魔', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '塔', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '星星', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '月亮', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '太阳', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '审判', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'},
    {'name': '世界', 'image': 'https://img.51miz.com/Element/00/88/00/00/971c0f5d_E880000_7c0c0c0c.jpg'}
]

def download_image(url, filename, max_retries=3):
    for attempt in range(max_retries):
        try:
            print(f'正在下载 {filename} (尝试 {attempt + 1}/{max_retries})...')
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = session.get(url, stream=True, timeout=30, headers=headers)
            response.raise_for_status()
            
            with open(os.path.join('images', filename), 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            print(f'下载完成: {filename}')
            return True
        except requests.exceptions.Timeout:
            print(f'下载超时: {filename}, 尝试 {attempt + 1}/{max_retries}')
            if attempt < max_retries - 1:
                time.sleep(2)  # 等待2秒后重试
        except Exception as e:
            print(f'下载失败: {filename}, 错误: {str(e)}')
            if attempt < max_retries - 1:
                time.sleep(2)
    return False

def main():
    print('开始下载塔罗牌图片...')
    success_count = 0
    
    for card in tarot_cards:
        filename = f"{card['name']}.jpg"
        if download_image(card['image'], filename):
            success_count += 1
        time.sleep(1)  # 每张图片下载后等待1秒
    
    print(f'\n下载完成！成功: {success_count}/{len(tarot_cards)} 张图片')

if __name__ == '__main__':
    main() 