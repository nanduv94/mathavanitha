# Matha Vanitha Charitable Society — Vercel Deployment

## Project Structure
```
mathavanitha-vercel/
├── api/
│   └── index.py          ← Flask app (Vercel serverless entry point)
├── public/
│   ├── css/main.css      ← Stylesheet
│   └── js/main.js        ← JavaScript
├── templates/
│   ├── index.html
│   ├── about.html
│   ├── donate.html
│   ├── press.html
│   └── contact.html
├── vercel.json           ← Vercel routing config
├── requirements.txt      ← Python dependencies
└── .gitignore
```

## Deploy to Vercel

### Option A — Via Vercel CLI (recommended)
```bash
npm install -g vercel
cd mathavanitha-vercel
vercel        # follow prompts, deploys instantly
vercel --prod # deploy to production
```

### Option B — Via GitHub (easiest)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import from GitHub
3. Select the repo → Deploy
4. Done — auto-deploys on every git push

## Add Custom Domain
1. Vercel dashboard → your project → Settings → Domains
2. Add: mathavanitha.in and www.mathavanitha.in
3. Vercel gives you these DNS records to add at your registrar:
   - A record: @ → 76.76.21.21
   - CNAME: www → cname.vercel-dns.com
4. HTTPS is automatic

## Add Contact Form Email (optional)
In api/index.py, the /api/contact route receives form submissions.
To get email notifications, sign up at sendgrid.com (free 100 emails/day):
```python
pip install sendgrid
```
Then add to handle_contact():
```python
from sendgrid import SendGridAPIClient
from sendgrid.mail import Mail

message = Mail(
    from_email='noreply@mathavanitha.in',
    to_emails='jayalakshmi@mathavanitha.in',
    subject=f'New message from {name}',
    plain_text_content=f'From: {name}\nEmail: {email}\n\n{message}'
)
sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
sg.send(message)
```
Add SENDGRID_API_KEY in Vercel → Settings → Environment Variables
