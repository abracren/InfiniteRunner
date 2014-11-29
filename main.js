cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(480, 600, cc.ResolutionPolicy.NO_BORDER);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MainMenuScene());
    }, this);
};
cc.game.run();