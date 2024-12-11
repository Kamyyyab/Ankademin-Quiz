    const questions = [
        {
            type: 'radio',
            text: 'Real Madrid har aldrig åkt ur den högsta divisionen i La Liga.',
            options: ['Sant', 'Falskt'],
            correctAnswer: 'Sant'
        },
        {
            type: 'radio',
            text: 'Real Madrid grundades år 1902.',
            options: ['Sant', 'Falskt'],
            correctAnswer: 'Falskt'
        },
  
        {
            type: 'radio',
            text: 'Vilken tränare har tränat Real Madrid flest gånger?',
            options: ['Zinedine Zidane', 'Carlo Ancelotti', 'Miguel Muñoz', 'José Mourinho'],
            correctAnswer: 'Miguel Muñoz'
        },
        {
            type: 'radio',
            text: 'Vad är Real Madrids smeknamn?',
            options: ['Los Blancos', 'Los Merengues', 'Los Galácticos', 'Los Cules'],
            correctAnswer: 'Los Blancos'
        },
        
        {
            type: 'checkbox',
            text: 'Vilka av följande spelare har spelat för Real Madrid?',
            options: ['Raúl', 'Lionel Messi', 'David Beckham', 'Roberto Carlos'],
            correctAnswers: ['Raúl', 'David Beckham', 'Roberto Carlos']
        },
        {
            type: 'checkbox',
            text: 'Vilka av följande spelare har vunnit Ballon d\'Or under sin tid i Real Madrid?',
            options: ['Cristiano Ronaldo', 'Zinedine Zidane', 'Roberto Carlos', 'Luka Modrić'],
            correctAnswers: ['Cristiano Ronaldo', 'Luka Modrić']
        },
        {
            type: 'checkbox',
            text: 'Vilka av följande spelare har varit lagkaptener för Real Madrid?',
            options: ['Sergio Ramos', 'Cristiano Ronaldo', 'Raúl', 'Karim Benzema'],
            correctAnswers: ['Sergio Ramos', 'Raúl']
        },

        {
            type: 'radio',
            text: 'Vem är den senaste tränaren som vunnit Champions League med Real Madrid?',
            options: ['Zinedine Zidane', 'Carlo Ancelotti', 'Rafael Benítez', 'José Mourinho'],
            correctAnswer: 'Carlo Ancelotti'
        },
        {
            type: 'radio',
            text: 'Vilken spelare har gjort flest mål för Real Madrid genom tiderna?',
            options: ['Cristiano Ronaldo', 'Raúl', 'Karim Benzema', 'Alfredo Di Stéfano'],
            correctAnswer: 'Cristiano Ronaldo'
        },
        {
            type: 'checkbox',
            text: 'Vilka av följande spelare har vunnit La Liga med Real Madrid?',
            options: ['Cristiano Ronaldo', 'Sergio Ramos', 'Iker Casillas', 'Luka Modrić'],
            correctAnswers: ['Cristiano Ronaldo', 'Sergio Ramos', 'Iker Casillas']
        },
        {
            type: 'checkbox',
            text: 'Vilka av följande spelare har vunnit Champions League med Real Madrid?',
            options: ['Cristiano Ronaldo', 'Karim Benzema', 'Zinedine Zidane', 'Luka Modrić'],
            correctAnswers: ['Cristiano Ronaldo', 'Karim Benzema', 'Zinedine Zidane', 'Luka Modrić']
        },
        {
            type: 'radio',
            text: 'Vilken spelare gjorde hat-trick mot FC Barcelona i El Clásico 2014?',
            options: ['Cristiano Ronaldo', 'Karim Benzema', 'Gareth Bale', 'Mesut Özil'],
            correctAnswer: 'Cristiano Ronaldo'
        }
    ];
    const questionsContainer = document.querySelector('#questions-container');
    const nextBtn = document.querySelector('#next-btn');
    const resultBox = document.querySelector('#result-box');
    const restartBtn = document.querySelector('#restart-btn');
    const scoreElement = document.querySelector('#score');
    const detailedResultsElement = document.querySelector('#detailed-results');
    const themeToggleBtn = document.querySelector('#theme-toggle-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    const renderQuestion = (index) => {
        const question = questions[index];
        questionsContainer.innerHTML = `
            <legend>${question.text}</legend>
            ${question.options.map((option, optionIndex) => `
                <label>
                    <input type="${question.type}" 
                           name="question-${index}" 
                           value="${option}"
                           aria-label="${option}"> ${option}
                </label>
            `).join('')}
        `;
    
        nextBtn.disabled = true;
        addAnswerListeners(index);
    };
    
    const addAnswerListeners = (index) => {
        const inputs = document.querySelectorAll(`input[name="question-${index}"]`);
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                nextBtn.disabled = false;
            });
        });
    };
    
    const checkAnswer = (index) => {
        const question = questions[index];
        const selectedInputs = document.querySelectorAll(`input[name="question-${index}"]:checked`);
    
        let isCorrect = false;
        if (question.type === 'radio') {
            isCorrect = selectedInputs[0]?.value === question.correctAnswer;
        } else if (question.type === 'checkbox') {
            const selectedValues = Array.from(selectedInputs).map(input => input.value);
            isCorrect = selectedValues.length === question.correctAnswers.length &&
                       selectedValues.every(value => question.correctAnswers.includes(value));
        }
    
        userAnswers.push({
            question: question.text,
            isCorrect: isCorrect
        });
    
        return isCorrect;
    };
    
    nextBtn.addEventListener('click', () => {
        if (checkAnswer(currentQuestionIndex)) {
            score++;
        }
    
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    });
    
    const showResults = () => {
        questionsContainer.innerHTML = '';
        nextBtn.style.display = 'none';
        resultBox.classList.remove('hidden');
        scoreElement.textContent = `Du fick ${score} av ${questions.length} poäng!`;
        const percentage = (score / questions.length) * 100;
        let resultMessage = '';
        let resultColor = '';
    
        if (percentage < 50) {
            resultMessage = 'Underkänt';
            resultColor = 'red';
        } else if (percentage >= 50 && percentage <= 75) {
            resultMessage = 'Bra';
            resultColor = 'orange';
        } else {
            resultMessage = 'Riktigt bra jobbat!';
            resultColor = 'green';
        }
    
        const resultTextElement = document.createElement('p');
        resultTextElement.textContent = resultMessage;
        resultTextElement.style.color = resultColor;
        resultBox.appendChild(resultTextElement);
    
        detailedResultsElement.innerHTML = userAnswers.map((answer, index) => `
            <p class="${answer.isCorrect ? 'correct' : 'incorrect'}">
                Fråga ${index + 1}: ${answer.isCorrect ? '✓' : '✗'} ${answer.question}
            </p>
        `).join('');
    };
    
    
    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        resultBox.classList.add('hidden');
        nextBtn.style.display = 'block';
        renderQuestion(currentQuestionIndex);
    });
    
    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    
    renderQuestion(currentQuestionIndex);
    
    
    