document.addEventListener('DOMContentLoaded', () => {
    // Charts and Counters
    const projectsCompleted = document.getElementById('projects-completed');
    const yearsExperience = document.getElementById('years-experience');

    const animateCounter = (element, target) => {
        let current = 0;
        const step = target / 100;
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(interval);
                element.innerText = target;
            } else {
                element.innerText = Math.ceil(current);
            }
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The number of projects completed will be fetched from the database
                animateCounter(projectsCompleted, 200);
                animateCounter(yearsExperience, new Date().getFullYear() - 2018);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (projectsCompleted && yearsExperience) {
        observer.observe(document.getElementById('statistics'));
    }

    const clientSatisfactionCtx = document.getElementById('clientSatisfactionChart');
    if (clientSatisfactionCtx) {
        new Chart(clientSatisfactionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Satisfied', 'Neutral', 'Unsatisfied'],
                datasets: [{
                    label: 'Client Satisfaction',
                    data: [85, 10, 5],
                    backgroundColor: [
                        '#20BF55',
                        '#1C82AD',
                        '#F8F9FA'
                    ],
                    borderColor: [
                        '#fff',
                        '#fff',
                        '#fff'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    const projectTypesCtx = document.getElementById('projectTypesChart');
    if (projectTypesCtx) {
        new Chart(projectTypesCtx, {
            type: 'pie',
            data: {
                labels: ['Web Development', 'Mobile App Development', 'Cloud Solutions'],
                datasets: [{
                    data: [50, 30, 20],
                    backgroundColor: [
                        '#0A2647',
                        '#1C82AD',
                        '#20BF55'
                    ],
                    borderColor: [
                        '#fff',
                        '#fff',
                        '#fff'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
});