// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    var changedElement = d3.select(this);
    
    // 4b. Save the value that was changed as a variable.
    var elementValue = changedElement.property("value");
    console.log(elementValue)

    // 4c. Save the id of the filter that was changed as a variable.
    var filterID = changedElement.attr('id')
    console.log(filterID)
    
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[filterID] = elementValue;
    }
    else {
      delete filters[filterID]
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    var filteredData = tableData
    
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for(let falter in filters) {
      filteredData = filteredData.filter(row => row[falter] == filters[falter]);
      console.log(falter)

    };
      
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
