/**
 *
 * @author 彭祥
 *
 */
class CheckPoint extends eui.Component{
	public constructor() 
	{
        super();
        this.initData();
	}
	
    private _hasChecked:Boolean;
    public  _checkedCounts:number;
    public _checkDrag;
//	public _lock:Boolean = false;
	private initData():void
	{
//        this.skinName = "resource/eui_skins/CheckBoxSkin";
	    this._checkedCounts=0;
        this._hasChecked=false;
	}
	
    public get checkDrag(): egret.DisplayObject {
        return this._checkDrag;
    }
    
    public setCheckDrag(obj: egret.DisplayObject):void
    {
        this._checkDrag = obj;
    }
    
    //存取是否被检测
    public setChecked(newState: Boolean): void 
    {
        if(newState == true) {
            this._checkedCounts++;
        } else {
            this._checkedCounts--;
        }
        this._hasChecked = newState;
    }
    
    public  get hasChecked(): Boolean {
        return this._hasChecked;
    }
    
    //存取被检测次数
    public  get checkedCounts(): number {
        return this._checkedCounts;
    }
    
}
