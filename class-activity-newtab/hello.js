const quoteHeading = document.querySelector("h1");
const statusMessage = document.querySelector("#status-message");
const refreshButton = document.querySelector("#refresh-quote");

async function loadQuote() {
  quoteHeading.textContent = "Loading a programming quote...";
  statusMessage.textContent = "Fetching from the class quotes API.";
  refreshButton.disabled = true;

  try {
    const response = await fetch("https://cse2004.com/api/quotes/random");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const quote = await response.json();
    quoteHeading.textContent = quote.text;
    statusMessage.textContent = "Quote loaded successfully.";
  } catch (error) {
    quoteHeading.textContent = "The quote could not load right now.";
    statusMessage.textContent = "Try the button again in a moment.";
    console.error("Quote fetch failed:", error);
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadQuote);
loadQuote();
