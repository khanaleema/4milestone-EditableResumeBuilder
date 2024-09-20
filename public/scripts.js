var resumeForm = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var cropperContainer = document.getElementById('cropper-container');
var cropperImage = document.getElementById('cropper-image');
var profilePicFile = null;
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var educationData = Array.from(document.querySelectorAll('#education-section .education-entry')).map(function (entry) {
        var institution = entry.querySelector('input[name="institution"]').value;
        var degree = entry.querySelector('input[name="degree"]').value;
        var startDate = entry.querySelector('input[name="edu-start"]').value;
        var endDate = entry.querySelector('input[name="edu-end"]').value;
        return { institution: institution, degree: degree, startDate: startDate, endDate: endDate };
    });
    var workData = Array.from(document.querySelectorAll('#work-section .work-entry')).map(function (entry) {
        var company = entry.querySelector('input[name="company"]').value;
        var position = entry.querySelector('input[name="position"]').value;
        var startDate = entry.querySelector('input[name="work-start"]').value;
        var endDate = entry.querySelector('input[name="work-end"]').value;
        return { company: company, position: position, startDate: startDate, endDate: endDate };
    });
    var skillData = Array.from(document.querySelectorAll('#skills-section .skill-entry')).map(function (entry) {
        var skill = entry.querySelector('input[name="skill"]').value;
        return { skill: skill };
    });
    var profilePic = profilePicFile ? URL.createObjectURL(profilePicFile) : '';
    resumeOutput.innerHTML = "\n        <div class=\"resume-header\">\n            <img src=\"".concat(profilePic, "\" alt=\"Profile Picture\" class=\"resume-profile-pic\">\n            <div class=\"contact-info\">\n                <h2>").concat(name, "</h2>\n                <p>Email: ").concat(email, "</p>\n                <p>Phone: ").concat(phone, "</p>\n                <p>Address: ").concat(address, "</p>\n            </div>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Education</h3>\n            <ul>\n                ").concat(educationData.map(function (ed) { return "\n                    <li><strong>".concat(ed.institution, "</strong> - ").concat(ed.degree, "<br>From ").concat(ed.startDate, " to ").concat(ed.endDate, "</li>\n                "); }).join(''), "\n            </ul>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Work Experience</h3>\n            <ul>\n                ").concat(workData.map(function (work) { return "\n                    <li><strong>".concat(work.company, "</strong> - ").concat(work.position, "<br>From ").concat(work.startDate, " to ").concat(work.endDate, "</li>\n                "); }).join(''), "\n            </ul>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Skills</h3>\n            <ul>\n                ").concat(skillData.map(function (skill) { return "\n                    <li>".concat(skill.skill, "</li>\n                "); }).join(''), "\n            </ul>\n        </div>\n    ");
    // Use type assertion to ensure TypeScript recognizes the correct type
    var editResumeButton = document.querySelector('#edit-resume');
    if (editResumeButton) {
        editResumeButton.style.display = 'block';
    }
});
function addEducation() {
    var section = document.getElementById('education-section');
    var educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    educationEntry.innerHTML = "\n        <input type=\"text\" name=\"institution\" placeholder=\"Institution\" required>\n        <input type=\"text\" name=\"degree\" placeholder=\"Degree\" required>\n        <input type=\"date\" name=\"edu-start\" placeholder=\"Start Date\" required>\n        <input type=\"date\" name=\"edu-end\" placeholder=\"End Date\" required>\n    ";
    section === null || section === void 0 ? void 0 : section.appendChild(educationEntry);
}
function addWorkExperience() {
    var section = document.getElementById('work-section');
    var workEntry = document.createElement('div');
    workEntry.className = 'work-entry';
    workEntry.innerHTML = "\n        <input type=\"text\" name=\"company\" placeholder=\"Company\" required>\n        <input type=\"text\" name=\"position\" placeholder=\"Position\" required>\n        <input type=\"date\" name=\"work-start\" placeholder=\"Start Date\" required>\n        <input type=\"date\" name=\"work-end\" placeholder=\"End Date\" required>\n    ";
    section === null || section === void 0 ? void 0 : section.appendChild(workEntry);
}
function addSkill() {
    var section = document.getElementById('skills-section');
    var skillEntry = document.createElement('div');
    skillEntry.className = 'skill-entry';
    skillEntry.innerHTML = "\n        <input type=\"text\" name=\"skill\" placeholder=\"Skill\" required>\n    ";
    section === null || section === void 0 ? void 0 : section.appendChild(skillEntry);
}
function previewImage(event) {
    var _a;
    var input = event.target;
    profilePicFile = ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
    if (profilePicFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var img = document.getElementById('profile-pic-preview');
            img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(profilePicFile);
    }
}
function editProfilePic() {
    var img = document.getElementById('profile-pic-preview');
    cropperImage.src = img.src;
    cropperContainer.style.display = 'block';
}
function saveCroppedImage() {
    var img = document.getElementById('profile-pic-preview');
    img.src = cropperImage.src;
    cropperContainer.style.display = 'none';
}
function cancelCrop() {
    cropperContainer.style.display = 'none';
}
function editResume() {
    var resumeForm = document.getElementById('resume-form');
    resumeForm.scrollIntoView({ behavior: 'smooth' });
}
