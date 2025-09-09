let currentScreen = "diary";
let chart = null;

function showScreen(screen){
  document.getElementById(currentScreen).classList.remove("active");
  document.getElementById(screen).classList.add("active");
  currentScreen = screen;
  
  if(screen === "dashboard") {
    drawChart();
  }
}

function drawChart(){
  const ctx = document.getElementById('macroChart').getContext('2d');
  
  // Destroy previous chart if it exists
  if (chart) {
    chart.destroy();
  }
  
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Carbs', 'Protein', 'Fat'],
      datasets: [{
        data: [macros.C, macros.P, macros.F],
        backgroundColor: ['#4CAF50', '#2196F3', '#FF5722']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

const foodDummy = {
  "123": { name:"Apple", C:25, P:0, F:0 },
  "456": { name:"Chicken Breast", C:0, P:31, F:3.6 },
  "789": { name:"Brown Rice", C:45, P:5, F:2 },
  "101": { name:"Salmon", C:0, P:25, F:13 },
  "112": { name:"Broccoli", C:7, P:2.8, F:0.4 }
};

function scanBarcode() {
  const code = document.getElementById('barcodeInput').value;
  const result = foodDummy[code];
  
  if(result){
    document.getElementById('scanResult').innerHTML = 
      `<p>Found: ${result.name}</p>
       <p>Carbs: ${result.C}g, Protein: ${result.P}g, Fat: ${result.F}g</p>
       <button onclick="addScannedFood('${result.name}', ${result.C}, ${result.P}, ${result.F})">Add to Diary</button>`;
  } else {
    document.getElementById('scanResult').textContent = 'Food not found. Try codes: 123, 456, 789, 101, 112';
  }
}

function addScannedFood(name, carbs, protein, fat) {
  // Create a form to submit the scanned food data
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "";
  
  const nameInput = document.createElement("input");
  nameInput.type = "hidden";
  nameInput.name = "foodName";
  nameInput.value = name;
  form.appendChild(nameInput);
  
  const carbsInput = document.createElement("input");
  carbsInput.type = "hidden";
  carbsInput.name = "carbs";
  carbsInput.value = carbs;
  form.appendChild(carbsInput);
  
  const proteinInput = document.createElement("input");
  proteinInput.type = "hidden";
  proteinInput.name = "protein";
  proteinInput.value = protein;
  form.appendChild(proteinInput);
  
  const fatInput = document.createElement("input");
  fatInput.type = "hidden";
  fatInput.name = "fat";
  fatInput.value = fat;
  form.appendChild(fatInput);
  
  document.body.appendChild(form);
  form.submit();
}

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', function() {
  if (typeof macros !== 'undefined') {
    drawChart();
  }
});