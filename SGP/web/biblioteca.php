
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
    <head>
        <title>Sistema</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <?php include '_include_heads.html'; ?>
    </head>
    <body>
        <div class="container">            
            <div class="header">
                <nav>
                    <ul class="nav pull-right nav-menu">
                        <li class="active grey"><a href="index.php" class="large-button">Home</a></li>
                        <li class="blue"><a href="#" class="large-button">Biblioteca</a></li>
                    </ul>
                </nav>
                <h2 class="text-muted">Sistema Hydroid</h2>
                <h4 class="text-muted" style="padding-left: 90px;">Mar Dinámica</h4>
            </div>
            <div class="container">
            <!-- Example row of columns -->
                <div id="content-biblioteca" class="row">
                    
                </div>
                <hr>
                <footer class="footer">
                    <p>© Company 2015</p>
                </footer>
            </div>
        </div>
        <script>
            $(document).ready(function () {
                biblioteca.init();
            });
        </script>

    </body>
</html>
