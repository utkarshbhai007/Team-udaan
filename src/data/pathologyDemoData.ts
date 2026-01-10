// PathologyAI Hub Demo Data
// Comprehensive demo data for all user roles and AI agents

export const demoLabData = {
  labInfo: {
    name: "City Pathology Center",
    location: "Mumbai, Maharashtra",
    license: "LAB-MH-2024-001",
    accreditation: "NABH Accredited",
    established: "2015",
    totalTests: 125000,
    monthlyVolume: 8500
  },
  
  aiAgentMetrics: {
    reportGeneration: {
      processed: 1247,
      avgTime: 4.2,
      efficiency: 97,
      savings: "₹12.5L/month"
    },
    qualityControl: {
      checked: 1198,
      flagged: 15,
      errorReduction: 30,
      accuracy: 98.5
    },
    earlyDetection: {
      predictions: 89,
      alerts: 7,
      accuracy: 94,
      earlyWarnings: 23
    },
    medicationSafety: {
      interactions: 156,
      warnings: 12,
      prevented: 8,
      safetyScore: 99
    },
    careCoordination: {
      coordinated: 1089,
      pending: 34,
      followups: 156,
      compliance: 89
    }
  },

  recentReports: [
    {
      id: "RPT-2024-001",
      patientName: "John Doe",
      patientId: "PAT-001",
      testType: "Complete Blood Count",
      status: "Completed",
      aiScore: 98,
      processingTime: "3.2h",
      timestamp: "2 hours ago",
      flags: ["Normal", "AI Verified"],
      criticalFindings: 0
    },
    {
      id: "RPT-2024-002",
      patientName: "Jane Smith",
      patientId: "PAT-002",
      testType: "Lipid Profile",
      status: "Attention Required",
      aiScore: 95,
      processingTime: "1.8h",
      timestamp: "30 minutes ago",
      flags: ["High Cholesterol", "Early Warning"],
      criticalFindings: 1
    },
    {
      id: "RPT-2024-003",
      patientName: "Mike Johnson",
      patientId: "PAT-003",
      testType: "Liver Function Test",
      status: "Quality Check",
      aiScore: 92,
      processingTime: "2.1h",
      timestamp: "1 hour ago",
      flags: ["Elevated ALT", "Requires Review"],
      criticalFindings: 1
    },
    {
      id: "RPT-2024-004",
      patientName: "Sarah Wilson",
      patientId: "PAT-004",
      testType: "Thyroid Panel",
      status: "Completed",
      aiScore: 99,
      processingTime: "2.8h",
      timestamp: "4 hours ago",
      flags: ["Normal", "AI Verified"],
      criticalFindings: 0
    }
  ]
};

export const demoPatientData = {
  patientInfo: {
    id: "PAT-001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98765 43210",
    email: "john.doe@email.com",
    address: "123 Health Street, Mumbai, Maharashtra",
    emergencyContact: "Jane Doe - +91 98765 43211",
    registrationDate: "2023-06-15",
    lastVisit: "2024-01-08"
  },

  healthScore: 87,

  recentReports: [
    {
      id: "RPT-2024-001",
      date: "2024-01-08",
      type: "Complete Blood Count",
      status: "Normal",
      aiScore: 98,
      summary: "All parameters within normal range",
      downloadUrl: "#",
      flags: ["Normal", "AI Verified"],
      details: {
        hemoglobin: "14.2 g/dL",
        wbc: "7,200/μL",
        platelets: "285,000/μL",
        hematocrit: "42%"
      }
    },
    {
      id: "RPT-2024-002", 
      date: "2024-01-05",
      type: "Lipid Profile",
      status: "Attention Required",
      aiScore: 85,
      summary: "Slightly elevated cholesterol levels detected",
      downloadUrl: "#",
      flags: ["High Cholesterol", "Lifestyle Changes Recommended"],
      details: {
        totalCholesterol: "210 mg/dL",
        ldl: "135 mg/dL",
        hdl: "45 mg/dL",
        triglycerides: "150 mg/dL"
      }
    },
    {
      id: "RPT-2024-003",
      date: "2024-01-02",
      type: "Liver Function Test",
      status: "Normal",
      aiScore: 96,
      summary: "Liver function parameters are healthy",
      downloadUrl: "#",
      flags: ["Normal", "AI Verified"],
      details: {
        alt: "28 U/L",
        ast: "32 U/L",
        bilirubin: "0.8 mg/dL",
        albumin: "4.2 g/dL"
      }
    }
  ],

  healthTrends: [
    {
      parameter: "Cholesterol",
      current: 210,
      previous: 195,
      unit: "mg/dL",
      trend: "up",
      status: "attention",
      recommendation: "Consider dietary changes and exercise"
    },
    {
      parameter: "Blood Sugar",
      current: 95,
      previous: 102,
      unit: "mg/dL", 
      trend: "down",
      status: "good",
      recommendation: "Maintain current lifestyle"
    },
    {
      parameter: "Blood Pressure",
      current: "120/80",
      previous: "125/85",
      unit: "mmHg",
      trend: "down",
      status: "good",
      recommendation: "Continue regular exercise"
    },
    {
      parameter: "BMI",
      current: 24.5,
      previous: 25.2,
      unit: "kg/m²",
      trend: "down",
      status: "good",
      recommendation: "Maintain healthy weight"
    }
  ],

  earlyWarnings: [
    {
      type: "Pre-diabetes Risk",
      risk: "Medium",
      timeframe: "6-12 months",
      confidence: 78,
      description: "HbA1c trend suggests monitoring required",
      actions: ["Regular glucose monitoring", "Dietary consultation", "Exercise plan"]
    },
    {
      type: "Cardiovascular Risk",
      risk: "Low",
      timeframe: "12+ months", 
      confidence: 65,
      description: "Cholesterol levels need attention",
      actions: ["Lipid profile monitoring", "Heart-healthy diet", "Regular cardio exercise"]
    }
  ],

  medications: [
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      purpose: "Blood sugar control",
      interactions: [],
      status: "safe",
      prescribedBy: "Dr. Sarah Wilson",
      startDate: "2023-08-15"
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      purpose: "Cholesterol management",
      interactions: ["Avoid grapefruit"],
      status: "safe",
      prescribedBy: "Dr. Sarah Wilson",
      startDate: "2024-01-05"
    },
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      purpose: "Blood pressure control",
      interactions: [],
      status: "safe",
      prescribedBy: "Dr. Michael Chen",
      startDate: "2023-12-01"
    }
  ],

  upcomingAppointments: [
    {
      date: "2024-01-15",
      time: "10:00 AM",
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      type: "Follow-up",
      location: "City Hospital",
      reason: "Cholesterol management review"
    },
    {
      date: "2024-01-22",
      time: "2:30 PM", 
      doctor: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      type: "Consultation",
      location: "Metro Clinic",
      reason: "Diabetes prevention counseling"
    }
  ]
};

export const demoDoctorData = {
  doctorInfo: {
    name: "Dr. Sarah Wilson",
    specialty: "Internal Medicine",
    license: "MD-12345",
    hospital: "City General Hospital",
    experience: "12 years",
    patientsToday: 12,
    totalPatients: 847,
    rating: 4.8
  },

  patientQueue: [
    {
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      condition: "Diabetes Follow-up",
      priority: "Medium",
      appointmentTime: "10:00 AM",
      status: "Waiting",
      aiAlerts: ["High HbA1c trend", "Medication interaction risk"],
      lastVisit: "2024-01-01",
      riskScore: 65,
      estimatedDuration: "30 minutes"
    },
    {
      id: "PAT-002", 
      name: "Jane Smith",
      age: 38,
      condition: "Hypertension Check",
      priority: "High",
      appointmentTime: "10:30 AM",
      status: "In Progress",
      aiAlerts: ["Blood pressure spike detected", "Early kidney risk"],
      lastVisit: "2023-12-15",
      riskScore: 78,
      estimatedDuration: "45 minutes"
    },
    {
      id: "PAT-003",
      name: "Mike Johnson",
      age: 52,
      condition: "Routine Checkup",
      priority: "Low",
      appointmentTime: "11:00 AM", 
      status: "Scheduled",
      aiAlerts: ["Cholesterol trending up"],
      lastVisit: "2023-11-20",
      riskScore: 42,
      estimatedDuration: "20 minutes"
    },
    {
      id: "PAT-004",
      name: "Sarah Brown",
      age: 29,
      condition: "Lab Results Review",
      priority: "Medium",
      appointmentTime: "11:30 AM",
      status: "Scheduled",
      aiAlerts: ["Thyroid function optimal", "No concerns detected"],
      lastVisit: "2024-01-05",
      riskScore: 18,
      estimatedDuration: "15 minutes"
    }
  ],

  recentReports: [
    {
      id: "RPT-2024-001",
      patientName: "John Doe",
      patientId: "PAT-001",
      testType: "HbA1c",
      result: "8.2%",
      status: "Critical",
      aiInsight: "Significant increase from 7.1% last month. Medication adjustment recommended.",
      timestamp: "2 hours ago",
      trend: "worsening",
      recommendations: ["Increase Metformin dosage", "Dietary consultation", "Follow-up in 2 weeks"],
      previousResults: ["7.1%", "6.8%", "7.0%"]
    },
    {
      id: "RPT-2024-002",
      patientName: "Jane Smith", 
      patientId: "PAT-002",
      testType: "Comprehensive Metabolic Panel",
      result: "Creatinine 1.4 mg/dL",
      status: "Attention Required",
      aiInsight: "Early signs of kidney function decline. Monitor closely.",
      timestamp: "4 hours ago",
      trend: "declining",
      recommendations: ["Nephrology referral", "ACE inhibitor adjustment", "Protein restriction"],
      previousResults: ["1.2 mg/dL", "1.1 mg/dL", "1.3 mg/dL"]
    },
    {
      id: "RPT-2024-003",
      patientName: "Mike Johnson",
      patientId: "PAT-003", 
      testType: "Lipid Profile",
      result: "LDL 165 mg/dL",
      status: "Elevated",
      aiInsight: "LDL cholesterol above target. Lifestyle modifications needed.",
      timestamp: "6 hours ago",
      trend: "stable",
      recommendations: ["Statin therapy", "Dietary changes", "Exercise plan"],
      previousResults: ["160 mg/dL", "158 mg/dL", "162 mg/dL"]
    }
  ],

  aiInsights: [
    {
      type: "early-warning",
      title: "Pre-diabetes Risk Detected",
      patient: "Robert Chen",
      patientId: "PAT-005",
      description: "AI analysis of recent glucose trends suggests 78% probability of pre-diabetes development within 6 months",
      confidence: 78,
      timeframe: "6 months",
      actions: ["Schedule glucose tolerance test", "Lifestyle counseling", "Weight management program"],
      urgency: "Medium"
    },
    {
      type: "medication-safety",
      title: "Drug Interaction Alert",
      patient: "Mary Johnson", 
      patientId: "PAT-006",
      description: "Potential interaction between newly prescribed Warfarin and existing Metformin therapy",
      confidence: 92,
      severity: "Moderate",
      actions: ["Monitor INR closely", "Adjust Warfarin dosing", "Patient education on signs"],
      urgency: "High"
    },
    {
      type: "care-coordination",
      title: "Follow-up Required",
      patient: "David Wilson",
      patientId: "PAT-007",
      description: "Patient missed last two appointments. Recent lab results show concerning trends.",
      confidence: 85,
      urgency: "High",
      actions: ["Contact patient immediately", "Schedule urgent appointment", "Review medication compliance"],
      lastContact: "2024-01-01"
    }
  ],

  todayStats: {
    patientsScheduled: 15,
    patientsSeen: 8,
    criticalAlerts: 3,
    reportsReviewed: 18,
    aiRecommendations: 12,
    avgConsultationTime: "28 minutes"
  }
};

export const aiAgentStatus = {
  reportGeneration: {
    status: "Active",
    uptime: "99.8%",
    processed: 1247,
    avgProcessingTime: "4.2 hours",
    efficiency: 97,
    lastUpdate: "2024-01-10 09:30:00"
  },
  qualityControl: {
    status: "Active", 
    uptime: "99.9%",
    checked: 1198,
    flagged: 15,
    accuracy: 98.5,
    lastUpdate: "2024-01-10 09:30:00"
  },
  earlyDetection: {
    status: "Active",
    uptime: "99.7%",
    predictions: 89,
    alerts: 7,
    accuracy: 94,
    lastUpdate: "2024-01-10 09:30:00"
  },
  medicationSafety: {
    status: "Active",
    uptime: "99.9%",
    interactions: 156,
    warnings: 12,
    prevented: 8,
    lastUpdate: "2024-01-10 09:30:00"
  },
  careCoordinator: {
    status: "Active",
    uptime: "99.8%",
    coordinated: 1089,
    pending: 34,
    followups: 156,
    lastUpdate: "2024-01-10 09:30:00"
  }
};

export const marketMetrics = {
  reportsGenerated: "500M+",
  marketSize: "₹15,000 Cr",
  labsInIndia: "100K+",
  processingTimeReduction: "70%",
  costSavings: "₹12.5L/month",
  errorReduction: "30%",
  patientSatisfaction: "94.8%"
};

export const businessMetrics = {
  year1Target: "₹70.2 Cr ARR",
  currentARR: "₹15.8 Cr",
  labsOnboarded: 73,
  patientsServed: "2.8M",
  reportsProcessed: "1.2M",
  aiAccuracy: "97.8%"
};

// Export all demo data
export default {
  lab: demoLabData,
  patient: demoPatientData,
  doctor: demoDoctorData,
  aiAgents: aiAgentStatus,
  market: marketMetrics,
  business: businessMetrics
};