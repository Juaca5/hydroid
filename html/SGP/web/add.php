
<?php
// Conectando, seleccionando la base de datos
/*
* Datos de conexión a MySQL
*/
$db_database = 'sensores';
$db_hostname = 'localhost';
$db_username = 'user';
$db_password = 'pass';

/*
* Creación del objeto mysqli
*/
$mysqli = new mysqli($db_hostname, $db_username, $db_password, $db_database);

/*
* Buscamos posibles errores en la conexión
*/
if (mysqli_connect_errno()) {
    printf("Falló la conexión: %s\n", mysqli_connect_error());
    exit();
}
// Realizar una consulta MySQL

$query = 'SELECT * FROM valores ';
$result = $mysqli->query($query);

// Mostrar Datos
while ($producto = $result->fetch_assoc()) {

    echo '<li class="active green"><a href="#" class="large-button">Temp:'.$producto["valor"].'°</a></li>';

    echo '<li class="active green"><a href="#" class="large-button">Presion:'.$producto["valor"].'</a></li>';

    echo '<li class="active green"><a href="#" class="large-button">Presion:'.$producto["valor"].'</a></li>';
}
// Cerrar la conexión
$result->free();
$mysqli->close();
?>
