function runChecker() {

    let drug1 = document.getElementById("drug1").value.trim();

    let drug2 = document.getElementById("drug2").value.trim();

    drug1 = drug1.charAt(0).toUpperCase() + drug1.slice(1).toLowerCase();

    drug2 = drug2.charAt(0).toUpperCase() + drug2.slice(1).toLowerCase();

    let result = checkInteraction(drug1, drug2);

    document.getElementById("result").innerHTML = result;
}
function goHome() {

    window.location.href = "index.html";
}

