package com.healthcare.model;

public class Doctor {
    private int doctorId;
    private String doctorCode;
    private String name;
    private String specialization;
    private String department;
    private int experienceYears;
    private String roomNumber;
    private double consultationFee;
    private boolean isAvailable;

    public Doctor() {}

    public Doctor(int doctorId, String doctorCode, String name, String specialization, 
                  String department, int experienceYears, String roomNumber, double consultationFee, boolean isAvailable) {
        this.doctorId = doctorId;
        this.doctorCode = doctorCode;
        this.name = name;
        this.specialization = specialization;
        this.department = department;
        this.experienceYears = experienceYears;
        this.roomNumber = roomNumber;
        this.consultationFee = consultationFee;
        this.isAvailable = isAvailable;
    }

    public int getDoctorId() { return doctorId; }
    public String getDoctorCode() { return doctorCode; }
    public String getName() { return name; }
    public String getSpecialization() { return specialization; }
    public String getDepartment() { return department; }
    public int getExperienceYears() { return experienceYears; }
    public String getRoomNumber() { return roomNumber; }
    public double getConsultationFee() { return consultationFee; }
    public boolean isAvailable() { return isAvailable; }

    public String toJson() {
        return String.format(
            "{\"doctor_id\":%d,\"doctor_code\":\"%s\",\"name\":\"%s\",\"specialization\":\"%s\"," +
            "\"department\":\"%s\",\"experience_years\":%d,\"room_number\":\"%s\",\"consultation_fee\":%.2f,\"is_available\":%b}",
            doctorId, escape(doctorCode), escape(name), escape(specialization),
            escape(department), experienceYears, escape(roomNumber), consultationFee, isAvailable
        );
    }

    private String escape(String s) {
        if (s == null) return "";
        return s.replace("\"", "\\\"");
    }
}
