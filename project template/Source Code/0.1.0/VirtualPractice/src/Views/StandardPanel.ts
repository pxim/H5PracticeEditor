/**
 * 操作规范 面板
 * @author 彭祥
 *
 */
class StandardPanel extends egret.Sprite{
	public constructor() 
	{
        super();
        this.initData();
	}
	
    private _txt_info: eui.Label;
    private initData(): void {
        var standardPanel = new eui.Component();
        standardPanel.skinName = "resource/eui_skins/Panel/StandardPanelSkin.exml";
        this.addChild(standardPanel);
        standardPanel.x = 0;
        standardPanel.y = 0;
        
        standardPanel["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClose,this);
        
        this._txt_info = standardPanel.getChildByName("txt_info") as eui.Label;
        this._txt_info.lineSpacing = 3;//行间距
        this._txt_info.text = "1.拔出通气帽，用堵头进行密封；" + "\r" + "2.以双离合器“朝上”的方式，将变速箱固定在吊板（VW 309）和变速箱支架（VW 353）上;"
            + "\r" + "3.用一字螺丝刀拆下毂盘的卡环;" + "\r" + "4.用钩子（3438）和一字螺丝刀拆下毂盘;" + "\r" +"5.安装垫块（T10368）,并在垫块上安装垫片C;";
        
        //创建一个容器，里面包含一张图片
        var group = new eui.Group();
//        var img = new eui.Image("resource/assets/Background/bg_2.png");
        group.addChild(this._txt_info);
        //创建一个Scroller
        var myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.width = 359;
        myScroller.height = 255;
        //设置viewport
        myScroller.viewport = group;
        this.addChild(myScroller);
        myScroller.x = 11;
        myScroller.y = 42;

    }
    
    private onBtnClose(e: egret.TouchEvent): void {
        this.visible = false;
    }
}
