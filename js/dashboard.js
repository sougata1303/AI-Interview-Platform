document.addEventListener('DOMContentLoaded', () => {
    // Component Context Inits
    initUserSession();
    initNavigation();
    initPomodoroTimer();
    initStudyPlanner();
});

/**
 * Check active session and personalize greeting
 */
function initUserSession() {
    const userName = localStorage.getItem("userName");
    if (!userName) {
        // Redirection guard to login if no credentials
        window.location.href = "login.html";
        return;
    }
    
    // Dynamically greeting the active user
    const welcomeHeader = document.querySelector('.welcome-header h1');
    if (welcomeHeader) {
        welcomeHeader.textContent = `Welcome, ${userName}`;
    }
}

/**
 * SPA View Router Context
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const logoutBtn = document.getElementById('logoutBtn');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = item.getAttribute('data-target');
            switchView(targetView);
        });
    });

    if(logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Logging out of your current session safely...');
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            window.location.href = "index.html";
        });
    }
}

// THIS IS THE UPDATED FUNCTION WITH THE IFRAME FORCE-REFRESH
function switchView(viewId) {
    const contentViews = document.querySelectorAll('.content-view');
    const navItems = document.querySelectorAll('.nav-item');

    contentViews.forEach(view => {
        view.classList.remove('active');
        if(view.id === viewId) {
            view.classList.add('active');
        }
    });

    navItems.forEach(nav => {
        if(nav.getAttribute('data-target') === viewId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });
    
    // IFRAME FORCE REFRESH: Reloads data inside target iframe on click
    const iframeIds = {
        'ai-interview': 'interviewFrame',
        'exam-prep': 'examFrame',
        'coding-practice': 'codingFrame',
        'resume-analyzer': 'resumeFrame',
        'analytics': 'analyticsFrame',
        'profile': 'profileFrame'
    };
    
    if (iframeIds[viewId]) {
        const iframe = document.getElementById(iframeIds[viewId]);
        if (iframe) {
            // Force reload by appending a cache-busting timestamp parameter
            const baseUrl = iframe.src.split('?')[0];
            iframe.src = `${baseUrl}?t=${Date.now()}`;
        }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Pomodoro Focus Engine Module
 */
function initPomodoroTimer() {
    let timer;
    let isRunning = false;
    let timeRemaining = 1500; 
    let currentModeTime = 1500;

    const timeDisplay = document.getElementById('timeDisplay');
    const startBtn = document.getElementById('startTimerBtn');
    const resetBtn = document.getElementById('resetTimerBtn');
    const skipBtn = document.getElementById('skipTimerBtn');
    const presetBtns = document.querySelectorAll('.preset-btn');

    function updateDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        startBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        
        timer = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                alert('Focus block complete! Take a step back to breathe.');
                resetTimer();
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
        startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

    function resetTimer() {
        pauseTimer();
        timeRemaining = currentModeTime;
        updateDisplay();
    }

    startBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener('click', resetTimer);
    
    skipBtn.addEventListener('click', () => {
        pauseTimer();
        timeRemaining = 0;
        updateDisplay();
    });

    presetBtns.forEach(button => {
        button.addEventListener('click', () => {
            presetBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetTime = button.getAttribute('data-time');
            if (targetTime === 'custom') {
                const userMinutes = prompt("Enter custom focus length (Minutes):", "25");
                const parsed = parseInt(userMinutes, 10);
                if (!isNaN(parsed) && parsed > 0) {
                    currentModeTime = parsed * 60;
                } else {
                    currentModeTime = 1500;
                }
            } else {
                currentModeTime = parseInt(targetTime, 10);
            }
            resetTimer();
        });
    });

    updateDisplay();
}

/**
 * Functional Study Planner Checklist Engine
 */
function initStudyPlanner() {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');

    let tasks = [
        { id: 1, text: 'Review algorithmic complexities for System Architectures', completed: true },
        { id: 2, text: 'Complete mock coding session under execution time caps', completed: false },
        { id: 3, text: 'Analyze and parse deep semantic vector models', completed: false }
    ];

    function calculateProgress() {
        if (tasks.length === 0) {
            progressBar.style.width = '0%';
            progressPercent.textContent = '0%';
            return;
        }
        const completedCount = tasks.filter(t => t.completed).length;
        const percentage = Math.round((completedCount / tasks.length) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressPercent.textContent = `${percentage}%`;
    }

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
                <div class="todo-left">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="todo-text">${task.text}</span>
                </div>
                <button class="delete-task-btn" title="Delete Task"><i class="fa-solid fa-trash-can"></i></button>
            `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                li.classList.toggle('completed', task.completed);
                calculateProgress();
            });

            const deleteBtn = li.querySelector('.delete-task-btn');
            deleteBtn.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                renderTasks();
            });

            todoList.appendChild(li);
        });
        calculateProgress();
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (!text) return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
        todoInput.value = '';
        renderTasks();
        todoList.scrollTop = todoList.scrollHeight;
    });

    renderTasks();
}