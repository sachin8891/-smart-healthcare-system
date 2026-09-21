package com.healthcare.model;

import java.util.ArrayList;
import java.util.List;

public class Prescription {
    private int prescriptionId;
    private String prescriptionCode;
    private int appointmentId;
    private int patientId;
    private String patientName;
    private String doctorName;
    private String department;
    private String diagnosis;
    private String clinicalNotes;
    private String followUpDate;
    private String prescribedDate;
    private List<String> medicines = new ArrayList<>();

    public Prescription() {}

    public Prescription(int prescriptionId, String prescriptionCode, int appointmentId, int patientId,
                        String patientName, String doctorName, String department, String diagnosis,
                        String clinicalNotes, String followUpDate, String prescribedDate) {
        this.prescriptionId = prescriptionId;
        this.prescriptionCode = prescriptionCode;
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.department = department;
        this.diagnosis = diagnosis;
        this.clinicalNotes = clinicalNotes;
        this.followUpDate = followUpDate;
        this.prescribedDate = prescribedDate;
    }

    public int getPrescriptionId() { return prescriptionId; }
    public String getPrescriptionCode() { return prescriptionCode; }
    public int getPatientId() { return patientId; }
    public String getPatientName() { return patientName; }
    public String getDoctorName() { return doctorName; }
    public String getDiagnosis() { return diagnosis; }
    public String getFollowUpDate() { return followUpDate; }
    public String getPrescribedDate() { return prescribedDate; }

    public void addMedicine(String medJson) {
        this.medicines.add(medJson);
    }

    public String toJson() {
        StringBuilder medsJson = new StringBuilder("[");
        for (int i = 0; i < medicines.size(); i++) {
            medsJson.append(medicines.get(i));
            if (i < medicines.size() - 1) medsJson.append(",");
        }
        medsJson.append("]");

        return String.format(
            "{\"prescription_id\":%d,\"prescription_code\":\"%s\",\"appointment_id\":%d,\"patient_id\":%d," +
            "\"patient_name\":\"%s\",\"doctor_name\":\"%s\",\"department\":\"%s\",\"diagnosis\":\"%s\"," +
            "\"clinical_notes\":\"%s\",\"follow_up_date\":\"%s\",\"prescribed_date\":\"%s\",\"medicines\":%s}",
            prescriptionId, escape(prescriptionCode), appointmentId, patientId,
            escape(patientName), escape(doctorName), escape(department), escape(diagnosis),
            escape(clinicalNotes), escape(followUpDate), escape(prescribedDate), medsJson.toString()
        );
    }

    private String escape(String s) {
        if (s == null) return "";
        return s.replace("\"", "\\\"").replace("\n", " ");
    }
}
