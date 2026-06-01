function calculateEfficiency() {

    // =====================================
    // K FACTOR CALCULATION
    // =====================================

    let thd = parseFloat(document.getElementById("f-thd").value) || 0;

    let kFactor = "K-1";
    let overRating = 1.00;

    if (thd >= 0.727) {
        kFactor = "K-20";
        overRating = 1.33;
    }
    else if (thd >= 0.641) {
        kFactor = "K-17";
        overRating = 1.28;
    }
    else if (thd >= 0.529) {
        kFactor = "K-13";
        overRating = 1.22;
    }
    else if (thd >= 0.350) {
        kFactor = "K-7";
        overRating = 1.12;
    }
    else if (thd >= 0.241) {
        kFactor = "K-4";
        overRating = 1.06;
    }

    // OUTPUT K FACTOR

    const kFactorField = document.getElementById("f-kFactor");

    if (kFactorField) {
        kFactorField.value = kFactor;
    }

    // OUTPUT OVER RATING FACTOR

    const overRatingField = document.getElementById("f-overRating");

    if (overRatingField) {
        overRatingField.value = overRating.toFixed(2);
    }

    // EQUIVALENT POWER

    let mva = parseFloat(document.getElementById("f-power").value) || 0;

    let equivalentPower = overRating * (mva * 1000);

    const equivalentPowerField =
        document.getElementById("f-equivalentPower");

    if (equivalentPowerField) {
        equivalentPowerField.value =
            equivalentPower.toFixed(0) + " kVA";
    }
}

// Auto Calculate
document.addEventListener("input", calculateEfficiency);

// Initial Load
calculateEfficiency();