// Helpful jQuery cheatsheet at https://oscarotero.com/jquery/

class Course {
    constructor(number, title, sections) {
        // assign values passed in to this
        this.number = number;
        this.title = title;
        this.sections = sections;
        
    }
}

class Section {
    constructor(number, instructor, schedule, location) {
        // assign values passed in to this
        this.number = number;
        this.instructor = instructor;
        this.schedule = schedule;
        this.location = location;
    }
}

class Registration {
    constructor(course, title, section, instructor, schedule, location) {
        // assign values passed in to this
        this.course = course;
        this.title = title;
        this.section = section;
        this.instructor = instructor;
        this.schedule = schedule;
        this.location = location;
    }
}

var courseCatalog;
var controls;
var lists;
var events;

window.onload = function () {

    courseCatalog = [
        new Course("CSE3330", "DATABASE CONCEPTS", [
            new Section("342", "Steve Labova", "TuTh 11:00AM - 12:20PM", "Junkins Building 0112"),
            new Section("334", "Matthew Mathis", "W 8:00AM - 9:50AM", "Caruth Hall 0110"),
            new Section("311", "Steve Labova", "MW 11:00AM - 12:20PM", "Junkins Building 0112"),
        ]),
        new Course("CSE3339", "INFORMATION ASSURANCE AND SECURITY", [
            new Section("331", "Karen McBride", "W 8:00AM - 9:50AM", "Junkins Building 0132"),
            new Section("421", "Steve Labova", "TuTh 11:00AM - 12:20PM", "Caruth Hall 0101"),
            new Section("441", "John Stanton", "TuTh 3:30PM - 4:50PM", "Embrey Engineering Bldg 0102"),
        ]),
        new Course("CSE3342", "PROGRAMMING LANGUAGES", [
            new Section("513", "Darren Jenson", "M 5:00PM - 6:50PM", "Embrey Engineering Bldg 0129"),
            new Section("541", "Karen McBride", "MW 3:30PM - 4:50PM", "Junkins Building 0222"),
            new Section("204", "Karen McBride", "TuTh 3:30PM - 4:50PM", "Caruth Hall 0210"),
        ]),
        new Course("CSE3345", "GRAPHICAL USER INTERFACE DESIGN AND IMPLEMENTATION", [
            new Section("421", "Tina Dolan", "TuTh 1:00PM - 3:20PM", "Embrey Engineering Bldg 0111"),
            new Section("532", "Matthew Mathis", "MW 5:00PM - 6:20PM", "Embrey Engineering Bldg 0232"),
            new Section("546", "Darren Jenson", "W 5:00PM - 6:50PM", "Junkins Building 0112"),
        ]),
        new Course("CSE3353", "FUNDAMENTALS OF ALGORITHMS", [
            new Section("456", "Tina Dolan", "MW 5:00PM - 6:30PM", "Caruth Hall 0221"),
            new Section("564", "Karen McBride", "MW 1:00PM - 3:20PM", "Caruth Hall 0221"),
            new Section("556", "Matthew Mathis", "W 5:00PM - 6:50PM", "Caruth Hall 0284"),
        ]),
        new Course("CSE3365", "INTRODUCTION TO SCIENTIFIC COMPUTING", [
            new Section("353", "Tina Dolan", "TuTh 5:00PM - 6:20PM", "Caruth Hall 0484"),
            new Section("327", "John Stanton", "W 1:00PM - 3:50PM", "Caruth Hall 0484"),
            new Section("395", "Tina Dolan", "TuTh 1:00PM - 3:20PM", "Caruth Hall 0484"),
        ]),
    ];

    controls = {
        fallRegistrationTableBody: $('.fall'), // apply selector for fall registation table body
        springRegistrationTableBody: $('.spring'), // apply selector for spring registation table body
        noFallRegistrationMessage: $('.nofall'), // apply selector for no fall registation message
        noSpringRegistrationMessage: $('.nospring'), // apply selector for no spring registation message
        semesterField: $('#semester-d'), // apply selector for semester field (select)
        courseField: $('#course-d'), // apply selector for course field (select)
        sectionField: $('#section-d') // apply selector for section field (select)
    };

    lists = {
        fall: [],
        spring: []
    };

    events = {    
        
        onRegistrationChange: () => { // this method will be called from JavaScript below
            var bindTable = (list, tableBody, noItemMessage) => {
                var result = '';

                list.forEach(registration => {
                    // build html row using string interpolation
                    result += 
                    `<tr>
                        <td>${registration.course.number}</td>
                        <td>${registration.title}</td>
                        <td>${registration.section.number}</td>
                        <td>${registration.schedule}</td>
                        <td>${registration.instructor}</td>
                        <td>${registration.location}</td>
                    `;
                });

                // use tableBody.html method to assign result
                tableBody.html(result);
                
                if(list.length > 0) {
                    noItemMessage.hide();
                    tableBody.parent().show();
                }
    
                else {
                    noItemMessage.show();
                    tableBody.parent().hide(); 
                }
            };

            // call bindTable w/ list.fall, controls.fallRegistrationTableBody and controls.noFallRegistrationMessage
            bindTable(lists.fall, controls.fallRegistrationTableBody, controls.noFallRegistrationMessage);
            // do same for spring
            bindTable(lists.spring, controls.springRegistrationTableBody, controls.noSpringRegistrationMessage);            
        },
        onSemesterChange: () => { // this method needs to be called from html at the appropriate time. Don't forget "events."
            var result = '<option></option>'; // this ensures empty default option

            courseCatalog.forEach((c, i) => {
                // c = course, i = index
                // use string interpolation to add course option to result string
                // format: <option value="0">CSE3345 - GRAPHICAL USER INTERFACE DESIGN AND IMPLEMENTATION</option>
                // (0 = i)
                result += `<option value="${i}">${c.number}-${c.title}</option>`;
            });

            // set result to controls.courseField.html
            controls.courseField.html(result);
        },
        onCourseChange: () => { // this method needs to be called from html at the appropriate time. Don't forget "events."
            var result = '<option></option>'; // this ensures empty default option

            var courseIndex = +controls.courseField.val();
            var course = courseCatalog[Object.keys(courseCatalog)[courseIndex]]; // instead of undefined, use courseIndex to assign to the right course in the courseCatalog array
            
            course.sections.forEach((s, i) => {
                // s = section, i = index
                // use string interpolation to add section option to result string
                // format: <option value="0">TuTh 11:00AM - 12:20PM (Steve Labova)</option>
                // (0 = i)
                result += `<option value="${i}">${s.schedule} (${s.instructor})</option>`;
            });

            // set result to controls.sectionField.html
            controls.sectionField.html(result);
        },
        onAddCourseClick: () => { // this method needs to be called from html at the appropriate time. Don't forget "events."
            var semesterIndex = +controls.semesterField.val(); // instead of undefined, retreive val from controls.semesterField (use + to convert string to number)
            var courseIndex = +controls.courseField.val(); // instead of undefined, retreive val from controls.courseField (use + to convert string to number)
            var sectionIndex = +controls.sectionField.val(); // instead of undefined, retreive val from controls.sectionField (use + to convert string to number)

            var course = courseCatalog[Object.keys(courseCatalog)[courseIndex]]; // instead of undefined, use courseIndex to assign to the right course in the courseCatalog array
            var section = course.sections[Object.keys(course.sections)[sectionIndex]]; // instead of undefined, use sectionIndex to assign to the right section in the course.sections array

            var registration = new Registration(course, course.title, section, section.instructor, section.schedule, section.location); // populate arguments of contructor from course and section

            // switch on semesterIndex
            // if 0, add registation to lists.fall
            // if 1, add registation to lists.spring
            semesterIndex === 0 ? lists.fall.push(registration) :
            lists.spring.push(registration);

            // call event.onRegistrationChange
            events.onRegistrationChange();

            // use val method to set value of controls.semesterField to '', thereby clearing selection
            // do the same for courseField and sectionField 
            controls.semesterField.val('');
            controls.courseField.val('');
            controls.sectionField.val('');
            $('.close').click();
            
//                            alert(tableBody.html(result));
        }
    };

    // call event.onRegistrationChange to do initial binding, showing and hiding
    events.onRegistrationChange();
}