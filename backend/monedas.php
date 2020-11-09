<?php 
    include_once './classes/Principal.class.php';

    $principal = new Principal();
    $dataMonedas = $principal->listarMonedas();
    echo json_encode($dataMonedas);
?>