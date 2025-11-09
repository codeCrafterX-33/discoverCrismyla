# EmailJS Template Configuration Guide
## Customer Info Form - Anti-Spam Best Practices

### Available Template Variables

Your API sends these variables to your EmailJS template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{customer_name}}` | Customer's full name | "John Doe" |
| `{{name}}` | Same as customer_name (for compatibility) | "John Doe" |
| `{{customer_email}}` | Customer's email address | "john@example.com" |
| `{{customer_whatsapp}}` | Customer's WhatsApp number | "+1234567890" |
| `{{time}}` | Formatted timestamp | "Monday, January 15, 2024, 02:30 PM EST" |
| `{{message}}` | Pre-formatted message with all details | (See below) |
| `{{to_email}}` | Recipient email (use in "To Email" field) | "crismylal@gmail.com" |
| `{{reply_to}}` | Customer's email (for Reply-To header) | "john@example.com" |
| `{{subject}}` | Email subject line | "New Member: John Doe signed up for coupons & discounts" |

---

## EmailJS Template Settings

### 1. Basic Settings

**Service ID:** `service_os3fq3r`  
**Template ID:** `template_67c8y9d`

### 2. Email Configuration Fields

#### To Email Field:
```
{{to_email}}
```
- ⚠️ **IMPORTANT:** Use the variable `{{to_email}}`, NOT a static email address
- This allows dynamic recipient configuration

#### From Name:
```
Crismyla Website
```
- Use a professional, recognizable name
- Avoid generic names like "Website" or "No Reply"

#### From Email:
- Use the email address connected to your EmailJS service
- Should be a verified email address
- Prefer a domain email over free email services when possible

#### Reply To:
```
{{reply_to}}
```
- This allows you to reply directly to the customer
- Helps with email authentication and reduces spam

#### Subject:
```
{{subject}}
```
- OR use a static subject if preferred
- Avoid spam trigger words: "FREE", "URGENT", "CLICK HERE", excessive exclamation marks

---

## Recommended Email Template Structure

### Template Body (HTML or Plain Text):

```
A message by {{customer_name}} has been received. Kindly respond at your earliest convenience.

👤 {{name}}

🕒 {{time}}

{{message}}
```

### Alternative Clean Format (Better for Spam Avoidance):

```
New Community Member Registration

Member Details:
Name: {{customer_name}}
Email: {{customer_email}}
WhatsApp: {{customer_whatsapp}}
Registration Time: {{time}}

Action Required:
This customer has joined the Crismyla community to receive exclusive coupons, discounts, and product updates. This is a great opportunity for marketing follow-up.

---
Crismyla Website
```

---

## Anti-Spam Best Practices

### ✅ DO:
1. **Use professional language** - Avoid excessive capitalization, emojis, or exclamation marks
2. **Include proper headers** - Set From Name, Reply-To, and Subject correctly
3. **Use plain text formatting** - Or clean HTML without excessive styling
4. **Avoid spam trigger words** - Don't use words like "FREE", "URGENT", "CLICK NOW", "LIMITED TIME"
5. **Include your business name** - Makes the email more trustworthy
6. **Use reply-to** - Set Reply-To to customer's email for better deliverability
7. **Keep it concise** - Short, professional emails are less likely to be flagged

### ❌ DON'T:
1. **Don't use all caps** - "URGENT" or "IMPORTANT" triggers spam filters
2. **Don't use excessive punctuation** - Avoid "!!!!" or "???"
3. **Don't use suspicious links** - Avoid shortened URLs or suspicious domains
4. **Don't use spam trigger words** - Words like "free", "guarantee", "act now"
5. **Don't send from no-reply addresses** - Use a real, replyable email address
6. **Don't use generic subjects** - Avoid "Hello" or "Test"

---

## EmailJS Template Example

### Subject Line:
```
New Member: {{customer_name}} signed up for coupons
```

### Email Body:
```
New Community Member Registration

Member Information:
Name: {{customer_name}}
Email: {{customer_email}}
WhatsApp: {{customer_whatsapp}}
Registration Date: {{time}}

Next Steps:
This customer has joined the Crismyla community and is interested in receiving exclusive coupons, discounts, and product updates. This is a great opportunity for marketing follow-up and engagement.

You can reply directly to this email to contact the customer at {{customer_email}}.

---
Crismyla Customer Management System
```

---

## Additional EmailJS Settings to Check

### 1. Email Service Connection
- Ensure your email service (Gmail, Outlook, etc.) is properly connected
- Verify the connection status in EmailJS dashboard
- Use a verified email address

### 2. Domain Authentication (If Available)
- Set up SPF records if using custom domain
- Set up DKIM if available
- This significantly improves deliverability

### 3. Rate Limiting
- Don't send too many emails too quickly
- EmailJS has rate limits - stay within them

### 4. Email Content
- Keep emails professional and business-like
- Include your business information
- Avoid marketing language in notification emails

---

## Testing Your Template

1. **Send a test email** from EmailJS dashboard
2. **Check spam folder** - If it goes to spam, adjust content
3. **Mark as "Not Spam"** - Helps train the spam filter
4. **Add sender to contacts** - Improves future deliverability
5. **Check email headers** - Ensure Reply-To is set correctly

---

## Current API Configuration

Your API is configured to send:
- ✅ Professional subject line
- ✅ Clean message format
- ✅ Reply-To header
- ✅ All necessary customer information
- ✅ Timestamp
- ✅ No spam trigger words

The main thing to ensure in your EmailJS template is:
1. Use `{{to_email}}` in the "To Email" field
2. Use `{{reply_to}}` in the "Reply To" field
3. Keep email content professional and clean
4. Avoid excessive formatting or emojis

---

## Quick Checklist

- [ ] To Email field uses `{{to_email}}`
- [ ] Reply To field uses `{{reply_to}}`
- [ ] Subject line is professional (use `{{subject}}` or custom)
- [ ] From Name is professional (e.g., "Crismyla Website")
- [ ] Email content is clean and professional
- [ ] No spam trigger words in subject or body
- [ ] Email service is properly connected
- [ ] Test email was sent and received in inbox (not spam)

