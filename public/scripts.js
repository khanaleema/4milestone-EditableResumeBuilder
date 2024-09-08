"use strict";
const resumeForm = document.getElementById('resume-form');
const resumeOutput = document.getElementById('resume-output');
const cropperContainer = document.getElementById('cropper-container');
const cropperImage = document.getElementById('cropper-image');
let profilePicFile = null;
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const educationData = Array.from(document.querySelectorAll('#education-section .education-entry')).map(entry => {
        const institution = entry.querySelector('input[name="institution"]').value;
        const degree = entry.querySelector('input[name="degree"]').value;
        const startDate = entry.querySelector('input[name="edu-start"]').value;
        const endDate = entry.querySelector('input[name="edu-end"]').value;
        return { institution, degree, startDate, endDate };
    });
    const workData = Array.from(document.querySelectorAll('#work-section .work-entry')).map(entry => {
        const company = entry.querySelector('input[name="company"]').value;
        const position = entry.querySelector('input[name="position"]').value;
        const startDate = entry.querySelector('input[name="work-start"]').value;
        const endDate = entry.querySelector('input[name="work-end"]').value;
        return { company, position, startDate, endDate };
    });
    const skillData = Array.from(document.querySelectorAll('#skills-section .skill-entry')).map(entry => {
        const skill = entry.querySelector('input[name="skill"]').value;
        return { skill };
    });
    const profilePic = profilePicFile ? URL.createObjectURL(profilePicFile) : '';
    resumeOutput.innerHTML = `
        <div class="resume-header">
            <img src="${profilePic}" alt="Profile Picture" class="resume-profile-pic">
            <div class="contact-info">
                <h2>${name}</h2>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Address: ${address}</p>
            </div>
        </div>
        <div class="resume-section">
            <h3>Education</h3>
            <ul>
                ${educationData.map(ed => `
                    <li><strong>${ed.institution}</strong> - ${ed.degree}<br>From ${ed.startDate} to ${ed.endDate}</li>
                `).join('')}
            </ul>
        </div>
        <div class="resume-section">
            <h3>Work Experience</h3>
            <ul>
                ${workData.map(work => `
                    <li><strong>${work.company}</strong> - ${work.position}<br>From ${work.startDate} to ${work.endDate}</li>
                `).join('')}
            </ul>
        </div>
        <div class="resume-section">
            <h3>Skills</h3>
            <ul>
                ${skillData.map(skill => `
                    <li>${skill.skill}</li>
                `).join('')}
            </ul>
        </div>
    `;
    // Use type assertion to ensure TypeScript recognizes the correct type
    const editResumeButton = document.querySelector('#edit-resume');
    if (editResumeButton) {
        editResumeButton.style.display = 'block';
    }
});
function addEducation() {
    const section = document.getElementById('education-section');
    const educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    educationEntry.innerHTML = `
        <input type="text" name="institution" placeholder="Institution" required>
        <input type="text" name="degree" placeholder="Degree" required>
        <input type="date" name="edu-start" placeholder="Start Date" required>
        <input type="date" name="edu-end" placeholder="End Date" required>
    `;
    section === null || section === void 0 ? void 0 : section.appendChild(educationEntry);
}
function addWorkExperience() {
    const section = document.getElementById('work-section');
    const workEntry = document.createElement('div');
    workEntry.className = 'work-entry';
    workEntry.innerHTML = `
        <input type="text" name="company" placeholder="Company" required>
        <input type="text" name="position" placeholder="Position" required>
        <input type="date" name="work-start" placeholder="Start Date" required>
        <input type="date" name="work-end" placeholder="End Date" required>
    `;
    section === null || section === void 0 ? void 0 : section.appendChild(workEntry);
}
function addSkill() {
    const section = document.getElementById('skills-section');
    const skillEntry = document.createElement('div');
    skillEntry.className = 'skill-entry';
    skillEntry.innerHTML = `
        <input type="text" name="skill" placeholder="Skill" required>
    `;
    section === null || section === void 0 ? void 0 : section.appendChild(skillEntry);
}
function previewImage(event) {
    var _a;
    const input = event.target;
    profilePicFile = ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
    if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            const img = document.getElementById('profile-pic-preview');
            img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(profilePicFile);
    }
}
function editProfilePic() {
    const img = document.getElementById('profile-pic-preview');
    cropperImage.src = img.src;
    cropperContainer.style.display = 'block';
    // Initialize cropper (you can use a library like Cropper.js here for better functionality)
    // For simplicity, this example assumes no actual cropping is done.
}
function saveCroppedImage() {
    const img = document.getElementById('profile-pic-preview');
    img.src = cropperImage.src;
    cropperContainer.style.display = 'none';
}
function cancelCrop() {
    cropperContainer.style.display = 'none';
}
function editResume() {
    const resumeForm = document.getElementById('resume-form');
    resumeForm.scrollIntoView({ behavior: 'smooth' });
}
