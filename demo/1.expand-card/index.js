const list = document.querySelectorAll(".card-item");

list.forEach((item) => {
  item.addEventListener("click", () => {
    list.forEach((e) => e.classList.remove("active"));
    item.classList.add("active");
  });
});
