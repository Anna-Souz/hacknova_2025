from flask import Flask, render_template, request, redirect, url_for
import os
import pandas as pd
from pdf2image import convert_from_path
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Paragraph, Image
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import pywhatkit as kit
import time

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload and output directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs('output_pdfs', exist_ok=True)
os.makedirs('output_images', exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        process_excel(filepath)
        return 'File uploaded and processed successfully'

def process_excel(filepath):
    # Read Excel data
    excel_data = pd.read_excel(filepath)

    # Generate PDFs and convert to images
    for index, row in excel_data.iterrows():
        student_data = row.to_dict()
        pdf_path = generate_student_pdf(student_data)
        convert_pdf_to_images(pdf_path)

    # Send images via WhatsApp
    for index, row in excel_data.iterrows():
        whatsapp_number = row['Contact']
        image_path = f'output_images/{row["USN"]}_report/{row["USN"]}_report_page_1.png'
        if os.path.exists(image_path):
            try:
                send_whatsapp_with_image(whatsapp_number, image_path)
            except Exception as e:
                print(f"Error occurred while sending image to {whatsapp_number}: {e}")

def generate_student_pdf(data):
    pdf_path = os.path.join('output_pdfs', f"{data['USN']}_report.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter)
    elements = []

    logo_path = "logo.png"
    if os.path.exists(logo_path):
        logo = Image(logo_path, width=40, height=40)
        elements.append(logo)

    college_name = "JAIN COLLEGE OF ENGINEERING AND RESEARCH, UDYAMBAG BELAGAVI-590008"
    college_header = Paragraph(college_name, ParagraphStyle(name='CenteredHeader', alignment=1))
    elements.append(college_header)
    elements.append(Spacer(1, 12))

    student_info_data = [
        ["Name", data["Name"]],
        ["USN", data["USN"]],
        ["Father's Name", data["Father's Name"]],
        ["Mother's Name", data["Mother's Name"]],
        ["Contact", data["Contact"]]
    ]
    student_info_table = Table(student_info_data)
    student_info_table.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(student_info_table)
    elements.append(Spacer(1, 12))

    course_data = [["Sl_No", "Course", "Course Code", "Max Marks", "Marks Scored", "Attendance"]]
    for i in range(1, 6):
        course_row = [
            i, data.get(f"Course {i}", ""), data.get(f"Course code {i}", ""),
            data.get(f"Max Marks {i}", ""), data.get(f"Marks Scored {i}", ""),
            data.get(f"Attendance {i}", "")
        ]
        course_data.append(course_row)

    course_table = Table(course_data)
    course_table.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(course_table)

    doc.build(elements)
    return pdf_path

def convert_pdf_to_images(pdf_path):
    poppler_path = r'C:\Program Files\poppler-23.11.0\Library\bin'
    images = convert_from_path(pdf_path, poppler_path=poppler_path)
    pdf_name = os.path.splitext(os.path.basename(pdf_path))[0]
    output_directory = os.path.join('output_images', pdf_name)
    os.makedirs(output_directory, exist_ok=True)
    for i, image in enumerate(images):
        image_path = os.path.join(output_directory, f'{pdf_name}_page_{i + 1}.png')
        image.save(image_path, 'PNG')

def send_whatsapp_with_image(to, image_path):
    kit.sendwhats_image(to, image_path, caption="Respected sir/madam, please find your ward's report attached")
    time.sleep(10)

if __name__ == '__main__':
    app.run(debug=True)
