
async function getGistJsonContent(gistId, filename) {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const gistData = await response.json();

    // Find the specific file within the gist
    if (gistData.files && gistData.files[filename]) {
      const fileContent = gistData.files[filename].content;
      // If the content is already a JSON string, parse it
      return JSON.parse(fileContent);
    } else {
      throw new Error(`File "${filename}" not found in Gist "${gistId}"`);
    }
  } catch (error) {
    console.error("Error fetching Gist content:", error);
    return null;
  }
}

// Всё что нужно от клиента, 2 строчки. Можно задавать из html-ки
const gistId = '21c61e3ee75feb2e6eacbaf0060b0f6c'; // Replace with your Gist ID
const filename = 'gistfile1.json'; // Replace with the name of your JSON file in the Gist

var test = document.getElementsByClassName("fjs");

for (var i = 0; i < test.length; i++) {
  test[i].querySelectorAll('*').forEach(element => {

    getGistJsonContent(gistId, filename).then(jsonContent => {
      element.textContent = jsonContent[element.getAttribute('get-var')];
    });
    
  });
}