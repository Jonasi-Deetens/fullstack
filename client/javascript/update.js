document.getElementById("updateIdeaForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const idea = document.getElementById("ideaInput").value;
    const id = document.getElementById("ideaID").value;
    console.log(idea + " " + id);
    try {
        const response = await fetch("http://localhost:4000/updateIdea", {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({ 
                idea: idea,
                id: id
            })
        });
        if (response.ok) {
            // Handle successful response if needed
            window.location.href = "../../index.html";
            console.log("Idea changed successfully!");
        } else {
            // Handle error response
            console.error("Error changing idea:", response.status);
        }
    } catch (error) {
        // Handle fetch request error
        console.error("Fetch error:", error);
    }
})