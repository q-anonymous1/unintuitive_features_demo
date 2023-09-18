// countdown time for the continue button in q1
var continueBtn = document.getElementById("continue-btn");
let count = 5;
const countdown = setInterval(function() {
    count--;
    if (count <= 0) {
        clearInterval(countdown);
        continueBtn.disabled = false;
        document.getElementById("countdown").style.display = "none";
    } else {
        document.getElementById("countdown").innerHTML = "Please make your judgment first! The continue button will be available in " + count + " seconds...";
    }
}, 1000);


// obtain the selected value
var q1_range = document.getElementById('q1_range');
var q1_range_value = parseInt(q1_range.value);
q1_range.addEventListener("change", function() {
    q1_range_value = parseInt(q1_range.value);
    // write this to the hidden field
    document.getElementById("q1_range_slider_hidden").value = q1_range_value;
});

// track clicks at different steps;
continueBtn.addEventListener("click", showDivs);
let clicks = 0;

function showDivs() {
    clicks++;
    if (clicks === 1) {

        // disable the range slider
        q1_range.disabled = true;
        // disable the continue button which will be enabled by the text area condition
        document.getElementById("continue-btn").disabled = true;


        var elements = document.getElementsByClassName("choice_sentiment");
        for (var i = 0; i < elements.length; i++) {
            if (q1_range_value <= 3) {
                elements[i].innerHTML = `<span style="color:blue;font-size: 22px;">Negative</span>`;
            }
            if (q1_range_value > 3) {
                elements[i].innerHTML = `<span style="color:orange;font-size: 22px;">Positive</span>`;
            }
        }

        // show q2 question box
        document.getElementById("question2-wrapper").style.display = "block";

    } else if (clicks === 2) {
        // hide q1&q2 question box, show q1&q2 confidence box
        document.getElementById("question1-wrapper").style.display = "none";
        document.getElementById("question2-wrapper").style.display = "none";
        document.getElementById("question2-confidence-wrapper").style.display = "block";
        // disable the continue button which will be enabled after make some selection
        document.getElementById("continue-btn").disabled = true;
    } else if (clicks === 3) {
        // hide q1&q2 confidence box, show question 3
        document.getElementById("question2-confidence-wrapper").style.display = "none";
        document.getElementById("question3-wrapper").style.display = "block";
        // disable the continue button which will be enabled after make some selection
        document.getElementById("continue-btn").disabled = true;
    } else if (clicks === 4) {

        // get which values are selected for q3
        var q3_choice_selected_value = $('input[name=q3_choice]:checked').val();
        if (q3_choice_selected_value == 'yes'){
            document.getElementById("choice_keep_ignore").innerHTML = 'considered';
        }
        else{
            document.getElementById("choice_keep_ignore").innerHTML  = 'ignored';
        }

        document.getElementById("question3-wrapper").style.display = "none";
        document.getElementById("question3-confidence-wrapper").style.display = "block";
        // disable the continue button which will be enabled after make some selection
        document.getElementById("continue-btn").disabled = true;
    } else if (clicks === 5) {
        var continueBtn = document.getElementById("continue-btn");
        continueBtn.type = "submit";
    }
}

// handle input text areas in q2: make continue button active
const q2textarea = document.getElementById("response_q2");
const wordCount = document.getElementById("wordCount");
wordCount.style.color = "gray";
// Initialize the total word count to 0
let totalWordCount = 0;
// Listen to the input event on both textareas
q2textarea.addEventListener("input", updateWordCount);
function updateWordCount() {
    const textinput = q2textarea.value.trim();
    // Split the combined string into words
    const words = textinput.split(/\s+/);
    // Update the total word count
    totalWordCount = words.length;
    // Update the word count display with the total word count
    wordCount.textContent = `Word count: ${totalWordCount}. Minimum 10 words to continue :)`;
    // also make the continue button clickable
    document.getElementById("continue-btn").disabled = (totalWordCount < 10);
}

// handle q1 & q2 confidence: make continue button active
var confidence_choice1_radios = document.getElementsByName("confidence_choice1");
for (var i = 0; i < confidence_choice1_radios.length; i++) {
    confidence_choice1_radios[i].addEventListener("change", function() {
        if (document.querySelector('input[name="confidence_choice1"]:checked')) {
            continueBtn.disabled = false;
        } else {
            continueBtn.disabled = true;
        }
    });
}

// handle q3 choice: make continue button active
var q3_choice_radios = document.getElementsByName("q3_choice");
for (var i = 0; i < q3_choice_radios.length; i++) {
    q3_choice_radios[i].addEventListener("change", function() {
        if (document.querySelector('input[name="q3_choice"]:checked')) {
            continueBtn.disabled = false;
        } else {
            continueBtn.disabled = true;
        }
    });
}

// handle q3 confidence: make continue button active
var confidence_choice3_radios = document.getElementsByName("confidence_choice3");
for (var i = 0; i < confidence_choice3_radios.length; i++) {
    confidence_choice3_radios[i].addEventListener("change", function() {
        if (document.querySelector('input[name="confidence_choice3"]:checked')) {
            continueBtn.disabled = false;
        } else {
            continueBtn.disabled = true;
        }
    });
}