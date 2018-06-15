<?php
if(isset($_GET["LED"])){
	echo json_encode('arduino ha encendido la luz '.$_GET["LED"]);
}else{
	echo json_encode('no se cual luz encender!');
}
?>