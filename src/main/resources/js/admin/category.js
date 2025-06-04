document.addEventListener("DOMContentLoaded", function () {
    const categoryModal = document.getElementById("category-modal");
    const categoryBtn = document.getElementById("add-category-button");
    const categoryClose = document.getElementById("category-modal-close");
    const categoryCancel = document.getElementById("category-cancel");

    // Modalni ko'rsatish
    categoryBtn.addEventListener("click", () => {
        categoryModal.style.display = "block";
    });

    // Modalni yopish
    const closeCategoryModal = () => {
        categoryModal.style.display = "none";
    };

    categoryClose.addEventListener("click", closeCategoryModal);
    categoryCancel.addEventListener("click", closeCategoryModal);

    // Modal tashqarisiga bosganda ham yopish
    window.addEventListener("click", (event) => {
        if (event.target === categoryModal) {
            categoryModal.style.display = "none";
        }
    });
});


// Admin Category qo'shish funksiyasi

function addCategory(event) {
    event.preventDefault();

    const name = document.getElementById("category-name").value;

    if (!name) {
        alert("Kategoriya nomi kiritilmagan!");
        return;
    }

    request.post("/addCategory", { name: name })
        .then(res => {
            alert("Qo'shildi: " + res.data);
            document.getElementById("category-name").value = "";
            document.getElementById("category-modal").style.display = "none";
        })
        .catch(err => {
            alert("Xatolik: " + err.message);
        });
}
