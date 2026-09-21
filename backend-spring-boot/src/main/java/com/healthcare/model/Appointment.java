package com.healthcare.model;

public class Appointment {
    private int appointmentId;
    private String appointmentCode;
    private int patientId;
    private String patientName;
    private int doctorId;
    private String doctorName;
    private String department;
    private String appointmentDate;
    private String timeSlot;
    private String status;
    private String symptoms;
    private int waitTimeMinutes;
    private int consultationDuration;
    private String bookingChannel;

    public Appointment() {}

    public Appointment(int appointmentId, String appointmentCode, int patientId, String patientName,
                       int doctorId, String doctorName, String department, String appointmentDate,
                       String timeSlot, String status, String symptoms, int waitTimeMinutes,
                       int consultationDuration, String bookingChannel) {
        this.appointmentId = appointmentId;
        this.appointmentCode = appointmentCode;
        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.department = department;
        this.appointmentDate = appointmentDate;
        this.timeSlot = timeSlot;
        this.status = status;
        this.symptoms = symptoms;
        this.waitTimeMinutes = waitTimeMinutes;
        this.consultationDuration = consultationDuration;
        this.bookingChannel = bookingChannel;
    }

    public int getAppointmentId() { return appointmentId; }
    public String getAppointmentCode() { return appointmentCode; }
    public int getPatientId() { return patientId; }
    public String getPatientName() { return patientName; }
    public int getDoctorId() { return doctorId; }
    public String getDoctorName() { return doctorName; }
    public String getDepartment() { return department; }
    public String getAppointmentDate() { return appointmentDate; }
    public String getTimeSlot() { return timeSlot; }
    public String getStatus() { return status; }
    public String getSymptoms() { return symptoms; }
    public int getWaitTimeMinutes() { return waitTimeMinutes; }
    public int getConsultationDuration() { return consultationDuration; }
    public String getBookingChannel() { return bookingChannel; }

    public String toJson() {
        return String.format(
            "{\"appointment_id\":%d,\"appointment_code\":\"%s\",\"patient_id\":%d,\"patient_name\":\"%s\"," +
            "\"doctor_id\":%d,\"doctor_name\":\"%s\",\"department\":\"%s\",\"appointment_date\":\"%s\"," +
            "\"time_slot\":\"%s\",\"status\":\"%s\",\"symptoms\":\"%s\",\"wait_time_minutes\":%d," +
            "\"consultation_duration\":%d,\"booking_channel\":\"%s\"}",
            appointmentId, escape(appointmentCode), patientId, escape(patientName),
            doctorId, escape(doctorName), escape(department), escape(appointmentDate),
            escape(timeSlot), escape(status), escape(symptoms), waitTimeMinutes,
            consultationDuration, escape(bookingChannel)
        );
    }

    private String escape(String s) {
        if (s == null) return "";
        return s.replace("\"", "\\\"").replace("\n", " ");
    }
}
