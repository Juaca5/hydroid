
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!-- Headers html -->

<!-- /Header html -->

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Sistema</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<!-- codigo añadido -->
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript">
  setInterval( refreshDatos, 500 );
  var inRequest = false;
  function refreshDatos() {
    if ( inRequest ) {
      return false;
    }
    inRequest = true;
    var load = $.get('add.php');
   // $(".Datos").html('Refreshing');
    load.error(function() {
      console.log( "Error" );
      // do something here if request failed
    });
    load.success(function( res ) {
      //console.log( "Success" );
      $(".nav2").html(res);
    });
    load.done(function() {
      //console.log( "Completed" );
      inRequest = false;
    });
  }
</script>

    <!-- Lineas agragadas -->
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />

        <?php include '_include_heads.html'; ?>
        
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 class="text-muted">Sistema Hydroid</h2>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <nav>
                        <ul class="nav sidebar">
                            <li class="active blue"><a href="#" class="large-button">Home</a></li>
                            <li class="active grey"><a href="biblioteca.php" class="large-button">Biblioteca</a></li>
                            <!-- Sensores-->
                        </ul>
                        <ul class=nav2>
                            <li class="active green"><a href="#" class="large-button">Temp.  : </a></li>
                            <li class="active green"><a href="#" class="large-button">Brujula: </a></li>
                            <li class="active green"><a href="#" class="large-button">Presion:</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-md-9">
                    <div id="container">
                        <div id="status">
                            <ul>
                                <li id="statusConnection" class="grey">No Conectado</li>
                                <li id="statusStream" class="red" style="display:none;">Grabando</li>
                            </ul>
                        </div>
                        <!--contenerdor de Streaming -->
                        <div id="stream_container" class="player-container grey">
                            <div id="prontusPlayer"></div>
                        </div>
                        <!-- ./Contenedor de Streaming -->
                        <button id="recButton" type="button" class="btn btn-danger btn-lg pull-right" style="display:none;">
                            <span class="glyphicon glyphicon-record" aria-hidden="true"></span>
                            Iniciar grabación
                        </button>
                        <button id="stopButton" type="button" class="btn btn-danger btn-lg pull-right" style="display:none;">
                            <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
                            Detener grabación
                        </button>
                        <button id="hourButton" type="button" class="btn btn-danger btn-lg pull-right" disabled style="display:none;">
                            <span class="glyphicon glyphicon-hourglass" aria-hidden="true"></span>
                            Procesando...
                        </button>
                    </div>
                </div>
		<!-- agregado sensor -->
			<div id="Medidores" ></div>

            </div>

            <footer class="footer">
                <p>Mardinamica © Company 2015</p>
            </footer>
        </div>
        <div class="Datos"></div>

        <script>
            $(document).ready(function () {
                mainStream.init();
            });
        </script>

    </body>
</html>
