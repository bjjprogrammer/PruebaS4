// Selectores de Fecha
const $dateStart = document.getElementById("dateStart"),
      $dateEnd = document.getElementById("dateEnd");
// Selectores de Moneda y Tipo de Pago
const $typeCoin = document.getElementById("typeCoin"),
      $typePayment = document.getElementById("typePayment");

const $total = document.getElementById("total");     
//Selectores Datatable
const $tbody = document.getElementById("tbody-dinamico"); // Padre

// Esta variable guarda cada iterracion del forEach de la linea 81, rellena el select de Tipo de Monedas
let chunckOptsSelectTypeC ='';
//Esta variable guarda cada iterracion del forEach de la linea 95, rellena el select de Tipo de Pagos
let chunckOptsSelectTypeP ='';
//Variable que guarda las iterracion del ForEach del datatable
let tbodyDinamico = '';
// Totalizador
let total ;

  async function getIngresos() {
    try {
      const response = await axios.get('http://localhost:8080/s4/backend/ingresos.php');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  async function getEgresos() {
    try {
      const response = await axios.get('http://localhost:8080/s4/backend/egresos.php');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  async function getMonedas(){
      try {
        const response = await axios.get('http://localhost:8080/s4/backend/monedas.php');
        return response.data;
      } catch (e) {
        return e;
      }
  };
      
  async function getTipoPago(){
    try {
      const response = await axios.get('http://localhost:8080/s4/backend/tipoPago.php');
      return response.data;
    } catch (error) {
      return e;
    }
  }

  async function getDateFiltedIngresos(one,two) {
    try {
      if (one=='' || two =='') {
        return [];
      }
      const response = await axios.get(`http://localhost:8080/s4/backend/ingresos.php?query=date&start=${ one }&end=${ two }`);
      return response.data;
    } catch (error) {
      return e;
    }
  }

  async function getDateFiltedEgresos(one,two) {
    try {
      if (one=='' || two =='') {
        return [];
      }
      const response = await axios.get(`http://localhost:8080/s4/backend/egresos.php?query=date&start=${ one }&end=${ two }`);
      return response.data;
    } catch (error) {
      return e;
    }
  }

  async function getTypeCoinIngresos(coin) {
    try {
      if (coin=='') {
        return [];
      }
      const response = await axios.get(`http://localhost:8080/s4/backend/ingresos.php?query=coin&type=${coin}`);
      return response.data;
    } catch (error) {
      return e;
    }
  }

  async function getTypeCoinEgresos(coin) {
    try {
      if (coin=='') {
        return [];
      }
      const response = await axios.get(`http://localhost:8080/s4/backend/egresos.php?query=coin&type=${coin}`);
      return response.data;
    } catch (error) {
      return e;
    }
  }

  async function getTypePaymentIngresos(payment) {
    try {
      if (payment=='') {
        return [];
      }
      const response = await axios.get(`http://localhost:8080/s4/backend/ingresos.php?query=payment&type=${payment}`);
      return response.data;
    } catch (error) {
      return e;
    }
  }

  async function getTypePaymentEgresos(payment) {
    try {
      if (payment=='') {
        return [];
      }
      const response = await axios.get(`http://localhost:8080/s4/backend/egresos.php?query=payment&type=${payment}`);
      return response.data;
    } catch (error) {
      return e;
    }
  }
  
  document.addEventListener("submit", (e) => {
      e.preventDefault();
      let totalIngreso;
      let totalEgreso;
      let total =0;
      let ini =$dateStart.value;
      let fin =$dateEnd.value;
      $tbody.innerHTML = '';
      getDateFiltedIngresos(ini,fin)
                  .then(res => {
                    res.forEach(el => {
                      tbodyDinamico += `<tr class="text-center" scope="row">
                      <td id="ref" class"text-center">${el.ref}</td>
                      <td id="tms" class"text-center">${el.tms}</td>
                      <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                      <td id="libelle" class"text-center">${el.libelle}</td>
                      <td id="amount" class"text-center">$${Number(el.amount).toFixed(2)}</td>
                      </tr>
                      `;
                    totalIngreso = Number(el.amount);
                    });
                    $tbody.innerHTML = tbodyDinamico;
                    // tbodyDinamico = ''; // Vacio nuevamente esta variable para que no sobre escriba los datos
                  });
    getDateFiltedEgresos(ini,fin)
                  .then(res => {
                    res.forEach(el => {
                      tbodyDinamico += `<tr class="text-center" scope="row">
                      <td id="ref" class"text-center">${el.ref}</td>
                      <td id="tms" class"text-center">${el.tms}</td>
                      <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                      <td id="libelle" class"text-center">${el.libelle}</td>
                      <td id="amount" class"text-center">-$${Number(el.amount).toFixed(2)}</td>
                      </tr>
                      `;
                    totalEgreso = Number(el.amount);
                    });
                    $tbody.innerHTML = tbodyDinamico;
                    total = (totalIngreso-totalEgreso);
                    if (Number.isNaN(total)) {
                      total =0;
                    };
                    $total.textContent = `Total : ${ Number(total).toFixed(2) }`;
                  });
                  tbodyDinamico = ''; // Vacio nuevamente esta variable para que no sobre escriba los datos             
  });
  


  $typeCoin.addEventListener("change", (e) => {
      let totalIngreso;
      let totalEgreso;
      let total =0;
      let coin = e.target.value;
      $tbody.innerHTML = '';
      getTypeCoinIngresos(coin)
              .then(res => {
                res.forEach(el => {
                  tbodyDinamico += `<tr class="text-center" scope="row">
                      <td id="ref" class"text-center">${el.ref}</td>
                      <td id="tms" class"text-center">${el.tms}</td>
                      <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                      <td id="libelle" class"text-center">${el.libelle}</td>
                      <td id="amount" class"text-center">$${Number(el.amount).toFixed(2)}</td>
                      </tr>
                      `;
                totalIngreso = Number(el.amount);
                });
                $tbody.innerHTML = tbodyDinamico;
                // tbodyDinamico = ''; // Vacio nuevamente esta variable para que no sobre escriba los datos
              });
      getTypeCoinEgresos(coin)
            .then(res => {
              res.forEach(el => {
                tbodyDinamico += `<tr class="text-center" scope="row">
                      <td id="ref" class"text-center">${el.ref}</td>
                      <td id="tms" class"text-center">${el.tms}</td>
                      <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                      <td id="libelle" class"text-center">${el.libelle}</td>
                      <td id="amount" class"text-center">-$${Number(el.amount).toFixed(2)}</td>
                      </tr>
                      `;
              totalEgreso = Number(el.amount);
              });
              $tbody.innerHTML = tbodyDinamico;
              total = (totalIngreso-totalEgreso);
              if (Number.isNaN(total)) {
                total =0;
              };
              $total.textContent = `Total : ${ Number(total).toFixed(2) }`;
            });
            tbodyDinamico = ''; // Vacio nuevamente esta variable para que no sobre escriba los datos  
  });

  $typePayment.addEventListener("change", (e) => {
    let totalIngreso;
    let totalEgreso;
    let total =0;
    let payment = e.target.value;
    $tbody.innerHTML = '';
    getTypePaymentIngresos(payment)
            .then(res => {
              res.forEach(el => {
                tbodyDinamico += `<tr class="text-center" scope="row">
                    <td id="ref" class"text-center">${el.ref}</td>
                    <td id="tms" class"text-center">${el.tms}</td>
                    <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                    <td id="libelle" class"text-center">${el.libelle}</td>
                    <td id="amount" class"text-center">$${Number(el.amount).toFixed(2)}</td>
                    </tr>
                    `;  
                    totalIngreso = Number(el.amount);
              });
              $tbody.innerHTML = tbodyDinamico;
              // tbodyDinamico = ''; // Vacio nuevamente esta variable para que no sobre escriba los datos
            });
    getTypePaymentEgresos(payment)
          .then(res => {
            res.forEach(el => {
              tbodyDinamico += `<tr class="text-center" scope="row">
                    <td id="ref" class"text-center">${el.ref}</td>
                    <td id="tms" class"text-center">${el.tms}</td>
                    <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                    <td id="libelle" class"text-center">${el.libelle}</td>
                    <td id="amount" class"text-center">-$${Number(el.amount).toFixed(2)}</td>
                    </tr>
                    `;
                    totalEgreso = Number(el.amount);
            });
            $tbody.innerHTML = tbodyDinamico;
            total = (totalIngreso-totalEgreso);
            if (Number.isNaN(total)) {
              total =0;
            };
            $total.textContent = `Total : ${ Number(total).toFixed(2) }`;
          });
          tbodyDinamico = ''; // Vacio nuevamente esta variable para que no sobre escriba los datos  
  });

getMonedas()
        .then(res => {
          res.forEach(el => {
            chunckOptsSelectTypeC += `<option id="${el.label}">${el.code_iso}</option>`;
            $typeCoin.innerHTML = chunckOptsSelectTypeC;
          });
        })
        .catch(e => {
            return e;
        });

  getTipoPago()
        .then(res => {

            res.forEach(el => {
              chunckOptsSelectTypeP += `<option id="${el.code}">${el.libelle}</option>`;
              $typePayment.innerHTML = chunckOptsSelectTypeP;
            });
        })
        .catch(e => {
          return e;
        });

        
const fetcAll = () => {
  let totalIngreso;
  let totalEgreso;
  getIngresos()
           .then(res => {
             res.forEach(el => {
              tbodyDinamico += `<tr class="text-center" scope="row">
                         <td id="ref" class"text-center">${el.ref}</td>
                         <td id="tms" class"text-center">${el.tms}</td>
                         <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                         <td id="libelle" class"text-center">${el.libelle}</td>
                         <td id="amount" class"text-center">${Number(el.amount).toFixed(2)}</td>
                         </tr>
                         `;
              totalIngreso = Number(el.amount);
               $tbody.innerHTML = tbodyDinamico;
             });
  
           });
  
  getEgresos()
          .then(res => {
            res.forEach(el => {
              tbodyDinamico += `<tr class="text-center" scope="row">
                         <td id="ref" class"text-center">${el.ref}</td>
                         <td id="tms" class"text-center">${el.tms}</td>
                         <td id="Mone_pago" class"text-center">${el.Mone_pago}</td>
                         <td id="libelle" class"text-center">${el.libelle}</td>
                         <td id="amount" class"text-center">-${Number(el.amount).toFixed(2)}</td>
                         </tr>
                         `;
             totalEgreso = Number(el.amount);
             $tbody.innerHTML = tbodyDinamico;
            });
            total = (totalIngreso-totalEgreso)
            if (Number.isNaN(total)) {
              total =0;
            };
            $total.textContent = `Total : ${ Number(total).toFixed(2) }`;
          });
        
}; 

fetcAll();   






