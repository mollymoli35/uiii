import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

const app = new PIXI.Application({
    view: document.getElementById('live2d-container').appendChild(document.createElement("canvas")),
    autoStart: true,
    transparent: true,
    width: 300,
    height: 400
});

(async () => {
    try {
        const model = await Live2DModel.from('/models/witch/witch.model3.json');
        model.scale.set(0.4);
        model.position.set(150, 350);

        app.stage.addChild(model);

        // 添加拖动功能
        model.buttonMode = true;
        model.on('pointerdown', (e) => {
            model.dragging = true;
            model.data = e.data;
        });
        model.on('pointerup', () => {
            model.dragging = false;
            model.data = null;
        });
        model.on('pointermove', () => {
            if (model.dragging) {
                const pos = model.data.getLocalPosition(model.parent);
                model.position.set(pos.x, pos.y);
            }
        });

        // 添加点击事件
        model.on('pointertap', () => {
            model.motion('tap');
        });
    } catch (error) {
        console.error('加载 Live2D 模型失败:', error);
    }
})(); 