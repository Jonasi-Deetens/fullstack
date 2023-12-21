document.getElementById("updateIdeaForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    const idea = document.getElementById("ideaInput").value;
    const id = document.getElementById("ideaID").value;
    console.log(idea + " " + id);
    try {
        const response = await fetch("https://server-diaibk8c.b4a.run/ideas/updateIdea", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({ 
                idea: idea,
                id: id,
                title: title
            })
        });
        if (response.ok) {
            window.location.href = "../../index.html";
            console.log("Idea changed successfully!");
        } else {
            console.error("Error changing idea:", response.status);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
})

const params = new URLSearchParams(window.location.search);
console.log(params);

document.getElementById("titleInput").value = params.get("title");
document.getElementById("ideaInput").value = params.get("idea");
document.getElementById("ideaID").value = params.get("id");