/**
 * ProntusPlayer.config 
 *
 * Descripcion
 * Objeto encargado de mantener las configuraciones de prontusPlayer.
 *
 * Dependencias (IMPORTANTE)
 * - jQuery 1.4.2 o superior.
 *
 */
(function(window) {
    var config = {
        version: "2.0.0",
        buildNumber: '20151007160100045',
        id: '',
        debug: false, //habilita los console cuando se esta seteada como true.
        contentId: 'prontusPlayer', // Id del Div que contiene el player.
        player: {
            domId: 'prontusPlayerVideoPlayer', // Id del Div que contiene el player.
            image: "",
            autoPlay: true,
            adEnable: false,
            forceSize: true,
            width: 640,
            height: 480,
            swf: "player/prontusPlayer.swf", // URl del player flash.
            fireUri: "prontusPlayer.PlayerFlash.events.fire", // URI de callbacks player flash.
            statsUri: "prontusPlayer.PlayerFlash.events.stats"// URI de callbacks player flash.
        },
        mediaSrc: {
            defaultSrc: "",
            onErrorSrc: ""
        },
        playerHtml5: {
            contentId: "prontusHTML5Player",
            videoId: "prontusPlayerVideo",
            playerContent: {
                contentId: "prontusPlayerContent",
                playArea: "prontusPlayArea",
                playButton: "prontusPlayButton"
            },
            controls: {
                contentId: 'prontusVideoControls',
                playButton: "prontusVideoPlay",
                pauseButton: "prontusVideoPauseButton",
                seekBar: 'prontusVideoSeek',
                fullScreen: 'prontusFullScreen',
                timeContent: 'prontusVideoTimer',
                volumeBox: "prontusVideoVolumeBox",
                volumenBar: "prontusVideoVolumeSlider",
                volumeButton: "prontusVideoVolumeButton",
                volumeButtonMute: "prontusVideoVolumeMute"
            }
        },
        ads: {
            adLanguage: "es",
            adInfoMsg: "La publicidad finaliza en __TIME__ segundos.",
            adsId: "ads",
            adContainer: "adContainer",
            adPlayButton: "adPlayButton",
            closeAds: "closeAds",
            adVideoTag: "",
            adBannerTag: "",
            adInfo: "adInfo",
            adInfoContent: "adInfoContent",
            adBannerInterval: 120000,
            overlayDelay: 10000,
            overlayAutoHideDelay: 20000
        },
        stats: {
            timeIntervalCounting: 60000, // tiempo en mili segundos para contar los eventos de reproduccion
            enable: false,
            timePlayed: 0,
            sst: {
                events: {
                    name: ["play", "pause", "seek", "timePlayed", "volumen", "mute", "unmute", "full", "nofull", "startPreRoll", "finishPreRoll"], // nombre de los eventos esto deben ser unicos ya que se validan con los eventos que emite el player
                    description: ["play", "pause", "seek", "timePlayed", "volumen", "mute", "unmute", "full", "nofull", "startPreRoll", "finishPreRoll"]// Descripcion de los eventos en caso de querer guardar una descripcion distinta por cada uno de los eventos
                },
                enable: false,
                id: "",
                title: "",
                section: "",
                topic: "",
                subTopic: "", // no se que es este parametro preguntar 
                ts: "",
                type: "art", // utilizado solo en las version 7 del sst
                mediaType: "-v",// -v= video -a=audio
                sendTimeCount:0
            },
            analytics: {
                events: {
                    name: ["play", "pause", "seek", "time", "volumen", "mute", "unmute", "full", "nofull", "startPreRoll", "finishPreRoll"], // nombre de los eventos esto deben ser unicos ya que se validan con los eventos que emite el player
                    description: ["play", "pause", "seek", "time", "volumen", "mute", "unmute", "full", "nofull", "startPreRoll", "finishPreRoll"]// Descripcion de los eventos en caso de querer guardar una descripcion distinta por cada uno de los eventos
                },
                enable: false,
                sendTimeCount:0
            }
        }
    };
    if (typeof (window.prontusPlayer) === "undefined") {
        window.prontusPlayer = {};
    }
    window.prontusPlayer.config = config;
})(window);/**
 * helper 1.0
 *
 * Descripcion
 * Objeto expone funciones basicas y comunes para las distintas clases.
 *
 * Dependencias (IMPORTANTE)
 * - jQuery 1.4.2 o superior.
 *
 * Control de Versiones
 * 1.0 - 17/01/2014 - PHL - Primera Version
 */
(function(window) {
    window.prontusPlayer.helper = {
        convertirFecha: function(epoch) {
            var date = new Date(epoch * 1000);
            //return this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
            return this.addZero(date.getDate()) + "/" + this.addZero(date.getMonth() + 1) + "/" + date.getFullYear() + " "
                    + this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
        },
        removeZero: function(string) {
            if (string.length > 1) {
                if (string.charAt(0) === "0") {
                    string = string.charAt(1);
                }
            }
            return string;
        },
        subWin: function (loc, nom, ancho, alto, posx, posy) {
            var thisposx = posx;
            var thisposy = posy;
            if ((typeof loc === 'undefined') || (loc === "")){
               return false;
            }

            var options = 'width=' + ancho + ',height=' + alto + ',scrollbars=1,resizable=1, toolbar=0,status=0,menubar=0,location=no,directories=0, top= '
                +thisposy+', left= '+thisposx;
            console.log("options "+options);
            var win = window.open(loc, nom, options);
            if(win) {
                win.focus();
            } else {
                alert('Debes habilitar las ventanas emergentes en tu navegador para acceder a esta funcionalidad.');
                return;
            }
            win.focus();
        },
        leadingZero: function(i) {
            var txt = i + '';
            if (txt.length < 2) {
                txt = '0' + txt;
            } else {
                if (txt.length === 4) {
                    txt = txt.substr(2, 2);
                }
            }
            return txt;
        },
        isEmpty: function(variable) {
            return (typeof (variable) === "undefined" || variable === null || variable === "");
        },
        isDefined: function(variable) {
            return (typeof (window[variable]) !== "undefined");
        },
        isObjectExist: function(variable) {
            return (typeof (variable) !== "undefined" && variable !== null);
        },
        parseBoolean: function(bool) {
            if (bool !== null) {
                switch (String(bool).toLowerCase()) {
                    case "true":
                    case "yes":
                    case "1":
                        return true;
                    case "false":
                    case "no":
                    case "0":
                        return false;
                    default:
                        undefined;
                }
            }
            return false;
        },
        log: function(msg) {
            if (prontusPlayer.helper.parseBoolean(prontusPlayer.config.debug)) {
                console.log(msg);
            }
        },
        error: function(msg) {
            if (prontusPlayer.helper.parseBoolean(prontusPlayer.config.debug)) {
                console.error(msg);
            }
        },
        formatTime: function(seconds) {
            var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
            var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
            return m + ":" + s;
        },
        uuid: function() {
            var uuid = "", i, random;
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += "-";
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }
            return uuid;
        },
        isMobilePlatform: function() {
            return (this.isPhone() || this.isIpad());
        },
        isPhone: function() {
            return (this.isIphone() ||
                    this.isAndroid() ||
                    this.isWindowsPhone());
        },
        isAndroid: function() {
            return navigator.userAgent.toLowerCase().indexOf('android') > -1;
        },
        isIphone: function() {
            return navigator.userAgent.match(/(iPod|iPhone)/);
        },
        isIpad: function() {
            return navigator.userAgent.match(/(iPad)/);
        },
        isWindowsPhone: function() {
            return navigator.userAgent.match(/(Windows Phone)/i);
        }
    };
})(window);/**
 * prontusPlayer.AdsController 1.0
 *
 * Descripcion
 * Objeto para manipular la publicidad.
 *
 * Dependencias (IMPORTANTE)
 * - jQuery 1.9.2 o superior.
 * - helper.js
 * - https://s0.2mdn.net/instream/html5/ima3.js
 * IMPORT
 * <script type="text/javascript" src="http://s0.2mdn.net/instream/html5/ima3.js"></script>
 *
 */

//(function(window) {
/**
 * 
 * @param {prontusPlayer.PlayerHTML5} player
 * @returns {undefined}
 */
prontusPlayer.AdsController = function(player) {
    this.player = player;
    $(this.player._getItemID_jq(this.getConfig().ads.adInfoContent)).hide();
    $(this.player._getItemID_jq(this.getConfig().ads.closeAds)).hide();

    this.adContainerElement =
            document.getElementById(this.player._getItemID(this.getConfig().ads.adContainer));

    this.videoContent =
            document.getElementById(this.player._getItemID(this.getConfig().playerHtml5.videoId));

    if (prontusPlayer.helper.isPhone()) {
        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerElement, this.videoContent);
    } else {
        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerElement);
    }

    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

    this.adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            this.bind(this, this._onAdsManagerLoaded),
            false);
    this.adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.bind(this, this._onAdError),
            false);

    if (prontusPlayer.helper.isPhone()) {
        this.resume();
        $(this.player._getItemID_jq(this.getConfig().ads.adsId)).hide();
    } else {
        $(this.player._getItemID_jq(this.getConfig().ads.adPlayButton)).on('click', this.bind(this, this._onPlayClick));
        $(this.player._getItemID_jq(this.getConfig().playerHtml5.playerContent.playButton)).hide();
        $(this.player._getItemID_jq(this.getConfig().ads.adInfoContent)).hide();
    }
    $(this.player._getItemID_jq(this.getConfig().ads.closeAds)).on('click', this.bind(this, this._onCloseClick));
};

prontusPlayer.AdsController.prototype.adsDone = false;
prontusPlayer.AdsController.prototype.adBannerEnable = false;
prontusPlayer.AdsController.prototype.adContainerElement = null;
prontusPlayer.AdsController.prototype.adDisplayContainer = null;
prontusPlayer.AdsController.prototype.videoContent = null;
prontusPlayer.AdsController.prototype.adsLoader = null;
prontusPlayer.AdsController.prototype.adsRequest = null;
prontusPlayer.AdsController.prototype.adsManager = null;
prontusPlayer.AdsController.prototype.bannerTimer = null;
prontusPlayer.AdsController.prototype.bannerAutohideTimeOut = null;
prontusPlayer.AdsController.prototype.remainingTimer = null;

prontusPlayer.AdsController.prototype.loadedMetadataCallback = null;

/**
 * Handlesr
 */

prontusPlayer.AdsController.prototype._onPlayClick = function() {
    this.resume();
    return false;
};

prontusPlayer.AdsController.prototype._onCloseClick = function() {
    $(this.player._getItemID_jq(this.getConfig().ads.adsId)).hide();
    return false;
}

prontusPlayer.AdsController.prototype._onAdsManagerLoaded = function(adsManagerLoadedEvent) {
    this.adsManager = adsManagerLoadedEvent.getAdsManager(this.videoContent);
    this.processAdsManager();
};

prontusPlayer.AdsController.prototype._onAdError = function(adErrorEvent) {
    this.resumeAfterAd();
    if (this.adsManager) {
        this.adsManager.destroy();
    }
    console.log(adErrorEvent.getError());
};

prontusPlayer.AdsController.prototype._onStarOverlay = function() {
    this.startOverlay();
};

prontusPlayer.AdsController.prototype._onShowOverlay = function() {
    this.showOverlay();
};

prontusPlayer.AdsController.prototype._onAutoHideOverlay = function() {
    $(this.player._getItemID_jq(this.getConfig().ads.adsId)).hide();
}

prontusPlayer.AdsController.prototype._onContentPauseRequested = function() {
    if (!prontusPlayer.helper.isPhone()) {
        this.player.pause();
    }
    this.player.hideControls();
};

prontusPlayer.AdsController.prototype._onContentResumeRequested = function() {
    this.resumeAfterAd();
};

prontusPlayer.AdsController.prototype._onRemainingTime = function() {
    var remainingTime = Math.max(1, Math.floor(this.adsManager.getRemainingTime()));
    $(this.player._getItemID_jq(this.getConfig().ads.adInfo)).html(this.getConfig().ads.adInfoMsg.replace("__TIME__", "" + remainingTime));
    if (remainingTime === 1) {
        clearInterval(this.remainingTimer);
    }
};

prontusPlayer.AdsController.prototype._onAdEvent = function(adEvent) {
// Recuperar el anuncio del evento. Algunos eventos (p. ej. ALL_ADS_COMPLETED)
// no cuentan con objetos de anuncios asociados.
    var ad = adEvent.getAd();
    switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            // Este es el primer evento enviado para un anuncio; es posible 
            // determinar si el anuncio es de vídeo o de superposición.
            if (!ad.isLinear()) {
                this.adBannerEnable = true;

                $(this.player._getItemID_jq(this.getConfig().ads.adsId)).width(ad.getWidth());
                $(this.player._getItemID_jq(this.getConfig().ads.adsId)).height(ad.getHeight());
                $(this.player._getItemID_jq(this.getConfig().ads.adsId)).css('top', ($("#" + this.getConfig().contentId).height() - ad.getHeight() - 20) + 'px');
                $(this.player._getItemID_jq(this.getConfig().ads.adsId)).css('left', ($("#" + this.getConfig().contentId).width() / 2 - ad.getWidth() / 2) + 'px');
                $(this.player._getItemID_jq(this.getConfig().ads.adsId)).show();

                $(this.player._getItemID_jq(this.getConfig().ads.closeAds)).show();

                this.adsManager.resize(ad.getWidth(), ad.getHeight(), google.ima.ViewMode.NORMAL);
//                        console.log(ad.getWidth()+"px");
//                        prontusPlayer.AdsController.adDisplayContainer.b.style.width=ad.getWidth()+"px";
//                        prontusPlayer.AdsController.adDisplayContainer.b.style.height=ad.getHeight()+"px";

            }
            break;
        case google.ima.AdEvent.Type.STARTED:
            // Este evento indica que el anuncio se ha iniciado; el reproductor de vídeo
            // puede ajustar la interfaz de usuario, por ejemplo, mostrar un botón de detención y
            // el tiempo restante.
            if (ad.isLinear()) {
                $(this.player._getItemID_jq(this.getConfig().ads.adInfoContent)).show();
                this.remainingTimer = setInterval(this.bind(this, this._onRemainingTime), 300);
            } else {

            }
            break;
        case google.ima.AdEvent.Type.CLICK:
            $(this.player._getItemID_jq(this.getConfig().ads.adPlayButton)).show();
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            this.resumeAfterAd();
            if (ad.isLinear()) {
                $(this.player._getItemID_jq(this.getConfig().ads.adInfoContent)).hide();
                if (this.remainingTimer !== null)
                    clearInterval(this.remainingTimer);
                if (this.getConfig().ads.adBannerTag !== "" && !this.adBannerEnable) {
                    setTimeout(this.bind(this, this._onStarOverlay), this.getConfig().ads.overlayDelay);
                }
            }
            break;
    }
};

/**
 * 
 * @param {prontusPlayer.AdsController} thisObj
 * @param {function} fn
 * @returns {function}
 */
prontusPlayer.AdsController.prototype.bind = function(thisObj, fn) {
    return function() {
        fn.apply(thisObj, arguments);
    };
};

prontusPlayer.AdsController.prototype.getConfig = function() {
    return this.player.config;
};

prontusPlayer.AdsController.prototype.init = function() {
    this.videoContent.removeAttribute('controls');
    this.videoContent.removeEventListener('loadedmetadata', this.loadedMetadataCallback, true);
    if (this.getConfig().ads.adVideoTag !== "") {
        this.requestAds(this.getConfig().ads.adVideoTag);
    } else if (this.getConfig().ads.adBannerTag !== "") {
        setTimeout(this.bind(this, this._onStarOverlay), this.getConfig().ads.overlayDelay);
    }
    this.player.hideControls();
    $(this.player._getItemID_jq(this.getConfig().ads.adsId)).show();
};

prontusPlayer.AdsController.prototype.startOverlay = function() {
    this.showOverlay();
    this.bannerTimer = setInterval(this.bind(this, this.showOverlay), this.getConfig().ads.adBannerInterval);
};

prontusPlayer.AdsController.prototype.showOverlay = function() {
    if (this.adBannerEnable) {
        $(this.player._getItemID_jq(this.getConfig().ads.adsId)).show();
    } else {
        this.requestAds(this.getConfig().ads.adBannerTag);
    }
    if (this.bannerAutohideTimeOut !== null) {
        clearTimeout(this.bannerAutohideTimeOut);
    }
    this.bannerAutohideTimeOut = setTimeout(this.bind(this, this._onAutoHideOverlay), this.getConfig().ads.overlayAutoHideDelay);
};

prontusPlayer.AdsController.prototype.initialUserAction = function() {
    // Inicializar el contenedor si se invoca requestAds en un acción del usuario.
    // Este paso solo es necesario en dispositivos con iOS o Android.
    this.adDisplayContainer.initialize();
};

prontusPlayer.AdsController.prototype.requestAds = function(adTagUrl) {
    // Solicitar anuncios de vídeo.
    this.adsRequest = new google.ima.AdsRequest();
    this.adsRequest.adTagUrl = adTagUrl;
    // Especificar tamaños de espacios para anuncios lineales y no lineales. Esto ayuda al SDK a 
    this.adsLoader.requestAds(this.adsRequest);
};

prontusPlayer.AdsController.prototype.processAdsManager = function() {
    // Añadir procesadores a los eventos obligatorios.
    this.adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.bind(this, this._onAdError));

    this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            this.bind(this, this._onContentPauseRequested));

    this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            this.bind(this, this._onContentResumeRequested));

    this.adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            this.bind(this, this._onAdEvent));
    // Procesar eventos adicionales (si resulta necesario).
    this.adsManager.addEventListener(
            google.ima.AdEvent.Type.LOADED,
            this.bind(this, this._onAdEvent));
    this.adsManager.addEventListener(
            google.ima.AdEvent.Type.STARTED,
            this.bind(this, this._onAdEvent));
    this.adsManager.addEventListener(
            google.ima.AdEvent.Type.COMPLETE,
            this.bind(this, this._onAdEvent));
    this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CLICK,
            this.bind(this, this._onAdEvent));
    try {
// Inicializar el administrador de anuncios. La lista de reproducción de reglas de anuncios se iniciará en este momento.
        this.adsManager.init($("#" + this.getConfig().contentId).width(), $("#" + this.getConfig().contentId).height(), google.ima.ViewMode.NORMAL);
        // Invocar el evento de reproducción para iniciar la visualización del anuncio. Los anuncios de vídeo y superposición únicos
        // se iniciarán en este momento; la invocación se ignorará para las reglas de anuncios.
        this.adsManager.start();
    } catch (adError) {
// Es posible que se genere un error si existe un problema con la respuesta de VAST.
    }
};

prontusPlayer.AdsController.prototype.resumeAfterAd = function() {
    if (prontusPlayer.helper.isPhone()) {
        this.player._setSrc(this.getConfig().mediaSrc.defaultSrc);
        this.player.load();
    }
    this.player.play();
    $(this.player._getItemID_jq(this.getConfig().ads.adsId)).hide();
    if (prontusPlayer.helper.isPhone()) {
        this.videoContent.setAttribute("controls", "controls");
    } else {
        this.player.showControls();
    }
};

prontusPlayer.AdsController.prototype.resume = function() {
    if (this.adsDone) {
        if (this.adsManager) {
            this.adsManager.resume();
            $(this.player._getItemID_jq(this.getConfig().ads.adPlayButton)).hide();
        }
    } else {
        this.initialUserAction();
        this.loadedMetadataCallback = this.bind(this, this.init);
        this.videoContent.addEventListener('loadedmetadata', this.loadedMetadataCallback, true);
        this.player.play();
        $(this.player._getItemID_jq(this.getConfig().ads.adPlayButton)).hide();
        this.adsDone = true;
    }
};

//})(window);
/**
 * prontusPlayer.statsController 
 *
 * Descripcion
 * Objeto para manipular los elementos de JanusMedia Player.
 * Define 3 objetos con ambitos privados y publicos en cada uno.
 * - prontusPlayer.helper: encapsula funciones estaticas genericas de uso compartido.
 * - prontusPlayer.mediaController.player: encargado de recibir y manipular todo lo relacionado con el player (flash).
 *
 * Dependencias (IMPORTANTE)
 * - jQuery 1.9 o superior.
 * 
 */

(function(window) {
    window.prontusPlayer.statsController = {};

    /**
     * Metodo encargado de registrar cada uno de los eventos
     * 
     * @param {String} event Nombre del evento a registrar
     * @param {prontusPlayer.config.stats} statsConfig define las configuraciones de las estadisticas
     * @param {Array} values parametros adicionales ya sea para Analytics o sst
     * @returns {void}
     */
    prontusPlayer.statsController.send = function(event, statsConfig, values) {
        if (prontusPlayer.helper.parseBoolean(statsConfig.enable)) {
            if (event === "timePlayed") {
                statsConfig.timePlayed += values;
            }

            if (event === "play" && !statsConfig.start) {
                event = "start";
                statsConfig.start = true;
            }

            if (prontusPlayer.helper.parseBoolean(statsConfig.sst.enable) && !prontusPlayer.helper.isEmpty(statsConfig.sst.events[event])) {
                prontusPlayer.statsController.sendSst(event, statsConfig);
            }
            if (prontusPlayer.helper.parseBoolean(statsConfig.analytics.enable) && !prontusPlayer.helper.isEmpty(statsConfig.analytics.events[event])) {
                prontusPlayer.statsController.sendAnalytics(statsConfig.analytics.events[event], statsConfig.analytics, values);
            }
        }
    };

    /**
     * Metodo encargado de manejar SST
     * @param {String} event Nombre del evento a registrar
     * @param {prontusPlayer.config.stats} statsConfig define las configuraciones de las estadisticas
     * @returns {void}
     */
    prontusPlayer.statsController.sendSst = function(event, statsConfig) {
        if (event === "timePlayed") {
            // 60000 corresponde a un minuto de reoriduccion ya que el sst solo cuenta de un minuto no se toma en cuenta 
            var tempCount = Math.floor(statsConfig.timePlayed / 60000);
            if (tempCount > statsConfig.sst.sendTimeCount) {
                statsConfig.sst.sendTimeCount = tempCount;
                //evento en duro ya que es el valor que se define en el sst 7 y 8
                event = "1min";
            } else {
                return;
            }
        } else {
            event = statsConfig.sst.events[event];
        }



        var path = ";";
        path += ['articulo', statsConfig.sst.section, statsConfig.sst.ts, 'video', event].join(";");

        if (prontusPlayer.helper.isEmpty(statsConfig.sst.section)) {
            statsConfig.sst.section = "sin_seccion";
        } else {
            statsConfig.sst.section = [statsConfig.sst.section, statsConfig.sst.topic, statsConfig.sst.subTopic].join(";");
        }

        if (prontusPlayer.helper.isDefined("sst7_click")) {
            sst7_click(statsConfig.sst.id, path, statsConfig.sst.title, statsConfig.sst.type);
        }

        if (prontusPlayer.helper.isDefined("sst8_click")) {
            sst8_click('vid', statsConfig.sst.ts + statsConfig.sst.mediaType + event, ';' + statsConfig.sst.section, statsConfig.sst.title);
        }
    };

    prontusPlayer.statsController.sendAnalytics = function(event, analyticsConfig) {
        if (prontusPlayer.helper.isDefined("ga")) {
            ga('send', 'event', 'Player', event);
        } else if (prontusPlayer.helper.isDefined("_gaq")) {
            _gaq.push(['_trackEvent', 'Player', event]);
        }
    };
})(window);//(function(prontusPlayer) {
/**
 * Constructor player
 * 
 * Dependencias importantes:
 *  jquery 1.9 o superior
 * 
 * @param {Object} config
 * @returns {void}
 * Control de Versiones
 * 1.0 - 19/02/2014 - PHL - Primera Version
 */

prontusPlayer.PlayerHTML5 = function(config) {
    this.config = config;
    this.playerId = config.id;
};

/**
 * Definicion de constantes
 * 
 * @type Boolean
 */
prontusPlayer.PlayerHTML5.prototype.timeOutMenu = 0;
prontusPlayer.PlayerHTML5.prototype.seeksliding = false;
prontusPlayer.PlayerHTML5.prototype.uiReady = false;

prontusPlayer.PlayerHTML5.prototype.bind = function(thisObj, fn) {
    return function() {
        fn.apply(thisObj, arguments);
    };
};

prontusPlayer.PlayerHTML5.prototype.install = function() {
    this.initPlayer();
    this._setControlsEvent();
};

prontusPlayer.PlayerHTML5.prototype.initPlayer = function() {
    this.initUI();
    this._setSrc(this.config.mediaSrc.defaultSrc);
};

prontusPlayer.PlayerHTML5.prototype.initUI = function() {
    if (this.config.player.image !== "") {
        $(this._getItemID_jq(this.config.playerHtml5.playerContent.playArea)).addClass("image");
        $(this._getItemID_jq(this.config.playerHtml5.playerContent.playArea)).css('background-image', 'url(' + this.config.player.image + ')');
    } else {
        $(this._getItemID_jq(this.config.playerHtml5.playerContent.playArea)).addClass("no-image");
    }

    if (!(prontusPlayer.helper.isPhone())) {
        this.createSeek();
        $(this._getItemID_jq(this.config.playerHtml5.controls.contentId)).hide();
    }
};

prontusPlayer.PlayerHTML5.prototype.createSeek = function(e) {
    var video = this._getVideo();
    if (video !== null && video.readyState) {
        var video_duration = video.duration;
        $(this._getItemID_jq(this.config.playerHtml5.controls.seekBar)).slider({
            value: 0,
            step: 0.01,
            orientation: "horizontal",
            range: "min",
            max: video_duration,
            animate: true,
            slide: this.bind(this,this._onSeeking),
            stop: this.bind(this,this._onSeek)
        });
        $(this._getItemID_jq(this.config.playerHtml5.controls.contentId)).show();
        this.uiReady = true;
    } else {
        setTimeout(this.bind(this, this.createSeek), 150);
    }
};

prontusPlayer.PlayerHTML5.prototype.hideControls = function() {
    $(this._getItemID_jq(this.config.playerHtml5.controls.contentId)).hide();
};

prontusPlayer.PlayerHTML5.prototype.showControls = function() {
    $(this._getItemID_jq(this.config.playerHtml5.controls.contentId)).show();
};

prontusPlayer.PlayerHTML5.prototype._getVideo = function() {
    return document.getElementById(this._getItemID(this.config.playerHtml5.videoId));
};

prontusPlayer.PlayerHTML5.prototype._setSrc = function(src) {
    this._getVideo().src = src;
};

prontusPlayer.PlayerHTML5.prototype._getCurSrc = function() {
    return this._getVideo().src;
};

prontusPlayer.PlayerHTML5.prototype._getItemID = function(name) {
    return name + "_" + this.playerId;
};

prontusPlayer.PlayerHTML5.prototype._getItemID_jq = function(name) {
    return "#" + name + "_" + this.playerId;
};

/**
 * Metodos para manejar los controles del player
 */
prontusPlayer.PlayerHTML5.prototype.togglePlayPause = function() {
    var video = this._getVideo();
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

prontusPlayer.PlayerHTML5.prototype.load = function() {
    this._getVideo().load();
};

prontusPlayer.PlayerHTML5.prototype.play = function() {
    this._getVideo().play();
};

prontusPlayer.PlayerHTML5.prototype.pause = function() {
    this._getVideo().pause();
};

prontusPlayer.PlayerHTML5.prototype.resetTimeToMenu = function() {
    $(this._getItemID_jq(this.config.playerHtml5.controls.container)).show("slide", {direction: "down"}, 600);
    clearTimeout(this.timeOutMenu);
    this.timeOutMenu = setTimeout(function() {
        $(this._getItemID_jq(this.config.playerHtml5.controls.container)).hide("slide", {direction: "down"}, 600);
    }, 2500);
};

prontusPlayer.PlayerHTML5.prototype.fullScreen = function() {
    if (this._getVideo().webkitSupportsFullscreen) {
        this._getVideo().webkitEnterFullscreen();
        return true;
    }
    return false;
};


/**
 * Definision de handlers
 */

/**
 * 
 * @param {event} event
 * @returns {void}
 */
prontusPlayer.PlayerHTML5.prototype._onTimeUpdate = function(event) {
    var currenttime = event.target.currentTime;
    if (!this.seeksliding && this.uiReady) {
        $(this._getItemID_jq(this.config.playerHtml5.controls.seekBar)).slider("value", currenttime);
    }
    $(this._getItemID_jq(this.config.playerHtml5.controls.timeContent)).text(prontusPlayer.helper.formatTime(currenttime));
};

/**
 * 
 * @param {event} event
 * @returns {void}
 */
prontusPlayer.PlayerHTML5.prototype._onError = function() {
    if (this._getCurSrc() !== this.config.mediaSrc.onErrorSrc) {
        this._setSrc(this.config.mediaSrc.onErrorSrc);
        this.load();
        this.play();
    }
}

/**
 * 
 * @returns {Boolean}
 */
prontusPlayer.PlayerHTML5.prototype._onFullScreen = function() {
    if (this._getVideo().webkitSupportsFullscreen) {
        this._getVideo().webkitEnterFullscreen();
        return true;
    }
    return false;
};

/**
 * 
 * @returns {void}
 */
prontusPlayer.PlayerHTML5.prototype._onEnded = function() {
    $(this._getItemID_jq(this.config.playerHtml5.controls.playButton)).removeClass(this.config.playerHtml5.controls.pauseButton);
};

/**
 * 
 * @returns {void}
 */
prontusPlayer.PlayerHTML5.prototype._onPause = function() {
    $(this._getItemID_jq(this.config.playerHtml5.controls.playButton)).removeClass(this.config.playerHtml5.controls.pauseButton);
    $(this._getItemID_jq(this.config.playerHtml5.playerContent.playButton)).show();
};

/**
 * 
 * @returns {void}
 */
prontusPlayer.PlayerHTML5.prototype._onPlaying = function() {
    $(this._getItemID_jq(this.config.playerHtml5.playerContent.playButton)).fadeOut(500);
    $(this._getItemID_jq(this.config.playerHtml5.playerContent.playArea)).hide();
};

/**
 * 
 * @returns {void}
 */
prontusPlayer.PlayerHTML5.prototype._onPlay = function() {
    $(this._getItemID_jq(this.config.playerHtml5.controls.playButton)).addClass(this.config.playerHtml5.controls.pauseButton);
};

prontusPlayer.PlayerHTML5.prototype._onSeek = function(e, ui) {
    this.seeksliding = false;
    var video = this._getVideo();
    video.currentTime = ui.value;
};

prontusPlayer.PlayerHTML5.prototype._onSeeking = function() {
    this.seeksliding = true;
};

prontusPlayer.PlayerHTML5.prototype._setControlsEvent = function() {
    var video = this._getVideo();

    video.addEventListener("error", this._onError, true);

    if (!(prontusPlayer.helper.isPhone())) {
        video.addEventListener("touchstart", this.bind(this, this.resetTimeToMenu), false);
        video.addEventListener("click", this.bind(this, this.resetTimeToMenu), false);

        video.addEventListener("ended", this.bind(this, this._onEnded));
        video.addEventListener("timeupdate", this.bind(this, this._onTimeUpdate));
        video.addEventListener("pause", this.bind(this, this._onPause, false));
        video.addEventListener("playing", this.bind(this, this._onPlaying, false));
        video.addEventListener("play", this.bind(this, this._onPlay));

        $([this._getItemID_jq(this.config.playerHtml5.controls.playButton),
            this._getItemID_jq(this.config.playerHtml5.controls.pauseButton),
            this._getItemID_jq(this.config.playerHtml5.playerContent.playButton),
            this._getItemID_jq(this.config.playerHtml5.playerContent.playArea)].join()).on("click", this.bind(this, this.togglePlayPause));

        $(this._getItemID_jq(this.config.playerHtml5.controls.btnFullStream)).on("click", this.bind(this, this._onFullScreen));
        video.removeAttribute("controls");
    } else {
        $(this._getItemID_jq(this.config.playerHtml5.controls.contentId)).remove();
        $(this._getItemID_jq(this.config.playerHtml5.playerContent.contentId)).remove();
        $(this._getItemID_jq(this.config.playerHtml5.playerContent.contentId)).hide();
        video.setAttribute("controls", "controls");
    }
};
//})(prontusPlayer);//(function(prontusPlayer) {
/**
 * Constructor player
 * 
 * Dependencias importantes:
 *  jquery 1.9 o superior
 * 
 * @param {Object} config
 * @returns {void}
 * Control de Versiones
 * 1.0 - 19/02/2014 - PHL - Primera Version
 */
prontusPlayer.PlayerFlash = function(config) {
    this.config = config;
    this.playerId = 'prontusPlayer_' + config.id;
};

/**
 * Declaracion de objeto estatico
 *  para manejar los eventos del player
 * 
 */

prontusPlayer.PlayerFlash.events = {
// Declaramos un arreglo para almacenar los callbacks de usuario
// Estos seran ejecutados una vez flash de la orden desde prontusPlayer.PlayerFlash.events.fire
    eventCallbacks: [],
    /**
     * Metodo encargado de manejar las acciones del player.
     * 
     * @param {String} id
     * @param {String} event
     * @param {object} values
     * @returns {void}
     */
    stats: function(id, event, values) {
        if (prontusPlayer.helper.isObjectExist(prontusPlayer.statsController)) {
            var configID = "config_" + id;
            prontusPlayer.statsController.send(event, prontusPlayer[configID].stats, values);
        }
    },
    /**
     * Metodo que ejecutara los callbacks registrados
     * 
     * @param {String} id
     * @param {String} event
     * @param {object} data
     * @returns {void}
     */
    fire: function(id, event, data) {
        if (!event)
            return;
        for (var i = 0; i < this.eventCallbacks.length; i++) {
            if (id === this.eventCallbacks[i].player.getId() && event === this.eventCallbacks[i].event) {
                this.eventCallbacks[i].callback.apply(this, [this.eventCallbacks[i].player, data]);
            }
        }
    },
    /**
     * Registra los callbacks
     * 
     * @param {prontusPlayer.PlayerFlash} playerFlash
     * @param {String} event
     * @param {object} data
     * @returns {Boolean}
     */
    bind: function(playerFlash, event, fnCallback) {
        if (!event)
            return false;
        if (fnCallback) {
            this.eventCallbacks.push({
                player: playerFlash,
                event: event,
                callback: fnCallback
            });
            return true;
        }
        return false;
    }
};
/**
 * Definicion de constantes
 * 
 * @type Boolean
 */
prontusPlayer.PlayerFlash.prototype.installed = false;
prontusPlayer.PlayerFlash.prototype.isReady = false;

/**
 * Instala e inicializa el player
 * 
 * @returns {void}
 */
prontusPlayer.PlayerFlash.prototype.install = function() {
    if ($('#' + this.config.contentId) !== null) {
        $('#' + this.config.contentId).append('<div id="' + this.config.player.domId + "_" + this.config.id + '" class="' + this.config.player.domId + '"></div>');
        var flashVar = ["fireURI=", this.config.player.fireUri,
            "&statsURI=", this.config.player.statsUri, "&playerId=", this.getId()].join("");
        $('#' + this.config.player.domId + "_" + this.config.id).append(this.createFlashObject(this.config.player.swf, this.playerId, flashVar));
        this.installed = true;
        // Se registran algunos metodos necesarios
        this.setFlashCallbacks();
    } else {
        throw new Error();
    }
};
/**
 * 
 * @param {String} movieUrl
 * @param {String} id
 * @returns {String}
 */
prontusPlayer.PlayerFlash.prototype.createFlashObject = function(movieUrl, id, flashvars) {
    movieUrl = movieUrl + '?' + flashvars;
    return ['<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"',
        ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0"',
        ' width="100%"  height="100%"  id="', id, '"  align="middle">',
        '<param name="allowScriptAccess" value="always" />',
        '<param name="allowFullScreen" value="true" />',
        '<param name="movie" value="', movieUrl, '" />',
        '<param name="quality" value="high" />',
        '<param name="bgcolor" value="#000" />',
        '<param name="WMODE" value="opaque"/>',
        '<param name="flashvars" value="' + flashvars + '" />',
        '<embed src="', movieUrl, '" quality="high" bgcolor="#000"',
        ' width="100%" height="100%" name="', id, '" align="middle"',
        ' allowScriptAccess="always"',
        ' allowFullScreen="true"',
        ' type="application/x-shockwave-flash"',
        ' pluginspage="http://www.macromedia.com/go/getflashplayer"',
        ' wmode="opaque"',
        ' flashvars="', flashvars,
        '" /></object>'].join("");
};
/**
 * Permite saber si esta instalado o no el player 
 * 
 * @returns {Boolean}
 */
prontusPlayer.PlayerFlash.prototype.isInstalled = function() {
    if (!this.installed) {
        throw new Error();
    }
    return this.installed;
};
/**
 * Permite obtener el id de la instancia del player 
 * 
 * @returns {String}
 */
prontusPlayer.PlayerFlash.prototype.getId = function() {
    return this.config.id;
};
/**
 * Permite obtener el nombre del objeto flash instanciado
 * 
 * 
 * @param {String} movieName
 * @returns {object}
 */

prontusPlayer.PlayerFlash.prototype.getMovie = function() {
    if (this.isInstalled()) {
        if (navigator.appName.indexOf("Microsoft") !== -1) {
            var object = window[this.playerId];
            if (object.length > 1)
                return object[0];
            else
                return object;
        }
        else {
            return document[this.playerId];
        }
    }
};
/**
 * Inicializa el player 
 * 
 * @returns {boolean}
 */
prontusPlayer.PlayerFlash.prototype.initPlayer = function() {
    if (this.isReady) {

        this.getMovie().setConfig(this.config);
        return true;
    }
    return false;
};
/**
 * Permite pausar el video
 * 
 * @returns {boolean}
 */
prontusPlayer.PlayerFlash.prototype.pause = function() {
    if (this.isReady) {
        this.getMovie().pause();
        return true;
    }
    return false;
};
/**
 * Permite reanudar el video
 * 
 * @returns {boolean}
 */
prontusPlayer.PlayerFlash.prototype.play = function() {
    if (this.isReady) {
        this.getMovie().play();
        return true;
    }
    return false;
};
/**
 * Inicializa los callback de los eventos del player
 * 
 * @returns {void}
 */
prontusPlayer.PlayerFlash.prototype.setFlashCallbacks = function() {
    prontusPlayer.PlayerFlash.events.bind(this, 'ready', function(player) {
        player.isReady = true;
        player.initPlayer();

    });
    prontusPlayer.PlayerFlash.events.bind(this, 'fbBtnClick', function(player) {
        console.log("fbBtnClick ");
        prontusPlayer.helper.subWin("http://www.facebook.com/share.php?u="+player.config.share.shareUrl, "compartirredes" , 600, 400, 200, 200);
    });
    prontusPlayer.PlayerFlash.events.bind(this, 'twBtnClick', function(player) {
        console.log("twBtnClick");
        prontusPlayer.helper.subWin("http://twitter.com/home?status= "+player.config.share.shareUrl, "compartirredes" , 600, 400, 200, 200);
    });
    prontusPlayer.PlayerFlash.events.bind(this, 'gpBtnClick', function(player) {
        console.log("gpBtnClick");
        prontusPlayer.helper.subWin("https://plus.google.com/share?url="+player.config.share.shareUrl, "compartirredes" , 600, 400, 200, 200);
    });
    prontusPlayer.PlayerFlash.events.bind(this, 'adsFinish', function() {
        
    });
};
//})(prontusPlayer);
/**
 * prontusPlayer.playlist
 *
 * Descripcion
 * Objeto para manipular las listas de video.
 *
 * Dependencias (IMPORTANTE)
 * - jQuery 1.9.2 o superior.
 * - helper.js
 *
 */

(function(window) {
    window.prontusPlayer.playList = {
        defaultOptions: {
        },
        configList: [],
        install: function(defaultConfig, configList, options) {//{description:"",mediaSrc:"",image:""}        
            prontusPlayer.playList.configList = configList;
            prontusPlayer.playList.initUI(defaultConfig.contentId);
            prontusPlayer.playList.setEvents();
            defaultConfig.contentId = "playListVideoContent";
            prontusPlayer.mediaController.setDefaultConfig(defaultConfig);
            prontusPlayer.playList.initVideoByID(0);
        },
        initUI: function(contentID) {
            var html = '<div class="prontusListContainer"><ul>';
            for (var i = 0; i < prontusPlayer.playList.configList.length; i++) {
                html += '<li><a id="selecProntusVideo_' + i + '" class="selecProntusVideo">' + prontusPlayer.playList.configList[i].description + '</a></li>';
            }
            html += '</ul> <div id="playListVideoContent"></div></div>';
            $("#" + contentID).append(html);
        },
        setEvents: function() {
            $(".selecProntusVideo").on('click', function(event) {
                var id = event.target.id.split("_")[1];
                prontusPlayer.playList.initVideoByID(id);
            });
        },
        initVideoByID: function(id) {
            var tempConfig = {
                contentId: 'playListVideoContent',
                player: {
                    image: prontusPlayer.playList.configList[id].image
                },
                mediaSrc: {
                    defaultSrc: prontusPlayer.playList.configList[id].mediaSrc
                }
            };
            prontusPlayer.mediaController.cleanAndInstall(tempConfig);
        }
    };
})(window);/**
 * prontusPlayer.mediaController 
 *
 * Descripcion
 * Objeto para manipular los elementos de JanusMedia Player.
 * Define 3 objetos con ambitos privados y publicos en cada uno.
 * - prontusPlayer.helper: encapsula funciones estaticas genericas de uso compartido.
 * - prontusPlayer.mediaController.player: encargado de recibir y manipular todo lo relacionado con el player (flash).
 *
 * Dependencias (IMPORTANTE)
 * - jQuery 1.4.2 o superior.
 * 
 */

(function(window) {
    window.prontusPlayer.mediaController = {};

    window.prontusPlayer.mediaController.countInstance = 0;

    prontusPlayer.mediaController.setDefaultConfig = function(defaultConfig) {
        $.extend(true, prontusPlayer.config, defaultConfig);
    };

    prontusPlayer.mediaController.cleanAndInstall = function(startConfig) {
        $("#" + startConfig.contentId).empty();
        prontusPlayer.mediaController.install(startConfig);
    };

    prontusPlayer.mediaController.install = function(startConfig) {
        startConfig.id = "" + new Date().getTime() + (++prontusPlayer.mediaController.countInstance);
        var configID = "config_" + startConfig.id;
        prontusPlayer[configID] = $.extend(true, {}, prontusPlayer.config, startConfig);

        if (prontusPlayer.helper.parseBoolean(prontusPlayer[configID].player.forceSize)) {
            $("#" + prontusPlayer[configID].contentId).width(prontusPlayer[configID].player.width);
            $("#" + prontusPlayer[configID].contentId).height(prontusPlayer[configID].player.height);
        }

        if (prontusPlayer.helper.isMobilePlatform()) {
            var playerID = prontusPlayer[configID].id;
            var html =
                    '<div id="' + prontusPlayer[configID].playerHtml5.contentId + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.contentId + ' simpledark">\n\
                <video id="' + prontusPlayer[configID].playerHtml5.videoId + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.videoId + '" preload="none" webkit-playsinline > </video>\n\
                <div id="' + prontusPlayer[configID].playerHtml5.playerContent.contentId + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.playerContent.contentId + '">\n\
                    <div id="' + prontusPlayer[configID].playerHtml5.playerContent.playArea + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.playerContent.playArea + '"> </div>\n\
                    <div id="' + prontusPlayer[configID].playerHtml5.playerContent.playButton + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.playerContent.playButton + '">\n\
                        <div class="playIcon"></div>\n\
                    </div>\n\
                </div>\n\
                <div id="' + prontusPlayer[configID].playerHtml5.controls.contentId + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.controls.contentId + '">\n\
                    <a id="' + prontusPlayer[configID].playerHtml5.controls.playButton + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.controls.playButton + '" title="Play/Pause"></a>\n\
                    <div id="' + prontusPlayer[configID].playerHtml5.controls.timeContent + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.controls.timeContent + '">00:00</div>\n\
                    <div class="prontusSeekContainer">\n\
                        <div id="' + prontusPlayer[configID].playerHtml5.controls.seekBar + '_' + playerID + '" class="' + prontusPlayer[configID].playerHtml5.controls.seekBar + '"></div>\n\
                    </div>\n\
                </div>\n\
                <div id="' + prontusPlayer[configID].ads.adsId + '_' + playerID + '" class="' + prontusPlayer[configID].ads.adsId + '">\n\
                    <div id="' + prontusPlayer[configID].ads.adContainer + '_' + playerID + '" class="' + prontusPlayer[configID].ads.adContainer + '">\n\
                    </div>\n\
                    <div id="' + prontusPlayer[configID].ads.adPlayButton + '_' + playerID + '" class="' + prontusPlayer[configID].ads.adPlayButton + '">\n\
                        <div class="playIcon"></div>\n\
                    </div>\n\
                    <div id="' + prontusPlayer[configID].ads.adInfoContent + '_' + playerID + '" class="' + prontusPlayer[configID].ads.adInfoContent + '"><p id="' + prontusPlayer[configID].ads.adInfo + '_' + playerID + '" class="' + prontusPlayer[configID].ads.adInfo + '"></p></div>\n\
                    <div id="' + prontusPlayer[configID].ads.closeAds + '_' + playerID + '" class="' + prontusPlayer[configID].ads.closeAds + '"> </div>\n\
                </div>\n\
             </div>';
            $("#" + prontusPlayer[configID].contentId).append(html);
            var player = new prontusPlayer.PlayerHTML5(prontusPlayer[configID]);
            if (prontusPlayer.helper.parseBoolean(prontusPlayer[configID].player.adEnable) && (prontusPlayer[configID].ads.adVideoTag.trim() !== "" || prontusPlayer[configID].ads.adBannerTag.trim() !== "")) {
                new prontusPlayer.AdsController(player);
            } else {
                $("#" + prontusPlayer[configID].ads.adsId + '_' + playerID).remove();
            }
            player.install();
        } else {
            new prontusPlayer.PlayerFlash(prontusPlayer[configID]).install();
        }
    };
})(window);