function toggleDisplay(option) {
    var fonta = document.querySelector('.font');
    var textalign = document.querySelector('.align');
    var paragraphe = document.querySelector('.scp');

    switch (option) {
        case 'font':
            fonta.style.display = 'block';
            paragraphe.style.display = 'none';
            textalign.style.display = 'none';
            break;
        case 'textAlign':
            fonta.style.display = 'none';
            paragraphe.style.display = 'none';
            textalign.style.display = 'block';
            break;
        case 'insert':
            fonta.style.display = 'none';
            paragraphe.style.display = 'block';
            textalign.style.display = 'none';
            break;

        case 'Close':
            fonta.style.display = 'none';
            paragraphe.style.display = 'none';
            textalign.style.display = 'none';
            break;
        default:
            console.error('Invalid option:', option);
    }
}



  const firebaseConfig = {
    apiKey: "AIzaSyCvqf6mNg-FsbcU7vZf52xEi6Skp9tz3yU",
    authDomain: "signup-286f7.firebaseapp.com",
    databaseURL: "https://signup-286f7-default-rtdb.firebaseio.com",
    projectId: "signup-286f7",
    storageBucket: "signup-286f7.appspot.com",
    messagingSenderId: "579225916993",
    appId: "1:579225916993:web:f4f70c8c24584a770018c0",
    measurementId: "G-RH5HF2F7DN"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();



var soutitletitle = document.getElementById('stitle').value;
var imglink = document.getElementById('imagelink').value;


function categorie() {
    const selectedCategory = document.getElementById('category').value;
    const subcategorySelect = document.getElementById('subcategory');
    const p = document.getElementById('showcategorie');
    
    
    // Clear previous options
    subcategorySelect.innerHTML = '';

    database.ref(selectedCategory).once('value', (snapshot) => {
        const categoryData = snapshot.val();

        if (categoryData) {
            // Assuming categoryData is an object with titles
            Object.keys(categoryData).forEach(title => {
                const option = document.createElement('option');
                option.value = title;
                option.text = title;
                subcategorySelect.add(option);
            });
          
            // Display data in the first paragraph
            const dataToShow = Object.keys(categoryData).join('<br>');
        } else {
            alert('No data found for the selected category.');
        }
    });
}


function subcategory() {
    // You can get the selected category if needed
    const selectedCategory = document.getElementById('category').value;
    
    // You might want to update the subcategory options here if necessary
    // ...

    // Call the function to update the title based on the selected subcategory
    updateTitle();
  }

  function updateTitle() {
    // Get the selected subcategory
    const selectedSubcategory = document.getElementById('subcategory').value;

    // Update the title input value with the selected subcategory
    document.getElementById('title').value = selectedSubcategory;
  }



// Function to save data to Firebase
function save() {
    // Get values from input fields
    const category = document.getElementById('category').value;
    const content = document.getElementById('editor').innerHTML;
    var title = document.getElementById('title').value;
    var soutitle = document.getElementById('stitle').value;
    var image = document.getElementById('imagelink').value;
    var lien = document.getElementById('lien').value;
    var prix = document.getElementById('prix').value;
    var type = document.getElementById('Type').value;
    var details = document.getElementById('details').value;

    // Create an object to store non-empty fields
    var dataToSave = {};

    // Check and add non-empty fields to the data object
    if (title) dataToSave.Title = title;
    if (soutitle) dataToSave.SousTitle = soutitle;
    if (content) dataToSave.Description = content;
    if (image) dataToSave.Image = image;
    if (prix) dataToSave.Prix = prix;
    if (details) dataToSave.Details = details;
    if (lien) dataToSave.Telecharger = lien;
    if (type) dataToSave.Type = type;

    // Check if there are any non-empty fields
    if (Object.keys(dataToSave).length === 0) {
        alert('Please fill in at least one field before saving.');
        return; // Stop the save operation
    }

    // Save data to Firebase
    database.ref(category +"/"+ title).set(dataToSave);

    // Optionally, you can provide feedback to the user that the data has been saved successfully
    alert('Data saved successfully!');
}

// Function to search data in Firebase
function search() {
    const category = document.getElementById('category').value;
    var title = document.getElementById('title').value;
    var soutitle = document.getElementById('stitle').value;
    var prix = document.getElementById('prix').value;
    var lien = document.getElementById('lien').value;
    
    //var imglink = document.getElementById('imagelink').value;
    console.log(title);
    database.ref(category +"/"+ title).once('value', (snapshot) => {
        console.log(category);
        const data = snapshot.val();
        console.log(data);
        if (data) {
            // Display data in the editor or handle it as needed
            document.getElementById('editor').innerHTML = data.Description;
            document.getElementById('stitle').value = data.SousTitle;
        } else {
            alert('No data found for the selected category.');
        }
    });
}

// Function to update data in Firebase
function update() {
     // Get values from input fields
     const category = document.getElementById('category').value;
     const content = document.getElementById('editor').innerHTML;
     var title = document.getElementById('title').value;
     var soutitle = document.getElementById('stitle').value;
     var image = document.getElementById('imagelink').value;
     var lien = document.getElementById('lien').value;
     var prix = document.getElementById('prix').value;
     var type = document.getElementById('Type').value;
     var details = document.getElementById('details').value;

     // Create an object to store non-empty fields
     var dataToSave = {};
 
     // Check and add non-empty fields to the data object
     if (title) dataToSave.Title = title;
     if (soutitle) dataToSave.SousTitle = soutitle;
     if (content) dataToSave.Description = content;
     if (image) dataToSave.Image = image;
     if (prix) dataToSave.Prix = prix;
     if (lien) dataToSave.Telecharger = lien;
     if (type) dataToSave.Type = type;
     if (details) dataToSave.Details = details;
     
 
     // Check if there are any non-empty fields
     if (Object.keys(dataToSave).length === 0) {
         alert('Please fill in at least one field before saving.');
         return; // Stop the save operation
     }
 
     // Save data to Firebase
     database.ref(category +"/"+ title).update(dataToSave);
 
     // Optionally, you can provide feedback to the user that the data has been saved successfully
     alert('Data saved successfully!');
}
