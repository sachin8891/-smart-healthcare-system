package com.healthcare.service;

import com.healthcare.model.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class HealthcareDataService {
    private final List<Patient> patients = new ArrayList<>();
    private final List<Doctor> doctors = new ArrayList<>();
    private final List<Appointment> appointments = new ArrayList<>();
    private final List<Prescription> prescriptions = new ArrayList<>();
    private final List<MedicineReminder> reminders = new ArrayList<>();

    public HealthcareDataService() {
        seedInitialData();
    }

    private void seedInitialData() {
        // Patients
        patients.add(new Patient(1, "PAT-001", "Sachin", "Gurjar", "sachingurjar8180@gmail.com", "+91 9928486513", "Male", "2002-08-14", "B+", "+91 9829012345"));
        patients.add(new Patient(2, "PAT-002", "Aarav", "Mehta", "aarav.mehta@gmail.com", "+91 9823456781", "Male", "1995-04-22", "O+", "+91 9823456789"));
        patients.add(new Patient(3, "PAT-003", "Diya", "Nair", "diya.nair@gmail.com", "+91 9876543210", "Female", "1989-11-03", "A+", "+91 9876543219"));
        patients.add(new Patient(4, "PAT-004", "Rohan", "Saxena", "rohan.saxena@gmail.com", "+91 9123456780", "Male", "2001-02-18", "AB+", "+91 9123456788"));
        patients.add(new Patient(5, "PAT-005", "Kavita", "Joshi", "kavita.joshi@gmail.com", "+91 9988776655", "Female", "1978-07-29", "B-", "+91 9988776650"));

        // Doctors
        doctors.add(new Doctor(1, "DOC-CARD-01", "Dr. Arvind Sharma", "Cardiologist", "Cardiology", 15, "Room 102", 800.0, true));
        doctors.add(new Doctor(2, "DOC-NEUR-02", "Dr. Radhika Kapoor", "Neurologist", "Neurology", 12, "Room 205", 900.0, true));
        doctors.add(new Doctor(3, "DOC-PEDI-03", "Dr. Sameer Verma", "Pediatrician", "Pediatrics", 8, "Room 108", 500.0, true));
        doctors.add(new Doctor(4, "DOC-ORTH-04", "Dr. Meena Swaminathan", "Orthopedic Surgeon", "Orthopedics", 18, "Room 304", 750.0, true));
        doctors.add(new Doctor(5, "DOC-GENM-05", "Dr. Rajesh Deshmukh", "General Physician", "General Medicine", 10, "Room 101", 400.0, true));
        doctors.add(new Doctor(6, "DOC-DERM-06", "Dr. Ananya Roy", "Dermatologist", "Dermatology", 7, "Room 210", 600.0, true));

        // Appointments
        appointments.add(new Appointment(1, "APT-2026-001", 1, "Sachin Gurjar", 5, "Dr. Rajesh Deshmukh", "General Medicine", "2026-09-10", "09:00 AM", "Completed", "Seasonal fever and sore throat", 12, 18, "Online Portal"));
        appointments.add(new Appointment(2, "APT-2026-002", 2, "Aarav Mehta", 1, "Dr. Arvind Sharma", "Cardiology", "2026-09-10", "09:30 AM", "Completed", "Chest tightness during morning jogging", 25, 30, "Online Portal"));
        appointments.add(new Appointment(3, "APT-2026-003", 3, "Diya Nair", 2, "Dr. Radhika Kapoor", "Neurology", "2026-09-10", "10:00 AM", "Completed", "Recurring migraine headaches", 18, 22, "Phone Call"));
        appointments.add(new Appointment(4, "APT-2026-004", 4, "Rohan Saxena", 6, "Dr. Ananya Roy", "Dermatology", "2026-09-10", "10:30 AM", "Cancelled", "Skin rash on forearm", 0, 0, "Online Portal"));
        appointments.add(new Appointment(5, "APT-2026-005", 5, "Kavita Joshi", 4, "Dr. Meena Swaminathan", "Orthopedics", "2026-09-10", "11:00 AM", "Completed", "Right knee pain aggravated by stairs", 35, 25, "Walk-in"));
        appointments.add(new Appointment(6, "APT-2026-006", 1, "Sachin Gurjar", 4, "Dr. Meena Swaminathan", "Orthopedics", "2026-09-15", "09:00 AM", "Completed", "Lumbar strain from heavy deadlifts", 16, 22, "Online Portal"));
        appointments.add(new Appointment(7, "APT-2026-007", 1, "Sachin Gurjar", 1, "Dr. Arvind Sharma", "Cardiology", "2026-09-16", "09:30 AM", "Scheduled", "Hypertension medication review", 0, 0, "Online Portal"));

        // Prescriptions
        Prescription rx1 = new Prescription(1, "RX-2026-001", 1, 1, "Sachin Gurjar", "Dr. Rajesh Deshmukh", "General Medicine", "Acute Upper Respiratory Tract Infection", "Voice rest, hydration, and steam inhalation.", "2026-09-24", "2026-09-10");
        rx1.addMedicine("{\"item_id\":1,\"medicine_name\":\"Amoxicillin & Clavulanate 625mg\",\"dosage\":\"1 Tablet\",\"frequency\":\"Twice daily\",\"duration_days\":5,\"time_of_day\":\"Morning, Night\",\"instructions\":\"Take after meals\"}");
        rx1.addMedicine("{\"item_id\":2,\"medicine_name\":\"Paracetamol 650mg\",\"dosage\":\"1 Tablet\",\"frequency\":\"As needed\",\"duration_days\":3,\"time_of_day\":\"Night\",\"instructions\":\"Take if temp > 99.5F\"}");
        prescriptions.add(rx1);

        Prescription rx2 = new Prescription(2, "RX-2026-002", 2, 2, "Aarav Mehta", "Dr. Arvind Sharma", "Cardiology", "Early Stage Coronary Artery Disease & Angina", "Low sodium diet, brisk walking.", "2026-10-10", "2026-09-10");
        rx2.addMedicine("{\"item_id\":4,\"medicine_name\":\"Atorvastatin 20mg\",\"dosage\":\"1 Tablet\",\"frequency\":\"Once daily\",\"duration_days\":30,\"time_of_day\":\"Night\",\"instructions\":\"Cholesterol control\"}");
        rx2.addMedicine("{\"item_id\":5,\"medicine_name\":\"Metoprolol 25mg\",\"dosage\":\"1 Tablet\",\"frequency\":\"Once daily\",\"duration_days\":30,\"time_of_day\":\"Morning\",\"instructions\":\"Heart rate control\"}");
        prescriptions.add(rx2);

        // Reminders
        reminders.add(new MedicineReminder(1, 1, 1, "Sachin Gurjar", "SMS", "Dosage Alert", "08:30 AM", "Hi Sachin, time for your morning dose of Amoxicillin 625mg after breakfast. - Apollo Care", "Delivered", "2026-09-11 08:30:00"));
        reminders.add(new MedicineReminder(2, 1, 1, "Sachin Gurjar", "SMS", "Dosage Alert", "08:30 PM", "Hi Sachin, remember your evening dose of Amoxicillin 625mg after dinner.", "Delivered", "2026-09-11 20:30:00"));
        reminders.add(new MedicineReminder(3, 1, 1, "Sachin Gurjar", "Email", "Follow-up", "10:00 AM", "Hello Sachin Gurjar, this is a follow-up reminder for your consultation on 2026-09-24 with Dr. Rajesh Deshmukh.", "Pending", null));
    }

    public List<Patient> getAllPatients() { return patients; }
    public Patient getPatientById(int id) {
        return patients.stream().filter(p -> p.getPatientId() == id).findFirst().orElse(null);
    }

    public List<Doctor> getAllDoctors() { return doctors; }

    public List<Appointment> getAllAppointments() { return appointments; }
    public List<Appointment> getAppointmentsByPatient(int patientId) {
        return appointments.stream().filter(a -> a.getPatientId() == patientId).collect(Collectors.toList());
    }

    public List<Prescription> getAllPrescriptions() { return prescriptions; }

    public List<MedicineReminder> getAllReminders() { return reminders; }

    public boolean dispatchPendingReminders() {
        for (MedicineReminder r : reminders) {
            if ("Pending".equalsIgnoreCase(r.getDeliveryStatus())) {
                // Mark delivered
            }
        }
        return true;
    }
}
