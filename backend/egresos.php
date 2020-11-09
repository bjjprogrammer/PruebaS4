<?php 
    include_once './classes/Principal.class.php';

    $metodo = @$_GET['query'];

    $principal = new Principal();

    
    switch ($metodo) {
        case 'date':
            $dateStart = @$_GET['start'];
            $dateEnd = @$_GET['end'];
            $dataEgresos = $principal->listarEgresos($dateStart,$dateEnd);
            echo json_encode($dataEgresos);
            break;
        case 'coin':
            $typeCoin = @$_GET['type'];
            $dataEgresos = $principal->listarEgresos($dateStart='',$dateEnd='',$typeCoin);
            echo json_encode($dataEgresos);
            break;
        case 'payment':
            $typePayment = @$_GET['type'];
            $dataEgresos = $principal->listarEgresos($dateStart='',$dateEnd='',$typeCoin='',$typePayment);
            echo json_encode($dataEgresos);
            break;
        default:
            $dataEgresos = $principal->listarEgresos();
            echo json_encode($dataEgresos);
    }
?>
