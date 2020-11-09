<?php 
    include_once './classes/Principal.class.php';

    $principal = new Principal();
    $dataTipoPago = $principal->listarTipoPago();
    echo json_encode($dataTipoPago);
?>