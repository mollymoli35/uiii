L2Dwidget.init({
    model: {
        jsonPath: "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/assets/wanko.model.json",
        scale: 0.8
    },
    display: {
        superSample: 2,
        width: 150,
        height: 300,
        position: 'right',
        hOffset: 0,
        vOffset: -20
    },
    mobile: {
        show: true,
        scale: 0.4
    },
    react: {
        opacityDefault: 0.7,
        opacityOnHover: 0.2
    },
    dialog: {
        enable: true,
        script: {
            'tap body': '你好呀~',
            'tap face': '不要戳我脸啦~'
        }
    }
}); 