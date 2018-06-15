<?php
	// Escritura subtitulos PHP
	//require_once('connect.php');
	// Escritura subtitulos PHP
	$proceso = "rtmpdump";
	$pathNameVideo = $_SERVER['DOCUMENT_ROOT']."/biblioteca/temp/nameVideo.txt";
	$pathSubtitulos = $_SERVER['DOCUMENT_ROOT']."/biblioteca/temp/subtitulosVideo.txt";
	$pid=exec("pidof $proceso");

	if(strcmp($_GET["action"],"start") == 0){

		// DROP table 
		dropTableValores();

		//system("python /var/www/html/SGP/web/py/chat_client.py 127.0.0.1 9009 stream &");
		if($pid ==null || $pid == '') {
			$hoy=getdate();
			$nameVideo = "$hoy[year]-$hoy[mon]-$hoy[mday]-_$hoy[hours]-$hoy[minutes]-$hoy[seconds].mp4";
			try{
	        	$file = fopen($pathNameVideo,"w+");
	        	fwrite($file, $nameVideo);
	        	fclose($file);
	      	}
	      	catch(Exception $e){
	        	echo ("error $e");
	      	}
			system("echo 'stream' | sudo -u stream -S ./start_rtmpdump.sh $nameVideo >/dev/null 2>/dev/null &");
			$resp = array('record' => "true");
			echo(json_encode($resp));
			
		}
		else{
			$resp = array('record' => "Ya se encuentra un proceso");
			echo(json_encode($resp));
		}
	}
	elseif(strcmp($_GET["action"],"stop") == 0){
		if($pid ==null || $pid == '') {
			echo("No existe proceso");
		}
		else{
			system("echo 'stream' | sudo -u stream -S kill -s SIGTERM -9 $pid");
			if (file_exists($pathNameVideo)){
				try{
		        	$file = fopen($pathNameVideo,"r");
		        	$nameVideo = fgets($file);
		        	fclose($file);
		      	}
		      	catch(Exception $e){
		        	echo "error $e";
		      	}	
			}
			sleep(5);
			system("echo 'Y' | /home/stream/bin/ffmpeg -i ".$_SERVER['DOCUMENT_ROOT']."/biblioteca/temp/$nameVideo -vcodec copy ".$_SERVER['DOCUMENT_ROOT']."/biblioteca/$nameVideo >/dev/null 2>/dev/null &");
			sleep(5);
			$resprm = unlink($_SERVER['DOCUMENT_ROOT']."/biblioteca/temp/".$nameVideo);
			$resp = array('record' => "false", 'temparch' => $resprm);
			echo (json_encode($resp));

			//include('connect.php');
			subtitulos($nameVideo,$pathSubtitulos);
			//Escritura subtitulos PHP
		}
	}
	else{
		echo "Opción invalida $QUERY_STRING";
	}
	
	function subtitulos($nombreVideo,$pathSubtitulo){	
		$pdo=new PDO("mysql:dbname=sensores;host=127.0.0.1","root","stream");
		// Buscar Último Dato
		$timestamp = '2018-01-17 11:24:00';
		$statement=$pdo->prepare("SELECT * FROM `datos`");
		//$statement=$pdo->prepare("SELECT * FROM `datos` WHERE `timestamp` >= '$timestamp'");
		$statement->execute();
		$results=$statement->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		//echo $json;
		$statement=$pdo->prepare("TRUNCATE TABLE `datos`");
		$statement->execute();
		$pdo = null;
		try{
	        $file = fopen($pathSubtitulo,"w+");
	       	//fwrite($file, $json);
		$iterador = json_decode($json);
		$contador = 0;
		$contador5 = 5;
		foreach($iterador as $subtitulo)  {
			if ($contador > 0)
				fwrite($file,"\n");
			fwrite($file,$subtitulo->id."\n");
			//fwrite($file,"1"." --> "."2 \n");
			fwrite($file, "".date( "H:i:s", strtotime( "00:00:00 +{$contador}  seconds" )).""." --> ".(date( "H:i:s", strtotime( "00:00:00 +{$contador5}  seconds" ))).""."\n");
			fwrite($file, "presion: ".$subtitulo->presion."\t"."temperatura: ".$subtitulo->temperatura."\t"."oxigeno: ".$subtitulo->oxigeno."\t"."compass: ".$subtitulo->compass."\n");
			$contador+=5;
			$contador5+=5;
		}
	       	fclose($file);
	  	}catch(Exception $e){
	       	echo ("error $e");
	   	}
	}


	function dropTableValores(){
		$db_database = 'sensores';
		$db_hostname = 'localhost';
		//$db_username = 'user';
		//$db_password = 'pass';
		$db_username = 'root';
		$db_password = '';
		// Conectar a la base de datos
		$mysqli = new mysqli($db_hostname, $db_username, $db_password, $db_database);

		// Buscamos posibles errores en la conexión
		if (mysqli_connect_errno()) {
		    exit();
		}else{
			// Realizar una consulta MySQL
			$query = 'DELETE FROM valores WHERE 1'; // borrar todo
			$result = $mysqli->query($query);
			$result->free();
			$mysqli->close();
		}
	}


?>
