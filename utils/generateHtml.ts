export type Quiz = {
    question: string;
    options: string[];
    answer: string;
};

export const generateHtml = (quizzes: Quiz[]) => `
  <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; }
        .question { margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <h1>Quiz Report</h1>
      ${quizzes.map((q, i) => `
        <div class="question">
          <h3>Q${i + 1}: ${q.question}</h3>
          <ul>
            ${q.options.map(opt => `<li>${opt}</li>`).join('')}
          </ul>
          <strong>Answer:</strong> ${q.answer}
        </div>
      `).join('')}
        <h1>Download From Quizkr</h1>
    </body>
  </html>
`;
