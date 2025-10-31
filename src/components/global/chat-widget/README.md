# Chat Widget Integration Guide

This directory contains two chat widget implementations for Slide:

## 1. Custom Chat Widget (Currently Active) ✅

**File:** `custom-chat-widget.tsx`

A beautiful, custom-built chat widget that's already integrated into your app.

### Features:
- 💬 Floating chat button in bottom-right corner
- 🎨 Matches your Slide branding
- 📱 Fully responsive
- 🌙 Dark mode support
- ⚡ No external dependencies (free!)
- 🎯 Customizable messages

### Customization:
Edit the file to customize:
- Initial greeting message
- Colors and styling
- Agent name and avatar
- Position (bottom-right, bottom-left, etc.)

---

## 2. Third-Party Integration (Optional)

**File:** `index.tsx`

Use this if you want to integrate with professional chat services like:

### Popular Options:

#### A. **Crisp** (Recommended - Free)
1. Sign up at https://crisp.chat
2. Get your Website ID
3. Replace `YOUR_CRISP_WEBSITE_ID` in `index.tsx`
4. Swap components in `layout.tsx`

```tsx
// In src/app/layout.tsx
import ChatWidget from '@/components/global/chat-widget' // Instead of custom
<ChatWidget websiteId="your-actual-id" />
```

#### B. **Intercom** (Premium)
```html
<script>
  window.intercomSettings = {
    app_id: "YOUR_APP_ID"
  };
</script>
<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/YOUR_APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
```

#### C. **Tawk.to** (Free)
```html
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
```

#### D. **Zendesk** (Enterprise)
Add Zendesk Widget snippet to your site.

---

## Switching Between Implementations

### To use Custom Widget (Current):
```tsx
// src/app/layout.tsx
import CustomChatWidget from '@/components/global/chat-widget/custom-chat-widget'
<CustomChatWidget />
```

### To use Third-Party Service:
```tsx
// src/app/layout.tsx
import ChatWidget from '@/components/global/chat-widget'
<ChatWidget websiteId="your-id" />
```

---

## Connecting Custom Widget to Backend (Advanced)

To make the custom widget functional with real-time messaging:

### Option 1: Socket.IO
```bash
npm install socket.io-client
```

### Option 2: Pusher
```bash
npm install pusher-js
```

### Option 3: Firebase Realtime Database
```bash
npm install firebase
```

### Option 4: Next.js API Routes + Polling
Create API endpoints in `src/app/api/chat/` to handle messages.

---

## Best Practices

1. **For Small Teams:** Use Custom Widget + Email notifications
2. **For Growing Teams:** Use Crisp or Tawk.to (free)
3. **For Enterprise:** Use Intercom or Zendesk

---

## Current Setup

✅ Custom chat widget is active and working
📍 Located in bottom-right corner
🎨 Styled to match Slide branding
💬 Ready to receive messages (currently simulated)

To connect to a real backend, modify `custom-chat-widget.tsx` to send messages to your API or use one of the third-party services above.

