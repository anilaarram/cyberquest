// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Get the section ID from the href
        const targetSection = document.getElementById(targetId); // Find the corresponding section

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth' // Scroll smoothly to the section
        });
    });
});

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function() {

    // Select the elements we'll work with
    const runButton = document.getElementById('run-code');
    const outputText = document.getElementById('output-text');
    const errorMessage = document.getElementById('error-message');
    const languageSelect = document.getElementById('language');
    const codeTextArea = document.getElementById('code');

    // Function to clear output and error messages
    function clearOutput() {
        outputText.textContent = 'Output will appear here...';
        errorMessage.textContent = 'Any error messages will appear here...';
    }

    // Function to simulate running the code
    function runCode(language, code) {
        clearOutput();
        try {
            let result = '';

            // JavaScript simulation
            if (language === 'javascript') {
                result = eval(code);
            }
            // Python simulation (this would require a backend service to actually run Python)
            else if (language === 'python') {
                result = 'Python execution is simulated here.';
            }
            // Java simulation (again, real Java execution needs a backend)
            else if (language === 'java') {
                result = 'Java execution is simulated here.';
            } else {
                throw new Error('Unsupported language!');
            }

            // Display the result
            outputText.textContent = result;
        } catch (error) {
            // Handle errors and show them
            errorMessage.textContent = error.message;
        }
    }

    // Attach event listener to the "Run Code" button
    runButton.addEventListener('click', function() {
        const language = languageSelect.value; // Get selected language
        const code = codeTextArea.value; // Get the code from the text area

        if (code.trim() === '') {
            errorMessage.textContent = 'Please write some code before running.';
        } else {
            runCode(language, code);
        }
    });
});

