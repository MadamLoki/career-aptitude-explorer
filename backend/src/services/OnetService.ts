// backend/src/services/OnetService.ts
class OnetWebService {
    private baseURL: string = '';
    private authHeader: string;

    constructor(username: string, password: string) {
        this.setVersion();
        // Create base64 encoded auth header
        this.authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    }

    private setVersion(version?: string) {
        this.baseURL = version
            ? `https://services.onetcenter.org/v${version}/ws/`
            : 'https://services.onetcenter.org/ws/';
    }

    async call(path: string, query?: Record<string, any>, options: RequestInit = {}) {
        try {
            // Construct URL with query parameters
            const url = new URL(path, this.baseURL);
            if (query) {
                Object.entries(query).forEach(([key, value]) => {
                    url.searchParams.append(key, value.toString());
                });
            }

            console.log(`Making O*NET API call to: ${url.toString()}`);

            const response = await fetch(url, {
                ...options,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': this.authHeader,
                    'User-Agent': 'nodejs-OnetWebService/1.00',
                    ...options.headers
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('O*NET API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorText
                });
                throw new Error(`API call failed with status ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('O*NET API call failed:', error);
            throw error;
        }
    }

    // Helper method for interest profiler questions
    async getInterestProfilerQuestions(start: number, end: number) {
        return this.call('mnm/interestprofiler/questions', {
            start,
            end
        });
    }

    // Helper method for interest profiler results
    async getInterestProfilerResults(answers: Record<string, number>) {
        return this.call('mnm/interestprofiler/results', { answers });
    }
}

// Create singleton instance with credentials
const onetService = new OnetWebService(
    'career_aptitude_expl1',
    '7578dcr'
);

export default onetService;