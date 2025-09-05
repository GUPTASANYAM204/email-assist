export const sampleEmails = [
  {
    id: "1",
    sender: "alice@example.com",
    subject: "Urgent request: system access blocked",
    body: "Hi team, I am unable to log into my account since yesterday. This is preventing me from accessing critical work files. Could you please help me resolve this issue immediately? I have an important presentation tomorrow and need access urgently.",
    sentDate: "2024-01-15T09:30:00Z",
    priority: "urgent" as const,
    sentiment: "negative" as const,
    category: "Support"
  },
  {
    id: "2",
    sender: "diana@client.co",
    subject: "Help required with account verification",
    body: "There is a billing error where I was charged twice for the same service. This needs immediate correction as it's affecting our monthly budget. Please investigate and process a refund for the duplicate charge.",
    sentDate: "2024-01-15T14:22:00Z",
    priority: "urgent" as const,
    sentiment: "negative" as const,
    category: "Support"
  },
  {
    id: "3",
    sender: "eve@startup.io",
    subject: "Critical help needed for downtime",
    body: "Our servers are down, and we need immediate support. This is highly critical as it's affecting our production environment and customer experience. Please escalate this to your highest priority team.",
    sentDate: "2024-01-15T16:45:00Z",
    priority: "urgent" as const,
    sentiment: "negative" as const,
    category: "Support"
  },
  {
    id: "4",
    sender: "bob@customer.com",
    subject: "Query about new features",
    body: "Hello, I wanted to inquire about the new features announced in your latest update. Specifically, I'm interested in the advanced analytics dashboard. Could you provide more details about when this will be available?",
    sentDate: "2024-01-15T10:15:00Z",
    priority: "normal" as const,
    sentiment: "positive" as const,
    category: "Query"
  },
  {
    id: "5",
    sender: "charlie@partner.com",
    subject: "Request for API documentation",
    body: "Good afternoon, we are integrating with your service and need access to the latest API documentation. Could you please share the updated endpoints and authentication methods? This would help us complete our integration faster.",
    sentDate: "2024-01-15T13:20:00Z",
    priority: "normal" as const,
    sentiment: "neutral" as const,
    category: "Request"
  },
  {
    id: "6",
    sender: "dana@company.org",
    subject: "General question about pricing",
    body: "Hi there, I'm evaluating your service for our organization and have some questions about your enterprise pricing plans. Could someone from your sales team reach out to discuss our requirements?",
    sentDate: "2024-01-15T11:30:00Z",
    priority: "normal" as const,
    sentiment: "positive" as const,
    category: "Query"
  },
  {
    id: "7",
    sender: "frank@tech.io",
    subject: "Support needed for integration",
    body: "We're experiencing some difficulties with the webhook integration. The events aren't being received consistently, and we're seeing timeout errors. Could your technical team assist us with troubleshooting this issue?",
    sentDate: "2024-01-15T15:10:00Z",
    priority: "normal" as const,
    sentiment: "neutral" as const,
    category: "Support"
  },
  {
    id: "8",
    sender: "grace@startup.com",
    subject: "Help with account setup",
    body: "Hello! I'm new to your platform and need some guidance setting up our team account. The onboarding process seems straightforward, but I want to ensure we configure everything correctly from the start.",
    sentDate: "2024-01-15T08:45:00Z",
    priority: "normal" as const,
    sentiment: "positive" as const,
    category: "Help"
  }
];