QUE'S Job Card Application
A modern, mobile-friendly job card application for QUE'S Maintenance Services.
Features
✓ Auto-generated sequential job numbers (QJC-4000, QJC-4001, etc.)
✓ Mobile responsive design
✓ Save as PDF with one click
✓ Works offline after first load
✓ Perfect for two users simultaneously
✓ Professional formatting
✓ Automatic job number tracking
Quick Start
Visit the live app at your Vercel URL
Fill out the job details
Click "Save as PDF"
Job card PDF downloads to your device
Click "New Card" for the next job
Job Details
The application captures:
Job Number: Auto-generated (QJC-4000, QJC-4001, etc.)
Date: Date of the job
SAP #: SAP number
AF #: AF number
Client: Client information (expandable text area)
Location: Job location
Requirement: Job requirement/description
Arrival Time: When the technician arrived
Departure Time: When the technician left
Hours Worked: Total hours on the job
Mileage: Distance traveled
Day of Week: Which day the job was completed (MON, TUES, WED, THUR, FRI, SAT, SUN, N/T, O/T)
Service Type: Type of service (DELIVERY, COURTESY CALL, INSTALLATION, WORKSHOP, BREAKDOWN, PLANNED MAINT, WARRANTY, OTHER)
Description of Work Done: Detailed description of work completed
Parts Used: Table with part description, part number, and quantity
Technician Signature: Name and signature area
Customer Signature: Name and signature area
Job Number Format
Job numbers start at QJC-4000 and increment automatically:
First job: QJC-4000
Second job: QJC-4001
Third job: QJC-4002
And so on...
Job numbers are stored in browser local storage and never repeat.
How to Use on Mobile
iPhone:
Open the URL in Safari
Tap the Share button
Select "Add to Home Screen"
The app appears on your home screen like a native app
Android:
Open the URL in Chrome
Tap the menu button (three dots)
Select "Install app"
The app appears on your home screen like a native app
For Multiple Users
Both technicians can access the same URL and work simultaneously. Each generates their own job card with sequential numbers. The app uses browser local storage, so:
On the same device: Numbers continue sequentially
On different devices: Each device maintains its own counter (consider starting one device at 5000 to differentiate if needed)
PDF Export
Clicking "Save as PDF" will:
Download a PDF with the job number in the filename
Include all entered information
Be formatted for professional printing
Be ready to email or store
Features in Detail
White Checkboxes
Day of Week: 9 options in grid format
Service Type: 8 options in grid format
Checkboxes remain white with gray borders for clean appearance
Parts Table
Add as many parts as needed
Click "+ Add Row" to add more rows
Capture part description, part number, and quantity
Auto-Save
All information stays in the form until "New Card" is clicked
Refreshing the page keeps your data
Only "New Card" resets the form
Browser Compatibility
Works on all modern browsers:
Chrome/Chromium (Android)
Safari (iOS)
Firefox
Edge
Technical Details
Built with React 18
Uses Tailwind CSS for styling
Uses Lucide React for icons
Uses browser localStorage for job number tracking
Print-optimized for PDF export
Fully responsive design
Tips
Fill in the date first for reference
Check the correct day of week and service type
Be detailed in the "Description of Work Done"
Add all parts used to the parts table
Get both signatures before submitting
Support
For issues or feature requests, contact QUE'S Maintenance Services directly.
