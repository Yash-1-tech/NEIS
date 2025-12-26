const storage = firebase.storage();

function uploadDoc() {
    const file = document.getElementById("rationCard").files[0];
    const status = document.getElementById("uploadStatus");

    if (!file) {
        status.innerText = "Please select a file.";
        return;
    }

    const ref = storage.ref("documents/" + file.name);

    ref.put(file)
        .then(() => {
            status.innerText = "Document uploaded. AI scanning started.";
            // Cloud Function + Gemini will trigger here later
        })
        .catch(err => {
            status.innerText = err.message;
        });
}
