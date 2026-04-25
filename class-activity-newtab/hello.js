const quoteText = document.querySelector("#quote-text");
const statusMessage = document.querySelector("#status-message");
const refreshButton = document.querySelector("#refresh-quote");

async function loadQuote() {
  quoteText.textContent = "Loading a programming quote...";
  statusMessage.textContent = "Loading quote...";
  refreshButton.disabled = true;

  try {
    const response = await fetch("https://cse2004.com/api/quotes/random");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const quote = await response.json();
    quoteText.textContent = quote.text;
    statusMessage.textContent = "Quote loaded.";
  } catch (error) {
    quoteText.textContent = "The quote could not load right now.";
    statusMessage.textContent = "Try again in a moment.";
    console.error("Quote fetch failed:", error);
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadQuote);
loadQuote();
