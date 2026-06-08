// This event fires as soon as the iframe finishes rendering analytics.html
document.addEventListener('DOMContentLoaded', () => {
    loadPerformanceMetrics();
});

function loadPerformanceMetrics() {
    console.log("Analytics system script active. Parsing dynamic dashboard numbers...");

    const analyticsData = {
        interviewsCompleted: 15,
        averageScore: "7.8/10",
        examAccuracy: "82%",
        atsScore: "78/100",
        
        weakAreas: [
            "Operating Systems",
            "DBMS",
            "Logical Reasoning"
        ],
        
        suggestions: [
            "Practice DBMS interview questions.",
            "Improve aptitude speed.",
            "Work on communication skills."
        ]
    };

    // 1. Inject Top Statistics Cards Numerical Data Safely
    const eInterviews = document.getElementById('interviewsCompleted');
    const eScore = document.getElementById('averageScore');
    const eAccuracy = document.getElementById('examAccuracy');
    const eAts = document.getElementById('atsScore');

    if(eInterviews) eInterviews.textContent = analyticsData.interviewsCompleted;
    if(eScore) eScore.textContent = analyticsData.averageScore;
    if(eAccuracy) eAccuracy.textContent = analyticsData.examAccuracy;
    if(eAts) eAts.textContent = analyticsData.atsScore;

    // 2. Build Weak Areas List Items
    const weakAreasContainer = document.getElementById('weakAreasList');
    if (weakAreasContainer) {
        weakAreasContainer.innerHTML = ''; 
        analyticsData.weakAreas.forEach(area => {
            const li = document.createElement('li');
            li.textContent = area;
            weakAreasContainer.appendChild(li);
        });
    }

    // 3. Build Improvement Suggestions List Items
    const suggestionsContainer = document.getElementById('suggestionsList');
    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = ''; 
        analyticsData.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsContainer.appendChild(li);
        });
    }
}