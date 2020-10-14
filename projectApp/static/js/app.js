const line_per_page = 10;
var page = 0;
var my_data = data;
console.log(my_data);

function table_view(){
    if (d3.event !== null){
        d3.event.preventDefault();
        d3.select("#table-area").html("");
    }

    // Select table area and append table tag
    var table = d3.selectAll("#table-area").append("table").attr("class", "table table-striped");
    // Append thead and tr tags to the table
    var header = table.append("thead").append("tr");
    // Append th tags to the thead and put headers in the th tags
    header
        .selectAll("th")
        .data(Object.keys(my_data[0]))
        .enter()
        .append("th")
        .style("text-align", "left")
        .text(th => th)
        .attr("class", "table-head");

    // Append tbody tag to the table
    var table_body = table.append("tbody");

    // Append tr tags to the tbody tag
    var rows = table_body.selectAll("tr")
        .data(my_data.map(obj => Object.values(obj)).slice(page * line_per_page, (page + 1) * line_per_page))
        .enter()
        .append("tr")

    // Append td tags to the tr tags and put data in the td tags
    rows.selectAll("td")
        .data(td => td)
        .enter()
        .append("td")
        .text(td => td);

    // Get the last page number
    var last_page = Math.ceil(my_data.length / line_per_page);
    // Put the page number
    d3.selectAll("#page_number").text(`Page ${page+1} of ${last_page}`);
    
    // If navi buttons and page number are hidden, switch display to flex
    if (d3.selectAll("#navi").style("display") == "none")
        d3.selectAll("#navi").style("display", "flex");

    var prev_button = d3.selectAll("#prv");
    var next_button = d3.selectAll("#next");

    // If this page is not the first page, make the previous page button enable, and set the event listener for the previous page button
    // If this page is the first page, make the previous page button disable
    if (page > 0){
        prev_button.attr("class", "btn btn-outline-dark btn-sm");
        d3.select("#prv").on("click", function(){
            page--;
            table_view();
            console.log(page);
        });
    }else{
        prev_button.attr("class", "btn btn-outline-dark btn-sm disabled");
    }

    // If this page is not the last page, make the next page button enable, and set the event listener for the button
    // If this page is the last page, make the next page button disable
    if (page+1 < last_page){
        next_button.attr("class", "btn btn-outline-dark btn-sm");
        d3.select("#next").on("click", function(){
            page++;
            table_view();
        });
    }else{
        next_button.attr("class", "btn btn-outline-dark btn-sm disabled");
    }
}

table_view();