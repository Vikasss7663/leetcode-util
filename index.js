const express = require('express');
const app = express();
const markdownIt = require('markdown-it');
const md = new markdownIt();
const port = process.env.PORT || 3000; // Choose the port you want to expose the endpoint on
const fetchLeetcodeDailyChallenge = require('./src/fetchLeetcodeDailyChallenge');
const sendEmail = require('./src/sendEmail')
const fetchOfficialSolution = require('./src/fetchOfficialSolution')
const fetchStreak = require("./src/fetchStreak")
require('./src/scheduleTask');
const fs = require('fs');
const handlebars = require('handlebars');

// Read the email template file
const emailTemplate = fs.readFileSync('index.html', 'utf8');

// Compile the template using Handlebars
const compiledTemplate = handlebars.compile(emailTemplate);

app.get('/send-mail', async (req, res) => {
  try {
    const streakCount = await fetchStreak()
    const streak = streakCount.streakCount
    const currentDayCompleted = streakCount.currentDayCompleted
    const data = await fetchLeetcodeDailyChallenge()
    const questionInfo = data.data.activeDailyCodingChallengeQuestion;
    const link = "https://leetcode.com" + questionInfo.link;
    const title = questionInfo.question.frontendQuestionId + ". " + questionInfo.question.title
    const slug = questionInfo.question.titleSlug;
    const tags = questionInfo.question.topicTags.map(it => it.name);
    const difficulty = questionInfo.question.difficulty
    const date = questionInfo.date + " " + new Date()
    const hasOfficialSolution = questionInfo.question.hasSolution
    let solutionContent;
    if(hasOfficialSolution) {
      const solution = await fetchOfficialSolution(slug)
      solutionContent = solution.data.question.solution.content;
      solutionContent = md.render(solutionContent);
    }

    const emailData = {
      title: title,
      link: link,
      difficulty: difficulty,
      tags: tags,
      solutionContent: solutionContent,
      streak: streak,
      currentDayCompleted: currentDayCompleted
    };
  
    // Create the HTML content by rendering the template with the data
    const body = compiledTemplate(emailData);

    const response = await sendEmail(date, body);
    res.send(response);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.get('/health', (req, res) => {
  res.send("Ok");
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
