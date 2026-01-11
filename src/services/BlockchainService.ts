export interface BlockchainRecord {
    recordId: string;
    patientId: string;
    assignedDoctorId?: string; // New field
    dataHash: string;
    timestamp: string;
    status: 'Verified' | 'Pending';
    blockHeight: number;
    fullData?: any; // Storing full data for demo purposes in local storage
}

// Mock Registry for Demo Flow
export const MOCK_USERS = [
    { id: 'PAT-001', name: 'Alice Johnson', age: 34, gender: 'Female' },
    { id: 'PAT-002', name: 'Bob Smith', age: 45, gender: 'Male' },
    { id: 'PAT-003', name: 'Carol Williams', age: 28, gender: 'Female' },
];

export const MOCK_DOCTORS = [
    { id: 'DOC-001', name: 'Dr. Sarah Connor', specialization: 'Cardiology' },
    { id: 'DOC-002', name: 'Dr. John Doe', specialization: 'Endocrinology' },
];

class BlockchainService {
    private records: BlockchainRecord[] = [];

    constructor() {
        // Load from local storage if available
        const saved = localStorage.getItem('medgenius_blockchain_records');
        if (saved) {
            this.records = JSON.parse(saved);
        }
    }

    // Simulate hashing data using Web Crypto API
    async hashData(data: any): Promise<string> {
        const msgBuffer = new TextEncoder().encode(JSON.stringify(data));
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Simulate "Minting" a record to the Solana blockchain
    async mintRecord(patientId: string, assignedDoctorId: string, data: any): Promise<BlockchainRecord> {
        const dataHash = await this.hashData(data);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const newRecord: BlockchainRecord = {
            recordId: `MG-${Math.floor(Math.random() * 1000000).toString(16).toUpperCase()}`,
            patientId,
            assignedDoctorId,
            dataHash,
            timestamp: new Date().toISOString(),
            status: 'Verified',
            blockHeight: 245000000 + Math.floor(Math.random() * 10000),
            fullData: data // Persist full data for the demo
        };

        this.records.push(newRecord);
        this.save();
        return newRecord;
    }

    getRecord(recordId: string) {
        return this.records.find(r => r.recordId === recordId);
    }

    getAllRecords() {
        return this.records;
    }

    getRecordsByPatient(patientId: string) {
        return this.records.filter(r => r.patientId === patientId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    getRecordsByDoctor(doctorId: string) {
        return this.records.filter(r => r.assignedDoctorId === doctorId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    getRegisteredUsers() {
        return MOCK_USERS;
    }

    getRegisteredDoctors() {
        return MOCK_DOCTORS;
    }

    private save() {
        localStorage.setItem('medgenius_blockchain_records', JSON.stringify(this.records));
    }
}

export const blockchainService = new BlockchainService();
