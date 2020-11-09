<?php 

include_once './classes/db/Database.class.php';

class Principal {
        private $pdo;

        public function __CONSTRUCT(){
            
        try{

        $this->pdo = Database::StartUp();    

        }catch(Exception $e){
        die($e->getMessage());
        }
    }

    public function listarIngresos($dateStart ='', $dateEnd='', $typeCoin ='', $typePayment  =''){
        if (!$dateStart) {
            $conDate='';
        }else{
            $conDate = "AND tms BETWEEN '$dateStart' AND '$dateEnd'";
        }

        if (!$typeCoin) {
            $conTypeCoin ='';
        }else{
            $conTypeCoin ="AND vt.Mone_pago = '$typeCoin'";
        }

        if (!$typePayment) {
            $contypePayment ='';
        }else{
            $contypePayment ="AND lcp.libelle = '$typePayment'";
        }

        try{
        $result = array();
        $stm = $this->pdo->prepare("SELECT * FROM venta vt left join llx_c_paiement lcp on vt.fk_paiement = lcp.id 
                                                            left join monedas ms on vt.Mone_pago = ms.code_iso
                                                            where ms.active =1
                                                            $conDate
                                                            $conTypeCoin
                                                            $contypePayment
                                                            order by code_iso;");
        $stm->execute();
        return $stm->fetchAll(PDO::FETCH_OBJ);

        }catch(Exception $e){
        die($e->getMessage());
        }
    }

    public function listarEgresos($dateStart ='', $dateEnd='', $typeCoin ='', $typePayment  =''){

        if (!$dateStart) {
            $conDate='';
        }else{
            $conDate = "AND tms BETWEEN '$dateStart' AND '$dateEnd'";
        }

        if (!$typeCoin) {
            $conTypeCoin ='';
        }else{
            $conTypeCoin ="AND cp.Mone_pago = '$typeCoin'";
        }

        if (!$typePayment) {
            $contypePayment ='';
        }else{
            $contypePayment ="AND lcp.libelle = '$typePayment'";
        }

        try {
            $result = array();
            $stm = $this->pdo->prepare("SELECT * FROM compras cp left join llx_c_paiement lcp on cp.fk_paiement = lcp.id 
                                                                 left join monedas ms on cp.Mone_pago = ms.code_iso
                                                                 where ms.active =1
                                                                 and lcp.active=1
                                                                 $conDate
                                                                 $conTypeCoin
                                                                 $contypePayment
                                                                 order by code_iso;");
            $stm->execute();
            return $stm->fetchAll(PDO::FETCH_OBJ);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function listarMonedas(){
        try {
            $result = array();
            $stm = $this->pdo->prepare("SELECT code_iso, label FROM monedas");
            $stm->execute();
            return $stm->fetchAll(PDO::FETCH_OBJ);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function listarTipoPago(){
        try {
            $result = array();
            $stm = $this->pdo->prepare("SELECT code, libelle FROM llx_c_paiement;");
            $stm->execute();
            return $stm->fetchAll(PDO::FETCH_OBJ);
        } catch (Exception $e) {
            die($e->getMessage());
        } 
    }

}

?>