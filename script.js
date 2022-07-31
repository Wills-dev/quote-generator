const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading 
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote randomly
const newQuote = () =>{
    // show loading before any content
    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // checking for blank authors and replacing with unknown.
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }
    // checking for length of our quote text to determine styling.
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // set quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// get quotes from API
async function getQuotes () {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error) {
        // catching error here
        }
}


// activating the tweet button
const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// to run the function once page loads
getQuotes();