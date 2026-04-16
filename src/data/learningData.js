/**
 * @file learningData.js
 * @description Central learning structure with paths and modules
 * Contains all course content, lessons, and learning progression data
 * Supports 3 learning levels, premium differentiation, and gamification
 * Deterministic, explainable values - ready for MongoDB migration
 * @version 3.0
 * @since 2025-12-23
 * 
 * Data Structure:
 * - 3 Learning Paths (Beginner → Intermediate → Expert)
 * - Each path has multiple modules with lessons and quizzes
 * - Module difficulty: Easy (10-15 XP), Medium (15-25 XP), Hard (25-40 XP)
 * - Categories: Phishing, Job Scams, Passwords, Financial, Social Engineering, Identity
 * - Premium flag controls access and monetization strategy
 */

/**
 * LEARNING PATHS - Three progressive difficulty levels
 * Each path builds on previous knowledge
 * Beginner (Free): Foundation knowledge
 * Intermediate (Premium): Advanced tactics and real scenarios
 * Expert (Premium): Deep dives and certifications
 */
export const LEARNING_PATHS = [
  {
    id: "beginner",
    title: "Digital Security Foundation",
    description: "Master essential cybersecurity practices through expert-led modules covering scams, privacy, and device protection",
    subtitle: "Comprehensive security training for all experience levels",
    estimatedHours: 12,
    difficulty: "Beginner",
    accessLevel: "free",
    totalXP: 85,
    color: "from-blue-500 to-blue-600",
    icon: "shield",
    badge: "Foundation",
    modules: [
      {
        id: "phishing-basics",
        title: "Phishing Awareness 101",
        description: "Understand phishing attack vectors and develop detection strategies for email-based threats",
        category: "Phishing",
        difficulty: "Easy",
        xp: 10,
        premium: false,
        estimatedMinutes: 30,
        completionRate: 94,
        rating: 4.8,
        lessonsCount: 6,
        quizzesCount: 1,
        skillsGained: ["Email Analysis", "Threat Recognition", "Spear Phishing Detection", "Incident Response"],
        practicalOutcome: "Identify phishing attempts with 90%+ accuracy and respond appropriately to suspicious emails",
        lessons: [
          // ===== MICROLEARNING LESSON (NEW FORMAT) =====
          {
            id: "phishing-basics-1",
            title: "What is Phishing?",
            type: "text",
            duration: 3,
            content: "Phishing is a cybercrime where attackers impersonate legitimate organizations to trick you into revealing sensitive information. These attacks typically arrive via email, text message, or fake websites that look nearly identical to real ones. The goal? To steal your passwords, credit card numbers, Social Security numbers, or other personal data. Phishing works because it exploits human psychology—creating urgency, fear, or curiosity to bypass your critical thinking. A phishing email might claim your account has been compromised, your package can't be delivered, or you've won a prize. The message creates pressure to act immediately, hoping you'll click a malicious link or download an infected attachment before you realize something's wrong.",
            keyPoints: [
              "Phishing impersonates trusted organizations to steal your personal information",
              "Attackers create urgency or fear to make you act without thinking",
              "Common targets: passwords, credit cards, Social Security numbers, and login credentials",
              "Delivered via email, text (smishing), or phone calls (vishing)"
            ],
            visualAid: {
              type: "comparison",
              title: "Real vs Fake Email Addresses",
              data: {
                safe: "support@paypal.com (Official PayPal domain)",
                unsafe: "support@paypaul.com (Typo in domain - common phishing tactic)",
                safeLabel: "Legitimate",
                unsafeLabel: "Phishing"
              }
            },
            checkpointQuiz: {
              question: "What is the primary goal of a phishing attack?",
              options: [
                "To send you promotional offers",
                "To trick you into revealing sensitive information",
                "To improve email security",
                "To test your cybersecurity knowledge"
              ],
              correctAnswer: 1,
              explanation: "Phishing attacks aim to trick you into revealing passwords, credit card numbers, or personal data by impersonating legitimate companies. They exploit trust and urgency to bypass your critical thinking."
            }
          },
          // ===== OLD FORMAT LESSONS (BACKWARD COMPATIBILITY) =====
          {
            title: "What is Phishing?",
            content: "Phishing is a type of cyber attack where scammers send fake emails, messages, or create fake websites that appear to be from legitimate companies. Their goal is to trick you into revealing sensitive information like passwords, credit card numbers, or personal data. Phishing emails often create a sense of urgency to make you act quickly without thinking.",
            tips: [
              "Phishing emails often claim your account needs immediate verification",
              "They may say your password has expired",
              "Warning: 'Act now or your account will be closed'"
            ]
          },
          {
            id: "phishing-basics-2",
            title: "Red Flags to Watch For",
            type: "text",
            duration: 3,
            content: "Professional companies never ask for passwords via email—this is your first and most important red flag. Phishing emails reveal themselves through several telltale signs: suspicious sender addresses that mimic legitimate domains with subtle typos (like 'paypaul.com' instead of 'paypal.com'), poor grammar and spelling errors that professional companies wouldn't make, generic greetings like 'Dear User' instead of your actual name, and urgent language creating artificial pressure to act immediately. The links in these emails often don't match the company's official website—hover over any link before clicking to see the real destination URL. Most importantly, legitimate companies will never request personal information, passwords, or financial details through email. If you receive such a request, it's almost certainly a phishing attempt.",
            keyPoints: [
              "Real companies use official domain names, not free email services or misspelled domains",
              "Professional emails have proper grammar, spelling, and use your actual name",
              "Hover over links to verify the URL matches the company's official website",
              "Never provide passwords, credit card numbers, or sensitive data via email"
            ],
            visualAid: {
              type: "checklist",
              title: "Phishing Detection Checklist",
              data: {
                items: [
                  "Check sender email address for typos or suspicious domains",
                  "Look for grammar and spelling mistakes",
                  "Verify greeting uses your actual name, not 'Dear User'",
                  "Hover over links to check real destination URL",
                  "Question any urgent language or threats",
                  "Never click 'Verify Account' or 'Update Password' links in emails"
                ]
              }
            },
            checkpointQuiz: {
              question: "Which of these is NOT a red flag for phishing emails?",
              options: [
                "Generic greeting like 'Dear Customer'",
                "Professional email signature with company logo",
                "Urgent language demanding immediate action",
                "Request for password or credit card information"
              ],
              correctAnswer: 1,
              explanation: "Professional email signatures and company logos are actually signs of legitimate emails. Red flags include generic greetings, urgency tactics, and requests for sensitive information. However, be aware that scammers can copy logos, so always verify the sender's email address."
            }
          },
          {
            id: "phishing-basics-3",
            title: "How to Protect Yourself",
            type: "text",
            duration: 4,
            content: "The best defense against phishing is a combination of technical safeguards and smart habits. Never click links or download attachments from suspicious emails—instead, manually type the company's official URL into your browser or use a bookmarked link. Enable two-factor authentication (2FA) on all important accounts, especially email, banking, and social media. This adds a critical second layer of security even if your password is compromised. Use a password manager to generate and store unique, complex passwords for each account—reusing passwords across sites is one of the most dangerous security mistakes. Keep your email address private and only share it with trusted organizations. If you're ever unsure about an email's legitimacy, contact the company directly using a phone number from their official website, not from the email itself. Finally, keep your software and operating system updated, as these updates often include security patches that protect against known phishing techniques.",
            keyPoints: [
              "Type URLs directly into your browser instead of clicking email links",
              "Enable two-factor authentication on all important accounts",
              "Use a password manager for unique, strong passwords on every site",
              "Contact companies directly using official phone numbers to verify suspicious emails"
            ],
            visualAid: {
              type: "checklist",
              title: "Essential Security Actions",
              data: {
                items: [
                  "Install and use a reputable password manager (1Password, Bitwarden, LastPass)",
                  "Enable 2FA on email, banking, social media, and work accounts",
                  "Never reuse passwords across different websites",
                  "Bookmark important websites instead of clicking email links",
                  "Keep software, browser, and operating system updated",
                  "Use email filters to catch phishing attempts automatically",
                  "Report suspicious emails to your email provider and the impersonated company"
                ]
              }
            },
            checkpointQuiz: {
              question: "What is the BEST way to access a website mentioned in a suspicious email?",
              options: [
                "Click the link in the email to save time",
                "Copy and paste the link from the email",
                "Type the official URL directly into your browser",
                "Search for the company on Google and click the first result"
              ],
              correctAnswer: 2,
              explanation: "Always type the official URL directly into your browser or use a bookmarked link. This ensures you're visiting the real website, not a phishing site. Clicking links in emails or even copying them can lead to fake websites designed to steal your information."
            }
          },
          {
            id: "phishing-basics-4",
            title: "Spear Phishing vs. General Phishing",
            type: "text",
            duration: 3,
            content: "While general phishing casts a wide net by sending identical emails to thousands of random people hoping someone will bite, spear phishing is a precision strike. Attackers invest time researching specific individuals or companies, gathering personal information from LinkedIn profiles, social media posts, company websites, and public records. They then craft highly customized messages that appear to come from trusted contacts—your boss, a colleague, or a business partner. These personalized attacks are far more effective because they reference real names, job titles, recent meetings, or company-specific projects. A spear phishing email might say 'Following up on yesterday's budget meeting' or 'As discussed with Sarah, here's the updated contract.' The personal touch makes these emails feel legitimate and bypasses your usual skepticism. CEO fraud, where attackers impersonate executives to request urgent wire transfers, is an especially dangerous form of spear phishing.",
            keyPoints: [
              "Spear phishing targets specific individuals with personalized, researched attacks",
              "Attackers gather information from LinkedIn, social media, and public sources",
              "These emails reference real names, meetings, and company-specific details",
              "CEO fraud impersonates executives to request urgent financial transactions"
            ],
            visualAid: {
              type: "comparison",
              title: "General Phishing vs Spear Phishing",
              data: {
                safe: "General Phishing: Mass emails to thousands of random people with generic messages like 'Your account needs verification'",
                unsafe: "Spear Phishing: Targeted email to you specifically: 'Hi John, following up on our Q4 budget meeting yesterday. Please review the attached invoice from Acme Corp.'",
                safeLabel: "Mass Attack",
                unsafeLabel: "Targeted Attack"
              }
            },
            checkpointQuiz: {
              question: "You receive an email from your CEO asking you to urgently wire $50,000 to a vendor. The email mentions a project you're working on. What should you do?",
              options: [
                "Wire the money immediately since the CEO is asking",
                "Reply to the email asking for confirmation",
                "Call the CEO directly using a known phone number to verify",
                "Forward the email to the vendor to confirm"
              ],
              correctAnswer: 2,
              explanation: "Always verify urgent financial requests in person or by calling the person using a phone number you already have—never use contact information from the suspicious email. This is a classic CEO fraud scenario, even if the email mentions accurate project details."
            }
          },
          {
            id: "phishing-basics-5",
            title: "Recognizing Legitimate Company Communications",
            type: "text",
            duration: 3,
            content: "Learning to identify legitimate emails is just as important as spotting phishing attempts—it helps you trust the right messages while staying skeptical of suspicious ones. Legitimate companies consistently use their official domain names (like @company.com, never @gmail.com or @outlook.com), never request sensitive information like passwords or credit card numbers via email, and include specific contact information with physical addresses and direct phone numbers. Their emails use professional templates that match previous communications you've received, maintain consistent branding with logos and colors that exactly match their website, and use professional language without creating artificial urgency. Real companies understand security and will never pressure you to 'act now or lose access.' If you're unsure about an email's legitimacy, compare it to previous emails from that company, check the sender's email address character by character for typos, and verify any requests by calling the company's main number from their official website—not a number provided in the email.",
            keyPoints: [
              "Legitimate companies use official @company.com domains, never free email services",
              "Real companies never ask for passwords, PINs, or full credit card numbers via email",
              "Professional emails include verifiable contact information and physical addresses",
              "Consistent branding, formatting, and professional language without urgency tactics"
            ],
            visualAid: {
              type: "comparison",
              title: "Legitimate vs Phishing Email Characteristics",
              data: {
                safe: "Legitimate: From support@paypal.com, professional formatting, includes PayPal's address and phone, no password request, calm tone",
                unsafe: "Phishing: From support@paypal-security.com, urgent 'verify now!', asks for password, poor grammar, no physical address",
                safeLabel: "Real Company Email",
                unsafeLabel: "Phishing Email"
              }
            },
            checkpointQuiz: {
              question: "Which of these is the STRONGEST indicator that an email is legitimate?",
              options: [
                "It has the company logo and looks professional",
                "The sender's email address uses the official company domain",
                "It addresses you by your full name",
                "It includes a customer service phone number"
              ],
              correctAnswer: 1,
              explanation: "While logos, names, and phone numbers can all be faked, the sender's email domain is the most reliable indicator. Always verify the email comes from @officialcompany.com, not a similar-looking domain. However, even this can be spoofed, so verify important requests through a separate channel."
            }
          },
          {
            id: "phishing-basics-6",
            title: "What to Do After Clicking a Phishing Link",
            type: "text",
            duration: 4,
            content: "If you've clicked a suspicious link or downloaded an attachment from a phishing email, don't panic—quick, decisive action can prevent or minimize damage. Your first priority is damage control: immediately change your password, especially if you entered login credentials on the suspicious site. If possible, use a different, trusted device to change passwords in case your current device is compromised. Enable two-factor authentication if you haven't already—this provides critical protection even if attackers have your password. Run a comprehensive malware scan using reputable security software like Malwarebytes, Windows Defender, or your antivirus program. Monitor all your accounts closely for unusual activity: unexpected login locations, unrecognized transactions, or settings changes you didn't make. If you entered financial information like credit card numbers or bank details, contact your financial institution immediately—within 24 hours if possible. They can freeze your card, monitor for fraudulent charges, and issue a replacement. Report the incident to the FTC at reportfraud.ftc.gov if you lost money, and forward the phishing email to your email provider and the company being impersonated.",
            keyPoints: [
              "Change passwords immediately, preferably from a different device",
              "Enable two-factor authentication for added security",
              "Run malware scans and monitor accounts for suspicious activity",
              "Contact your bank within 24 hours if you entered financial information"
            ],
            visualAid: {
              type: "checklist",
              title: "Incident Response Checklist",
              data: {
                items: [
                  "Change password immediately (use a different device if possible)",
                  "Enable 2FA on the compromised account",
                  "Run full malware scan (Malwarebytes, Windows Defender, antivirus)",
                  "Check account activity for unauthorized logins or changes",
                  "Contact bank/credit card company if you entered financial info",
                  "Monitor credit reports for new unauthorized accounts",
                  "Report to FTC at reportfraud.ftc.gov if money was lost",
                  "Forward phishing email to reportphishing@apwg.org",
                  "Alert IT department if it's a work account"
                ]
              }
            },
            checkpointQuiz: {
              question: "You clicked a phishing link and entered your bank password. What should you do FIRST?",
              options: [
                "Wait to see if anything bad happens",
                "Run a malware scan on your computer",
                "Change your bank password immediately",
                "Call your bank to report the incident"
              ],
              correctAnswer: 2,
              explanation: "Change your password immediately to prevent attackers from accessing your account. Do this before running scans or calling the bank. If possible, use a different device to change the password in case your current device is compromised. Then run malware scans and contact your bank."
            }
          }
        ],
        quiz: {
          id: "phishing-quiz",
          title: "Phishing Awareness Quiz",
          description: "Test your ability to identify and respond to phishing attacks",
          passingScore: 70,
          shuffleConfig: {
            questions: true,
            options: true,
            limit: null
          },
          questions: [
            {
              id: "phish-q1",
              type: "mcq",
              difficulty: "easy",
              question: "What is the primary goal of a phishing attack?",
              options: [
                "To steal sensitive information like passwords and credit card numbers",
                "To send you advertisements for products",
                "To test your email security settings",
                "To deliver legitimate security updates"
              ],
              correctAnswer: 0,
              explanation: "Phishing attacks are designed to trick you into revealing sensitive information such as passwords, credit card numbers, and personal data. The other options describe spam, security testing, or legitimate communications.",
              points: 10,
              tags: ["phishing-basics", "definition"]
            },
            {
              id: "phish-q2",
              type: "mcq",
              difficulty: "medium",
              question: "You receive an email claiming your Amazon account will be suspended unless you verify your payment information within 24 hours. The email has the Amazon logo and looks professional. What should you do FIRST?",
              options: [
                "Log into Amazon directly by typing amazon.com in your browser to check your account status",
                "Click the link in the email to verify your information quickly",
                "Reply to the email asking for more details",
                "Forward the email to your friends to warn them"
              ],
              correctAnswer: 0,
              explanation: "Never click links in suspicious emails, even if they look legitimate. Always navigate directly to the website by typing the URL yourself. Amazon will never ask you to verify payment info via email. The urgency ('24 hours') is a classic phishing tactic designed to bypass your critical thinking.",
              points: 10,
              tags: ["phishing-response", "urgency-tactics"]
            },
            {
              id: "phish-q3",
              type: "mcq",
              difficulty: "hard",
              question: "You receive an email from 'security@paypa1.com' (note the number 1 instead of letter L) with your correct name and recent transaction details. It asks you to reset your password due to suspicious activity. What makes this MOST LIKELY a phishing attempt?",
              options: [
                "The sender domain uses '1' instead of 'l' - a common spoofing technique",
                "PayPal never sends security alerts via email",
                "The email contains your personal information",
                "Password reset requests always come from phone calls"
              ],
              correctAnswer: 0,
              explanation: "The domain 'paypa1.com' (with number 1) instead of 'paypal.com' (with letter L) is a classic domain spoofing technique called 'typosquatting.' While the email contains accurate personal info (possibly from a data breach), the fake domain is the strongest indicator. PayPal does send security emails, but always from legitimate @paypal.com addresses.",
              points: 15,
              tags: ["domain-spoofing", "advanced-phishing"]
            },
            {
              id: "phish-q4",
              type: "mcq",
              difficulty: "easy",
              question: "Which of these is a common red flag in phishing emails?",
              options: [
                "Generic greetings like 'Dear Customer' instead of your name",
                "Professional company logos and branding",
                "Emails sent during business hours",
                "Emails with attachments"
              ],
              correctAnswer: 0,
              explanation: "Generic greetings are a major red flag because legitimate companies usually personalize emails with your name. While professional logos can be copied, and emails can be sent anytime, generic greetings indicate mass phishing campaigns that don't have your personal details.",
              points: 10,
              tags: ["red-flags", "identification"]
            },
            {
              id: "phish-q5",
              type: "mcq",
              difficulty: "medium",
              question: "You clicked a link in a phishing email 30 minutes ago and entered your bank password. What's your FIRST action?",
              options: [
                "Wait to see if anything bad happens before taking action",
                "Change your bank password immediately and enable two-factor authentication",
                "Delete the email and hope for the best",
                "Contact your bank after a few days to check for suspicious activity"
              ],
              correctAnswer: 1,
              explanation: "Act immediately! Change your password right away and enable 2FA if you haven't already. The sooner you act, the less time criminals have to exploit your account. Also monitor your account for unauthorized transactions and consider calling your bank to report the incident.",
              points: 10,
              tags: ["incident-response", "breach-response"]
            },
            {
              id: "phish-q6",
              type: "mcq",
              difficulty: "medium",
              question: "What is the main difference between general phishing and spear phishing?",
              options: [
                "General phishing uses emails, spear phishing uses phone calls",
                "Spear phishing is targeted to specific individuals using personal information",
                "General phishing is more dangerous than spear phishing",
                "They are the same thing with different names"
              ],
              correctAnswer: 1,
              explanation: "Spear phishing is highly targeted and customized using personal details about the victim (job title, colleagues, recent activities), making it much harder to detect than mass phishing campaigns. Attackers research their targets to create convincing, personalized messages.",
              points: 10,
              tags: ["phishing-types", "spear-phishing"]
            },
            {
              id: "phish-q7",
              type: "true-false",
              difficulty: "easy",
              question: "If an email has correct company logos and professional formatting, it's safe to click the links inside.",
              correctAnswer: 1, // False
              explanation: "FALSE. Logos and professional formatting can easily be copied by scammers. Always verify the sender's email address, check for other red flags, and navigate to websites directly by typing the URL yourself rather than clicking email links.",
              points: 10,
              tags: ["misconceptions", "visual-deception"]
            },
            {
              id: "phish-q8",
              type: "mcq",
              difficulty: "hard",
              question: "Your colleague sends you an email with a link to a 'urgent company document' that requires your login. The email address looks correct. What should you do?",
              options: [
                "Click the link since it's from a colleague",
                "Verify with your colleague through a different channel (call or in-person) before clicking",
                "Reply to the email asking if it's legitimate",
                "Forward it to IT and wait for their response"
              ],
              correctAnswer: 1,
              explanation: "Even if an email appears to be from a colleague, their account may have been compromised. Always verify urgent requests through a different communication channel (phone call, in-person, or company chat) before clicking links or providing information. This is especially important for requests involving credentials or sensitive data.",
              points: 15,
              tags: ["account-compromise", "verification"]
            },
            {
              id: "phish-q9",
              type: "fill-blank",
              difficulty: "medium",
              question: "Always check the ___ address before clicking links in emails to verify the sender's legitimacy.",
              correctAnswer: "sender",
              acceptedAnswers: ["sender", "email", "sender's", "sender's email", "email address"],
              explanation: "Verifying the sender's email address is crucial. Look for slight misspellings, extra characters, or suspicious domains. Legitimate companies use consistent, official email domains.",
              points: 10,
              tags: ["verification", "email-address"]
            },
            {
              id: "phish-q10",
              type: "mcq",
              difficulty: "medium",
              question: "You receive a text message claiming to be from your bank, asking you to click a link to unlock your account. This is an example of:",
              options: [
                "Legitimate bank security procedure",
                "Smishing (SMS phishing)",
                "Vishing (voice phishing)",
                "Pharming"
              ],
              correctAnswer: 1,
              explanation: "This is 'smishing' - phishing via SMS/text messages. Like email phishing, smishing uses urgency and fear to trick you into clicking malicious links. Banks will never ask you to click links in text messages to unlock accounts. Always call your bank directly using the number on your card or their official website.",
              points: 10,
              tags: ["smishing", "phishing-types"]
            }
          ]
        }
      },
      {
        id: "password-security",
        title: "Password Security Essentials",
        description: "Implement industry-standard password practices and multi-factor authentication protocols",
        category: "Password Security",
        difficulty: "Easy",
        xp: 12,
        premium: false,
        estimatedMinutes: 28,
        completionRate: 87,
        rating: 4.7,
        lessonsCount: 6,
        quizzesCount: 1,
        skillsGained: ["Password Creation", "2FA Implementation", "Password Management", "Breach Response"],
        practicalOutcome: "Create and maintain secure passwords across all accounts using industry best practices",
        lessons: [
          {
            id: "password-security-1",
            title: "Why Strong Passwords Matter",
            type: "text",
            duration: 3,
            content: "Your password is the digital key to your entire online life—email, banking, social media, work accounts, and more. Weak passwords are the #1 security vulnerability, allowing hackers to break into accounts in seconds using automated tools that try billions of combinations per second. A strong password is your first and most critical line of defense against unauthorized access, identity theft, and financial fraud. Think of each account as a vault: a weak password is like using a simple combination lock that anyone can crack, while a strong password is like a bank vault with multiple layers of security. When one account is compromised with a reused password, hackers immediately try that same password on your email, bank, and other accounts—a domino effect that can compromise your entire digital identity. The difference between a weak and strong password isn't just technical—it's the difference between security and catastrophic data breach.",
            keyPoints: [
              "Weak passwords can be cracked in seconds by automated hacking tools",
              "Strong passwords prevent unauthorized access and protect against identity theft",
              "Password reuse across sites creates a domino effect when one account is breached",
              "Your password is the first line of defense for all your online accounts"
            ],
            visualAid: {
              type: "comparison",
              title: "Weak vs Strong Password Examples",
              data: {
                unsafe: "password123 - Cracked in under 1 second by automated tools",
                safe: "Tr0pic@l$unset#2024!Mango - Would take centuries to crack with current technology",
                unsafeLabel: "Weak Password",
                safeLabel: "Strong Password"
              }
            },
            checkpointQuiz: {
              question: "Why is reusing the same password across multiple websites dangerous?",
              options: [
                "It makes passwords harder to remember",
                "If one site is breached, hackers can access all your accounts",
                "Websites don't allow password reuse",
                "It slows down your login process"
              ],
              correctAnswer: 1,
              explanation: "When one website is breached and your password is leaked, hackers immediately try that same password on your email, bank, social media, and other accounts. This domino effect can compromise your entire digital identity from a single breach."
            }
          },
          {
            id: "password-security-2",
            title: "Creating Unbreakable Passwords",
            type: "text",
            duration: 3,
            content: "Creating a truly strong password requires understanding what makes passwords vulnerable. Aim for at least 16 characters—length is exponentially more important than complexity. A 16-character password is literally 10,000 times stronger than an 8-character one. Mix uppercase and lowercase letters, numbers, and special symbols (!@#$%^&*), but avoid predictable patterns like 'Password123!' or 'Summer2024!'. Never use dictionary words, personal information (birthdays, names, addresses), or common substitutions (@ for 'a', 3 for 'e'). Instead, consider passphrases—random, memorable sentences like 'Purple$Elephants#Dance@Midnight7' are both strong and easier to remember than random character strings. The key is randomness and length. Avoid writing passwords on sticky notes, sharing them verbally, or storing them in plain text files. Each account should have a completely unique password—never reuse passwords, even with slight variations.",
            keyPoints: [
              "Aim for 16+ characters—length matters more than complexity",
              "Use random passphrases instead of predictable patterns",
              "Never reuse passwords or use personal information",
              "Avoid common substitutions like @ for 'a' or 3 for 'e'"
            ],
            visualAid: {
              type: "checklist",
              title: "Strong Password Creation Checklist",
              data: {
                items: [
                  "At least 16 characters long (longer is exponentially stronger)",
                  "Mix of uppercase, lowercase, numbers, and symbols",
                  "No dictionary words or common phrases",
                  "No personal information (birthdays, names, addresses)",
                  "Completely unique for each account",
                  "Use random passphrases like 'Tropical$Sunset#2024!Mango'",
                  "Avoid predictable patterns or keyboard sequences"
                ]
              }
            },
            checkpointQuiz: {
              question: "Which password is the STRONGEST?",
              options: [
                "MyBirthday1990!",
                "P@ssw0rd123",
                "Quantum$Flamingo#Dancing@7PM",
                "JohnSmith2024"
              ],
              correctAnswer: 2,
              explanation: "The third option is strongest because it's long (28 characters), uses a random passphrase, includes symbols, and contains no personal information. The others use predictable patterns, personal info, or common substitutions that hackers easily crack."
            }
          },
          {
            id: "password-security-3",
            title: "Password Management Best Practices",
            type: "text",
            duration: 4,
            content: "Trying to remember dozens of unique, complex passwords is impossible—that's where password managers become essential. Password managers like Bitwarden, 1Password, LastPass, or Dashlane securely store all your passwords in an encrypted vault protected by one master password. They use military-grade AES-256 encryption, the same standard used by governments and banks. Beyond storage, password managers generate truly random passwords (no human bias), automatically fill credentials on legitimate sites (preventing phishing), sync across all your devices, and alert you to weak or reused passwords. The autofill feature is particularly powerful for security: password managers only fill credentials on the exact legitimate website, so even if you click a phishing link, the manager won't fill your password on the fake site. Your only job is to remember one strong master password and keep it absolutely secure—write it down and store it in a physical safe if needed, but never store it digitally.",
            keyPoints: [
              "Password managers use military-grade AES-256 encryption",
              "Autofill only works on legitimate sites, preventing phishing",
              "Generate truly random passwords you don't need to remember",
              "One strong master password protects all your accounts"
            ],
            visualAid: {
              type: "comparison",
              title: "Manual vs Password Manager",
              data: {
                unsafe: "Manual: Reused passwords, weak passwords you can remember, vulnerable to phishing, no breach alerts",
                safe: "Password Manager: Unique strong passwords for every site, auto-fill prevents phishing, breach monitoring, encrypted storage",
                unsafeLabel: "Manual Password Management",
                safeLabel: "Password Manager"
              }
            },
            checkpointQuiz: {
              question: "How does a password manager's autofill feature help prevent phishing?",
              options: [
                "It makes typing faster",
                "It only fills passwords on the exact legitimate website URL",
                "It blocks all phishing emails",
                "It changes your password automatically"
              ],
              correctAnswer: 1,
              explanation: "Password managers only autofill on the exact legitimate website URL. Even if you click a phishing link to a fake site, the manager won't fill your credentials because the URL doesn't match, alerting you to the danger."
            }
          },
          {
            id: "password-security-4",
            title: "Two-Factor Authentication (2FA)",
            type: "text",
            duration: 4,
            content: "Two-factor authentication (2FA) is your safety net when passwords fail. Even if hackers steal your password through a data breach or phishing attack, they still can't access your account without the second factor. 2FA requires two different types of proof: something you know (password) and something you have (phone, security key) or something you are (fingerprint, face). Common 2FA methods include authenticator apps (Google Authenticator, Authy, Microsoft Authenticator), SMS text codes, physical security keys (YubiKey, Titan), biometric authentication, and backup recovery codes. Authenticator apps and security keys are significantly more secure than SMS because they can't be intercepted through SIM swapping attacks, where scammers convince your phone carrier to transfer your number to their device. Enable 2FA on every account that offers it, prioritizing email (your account recovery hub), banking, social media, and work accounts. Save backup codes in a secure location separate from your password manager in case you lose access to your 2FA device.",
            keyPoints: [
              "2FA protects accounts even when passwords are compromised",
              "Authenticator apps and security keys are more secure than SMS",
              "Enable 2FA on email, banking, social media, and work accounts",
              "Store backup codes separately in case you lose your 2FA device"
            ],
            visualAid: {
              type: "checklist",
              title: "2FA Security Levels (Most to Least Secure)",
              data: {
                items: [
                  "Physical Security Keys (YubiKey, Titan) - Highest security, phishing-proof",
                  "Authenticator Apps (Google Authenticator, Authy) - Very secure, offline codes",
                  "Biometric (Fingerprint, Face ID) - Convenient and secure for devices",
                  "Backup Codes - Essential fallback, store securely offline",
                  "SMS Text Codes - Convenient but vulnerable to SIM swapping",
                  "Email Codes - Least secure, only if no other option available"
                ]
              }
            },
            checkpointQuiz: {
              question: "Why are authenticator apps more secure than SMS for 2FA?",
              options: [
                "They're easier to use",
                "They can't be intercepted through SIM swapping attacks",
                "They work without internet",
                "They're free to download"
              ],
              correctAnswer: 1,
              explanation: "Authenticator apps generate codes locally on your device and can't be intercepted. SMS codes can be stolen through SIM swapping, where attackers convince your carrier to transfer your number to their device, giving them access to your 2FA codes."
            }
          },
          {
            id: "password-security-5",
            title: "Recognizing Password Reset Scams",
            type: "text",
            duration: 3,
            content: "Password reset scams are a sophisticated phishing tactic where attackers send fake password reset emails to steal your credentials. These emails look remarkably legitimate, often copying the exact design of real company emails. The scam works by linking to a fake website that looks identical to the real login page—when you 'reset' your password there, you're actually giving it directly to the attacker. Legitimate password reset emails always come from official company domains (check character-by-character for typos), include your actual username or email address (not generic 'Dear User'), never ask for your current password (real resets only let you create a new one), and link to URLs that exactly match the official website. If you receive an unexpected password reset email, don't click any links. Instead, open a new browser tab, manually type the official website URL, and check your account security settings. If there's an unauthorized reset attempt, change your password immediately and enable 2FA. Be especially vigilant with password reset emails for critical accounts like email, banking, and work systems.",
            keyPoints: [
              "Fake reset emails link to phishing sites that steal your new password",
              "Real resets never ask for your current password",
              "Always verify by going directly to the official website",
              "Unexpected reset emails may indicate someone is trying to access your account"
            ],
            visualAid: {
              type: "comparison",
              title: "Legitimate vs Fake Password Reset Email",
              data: {
                safe: "Legitimate: From official domain, uses your name, links to real site, no current password request, calm tone",
                unsafe: "Fake: Suspicious domain, generic greeting, urgent 'verify now!', asks for current password, links to phishing site",
                safeLabel: "Real Reset Email",
                unsafeLabel: "Phishing Reset Scam"
              }
            },
            checkpointQuiz: {
              question: "You receive a password reset email you didn't request. What should you do FIRST?",
              options: [
                "Click the link to cancel the reset",
                "Reply to the email asking why",
                "Go directly to the official website and check your account",
                "Ignore it completely"
              ],
              correctAnswer: 2,
              explanation: "Never click links in unexpected emails. Go directly to the official website by typing the URL yourself, then check your account security settings. An unrequested reset email could mean someone is trying to access your account, so change your password and enable 2FA."
            }
          },
          {
            id: "password-security-6",
            title: "What to Do If Your Password is Compromised",
            type: "text",
            duration: 4,
            content: "Discovering your password has been compromised is alarming, but immediate action can prevent catastrophic damage. Time is critical—every minute counts. First, change your password immediately to something completely new and unique, ideally from a different, trusted device in case your current device is compromised. If you reused that password anywhere else (a dangerous practice), change it on every single site immediately—attackers will try your leaked password on all major platforms. Enable two-factor authentication if you haven't already; this provides critical protection even if attackers have your new password. Thoroughly review your account activity logs for unauthorized access, unusual login locations, unrecognized devices, or settings changes you didn't make. Check connected apps and third-party services that have access to your account and revoke any you don't recognize. Monitor your credit reports and financial accounts for fraudulent activity. If the compromised account was your email, this is especially critical—email is the master key to all your other accounts through password resets. Contact the company's support team to report the breach and ask about additional security measures. Consider using a service like Have I Been Pwned to check if your email appears in other data breaches.",
            keyPoints: [
              "Change password immediately from a secure device",
              "If password was reused, change it on every site immediately",
              "Enable 2FA and review account activity for unauthorized access",
              "Email compromise is critical—it's the master key to all accounts"
            ],
            visualAid: {
              type: "checklist",
              title: "Password Breach Response Checklist",
              data: {
                items: [
                  "Change password immediately (use different device if possible)",
                  "Change password on every site where you reused it",
                  "Enable 2FA on the compromised account",
                  "Review account activity log for unauthorized access",
                  "Check and revoke unrecognized connected apps/devices",
                  "Monitor credit reports for fraudulent accounts",
                  "Contact company support to report the breach",
                  "Check haveibeenpwned.com for other breaches",
                  "If email was compromised, secure all accounts immediately"
                ]
              }
            },
            checkpointQuiz: {
              question: "Your email password was leaked in a data breach. Why is this especially critical?",
              options: [
                "You'll lose all your emails",
                "Email is used for password resets on all your other accounts",
                "The company will charge you a fee",
                "You can't create a new email address"
              ],
              correctAnswer: 1,
              explanation: "Email is the master key to your digital life. Attackers who control your email can reset passwords on your banking, social media, work accounts, and everything else. Securing your email immediately is the highest priority in any breach response."
            }
          }
        ],
        quiz: {
          id: "password-security-quiz",
          title: "Password Security Mastery Quiz",
          description: "Test your knowledge of password best practices and multi-factor authentication",
          passingScore: 70,
          shuffleConfig: {
            questions: true,
            options: true,
            limit: null
          },
          questions: [
            {
              id: "pass-q1",
              type: "mcq",
              difficulty: "easy",
              question: "What is the minimum recommended password length for strong security in 2026?",
              options: ["8 characters", "12 characters", "16 characters", "20 characters"],
              correctAnswer: 2,
              explanation: "Modern security standards recommend at least 16 characters for strong passwords. While 12 was acceptable in the past, computing power has increased, making longer passwords necessary. Use a mix of uppercase, lowercase, numbers, and symbols.",
              points: 10,
              tags: ["password-length", "basics"]
            },
            {
              id: "pass-q2",
              type: "mcq",
              difficulty: "medium",
              question: "You need to create a password for your banking app. Which approach is MOST secure?",
              options: [
                "MyBank2026!",
                "Correct-Horse-Battery-Staple-2026",
                "Use your password manager to generate a random 20-character password",
                "YourName@BankName123"
              ],
              correctAnswer: 2,
              explanation: "Password managers generate truly random, long passwords that are impossible to guess or crack. While passphrases (option B) are good, random generated passwords are stronger. Options A and D use predictable patterns that hackers target.",
              points: 10,
              tags: ["password-creation", "password-managers"]
            },
            {
              id: "pass-q3",
              type: "mcq",
              difficulty: "hard",
              question: "Your company requires you to change your password every 90 days. You currently use 'CompanyName2024!'. What's the BEST approach for your next password?",
              options: [
                "Change it to 'CompanyName2025!'",
                "Add more special characters: 'CompanyName2024!@#'",
                "Create a completely new, unique password using a password manager",
                "Use a passphrase like 'IWorkAtCompanyName2024'"
              ],
              correctAnswer: 2,
              explanation: "Incremental changes (2024→2025) are predictable and easily cracked if your old password is compromised. Always create completely new, unique passwords. Modern security research actually questions frequent password changes, but if required, make each password truly unique.",
              points: 15,
              tags: ["password-rotation", "advanced"]
            },
            {
              id: "pass-q4",
              type: "mcq",
              difficulty: "easy",
              question: "What is the safest way to store multiple complex passwords?",
              options: [
                "Write them in a notebook kept in a locked drawer",
                "Store them in a password manager with a strong master password",
                "Save them in a Word document on your computer",
                "Use the same password everywhere so you only need to remember one"
              ],
              correctAnswer: 1,
              explanation: "Password managers encrypt and securely store passwords, allowing you to use unique strong passwords for each account. They're protected by one strong master password and often include 2FA. Never reuse passwords or store them in plain text.",
              points: 10,
              tags: ["password-storage", "password-managers"]
            },
            {
              id: "pass-q5",
              type: "mcq",
              difficulty: "medium",
              question: "Which is the MOST secure form of two-factor authentication (2FA)?",
              options: [
                "SMS text messages with verification codes",
                "Email verification links",
                "Hardware security keys (like YubiKey) or authenticator apps",
                "Security questions (mother's maiden name, first pet, etc.)"
              ],
              correctAnswer: 2,
              explanation: "Hardware security keys and authenticator apps (like Google Authenticator, Authy) are most secure because they can't be intercepted. SMS can be hijacked through SIM swapping, emails can be compromised, and security questions can be guessed or found on social media.",
              points: 10,
              tags: ["2fa", "authentication"]
            },
            {
              id: "pass-q6",
              type: "mcq",
              difficulty: "hard",
              question: "You discover your password was exposed in a data breach 6 months ago. You use variations of this password on multiple sites. What's your FIRST action?",
              options: [
                "Check haveibeenpwned.com to see which sites were affected",
                "Change the password on the breached site immediately",
                "Change passwords on ALL sites where you used that password or variations",
                "Enable 2FA on your most important accounts"
              ],
              correctAnswer: 2,
              explanation: "If hackers have your password from 6 months ago, they've likely already tried it on other sites (credential stuffing). Change ALL related passwords immediately, starting with financial and email accounts. Then enable 2FA everywhere. Speed is critical—assume they've already accessed other accounts.",
              points: 15,
              tags: ["breach-response", "incident-response"]
            },
            {
              id: "pass-q7",
              type: "true-false",
              difficulty: "medium",
              question: "It's safe to use the same strong password across multiple sites as long as you enable 2FA on each site.",
              correctAnswer: 1, // False
              explanation: "FALSE. Even with 2FA, reusing passwords is dangerous. If one site is breached and doesn't properly encrypt passwords, hackers can use that password to attempt access on other sites. Some sites may not have 2FA, or hackers might bypass it. Always use unique passwords for each account.",
              points: 10,
              tags: ["password-reuse", "misconceptions"]
            },
            {
              id: "pass-q8",
              type: "fill-blank",
              difficulty: "easy",
              question: "A ___ manager is the most secure way to store and generate unique passwords for all your accounts.",
              correctAnswer: "password",
              acceptedAnswers: ["password", "Password"],
              explanation: "Password managers like 1Password, Bitwarden, or LastPass securely encrypt and store all your passwords, allowing you to use unique, complex passwords for every account without having to remember them all.",
              points: 10,
              tags: ["password-managers", "tools"]
            },
            {
              id: "pass-q9",
              type: "mcq",
              difficulty: "medium",
              question: "You receive an email claiming your password will expire in 24 hours and you need to click a link to reset it. What should you do?",
              options: [
                "Click the link immediately to avoid account lockout",
                "Reply to the email asking if it's legitimate",
                "Go directly to the website by typing the URL and check your account settings",
                "Forward the email to friends to warn them"
              ],
              correctAnswer: 2,
              explanation: "This is likely a phishing attempt. Most services don't expire passwords automatically, and legitimate services won't send urgent reset links. Always navigate directly to the official website by typing the URL yourself, never click links in unexpected emails.",
              points: 10,
              tags: ["phishing", "password-reset"]
            },
            {
              id: "pass-q10",
              type: "mcq",
              difficulty: "hard",
              question: "Your friend asks to borrow your Netflix password. You trust them completely. What's the BEST response?",
              options: [
                "Give them your password since you trust them",
                "Create a separate profile for them on your account",
                "Suggest they get their own subscription or use a family plan",
                "Give them your password but ask them to change it back after"
              ],
              correctAnswer: 2,
              explanation: "Never share passwords, even with trusted friends. Sharing violates terms of service, creates security risks (they might write it down, use it on other sites, or their device might be compromised), and you lose control over who accesses your account. Many services offer family plans or separate profiles as legitimate sharing options.",
              points: 15,
              tags: ["password-sharing", "best-practices"]
            }
          ]
        }
      },
      {
        id: "job-scam",
        title: "Job Scam Detection",
        description: "Recognize fraudulent employment offers and protect career search activities from exploitation",
        category: "Job Scams",
        difficulty: "Easy",
        xp: 15,
        premium: false,
        estimatedMinutes: 30,
        completionRate: 81,
        rating: 4.6,
        lessonsCount: 6,
        quizzesCount: 1,
        skillsGained: ["Scam Recognition", "Offer Verification", "Red Flag Detection", "Incident Reporting"],
        practicalOutcome: "Distinguish legitimate job offers from scams and protect personal information during job searches",
        lessons: [
          {
            id: "job-scam-1",
            title: "The Job Scam Epidemic",
            type: "text",
            duration: 3,
            content: "Job scams have exploded in recent years, targeting vulnerable job seekers during economic uncertainty and the rise of remote work. Scammers post convincing fake job listings on legitimate platforms like LinkedIn, Indeed, and Glassdoor, then exploit the job search process to steal money or personal information. They impersonate real, trusted companies—using official logos, copying website designs, and creating fake email addresses that look nearly identical to legitimate ones. The scam typically unfolds in stages: first contact seems professional, interviews happen through text or messaging apps (never video), then they request payment for 'training materials,' 'background checks,' or 'equipment.' By the time victims realize it's a scam, they've lost an average of $3,000-$5,000 and potentially had their identity stolen. The emotional toll is devastating—victims feel embarrassed, violated, and lose trust in legitimate job opportunities. Job scams are particularly insidious because they prey on people who are already financially stressed and desperate for employment.",
            keyPoints: [
              "Job scams have increased dramatically with remote work acceptance",
              "Scammers impersonate real companies on legitimate job boards",
              "Average victim loses $3,000-$5,000 plus potential identity theft",
              "Scams exploit vulnerable job seekers during financial stress"
            ],
            visualAid: {
              type: "comparison",
              title: "Legitimate vs Scam Job Posting",
              data: {
                safe: "Legitimate: Posted on company's official careers page, detailed job description, company domain email, multi-stage interview process, no upfront fees",
                unsafe: "Scam: Only on job boards (not company site), vague description, personal email, instant hire via text, requests payment for 'training'",
                safeLabel: "Real Job Posting",
                unsafeLabel: "Scam Job Posting"
              }
            },
            checkpointQuiz: {
              question: "What is the BIGGEST red flag that a job posting might be a scam?",
              options: [
                "The job is remote",
                "They request payment for training materials or background checks",
                "The salary is competitive",
                "They want to schedule an interview quickly"
              ],
              correctAnswer: 1,
              explanation: "Legitimate companies NEVER ask candidates to pay for anything upfront. Any request for payment—whether for training, equipment, background checks, or certifications—is an immediate red flag that the job is a scam."
            }
          },
          {
            id: "job-scam-2",
            title: "Red Flags in Job Postings",
            type: "text",
            duration: 3,
            content: "Learning to spot red flags can save you thousands of dollars and protect your identity. Legitimate companies never ask for payment upfront—period. Watch for poor grammar and spelling errors in job postings (real companies have professional editors), salaries that are unusually high for the position or experience level (if it seems too good to be true, it is), vague job descriptions that don't specify actual responsibilities, job titles that don't match the description, communication exclusively through personal email addresses (@gmail.com, @yahoo.com) instead of company domains, interviews conducted only through text messages or messaging apps (never video or phone), requests for personal banking information before you've even interviewed, and promises of easy money for minimal work. Real recruiters have verifiable LinkedIn profiles with extensive networks and employment history. Legitimate job postings appear on the company's official careers page, not just on job boards. Professional interviews progress through multiple stages—phone screen, video interview, in-person or final video interview—and involve multiple people from the company.",
            keyPoints: [
              "Legitimate companies never request upfront payment for any reason",
              "Poor grammar, vague descriptions, and unrealistic salaries are major red flags",
              "Real recruiters use company email domains and have verifiable LinkedIn profiles",
              "Professional interviews involve multiple stages and video/phone calls"
            ],
            visualAid: {
              type: "checklist",
              title: "Job Scam Red Flags Checklist",
              data: {
                items: [
                  "Requests payment for training, equipment, or background checks",
                  "Salary is unrealistically high for the position/experience",
                  "Poor grammar and spelling errors in job posting",
                  "Communication only through personal email (Gmail, Yahoo)",
                  "Interview conducted entirely through text/messaging apps",
                  "Vague job description without specific responsibilities",
                  "Instant job offer without proper interview process",
                  "Requests SSN or banking info before formal job offer"
                ]
              }
            },
            checkpointQuiz: {
              question: "You receive a job offer via text message after a brief chat. They want to hire you immediately but need $200 for 'training materials.' What should you do?",
              options: [
                "Pay the fee since it's a small investment in your career",
                "Ask if you can pay after your first paycheck",
                "Immediately stop communication—this is definitely a scam",
                "Request a video call to discuss the fee"
              ],
              correctAnswer: 2,
              explanation: "This is a classic job scam. Legitimate companies never ask for payment upfront, interviews aren't conducted via text, and real hiring processes involve multiple stages. Stop all communication immediately and report the scam."
            }
          },
          {
            id: "job-scam-3",
            title: "Protecting Yourself During Job Search",
            type: "text",
            duration: 4,
            content: "Proactive protection is your best defense against job scams. Before applying to any position, research the company thoroughly—visit their official website (type the URL directly, don't click links from emails), check their official careers portal to verify the job posting exists there, and Google the company name with 'scam' or 'reviews' to see if others have reported issues. Be extremely cautious with unsolicited job offers, especially those that come via email, text, or social media messages. Legitimate recruiters will provide verifiable contact information and won't pressure you to act immediately. Never share sensitive information like your Social Security Number, bank account details, passport information, or copies of your driver's license before having a real interview and receiving a formal, written job offer on company letterhead. Use video interviews whenever possible to verify the person is real and matches their LinkedIn profile. If something feels off, ask to speak with HR directly using the company's main phone number from their official website—not a number provided in the suspicious email. Trust your instincts: if a job offer seems too good to be true or the process feels rushed and unprofessional, walk away.",
            keyPoints: [
              "Research companies on their official website before applying",
              "Verify job postings exist on the company's official careers portal",
              "Never share SSN, bank details, or passport before a formal written offer",
              "Use video interviews to verify recruiters and trust your instincts"
            ],
            visualAid: {
              type: "checklist",
              title: "Job Search Protection Checklist",
              data: {
                items: [
                  "Research company on official website (type URL directly)",
                  "Verify job posting on company's official careers page",
                  "Google 'company name + scam' to check for reports",
                  "Verify recruiter's LinkedIn profile is real and active",
                  "Request video interviews to verify identity",
                  "Never share SSN or banking info before written offer",
                  "Contact HR using phone number from official website",
                  "Trust your instincts—if it feels off, walk away"
                ]
              }
            },
            checkpointQuiz: {
              question: "A recruiter emails you about a great opportunity. What should you do FIRST?",
              options: [
                "Reply with your resume immediately",
                "Click the link in their email to learn more",
                "Go directly to the company's official website to verify the job and recruiter",
                "Share your LinkedIn profile with them"
              ],
              correctAnswer: 2,
              explanation: "Always verify independently before engaging. Go to the company's official website (type the URL yourself), check their careers page for the job posting, and verify the recruiter's identity through official channels. Never click links in unsolicited emails."
            }
          },
          {
            id: "job-scam-4",
            title: "Work-from-Home Job Scams",
            type: "text",
            duration: 3,
            content: "The explosion of remote work has created a perfect storm for work-from-home job scams. These scams are particularly effective because remote positions are now mainstream and accepted, making them harder to verify without in-person interaction. Common work-from-home scams include mystery shopper jobs that require you to pay upfront fees for 'certification' or 'training,' data entry positions that charge for software or access to job databases, multi-level marketing (MLM) schemes disguised as legitimate employment, envelope stuffing scams promising easy money, and reshipping jobs where you unknowingly receive and forward stolen goods, making you an accomplice to crime. The pattern is consistent: scammers promise high pay for minimal work, request upfront payment, and provide vague job descriptions. Legitimate work-from-home companies operate exactly like traditional employers: they don't charge fees, they conduct thorough interviews (usually video), they provide detailed job descriptions with specific responsibilities, they have verifiable company websites and professional online presence, and they pay you through standard banking systems. If a work-from-home job seems too easy or too lucrative for the effort required, it's almost certainly a scam.",
            keyPoints: [
              "Legitimate work-from-home jobs never require upfront payment",
              "Real remote employers conduct video interviews and have detailed job descriptions",
              "Beware of jobs promising unrealistic pay for minimal work",
              "Reshipping jobs can make you an accomplice to crime"
            ],
            visualAid: {
              type: "comparison",
              title: "Legitimate vs Scam Work-from-Home Job",
              data: {
                safe: "Legitimate WFH: No upfront fees, video interviews, detailed responsibilities, standard pay for industry, company website and reviews, direct deposit payment",
                unsafe: "Scam WFH: Requires payment for 'training/software', text-only interviews, vague 'data entry' description, $5,000/month for 5 hours/week, no verifiable company info",
                safeLabel: "Real Remote Job",
                unsafeLabel: "Work-from-Home Scam"
              }
            },
            checkpointQuiz: {
              question: "A work-from-home job promises $4,000/month for 10 hours/week of 'simple data entry.' They need $150 for software. What's the issue?",
              options: [
                "The software fee is too high",
                "The pay is unrealistically high for the work, and legitimate jobs don't charge fees",
                "Data entry jobs don't exist anymore",
                "10 hours per week is too few"
              ],
              correctAnswer: 1,
              explanation: "This is a classic scam. The pay is unrealistically high for basic data entry, and legitimate employers never charge for software or training. The combination of 'too good to be true' pay and upfront fees is a major red flag."
            }
          },
          {
            id: "job-scam-5",
            title: "Cryptocurrency Payment Scams in Jobs",
            type: "text",
            duration: 3,
            content: "Cryptocurrency has become a favorite tool for job scammers because transactions are nearly impossible to reverse or trace. The scam typically works like this: after 'hiring' you, the scammer claims you need to pay for equipment, uniforms, background checks, training materials, or software licenses via Bitcoin, Ethereum, or other cryptocurrency. They might also ask you to 'test' their payment system by sending cryptocurrency that they promise to reimburse. Once you send cryptocurrency, it's gone forever—there's no bank to call, no chargeback option, no way to recover your money. Some sophisticated scams involve 'overpayment' schemes where they send you a fake check for more than your 'salary,' ask you to deposit it and send the excess back via cryptocurrency, then the check bounces and you've lost your own money. Legitimate employers operate through established financial systems: direct deposit to your bank account, paper checks on company accounts, or established payroll services like ADP or Paychex. No real employer will ever ask you to pay them in cryptocurrency, accept payment in cryptocurrency before employment, or 'test' payment systems with your own money. If cryptocurrency is mentioned at any point before you've started working and received legitimate paychecks, immediately stop all communication.",
            keyPoints: [
              "Legitimate employers never request cryptocurrency payments from candidates",
              "Crypto transactions are irreversible—once sent, money is gone forever",
              "Real employers use direct deposit, checks, or established payroll services",
              "'Testing payment systems' with your money is always a scam"
            ],
            visualAid: {
              type: "comparison",
              title: "Legitimate vs Crypto Scam Payment",
              data: {
                safe: "Legitimate: Direct deposit to your bank, paper check from company account, established payroll service (ADP, Paychex), payment AFTER work is performed",
                unsafe: "Scam: Requests Bitcoin/crypto payment for 'equipment', asks you to 'test' payment system with your money, overpayment check scam, payment BEFORE employment starts",
                safeLabel: "Real Employer Payment",
                unsafeLabel: "Cryptocurrency Scam"
              }
            },
            checkpointQuiz: {
              question: "Your new 'employer' sends you a check for $3,000 and asks you to buy equipment with $500 and send the remaining $2,500 back via Bitcoin. What should you do?",
              options: [
                "Follow their instructions since they sent you money first",
                "Wait for the check to clear before sending Bitcoin",
                "Immediately stop communication—this is a classic overpayment scam",
                "Ask if you can send the money via wire transfer instead"
              ],
              correctAnswer: 2,
              explanation: "This is a classic overpayment scam. The check is fake and will bounce after you've sent the Bitcoin. You'll lose your own $2,500 with no way to recover it. Legitimate employers never send overpayments or request cryptocurrency."
            }
          },
          {
            id: "job-scam-6",
            title: "What to Do If You Realize It's a Scam",
            type: "text",
            duration: 4,
            content: "Discovering you've been targeted by a job scam is devastating, but immediate action can minimize damage and potentially help others. First, stop all communication with the scammer immediately—don't respond to emails, texts, or calls, and block them on all platforms. Document everything: take screenshots of all communications, job postings, emails, text messages, and any websites involved. This documentation is crucial for law enforcement and may help recover funds. If you've sent money via bank transfer or wire, contact your bank immediately—within the first 24-48 hours, they may be able to stop or reverse the transaction. If you sent cryptocurrency, report it to the cryptocurrency exchange, though recovery is unlikely. If you provided personal information like your SSN, driver's license, or bank account numbers, place a fraud alert on your credit reports through Equifax, Experian, and TransUnion, and monitor your credit closely for unauthorized accounts. Report the scam to multiple authorities: the FTC at reportfraud.ftc.gov, the FBI's Internet Crime Complaint Center (IC3) at ic3.gov, your state attorney general's office, and the job board where you found the posting. File a police report for documentation, even if they can't immediately help. Finally, warn others by reporting the scam on job boards, posting reviews on sites like Glassdoor, and alerting friends and family to watch for similar scams.",
            keyPoints: [
              "Stop all communication immediately and document everything with screenshots",
              "Contact your bank within 24-48 hours if you sent money",
              "Place fraud alerts on credit reports if you shared personal information",
              "Report to FTC, FBI IC3, state attorney general, and the job board"
            ],
            visualAid: {
              type: "checklist",
              title: "Job Scam Recovery Checklist",
              data: {
                items: [
                  "Stop all communication and block the scammer immediately",
                  "Take screenshots of all communications and job postings",
                  "Contact bank immediately if you sent money (within 24-48 hours)",
                  "Report to cryptocurrency exchange if you sent crypto",
                  "Place fraud alert on credit reports (Equifax, Experian, TransUnion)",
                  "Report to FTC at reportfraud.ftc.gov",
                  "Report to FBI IC3 at ic3.gov",
                  "File police report for documentation",
                  "Report scam to job board where you found the posting",
                  "Warn friends, family, and post reviews to help others"
                ]
              }
            },
            checkpointQuiz: {
              question: "You realize the job offer was a scam after sending $500 via bank transfer yesterday. What should you do FIRST?",
              options: [
                "Post about it on social media to warn others",
                "Contact your bank immediately to try to stop the transfer",
                "Report it to the FBI",
                "Confront the scammer via email"
              ],
              correctAnswer: 1,
              explanation: "Time is critical with bank transfers. Contact your bank immediately—within 24-48 hours, they may be able to stop or reverse the transaction. After that, document everything and report to authorities, but the bank should be your first call."
            }
          }
        ],
        quiz: {
          id: "job-scam-quiz",
          title: "Job Scam Detection Mastery Quiz",
          description: "Test your ability to identify fraudulent job offers and protect yourself during job searches",
          passingScore: 70,
          shuffleConfig: {
            questions: true,
            options: true,
            limit: null
          },
          questions: [
            {
              id: "job-q1",
              type: "mcq",
              difficulty: "easy",
              question: "Which of these is the BIGGEST red flag that a job offer is a scam?",
              options: [
                "The job is remote and offers flexible hours",
                "The company asks you to pay for training materials or background checks",
                "The salary is competitive for the industry",
                "They want to schedule an interview within a week"
              ],
              correctAnswer: 1,
              explanation: "Legitimate companies NEVER ask candidates to pay for anything upfront. Any request for payment—whether for training, equipment, background checks, or certifications—is an immediate red flag that the job is a scam. Real employers cover all job-related costs.",
              points: 10,
              tags: ["payment-scams", "red-flags"]
            },
            {
              id: "job-q2",
              type: "mcq",
              difficulty: "medium",
              question: "You find a job posting on LinkedIn for a 'Customer Service Representative' with a salary of $85,000/year for entry-level work. The posting has some grammar errors. What should you do FIRST?",
              options: [
                "Apply immediately before the position fills up",
                "Research the company on their official website and verify the posting exists there",
                "Email the recruiter asking about the high salary",
                "Share the posting with friends so they can apply too"
              ],
              correctAnswer: 1,
              explanation: "Unrealistically high salaries combined with grammar errors are major red flags. Always verify job postings on the company's official careers page. Legitimate postings will appear there, not just on job boards. If you can't find it on their official site, it's likely a scam.",
              points: 10,
              tags: ["verification", "salary-red-flags"]
            },
            {
              id: "job-q3",
              type: "mcq",
              difficulty: "hard",
              question: "A recruiter from 'Amazon' contacts you via text message, conducts the entire interview through WhatsApp, and offers you a job within 2 hours. They use an @gmail.com email address. What's the STRONGEST indicator this is a scam?",
              options: [
                "The quick hiring process",
                "Using text message and WhatsApp instead of professional platforms",
                "The recruiter uses a personal email (@gmail.com) instead of @amazon.com",
                "All of the above are equally strong indicators"
              ],
              correctAnswer: 3,
              explanation: "All three are major red flags that work together to confirm this is a scam. Real Amazon recruiters use @amazon.com emails, conduct interviews via phone/video on professional platforms, and follow a multi-stage interview process that takes days or weeks. Any one of these alone is suspicious; all three together confirms it's definitely a scam.",
              points: 15,
              tags: ["impersonation", "communication-red-flags"]
            },
            {
              id: "job-q4",
              type: "mcq",
              difficulty: "medium",
              question: "Your new 'employer' sends you a check for $3,000 and asks you to buy equipment with $500 and send the remaining $2,500 back via Bitcoin. What should you do?",
              options: [
                "Follow their instructions since they sent you money first",
                "Wait for the check to fully clear (10-14 days) before sending Bitcoin",
                "Immediately stop communication—this is a classic overpayment scam",
                "Ask if you can send the money via wire transfer instead"
              ],
              correctAnswer: 2,
              explanation: "This is a classic overpayment scam. The check is fake and will bounce after you've sent the Bitcoin (which is irreversible). You'll lose your own $2,500 with no way to recover it. Legitimate employers never send overpayments, never ask for money back, and never request cryptocurrency payments.",
              points: 10,
              tags: ["overpayment-scam", "cryptocurrency"]
            },
            {
              id: "job-q5",
              type: "true-false",
              difficulty: "easy",
              question: "If a job posting appears on LinkedIn or Indeed, it must be legitimate because these platforms verify all postings.",
              options: ["True", "False"],
              correctAnswer: 1,
              explanation: "FALSE. While LinkedIn and Indeed are legitimate platforms, they cannot verify every single job posting. Scammers regularly post fake jobs on these sites. Always verify postings by checking the company's official careers page and researching the recruiter's profile.",
              points: 10,
              tags: ["misconceptions", "job-boards"]
            },
            {
              id: "job-q6",
              type: "mcq",
              difficulty: "hard",
              question: "You realize the job offer was a scam after sending $500 via bank transfer yesterday (18 hours ago). What should you do FIRST?",
              options: [
                "Post about it on social media to warn others",
                "Contact your bank immediately to try to stop or reverse the transfer",
                "Report it to the FBI Internet Crime Complaint Center",
                "Confront the scammer via email to demand your money back"
              ],
              correctAnswer: 1,
              explanation: "Time is absolutely critical with bank transfers. Contact your bank immediately—within 24-48 hours, they may be able to stop or reverse the transaction. After 18 hours, you still have a chance. After securing your finances, document everything and report to authorities, but the bank should be your first call.",
              points: 15,
              tags: ["incident-response", "recovery"]
            },
            {
              id: "job-q7",
              type: "fill-blank",
              difficulty: "medium",
              question: "Legitimate employers will never ask you to pay for ___, equipment, or background checks upfront.",
              correctAnswer: "training",
              acceptedAnswers: ["training", "Training", "training materials"],
              explanation: "Real employers cover all costs associated with hiring and training. Any request for upfront payment is a scam, whether it's for training, equipment, background checks, certifications, or software licenses.",
              points: 10,
              tags: ["payment-scams", "training-scams"]
            },
            {
              id: "job-q8",
              type: "mcq",
              difficulty: "medium",
              question: "How can you verify if a recruiter claiming to work for a company is legitimate?",
              options: [
                "Check if their email address uses the company's official domain",
                "Look up their LinkedIn profile to see if they have connections and employment history",
                "Call the company's HR department using a number from their official website",
                "All of the above"
              ],
              correctAnswer: 3,
              explanation: "Use multiple verification methods. Real recruiters use company email domains (@company.com), have established LinkedIn profiles with verifiable employment history and connections, and can be confirmed by calling the company's HR department directly. If any of these checks fail, it's likely a scam.",
              points: 10,
              tags: ["verification", "recruiter-verification"]
            }
          ]
        }
      },
      {
        id: "social-media-safety",
        title: "Social Media Security Essentials",
        description: "Understand privacy risks on social platforms and develop secure sharing practices",
        category: "Social Media",
        difficulty: "Easy",
        xp: 12,
        premium: false,
        estimatedMinutes: 25,
        completionRate: 89,
        rating: 4.7,
        lessonsCount: 5,
        quizzesCount: 1,
        skillsGained: ["Privacy Management", "Secure Sharing", "Account Protection", "Social Engineering Defense"],
        practicalOutcome: "Configure privacy settings across major platforms and identify social engineering attempts",
        lessons: [
          {
            id: "social-media-1",
            title: "Understanding Social Media Privacy Risks",
            type: "text",
            duration: 3,
            content: "Social media platforms are data goldmines for scammers, identity thieves, and malicious actors. Every post, like, comment, check-in, and shared location contributes to a detailed digital profile that can be weaponized against you. Attackers use this information for targeted phishing (referencing your interests and connections), social engineering (impersonating friends or family), stalking, identity theft, and even physical burglary (knowing when you're on vacation). Even seemingly harmless details like your pet's name, mother's maiden name, or favorite sports team are commonly used as passwords or security question answers. Privacy settings on social platforms change frequently—often without clear notification—and default settings almost always favor data collection over user privacy. What you share today can be used against you years later: employers routinely check social media during hiring, and offensive or unprofessional content can cost you opportunities. The fundamental rule: assume anything posted online is permanent, public, and can be found by anyone, regardless of your privacy settings.",
            keyPoints: [
              "Every post creates a digital profile that can be exploited by attackers",
              "Harmless details (pet names, birthdates) are used to crack passwords and security questions",
              "Privacy settings change frequently and default to data collection",
              "Assume all posts are permanent and public, regardless of settings"
            ],
            visualAid: {
              type: "checklist",
              title: "Information Attackers Harvest from Social Media",
              data: {
                items: [
                  "Birthdates, addresses, phone numbers for identity theft",
                  "Pet names, favorite places for password guessing",
                  "Vacation posts to know when your home is empty",
                  "Work information for targeted phishing emails",
                  "Family/friend connections for social engineering",
                  "Location data revealing daily routines",
                  "Photos with sensitive info in background (documents, badges)"
                ]
              }
            },
            checkpointQuiz: {
              question: "Why is posting about your vacation in real-time dangerous?",
              options: [
                "It makes your friends jealous",
                "It signals to criminals that your home is empty and vulnerable",
                "It uses too much data",
                "It violates platform terms of service"
              ],
              correctAnswer: 1,
              explanation: "Real-time vacation posts tell criminals exactly when your home is empty, making it a prime target for burglary. Always share vacation photos after you return home, never while you're away."
            }
          },
          {
            id: "social-media-2",
            title: "Configuring Strong Privacy Settings",
            type: "text",
            duration: 4,
            content: "Privacy settings are your first line of defense, but they require active management because platforms frequently change them without clear notification. Immediately after creating any social media account, review and tighten privacy settings. Set your profile to private or friends-only, limiting who can see your posts, photos, personal information, and friend list. Disable location sharing in both posts and profile settings—location data reveals your routines, home address, and when you're away. Turn off facial recognition features that automatically tag you in photos, giving you control over where your face appears. Restrict who can send friend requests and messages to prevent spam and scam accounts from contacting you. Review third-party app permissions that access your social accounts (games, quizzes, login services) and revoke access for apps you no longer use—these apps often harvest your data. Enable two-factor authentication on all social accounts to prevent unauthorized access even if your password is compromised. Quarterly, audit your friend list and remove unknown, suspicious, or inactive accounts. Remember: privacy settings are not foolproof—anything you post can be screenshot, shared, or leaked.",
            keyPoints: [
              "Set profiles to private/friends-only and disable location sharing",
              "Turn off facial recognition and control who can tag you",
              "Review and revoke third-party app permissions quarterly",
              "Enable 2FA and audit friend lists regularly"
            ],
            visualAid: {
              type: "checklist",
              title: "Essential Privacy Settings Checklist",
              data: {
                items: [
                  "Set profile to Private or Friends-Only",
                  "Disable location sharing on posts and in profile",
                  "Turn off facial recognition auto-tagging",
                  "Require approval for photo tags before they appear",
                  "Limit who can look you up via email/phone number",
                  "Restrict who can send friend requests and messages",
                  "Review and revoke third-party app permissions",
                  "Enable two-factor authentication",
                  "Hide friend list from public view"
                ]
              }
            },
            checkpointQuiz: {
              question: "How often should you review your social media privacy settings?",
              options: [
                "Once when you create the account",
                "Only when you hear about a data breach",
                "Quarterly (every 3 months) as platforms update settings frequently",
                "Never, the default settings are fine"
              ],
              correctAnswer: 2,
              explanation: "Platforms frequently change privacy settings without clear notification, often defaulting to less private options. Review your settings quarterly to ensure they still protect your information as you intend."
            }
          },
          {
            id: "social-media-3",
            title: "Safe Sharing Practices",
            type: "text",
            duration: 3,
            content: "Before posting anything, pause and ask critical questions: Could this information be used against me? Would I want my employer, a stranger, or a criminal to see this? Would I shout this in a crowded public space? Never share full birthdates (month and day without year is safer), home addresses, phone numbers, or real-time locations. Don't announce vacations or long absences that signal an empty home—share vacation photos after you return. Be extremely cautious with photos: check backgrounds for sensitive information like documents, credit cards, passports, work badges, or home addresses visible on mail. Understand that 'friends-only' posts offer limited protection—friends can screenshot and share your content, and their accounts can be hacked. Never share login credentials, passwords, security question answers, or financial information. Think carefully before tagging others in posts or locations—you might compromise their privacy or safety. Remove metadata from photos before posting, as it often contains precise GPS coordinates of where the photo was taken. Teach children safe sharing practices and monitor what they post about themselves and your family.",
            keyPoints: [
              "Never share full birthdates, addresses, phone numbers, or real-time locations",
              "Announce vacations after returning, not before or during",
              "Check photo backgrounds for sensitive information before posting",
              "Remember 'friends-only' posts can still be screenshot and shared"
            ],
            visualAid: {
              type: "comparison",
              title: "Safe vs Unsafe Sharing",
              data: {
                unsafe: "Unsafe: 'Leaving for 2-week Europe trip tomorrow! House will be empty!' with home address visible in photo background, full birthdate in bio",
                safe: "Safe: 'Just returned from amazing Europe trip!' posted after returning, no address visible, birthdate shows only month/day",
                unsafeLabel: "Dangerous Oversharing",
                safeLabel: "Safe Sharing"
              }
            },
            checkpointQuiz: {
              question: "When is the BEST time to post vacation photos on social media?",
              options: [
                "Before you leave to build excitement",
                "During the vacation in real-time",
                "After you return home",
                "Never post vacation photos"
              ],
              correctAnswer: 2,
              explanation: "Always post vacation photos after you return home. Posting before or during your trip signals to criminals that your home is empty and vulnerable to burglary. Share memories safely by waiting until you're back."
            }
          },
          {
            id: "social-media-4",
            title: "Recognizing Social Media Scams",
            type: "text",
            duration: 4,
            content: "Social media scams have become increasingly sophisticated and personalized, exploiting the trust inherent in social connections. Common scam types include cloned account friend requests (scammers copy a friend's profile and send you a duplicate request to gain access), romance scams using attractive fake profiles to build relationships before requesting money, investment scams promising guaranteed returns or insider trading tips, giveaway scams requiring personal information or 'small fees' to claim prizes, charity scams exploiting current events and disasters, and fake job offers that harvest personal data. Messenger scams are particularly effective: scammers hack or impersonate friends, then message you requesting urgent money transfers or gift cards ('I'm stranded, need $500 immediately!'). They create artificial urgency to prevent you from verifying the request. Phishing links disguised as quizzes ('Which Disney character are you?'), shocking videos, or breaking news steal login credentials when clicked. Cryptocurrency scams promise investment opportunities or giveaways from celebrities. The pattern is consistent: too-good-to-be-true offers, urgency, requests for money or personal information, and pressure to act without thinking.",
            keyPoints: [
              "Cloned accounts and hacked friend accounts request money via messenger",
              "Romance, investment, and giveaway scams exploit trust and greed",
              "Phishing links disguised as quizzes or videos steal login credentials",
              "Scammers create urgency to prevent verification"
            ],
            visualAid: {
              type: "checklist",
              title: "Social Media Scam Red Flags",
              data: {
                items: [
                  "Friend request from someone already on your friend list (cloned account)",
                  "Urgent money requests via messenger from 'friends'",
                  "Too-good-to-be-true investment or income opportunities",
                  "Giveaways requiring payment or sensitive personal information",
                  "Romantic interest that quickly professes love and needs money",
                  "Links to quizzes, videos, or articles that require login",
                  "Celebrity cryptocurrency giveaways or investment tips",
                  "Charity requests without verifiable organization details"
                ]
              }
            },
            checkpointQuiz: {
              question: "A friend messages you on Facebook saying they're stranded and need $300 urgently. What should you do FIRST?",
              options: [
                "Send the money immediately to help your friend",
                "Call your friend on their phone number to verify it's really them",
                "Ask them security questions via messenger",
                "Ignore the message"
              ],
              correctAnswer: 1,
              explanation: "Always verify urgent money requests through a different channel. Call your friend's actual phone number (not a number they provide in the message) to confirm. Their account may be hacked, or it could be a cloned account scam."
            }
          },
          {
            id: "social-media-5",
            title: "Protecting Your Digital Reputation",
            type: "text",
            duration: 3,
            content: "Your social media presence creates a permanent digital footprint that profoundly impacts your professional opportunities, personal relationships, and physical safety. Employers routinely check social media during hiring processes—studies show 70% of employers screen candidates on social media, and 54% have rejected candidates based on what they found. Offensive, discriminatory, unprofessional, or illegal content can cost you job opportunities years after posting. Even deleted posts may exist in archives, screenshots, or cached versions. Conduct regular digital audits: Google yourself to see what others find, review posts from years ago and delete problematic content, untag yourself from unflattering or inappropriate photos, and remove content you wouldn't want a future employer, romantic partner, or family member to see. Use privacy settings strategically, but remember that nothing online is truly private—assume everything can eventually become public. Consider maintaining separate accounts: professional networking on LinkedIn, personal connections on Facebook/Instagram, and anonymous accounts for sensitive topics. Think long-term before posting: 'Would I want my children to see this? My boss? A future employer? A judge?'",
            keyPoints: [
              "70% of employers screen social media; 54% reject candidates based on findings",
              "Deleted posts may still exist in archives, screenshots, or caches",
              "Conduct quarterly digital audits: Google yourself and review old posts",
              "Use separate accounts for professional and personal content"
            ],
            visualAid: {
              type: "checklist",
              title: "Digital Reputation Protection Checklist",
              data: {
                items: [
                  "Google yourself quarterly to see what others find",
                  "Review and delete posts from 5+ years ago",
                  "Untag yourself from inappropriate or unflattering photos",
                  "Set tag approval so you control what appears on your profile",
                  "Remove offensive, discriminatory, or unprofessional content",
                  "Use LinkedIn for professional networking only",
                  "Before posting, ask: 'Would I want my boss to see this?'",
                  "Consider using separate accounts for professional vs personal"
                ]
              }
            },
            checkpointQuiz: {
              question: "What percentage of employers check social media when screening job candidates?",
              options: [
                "About 10%",
                "About 30%",
                "About 70%",
                "Employers aren't allowed to check social media"
              ],
              correctAnswer: 2,
              explanation: "Studies show approximately 70% of employers screen candidates on social media, and 54% have rejected candidates based on their findings. Your social media presence directly impacts your professional opportunities."
            }
          }
        ],
        quiz: {
          id: "social-media-safety-quiz",
          title: "Social Media Security Mastery Quiz",
          description: "Test your understanding of privacy, safety, and security on social platforms",
          passingScore: 70,
          shuffleConfig: {
            questions: true,
            options: true,
            limit: null
          },
          questions: [
            {
              id: "social-q1",
              type: "mcq",
              difficulty: "easy",
              question: "What is the main risk of sharing your real-time location on social media while on vacation?",
              options: [
                "It uses too much mobile data",
                "It reveals when you're away from home, making you a target for burglary",
                "It drains your phone battery faster",
                "It has no significant risks"
              ],
              correctAnswer: 1,
              explanation: "Sharing real-time location data, especially during vacations, broadcasts that your home is empty. Burglars actively monitor social media for such posts. Share vacation photos AFTER you return home, never in real-time.",
              points: 10,
              tags: ["location-privacy", "physical-security"]
            },
            {
              id: "social-q2",
              type: "mcq",
              difficulty: "medium",
              question: "You receive a Facebook message from your friend asking to borrow $200 urgently via Venmo. Their message seems slightly off. What should you do FIRST?",
              options: [
                "Send the money immediately since they're your friend",
                "Call your friend directly using a phone number you already have to verify the request",
                "Reply to the message asking for more details",
                "Ignore the message completely"
              ],
              correctAnswer: 1,
              explanation: "Always verify urgent money requests through a different communication channel (phone call, in-person). Accounts are frequently hacked, and scammers impersonate friends to request money. If the message seems 'off,' trust your instincts—it's likely a compromised account.",
              points: 10,
              tags: ["account-compromise", "verification"]
            },
            {
              id: "social-q3",
              type: "mcq",
              difficulty: "hard",
              question: "You receive a friend request from someone who appears to already be your friend, with the same profile picture and name. What's the MOST LIKELY explanation?",
              options: [
                "They created a second personal account",
                "Their account has been cloned by a scammer to target their friends",
                "It's a technical glitch in the platform",
                "They forgot they were already friends with you"
              ],
              correctAnswer: 1,
              explanation: "This is classic account cloning. Scammers copy someone's profile (photos, name, info) to create a duplicate account, then friend their contacts to request money or personal information. Always verify with the original friend before accepting, and report the fake account immediately.",
              points: 15,
              tags: ["account-cloning", "impersonation"]
            },
            {
              id: "social-q4",
              type: "mcq",
              difficulty: "medium",
              question: "What information should you NEVER share publicly on social media?",
              options: [
                "Your general city of residence (e.g., 'Los Angeles')",
                "Your job title and industry",
                "Full birthdate, home address, and phone number",
                "Your hobbies and interests"
              ],
              correctAnswer: 2,
              explanation: "Full birthdates, addresses, and phone numbers are identity theft goldmines. They can be used for account takeovers, social engineering, SIM swapping, and physical crimes. General location (city), job title, and hobbies are usually safe if you're careful, but never share precise personal identifiers.",
              points: 10,
              tags: ["personal-information", "privacy"]
            },
            {
              id: "social-q5",
              type: "true-false",
              difficulty: "easy",
              question: "Once you set your social media privacy settings, you never need to review them again.",
              correctAnswer: 1,
              explanation: "FALSE. Social media platforms frequently update their privacy policies and settings, often defaulting to more public sharing. Review your privacy settings quarterly (every 3 months) to ensure your information stays protected as you intend.",
              points: 10,
              tags: ["privacy-settings", "maintenance"]
            },
            {
              id: "social-q6",
              type: "mcq",
              difficulty: "medium",
              question: "Before posting a photo from your home office, what should you always check for in the background?",
              options: [
                "Good lighting and attractive decor",
                "Sensitive information like addresses on mail, credit cards, passwords on sticky notes, or documents",
                "Whether your face is visible",
                "The quality and resolution of the image"
              ],
              correctAnswer: 1,
              explanation: "Photos can inadvertently reveal sensitive information visible in the background: addresses on envelopes, credit cards on desks, passwords on sticky notes, confidential documents, or even reflections in mirrors/screens. Always scan the entire image before posting.",
              points: 10,
              tags: ["photo-security", "information-leakage"]
            },
            {
              id: "social-q7",
              type: "fill-blank",
              difficulty: "easy",
              question: "You should review your social media privacy settings at least once every ___ months.",
              correctAnswer: "3",
              acceptedAnswers: ["3", "three", "Three"],
              explanation: "Quarterly reviews (every 3 months) ensure your privacy settings stay current as platforms update their policies. Set a calendar reminder to make this a habit.",
              points: 10,
              tags: ["privacy-settings", "best-practices"]
            },
            {
              id: "social-q8",
              type: "mcq",
              difficulty: "hard",
              question: "A quiz on Facebook asks 'What was your first car?' and 'What street did you grow up on?' What's the REAL danger here?",
              options: [
                "The quiz is boring and wastes your time",
                "These are common security questions—answering publicly compromises account security",
                "The quiz might have spelling errors",
                "There's no danger, it's just a fun quiz"
              ],
              correctAnswer: 1,
              explanation: "These 'fun quizzes' are often data harvesting schemes. The questions match common security questions used by banks and email providers. By answering publicly, you're giving scammers the answers to reset your passwords and access your accounts. Never participate in quizzes asking for personal history.",
              points: 15,
              tags: ["social-engineering", "security-questions"]
            }
          ]
        }
      },
      {
        id: "online-shopping-security",
        title: "Online Shopping & Payment Security",
        description: "Develop secure online shopping habits and identify fraudulent e-commerce threats",
        category: "E-Commerce Security",
        difficulty: "Easy",
        xp: 10,
        premium: false,
        estimatedMinutes: 22,
        completionRate: 91,
        rating: 4.8,
        lessonsCount: 5,
        quizzesCount: 1,
        skillsGained: ["Secure Checkout", "Fraud Detection", "Payment Protection", "Vendor Verification"],
        practicalOutcome: "Safely conduct online transactions and identify fraudulent shopping websites",
        lessons: [
          {
            id: "online-shopping-1",
            title: "Identifying Legitimate Online Stores",
            type: "text",
            duration: 3,
            content: "Before entering payment information on any website, verify its legitimacy to avoid scams and fraud. Start by checking for HTTPS in the URL—the padlock icon in your browser address bar indicates the connection is encrypted, though this alone doesn't guarantee legitimacy. Research the company thoroughly: look for a physical address, phone number, and established social media presence with real engagement. Read reviews from multiple independent sources like Trustpilot, Better Business Bureau, and Google Reviews—not just testimonials on the website itself, which can be fabricated. Be extremely wary of prices significantly lower than competitors; if a deal seems too good to be true, it almost certainly is. Check the domain age using WHOIS lookup services—scam sites are often newly created (less than a year old). Look for trust seals from reputable organizations, but verify these seals are legitimate by clicking them to confirm they link to the actual certification. Examine the website for poor grammar, spelling errors, low-quality images, and generic stock photos—these are hallmarks of scam sites. Type URLs directly into your browser instead of clicking links from emails or ads, which may lead to convincing fake sites.",
            keyPoints: [
              "Check for HTTPS and padlock icon, but verify legitimacy beyond encryption",
              "Research company with physical address, phone, and independent reviews",
              "Beware of prices too good to be true and newly created domains",
              "Type URLs directly; don't click email links to shopping sites"
            ],
            visualAid: {
              type: "checklist",
              title: "Website Legitimacy Verification Checklist",
              data: {
                items: [
                  "HTTPS padlock icon in browser address bar",
                  "Physical address and phone number listed",
                  "Positive reviews on independent sites (Trustpilot, BBB)",
                  "Domain age over 1 year (check via WHOIS lookup)",
                  "Professional website without grammar/spelling errors",
                  "Verified trust seals that link to actual certifications",
                  "Prices comparable to competitors (not suspiciously low)",
                  "Active, established social media presence"
                ]
              }
            },
            checkpointQuiz: {
              question: "You find a website selling designer handbags at 80% off. The site has HTTPS but was created 2 months ago and has no reviews. Should you buy?",
              options: [
                "Yes, HTTPS means it's safe",
                "Yes, the discount is too good to miss",
                "No, the combination of extreme discount, new domain, and no reviews indicates a scam",
                "Yes, but use a debit card for protection"
              ],
              correctAnswer: 2,
              explanation: "This is almost certainly a scam. HTTPS only means the connection is encrypted, not that the site is legitimate. The extreme discount, newly created domain, and lack of reviews are major red flags. You'd likely lose your money and never receive the product."
            }
          },
          {
            id: "online-shopping-2",
            title: "Secure Payment Methods",
            type: "text",
            duration: 3,
            content: "Choosing the right payment method is critical for online shopping security and fraud protection. Credit cards offer the strongest consumer protection due to federal regulations and dispute resolution processes—if you're charged for items you didn't receive or for fraudulent purchases, you can dispute the charges and often get your money back. Virtual credit card numbers or single-use card numbers (offered by many banks and services like Privacy.com) add an extra security layer by generating temporary card numbers for each transaction, protecting your real card from being compromised. Payment services like PayPal provide buyer protection programs and keep your actual card details private from merchants. Digital wallets (Apple Pay, Google Pay, Samsung Pay) use tokenization, meaning they don't share your actual card number with merchants, adding security. Avoid wire transfers, cryptocurrency, money orders, or gift cards for online purchases—these payment methods offer zero buyer protection and are heavily favored by scammers because transactions are irreversible. Never save payment information on shopping sites unless absolutely necessary. Check your bank and credit card statements regularly for unauthorized charges, and enable transaction alerts for real-time monitoring.",
            keyPoints: [
              "Credit cards offer strongest fraud protection; avoid debit cards when possible",
              "Use virtual/single-use card numbers for added security",
              "PayPal and digital wallets protect your actual card details",
              "Never use wire transfers, crypto, or gift cards—no buyer protection"
            ],
            visualAid: {
              type: "comparison",
              title: "Secure vs Risky Payment Methods",
              data: {
                safe: "Secure: Credit cards (dispute protection), virtual card numbers, PayPal (buyer protection), digital wallets (Apple/Google Pay with tokenization)",
                unsafe: "Risky: Wire transfers (irreversible), cryptocurrency (untraceable), gift cards (scammer favorite), debit cards (direct bank access, limited protection)",
                safeLabel: "Protected Payment Methods",
                unsafeLabel: "High-Risk Payment Methods"
              }
            },
            checkpointQuiz: {
              question: "An online seller insists you pay via wire transfer or gift cards instead of the platform's payment system. What does this indicate?",
              options: [
                "They're trying to save on transaction fees",
                "This is a major red flag—almost certainly a scam",
                "It's a legitimate alternative payment method",
                "They prefer faster payment processing"
              ],
              correctAnswer: 1,
              explanation: "This is a massive red flag indicating a scam. Legitimate sellers use platform payment systems or standard methods. Wire transfers and gift cards offer no buyer protection and are irreversible, making them scammer favorites. Never proceed with such requests."
            }
          },
          {
            id: "online-shopping-3",
            title: "Recognizing Shopping Scams",
            type: "text",
            duration: 4,
            content: "Online shopping scams have become increasingly sophisticated, targeting unsuspecting buyers across all platforms. Common scam types include fake websites that mimic legitimate retailers with slightly altered URLs (amazon-deals.com instead of amazon.com), auction and marketplace scams where sellers take payment but never deliver products, counterfeit goods sold as authentic designer items, phishing emails claiming order or shipping issues to steal login credentials, non-delivery scams where payment is taken but items never arrive, and reshipping scams that recruit you to receive and forward packages (which are actually stolen goods, making you an unwitting accomplice). Warning signs are consistent across scam types: sellers pushing for immediate payment with urgency tactics, requesting payment through unusual methods (wire transfer, cryptocurrency, gift cards), refusing to use the platform's built-in payment protection, having newly created accounts with zero or fake feedback, using stock photos instead of actual product images, being unable to answer specific questions about products, and offering prices dramatically lower than market value. If an email claims there's an issue with your order, never click links in the email—instead, log directly into the retailer's website by typing the URL yourself.",
            keyPoints: [
              "Fake websites use URLs similar to legitimate retailers",
              "Scammers refuse platform payment systems and push unusual payment methods",
              "New accounts with no feedback and stock photos are red flags",
              "Never click email links claiming order issues—log in directly"
            ],
            visualAid: {
              type: "checklist",
              title: "Shopping Scam Red Flags",
              data: {
                items: [
                  "Prices dramatically lower than competitors (too good to be true)",
                  "Seller refuses platform's payment system",
                  "Requests wire transfer, cryptocurrency, or gift card payment",
                  "Newly created account with no feedback or reviews",
                  "Uses stock photos instead of actual product images",
                  "Can't answer specific questions about the product",
                  "Pushes for immediate payment with urgency tactics",
                  "Email links claiming order issues (phishing attempt)"
                ]
              }
            },
            checkpointQuiz: {
              question: "You receive an email saying your Amazon order has a shipping problem. What should you do?",
              options: [
                "Click the link in the email to resolve the issue",
                "Reply to the email with your account information",
                "Ignore it completely",
                "Log into Amazon directly by typing amazon.com to check your orders"
              ],
              correctAnswer: 3,
              explanation: "Never click links in emails claiming order issues—they're often phishing attempts. Always log into the retailer's website directly by typing the URL yourself, then check your order status. Legitimate issues will appear in your account."
            }
          },
          {
            id: "online-shopping-4",
            title: "Protecting Your Personal Information",
            type: "text",
            duration: 3,
            content: "Protecting your personal information during online shopping is essential to prevent identity theft and data breaches. Share only the minimum information absolutely necessary for a transaction—legitimate retailers don't need your Social Security Number for regular purchases (only for credit applications or tax-related transactions). Use strong, unique passwords for each shopping account; password reuse across sites means one breach compromises all your accounts. Be cautious with oversharing: retailers often request birthdates, phone numbers, income information, or other personal details during checkout, but much of this is optional marketing data, not required for purchase. Look for asterisks indicating truly mandatory fields. Read privacy policies to understand how your data will be used, shared, and sold to third parties. Opt out of marketing communications to reduce spam and data exposure. Consider using temporary or dedicated email addresses for one-time purchases to contain spam and protect your primary email. Enable two-factor authentication on all shopping accounts, especially those with saved payment methods or loyalty points. Regularly review account activity and delete old accounts you no longer use to reduce your attack surface.",
            keyPoints: [
              "Share only mandatory information (marked with asterisks)",
              "Never provide SSN for regular purchases—only for credit/tax purposes",
              "Use unique passwords for each site and enable 2FA",
              "Use dedicated email addresses for shopping to contain spam"
            ],
            visualAid: {
              type: "checklist",
              title: "Personal Information Protection Checklist",
              data: {
                items: [
                  "Provide only mandatory fields (marked with asterisks)",
                  "Never enter SSN for regular purchases",
                  "Use strong, unique passwords for each shopping site",
                  "Enable two-factor authentication on accounts",
                  "Use dedicated email address for online shopping",
                  "Read privacy policies before purchasing",
                  "Opt out of marketing communications",
                  "Don't save payment info unless absolutely necessary",
                  "Regularly review and delete old unused accounts"
                ]
              }
            },
            checkpointQuiz: {
              question: "A website asks for your Social Security Number during checkout for a $50 purchase. What should you do?",
              options: [
                "Provide it since they need it for shipping",
                "Provide it only if the site has HTTPS",
                "Refuse and abandon the purchase—this is a major red flag",
                "Provide the last 4 digits only"
              ],
              correctAnswer: 2,
              explanation: "Legitimate retailers never need your SSN for regular purchases. Requesting an SSN for a simple purchase is a massive red flag indicating identity theft or a scam. Abandon the purchase immediately and report the site."
            }
          },
          {
            id: "online-shopping-5",
            title: "Safe Mobile Shopping Practices",
            type: "text",
            duration: 3,
            content: "Mobile shopping requires additional security measures due to unique vulnerabilities. Only download official retailer apps from official app stores (Google Play Store, Apple App Store)—never from third-party sources or direct download links, which may contain malware. Verify the app developer before downloading; scammers create fake apps with names similar to legitimate retailers. Avoid making purchases over public WiFi networks (coffee shops, airports, hotels) without a VPN, as transactions can be intercepted by attackers on the same network. Use biometric authentication (fingerprint, Face ID) for shopping apps instead of passwords for faster, more secure access. Keep your mobile operating system and all apps updated to patch security vulnerabilities that attackers exploit. Be extremely cautious with QR codes—they can direct to malicious phishing sites or automatically download malware; only scan QR codes from trusted sources. Review app permissions and revoke access to unnecessary data like contacts, camera, or location. Sign out of shopping apps when not actively using them, especially on shared or family devices. Enable device security (PIN, password, biometric) on your phone to protect if it's lost or stolen.",
            keyPoints: [
              "Download apps only from official stores; verify developer before installing",
              "Never shop on public WiFi without a VPN—transactions can be intercepted",
              "Use biometric authentication and keep OS/apps updated",
              "Be cautious with QR codes; only scan from trusted sources"
            ],
            visualAid: {
              type: "checklist",
              title: "Mobile Shopping Security Checklist",
              data: {
                items: [
                  "Download apps only from official app stores",
                  "Verify app developer before installing",
                  "Never shop on public WiFi without VPN",
                  "Use biometric authentication (fingerprint/Face ID)",
                  "Keep mobile OS and apps updated",
                  "Review and limit app permissions",
                  "Be cautious scanning QR codes from unknown sources",
                  "Sign out of apps when not in use",
                  "Enable device security (PIN/password/biometric)"
                ]
              }
            },
            checkpointQuiz: {
              question: "You're at a coffee shop and want to buy something online. What's the SAFEST approach?",
              options: [
                "Use the coffee shop's free WiFi",
                "Wait until you're home or use mobile data/VPN",
                "Use WiFi but only on HTTPS sites",
                "Use WiFi but clear your browser history after"
              ],
              correctAnswer: 1,
              explanation: "Public WiFi is extremely risky for shopping because attackers on the same network can intercept your data. Wait until you're on a secure home network, use your mobile data, or use a VPN. HTTPS helps but doesn't fully protect against sophisticated attacks on public WiFi."
            }
          }
        ],
        quiz: {
          id: "online-shopping-quiz",
          title: "Online Shopping Security Mastery Quiz",
          description: "Test your knowledge of safe online shopping practices and fraud prevention",
          passingScore: 70,
          shuffleConfig: {
            questions: true,
            options: true,
            limit: null
          },
          questions: [
            {
              id: "shop-q1",
              type: "mcq",
              difficulty: "easy",
              question: "What is the FIRST thing you should check before entering payment information on a website?",
              options: [
                "The website has professional product photos",
                "The URL starts with HTTPS and shows a padlock icon",
                "The shipping is free or discounted",
                "The site has a modern, attractive design"
              ],
              correctAnswer: 1,
              explanation: "HTTPS (indicated by the padlock icon) means the connection is encrypted, protecting your payment information during transmission. Without HTTPS, your credit card details can be intercepted. However, HTTPS alone doesn't guarantee legitimacy—scam sites can also have HTTPS.",
              points: 10,
              tags: ["https", "encryption"]
            },
            {
              id: "shop-q2",
              type: "mcq",
              difficulty: "medium",
              question: "Which payment method offers the BEST fraud protection for online purchases?",
              options: [
                "Wire transfer or bank transfer",
                "Credit card with chargeback protection",
                "Gift cards or prepaid cards",
                "Cryptocurrency (Bitcoin, Ethereum)"
              ],
              correctAnswer: 1,
              explanation: "Credit cards provide the strongest buyer protection through chargeback rights and dispute resolution processes. Wire transfers, gift cards, and cryptocurrency offer little to no protection—once sent, the money is gone. Debit cards have some protection but less than credit cards.",
              points: 10,
              tags: ["payment-methods", "fraud-protection"]
            },
            {
              id: "shop-q3",
              type: "mcq",
              difficulty: "hard",
              question: "A website offers luxury designer handbags at 90% off with 'only 3 left in stock!' and a countdown timer showing 15 minutes remaining. What should you do?",
              options: [
                "Buy immediately before stock runs out—this is a great deal",
                "Research the site thoroughly using reviews and domain age—this is likely a scam",
                "Share the deal with friends so they don't miss out",
                "Add items to cart to hold them while you think about it"
              ],
              correctAnswer: 1,
              explanation: "Extreme discounts (90% off luxury items), artificial urgency (countdown timers, limited stock), and pressure tactics are classic scam indicators. Real luxury brands rarely discount heavily. Research the site's domain age (use WHOIS lookup), check reviews on independent sites, and verify the company's legitimacy before purchasing.",
              points: 15,
              tags: ["scam-tactics", "urgency-tactics"]
            },
            {
              id: "shop-q4",
              type: "mcq",
              difficulty: "medium",
              question: "You're at a coffee shop and want to buy something online. What's the SAFEST approach?",
              options: [
                "Use the coffee shop's free public WiFi",
                "Wait until you're home on a secure network or use mobile data/VPN",
                "Use public WiFi but only on HTTPS websites",
                "Use public WiFi but clear your browser history afterward"
              ],
              correctAnswer: 1,
              explanation: "Public WiFi is extremely risky for shopping because attackers on the same network can intercept your data using man-in-the-middle attacks. Wait until you're on a secure home network, use your mobile data, or use a trusted VPN. HTTPS helps but doesn't fully protect against sophisticated attacks on public WiFi.",
              points: 10,
              tags: ["public-wifi", "mobile-shopping"]
            },
            {
              id: "shop-q5",
              type: "mcq",
              difficulty: "hard",
              question: "A seller on Facebook Marketplace asks you to pay via Zelle or Venmo outside the platform's payment system to 'avoid fees.' What does this indicate?",
              options: [
                "They're trying to save money on fees—this is normal practice",
                "This is a major red flag for a scam—never pay outside the platform",
                "They prefer direct payment for faster processing",
                "The platform's payment system must be temporarily down"
              ],
              correctAnswer: 1,
              explanation: "This is a classic scam tactic. Legitimate sellers use platform payment systems because they provide buyer protection and dispute resolution. Paying outside the platform (Zelle, Venmo, wire transfer, gift cards) removes all protection—if the item never arrives or is fake, you have no recourse. Report the seller immediately.",
              points: 15,
              tags: ["marketplace-scams", "payment-scams"]
            },
            {
              id: "shop-q6",
              type: "true-false",
              difficulty: "easy",
              question: "If a website has HTTPS (padlock icon), it's definitely safe to shop there.",
              correctAnswer: 1,
              explanation: "FALSE. HTTPS only means the connection is encrypted—it doesn't verify the website's legitimacy. Scam sites can also have HTTPS certificates. Always verify the website's reputation, check reviews, verify the domain name, and look for other trust indicators before shopping.",
              points: 10,
              tags: ["https", "misconceptions"]
            },
            {
              id: "shop-q7",
              type: "mcq",
              difficulty: "medium",
              question: "Before downloading a shopping app, what should you do?",
              options: [
                "Download from any website offering the app",
                "Verify it's from the official app store (Google Play/Apple App Store) and check the developer name",
                "Just check if it has mostly positive reviews",
                "Download immediately if friends recommend it"
              ],
              correctAnswer: 1,
              explanation: "Only download from official app stores and carefully verify the developer name matches the legitimate company. Scammers create fake apps with similar names (e.g., 'Amazzon' instead of 'Amazon') that steal payment information. Check the number of downloads, reviews, and developer profile before installing.",
              points: 10,
              tags: ["mobile-apps", "app-security"]
            },
            {
              id: "shop-q8",
              type: "fill-blank",
              difficulty: "easy",
              question: "Before entering payment information, always verify the website URL starts with ___.",
              correctAnswer: "HTTPS",
              acceptedAnswers: ["HTTPS", "https", "Https"],
              explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts the connection between your browser and the website, protecting your payment information from interception. Look for the padlock icon in the address bar.",
              points: 10,
              tags: ["https", "basics"]
            },
            {
              id: "shop-q9",
              type: "mcq",
              difficulty: "hard",
              question: "A website asks for your Social Security Number to 'verify your identity' for a $50 purchase. What should you do?",
              options: [
                "Provide it since they need it for shipping verification",
                "Provide it only if the site has HTTPS",
                "Refuse and abandon the purchase—this is a major red flag for identity theft",
                "Provide only the last 4 digits"
              ],
              correctAnswer: 2,
              explanation: "Legitimate retailers NEVER need your SSN for regular purchases. Requesting an SSN for a simple purchase is a massive red flag indicating identity theft or a scam. Abandon the purchase immediately, report the site to the FTC, and never provide your SSN unless absolutely necessary (employment, taxes, credit applications).",
              points: 15,
              tags: ["identity-theft", "personal-information"]
            }
          ]
        }
      },
      {
        id: "email-security",
        title: "Email Security Fundamentals",
        description: "Master email security practices and identify malicious email threats",
        category: "Email Security",
        difficulty: "Easy",
        xp: 11,
        premium: false,
        estimatedMinutes: 24,
        completionRate: 86,
        rating: 4.7,
        lessonsCount: 5,
        quizzesCount: 1,
        skillsGained: ["Email Analysis", "Attachment Safety", "Spam Recognition", "Secure Communication"],
        practicalOutcome: "Identify malicious emails, secure email accounts, and implement safe email practices",
        lessons: [
          {
            title: "Understanding Email Security Threats",
            content: "Email remains the primary attack vector for cybercriminals. Common threats include phishing emails impersonating trusted entities, malware attachments that install viruses or ransomware, business email compromise targeting employees to transfer money, spam containing scams or malicious links, and spoofing where attackers forge sender addresses. Email vulnerabilities include unencrypted connections, weak passwords, lack of two-factor authentication, and user error in clicking malicious links. Understanding these threats is the first step in developing email security awareness. Email attacks succeed because they exploit trust, urgency, and authority.",
            tips: [
              "90% of cyberattacks start with a phishing email",
              "Attackers can spoof email addresses to appear legitimate",
              "Email content can be designed to bypass spam filters",
              "Even emails from known contacts can be compromised",
              "Email threats evolve constantly—stay informed"
            ]
          },
          {
            title: "Identifying Malicious Emails",
            content: "Examine every unexpected email carefully before taking action. Check the sender's email address fully—not just the display name, as these can be spoofed. Look for subtle misspellings in domain names (paypa1.com instead of paypal.com). Be suspicious of generic greetings ('Dear Customer') rather than your name. Watch for urgency tactics ('Account will be closed!'), threats, or too-good-to-be-true offers. Examine links by hovering (don't click) to see the real URL. Check for grammar and spelling errors. Legitimate companies rarely send unsolicited attachments. Verify unexpected requests through independent means (call the company directly).",
            tips: [
              "Hover over links to reveal the actual destination URL",
              "Check sender email carefully—display names can be faked",
              "Urgency and threats are classic manipulation tactics",
              "Legitimate companies don't ask for passwords via email",
              "When in doubt, contact the sender through official channels"
            ]
          },
          {
            title: "Safe Email Attachment Practices",
            content: "Email attachments are a primary malware delivery method. Never open unexpected attachments, even from known contacts whose accounts may be compromised. Be especially cautious with .exe, .zip, .scr, and macro-enabled Office files (.docm, .xlsm). Scan all attachments with updated antivirus software before opening. If you receive an unexpected attachment from a colleague, verify they sent it by contacting them directly. Use cloud-based scanners for suspicious files. Enable file extension viewing in your operating system to detect fake extensions like 'invoice.pdf.exe'. Keep software updated to patch vulnerabilities that attachments might exploit.",
            tips: [
              "Never open attachments from unknown senders",
              "Verify unexpected attachments even from known contacts",
              "Use antivirus software to scan attachments before opening",
              "Be especially wary of executable files (.exe, .scr)",
              "Enable 'show file extensions' to spot fake types"
            ]
          },
          {
            title: "Securing Your Email Account",
            content: "Email account security requires multiple layers of protection. Use strong, unique passwords (16+ characters) exclusively for email—never reuse passwords. Enable two-factor authentication (preferably app-based, not SMS). Regularly review account activity logs for unauthorized access. Set up account recovery options carefully—these are often targeted by attackers. Use email encryption for sensitive communications. Enable login alerts to be notified of access from new devices. Regularly review and revoke access from third-party apps connected to your email. Keep backup codes in a secure location separate from your password manager. Update your email password quarterly and immediately if you suspect compromise.",
            tips: [
              "Enable 2FA using authenticator apps, not SMS",
              "Review 'Recent Activity' regularly for unauthorized access",
              "Use end-to-end encrypted email for sensitive topics",
              "Store backup codes securely offline",
              "Never access email accounts on public or shared computers"
            ]
          },
          {
            title: "Email Privacy Best Practices",
            content: "Protect your privacy through careful email practices. Use email aliases or temporary addresses for signups and online shopping to limit spam and tracking. Avoid including sensitive information in email bodies—use secure file sharing instead. Be cautious about email tracking pixels that notify senders when you open messages. Disable automatic image loading to prevent tracking. Use encrypted email services for particularly sensitive communications. Regularly unsubscribe from unwanted mailing lists. Consider using different email addresses for different purposes (personal, work, shopping, social media). Review which services have access to your email and revoke unnecessary permissions.",
            tips: [
              "Use temporary email addresses (10minutemail.com) for one-time signups",
              "Create separate emails for different purposes to compartmentalize data",
              "Disable auto-load images to prevent tracking pixels",
              "Never email passwords, credit card numbers, or SSN",
              "Use encrypted messaging apps for truly sensitive conversations"
            ]
          }
        ],
        quiz: {
          id: "email-security-quiz",
          title: "Email Security Quiz",
          description: "Test your understanding of email security practices",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "What should you do FIRST when you receive an unexpected email with an attachment from a colleague?",
              options: [
                "Open it immediately",
                "Verify with them through another communication method that they sent it",
                "Forward it to your team",
                "Delete it without reading"
              ],
              correctAnswer: 1,
              explanation: "Always verify unexpected attachments even from known contacts, as their accounts may be compromised."
            },
            {
              id: "q2",
              type: "mcq",
              question: "How can you check where an email link actually goes without clicking it?",
              options: [
                "Click it and see",
                "Hover your mouse over the link to see the URL",
                "Ask someone else to click it first",
                "You can't check without clicking"
              ],
              correctAnswer: 1,
              explanation: "Hovering over links reveals the actual destination URL, allowing you to verify legitimacy before clicking."
            },
            {
              id: "q3",
              type: "mcq",
              question: "Which type of two-factor authentication is MOST secure for email accounts?",
              options: [
                "SMS text messages",
                "Authenticator app",
                "Security questions",
                "Email verification"
              ],
              correctAnswer: 1,
              explanation: "Authenticator apps are more secure than SMS, which can be intercepted through SIM swapping attacks."
            },
            {
              id: "q4",
              type: "mcq",
              question: "An email claims to be from your bank requesting immediate password verification. What should you do?",
              options: [
                "Click the link and enter your password",
                "Go directly to your bank's website or call them to verify",
                "Reply with your password",
                "Forward it to friends as a warning"
              ],
              correctAnswer: 1,
              explanation: "Never click links in suspicious emails. Always verify by going directly to the official website or calling the company."
            },
            {
              id: "q5",
              type: "mcq",
              question: "What does HTTPS in an email link indicate?",
              options: [
                "The email is safe",
                "The connection to that website would be encrypted (but doesn't verify legitimacy)",
                "The sender is verified",
                "The email passed spam filters"
              ],
              correctAnswer: 1,
              explanation: "HTTPS means the connection is encrypted, but scam sites can also use HTTPS. It doesn't guarantee legitimacy."
            },
            {
              id: "q6",
              type: "mcq",
              question: "Why should you disable automatic image loading in emails?",
              options: [
                "To save data",
                "To prevent tracking pixels from reporting when you open emails",
                "Images make emails load slower",
                "It's a legal requirement"
              ],
              correctAnswer: 1,
              explanation: "Tracking pixels embedded in images notify senders when you open emails, revealing your email is active and monitored."
            }
          ]
        }
      },
      {
        id: "device-security",
        title: "Device Security Essentials",
        description: "Implement comprehensive security practices for computers, smartphones, and connected devices",
        category: "Device Protection",
        difficulty: "Easy",
        xp: 15,
        premium: false,
        estimatedMinutes: 28,
        completionRate: 84,
        rating: 4.8,
        lessonsCount: 5,
        quizzesCount: 1,
        skillsGained: ["System Security", "Mobile Protection", "Update Management", "Physical Security"],
        practicalOutcome: "Secure all personal devices against malware, theft, and unauthorized access",
        lessons: [
          {
            title: "Understanding Device Security Fundamentals",
            content: "Device security forms the foundation of your entire digital safety. Compromised devices expose all your accounts, files, communications, and personal information. Modern threats include malware (viruses, ransomware, spyware), unauthorized physical access, network-based attacks exploiting vulnerabilities, and social engineering to install malicious software. Every connected device—computers, smartphones, tablets, smart home devices—represents a potential entry point for attackers. Layered security (multiple defensive measures) provides the best protection. This includes keeping software updated, using strong authentication, installing security software, practicing safe browsing, and implementing physical security measures.",
            tips: [
              "All connected devices need security measures, not just computers",
              "Outdated software contains known vulnerabilities attackers exploit",
              "Physical access to unlocked devices bypasses most digital security",
              "Free public WiFi without VPN exposes your traffic to interception",
              "Security is a process requiring ongoing attention, not a one-time setup"
            ]
          },
          {
            title: "Essential Security Software and Updates",
            content: "Keep your operating system, apps, and firmware updated with the latest security patches. Enable automatic updates when possible. Install reputable antivirus/anti-malware software and keep it updated. Use a firewall to monitor incoming and outgoing network traffic. Consider additional protection like anti-ransomware tools. Update your browser regularly and use security-focused extensions (ad blockers, script blockers). Remove or disable unused software and apps that expand your attack surface. Verify that updates come from official sources—fake update notifications are a common malware delivery method. Restart devices regularly to install pending updates and clear temporary vulnerabilities.",
            tips: [
              "Enable automatic updates for OS, apps, and security software",
              "Restart devices weekly to ensure updates are fully installed",
              "Only download software from official sources (Microsoft Store, App Store, official websites)",
              "Remove apps and programs you no longer use",
              "Use Windows Defender (built-in) or reputable paid antivirus (Bitdefender, Kaspersky, Norton)"
            ]
          },
          {
            title: "Secure Mobile Device Practices",
            content: "Mobile devices require unique security considerations. Set strong screen locks (biometric plus PIN backup). Enable Find My Device (iOS/Android) in case of loss or theft. Only download apps from official stores and review permissions before installing. Disable unnecessary app permissions (location, microphone, camera access). Use mobile device management if provided by your employer. Encrypt your device storage (usually enabled by default on modern devices). Back up your data regularly to cloud or computer. Be aware that public charging stations can be compromised (juice jacking)—use your own charger. Keep Bluetooth and WiFi off when not needed. Enable remote wipe capability for lost devices.",
            tips: [
              "Use biometric authentication (fingerprint, Face ID) plus a strong PIN",
              "Review and limit app permissions regularly",
              "Enable automatic backups to cloud or computer",
              "Use 'Find My Device' features to locate or remotely wipe lost phones",
              "Bring your own charger; avoid public USB charging stations"
            ]
          },
          {
            title: "Safe Browsing and Download Practices",
            content: "Your browser is a primary attack vector. Use modern, updated browsers (Chrome, Firefox, Safari, Edge). Enable browser security features like phishing and malware protection. Use HTTPS Everywhere extension to force encrypted connections. Be cautious with browser extensions—only install from official stores and review permissions. Clear cookies and cache regularly. Use private/incognito mode for sensitive browsing. When downloading files, scan with antivirus before opening. Only download from reputable sources. Be wary of download buttons on sketchy sites—many are ads leading to malware. Use ad blockers to reduce malicious ad exposure. Avoid clicking pop-ups; close them via task manager if they won't close normally.",
            tips: [
              "Use uBlock Origin or similar ad blocker to prevent malicious ads",
              "Never click 'Allow' on random notification requests from websites",
              "Download software only from official developer websites",
              "Scan all downloads with antivirus before opening",
              "Use separate browsers for banking/sensitive vs. general browsing"
            ]
          },
          {
            title: "Physical Device Security",
            content: "Physical security prevents unauthorized access when you're away from your device. Always lock your screen when stepping away (Windows + L on Windows, Control + Command + Q on Mac). Use strong passwords or PINs, not simple codes. Enable full-disk encryption (BitLocker on Windows, FileVault on Mac). Never leave devices unattended in public spaces. Use privacy screens to prevent shoulder surfing. Secure devices in your vehicle—never leave visible in parked cars. Back up important data off-device in case of theft. Use cable locks for laptops in public spaces. Enable login notifications so you're alerted to unauthorized access attempts. Consider physical port blockers for high-security environments.",
            tips: [
              "Lock your screen every time you step away (Windows + L keyboard shortcut)",
              "Enable full-disk encryption on all devices",
              "Don't leave laptops visible in parked vehicles",
              "Use privacy screen filters in public spaces",
              "Back up data regularly in case of theft or hardware failure"
            ]
          }
        ],
        quiz: {
          id: "device-security-quiz",
          title: "Device Security Quiz",
          description: "Test your knowledge of protecting your devices",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "What is the MOST important reason to keep your operating system updated?",
              options: [
                "To get new features",
                "To patch security vulnerabilities that attackers exploit",
                "To make your device faster",
                "To get a newer interface"
              ],
              correctAnswer: 1,
              explanation: "Security updates patch vulnerabilities that attackers actively exploit. Outdated systems are primary targets for malware and attacks."
            },
            {
              id: "q2",
              type: "mcq",
              question: "What should you do before opening any downloaded file?",
              options: [
                "Open it immediately",
                "Scan it with antivirus software",
                "Email it to yourself",
                "Rename it"
              ],
              correctAnswer: 1,
              explanation: "Always scan downloads with updated antivirus software before opening to detect and prevent malware infections."
            },
            {
              id: "q3",
              type: "mcq",
              question: "Why should you avoid using public USB charging stations?",
              options: [
                "They charge too slowly",
                "They can be compromised to install malware (juice jacking)",
                "They damage your battery",
                "They're always broken"
              ],
              correctAnswer: 1,
              explanation: "Public charging stations can be compromised to install malware or steal data through the USB connection (juice jacking attacks)."
            },
            {
              id: "q4",
              type: "mcq",
              question: "What is full-disk encryption and why is it important?",
              options: [
                "It makes your device faster",
                "It encrypts all data so thieves can't access files if they steal your device",
                "It prevents viruses",
                "It improves battery life"
              ],
              correctAnswer: 1,
              explanation: "Full-disk encryption protects your data if your device is stolen. Without your password, thieves cannot access encrypted files."
            },
            {
              id: "q5",
              type: "mcq",
              question: "When reviewing app permissions, which access should you question for a flashlight app?",
              options: [
                "Camera access (for the flashlight LED)",
                "Location, contacts, and microphone access",
                "Notification access",
                "Display access"
              ],
              correctAnswer: 1,
              explanation: "A flashlight app only needs camera access for the LED. Requesting location, contacts, or microphone is suspicious and unnecessary."
            },
            {
              id: "q6",
              type: "mcq",
              question: "What keyboard shortcut should you use to quickly lock your Windows computer?",
              options: [
                "Ctrl + Alt + Delete",
                "Windows + L",
                "Alt + F4",
                "Ctrl + L"
              ],
              correctAnswer: 1,
              explanation: "Windows + L instantly locks your screen, protecting your work when you step away from your computer."
            }
          ]
        }
      }
    ]
  },

  {
    id: "advanced",
    title: "Advanced Scam Defense",
    description: "Deep dives into advanced techniques and certifications for professionals",
    subtitle: "For security professionals and high-value targets",
    estimatedHours: 4,
    difficulty: "Advanced",
    accessLevel: "premium",
    totalXP: 50,
    color: "from-purple-500 to-purple-600",
    icon: "lock",
    badge: "Advanced",
    modules: [
      {
        id: "social-engineering",
        title: "Social Engineering Tactics",
        description: "Understand manipulation tactics used by scammers and how to defend against them",
        category: "Social Engineering",
        difficulty: "Hard",
        xp: 25,
        premium: true,
        estimatedMinutes: 35,
        completionRate: 62,
        rating: 4.9,
        lessonsCount: 6,
        quizzesCount: 1,
        skillsGained: ["Manipulation Detection", "Pretexting Recognition", "Baiting Defense", "Security Protocols"],
        practicalOutcome: "Recognize and defend against social engineering attacks in personal and professional contexts",
        lessons: [
          {
            title: "Anatomy of Social Engineering",
            content: "Social engineering is the art of manipulating people into revealing confidential information or performing actions that compromise security. Unlike technical hacks, social engineers exploit human psychology and trust. They study their targets, build rapport, and use emotional triggers like fear, urgency, authority, or greed to manipulate victims into compliance. The success rate is often 50%+ because humans are predictable and want to be helpful.",
            tips: [
              "Scammers research targets on social media",
              "They build relationships before making the ask",
              "Emotional triggers override logical thinking",
              "Anyone can be a victim - it's about technique, not intelligence",
              "Children and elderly are often more vulnerable"
            ]
          },
          {
            title: "Common Social Engineering Techniques",
            content: "Pretexting involves creating a fabricated scenario to extract information. Baiting offers something enticing (free USB drive) to get you to act. Quid pro quo promises a service in exchange for information. Tailgating uses someone's trust to gain physical access. Phishing combines technical deception with social manipulation. Smishing uses SMS text messages. Vishing uses voice calls impersonating authority figures. Understanding each technique helps you recognize when you're being manipulated.",
            tips: [
              "Attackers impersonate IT staff, managers, or authorities",
              "They create artificial time pressure",
              "They exploit your desire to be helpful",
              "They use information from social media to personalize attacks",
              "Common authority figures impersonated: IRS, Microsoft, Apple, Banks"
            ]
          },
          {
            title: "Building Psychological Defense",
            content: "Develop awareness of manipulation tactics. Question unexpected requests for information or access, even from seemingly trusted sources. Verify through independent channels - never use contact info provided in the suspicious communication. Create company security policies and enforce them. Train employees to recognize and report suspicious behavior. Trust your instincts - if something feels off, it probably is. Slowing down and thinking before responding is your best defense.",
            tips: [
              "Always verify through official channels",
              "Implement a verification protocol for sensitive requests",
              "Report suspicious contacts to security team",
              "Never assume requests are legitimate based on appearance",
              "Practice saying 'I need to verify this before I can help'"
            ]
          },
          {
            title: "Pretexting and Impersonation Techniques",
            content: "Pretexters create detailed false scenarios to manipulate you. They might claim to be tech support, a bank officer, a government agent, or a vendor. They use fabricated stories that exploit your desire to help or your fear of consequences. Skilled pretexters use information gathered from social media and public records to make their story more believable. They may have legitimate-sounding phone numbers (spoofed) and official-looking email addresses. The key defense is independent verification - never use contact information provided by the caller.",
            tips: [
              "Real IT staff won't ask for your password",
              "Government agencies don't threaten immediate arrest via email",
              "Banks won't ask for verification codes via email",
              "Always call the official number from your statement/website",
              "It's okay to be rude to protect your security"
            ]
          },
          {
            title: "Baiting and Physical Security Exploitation",
            content: "Baiting attacks offer something enticing to trigger action. USB drives left in parking lots, free WiFi networks, or email attachments promising promotions or salary increases. When you use these items, malware is installed or your credentials are captured. Physical baiting might involve leaving access cards near entrances for people to hold the door open. The defense is skepticism and caution - don't use devices from unknown sources, don't connect to public WiFi for sensitive activities, and don't open attachments from unknown senders.",
            tips: [
              "Never plug unknown USB drives into your computer",
              "Don't use public WiFi for banking or sensitive activities",
              "Don't download attachments from unexpected emails",
              "Verify sender identity before opening any attachment",
              "Use a VPN if you must use public WiFi"
            ]
          },
          {
            title: "Organizational Defense Strategies",
            content: "Organizations should implement security awareness training, establish clear verification procedures, create a reporting culture for suspicious activity, implement multi-factor authentication, use email authentication (SPF, DKIM, DMARC), and conduct regular security audits. Individuals should know their organization's verification procedures, report suspicious contacts to IT/security, use strong authentication, keep security training updated, and remind colleagues about threats. Creating a culture where security awareness is valued reduces vulnerability significantly.",
            tips: [
              "Encourage reporting of suspicious requests",
              "Implement verification procedures for sensitive requests",
              "Use multi-factor authentication everywhere",
              "Train employees regularly on social engineering",
              "Conduct simulated phishing tests to identify vulnerabilities"
            ]
          }
        ],
        quiz: {
          id: "social-engineering-quiz",
          title: "Social Engineering Defense Quiz",
          description: "Test your understanding of manipulation tactics",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "What is the main advantage of social engineering over technical hacking?",
              options: [
                "It's cheaper",
                "It exploits human psychology instead of technical vulnerabilities",
                "It's illegal",
                "It takes less time"
              ],
              correctAnswer: 1,
              explanation: "Social engineering succeeds because it targets human psychology and trust rather than technical systems."
            },
            {
              id: "q2",
              type: "mcq",
              question: "Which of these is a pretexting attack?",
              options: [
                "Leaving USB drives in parking lots",
                "Creating a false identity to gain trust before extracting info",
                "Sending phishing emails",
                "Following someone through a secure door"
              ],
              correctAnswer: 1,
              explanation: "Pretexting involves creating a fabricated scenario or false identity to manipulate someone into disclosing information."
            },
            {
              id: "q3",
              type: "mcq",
              question: "What should you do if someone calls claiming to be from IT support?",
              options: [
                "Immediately give them your password",
                "Verify their identity through official channels before providing any information",
                "Ask them to email your address",
                "Hang up and block the number"
              ],
              correctAnswer: 1,
              explanation: "Always verify unexpected requests through independent, official channels - never use contact info provided by the caller."
            },
            {
              id: "q4",
              type: "mcq",
              question: "What is a baiting attack?",
              options: [
                "Asking for bait to break into a system",
                "Using email to trick people",
                "Offering something enticing to trigger malicious action",
                "Waiting for someone to make a mistake"
              ],
              correctAnswer: 2,
              explanation: "Baiting offers something attractive (like a USB drive) to trick people into taking actions that compromise security."
            },
            {
              id: "q5",
              type: "mcq",
              question: "You receive a USB drive in the mail from an unknown sender. What should you do?",
              options: [
                "Plug it in to see what it contains",
                "Give it to your IT department for analysis",
                "Throw it away immediately",
                "Share it with colleagues"
              ],
              correctAnswer: 2,
              explanation: "Never plug unknown USB drives into your computer. They can contain malware designed to steal information or install backdoors."
            },
            {
              id: "q6",
              type: "mcq",
              question: "A colleague receives an email from 'your boss' asking for sensitive information urgently. What's the safest response?",
              options: [
                "Send the information immediately to show helpfulness",
                "Walk over to the boss's office to verify the request before responding",
                "Reply all with the information",
                "Forward to IT to handle"
              ],
              correctAnswer: 1,
              explanation: "In-person verification bypasses email spoofing and confirms the request is legitimate before sharing sensitive information."
            }
          ]
        }
      },
      {
        id: "identity-theft",
        title: "Identity Theft Prevention",
        description: "Protect your personal identity and credit from theft and misuse",
        category: "Identity Theft",
        difficulty: "Hard",
        xp: 20,
        premium: true,
        estimatedMinutes: 32,
        completionRate: 58,
        rating: 4.8,
        lessonsCount: 6,
        quizzesCount: 1,
        skillsGained: ["Identity Protection", "Credit Monitoring", "Theft Response", "Privacy Management"],
        practicalOutcome: "Implement comprehensive identity theft prevention and response strategies",
        lessons: [
          {
            title: "Understanding Identity Theft",
            content: "Identity theft occurs when someone uses your personal information without permission to commit fraud or other crimes. This can include opening new accounts, making purchases, taking out loans, filing taxes, or even committing crimes in your name. The damage can take years to repair. Identity thieves gather personal information from data breaches, phishing, dumpster diving, public records, or social engineering. Each year, millions of people fall victim, and recovery can take 100+ hours.",
            tips: [
              "Identity theft can affect credit for 7+ years",
              "Fraudsters may use your info for criminal activity",
              "Early detection is crucial for minimizing damage",
              "You may not know you're a victim for months or years",
              "Some identity theft is not financial - criminals can commit crimes in your name"
            ]
          },
          {
            title: "Protecting Your Personal Information",
            content: "Limit who you share personal information with. Shred documents containing sensitive information using a cross-cut shredder. Monitor financial statements monthly for unauthorized charges. Use secure, encrypted messaging for sensitive communications. Be cautious on social media - don't share birthdate, address, phone number, or other identifying info. Limit data collection by companies using privacy settings. Never provide SSN unless absolutely necessary. Check your credit reports annually for free at annualcreditreport.com.",
            tips: [
              "Use a cross-cut shredder for documents",
              "Check credit reports annually for free at annualcreditreport.com",
              "Set credit freezes to prevent account opening",
              "Don't share full birthdates or SSN on social media",
              "Use strong privacy settings on all social media accounts"
            ]
          },
          {
            title: "Responding to Identity Theft",
            content: "Act quickly if you suspect identity theft. Place a fraud alert with credit bureaus. Check credit reports for unauthorized accounts. Contact banks and credit card companies about fraudulent transactions. File a report with the FTC at identitytheft.gov - they provide recovery plans. Document everything in writing. File a police report for your records. Consider hiring an identity theft protection service. Monitor your accounts closely for months.",
            tips: [
              "Keep detailed records of all communications",
              "Contact all three credit bureaus (Equifax, Experian, TransUnion)",
              "File reports with FTC - they provide recovery plans",
              "Check credit reports monthly for 12 months after discovery",
              "Save all documentation for potential lawsuits or disputes"
            ]
          },
          {
            title: "Medical Identity Theft",
            content: "Medical identity theft occurs when someone uses your health insurance information or personal data to receive medical care or prescription drugs. This can result in wrong information in your medical records, denial of coverage, and financial harm if the scammer's medical bills are charged to you. Medical identity theft is harder to detect because you may not know about it until you try to use your insurance. Check your Explanation of Benefits (EOB) statements regularly. Verify all charges are for services you received.",
            tips: [
              "Review EOB statements for unfamiliar medical services",
              "Monitor your healthcare provider accounts for unauthorized access",
              "Request copies of medical records to check accuracy",
              "Use strong passwords for health insurance accounts",
              "Consider credit monitoring specifically for medical fraud"
            ]
          },
          {
            title: "Synthetic Identity Fraud",
            content: "Synthetic identity fraud occurs when criminals create fake identities using a mix of real and fake personal information (like your SSN with their name). They then build credit history under this synthetic identity by obtaining small loans or credit cards, establishing a pattern of responsible behavior. After building credit, they take out large loans and disappear. This type of fraud is harder to detect because it doesn't affect your credit directly initially.",
            tips: [
              "Monitor your credit report for applications you didn't make",
              "Consider a credit freeze to prevent synthetic identities using your SSN",
              "Watch for utility or phone accounts you didn't open",
              "Set up credit monitoring alerts for new accounts",
              "Your SSN might be used even if your name isn't"
            ]
          },
          {
            title: "Long-Term Recovery and Legal Protections",
            content: "After identity theft, recovery typically takes 6-12 months or longer. Continue monitoring credit reports for 12+ months. Obtain and save all documentation. Consider hiring an identity theft attorney if disputes arise. Know your consumer rights under the Fair Credit Reporting Act (FCRA) and Fair Debt Collection Practices Act (FDCPA). You have the right to dispute inaccurate information. Creditors must investigate disputes within 30 days. Some companies offer identity theft protection services that monitor accounts continuously.",
            tips: [
              "Save all documentation of the fraud for disputes",
              "Know that creditors must investigate disputes within 30 days",
              "You can place a permanent security freeze on your credit",
              "Consider identity theft protection services for continuous monitoring",
              "Work with your state's Attorney General if needed"
            ]
          }
        ],
        quiz: {
          id: "identity-theft-quiz",
          title: "Identity Theft Prevention Quiz",
          description: "Test your identity protection knowledge",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "mcq",
              question: "What is the first step to take if you suspect identity theft?",
              options: [
                "File a police report",
                "Place a fraud alert with credit bureaus",
                "Wait a few days to see if it happens again",
                "Contact your bank once suspicious charges appear"
              ],
              correctAnswer: 1,
              explanation: "Immediately placing a fraud alert with credit bureaus is the first critical step to prevent further damage."
            },
            {
              id: "q2",
              type: "mcq",
              question: "Why should you freeze your credit?",
              options: [
                "To prevent unauthorized accounts from being opened",
                "To improve your credit score",
                "To get free credit monitoring",
                "To prevent current accounts from being used"
              ],
              correctAnswer: 0,
              explanation: "A credit freeze prevents thieves from opening new accounts in your name by restricting access to your credit file."
            },
            {
              id: "q3",
              type: "mcq",
              question: "How often should you check your credit report for suspicious activity?",
              options: [
                "Once a year",
                "Only if you've been notified",
                "Monthly, especially after identity theft discovery",
                "Every 5 years"
              ],
              correctAnswer: 2,
              explanation: "After discovering identity theft, monitor your credit reports monthly for at least 12 months to catch new fraudulent accounts."
            },
            {
              id: "q4",
              type: "mcq",
              question: "What is synthetic identity fraud?",
              options: [
                "When criminals steal your entire identity",
                "When they use your SSN with a different name to build fake credit",
                "When they access your bank accounts",
                "When they make unauthorized purchases"
              ],
              correctAnswer: 1,
              explanation: "Synthetic identity fraud uses real SSNs with fabricated names to build credit history before committing large fraud."
            },
            {
              id: "q5",
              type: "mcq",
              question: "You notice medical services on your EOB (Explanation of Benefits) that you didn't receive. What should you do?",
              options: [
                "Ignore it - it's probably a billing error",
                "Contact your health insurance provider immediately to report medical identity theft",
                "Wait to see if more fraudulent charges appear",
                "Change your insurance provider"
              ],
              correctAnswer: 1,
              explanation: "Report suspected medical identity theft immediately to your insurance provider to prevent further fraud and ensure your medical records are accurate."
            },
            {
              id: "q6",
              type: "mcq",
              question: "What personal information should you NEVER share on social media?",
              options: [
                "Your job title",
                "Your city of residence",
                "Your full birthdate and address",
                "Your hobbies and interests"
              ],
              correctAnswer: 2,
              explanation: "Never share full birthdates, addresses, SSN, or other information that could be used for identity theft or social engineering."
            }
          ]
        }
      }
    ]
  }
];

/**
 * GAMIFICATION & PROGRESS SYSTEM
 * Deterministic formulas for XP, Levels, and Achievements
 * All values are explainable and backend-ready
 */

export const GAMIFICATION = {
  // XP to Level formula: level = Math.floor(totalXP / 500) + 1
  // This means: 0-499 XP = Level 1, 500-999 XP = Level 2, etc.
  XP_PER_LEVEL: 500,

  // Base XP rewards
  XP_REWARDS: {
    completedModule: (xp) => xp, // Module's own XP value
    quizPassing: (baseXP) => Math.floor(baseXP * 0.3), // 30% of module XP
    bonusStreak: (daysStreak) => Math.min(10 * daysStreak, 50), // Max 50 bonus
  },

  // Achievement thresholds (backend-ready)
  ACHIEVEMENTS: [
    { id: "first-module", title: "First Step", requirement: 1, type: "modules" },
    { id: "five-modules", title: "Learning Streak", requirement: 5, type: "modules" },
    { id: "all-beginner", title: "Foundation Master", requirement: 3, type: "path-completion", path: "beginner" },
    { id: "advanced-scholar", title: "Advanced Scholar", requirement: 2, type: "path-completion", path: "advanced" },
    { id: "streak-week", title: "Dedicated Learner", requirement: 7, type: "streak-days" },
    { id: "level-five", title: "Level 5 Learner", requirement: 5, type: "level" },
    { id: "level-ten", title: "Expert Guardian", requirement: 10, type: "level" },
  ],

  // Streak mechanics
  STREAK_RESET_DAYS: 1, // Reset if 1+ days without activity
};

/**
 * PREMIUM FEATURES
 * Clear differentiation between free and premium content
 * Supports monetization strategy
 */

export const PREMIUM_FEATURES = {
  free: ["All beginner modules", "Basic progress tracking", "Community support"],
  premium: [
    "All advanced modules",
    "Interactive scenarios & simulations",
    "Personalized learning paths",
    "Printable certificates",
    "Advanced analytics",
    "Email support",
    "Ad-free experience",
  ],
  enterprise: [
    "Everything in Premium",
    "Custom training programs",
    "Dedicated account manager",
    "Team analytics dashboard",
    "Compliance reporting",
    "On-site training available",
    "Priority support",
  ],
};

/**
 * PRICING
 * For monetization and investor credibility
 */

export const PRICING = {
  premium: {
    monthly: 5000,
    annually: 50000,
    currency: "NGN",
    savings: "17%",
  },
  enterprise: {
    base: 150000,
    perUser: 5000,
    currency: "NGN",
    note: "Custom pricing available",
  },
};
