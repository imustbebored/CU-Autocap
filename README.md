# CU-Autocap
Auto-capitalization and formatting by brand voice

ZD and CU don't use inputs for text areas, but rather, they use "contenteditable" divs. These divs work differently than a standard input box and often have their own JS code that listens to the input and acts accordingly. The extension listens to the contenteditable div and when certain keywords are entered, the extension will either capitalize them or format them according to brand voice found from one of the internal docs.

All of the JS logic for the extension can be found in background.js. We're using an eventListener which listens to the text input by users. If the text equals a keyword that we have, we format it accordingly (either capitalizing it or adding other formatting such as "drag-and-drop").

There are multiple arrays. One is "words" (these are single words to capitalize), another is "wordsToReplace" (these are phrases that need to be capitalized or formatted appropriately), and finally "wordsReplaceWith" (this is what we replace the "wordsToReplace" word with when entered by a user). Do keep in mind that the order of these words is important and that wherever you add one phrase to "wordsToReplace" you should add it to the same area in "ordsReplaceWith". 

There was code added to not format text that is part of a hyperlink (an <a href></a> tag) so that we don't end up with things like https://ClickUp.com

There was additional code added (towards the end of the file) to fix a bug with the cursor not playing well with Zendesk's text area. This ensure the cursor always ends up where its intended to, otherwise it would behave incorrectly, jumping to the beginning of the text.

Other than that, should be pretty self explanatory!
