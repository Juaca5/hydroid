<?php
	function StateRecord(){
		$proceso ="rtmpdump";
		$pid=exec("pidof $proceso");
		if($pid ==null || $pid == '') {
			$array = array('record' => 'false');
			echo json_encode($array);
		}
		else{
			$array = array('record' => 'true');
			echo json_encode($array);
		}
	}
	StateRecord();
?>