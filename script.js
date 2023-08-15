import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// firebase app setup
const appSettings = {
    databaseURL:
        "https://realtime-database-6dd79-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const reviewsListInDB = ref(database, "reviewsList");

// input fields
const textArea = document.getElementById("review-field");
const fromFl = document.getElementById("from");
const toFl = document.getElementById("to");
const publishBtn = document.getElementById("publish-btn");

// review fields
const reviewList = document.getElementById("reviews-list");

publishBtn.addEventListener("click", function () {
    let to = toFl.value;
    let from = fromFl.value;
    let review = textArea.value;

    let reviewDetails = {
        to,
        from,
        review,
    };

    push(reviewsListInDB, reviewDetails);

    clearInputFields();
});

function clearInputFields() {
    textArea.value = "";
    fromFl.value = "";
    toFl.value = "";
}

onValue(reviewsListInDB, function (snapshot) {
    clearReviewList();
    if (snapshot.exists()) {
        let reviewArray = Object.values(snapshot.val());

        for (let i = 0; i < reviewArray.length; i++) {
            let to = reviewArray[i].to;
            let from = reviewArray[i].from;
            let review = reviewArray[i].review;
            appendReviewToList(to, from, review);
        }
    } else {
        reviewList.innerHTML = "No reviews yet";
        reviewList.style.color = "#fff";
        reviewList.style.fontFamily = "Inter";
    }
});

function appendReviewToList(to, from, review) {
    let li = document.createElement("li");
    li.classList.add("review-container");
    let toEl = document.createElement("div");
    let fromEl = document.createElement("div");
    let reviewEl = document.createElement("div");
    toEl.classList.add("review-to");
    fromEl.classList.add("review-from");
    reviewEl.classList.add("review");
    toEl.textContent = "To " + to;
    fromEl.textContent = "From " + from;
    reviewEl.textContent = review;
    li.append(toEl, reviewEl, fromEl);
    reviewList.append(li);
}

function clearReviewList() {
    reviewList.innerHTML = null;
}
