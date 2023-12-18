document.getElementById("ideaForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const idea = document.getElementById("idea").value;
    const title = document.getElementById("title").value;
    console.log(idea);
    try {
        const response = await fetch("http://localhost:4000/ideas/addIdea", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({ 
                title: title,
                idea: idea
             })
        });
        if (response.ok) {
            // Handle successful response if needed
            window.location.href = "../../index.html";
            console.log("Idea submitted successfully!");
        } else {
            // Handle error response
            console.error("Error submitting idea:", response.status);
        }
    } catch (error) {
        // Handle fetch request error
        console.error("Fetch error:", error);
    }
})