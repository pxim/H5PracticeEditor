/**
 *
 * @author 彭祥
 *
 */
class Scene3View extends eui.Component{
	public constructor() 
	{
        super();
        this.initData()
	}
	
    private _sceneMC: MovieClipUtil;
    private initData():void
    {
        //加载专门的动画界面面板
//        this._sceneMC = new MovieClipUtil();
//        this.addChild(this._sceneMC);
//        var _parth: string = "resource/assets/MovieClip/mc_1";
//        this._sceneMC.initData(_parth,"未命名-1");
//        this._sceneMC.x = 10;
//        this._sceneMC.y = 0;
//
//        this.setChildIndex(this._sceneMC,1);
//
//        this._sceneMC.addEventListener(DataEvents.sceneMC_load_completed,this.onSceneMC_load_completed,this);
//        this._sceneMC.addEventListener(DataEvents.sceneMC_play_completed,this.onSceneMC_play_completed,this);
        
        var square: egret.Shape = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0,0,989,553);
        square.graphics.endFill();
        this.addChild(square);
        square.x = 10;
        
        var data = RES.getRes("mc_1_json");
        var txtr = RES.getRes("mc_1_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("未命名-1"));
        this.addChildAt(mc1,1);
        mc1.x = 10;
        mc1.mask = square;
        mc1.gotoAndPlay(1,1);
        mc1.addEventListener(egret.Event.COMPLETE,(e: egret.Event) => {
            console.log(e.type);//1次
//            this.onSceneMC_play_completed();
        },this);
    }
    
    private onSceneMC_load_completed(e: DataEvents): void {
        this._sceneMC.removeEventListener(DataEvents.sceneMC_load_completed,this.onSceneMC_load_completed,this);

//        this._sceneMC.createMovieClip();
    }

    private onSceneMC_play_completed(e: DataEvents): void {
        this._sceneMC.removeEventListener(DataEvents.sceneMC_play_completed,this.onSceneMC_play_completed,this);
        }
}
