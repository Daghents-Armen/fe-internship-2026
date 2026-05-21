const messages = [
    { id: 1, user: "Alice", text: "Hi" },
    { id: 2, user: "Bob", text: "Hello" },
    { id: 3, user: "Alice", text: "How are you?" },
    { id: 4, user: "Bob", text: "Good!" }
];

const div = document.createElement("div");

messages.forEach(msg => {
    const box = document.createElement("div");
    box.style.border = "1px solid black";
    box.style.margin = "5px";
    box.style.padding = "5px";

    const user = document.createElement("p");
    user.textContent = msg.user;
    user.style.fontWeight = "bold";

    const text = document.createElement("p");
    text.textContent = msg.text;

    box.appendChild(user);
    box.appendChild(text);
    div.appendChild(box);
});

document.body.appendChild(div);