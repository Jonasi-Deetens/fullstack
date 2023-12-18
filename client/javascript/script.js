const ul = document.getElementById("ideasList");

const clearList = () => {
    while (ul.lastChild) {
        ul.removeChild(ul.lastChild)
    }
};

const deleteIdea = async (id) => {
    try {
        const response = await fetch("http://localhost:4000/deleteIdea", {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({ id: id })
        });
        if (response.ok) {
            // Handle successful response if needed
            console.log("Idea deleted successfully!");
        } else {
            // Handle error response
            console.error("Error deleting idea:", response.status);
        }
    } catch (error) {
        // Handle fetch request error
        console.error("Fetch error:", error);
    }
};

const generateList = (data) => {
    clearList();
    console.log(data)
    data.forEach(listItem => {
        const li = document.createElement("li");
        li.textContent = listItem.idea;

        const button = document.createElement("button");
        button.textContent = "X";
        button.style.color = "red";
        button.addEventListener("click", () => deleteIdea(listItem.id))

        ul.appendChild(li);
    });
};

const fetchIdeas = async () => {
    try {
        const data = await fetch("http://localhost:4000/ideas");
        const results = await data.json();
        generateList(results);
    } catch (error) {
        console.log(error);
    }
}

fetchIdeas();