// contentScript.js

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'INSERT_COMMENT') {
      const comment = message.comment;
  
      // Insert the comment into the LinkedIn post
      const posts = document.querySelectorAll('.feed-post');
      posts.forEach((post) => {
        const commentElement = document.createElement('div');
        commentElement.textContent = comment;
        post.appendChild(commentElement);
      });
    }
  });
  
  // Rest of your content script code for filtering AI-related posts (as before)
  // ...
// contentScript.js

function filterAIPosts() {
    const posts = document.querySelectorAll('.feed-post');
    const filteredPosts = [];
  
    posts.forEach((post) => {
      const postText = post.textContent.toLowerCase();
      if (postText.includes('ai') || postText.includes('artificial intelligence')) {
        filteredPosts.push(post.outerHTML);
      }
    });
  
    return filteredPosts;
  }
  
  // Main execution
  const filteredPosts = filterAIPosts();
  chrome.runtime.sendMessage({ type: 'FILTERED_POSTS', posts: filteredPosts });
    