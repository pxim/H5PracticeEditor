
/**
 * @author  彭祥
 */
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    
    /**
     * 主界面
     */
    private mainUI: MainUI;
    
    /**
     * 练习模块-主界面
     */
    private _practicePanel: PracticePanel;
    
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        this.loadingView.x = (this.stage.stageWidth - this.loadingView.width)/2;
        this.loadingView.y = (this.stage.stageHeight- this.loadingView.height) / 2;
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
            new RESLoadUtil("sence3");
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void 
    {
//        var button = new eui.Button();
//        button.label = "Click!";
//        button.horizontalCenter = 0;
//        button.verticalCenter = 0;
//        this.addChild(button);
//        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        
        var bg: egret.Bitmap = this.createBitmapByName("bg_0a_png");
        this.addChild(bg);
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        bg.width = stageW;
        bg.height = stageH;
        
        
        //主界面
        this.mainUI = new MainUI();
        this.addChild(this.mainUI);
        this.mainUI.x = 0;
        this.mainUI.y = 0;
        this.mainUI.addEventListener(DataEvents.btnExplain_click,this.onBtnExplainClick,this);
        this.mainUI.addEventListener(DataEvents.btnPractice_click,this.onBtnPracticeClick,this);
        this.mainUI.addEventListener(DataEvents.btnQuizzes_click,this.onBtnQuizzesClick,this);
        
        //        var sound: egret.Sound = RES.getRes("0.5second_mp3");
//        sound.play();
//        
//        var sound1: egret.Sound = RES.getRes("concongnanian_mp3");
//        sound1.play();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private soundPanel:SoundPanel;
    private onTouchTap(e: egret.TouchEvent):void
    {
        if(this.soundPanel != null) {
//            this.removeChild(this.soundPanel);
//            this.soundPanel.reset();
//            this.soundPanel = null;
            return;
        } else {
            this.soundPanel = new SoundPanel();
            this.addChild(this.soundPanel);
            this.soundPanel.initdata();
        }
    }
    
    /**
     * 主界面-演示按钮点击处理
     * @param e
     */
    private onBtnExplainClick(e: DataEvents) 
    {
//        var target = e.currentTarget;
//        target.visible = false;
    }
    
    
    /**
     *  主界面-练习按钮点击处理
     * @param e
     */
    private onBtnPracticeClick(e: DataEvents) {
        var target = e.currentTarget;
        target.visible = false;
        
        if(this._practicePanel == null)
        {
            this.loadPracticePanel();
        }else
        {
            this._practicePanel.visible = true;
        }
    }
    
    /**
     * 实例化，并且加载 练习主界面
     */
    private loadPracticePanel():void
    {
        this._practicePanel = new PracticePanel();
        this.addChild(this._practicePanel);
        this._practicePanel.x = 0;
        this._practicePanel.y = 153;

        this._practicePanel.addEventListener(DataEvents.btnBackbomepag_click,this.onBtnBackbomepagClick,this);
        this._practicePanel.addEventListener(DataEvents.btn_restart_click,this.onBtnRestartClick,this);
    }
    
    /**
     *  点击主界面返回按钮
     * 主界面出现
     * 当前界面隐藏
     * @param e
     */
    private onBtnBackbomepagClick(e: DataEvents):void
    {
        var target = e.currentTarget;
        target.visible = false;
        this.removePracticePanel();
        
        this.mainUI.visible = true;
    }
 
    /**
     * 重新加载练习主界面
     */
    private onBtnRestartClick(e: DataEvents):void
    {
        this.removePracticePanel();
        this.loadPracticePanel();
    }
    
    
    /**
     * 去除上一个练习主界面
     */
    private removePracticePanel():void
    {
        if(this._practicePanel != null && this.contains(this._practicePanel)) {
            this.removeChild(this._practicePanel);
            this._practicePanel = null;
        }
    }
    
    
    
    /**
     * 主界面-测试按钮点击处理
     * @param e
     */
    private onBtnQuizzesClick(e: DataEvents) {
//        var target = e.currentTarget;
//        target.visible = false;
    }
    
    /**
  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
  */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
