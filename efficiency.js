function calculateEfficiency() {

    let powerFactor = parseFloat(document.getElementById("f-powerFactor").value) || 0.8;
let sinPhi = Math.sqrt(1 - Math.pow(powerFactor, 2));




    // =====================================
    // REACTANCE CALCULATION
    // =====================================

    let impedance = parseFloat(document.getElementById("f-impedance").value) || 0;
    let resistance = parseFloat(document.getElementById("f-resistance").value) || 0;

    let reactance = Math.sqrt(
        Math.max(0, Math.pow(impedance, 2) - Math.pow(resistance, 2))
    );

    const reactanceField = document.getElementById("f-reactance");

    if (reactanceField) {
        reactanceField.value = reactance.toFixed(3);
    }

    // =====================================
    // % REGULATION AT UPF
    // =====================================

    function regulationUPF(loadPercent) {

        let regulation =
            (loadPercent *
            (resistance + (reactance * reactance / 200)))
            / 100;

        return regulation.toFixed(2);
    }



   function regulationPF(loadPercent) {

    let resistance = parseFloat(document.getElementById("f-resistance").value) || 0;
    let reactance = parseFloat(document.getElementById("f-reactance").value) || 0;

    let cosPhi = parseFloat(document.getElementById("f-powerFactor").value) || 0.8;
    let sinPhi = Math.sqrt(1 - Math.pow(cosPhi, 2));

    let regulation =
        (loadPercent / 100) *
        (
            (resistance * cosPhi)
            +
            (reactance * sinPhi)
            +
            (
                Math.pow(
                    (reactance * cosPhi) -
                    (resistance * sinPhi),
                    2
                ) / 200
            )
        );

    return regulation.toFixed(2);
}



document.getElementById("pfreg100").value = regulationPF(100) + " %";
document.getElementById("pfreg75").value  = regulationPF(75) + " %";
document.getElementById("pfreg50").value  = regulationPF(50) + " %";
document.getElementById("pfreg35").value  = regulationPF(35) + " %";
    document.getElementById("reg100").value = regulationUPF(100) + " %";
    document.getElementById("reg75").value  = regulationUPF(75) + " %";
    document.getElementById("reg50").value  = regulationUPF(50) + " %";
    document.getElementById("reg35").value  = regulationUPF(35) + " %";
}

document.addEventListener("input", calculateEfficiency);
calculateEfficiency();