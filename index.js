const rangosImpuestos = {
    soltero: [
        { max: 1800000, rate: 0, fixed: 0 },
        { max: 1900000, rate: 0.05, fixed: 4500 },
        { max: 2000000, rate: 0.09, fixed: 10940 },
        { max: 2100000, rate: 0.12, fixed: 19880 },
        { max: 2200000, rate: 0.15, fixed: 30800 },
        { max: 2300000, rate: 0.15, fixed: 44142 },
        { max: 2400000, rate: 0.19, fixed: 61979 },
        { max: 2500000, rate: 0.19, fixed: 80979 },
        { max: 2600000, rate: 0.19, fixed: 99979 },
        { max: 2700000, rate: 0.19, fixed: 118979 },
        { max: 2800000, rate: 0.23, fixed: 138817 },
        { max: 3200000, rate: 0.23, fixed: 230817 },
        { max: 3300000, rate: 0.27, fixed: 256655 },
        { max: 3900000, rate: 0.27, fixed: 418655 },
        { max: 4900000, rate: 0.35, fixed: 728493 },
        { max: 5100000, rate: 0.35, fixed: 797830 },
        { max: 5500000, rate: 0.35, fixed: 937830 }
    ],
    casado_sin_hijos: [
        { max: 2000000, rate: 0, fixed: 0 },
        { max: 2100000, rate: 0.05, fixed: 216 },
        { max: 2200000, rate: 0.05, fixed: 4366 },
        { max: 2300000, rate: 0.09, fixed: 11864 },
        { max: 2400000, rate: 0.12, fixed: 23151 },
        { max: 2500000, rate: 0.15, fixed: 37439 },
        { max: 2600000, rate: 0.19, fixed: 53490 },
        { max: 2700000, rate: 0.19, fixed: 72490 },
        { max: 2800000, rate: 0.19, fixed: 91490 },
        { max: 3200000, rate: 0.23, fixed: 174540 },
        { max: 3300000, rate: 0.23, fixed: 197540 },
        { max: 3900000, rate: 0.27, fixed: 352591 },
        { max: 4900000, rate: 0.31, fixed: 652641 },
        { max: 5100000, rate: 0.31, fixed: 714641 },
        { max: 5500000, rate: 0.35, fixed: 852191 }
    ],
    casado_con_hijos: [
        { max: 2300000, rate: 0, fixed: 0 },
        { max: 2400000, rate: 0.07, fixed: 1683.33 },
        { max: 2500000, rate: 0.15, fixed: 8030.01 },
        { max: 2600000, rate: 0.21, fixed: 18040.01 },
        { max: 2700000, rate: 0.26, fixed: 31050.01 },
        { max: 2800000, rate: 0.30, fixed: 46050.01 },
        { max: 3200000, rate: 0.38, fixed: 121396.38 },
        { max: 3300000, rate: 0.43, fixed: 141743.36 },
        { max: 3900000, rate: 0.49, fixed: 287090.03 },
        { max: 4900000, rate: 0.53, fixed: 577436.70 },
        { max: 5100000, rate: 0.53, fixed: 639436.70 },
        { max: 5500000, rate: 0.57, fixed: 767283.37 }
    ]
};

function calcularImpuesto() {
    let income = parseFloat(document.getElementById("income").value);
    let status = document.getElementById("status").value;
    let resultado = document.getElementById("resultado");

    // Descuentos adicionales
    let obraSocial = income * 0.03;
    let jubilacion = income * 0.11;
    let obraSocialJubilacion = income * 0.03;
    let descuentosTotal = obraSocial + jubilacion + obraSocialJubilacion;

    // Ingresos después de descuentos
    let ingresosNetos = income - descuentosTotal;

    // Calculo del impuesto
    let impuesto = 0;
    let found = false;

    for (let rango of rangosImpuestos[status]) {
        if (ingresosNetos <= rango.max) {
            impuesto = ingresosNetos * rango.rate + rango.fixed;
            found = true;
            break;
        }
    }

    if (!found) {
        resultado.innerHTML = "Ingresos fuera de los rangos establecidos.";
    } else {
        let descuentoGanancias = impuesto.toFixed(2);
        let ingresosFinales = ingresosNetos - impuesto;
        resultado.innerHTML = `
            <strong>Ingresos Brutos:</strong> $${income.toFixed(2)}<br>
            <strong>Descuento Obra Social (3%):</strong> $${obraSocial.toFixed(2)}<br>
            <strong>Descuento Jubilación (11%):</strong> $${jubilacion.toFixed(2)}<br>
            <strong>Descuento Obra Social Jubilación (3%):</strong> $${obraSocialJubilacion.toFixed(2)}<br>
            <strong>Descuento Total:</strong> $${descuentosTotal.toFixed(2)}<br>
            <strong>Ingresos Netos:</strong> $${ingresosNetos.toFixed(2)}<br>
            <strong>Descuento Imp. a las Ganancias:</strong> $${descuentoGanancias}<br>
            <strong>Ingresos Finales:</strong> $${ingresosFinales.toFixed(2)}
        `;
    }
}