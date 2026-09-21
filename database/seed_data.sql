-- ============================================================================
-- Smart Healthcare Appointment & Prescription System - Realistic Seed Data
-- ============================================================================

USE smart_healthcare_db;

-- 1. Insert Doctors
INSERT INTO doctors (doctor_id, doctor_code, name, specialization, department, experience_years, room_number, consultation_fee, is_available) VALUES
(1, 'DOC-CARD-01', 'Dr. Arvind Sharma', 'Cardiologist', 'Cardiology', 15, 'Room 102', 800.00, TRUE),
(2, 'DOC-NEUR-02', 'Dr. Radhika Kapoor', 'Neurologist', 'Neurology', 12, 'Room 205', 900.00, TRUE),
(3, 'DOC-PEDI-03', 'Dr. Sameer Verma', 'Pediatrician', 'Pediatrics', 8, 'Room 108', 500.00, TRUE),
(4, 'DOC-ORTH-04', 'Dr. Meena Swaminathan', 'Orthopedic Surgeon', 'Orthopedics', 18, 'Room 304', 750.00, TRUE),
(5, 'DOC-GENM-05', 'Dr. Rajesh Deshmukh', 'General Physician', 'General Medicine', 10, 'Room 101', 400.00, TRUE),
(6, 'DOC-DERM-06', 'Dr. Ananya Roy', 'Dermatologist', 'Dermatology', 7, 'Room 210', 600.00, TRUE);

-- 2. Insert Patients
INSERT INTO patients (patient_id, patient_code, first_name, last_name, email, phone, gender, date_of_birth, blood_group, emergency_contact) VALUES
(1, 'PAT-001', 'Sachin', 'Gurjar', 'sachingurjar8180@gmail.com', '+91 9928486513', 'Male', '2002-08-14', 'B+', '+91 9829012345'),
(2, 'PAT-002', 'Aarav', 'Mehta', 'aarav.mehta@gmail.com', '+91 9823456781', 'Male', '1995-04-22', 'O+', '+91 9823456789'),
(3, 'PAT-003', 'Diya', 'Nair', 'diya.nair@gmail.com', '+91 9876543210', 'Female', '1989-11-03', 'A+', '+91 9876543219'),
(4, 'PAT-004', 'Rohan', 'Saxena', 'rohan.saxena@gmail.com', '+91 9123456780', 'Male', '2001-02-18', 'AB+', '+91 9123456788'),
(5, 'PAT-005', 'Kavita', 'Joshi', 'kavita.joshi@gmail.com', '+91 9988776655', 'Female', '1978-07-29', 'B-', '+91 9988776650'),
(6, 'PAT-006', 'Vikramaditya', 'Rao', 'vikram.rao@gmail.com', '+91 9765432109', 'Male', '1965-12-10', 'O-', '+91 9765432100'),
(7, 'PAT-007', 'Pooja', 'Chopra', 'pooja.chopra@gmail.com', '+91 9654321098', 'Female', '1998-09-15', 'A-', '+91 9654321090'),
(8, 'PAT-008', 'Manish', 'Bhardwaj', 'manish.bhardwaj@gmail.com', '+91 9543210987', 'Male', '1983-03-05', 'B+', '+91 9543210980'),
(9, 'PAT-009', 'Snehal', 'Kulkarni', 'snehal.kulkarni@gmail.com', '+91 9432109876', 'Female', '1992-06-19', 'O+', '+91 9432109870'),
(10, 'PAT-010', 'Tanmay', 'Bhatia', 'tanmay.bhatia@gmail.com', '+91 9321098765', 'Male', '2004-10-30', 'AB-', '+91 9321098760'),
(11, 'PAT-011', 'Simran', 'Gill', 'simran.gill@gmail.com', '+91 9210987654', 'Female', '1987-01-25', 'A+', '+91 9210987650'),
(12, 'PAT-012', 'Harsh', 'Vardhan', 'harsh.vardhan@gmail.com', '+91 9109876543', 'Male', '1972-05-14', 'O+', '+91 9109876540');

-- 3. Insert Appointments
INSERT INTO appointments (appointment_id, appointment_code, patient_id, doctor_id, appointment_date, time_slot, status, symptoms, wait_time_minutes, consultation_duration, booking_lead_days, booking_channel) VALUES
(1, 'APT-2026-001', 1, 5, '2026-09-10', '09:00 AM', 'Completed', 'Seasonal fever, mild sore throat and body ache', 12, 18, 1, 'Online Portal'),
(2, 'APT-2026-002', 2, 1, '2026-09-10', '09:30 AM', 'Completed', 'Chest tightness during morning jogging', 25, 30, 4, 'Online Portal'),
(3, 'APT-2026-003', 3, 2, '2026-09-10', '10:00 AM', 'Completed', 'Recurring migraine headaches on left temple', 18, 22, 5, 'Phone Call'),
(4, 'APT-2026-004', 4, 6, '2026-09-10', '10:30 AM', 'Cancelled', 'Skin rash on forearm with allergic itching', 0, 0, 2, 'Online Portal'),
(5, 'APT-2026-005', 5, 4, '2026-09-10', '11:00 AM', 'Completed', 'Right knee pain aggravated by stair climbing', 35, 25, 7, 'Walk-in'),
(6, 'APT-2026-006', 6, 1, '2026-09-11', '09:00 AM', 'Completed', 'Post-surgery cardiac hypertension checkup', 22, 28, 6, 'Online Portal'),
(7, 'APT-2026-007', 7, 3, '2026-09-11', '09:30 AM', 'Completed', 'Infant vaccination and growth milestone review', 8, 15, 2, 'Phone Call'),
(8, 'APT-2026-008', 8, 5, '2026-09-11', '10:00 AM', 'No-Show', 'Chronic acid reflux and digestive discomfort', 0, 0, 8, 'Online Portal'),
(9, 'APT-2026-009', 9, 6, '2026-09-11', '10:30 AM', 'Completed', 'Eczema flare-up on wrist and fingers', 10, 15, 3, 'Online Portal'),
(10, 'APT-2026-010', 10, 4, '2026-09-11', '11:00 AM', 'Completed', 'Sports injury, sprained ankle from football match', 28, 20, 1, 'Walk-in'),
(11, 'APT-2026-011', 11, 2, '2026-09-12', '09:00 AM', 'Completed', 'Peripheral numbness and tingling in right fingers', 15, 25, 4, 'Online Portal'),
(12, 'APT-2026-012', 12, 1, '2026-09-12', '09:30 AM', 'No-Show', 'Palpitations and irregular pulse after exertion', 0, 0, 9, 'Online Portal'),
(13, 'APT-2026-013', 1, 1, '2026-09-12', '10:00 AM', 'Completed', 'Routine cardiovascular preventive screening', 14, 20, 3, 'Online Portal'),
(14, 'APT-2026-014', 2, 5, '2026-09-12', '10:30 AM', 'Completed', 'High blood sugar follow-up and dietary counseling', 10, 15, 2, 'Phone Call'),
(15, 'APT-2026-015', 3, 4, '2026-09-12', '11:00 AM', 'Completed', 'Lower back stiffness from prolonged desk work', 32, 22, 5, 'Walk-in'),
(16, 'APT-2026-016', 4, 3, '2026-09-13', '09:00 AM', 'Completed', 'Childhood asthma review and inhaler technique check', 6, 15, 2, 'Phone Call'),
(17, 'APT-2026-017', 5, 2, '2026-09-13', '09:30 AM', 'Completed', 'Vertigo attacks and balance instability', 20, 24, 4, 'Online Portal'),
(18, 'APT-2026-018', 6, 6, '2026-09-13', '10:00 AM', 'Cancelled', 'Persistent dry scalp and fungal patch', 0, 0, 3, 'Online Portal'),
(19, 'APT-2026-019', 7, 5, '2026-09-13', '10:30 AM', 'Completed', 'Urinary tract infection symptoms and fever', 12, 16, 1, 'Walk-in'),
(20, 'APT-2026-020', 8, 4, '2026-09-13', '11:00 AM', 'Completed', 'Shoulder impingement and limited range of motion', 40, 26, 6, 'Online Portal'),
(21, 'APT-2026-021', 9, 1, '2026-09-14', '09:00 AM', 'Completed', 'Elevated LDL cholesterol management', 18, 20, 3, 'Online Portal'),
(22, 'APT-2026-022', 10, 5, '2026-09-14', '09:30 AM', 'No-Show', 'Viral flu recovery checkup', 0, 0, 10, 'Online Portal'),
(23, 'APT-2026-023', 11, 6, '2026-09-14', '10:00 AM', 'Completed', 'Acne vulgaris topical therapy review', 8, 14, 2, 'Online Portal'),
(24, 'APT-2026-024', 12, 2, '2026-09-14', '10:30 AM', 'Completed', 'Tremors in left hand during resting state', 24, 28, 5, 'Phone Call'),
(25, 'APT-2026-025', 1, 4, '2026-09-15', '09:00 AM', 'Completed', 'Lumbar strain from heavy gym deadlifts', 16, 22, 2, 'Online Portal'),
(26, 'APT-2026-026', 2, 3, '2026-09-15', '09:30 AM', 'Completed', 'Pediatric allergic rhinitis and sneezing fits', 10, 15, 3, 'Phone Call'),
(27, 'APT-2026-027', 3, 1, '2026-09-15', '10:00 AM', 'Completed', 'Mild sinus tachycardia and stress response', 26, 25, 4, 'Online Portal'),
(28, 'APT-2026-028', 4, 5, '2026-09-15', '10:30 AM', 'Completed', 'Type 2 Diabetes HbA1c 3-month evaluation', 14, 20, 5, 'Walk-in'),
(29, 'APT-2026-029', 5, 6, '2026-09-15', '11:00 AM', 'Completed', 'Psoriasis plaque monitoring on elbows', 12, 15, 2, 'Online Portal'),
(30, 'APT-2026-030', 6, 2, '2026-09-16', '09:00 AM', 'Completed', 'Sleep apnea and daytime drowsiness evaluation', 19, 25, 4, 'Online Portal'),
(31, 'APT-2026-031', 7, 1, '2026-09-16', '09:30 AM', 'Scheduled', 'Hypertension medication dosage titration', 0, 0, 3, 'Online Portal'),
(32, 'APT-2026-032', 8, 4, '2026-09-16', '10:00 AM', 'Scheduled', 'Cervical spondylosis physical therapy check', 0, 0, 2, 'Phone Call'),
(33, 'APT-2026-033', 9, 5, '2026-09-16', '10:30 AM', 'Scheduled', 'General executive wellness health package', 0, 0, 4, 'Online Portal'),
(34, 'APT-2026-034', 10, 3, '2026-09-16', '11:00 AM', 'Scheduled', 'Pediatric seasonal ear infection follow-up', 0, 0, 1, 'Walk-in'),
(35, 'APT-2026-035', 11, 1, '2026-09-17', '09:00 AM', 'Scheduled', 'Preventive cardiac echocardiogram review', 0, 0, 5, 'Online Portal'),
(36, 'APT-2026-036', 12, 6, '2026-09-17', '09:30 AM', 'Scheduled', 'Melasma pigment patch follow-up', 0, 0, 3, 'Online Portal');

-- 4. Insert Prescriptions
INSERT INTO prescriptions (prescription_id, prescription_code, appointment_id, patient_id, doctor_id, diagnosis, clinical_notes, follow_up_date, prescribed_date) VALUES
(1, 'RX-2026-001', 1, 1, 5, 'Acute Upper Respiratory Tract Infection', 'Advised 3 days voice rest, hydration, and steam inhalation.', '2026-09-24', '2026-09-10'),
(2, 'RX-2026-002', 2, 2, 1, 'Early Stage Coronary Artery Disease & Angina', 'ECG indicates mild ST changes. Low-sodium diet advised.', '2026-10-10', '2026-09-10'),
(3, 'RX-2026-003', 3, 3, 2, 'Chronic Migraine without Aura', 'Identify trigger foods; maintain sleep consistency diary.', '2026-10-01', '2026-09-10'),
(4, 'RX-2026-004', 5, 5, 4, 'Grade II Osteoarthritis of Right Knee', 'Quadriceps isometric exercises prescribed; avoid squatting.', '2026-10-15', '2026-09-10'),
(5, 'RX-2026-005', 6, 6, 1, 'Primary Essential Hypertension', 'BP measured at 146/92. Target BP < 130/80 mmHg.', '2026-09-25', '2026-09-11'),
(6, 'RX-2026-006', 9, 9, 6, 'Atopic Dermatitis & Contact Eczema', 'Avoid scented soaps; apply ceramide barrier cream immediately post-shower.', '2026-09-28', '2026-09-11'),
(7, 'RX-2026-007', 10, 10, 4, 'Grade I Lateral Ankle Ligament Sprain', 'R.I.C.E. protocol for 48 hours; crepe bandage immobilization.', '2026-09-22', '2026-09-11'),
(8, 'RX-2026-008', 11, 11, 2, 'Carpal Tunnel Syndrome (Mild Bilateral)', 'Wrist splinting at night; ergonomic mouse pad recommended.', '2026-10-05', '2026-09-12'),
(9, 'RX-2026-009', 13, 1, 1, 'Benign Sinus Arrhythmia with Borderline Lipids', 'Lipid profile shows slightly elevated LDL. Moderate cardio 30 min/day.', '2026-10-12', '2026-09-12'),
(10, 'RX-2026-010', 14, 2, 5, 'Type 2 Diabetes Mellitus with Dyslipidemia', 'Fasting glucose 142 mg/dL. Re-check HbA1c in 90 days.', '2026-10-20', '2026-09-12'),
(11, 'RX-2026-011', 25, 1, 4, 'Acute Lumbar Muscle Spasm', 'Heating pad applications twice daily; core strengthening after pain subsidence.', '2026-09-29', '2026-09-15');

-- 5. Insert Prescription Medicines
INSERT INTO prescription_medicines (item_id, prescription_id, medicine_name, dosage, frequency, duration_days, time_of_day, instructions) VALUES
(1, 1, 'Amoxicillin & Clavulanate 625mg', '1 Tablet', 'Twice daily', 5, 'Morning, Night', 'Take after meals. Complete full course.'),
(2, 1, 'Paracetamol 650mg', '1 Tablet', 'As needed for fever (max 3 times/day)', 3, 'Afternoon, Night', 'Take with water if body temp > 99.5F'),
(3, 1, 'Cetirizine 10mg', '1 Tablet', 'Once daily at bedtime', 5, 'Night', 'May cause mild drowsiness'),
(4, 2, 'Atorvastatin 20mg', '1 Tablet', 'Once daily at bedtime', 30, 'Night', 'Cholesterol management'),
(5, 2, 'Metoprolol Succinate 25mg', '1 Tablet', 'Once daily in the morning', 30, 'Morning', 'Heart rate control; do not stop abruptly'),
(6, 2, 'Ecosprin (Aspirin) 75mg', '1 Tablet', 'Once daily after lunch', 30, 'Afternoon', 'Blood thinner; take with food'),
(7, 3, 'Rizatriptan 10mg', '1 Tablet', 'At migraine onset', 10, 'As Needed', 'Maximum 2 tablets in 24 hours'),
(8, 3, 'Propranolol 40mg', '1 Tablet', 'Twice daily', 30, 'Morning, Night', 'Prophylactic migraine prevention'),
(9, 4, 'Glucosamine & Chondroitin', '1 Capsule', 'Twice daily with meals', 60, 'Morning, Night', 'Joint cartilage support'),
(10, 4, 'Aceclofenac 100mg + Paracetamol 325mg', '1 Tablet', 'Twice daily after food', 7, 'Morning, Night', 'Pain relief. Stop if gastric upset occurs'),
(11, 5, 'Telmisartan 40mg', '1 Tablet', 'Once daily morning', 30, 'Morning', 'Blood pressure regulation'),
(12, 6, 'Mometasone Furoate 0.1% Cream', 'Thin film', 'Apply twice daily', 14, 'Morning, Night', 'Topical application on affected eczema patches'),
(13, 7, 'Diclofenac Sodium Gel 1%', 'Topical application', '3 times a day', 7, 'Morning, Afternoon, Night', 'Gently massage around lateral ankle'),
(14, 8, 'Pregabalin 75mg', '1 Capsule', 'Once daily at bedtime', 21, 'Night', 'Neuropathic tingling relief'),
(15, 9, 'Rosuvastatin 10mg', '1 Tablet', 'Once daily at bedtime', 30, 'Night', 'Lipid lowering agent'),
(16, 10, 'Metformin 500mg (Extended Release)', '1 Tablet', 'Twice daily with meals', 30, 'Morning, Night', 'Blood sugar control; take with breakfast and dinner'),
(17, 11, 'Thiocolchicoside 4mg + Etoricoxib 60mg', '1 Tablet', 'Twice daily after meals', 5, 'Morning, Night', 'Muscle relaxant and anti-inflammatory');

-- 6. Insert Medicine Reminders (Automated SMS & Email)
INSERT INTO medicine_reminders (reminder_id, prescription_id, patient_id, channel, reminder_type, scheduled_time, message_content, delivery_status, sent_at) VALUES
(1, 1, 1, 'SMS', 'Dosage Alert', '08:30 AM', 'Hi Sachin, time for your morning dose of Amoxicillin 625mg after breakfast. - Apollo Care', 'Delivered', '2026-09-11 08:30:00'),
(2, 1, 1, 'SMS', 'Dosage Alert', '08:30 PM', 'Hi Sachin, remember your evening dose of Amoxicillin 625mg and Cetirizine 10mg after dinner.', 'Delivered', '2026-09-11 20:30:00'),
(3, 1, 1, 'Email', 'Follow-up', '10:00 AM', 'Hello Sachin Gurjar, this is a follow-up reminder for your consultation on 2026-09-24 with Dr. Rajesh Deshmukh.', 'Delivered', '2026-09-12 10:00:00'),
(4, 2, 2, 'SMS', 'Dosage Alert', '08:00 AM', 'Dear Aarav, your morning Metoprolol 25mg is scheduled. Maintain regular timing for optimal BP control.', 'Delivered', '2026-09-11 08:00:00'),
(5, 2, 2, 'SMS', 'Dosage Alert', '09:30 PM', 'Dear Aarav, time for your bedtime Atorvastatin 20mg. Drink a glass of water.', 'Delivered', '2026-09-11 21:30:00'),
(6, 3, 3, 'Email', 'Dosage Alert', '08:00 AM', 'Hi Diya Nair, please take your morning Propranolol 40mg with breakfast for migraine prevention.', 'Delivered', '2026-09-12 08:00:00'),
(7, 4, 5, 'SMS', 'Dosage Alert', '09:00 AM', 'Hello Kavita, take Glucosamine capsule with breakfast for knee joint therapy.', 'Delivered', '2026-09-12 09:00:00'),
(8, 5, 6, 'SMS', 'Dosage Alert', '08:00 AM', 'Mr. Vikramaditya Rao, take Telmisartan 40mg after morning tea to keep BP within healthy limits.', 'Delivered', '2026-09-12 08:00:00'),
(9, 10, 2, 'Email', 'Dosage Alert', '08:30 AM', 'Dear Aarav Mehta, your Metformin 500mg is scheduled with breakfast. Avoid skipping meals.', 'Delivered', '2026-09-13 08:30:00'),
(10, 11, 1, 'SMS', 'Dosage Alert', '09:00 AM', 'Hi Sachin, remember your morning muscle relaxant tablet (Thiocolchicoside) with food.', 'Pending', NULL),
(11, 11, 1, 'SMS', 'Dosage Alert', '09:00 PM', 'Hi Sachin, take your evening muscle relaxant and apply heating pad before bed.', 'Pending', NULL),
(12, 11, 1, 'Email', 'Follow-up', '11:00 AM', 'Hi Sachin Gurjar, your orthopedic follow-up with Dr. Meena Swaminathan is on 2026-09-29.', 'Pending', NULL);
