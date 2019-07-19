/**
 *
 * @author 彭祥
 *
 */
class Scene2View extends eui.Component{
	public constructor() 
	{
    	  super();
        this.initData()
	}
	
 
    private _sceneMC: MovieClipUtil;
	private initData():void
	{
        this.skinName = "resource/eui_skins/Scene/Scene2ViewSkin.exml";
        
        for(var i: number = 0;i < this.numChildren;i++)
        {
            this.getChildAt(i).visible = false;
        }
    	
        //加载专门的动画界面面板
//        this._sceneMC = new MovieClipUtil();
//        this.addChild(this._sceneMC);
//        var _parth: string = "resource/assets/MovieClip/mc_0";
//        this._sceneMC.initData(_parth,"未命名-1");
//        this._sceneMC.x = 10;
//        this._sceneMC.y = 0;
//        this.setChildIndex(this._sceneMC,1);
        
        //        this._sceneMC.addEventListener(DataEvents.sceneMC_load_completed,this.onSceneMC_load_completed,this);
//        this._sceneMC.addEventListener(DataEvents.sceneMC_play_completed,this.onSceneMC_play_completed,this);
        var square: egret.Shape = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0,0,989,553);
        square.graphics.endFill();
        this.addChild(square);
        square.x = 10;

        var data = RES.getRes("mc_0_json");
        var txtr = RES.getRes("mc_0_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("未命名-1"));
        this.addChildAt(mc1,1);
        mc1.x = 10;
        mc1.mask = square;
        mc1.gotoAndPlay(1,1);
        mc1.addEventListener(egret.Event.COMPLETE,(e: egret.Event) => {
            this.onSceneMCPlayCompleted();
        },this);
        
        this["cPoint_1_2"]["lock"] = false;
        this["cPoint_2_2"]["lock"] = false;
	}
	
	private _part_1:eui.Button;
    private _part_2:eui.Button;
    
    
    private onSceneMC_load_completed(e: DataEvents):void
    {
        this._sceneMC.removeEventListener(DataEvents.sceneMC_load_completed,this.onSceneMC_load_completed,this);
//        this._sceneMC.createMovieClip();
    }
    
    private onSceneMC_play_completed(e: DataEvents):void
    {
        this._sceneMC.removeEventListener(DataEvents.sceneMC_play_completed,this.onSceneMC_play_completed,this);
        this.onSceneMCPlayCompleted();
    }
    
    private onSceneMCPlayCompleted():void
    {
        this["bg_1"].visible = true;
        this["cPoint_1_1"].visible = true;
        this["cPoint_2_1"].visible = true;

        this["partBtn_1"].visible = true;
        this["partBtn_2"].visible = true;

        this["partBtn_1"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPartsBtnClick,this);
        this["partBtn_2"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPartsBtnClick,this);
    }
    
    private onPartsBtnClick(e: egret.TouchEvent):void
    {
      var target = e.currentTarget;
      var index:number = Number(e.currentTarget.name.substr(8));
      target.visible = false;
      
     (this.parent as PracticePanel)._partsPanel.showPart(index);
     switch(index)
         {
             case 1:
             (this.parent as PracticePanel).addRecords("拆下零件——通气帽左，放进零件箱中");
             break;
             case 2:
             (this.parent as PracticePanel).addRecords("拆下零件——通气帽右，放进零件箱中");
             break;
             
         }
     
     this["cPoint_" + index +"_1"].visible = false;
     this["cPoint_" + index + "_2"].visible = true;
    }
}
