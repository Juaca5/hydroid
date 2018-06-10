(function (window) {
    var _self = null;
    var mainStream = {
        /**
         * Contiene las variables de nuestro modulo.
         * 
         */
        config:{
            //rtmpHost: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
	        //rtmpHost: "rtmp://190.21.9.126:1935/hls/movie",
            //backState: "../../system_state_back.json",
            backState: "http://192.168.56.100/ffmpeg/stateBack.php",
            recAction: "../php/Control.php",
            recState: "../php/FrontController.php",
	        rtmpHost: "rtmp://192.168.56.100:1935/hls/movie",
	        width: "800",
	        height: "450"
        },
        vars: {
            player: false,
            stateRecord: false
        },
        init: function () {
            _self = this;
            _self.ui.getElements();
            _self.actions.modPlayEvent();
            //TODO: codigo de la para inicializar el modulo ejemplo: $commentList = $("commentList").list();
            _self.ui.setEvents();
            
            setInterval(_self.ui.handlers.controlState, 10000);
            _self.ui.handlers.controlState();
            _self.vars.player = false;
        },
        /**
         * Objeto encargado de manejar la vista del modulo.
         */
        ui: {
            /**
             * Inicializa los eventos de la vista del modulo, tales como los click, hover, etc de los elementos.
             * @returns {undefined}
             */
            elements: {
                //TODO: elementos jquery para evitar hacer llamadas de mas ejemplo $commentList.
                statusConnection: undefined,
                statusStream: undefined,
                recButton: undefined
            },
            setEvents: function () {
                //_self.ui.elements.actions.click(_self.ui.handlers.onActionClick);
                //eventos del menu
                _self.ui.handlers.onLoadPlayer();
                _self.ui.elements.recButton.click(_self.ui.handlers.onRecButton);
                _self.ui.elements.stopButton.click(_self.ui.handlers.onStopButton);

                //$commentList.click(callback)
            },
            getElements: function () {
                _self.ui.elements.statusConnection = $('#statusConnection');
                _self.ui.elements.recButton = $('#recButton');
                _self.ui.elements.stopButton = $('#stopButton');
                _self.ui.elements.hourButton = $('#hourButton');
                _self.ui.elements.statusStream = $('#statusStream');
                
            },
            /**
             * Objeto encargado de definir las acciones del modulo.
             */
            handlers: {
                onLoadPlayer: function () {
                    prontusPlayer.mediaController.install({
					    "player": {
					        "adEnable": false,
					        "autoPlay": false,
					        "image": "",
					        "width": _self.config.width,
					        "height": _self.config.height,
					        "forceSize": true,
					        "delay": 0
					    },
					    "mediaSrc": {
					        "defaultSrc": _self.config.rtmpHost,
					        "onErrorSrc": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
					    },
					    "contentId": "prontusPlayer",
                        "stats":{
                            "enable": true,
                        }
					});
                },
                controlState: function(){
                    _self.actions.getStateBack();
                    _self.actions.getStateRecord();
                },
                onRecButton: function(){
                    var action = 'start';
                    //console.log("empezamos");
                    if(_self.vars.stateRecord){
                        action = 'stop';
                    }
                    _self.actions.callRecAction(action);
                },
                onStopButton: function(){
                    _self.ui.elements.stopButton.hide();
                    _self.ui.elements.hourButton.show();
                    _self.actions.callRecAction('stop');
                }
                /*Maneja el menu principal
                 * 
                 * @param {type} e
                 * @returns {undefined}
                 */

            },
        },
        /**
         * Objeto encargado de definir las acciones del modulo.
         */
        actions: {
            getStateBack: function(){
                $.ajax({
                    url: _self.config.backState,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'state',
                    success: function (jsonp) {
                        _self.callbacks.stateBackCallback(jsonp);
                    },
                    error: function (e) {
                        console.log(e);   
                    }
                });
            },
            getStateRecord: function(){
                var jsonRecState;
                $.ajax({
                    url: _self.config.recState,
                    success: function(data){
                        jsonRecState = JSON.parse(data);
                        _self.callbacks.stateRecCallback(jsonRecState);
                    },
                    error: function(e){
                        console.log(e);
                    }
                });
            },
            callRecAction: function(action){
                var datajson;
                var action = action;
                $.ajax({
                    url: _self.config.recAction,
                    type: 'GET',
                    data: {'action':action},
                    cache: false,
                    success: function (data){
                        jsonRecState = JSON.parse(data);
                        _self.callbacks.stateRecCallback(jsonRecState);
                    },
                    error: function(e){
                        console.log(e)
                    }
                });
            },
            modPlayEvent: function(){
                if(prontusPlayer !== undefined){
                    prontusPlayer.statsController.send = function(event, statsConfig, values) {
                        if (prontusPlayer.helper.parseBoolean(statsConfig.enable)) {
                            if (event === "timePlayed") {
                                statsConfig.timePlayed += values;
                            }

                            if (event === "play" && !statsConfig.start) {
                                event = "start";
                                statsConfig.start = true;
                                mainStream.vars.player = true;
                                mainStream.actions.showRecbutton();
                            }

                            if (prontusPlayer.helper.parseBoolean(statsConfig.sst.enable) && !prontusPlayer.helper.isEmpty(statsConfig.sst.events[event])) {
                                prontusPlayer.statsController.sendSst(event, statsConfig);
                            }
                            if (prontusPlayer.helper.parseBoolean(statsConfig.analytics.enable) && !prontusPlayer.helper.isEmpty(statsConfig.analytics.events[event])) {
                                prontusPlayer.statsController.sendAnalytics(statsConfig.analytics.events[event], statsConfig.analytics, values);
                            }
                        }
                    };    
                }
            },
            showRecbutton: function(){
                _self.ui.elements.recButton.fadeIn();
            }
        },
        /**
         * Objeto encargado de definir las acciones del modulo.
         */
        callbacks: {
            stateBackCallback: function(data){
                if(data.stream === "true"){
                    _self.ui.elements.statusConnection.removeClass().addClass('green');
                    _self.ui.elements.statusConnection.html("Conectado");
                }
                else{
                    _self.ui.elements.statusConnection.removeClass().addClass('grey');
                    _self.ui.elements.statusConnection.html("No Conectado");
                }
            },
            stateRecCallback: function(data){
                if(_self.vars.player){
                    if(data.record === "true"){
                        _self.ui.elements.statusStream.fadeIn();
                        _self.ui.elements.recButton.hide();
                        _self.ui.elements.stopButton.fadeIn();
                        _self.vars.stateRecord = true;
                    }
                    else{
                        _self.ui.elements.statusStream.fadeOut();
                        _self.ui.elements.stopButton.hide();
                        _self.ui.elements.hourButton.hide();
                        _self.ui.elements.recButton.fadeIn();
                        _self.vars.stateRecord = false;
                    }
                }
            }
        },
    }
    window.mainStream = mainStream;
})(window);
