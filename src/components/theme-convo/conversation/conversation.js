export const conversation = [
  {
    content: "Hi 👋 Want to start a petition? That’s great! Petitions like yours are one of the most powerful ways to get support for an issue or topic.",
    showToLoggedIn: false,
    type: 'static',
    section: 0
  },
  {
    content: "I’ll ask you a few questions that will help build your petition in minutes.",
    showToLoggedIn: false,
    type: 'static',
    section: 0
  },
  {
    content: "Let’s get started! Can you enter your email so you don’t lose your progress?",
    showToLoggedIn: false,
    type: 'static',
    section: 0
  },
  {
    content: null,
    showToLoggedIn: false,
    type: 'input',
    input: {
      type: 'email',
      placeholder: 'enter your email',
      editing: false
    }
  },
  // Section 1: Title
  {
    content: "Excellent. First, what would you like the title of your petition to be?",
    showToLoggedIn: true,
    type: 'static',
    section: 1
  },
  {
    content: "Great titles should be brief, like a newspaper headline. 🗞️ For example “Mayor Jones: Save Dewey Elementary School",
    showToLoggedIn: true,
    type: 'static',
    section: 1
  },
  {
    content: "More tips on titles",
    showToLoggedIn: true,
    type: 'tip',
    section: 1
  },
  {
    content: null,
    showToLoggedIn: false,
    type: 'input',
    input: {
      type: 'title',
      placeholder: 'enter your petition title',
      editing: false
    }
  },
  // Section 2: Statement
  {
    content: "That’s a great title! 👍",
    showToLoggedIn: true,
    type: 'static',
    section: 2
  },
  {
    content: "Now for the petition statement, what is the change you want to see? 💬",
    showToLoggedIn: true,
    type: 'static',
    section: 2
  },
  {
    content: "You will get a lot more signers if your message is short and sweet—one or two sentences at most.",
    showToLoggedIn: true,
    type: 'static',
    section: 2
  },
  {
    content: "More tips petition statements",
    showToLoggedIn: true,
    type: 'tip',
    section: 2
  },
  {
    content: null,
    showToLoggedIn: false,
    type: 'input',
    input: {
      type: 'statement',
      placeholder: 'enter your petition statement',
      editing: false
    }
  },
  // Section 3: Background
  {
    content: "Great. Why are you starting this petition?",
    showToLoggedIn: true,
    type: 'static',
    section: 3
  },
  {
    content: "Adding a paragraph or two about this issue and why it matters to you goes a long way. ✍️",
    showToLoggedIn: true,
    type: 'static',
    section: 3
  },
  {
    content: "More tips petition backgrounds",
    showToLoggedIn: true,
    type: 'tip',
    section: 3
  },
  {
    content: null,
    showToLoggedIn: false,
    type: 'input',
    input: {
      type: 'background',
      placeholder: 'enter your petition background',
      editing: false
    }
  },
  // Section 4: Targets
  {
    content: "Just a couple more steps. Let’s find the best person or group of people to make decisions about this issue.",
    showToLoggedIn: true,
    type: 'static',
    section: 4
  },
  {
    content: "Do you already know who you’d like to send this petition to?",
    showToLoggedIn: true,
    type: 'static',
    section: 4
  },
  {
    content: null,
    showToLoggedIn: false,
    type: 'select',
    options: ['yes', 'no'],
  },
  // // If yes --- Section 5: Target select
  // {
  //   content: "Great! Enter your decision maker(s) below. If there’s more than one, enter one at a time.",
  //   showToLoggedIn: true,
  //   type: 'static',
  //   section: 5
  // },
  // {
  //   content: null,
  //   showToLoggedIn: false,
  //   type: 'target',
  //   section: 5
  // },
  // // If no --- Section 6: Target select
  // {
  //   content: "Great! Enter your decision maker(s) below. If there’s more than one, enter one at a time.",
  //   showToLoggedIn: true,
  //   type: 'static',
  //   section: 6
  // },
  // {
  //   content: null,
  //   showToLoggedIn: false,
  //   type: 'target',
  //   section: 6
  // },
]
