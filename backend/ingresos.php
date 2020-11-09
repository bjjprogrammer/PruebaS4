<?php 
    include_once './classes/Principal.class.php';

    $metodo = @$_GET['query'];

    $principal = new Principal();

    switch ($metodo) {
        case 'date':
            $dateStart = @$_GET['start'];
            $dateEnd = @$_GET['end'];
            $dataIngresos = $principal->listarIngresos($dateStart,$dateEnd);
            echo json_encode($dataIngresos);
            break;
        case 'coin':
            $typeCoin = @$_GET['type'];
            $dataIngresos = $principal->listarIngresos($dateStart='',$dateEnd='',$typeCoin);
            echo json_encode($dataIngresos);
            break;
        case 'payment':
            $typePayment = @$_GET['type'];
            $dataIngresos = $principal->listarIngresos($dateStart='',$dateEnd='',$typeCoin='',$typePayment);
            echo json_encode($dataIngresos);
            break;
        default:
            $dataIngresos = $principal->listarIngresos();
            echo json_encode($dataIngresos);
    }
?>