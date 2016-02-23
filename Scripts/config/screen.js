var config;
(function (config) {
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = window.innerWidth;
        Screen.HEIGHT = window.innerHeight;
        Screen.RATIO = Screen.WIDTH / Screen.HEIGHT;
        return Screen;
    })();
    config.Screen = Screen;
})(config || (config = {}));

//# sourceMappingURL=screen.js.map
