// background.js

//chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//    if (message.type === 'FILTERED_POSTS') {
//      const filteredPosts = message.posts;
      // Add your code here to fetch comment suggestions from the ChatGPT API and store them.
//    }
//  });
// background.js

const apiKey = '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';

// background.js



// Function to fetch comment suggestions from the ChatGPT API
async function fetchCommentSuggestions(prompt) {
  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 50 // You can adjust the `max_tokens` value based on how many words you want the API to generate
      })
    });

    if (response.ok) {
      const data = await response.json();
      const suggestions = data.choices.map((choice) => choice.text.trim());
      return suggestions;
    } else {
      // Handle API request errors
      console.error('Error fetching comment suggestions:', response.statusText);
      return [];
    }
  } catch (error) {
    // Handle fetch errors
    console.error('Error fetching comment suggestions:', error);
    return [];
  }
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'FILTERED_POSTS') {
    const filteredPosts = message.posts;

    // Fetch comment suggestions for each filtered post
    for (const post of filteredPosts) {
      const suggestions = await fetchCommentSuggestions(post);
      // Store the suggestions or process them as needed (e.g., display in the popup)
      console.log(`Comment suggestions for post: ${post}`);
      console.log(suggestions);
    }
  }
});
