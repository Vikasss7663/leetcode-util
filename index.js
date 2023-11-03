const express = require('express');
const app = express();
const markdownIt = require('markdown-it');
const md = new markdownIt();
const port = 3000; // Choose the port you want to expose the endpoint on
const fetchLeetcodeDailyChallenge = require('./src/fetchLeetcodeDailyChallenge');
const sendEmail = require('./src/sendEmail')
const fetchOfficialSolution = require('./src/fetchOfficialSolution')
require('./src/scheduleTask');

app.get('/send-mail', async (req, res) => {
  try {
    const data = await fetchLeetcodeDailyChallenge()
    const questionInfo = data.data.activeDailyCodingChallengeQuestion;
    const link = "https://leetcode.com" + questionInfo.link;
    const title = questionInfo.question.frontendQuestionId + ". " + questionInfo.question.title
    const slug = questionInfo.question.titleSlug;
    const tags = questionInfo.question.topicTags.map(it => it.name);
    const difficulty = questionInfo.question.difficulty
    const date = questionInfo.date + new Date()
    const hasOfficialSolution = questionInfo.question.hasSolution
    console.log(hasOfficialSolution);
    let solutionContent;
    if(hasOfficialSolution) {
      const solution = await fetchOfficialSolution(slug)
      solutionContent = solution.data.question.solution.content;
      solutionContent = md.render(solutionContent)
    }

    console.log(solutionContent);
    
    const body = `
      <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--pkV_ojKD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/h4ear4i3g4q7r04utgpm.png" />
      <h1>${title}</h1>
      <h2>${link}</h2>
      <h3>Difficulty: ${difficulty}</h3>
      <h3>Tags: ${tags}</h3>
      <pre>${solutionContent}</pre>
    `;

    const response = await sendEmail(date, body);
    console.log(response);
    res.send(response);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
