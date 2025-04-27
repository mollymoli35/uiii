import os
import shutil

# 创建tarot_images文件夹
if not os.path.exists('tarot_images'):
    os.makedirs('tarot_images')

# 塔罗牌数据
tarot_cards = [
    {'name': 'fool', 'image': 'tarot_images/fool.jpg'},
    {'name': 'magician', 'image': 'tarot_images/magician.jpg'},
    {'name': 'priestess', 'image': 'tarot_images/priestess.jpg'},
    {'name': 'empress', 'image': 'tarot_images/empress.jpg'},
    {'name': 'emperor', 'image': 'tarot_images/emperor.jpg'},
    {'name': 'hierophant', 'image': 'tarot_images/hierophant.jpg'},
    {'name': 'lovers', 'image': 'tarot_images/lovers.jpg'},
    {'name': 'chariot', 'image': 'tarot_images/chariot.jpg'},
    {'name': 'strength', 'image': 'tarot_images/strength.jpg'},
    {'name': 'hermit', 'image': 'tarot_images/hermit.jpg'},
    {'name': 'wheel', 'image': 'tarot_images/wheel.jpg'},
    {'name': 'justice', 'image': 'tarot_images/justice.jpg'},
    {'name': 'hanged', 'image': 'tarot_images/hanged.jpg'},
    {'name': 'death', 'image': 'tarot_images/death.jpg'},
    {'name': 'temperance', 'image': 'tarot_images/temperance.jpg'},
    {'name': 'devil', 'image': 'tarot_images/devil.jpg'},
    {'name': 'tower', 'image': 'tarot_images/tower.jpg'},
    {'name': 'star', 'image': 'tarot_images/star.jpg'},
    {'name': 'moon', 'image': 'tarot_images/moon.jpg'},
    {'name': 'sun', 'image': 'tarot_images/sun.jpg'},
    {'name': 'judgement', 'image': 'tarot_images/judgement.jpg'},
    {'name': 'world', 'image': 'tarot_images/world.jpg'}
]

def main():
    print('请将塔罗牌图片压缩包解压到 tarot_images 文件夹中')
    print('压缩包中包含以下图片：')
    for card in tarot_cards:
        print(f"- {card['name']}.jpg")
    print('\n解压完成后，图片将自动显示在网页中')

if __name__ == '__main__':
    main() 