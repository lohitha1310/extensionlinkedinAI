// popup.js

// Sample comment options for demonstration
const commentOptions = [
    "Great post! Thanks for sharing.",
    "I find this topic very interesting.",
    "Impressive! Keep up the good work!"
  ];
  
  // Main execution
  document.addEventListener('DOMContentLoaded', createCommentButtons);
  
// Function to insert the selected comment into the LinkedIn post
function insertCommentIntoPost(comment) {
  // Send a message to the content script to insert the comment
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'INSERT_COMMENT', comment });
  });
}

// Main execution
document.addEventListener('DOMContentLoaded', () => {
  const button1 = document.getElementById('button1');
  const button2 = document.getElementById('button2');
  const button3 = document.getElementById('button3');

  // Event listeners for the buttons
  button1.addEventListener('click', () => {
    const comment = commentOptions[0];
    insertCommentIntoPost(comment);
  });

  button2.addEventListener('click', () => {
    const comment = commentOptions[1];
    insertCommentIntoPost(comment);
  });

  button3.addEventListener('click', () => {
    const comment = commentOptions[2];
    insertCommentIntoPost(comment);
  });
});
