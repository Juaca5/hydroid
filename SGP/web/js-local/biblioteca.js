(function (window) {
    var _self = null;
    var biblioteca = {
        /**
         * Contiene las variables de nuestro modulo.
         * 
         */
        config:{ 
            //rtmpHost: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
	        //rtmpHost: "rtmp://190.21.9.126:1935/hls/movie",
            //backState: "../../system_state_back.json",
            updateJsonBiblio: "../php/mp4reader/readerBiblioteca.php",
            jsonBliblio: "../biblioteca/biblioteca.json",
        },
        vars: {
            dataJson: undefined,
        },
        templates: {
            biblioteca: '{{#videoset}}'+
                        '<div class="col-md-4">'+
                        '<h2>{{name}}</h2>'+
                        '<img src="" width="100%" height="200px">'+
                        '<p>Duración: {{duration}}</p>'+
                        '<p><a class="videolink btn btn-default full-button" href="{{path}}" data-title="{{name}}" role="button">Reproducir</a></p>'+
                        '</div>'+
                        '{{/videoset}}',
        },
        init: function (){
            _self = this;
	    _self.actions.updateJsonBiblio();
            _self.ui.getElements();
            _self.ui.setEvents();
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
                contentBiblioteca: undefined,
                
            },
            setEvents: function () {
                //_self.ui.elements.actions.click(_self.ui.handlers.onActionClick);
                //eventos del menu
                //$commentList.click(callback)
            },
            getElements: function () {
                _self.ui.elements.contentBiblioteca = $('#content-biblioteca');
            },
            /**
             * Objeto encargado de definir las acciones del modulo.
             */
            handlers: {
                
            },
        },
        /**
         * Objeto encargado de definir las acciones del modulo.
         */
        actions: {
            getJsonBliblio: function(){
                $.ajax({
                    url: _self.config.jsonBliblio,
                    dataType: 'json',
                    cache: false,
                    success: function(data){
                        _self.actions.renderBiblioteca(data);
                    },
                    error: function(e){
                        console.log(e);
                    }
                });
            },
            renderBiblioteca: function(data){
                var content = Mustache.render(_self.templates.biblioteca,  {videoset: data});
                _self.ui.elements.contentBiblioteca.html(content);
                $('.videolink').colorbox({
                    html: function(){
                        return '<video width="640" height="360" class="video-box" controls><source src="'+ $(this).attr('href')+ '" type="video/mp4"></video>';
                    },
                    title: function(){
                        return $(this).data('title');
                    }
                });

            },
	    updateJsonBiblio: function(){
                $.ajax({
                    url: _self.config.updateJsonBiblio,
                    type: 'GET',
                    cache: false,
                    success: function (data){
                        _self.actions.getJsonBliblio();
                    },
                    error: function(e){
                        console.log(e);
			_self.actions.getJsonBliblio();
                    }
                });
            }
        },
        /**
         * Objeto encargado de definir las acciones del modulo.
         */
        callbacks: {
            
        },
    }
    window.biblioteca = biblioteca;
})(window);
