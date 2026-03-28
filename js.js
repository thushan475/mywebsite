// Typing Effect
const words = ["Web Developer", "UI Designer", "Freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed');

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Deleting characters
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing characters
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Speed control
    let typeSpeed = isDeleting ? 50 : 90;

    // If word is fully typed
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1400;        // Pause at end of word
        isDeleting = true;
    }
    // If word is fully deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;         // Small pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Start the typing effect
type();