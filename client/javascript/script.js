const ul = document.getElementById("ideasList");

const clearList = () => {
    while (ul.lastChild) {
        ul.removeChild(ul.lastChild)
    }
};

const generateList = (data) => {
    clearList();
    console.log(data)
    data.forEach(listItem => {
        const li = document.createElement("li");
        li.textContent = listItem.idea;
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