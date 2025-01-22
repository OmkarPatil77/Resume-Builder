// Define job role keywords
const jobKeywords = {
    "data-analyst": ["dbms", "sql", "python", "data visualization", "excel"],
    "frontend-developer": ["html", "css", "javascript", "react", "responsive design"],
    "backend-developer": ["node.js", "express", "mongodb", "api", "authentication"]
};

// Input and preview elements
const inputs = {
    name: document.getElementById("name"),
    headline: document.getElementById("headline"),
    img: document.getElementById("img-link"),
    experience: document.getElementById("experience"),
    skills: document.getElementById("skills"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    about: document.getElementById("about"),
    school: document.getElementById("school"),
    jrCollege: document.getElementById("jr-college"),
    degreeCollege: document.getElementById("degree-college"),
};

const previews = {
    name: document.getElementById("preview-name"),
    headline: document.getElementById("preview-headline"),
    img: document.getElementById("preview-img"),
    experience: document.getElementById("preview-experience"),
    skills: document.getElementById("preview-skills"),
    email: document.getElementById("preview-email"),
    phone: document.getElementById("preview-phone"),
    about: document.getElementById("preview-about"),
    school: document.getElementById("preview-school"),
    jrCollege: document.getElementById("preview-jr-college"),
    degreeCollege: document.getElementById("preview-degree-college"),
};

// Update previews dynamically
Object.keys(inputs).forEach(key => {
    inputs[key].addEventListener("input", () => {
        if (key === "img") {
            previews.img.src = inputs.img.value;
            previews.img.style.display = inputs.img.value ? "block" : "none";
        } else {
            previews[key].textContent = inputs[key].value || `Your ${key} will appear here...`;
        }
    });
});

// ATS Check on job role selection
document.getElementById("job-role").addEventListener("change", () => {
    const selectedRole = document.getElementById("job-role").value;
    const keywords = jobKeywords[selectedRole];
    const resumeContent = `
        ${inputs.skills.value.toLowerCase()} 
        ${inputs.experience.value.toLowerCase()}
    `;

    const missingKeywords = keywords.filter(word => !resumeContent.includes(word));
    const atsStatus = document.getElementById("ats-status");

    if (missingKeywords.length > 0) {
        atsStatus.innerHTML = `Missing Keywords: <strong>${missingKeywords.join(", ")}</strong>`;
        atsStatus.style.color = "orange";
    } else {
        atsStatus.textContent = "ATS Check Passed: Your resume is optimized for this role!";
        atsStatus.style.color = "green";
    }
});

// Validate mandatory fields
const validateFields = () => {
    const mandatoryFields = ["name", "email", "skills"];
    for (const field of mandatoryFields) {
        if (!inputs[field].value.trim()) {
            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
            return false;
        }
    }
    return true;
};

// Download PDF
document.getElementById("download-btn").addEventListener("click", () => {
    if (!validateFields()) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`Name: ${inputs.name.value}`, 10, 10);
    doc.text(`Headline: ${inputs.headline.value}`, 10, 20);
    doc.text(`Experience: ${inputs.experience.value}`, 10, 30);
    doc.text(`Skills: ${inputs.skills.value}`, 10, 40);
    doc.text(`About: ${inputs.about.value}`, 10, 50);
    doc.text(`Education:`, 10, 60);
    doc.text(`- School: ${inputs.school.value}`, 15, 70);
    doc.text(`- Jr. College: ${inputs.jrCollege.value}`, 15, 80);
    doc.text(`- Degree College: ${inputs.degreeCollege.value}`, 15, 90);
    doc.text(`Email: ${inputs.email.value}`, 10, 100);
    doc.text(`Phone: ${inputs.phone.value}`, 10, 110);

    doc.save('resume.pdf');
});
