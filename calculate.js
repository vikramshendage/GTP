function calculateEfficiency() {

    // =====================================
    // INPUT VALUES
    // =====================================
 let powerFactor = parseFloat(document.getElementById("f-powerFactor").value) || 0.8;
    let mva = parseFloat(document.getElementById("f-power").value) || 0;
    let nll = parseFloat(document.getElementById("f-nll").value) || 0;
    let ll = parseFloat(document.getElementById("f-ll").value) || 0;

    // =====================================
    // MAX LOSSES AT 50% LOADING
    // =====================================

    let loss50 = nll + (0.25 * ll);

    const loss50Field = document.getElementById("f-loss50");

    if (loss50Field) {
        loss50Field.value = loss50.toFixed(2) + " kW";
    }

 

    // =====================================
    // MAX LOSSES AT 100% LOADING
    // =====================================

    let maxLosses = nll + ll;

    const maxLossField = document.getElementById("f-maxLosses");

    if (maxLossField) {
        maxLossField.value = maxLosses.toFixed(2) + " kW";
    }

  

    // =====================================
    // MAXIMUM EFFICIENCY
    // =====================================

    let maxLoadPercent = 0;
    let maxEfficiency = 0;
    let maxLoadMVA = 0;

    if (nll > 0 && ll > 0 && mva > 0) {

        maxLoadPercent = 100 * Math.sqrt(nll / ll);

        maxEfficiency =
            100 -
            (
                2 * nll /
                (
                    Math.sqrt(nll / ll) *
                    mva *
                    10
                )
            );

        maxLoadMVA = Math.sqrt(nll / ll) * mva;
    }

    const maxEffField = document.getElementById("f-maxEfficiency");

    if (maxEffField) {
        maxEffField.value =
            maxEfficiency.toFixed(2) +
            "% at load " +
            maxLoadPercent.toFixed(2) +
            "% i.e. " +
            maxLoadMVA.toFixed(2) +
            " MVA";
    }

    const loadAtMaxEffField = document.getElementById("f-loadAtMaxEff");

    if (loadAtMaxEffField) {
        loadAtMaxEffField.value = maxLoadPercent.toFixed(2) + " %";
    }

    // =====================================
    // POWER FACTORS
    // =====================================

    let pf = 1;
 //   let powerFactor = 0.8;

    // =====================================
    // EFFICIENCY AT UPF
    // =====================================

    function eff(loadPercent) {

        let load = loadPercent / 100;

        let efficiency =
            100 -
            (
                10 *
                (
                    nll +
                    Math.pow(load, 2) * ll
                )
            ) /
            (
                pf *
                loadPercent *
                mva
            );

        if (!isFinite(efficiency)) {
            return "0.00";
        }

        return efficiency.toFixed(2);
    }

    // =====================================
    // EFFICIENCY AT 0.8 PF
    // =====================================

    function pfEff(loadPercent) {

        let load = loadPercent / 100;

        let efficiency =
            100 -
            (
                10 *
                (
                    nll +
                    Math.pow(load, 2) * ll
                )
            ) /
            (
                powerFactor *
                loadPercent *
                mva
            );

        if (!isFinite(efficiency)) {
            return "0.00";
        }

        return efficiency.toFixed(2);
    }

    // =====================================
    // OUTPUT UPF
    // =====================================

    const eff100 = document.getElementById("f-EFF100");
    const eff75 = document.getElementById("f-EFF75");
    const eff50 = document.getElementById("f-EFF50");
    const eff25 = document.getElementById("f-Eff25");

    if (eff100) eff100.value = eff(100) + " %";
    if (eff75) eff75.value = eff(75) + " %";
    if (eff50) eff50.value = eff(50) + " %";
    if (eff25) eff25.value = eff(35) + " %";

    // =====================================
    // OUTPUT 0.8 PF
    // =====================================

    const pf100Field = document.getElementById("pf100");
    const pf75Field = document.getElementById("pf75");
    const pf50Field = document.getElementById("pf50");
    const pf25Field = document.getElementById("pf25");

    if (pf100Field) pf100Field.value = pfEff(100) + " %";
    if (pf75Field) pf75Field.value = pfEff(75) + " %";
    if (pf50Field) pf50Field.value = pfEff(50) + " %";
    if (pf25Field) pf25Field.value = pfEff(35) + " %";
}

// =====================================
// AUTO UPDATE
// =====================================

document.addEventListener("input", calculateEfficiency);

// =====================================
// INITIAL LOAD
// =====================================

calculateEfficiency();
