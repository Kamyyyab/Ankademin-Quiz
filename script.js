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