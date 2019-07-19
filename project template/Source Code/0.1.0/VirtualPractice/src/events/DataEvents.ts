/**
 *
 * @author 彭祥
 *
 */
class DataEvents extends egret.Event
{
    public static btnExplain_click: string = "btnExplain_click";//主界面——演示按钮
    public static btnPractice_click: string = "btnPractice_click";//主界面——练习按钮
    public static btnQuizzes_click: string = "btnQuizzes_click";//主界面——测试题按钮
    
    public static btn_trainRecords_click: string = "btn_trainRecords_click";//练习主界面——实训记录按钮
    public static btn_standard_click: string = "btn_standard_click";//练习主界面——拆装规范按钮
    public static btn_parts_click: string = "btn_parts_click";//练习主界面——零件按钮
    public static btn_tools_click: string = "btn_tools_click";//练习主界面——工具按钮
    public static btn_restart_click: string = "btn_restart_click";//练习主界面——重新开始按钮
    public static btnBackbomepag_click: string = "btnBackbomepag_click";//返回主界面按钮
    
    public static btn_nextScene_click: string = "btn_nextScene_click";//转下一个场景按钮
    
    public static sceneMC_load_completed: string = "sceneMC_load_completed";//场景动画加载完成之后，派发的事件
    public static sceneMC_play_completed: string = "sceneMC_play_completed";//场景动画播放完成之后，派发的事件
    
    public static show_part_index: string = "show_part_index";//零件箱里的零件在主界面出现时的索引，派发的事件
    public static show_tool_index: string = "show_tool_index";//工具箱里的工具在主界面出现时的索引，派发的事件
    
    public static part_hide_index: string = "part_hide_index";//主界面上的零件隐藏时，零件箱里对应的零件按钮要出现，派发的事件
    public static tool_hide_index: string = "tool_hide_index";//主界面上的工具隐藏时，零件箱里对应的工具按钮要出现，派发的事件
    
    protected  _params:Object;
    protected _container: egret.DisplayObjectContainer;
    public constructor(type: string,params: Object = null,container: egret.DisplayObjectContainer  = null, bubbles:boolean = false,cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this._params = params;
        this._container = container;
    }
    
    public get params(): Object
    {
        return this._params;
    }
    
    public get container():egret.DisplayObjectContainer
    {
        return this._container;
    }
}
