<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
/* Datos de conexión a MySQL */
$db_database = 'sensores';
$db_hostname = 'localhost';
//$db_username = 'user';
//$db_password = 'pass';
$db_username = 'root';
$db_password = '';
// Creación del objeto mysqli

// Conectar a la base de datos
$mysqli = new mysqli($db_hostname, $db_username, $db_password, $db_database);

// Buscamos posibles errores en la conexión
if (mysqli_connect_errno()) {
	$response = array('error' => "Falló la conexión: ".mysqli_connect_error());
    exit();

}else{
	// Realizar una consulta MySQL
	$query = 'SELECT * FROM valores limit 1'; // ORDER BY fecha (siempre obtener el último)
	$result = $mysqli->query($query);
	$response = $result->fetch_assoc();
	//var_dump($response);
	// Cerrar la conexión/
	$result->free();
	$mysqli->close();
}

/*	
	//si hay conexión con la base de datos, la consulta devuelve una tupla en forma de arreglo (que se guarda en $response), donde cada item es una columna de la tupla:
	// debido a eso es que los datos que se muestran en index.php (linea 52-54 y 119-121) deben renombrarse de ser necesario.
	$response = array(
		'temperatura' 	=> rand(0,200),
		'humedad' 		=> rand(0,200),
		'presion'		=> rand(0,200)
	);
*/

echo json_encode($response);
?>