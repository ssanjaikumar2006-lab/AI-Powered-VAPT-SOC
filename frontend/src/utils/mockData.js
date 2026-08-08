// Central mock data source. Replace with live API responses via src/services/*.

export const kpis = [
  { id: "assets", label: "Total Assets", value: 482, delta: 4.2, trend: [12,14,13,16,18,17,20], icon: "LuServer", tone: "primary" },
  { id: "critical", label: "Critical Vulnerabilities", value: 17, delta: -8.1, trend: [30,28,26,22,20,19,17], icon: "LuFlame", tone: "danger" },
  { id: "high", label: "High Risk Findings", value: 63, delta: 2.5, trend: [50,54,52,58,60,61,63], icon: "LuTriangleAlert", tone: "warning" },
  { id: "alerts", label: "SOC Alerts (24h)", value: 214, delta: 12.4, trend: [140,150,160,175,190,205,214], icon: "LuBellRing", tone: "primary" },
  { id: "blocked", label: "Blocked Threats", value: 1092, delta: 6.7, trend: [800,850,900,950,1000,1050,1092], icon: "LuShieldCheck", tone: "success" },
  { id: "incidents", label: "Open Incidents", value: 9, delta: -3.0, trend: [15,14,13,12,11,10,9], icon: "LuSiren", tone: "danger" },
  { id: "score", label: "Security Score", value: 78, delta: 1.8, trend: [70,72,73,75,76,77,78], icon: "LuGauge", tone: "success", suffix: "/100" },
];

export const vulnSeverityBreakdown = [
  { name: "Critical", value: 17, color: "#EF4444" },
  { name: "High", value: 63, color: "#F97316" },
  { name: "Medium", value: 128, color: "#F59E0B" },
  { name: "Low", value: 214, color: "#22C55E" },
];

export const vulnTrend = [
  { month: "Feb", critical: 22, high: 58, medium: 110 },
  { month: "Mar", critical: 19, high: 61, medium: 118 },
  { month: "Apr", critical: 25, high: 55, medium: 122 },
  { month: "May", critical: 20, high: 60, medium: 115 },
  { month: "Jun", critical: 15, high: 64, medium: 130 },
  { month: "Jul", critical: 17, high: 63, medium: 128 },
];

export const assetRiskRadar = [
  { category: "Web Apps", risk: 72 },
  { category: "Network", risk: 55 },
  { category: "Cloud", risk: 64 },
  { category: "Endpoints", risk: 48 },
  { category: "APIs", risk: 80 },
  { category: "Containers", risk: 40 },
];

export const scanEngines = [
  { name: "Nmap", type: "Network Discovery", status: "completed", progress: 100 },
  { name: "Nikto", type: "Web Server Scan", status: "running", progress: 64 },
  { name: "Nuclei", type: "Template Vuln Scan", status: "running", progress: 42 },
  { name: "OWASP ZAP", type: "Dynamic App Scan", status: "queued", progress: 0 },
  { name: "SSLyze", type: "TLS/SSL Audit", status: "completed", progress: 100 },
  { name: "WhatWeb", type: "Fingerprinting", status: "completed", progress: 100 },
  { name: "Subfinder", type: "Subdomain Enum", status: "failed", progress: 30 },
  { name: "Amass", type: "Attack Surface Mapping", status: "queued", progress: 0 },
  { name: "Gobuster", type: "Directory Brute-force", status: "running", progress: 18 },
];

export const vulnerabilities = [
  { id: "VULN-1042", title: "SQL Injection in /api/v2/login", cvss: 9.8, cwe: "CWE-89", owasp: "A03:2021 Injection", asset: "api.corp-app.com", severity: "critical", patch: "Unpatched", recommendation: "Use parameterized queries; validate & sanitize all inputs." },
  { id: "VULN-1043", title: "Broken Access Control on Admin Panel", cvss: 8.6, cwe: "CWE-284", owasp: "A01:2021 Broken Access Control", asset: "admin.corp-app.com", severity: "critical", patch: "In Progress", recommendation: "Enforce server-side role checks on every admin route." },
  { id: "VULN-1044", title: "Outdated OpenSSL (CVE-2023-5678)", cvss: 7.5, cwe: "CWE-327", owasp: "A02:2021 Cryptographic Failures", asset: "10.20.4.12 (LB-Edge-01)", severity: "high", patch: "Unpatched", recommendation: "Upgrade OpenSSL to 3.1.4 or later." },
  { id: "VULN-1045", title: "Reflected XSS in Search Field", cvss: 6.1, cwe: "CWE-79", owasp: "A03:2021 Injection", asset: "www.corp-app.com", severity: "medium", patch: "Unpatched", recommendation: "Encode output; apply CSP headers." },
  { id: "VULN-1046", title: "Missing Rate Limiting on Auth Endpoint", cvss: 5.9, cwe: "CWE-307", owasp: "A07:2021 Auth Failures", asset: "api.corp-app.com", severity: "medium", patch: "Scheduled", recommendation: "Add rate limiting & account lockout policies." },
  { id: "VULN-1047", title: "Verbose Server Banner Disclosure", cvss: 3.1, cwe: "CWE-200", owasp: "A05:2021 Security Misconfig", asset: "10.20.4.30 (Web-03)", severity: "low", patch: "N/A", recommendation: "Suppress server version headers." },
  { id: "VULN-1048", title: "Insecure Direct Object Reference", cvss: 8.1, cwe: "CWE-639", owasp: "A01:2021 Broken Access Control", asset: "api.corp-app.com/invoices", severity: "high", patch: "Unpatched", recommendation: "Validate object ownership server-side per request." },
  { id: "VULN-1049", title: "Self-Signed Certificate in Production", cvss: 4.3, cwe: "CWE-295", owasp: "A02:2021 Cryptographic Failures", asset: "vpn.corp-app.com", severity: "medium", patch: "Scheduled", recommendation: "Deploy a CA-signed certificate; enforce HSTS." },
];

export const socEvents = [
  { id: "EVT-88213", time: "10:42:01", source: "Wazuh", type: "Authentication", severity: "high", srcIp: "185.220.101.4", dstIp: "10.20.4.11", event: "Multiple failed SSH logins", technique: "T1110 Brute Force" },
  { id: "EVT-88214", time: "10:41:52", source: "Firewall", type: "Network", severity: "medium", srcIp: "10.20.4.55", dstIp: "45.61.184.2", event: "Outbound connection to known C2", technique: "T1071 App Layer Protocol" },
  { id: "EVT-88215", time: "10:41:20", source: "Sysmon", type: "Endpoint", severity: "critical", srcIp: "10.20.5.9", dstIp: "-", event: "Suspicious PowerShell encoded command", technique: "T1059.001 PowerShell" },
  { id: "EVT-88216", time: "10:40:58", source: "DNS", type: "DNS", severity: "medium", srcIp: "10.20.4.71", dstIp: "8.8.8.8", event: "DNS query to DGA-pattern domain", technique: "T1568 Dynamic Resolution" },
  { id: "EVT-88217", time: "10:40:15", source: "Proxy", type: "Web", severity: "low", srcIp: "10.20.4.12", dstIp: "203.0.113.9", event: "Access to unclassified category site", technique: "-" },
  { id: "EVT-88218", time: "10:39:44", source: "Email", type: "Email", severity: "high", srcIp: "external", dstIp: "mailgw.corp.com", event: "Phishing attachment quarantined", technique: "T1566.001 Spearphishing" },
  { id: "EVT-88219", time: "10:39:02", source: "Windows", type: "Endpoint", severity: "critical", srcIp: "10.20.5.14", dstIp: "-", event: "New service created for persistence", technique: "T1543.003 Windows Service" },
  { id: "EVT-88220", time: "10:38:30", source: "Linux", type: "Endpoint", severity: "medium", srcIp: "10.20.6.2", dstIp: "-", event: "Cron job modified by non-root user", technique: "T1053.003 Cron" },
];

export const eventTimeline = Array.from({ length: 24 }).map((_, i) => ({
  hour: `${i}:00`,
  events: Math.round(20 + Math.sin(i / 3) * 15 + Math.random() * 10),
}));

export const iocs = {
  ips: [
    { value: "185.220.101.4", tag: "TOR Exit Node", confidence: 92 },
    { value: "45.61.184.2", tag: "C2 Infrastructure", confidence: 97 },
    { value: "91.219.236.18", tag: "Scanning Host", confidence: 74 },
  ],
  domains: [
    { value: "secure-login-update[.]net", tag: "Phishing", confidence: 95 },
    { value: "cdn-assets-mirror[.]xyz", tag: "Malware Delivery", confidence: 88 },
  ],
  hashes: [
    { value: "d41d8cd98f00b204e9800998ecf8427e", tag: "Trojan.GenKryptik", confidence: 90 },
    { value: "5f4dcc3b5aa765d61d8327deb882cf99", tag: "Loader.Stealer", confidence: 81 },
  ],
};

export const cveFeed = [
  { id: "CVE-2026-31022", product: "Apache HTTP Server", cvss: 9.1, published: "2026-08-02", summary: "Improper input validation leading to RCE via crafted headers." },
  { id: "CVE-2026-30877", product: "OpenSSH", cvss: 7.8, published: "2026-07-29", summary: "Privilege escalation via race condition in session handling." },
  { id: "CVE-2026-30410", product: "Fortinet FortiOS", cvss: 8.6, published: "2026-07-21", summary: "Authentication bypass in SSL-VPN portal." },
];

export const mitreTechniques = [
  { id: "T1110", name: "Brute Force", tactic: "Credential Access", hits: 14 },
  { id: "T1059.001", name: "PowerShell", tactic: "Execution", hits: 9 },
  { id: "T1566.001", name: "Spearphishing Attachment", tactic: "Initial Access", hits: 21 },
  { id: "T1071", name: "Application Layer Protocol", tactic: "Command & Control", hits: 7 },
  { id: "T1543.003", name: "Windows Service", tactic: "Persistence", hits: 5 },
];

export const incidents = [
  { id: "INC-2291", title: "C2 Beaconing Detected on Finance Subnet", severity: "critical", status: "Investigating", assignee: "A. Rao", opened: "2026-08-06 22:14", asset: "10.20.6.31" },
  { id: "INC-2290", title: "Ransomware Precursor Behavior on Web-03", severity: "critical", status: "Containment", assignee: "S. Iyer", opened: "2026-08-06 18:02", asset: "Web-03" },
  { id: "INC-2289", title: "Suspicious Admin Login from New Geo", severity: "high", status: "New", assignee: "Unassigned", opened: "2026-08-06 15:47", asset: "admin.corp-app.com" },
  { id: "INC-2288", title: "Data Exfiltration Attempt via DNS Tunneling", severity: "high", status: "Investigating", assignee: "R. Verma", opened: "2026-08-05 09:31", asset: "10.20.4.71" },
  { id: "INC-2287", title: "Phishing Campaign Targeting Finance Team", severity: "medium", status: "Resolved", assignee: "A. Rao", opened: "2026-08-04 11:05", asset: "mailgw.corp.com" },
];

export const responseActions = [
  { id: 1, name: "Block Source IP", target: "185.220.101.4", status: "pending", icon: "LuShieldOff" },
  { id: 2, name: "Create Firewall Rule", target: "Deny 45.61.184.2:*", status: "pending", icon: "LuFlameKindling" },
  { id: 3, name: "Disable User Account", target: "j.doe@corp.com", status: "completed", icon: "LuUserX" },
  { id: 4, name: "Quarantine Host", target: "10.20.5.9 (WKS-114)", status: "executing", icon: "LuBoxes" },
  { id: 5, name: "Stop Malicious Process", target: "powershell.exe (PID 4021)", status: "completed", icon: "LuOctagonX" },
  { id: 6, name: "Isolate Endpoint", target: "WKS-114", status: "pending", icon: "LuUnplug" },
  { id: 7, name: "Terminate Session", target: "Session #88213", status: "failed", icon: "LuLogOut" },
  { id: 8, name: "Notify Administrator", target: "SOC On-call", status: "completed", icon: "LuMailWarning" },
  { id: 9, name: "Generate Incident Ticket", target: "INC-2291", status: "completed", icon: "LuTicket" },
  { id: 10, name: "Generate PDF Report", target: "INC-2291 Summary", status: "pending", icon: "LuFileDown" },
];

export const assets = [
  { id: "AST-001", name: "Web-03", type: "Server", ip: "10.20.4.30", os: "Ubuntu 22.04", risk: "High", owner: "Platform Team" },
  { id: "AST-002", name: "LB-Edge-01", type: "Network", ip: "10.20.4.12", os: "N/A", risk: "Medium", owner: "NetOps" },
  { id: "AST-003", name: "WKS-114", type: "Workstation", ip: "10.20.5.9", os: "Windows 11", risk: "Critical", owner: "R. Verma" },
  { id: "AST-004", name: "prod-cluster-01", type: "Cloud", ip: "-", os: "AWS EKS", risk: "Medium", owner: "Platform Team" },
  { id: "AST-005", name: "billing-db", type: "Database", ip: "10.20.7.5", os: "PostgreSQL 16", risk: "High", owner: "Data Team" },
  { id: "AST-006", name: "auth-service", type: "Container", ip: "-", os: "Docker", risk: "Low", owner: "Backend Team" },
  { id: "AST-007", name: "core-switch-01", type: "Switch", ip: "10.20.0.1", os: "N/A", risk: "Low", owner: "NetOps" },
  { id: "AST-008", name: "vpn-gateway", type: "Router", ip: "10.20.0.254", os: "N/A", risk: "Medium", owner: "NetOps" },
];

export const reports = [
  { id: "RPT-501", name: "Q3 Executive Risk Summary", type: "Executive", date: "2026-08-01", format: ["PDF", "HTML"] },
  { id: "RPT-500", name: "Web Application Pentest — corp-app.com", type: "Technical", date: "2026-07-28", format: ["PDF", "CSV"] },
  { id: "RPT-499", name: "PCI-DSS Compliance Audit", type: "Compliance", date: "2026-07-15", format: ["PDF"] },
  { id: "RPT-498", name: "Network VAPT — External Perimeter", type: "Technical", date: "2026-07-10", format: ["PDF", "CSV", "HTML"] },
];

export const aiInsights = {
  riskScore: 78,
  confidence: 91,
  executiveSummary:
    "Overall exposure has decreased 8% month-over-month, driven by remediation of critical injection flaws. Two active intrusion attempts show early-stage C2 beaconing consistent with a financially motivated actor. Immediate priority: patch VULN-1042 and isolate WKS-114.",
  rootCause:
    "Unpatched authentication middleware combined with permissive egress firewall rules allowed an attacker foothold to establish outbound C2 communication.",
  attackPath: [
    "Initial Access via spearphishing attachment (T1566.001)",
    "Execution of encoded PowerShell payload (T1059.001)",
    "Persistence through new Windows service (T1543.003)",
    "Command & Control via HTTPS beaconing (T1071)",
    "Attempted lateral movement toward finance subnet",
  ],
  patchPriority: [
    { id: "VULN-1042", title: "SQL Injection in /api/v2/login", priority: "Immediate" },
    { id: "VULN-1043", title: "Broken Access Control on Admin Panel", priority: "Immediate" },
    { id: "VULN-1048", title: "Insecure Direct Object Reference", priority: "This Week" },
  ],
  riskTrend: [
    { day: "Mon", score: 82 },
    { day: "Tue", score: 80 },
    { day: "Wed", score: 79 },
    { day: "Thu", score: 81 },
    { day: "Fri", score: 77 },
    { day: "Sat", score: 76 },
    { day: "Sun", score: 78 },
  ],
};

export const chatSeed = [
  { role: "ai", text: "Hi, I'm Sentinel AI. Ask me about current risk posture, a specific CVE, or how to prioritize remediation." },
];
