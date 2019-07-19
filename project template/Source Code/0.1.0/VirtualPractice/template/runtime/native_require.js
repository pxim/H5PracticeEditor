
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/component/CheckPoint.js",
	"bin-debug/component/Drag.js",
	"bin-debug/component/HitTestUtil.js",
	"bin-debug/component/MovieClipUtil.js",
	"bin-debug/component/RESLoadUtil.js",
	"bin-debug/component/SoundPanel.js",
	"bin-debug/events/DataEvents.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/Views/MainUI.js",
	"bin-debug/Views/PartsPanel.js",
	"bin-debug/Views/PracticePanel.js",
	"bin-debug/Views/RecordsPanel.js",
	"bin-debug/Views/Scene2View.js",
	"bin-debug/Views/Scene3View.js",
	"bin-debug/Views/StandardPanel.js",
	"bin-debug/Views/ToolsPanel.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1124,
		contentHeight: 768,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};