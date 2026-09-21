package com.healthcare.model;

import java.time.LocalDateTime;

public class Patient {
    private int patientId;
    private String patientCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String gender;
    private String dateOfBirth;
    private String bloodGroup;
    private String emergencyContact;

    public Patient() {}

    public Patient(int patientId, String patientCode, String firstName, String lastName, String email, 
                   String phone, String gender, String dateOfBirth, String bloodGroup, String emergencyContact) {
        this.patientId = patientId;
        this.patientCode = patientCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.bloodGroup = bloodGroup;
        this.emergencyContact = emergencyContact;
    }

    public int getPatientId() { return patientId; }
    public void setPatientId(int patientId) { this.patientId = patientId; }

    public String getPatientCode() { return patientCode; }
    public void setPatientCode(String patientCode) { this.patientCode = patientCode; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getFullName() { return firstName + " " + lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public String toJson() {
        return String.format(
            "{\"patient_id\":%d,\"patient_code\":\"%s\",\"first_name\":\"%s\",\"last_name\":\"%s\",\"full_name\":\"%s\"," +
            "\"email\":\"%s\",\"phone\":\"%s\",\"gender\":\"%s\",\"date_of_birth\":\"%s\",\"blood_group\":\"%s\",\"emergency_contact\":\"%s\"}",
            patientId, escape(patientCode), escape(firstName), escape(lastName), escape(getFullName()),
            escape(email), escape(phone), escape(gender), escape(dateOfBirth), escape(bloodGroup), escape(emergencyContact)
        );
    }

    private String escape(String s) {
        if (s == null) return "";
        return s.replace("\"", "\\\"");
    }
}
