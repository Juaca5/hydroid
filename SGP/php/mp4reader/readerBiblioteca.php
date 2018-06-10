<?php

// include getID3() library (can be in a different directory if full path is specified)
require_once('getid3/getid3.php');
$archivo = $_SERVER['DOCUMENT_ROOT']."/biblioteca/biblioteca.json";

function endswith($string, $test) {
    $strlen = strlen($string);
    $testlen = strlen($test);
    if ($testlen > $strlen)
        return false;
    return substr_compare($string, $test, $strlen - $testlen, $testlen) === 0;
}

// Initialize getID3 engine
$getID3 = new getID3;

$ruta = "../../biblioteca/";
$count = 0;

if (is_dir($ruta)) {
    if ($dh = opendir($ruta)) {
        while (($file = readdir($dh)) !== false) {
            if (endswith($file, ".mp4")) {
                $count++;
                $ThisFileInfo = $getID3->analyze($ruta . $file);
                getid3_lib::CopyTagsToComments($ThisFileInfo);
                $temp= new stdClass();
                $temp->name=$file;
                $temp->path= substr($ruta,3).$file;
                $temp->duration=$ThisFileInfo['playtime_string'];
                $temp->id=$count;
                $filesMp4[] = $temp;
            }
        }
        closedir($dh);
    }
}
$fileJson = fopen ($archivo,"w+");
fwrite ($fileJson, json_encode($filesMp4));
fclose($fileJson);
$respuesta = array('respuesta' => 'ok');
echo json_encode($respuesta);
?>