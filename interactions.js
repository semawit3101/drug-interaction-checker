// ===============================
// Drug Information Database
// ===============================

const drugs = {

    "Aspirin": {
        use: "Pain relief and blood thinning",
        sideEffects: "Bleeding risk",
        alternatives: ["Paracetamol"]
    },

    "Warfarin": {
        use: "Blood thinner",
        sideEffects: "Heavy bleeding risk",
        alternatives: ["Paracetamol"]
    },

    "Ibuprofen": {
        use: "Pain and inflammation relief",
        sideEffects: "Stomach ulcers",
        alternatives: ["Paracetamol"]
    },

    "Paracetamol": {
        use: "Pain and fever relief",
        sideEffects: "Liver damage if overdosed",
        alternatives: []
    },

    "Advil": {
        use: "Pain relief",
        sideEffects: "Nausea and dizziness",
        alternatives: ["Paracetamol"]
    },

    "Methotrexate": {
        use: "Cancer and arthritis treatment",
        sideEffects: "Immune suppression",
        alternatives: []
    }
};


// ===============================
// Graph Representation
// ===============================

const graph = {

    "Aspirin": ["Warfarin"],

    "Warfarin": ["Aspirin", "Ibuprofen"],

    "Ibuprofen": ["Warfarin"],

    "Paracetamol": [],

    "Advil": ["Warfarin"],

    "Methotrexate": []
};


// ===============================
// Interaction Severity
// ===============================

const interactions = {

    "Aspirin-Warfarin": {
        severity: "🔴 Severe",
        message: "High bleeding risk"
    },

    "Warfarin-Ibuprofen": {
        severity: "🟠 Moderate",
        message: "May increase stomach bleeding"
    },

    "Advil-Warfarin": {
        severity: "🟠 Moderate",
        message: "Can increase bleeding risk"
    }
};


// ===============================
// Hash Set
// ===============================

const drugSet = new Set(Object.keys(drugs));


// ===============================
// BFS Algorithm
// ===============================

function bfs(start, target) {

    let queue = [[start]];

    let visited = new Set();

    while (queue.length > 0) {

        let path = queue.shift();

        let current = path[path.length - 1];

        if (current === target) {
            return path;
        }

        visited.add(current);

        for (let neighbor of graph[current] || []) {

            if (!visited.has(neighbor)) {

                let newPath = [...path, neighbor];

                queue.push(newPath);
            }
        }
    }

    return null;
}


// ===============================
// Main Interaction Checker
// ===============================

function checkInteraction(drug1, drug2) {

    // Drug validation
    if (!drugSet.has(drug1) || !drugSet.has(drug2)) {

        return `
        <div class="result-card">

            <h2>❌ Drug Not Found</h2>

            <p>One or both drugs are not in the system.</p>

        </div>
        `;
    }


    // Direct interaction keys
    let key1 = `${drug1}-${drug2}`;

    let key2 = `${drug2}-${drug1}`;


    // ==========================
    // DIRECT INTERACTION
    // ==========================

    if (interactions[key1] || interactions[key2]) {

        let interaction = interactions[key1] || interactions[key2];

        let alternatives = drugs[drug1].alternatives.join(", ");

        return `

        <div class="result-card danger">

            <h2>${interaction.severity}</h2>

            <p><strong>Interaction:</strong> ${interaction.message}</p>

            <div class="drug-info">

                <h3>💊 ${drug1}</h3>

                <p><strong>Use:</strong> ${drugs[drug1].use}</p>

                <p><strong>Side Effects:</strong> ${drugs[drug1].sideEffects}</p>

            </div>

            <div class="drug-info">

                <h3>💊 ${drug2}</h3>

                <p><strong>Use:</strong> ${drugs[drug2].use}</p>

                <p><strong>Side Effects:</strong> ${drugs[drug2].sideEffects}</p>

            </div>

            <p><strong>✅ Suggested Alternative:</strong> ${alternatives}</p>

        </div>
        `;
    }


    // ==========================
    // INDIRECT INTERACTION (BFS)
    // ==========================

    let path = bfs(drug1, drug2);

    if (path && path.length > 1) {
        let alternatives = drugs[drug1].alternatives.join(", ");

        return `

        <div class="result-card danger">

            <h2>⚠ Indirect Interaction Detected</h2>

            <p>
                BFS found a connection path:
            </p>

            <p>
                <strong>${path.join(" → ")}</strong>
            </p>

        </div>
        `;
    }


    // ==========================
    // SAFE RESULT
    // ==========================

    return `

    <div class="result-card safe">

        <h2>✅ Safe Combination</h2>

        <p>No dangerous interaction found.</p>

        <div class="drug-info">

            <h3>💊 ${drug1}</h3>

            <p><strong>Use:</strong> ${drugs[drug1].use}</p>

        </div>

        <div class="drug-info">

            <h3>💊 ${drug2}</h3>

            <p><strong>Use:</strong> ${drugs[drug2].use}</p>

        </div>

    </div>
    `;
}