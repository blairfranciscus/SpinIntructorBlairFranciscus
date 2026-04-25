const quoteText = document.querySelector("#quote-text");
const statusMessage = document.querySelector("#status-message");
const refreshButton = document.querySelector("#refresh-quote");
const copyButton = document.querySelector("#copy-quote");
const quoteCount = document.querySelector("#quote-count");
const currentTime = document.querySelector("#current-time");
const currentDate = document.querySelector("#current-date");

const QUOTE_COUNT_KEY = "classActivityQuoteCount";
let currentQuote = "";

function formatDateParts() {
  const now = new Date();

  currentTime.textContent = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  currentDate.textContent = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getSavedCount() {
  return Number(localStorage.getItem(QUOTE_COUNT_KEY) || 0);
}

function setSavedCount(nextCount) {
  localStorage.setItem(QUOTE_COUNT_KEY, String(nextCount));
  quoteCount.textContent = String(nextCount);
}

async function copyCurrentQuote() {
  if (!currentQuote) {
    statusMessage.textContent = "Load a quote before copying it.";
    return;
  }

  try {
    await navigator.clipboard.writeText(currentQuote);
    statusMessage.textContent = "Quote copied to your clipboard.";
  } catch (error) {
    statusMessage.textContent = "Clipboard access was blocked.";
    console.error("Copy failed:", error);
  }
}

async function loadQuote() {
  quoteText.textContent = "Loading a programming quote...";
  statusMessage.textContent = "Fetching from the class quotes API.";
  refreshButton.disabled = true;
  copyButton.disabled = true;

  try {
    const response = await fetch("https://cse2004.com/api/quotes/random");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const quote = await response.json();
    currentQuote = quote.text;
    quoteText.textContent = quote.text;

    const nextCount = getSavedCount() + 1;
    setSavedCount(nextCount);

    statusMessage.textContent = "Fresh quote loaded.";
  } catch (error) {
    currentQuote = "";
    quoteText.textContent = "The quote could not load right now.";
    statusMessage.textContent = "Try the button again in a moment.";
    console.error("Quote fetch failed:", error);
  } finally {
    refreshButton.disabled = false;
    copyButton.disabled = currentQuote === "";
  }
}

refreshButton.addEventListener("click", loadQuote);
copyButton.addEventListener("click", copyCurrentQuote);

formatDateParts();
setInterval(formatDateParts, 1000);
setSavedCount(getSavedCount());
loadQuote();
