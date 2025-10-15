
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Service = require('./models/service');
const TeamMember = require('./models/teamMember');
const Project = require('./models/project');
const Testimonial = require('./models/testimonial');

const services = [
    { name: 'Web Development', description: 'Building modern, responsive websites tailored to your needs.', icon: 'fas fa-laptop-code' },
    { name: 'Mobile App Development', description: 'Creating beautiful and functional mobile apps for iOS and Android.', icon: 'fas fa-mobile-alt' },
    { name: 'Cloud Solutions', description: 'Helping you leverage the power of the cloud for scalability and efficiency.', icon: 'fas fa-cloud' },
    { name: 'UI/UX Design', description: 'Designing intuitive and engaging user experiences.', icon: 'fas fa-paint-brush' },
    { name: 'Data Analytics', description: 'Turning your data into actionable insights.', icon: 'fas fa-chart-line' },
    { name: 'Cyber Security', description: 'Protecting your digital assets from cyber threats.', icon: 'fas fa-shield-alt' }
];

const teamMembers = [
    { name: 'A M Sadat', position: 'Chief Executive Officer (CEO)', imageUrl: 'assets/Member 1.png', expertise: 'Software Expert, Full Stack Web Developer, Desktop Application, Graphic Design ', bio: 'Alice is a full-stack developer with a passion for creating beautiful and functional web applications.' },
    { name: 'Siddharto Sen', position: 'Chief Technology Officer (CTO)', imageUrl: 'assets/Member 2.jpeg', expertise: 'Python Developer, Data Analyst, Frontend Developer, NLP', bio: 'Siddharto is an expert in Python development and data analysis.' },
    { name: 'Sarwar Vaiya', position: 'Chief Information & Marketing Officer (CIMO)', imageUrl: 'assets/Member 4.jpg', expertise: 'Cyber Security Expert, Data Entry, Cyber Forensic, Python Developer', bio: 'Sarwar is a seasoned cyber security analyst.' },
    { name: 'Tasnim Chowdhury', position: 'Chief Marketing Officer (CMO)', imageUrl: 'assets/Member 4.jpg', expertise: 'Cyber Security Expert, Digital Marketing, Content Creation, SEO', bio: 'Tasnim is a creative powerhouse.' }
];

const projects = [
    { title: 'E-commerce Platform', description: 'A full-featured e-commerce platform with a custom CMS.', imageUrl: 'https://via.placeholder.com/300x200/0A2647/FFFFFF?text=Project+1', url: '#', category: 'web-development', featured: true },
    { title: 'Social Media App', description: 'A mobile app for connecting with friends and sharing updates.', imageUrl: 'https://via.placeholder.com/300x200/1C82AD/FFFFFF?text=Project+2', url: '#', category: 'mobile-app-development', featured: true },
    { title: 'Cloud Migration', description: 'Migrated a large enterprise system to a modern cloud infrastructure.', imageUrl: 'https://via.placeholder.com/300x200/20BF55/FFFFFF?text=Project+3', url: '#', category: 'cloud-solutions', featured: true },
    { title: 'Data Dashboard', description: 'A real-time data analytics dashboard for a financial services client.', imageUrl: 'https://via.placeholder.com/300x200/F8F9FA/343A40?text=Project+4', url: '#', category: 'data-analytics', featured: false },
    { title: 'Security Audit', description: 'Conducted a comprehensive security audit for a healthcare provider.', imageUrl: 'https://via.placeholder.com/300x200/343A40/FFFFFF?text=Project+5', url: '#', category: 'cyber-security', featured: false },
    { title: 'UI/UX Redesign', description: 'Redesigned the user interface for a popular productivity app.', imageUrl: 'https://via.placeholder.com/300x200/6C757D/FFFFFF?text=Project+6', url: '#', category: 'ui-ux-design', featured: false }
];

const testimonials = [
    { quote: 'IT Firm Plus delivered a stunning website that exceeded our expectations. Their team is professional, creative, and highly skilled.', author: 'John Doe', company: 'Tech Corp' },
    { quote: 'The mobile app they developed for us is a huge success. We have seen a significant increase in user engagement.', author: 'Jane Smith', company: 'Innovate LLC' },
    { quote: 'Their cloud solutions have transformed our business. We are now more agile and efficient than ever before.', author: 'Peter Jones', company: 'Global Solutions' }
];

const seedDB = async () => {
    await connectDB();

    try {
        console.log('Clearing existing data...');
        await Service.deleteMany({});
        await TeamMember.deleteMany({});
        await Project.deleteMany({});
        await Testimonial.deleteMany({});

        console.log('Seeding new data...');
        await Service.insertMany(services);
        await TeamMember.insertMany(teamMembers);
        await Project.insertMany(projects);
        await Testimonial.insertMany(testimonials);

        console.log('✅ Database seeded successfully!');
    } catch (err) {
        console.error(`❌ Error seeding database: ${err.message}`);
        process.exit(1);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
