/**
 * 工具模块 面板
 * @author 彭祥
 *
 */
class ToolsPanel extends egret.Sprite{
	public constructor()
	{
        super();
        this.initData();
	}
	
    private toolsPanel:eui.Component;
    private initData(): void 
    {
        this.toolsPanel = new eui.Component();
        this.toolsPanel.skinName = "resource/eui_skins/Panel/ToolsPanelSkin.exml";
        this.addChild(this.toolsPanel);
        this.toolsPanel.x = 0;
        this.toolsPanel.y = 0;
        
        this.toolsPanel["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClose,this);
        
        for(var i: number = 0;i < this.toolsPanel.numChildren;i++) {
            if(this.toolsPanel.getChildAt(i).name.indexOf("toolBtn_") != -1) {
                this.toolsPanel.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPartBtnClick,this);
            }
        }
    }
    
    private onBtnClose(e: egret.TouchEvent): void {
        this.visible = false;
    }
    
    /**
     * 显示零件
     * @param index
     */
    public showPart(index: number): void {
        if(this.toolsPanel["toolBtn_" + index] != null) {
            this.toolsPanel["toolBtn_" + index].visible = true;
        }
    }
    
    
    /**
     * 隐藏零件
     * @param index
     */
    public hidePart(index: number): void {
        if(this.toolsPanel["toolBtn_" + index] != null) {
            this.toolsPanel["toolBtn_" + index].visible = false;
        }
    }

    private onPartBtnClick(e: egret.TouchEvent): void {
        var target = e.currentTarget;
        var index: number = parseInt(e.currentTarget.name.substr(8));

        target.visible = false;//隐藏工具
        this.visible = false;//关闭此面板
        this.dispatchEvent(new DataEvents(DataEvents.show_tool_index,index));
    }
}
