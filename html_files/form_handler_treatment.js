// the onchange event for exp format selection radio buttons
function showExplanations() {
    var choice = document.querySelector('input[name="exp_format_selection"]:checked').value;
    loadExplanations(choice);
}

function loadExplanations(exp_format_selection){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var data = JSON.parse(this.responseText);
            var target_word = document.getElementById("word").textContent;
            var interface_condition = document.getElementById('interface_condition').value;

            // condition 1: list of example reviews
            if (exp_format_selection == '1') {

                // clear previous output
                document.getElementById('neg_contents').innerHTML = "";
                document.getElementById('pos_contents').innerHTML = "";
                document.getElementById('data_distribution').innerHTML = "";

                // negative always on the left side
                var explanation_neg = document.getElementById('neg_contents')

                // add header: need to be different based on interface conditions because when data distribution is available, we show the exact numbers
                if (interface_condition == '1'){
                    section_header_neg = document.createElement("div");
                    section_header_neg.innerHTML = `<h2><span style="color:blue;">Negative</span> Reviews of "` + target_word + `"</h2>`;
                    explanation_neg.appendChild(section_header_neg);
                }

                // add header: need to be different based on interface conditions because when data distribution is available, we show the exact numbers
                if (interface_condition == '4'){
                    section_header_neg = document.createElement("div");
                    // also read how many negative reviews
                    var num_neg_reviews = data['NumReviewsNeg'];
                    section_header_neg.innerHTML = `<h2><span style="color:blue;">Negative</span> Reviews of "` + target_word + `"</h2>` + `<h3>Total: ` + num_neg_reviews + ` reviews</h3>`;
                    explanation_neg.appendChild(section_header_neg);
                }

                // read example reviews of the negative sentiment, and append
                var example_reviews_neg = data["ExampleReviewsNeg"];
                for(var i=0; i<20; i++){
                    // add reviews text
                    var sentence = document.createElement("p");
                    sentence.innerHTML = example_reviews_neg[i];
                    // set class name and other attributes
                    sentence.className = "example_reviews_neg";
                    sentence.setAttribute("word_id", target_word);
                    sentence.setAttribute("example_reviews_neg", i+1);
                    explanation_neg.appendChild(sentence);
                }

                // positive always on the right side
                var explanation_pos = document.getElementById('pos_contents')

                // add header: need to be different based on interface conditions because when data distribution is available, we show the exact numbers
                if (interface_condition == '1'){
                    section_header_pos = document.createElement("div");
                    section_header_pos.innerHTML = `<h2><span style="color:orange;">Positive</span> Reviews of "` + target_word + `"</h2>`;
                    explanation_pos.appendChild(section_header_pos);
                }

                // add header: need to be different based on interface conditions because when data distribution is available, we show the exact numbers
                if (interface_condition == '4'){
                    section_header_pos = document.createElement("div");
                    // also read how many positive reviews
                    var num_pos_reviews = data['NumReviewsPos'];
                    section_header_pos.innerHTML = `<h2><span style="color:orange;">Positive</span> Reviews of "` + target_word + `"</h2>` + `<h3>Total: ` + num_pos_reviews + ` reviews</h3>`;
                    explanation_pos.appendChild(section_header_pos);
                }

                // read example reviews of the posative sentiment, and append
                var example_reviews_pos = data["ExampleReviewsPos"];
                for(var i=0; i<20; i++){
                    // add reviews text
                    var sentence = document.createElement("p");
                    sentence.innerHTML = example_reviews_pos[i];
                    // set class name and other attributes
                    sentence.className = "example_reviews_pos";
                    sentence.setAttribute("word_id", target_word);
                    sentence.setAttribute("example_reviews_pos", i+1);
                    explanation_pos.appendChild(sentence);
                }
            }

            // condition 2: group of example reviews
            if (exp_format_selection == '2') {

                // clear previous output
                document.getElementById('neg_contents').innerHTML = "";
                document.getElementById('pos_contents').innerHTML = "";
                document.getElementById('data_distribution').innerHTML = "";

                // negative always on the left side
                var explanation_neg = document.getElementById('neg_contents')
                // add header
                section_header_neg = document.createElement("div");
                section_header_neg.innerHTML = `<h2><span style="color:blue;">Negative</span> Patterns of "` + target_word + `"</h2>`;
                explanation_neg.appendChild(section_header_neg);

                // read usage patterns of negative reviews, and append
                if (interface_condition == '2'){
                    var usage_neg = data["UsageNeg"];
                }
                if (interface_condition == '5'){
                    var usage_neg = data["UsageNegWithNums"];
                }

                for(var i=0; i<usage_neg.length; i++){
                    var usage_pattern = document.createElement("h3");
                    usage_pattern.innerHTML = "<b>" + usage_neg[i]["phrase"] + "</b>";
                    explanation_neg.appendChild(usage_pattern);
                    var usage_pattern_examples_array = usage_neg[i]["reviews"].split("---");
                    for (var j=0; j<usage_pattern_examples_array.length; j++){
                        var usage_pattern_example = document.createElement("p");
                        usage_pattern_example.innerHTML = usage_pattern_examples_array[j];
                        usage_pattern_example.className = "example_reviews_neg";
                        usage_pattern_example.setAttribute("word_id", target_word);
                        usage_pattern_example.setAttribute("pattern_neg", i+1);
                        usage_pattern_example.setAttribute("pattern_neg_reviews", j+1);
                        explanation_neg.appendChild(usage_pattern_example);
                    }
                }

                // positive always on the right side
                var explanation_pos = document.getElementById('pos_contents')
                // add header
                section_header_pos = document.createElement("div");
                section_header_pos.innerHTML = `<h2><span style="color:orange;">Positive</span> Patterns of "` + target_word + `"</h2>`;
                explanation_pos.appendChild(section_header_pos);
                // read usage patterns of positive reviews, and append
                if (interface_condition == '2'){
                    var usage_pos = data["UsagePos"];
                }
                if (interface_condition == '5'){
                    var usage_pos = data["UsagePosWithNums"];
                }
                for(var i=0; i<usage_pos.length; i++){
                    var usage_pattern = document.createElement("h3");
                    usage_pattern.innerHTML = "<b>" + usage_pos[i]["phrase"] + "</b>";
                    explanation_pos.appendChild(usage_pattern);
                    var usage_pattern_examples_array = usage_pos[i]["reviews"].split("---");
                    for (var j=0; j<usage_pattern_examples_array.length; j++){
                        var usage_pattern_example = document.createElement("p");
                        usage_pattern_example.innerHTML = usage_pattern_examples_array[j];
                        usage_pattern_example.className = "example_reviews_neg";
                        usage_pattern_example.setAttribute("word_id", target_word);
                        usage_pattern_example.setAttribute("pattern_pos", i+1);
                        usage_pattern_example.setAttribute("pattern_pos_reviews", j+1);
                        explanation_pos.appendChild(usage_pattern_example);
                    }
                }

            }

           // condition 3: data distribution
            if (exp_format_selection == '3') {

                // clear previous output
                document.getElementById('neg_contents').innerHTML = "";
                document.getElementById('pos_contents').innerHTML = "";
                document.getElementById('data_distribution').innerHTML = "";

                var explanation_data = document.getElementById('data_distribution');

                // add header
                section_header_dis = document.createElement("div");
                section_header_dis.innerHTML = `<span id='data_header'><h2>Label Distribution of Reviews Containing "` + target_word + `"</h2></span>`;
                explanation_data.appendChild(section_header_dis);

                my_dataviz = document.createElement("div");
                my_dataviz.setAttribute("id", "my_dataviz");
                explanation_data.appendChild(my_dataviz);


                // set the dimensions and margins of the graph
                var width = 450
                    height = 450
                    margin = 40

                // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
                var radius = Math.min(width, height) / 2 - margin

                // append the svg object to the div called 'my_dataviz'
                var svg = d3.select("#my_dataviz")
                  .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                  .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                // Create dummy data
                var data_distribution = data["Distribution"];

                // set the color scale
                var color = d3.scaleOrdinal()
                    .domain(["positive", "negative"])
                    .range(["orange", "blue"]);

                // Compute the position of each group on the pie:
                var pie = d3.pie()
                  .value(function(d) {return d.value; })
                var data_distribution_ready = pie(d3.entries(data_distribution))
                // Now I know that group A goes from 0 degrees to x degrees and so on.

                // shape helper to build arcs:
                var arcGenerator = d3.arc()
                  .innerRadius(0)
                  .outerRadius(radius)

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg
                  .selectAll('mySlices')
                  .data(data_distribution_ready)
                  .enter()
                  .append('path')
                    .attr('d', arcGenerator)
                    .attr('fill', function(d){ return(color(d.data.key)) })
                    .attr("stroke", "black")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.8)

                // Now add the annotation. Use the centroid method to get the best coordinates
                svg
                  .selectAll('mySlices')
                  .data(data_distribution_ready)
                  .enter()
                  .append('text')
                  .text(function(d){ return d.data.key})
                  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
                  .style("text-anchor", "middle")
                  .style("font-size", 20)
                  .style("fill", "white")

            }
        }
    };

    // read json file by id
    var file_url = "./texts/" + document.getElementById('category').value + "_" + document.getElementById("word").textContent + ".txt";
    xmlhttp.open("GET", file_url, true);
    xmlhttp.send();
}

// countdown function for the question boxes, which forces users to look at AI explanations first
function countdown_question_instructions() {
    let count = 10; // Set the countdown time in seconds
    var countdownTimer = setInterval(function() {
        count--;
        document.getElementById("q1_countdown").innerHTML = "Please inspect AI explanations first!<br>Questions will be shown here in " + count + " seconds...";
        if (count <= 0) {
            clearInterval(countdownTimer);
            // show questions for users to answer
            document.getElementById("div_questions_instuctions").style.display = "none";
            document.getElementById("div_questions").style.display = "block";
        }
    }, 1000);
}

// Call the countdown function and show default explanations when the page is loaded
window.onload = function() {
    countdown_question_instructions();
    // for condition 1-3: no radio buttons, only exp_format_hidden_selection
    if (document.getElementById('exp_format_hidden_selection') !== null) {
        exp_format_selection = document.getElementById('exp_format_hidden_selection').value;
        loadExplanations(exp_format_selection);
    }
    // for condition 4-5: use radio buttons
    else {
        showExplanations();
    }
};

// -------------------below are similar codes to q1 form handler-------------------
// only difference is that the continue button can be clicked for q1
var continueBtn = document.getElementById("continue-btn");

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

        // add the sentiment choice to following questions
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

        // "grey out" effects
        if (q1_range_value <= 3){
            document.getElementById("pos_contents").style.opacity = "0.3";
        }
        if (q1_range_value > 3){
            document.getElementById("neg_contents").style.opacity = "0.3";
        }

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