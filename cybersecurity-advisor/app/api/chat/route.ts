import { GoogleGenerativeAI } from "@google/generative-ai";

// Constants
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CYBERSECURITY_KEYWORDS = [
    "security", "cyber", "hacking", "hacked", "network", "phishing", "authentication",
    "password", "ransomware", "software", "privacy", "malware", "encryption",
    "protect", "vulnerability", "firewall", "intrusion", "breach", "data",
    "detection", "prevention", "patch", "exploit", "trojan", "virus",
    "worm", "spyware", "adware", "trojan horse", "denial of service", "DOS",
    "distributed denial of service", "DDoS", "penetration testing", "pen test",
    "incident response", "forensics", "cyber attack", "cyber defense", "two-factor authentication",
    "2FA", "multi-factor authentication", "MFA", "compliance", "GDPR", "HIPAA",
    "ISO 27001", "secure coding", "network security", "information security", "data breach",
    "social engineering", "cryptography", "public key infrastructure", "PKI", "risk assessment",
    "threat intelligence", "zero trust", "data encryption", "key management", "endpoint security",
    "security policy", "access control", "identity management", "security awareness", "penetration",
    "phishing test", "cybersecurity audit", "vulnerability assessment", "security operations"
];

// Function to determine if the prompt is related to cybersecurity
function isCybersecurityRelated(prompt: string): boolean {
    const lowerCasePrompt = prompt.toLowerCase();
    return CYBERSECURITY_KEYWORDS.some(keyword => lowerCasePrompt.includes(keyword));
}

// Handler for POST request
export async function POST(request: Request) {
    // Parse messages from the request
    const { messages } = await request.json();

    // Initialize the GoogleGenerativeAI client
    const genAI = new GoogleGenerativeAI(`${GEMINI_API_KEY}`);

    // Check the latest message for relevance
    const latestMessage = messages[messages.length - 1]?.content || '';
    
    // Check if the latest message is related to cybersecurity
    if (!isCybersecurityRelated(latestMessage)) {
        const politeResponse = "I'm a cybersecurity advisor, so I focus on topics related to cybersecurity. Please direct your questions to this field for the best assistance.";
        return new Response(politeResponse, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
        });
    }

    // Prepare the prompt from the messages
    const prompt = messages.map((message: any) => message.content).join('\n');

    try {
        // Retrieve the Gemini 1.5 model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate the content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text(); // Ensure text is a string

        // Format the response text for better readability
        const formattedText = text
            .replace(/\\n/g, '\n') // Replace escaped newlines with actual newlines
            .replace(/\\t/g, '    ') // Replace escaped tabs with spaces
            .replace(/\\r/g, '') // Remove escaped carriage returns
            .replace(/ +/g, ' ') // Replace multiple spaces with a single space
            .trim(); // Trim leading and trailing whitespace

        // Return the formatted text directly
        return new Response(formattedText, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
        });
    } catch (error) {
        // Handle errors
        console.error('Request to Gemini API failed:', error);
        return new Response('Failed to fetch data from Gemini API', { status: 500 });
    }
}
