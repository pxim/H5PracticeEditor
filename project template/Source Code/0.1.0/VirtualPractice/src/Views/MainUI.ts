/**
 * 功能：功能操作面板——主界面
 * @author 彭祥
 *
 */
class MainUI extends egret.Sprite {
    public constructor() {
        super();
        this.initdata();
    }

    private initdata(): void {
        var mainUI = new eui.Component();
        mainUI.skinName = "resource/eui_skins/MainUISkin.exml";
        this.addChild(mainUI);
        mainUI.x = 0;
        mainUI.y = 0;

        mainUI["btnExplain"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnExplain,this);
        mainUI["btnPractice"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnPractice,this);
        mainUI["btnQuizzes"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnQuizzes,this);
    }

    
    /**
     * 演示按钮
     * @param e
     */
    private onBtnExplain(e: egret.TouchEvent): void
    {
//        console.warn("btnExplain");
        var daterEvent: DataEvents = new DataEvents(DataEvents.btnExplain_click);
        this.dispatchEvent(daterEvent);
    }
    
    
    /**
     * 练习按钮
     * @param e
     */
    private onBtnPractice(e: egret.TouchEvent): void 
    {
//        console.warn("btnPractice");
        var daterEvent: DataEvents = new DataEvents(DataEvents.btnPractice_click);
        this.dispatchEvent(daterEvent);
    }
    
    
    /**
     * 测试按钮
     * @param e
     */
    private onBtnQuizzes(e: egret.TouchEvent): void 
    {
//        console.warn("btnQuizzes");
        var daterEvent: DataEvents = new DataEvents(DataEvents.btnQuizzes_click);
        this.dispatchEvent(daterEvent);
    }
}
