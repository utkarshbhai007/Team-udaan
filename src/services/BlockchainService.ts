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
    // Helper to get fresh data directly from storage
    private getStoredRecords(): BlockchainRecord[] {
        try {
            const saved = localStorage.getItem('medgenius_blockchain_records');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to load records", e);
            return [];
        }
    }

    // Helper to save data directly to storage
    private setStoredRecords(records: BlockchainRecord[]) {
        localStorage.setItem('medgenius_blockchain_records', JSON.stringify(records));
    }

    constructor() { }

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
            patientId: String(patientId),
            assignedDoctorId: String(assignedDoctorId),
            dataHash,
            timestamp: new Date().toISOString(),
            status: 'Verified',
            blockHeight: 245000000 + Math.floor(Math.random() * 10000),
            fullData: data // Persist full data for the demo
        };

        // Read, Append, Write
        const currentRecords = this.getStoredRecords();
        currentRecords.push(newRecord);
        this.setStoredRecords(currentRecords);

        console.log("✅ BlockchainService: Minted and Saved.", newRecord);
        return newRecord;
    }

    getRecord(recordId: string) {
        const records = this.getStoredRecords();
        return records.find(r => r.recordId === recordId);
    }

    getAllRecords() {
        return this.getStoredRecords();
    }

    getRecordsByPatient(patientId: string) {
        const records = this.getStoredRecords();
        console.log(`Searching records for patient: ${patientId}. Total records: ${records.length}`);
        return records.filter(r => r.patientId === patientId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    getRecordsByDoctor(doctorId: string) {
        const records = this.getStoredRecords();
        console.log(`Searching records for doctor: ${doctorId}. Total records: ${records.length}`);
        return records.filter(r => r.assignedDoctorId === doctorId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    getRegisteredUsers() {
        return MOCK_USERS;
    }

    getRegisteredDoctors() {
        return MOCK_DOCTORS;
    }
}

export const blockchainService = new BlockchainService();
