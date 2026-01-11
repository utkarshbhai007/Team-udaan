import axios from 'axios';

// Public openFDA API endpoint - Free to use, no key required for low volume
const FDA_API_URL = 'https://api.fda.gov/drug/label.json';
const ADVERSE_EVENT_URL = 'https://api.fda.gov/drug/event.json';

export interface DrugSafetyInfo {
    brand_name: string;
    generic_name: string;
    warnings: string[];
    adverse_reactions: string[];
    boxed_warning: string | null;
}

class OpenFDAService {
    /**
     * Search for a drug label by name to get warnings and usage info
     * @param drugName Brand or Generic name (e.g., 'Metformin', 'Tylenol')
     */
    async getDrugLabel(drugName: string): Promise<DrugSafetyInfo | null> {
        try {
            const response = await axios.get(FDA_API_URL, {
                params: {
                    search: `openfda.brand_name:"${drugName}" OR openfda.generic_name:"${drugName}"`,
                    limit: 1
                }
            });

            if (response.data.results && response.data.results.length > 0) {
                const data = response.data.results[0];
                return {
                    brand_name: data.openfda?.brand_name?.[0] || drugName,
                    generic_name: data.openfda?.generic_name?.[0] || 'Unknown',
                    warnings: data.warnings ? data.warnings.slice(0, 3) : ['No specific warnings listed.'],
                    adverse_reactions: data.adverse_reactions ? data.adverse_reactions.slice(0, 3) : [],
                    boxed_warning: data.boxed_warning ? data.boxed_warning[0] : null
                };
            }
            return null;
        } catch (error) {
            console.warn(`FDA Label lookup failed for ${drugName}`, error);
            return null;
        }
    }

    /**
     * Check for reported adverse events for a drug
     * Only returns a count to indicate risk level for the demo
     */
    async getAdverseEventCount(drugName: string): Promise<number> {
        try {
            const response = await axios.get(ADVERSE_EVENT_URL, {
                params: {
                    search: `patient.drug.medicinalproduct:"${drugName}"`,
                    limit: 1
                }
            });
            // The API returns meta.results.total for the total count found
            return response.data.meta.results.total;
        } catch (error) {
            return 0;
        }
    }
}

export const openFDAService = new OpenFDAService();
