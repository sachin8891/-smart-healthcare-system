package com.healthcare.model;

public class MedicineReminder {
    private int reminderId;
    private int prescriptionId;
    private int patientId;
    private String patientName;
    private String channel;
    private String reminderType;
    private String scheduledTime;
    private String messageContent;
    private String deliveryStatus;
    private String sentAt;

    public MedicineReminder() {}

    public MedicineReminder(int reminderId, int prescriptionId, int patientId, String patientName,
                            String channel, String reminderType, String scheduledTime,
                            String messageContent, String deliveryStatus, String sentAt) {
        this.reminderId = reminderId;
        this.prescriptionId = prescriptionId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.channel = channel;
        this.reminderType = reminderType;
        this.scheduledTime = scheduledTime;
        this.messageContent = messageContent;
        this.deliveryStatus = deliveryStatus;
        this.sentAt = sentAt;
    }

    public int getReminderId() { return reminderId; }
    public String getChannel() { return channel; }
    public String getDeliveryStatus() { return deliveryStatus; }

    public String toJson() {
        return String.format(
            "{\"reminder_id\":%d,\"prescription_id\":%d,\"patient_id\":%d,\"patient_name\":\"%s\"," +
            "\"channel\":\"%s\",\"reminder_type\":\"%s\",\"scheduled_time\":\"%s\",\"message_content\":\"%s\"," +
            "\"delivery_status\":\"%s\",\"sent_at\":\"%s\"}",
            reminderId, prescriptionId, patientId, escape(patientName),
            escape(channel), escape(reminderType), escape(scheduledTime), escape(messageContent),
            escape(deliveryStatus), escape(sentAt)
        );
    }

    private String escape(String s) {
        if (s == null) return "";
        return s.replace("\"", "\\\"").replace("\n", " ");
    }
}
