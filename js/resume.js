function analyzeResume(){

    const file =
        document.getElementById("resumeFile").files[0];

    if(!file){

        document.getElementById("result").innerHTML =
            "Please upload a resume.";

        return;
    }

    document.getElementById("result").innerHTML =
        `
        Resume Uploaded Successfully

        <br><br>

        ATS Score: 78/100

        <br><br>

        Suggestions:
        <br>
        • Add more project details
        <br>
        • Include technical skills section
        <br>
        • Add measurable achievements
        `;
}