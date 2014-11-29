//menulayer Class

var menuLayer = cc.Layer.extend(
{
        
        ctor: function ()
        {
                this._super();
                this.init();
        },

        init: function ()
        
        {
        
        var menuItemPlay = cc.MenuItemFont.create("Play", this.onPlay, this);

        var menu = cc.Menu.create(menuItemPlay);
        menu.setPosition(cc.p(winSize.width/2,300));
        this.addChild(menu, 100000000);
        cc.log('menulayer');
        },
        onPlay:function(){
        g_layer.removeChild(this);
        director.resume();

        
        
        
        },



});
        