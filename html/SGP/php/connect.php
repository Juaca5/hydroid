<?php
/*$servername = "127.0.0.1";
$username = "root";
$password = "stream");
$dbname = "datos";
*//*try{
	$conn = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
	$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	echo "Connected succesfully";
}catch(PDOException $e){
	echo "Connection failed: " . $e->getMessage();
}*/
/*
$conn = mysqli_connect($servername,$username,$password,$dbname);
if (!$conn){
	die("connection failed: ". mysqli_connect_error());
}*/
header('Content-Type: application/json');
$pathSubtitulos = "/home/stream/Escritorio/biblioteca/temp/subtitulosVideo.txt";
$pdo=new PDO("mysql:dbname=sensores;host=127.0.0.1","root","stream");
// Buscar Último Dato
$timestamp = '2018-01-17 11:24:00';
$statement=$pdo->prepare("SELECT * FROM `datos` WHERE `timestamp` >= '$timestamp'");
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$pdo = null;
		try{
	        $file = fopen($pathSubtitulos,"w+");
	       	fwrite($file, $json);
	       	fclose($file);
	  	}catch(Exception $e){
	       	echo ("error $e");
	   	}

?>