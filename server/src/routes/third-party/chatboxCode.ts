const code =
    `
    // Create the chatbox container
    const chatboxElement = document.createElement('div');
    chatboxElement.style.position = 'fixed';
    chatboxElement.style.bottom = '0';
    chatboxElement.style.width = '100%';
    chatboxElement.style.backgroundColor = '#f0f0f0';
    chatboxElement.style.padding = '10px';

    chatboxElement.style.width = '400px';

    // Create the message list (ul element)
    const messageList = document.createElement('ul');
    messageList.style.listStyleType = 'none';
    messageList.style.margin = '0';
    messageList.style.padding = '0';
    messageList.style.overflowY = 'auto';
    messageList.style.maxHeight = '200px'; // Set a max height for the message list

    // Create the text input
    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Type a message...';
    userInput.style.width = '80%';
    userInput.style.padding = '5px';

    // Create a button to send the message
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.width = '18%';
    sendButton.style.padding = '5px';
    sendButton.style.marginLeft = '2%';

    // Add an event listener to the button to send messages
    sendButton.addEventListener('click', () => {
        const messageText = userInput.value.trim();
        if (messageText !== '') {
            addMessage('User', messageText);
            userInput.value = ''; // Clear the input field after sending the message
        }
    });

    // Append the message list, text input, and button to the chatbox
    chatboxElement.appendChild(messageList);
    chatboxElement.appendChild(userInput);
    chatboxElement.appendChild(sendButton);

    // Append the chatbox to the body
    document.body.appendChild(chatboxElement);

    // Function to add a message to the message list
    function addMessage(sender, content) {
        const messageItem = document.createElement('li');
        messageItem.textContent = \`\${sender}: \${content}\`;
        messageList.appendChild(messageItem);

        // Scroll to the bottom of the message list to show the latest message
        messageList.scrollTop = messageList.scrollHeight;
    }
`
export default code;